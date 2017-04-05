import { find, omit } from 'lodash';
import * as React from 'react';
import { Base64 } from 'js-base64';
import { Kaavio } from './Kaavio';
import { Filter, generateFilterId, doubleStroke } from './Kaavio/components/Filters';
import { BridgeDb, XrefsAnnotationPanel } from 'bridgedb';
// The edge drawing definitions are in Kaavio because they can be generically used.
import EdgeDrawers from './Kaavio/components/EdgeDrawers';
// But the icons and markers are specific to Pvjs (less likely to useful to other applications).
import icons from './icons/main';
import markerDrawers from './markerDrawers';
import { gpml2pvjson } from 'gpml2pvjson';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
// TODO: Add to docs that webpack must be used to bring in CSS
// SEE https://github.com/KyleAMathews/react-spinkit#css
import * as Spinner from 'react-spinkit';
// TODO move this into utils
// Create a string of citation numbers for display,
// delimited by commas, and
// replacing any consecutive series of numbers with the
// first and last joined by a hyphen.
function createPublicationXrefString(displayNumbers) {
    var publicationXrefString;
    if (displayNumbers.length === 1) {
        publicationXrefString = displayNumbers[0];
    }
    else {
        displayNumbers.sort(function (a, b) {
            return a - b;
        });
        var i = 0;
        publicationXrefString = displayNumbers[i].toString();
        if (displayNumbers.length > 2) {
            do {
                i += 1;
                if (displayNumbers[i - 1] + 1 !== displayNumbers[i] || displayNumbers[i] + 1 !== displayNumbers[i + 1]) {
                    if (i !== 1) {
                        if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
                            publicationXrefString += '-' + displayNumbers[i].toString();
                        }
                        else {
                            publicationXrefString += ', ' + displayNumbers[i].toString();
                        }
                    }
                    else {
                        publicationXrefString += ', ' + displayNumbers[i].toString();
                    }
                }
            } while (i < displayNumbers.length - 2);
        }
        i += 1;
        if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
            publicationXrefString += '-' + displayNumbers[i].toString();
        }
        else {
            publicationXrefString += ', ' + displayNumbers[i].toString();
        }
    }
    return publicationXrefString;
}
export class Pvjs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pvjson: null,
            filters: null,
            loading: false,
            loaded: false,
            detailPanelOpen: false,
            selected: null,
            error: null
        };
    }
    handleError(error) {
        console.error('Error getting pathway (is webservice.wikipathways.org down?) \n', `Message: ${error.message || 'none specified'} \n`, `Status: ${error.status || 'none specified'} \n`);
        error.friendlyMessage = error.friendlyMessage || "Make sure you're connected to the internet and reload the page.";
        this.setState({ error: error, loaded: false, loading: false });
    }
    getPathway() {
        this.setState({ loading: true });
        const { about, version } = this.props;
        // TODO handle version
        const src = about.replace(/.*wikipathways[:\/]/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=');
        // Use the Fetch API to get the GPML and then convert it to JSON
        const gpmlFetch = fetch(src)
            .then(response => {
            if (!response.ok) {
                throw {
                    message: 'Getting pathway failed',
                    status: response.status,
                    friendlyMessage: 'Couldn\'t get the pathway.'
                };
            }
            return response;
        })
            .then(response => response.json())
            .then((json) => {
            // For some reason the status code from the webservice is still 200 even when an error appears
            // Check the returned JSON for an error
            // For now, it is structured like ["error", <status code>, <message>]
            if (json[0] == "error") {
                throw {
                    message: json[2],
                    status: json[1],
                    friendlyMessage: 'Failed getting the specified pathway.'
                };
            }
            return Base64.decode(json.data);
        })
            .catch(err => this.handleError(err));
        // gpml2pvjson needs an observable stream
        const observable = Observable.fromPromise(gpmlFetch);
        return gpml2pvjson(observable, about).subscribe((pvjson) => {
            const { entities, organism, name } = pvjson;
            pvjson.entities = entities.map((entity) => {
                if (entity.displayName) {
                    // Set the inner text to the displayName
                    // We don't need displayName
                    entity.textContent = entity.displayName;
                }
                // Remove the displayName
                return omit(entity, ['displayName']);
            });
            // Build up the title for the diagram
            const infoBoxTextContent = `Title: ${name} \n Organism: ${organism}`;
            // Add on the info box containing the title
            pvjson.entities = entities.concat([{
                    id: 'pvjs-infobox',
                    kaavioType: 'Node',
                    drawAs: 'None',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    color: '#999999',
                    fontSize: 14,
                    textContent: infoBoxTextContent,
                    textAlign: 'start',
                    type: [
                        'Node',
                        'Label',
                        'InfoBox',
                    ],
                    padding: '0.1em',
                    align: 'left',
                    verticalAlign: 'middle',
                    fontFamily: 'Arial',
                    x: 5,
                    y: 5,
                    height: 50,
                    width: infoBoxTextContent.length * 3.5,
                    zIndex: entities.length + 1,
                }]);
            // If an entity has citations, format the citation and add it to the entities array
            pvjson.entities = pvjson.entities.reduce((acc, entity) => {
                if (entity.hasOwnProperty('citation')) {
                    const burrs = entity.burrs || [];
                    const { citation, kaavioType } = entity;
                    const citationBurrId = `citation-burr-${citation.join('-')}-for-${entity.id}`;
                    burrs.push(citationBurrId);
                    entity.burrs = burrs;
                    const citationDisplayString = createPublicationXrefString(citation
                        .map(cId => find(pvjson.entities, { id: cId }))
                        .map(c => c.textContent));
                    const citationBurr = {
                        id: citationBurrId,
                        type: ['Citation', 'Burr'],
                        width: citationDisplayString.length * 1.5,
                        height: 12,
                        textContent: citationDisplayString,
                        drawAs: 'None',
                        attachmentDisplay: {
                            position: kaavioType === 'Edge' ? [0.5] : [1, 0],
                            offset: kaavioType === 'Edge' ? [5, 5] : [0, -5],
                        },
                    };
                    acc.push(citationBurr);
                }
                acc.push(entity);
                return acc;
            }, []);
            // Add filters if a double line style is specified in the entity
            // Anders: We discussed just doing this with CSS. What's the verdict?
            const filters = pvjson.entities
                .filter((entity) => entity.lineStyle === 'double')
                .reduce((acc, entity) => {
                const lineStyle = entity.lineStyle;
                let entityFilters = [];
                if (entity.filter) {
                    entityFilters.push(entity.filter);
                }
                const strokeWidth = entity.borderWidth;
                entityFilters.push(generateFilterId('doubleStroke', strokeWidth));
                const filterId = entityFilters.join('_');
                // NOTE: notice side effect
                entity.filter = filterId;
                acc.push(filterId);
                return acc;
            }, []);
            // Reduce the filters further. Add any children needed.
            filters.reduce((acc, filterId) => {
                const filterChildren = filterId.split('_').reduce((subAcc, subFilter) => {
                    const [filterName, strokeWidthAsString] = subFilter.split('-');
                    const strokeWidth = parseFloat(strokeWidthAsString);
                    if (filterName !== 'doubleStroke')
                        return;
                    doubleStroke({
                        source: filterId.indexOf('ound') > -1 ? 'roundResult' : 'SourceGraphic',
                        strokeWidth: strokeWidth,
                    }).forEach(x => {
                        subAcc.push(x);
                    });
                    return subAcc;
                }, []);
                acc.push(React.createElement(Filter, { id: filterId, key: filterId, children: filterChildren }));
                return acc;
            }, []);
            this.setState({ pvjson: pvjson, filters: filters, loaded: true, loading: false });
        }, err => this.handleError(err));
    }
    closeActive() {
        this.setState({ selected: null, detailPanelOpen: false });
    }
    handleClick(e) {
        const that = this;
        const entity = e.entity;
        if (entity && entity.type.indexOf('DataNode') > -1 && entity.dbId && entity.dbName) {
            that.setState({ selected: entity, detailPanelOpen: true });
        }
    }
    componentWillMount() {
        this.getPathway();
    }
    componentWillReceiveProps(nextProps) {
        const prevProps = this.props;
        if (nextProps.about !== prevProps.about || nextProps.version !== prevProps.version) {
            // Reset the state
            this.setState({
                pvjson: null,
                filter: null,
                loading: false,
                loaded: false,
                detailPanelOpen: false,
                selected: null,
                error: null
            });
            this.getPathway();
        }
    }
    ;
    componentWillUnmount() {
        // TODO cancel any pending network requests, possibly something like this:
        //this.pathwayRequest.dispose();
    }
    onKaavioReady(kaavio) {
        this.manipulator = kaavio.manipulator;
    }
    handleCloseDetailsPanel() {
        this.setState({ detailPanelOpen: false });
    }
    renderDetailsPanel() {
        const { pvjson, selected, detailPanelOpen } = this.state;
        if (!detailPanelOpen)
            return null;
        return (React.createElement(XrefsAnnotationPanel, { key: "details-panel", bridgeDb: new BridgeDb(), organism: pvjson.organism, entityType: !!selected && selected.wpType, displayName: !!selected && selected.textContent, dataSource: selected && selected.dbName, identifier: !!selected && selected.dbId, handleClose: _ => this.handleCloseDetailsPanel() }));
    }
    renderLoadingIndicator() {
        const { loaded, loading, error } = this.state;
        const spinnerStyle = {
            width: '80px',
            position: 'absolute',
            top: '50%',
            'left': '50%',
            transform: 'translate(-50%, 50%)'
        };
        if (loading && !loaded && !error)
            return React.createElement(Spinner, { spinnerName: "wandering-cubes", style: spinnerStyle });
    }
    renderError() {
        const { loading, error } = this.state;
        const errorStyle = {
            padding: '2.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            width: '80%',
            textAlign: 'center'
        };
        if (!loading && error)
            return (React.createElement("div", { style: errorStyle },
                React.createElement("h3", null, "Uh-oh!"),
                React.createElement("p", null, error.friendlyMessage)));
    }
    renderKaavio() {
        const { loaded, pvjson, filters } = this.state;
        const { about, customStyle, showPanZoomControls } = this.props;
        if (!loaded)
            return null;
        return React.createElement(Kaavio, { ref: kaavio => this.kaavioRef = kaavio, handleClick: e => this.handleClick(e), about: about, entities: pvjson.entities, name: pvjson.name, width: pvjson.width, height: pvjson.height, backgroundColor: pvjson.backgroundColor, customStyle: customStyle, edgeDrawers: EdgeDrawers, icons: icons, markerDrawers: markerDrawers, filters: filters, onReady: kaavio => this.onKaavioReady(kaavio), showPanZoomControls: showPanZoomControls });
    }
    render() {
        const { customStyle } = this.props;
        return (
        // Add position relative to keep the absolute positioned annotationsPanel within bounds
        React.createElement("section", { className: customStyle.globalClass },
            this.renderError(),
            this.renderLoadingIndicator(),
            this.renderKaavio(),
            this.renderDetailsPanel()));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHZqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QdmpzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFVLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMxQyxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRixPQUFPLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3hELG1GQUFtRjtBQUNuRixPQUFPLFdBQVcsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRCxnR0FBZ0c7QUFDaEcsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsOERBQThEO0FBQzlELHdEQUF3RDtBQUN4RCxPQUFPLEtBQUssT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUV6Qyw0QkFBNEI7QUFDNUIsbURBQW1EO0FBQ25ELDJCQUEyQjtBQUMzQix1REFBdUQ7QUFDdkQscUNBQXFDO0FBQ3JDLHFDQUFxQyxjQUFjO0lBQ2xELElBQUkscUJBQXFCLENBQUM7SUFDMUIsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLENB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