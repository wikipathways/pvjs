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
import { BehaviorSubject } from "rxjs";
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
        this.readySubject = new BehaviorSubject(false);
        this.ready = this.readySubject.asObservable();
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
            const infoBoxTextContent = `Title: ${name}\nOrganism: ${organism}`;
            // Add on the info box containing the title
            pvjson.entities = entities.concat([{
                    id: 'pvjs-infobox',
                    kaavioType: 'Node',
                    drawAs: 'None',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    color: '#141414',
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
        this.readySubject.next(true);
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
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        };
        if (loading && !loaded && !error)
            return React.createElement(Spinner, { spinnerName: "wandering-cubes", style: spinnerStyle });
    }
    renderError() {
        const { loading, error } = this.state;
        const errorStyle = {
            position: 'relative',
            padding: '2.5rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            width: '80%',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%'
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
        return (React.createElement("section", { className: customStyle.globalClass },
            this.renderError(),
            this.renderLoadingIndicator(),
            this.renderKaavio(),
            this.renderDetailsPanel()));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHZqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QdmpzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFVLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMxQyxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRixPQUFPLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3hELG1GQUFtRjtBQUNuRixPQUFPLFdBQVcsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRCxnR0FBZ0c7QUFDaEcsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsOERBQThEO0FBQzlELHdEQUF3RDtBQUN4RCxPQUFPLEtBQUssT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXJDLDRCQUE0QjtBQUM1QixtREFBbUQ7QUFDbkQsMkJBQTJCO0FBQzNCLHVEQUF1RDtBQUN2RCxxQ0FBcUM7QUFDckMscUNBQXFDLGNBQWM7SUFDbEQsSUFBSSxxQkFBcUIsQ0FBQztJQUMxQixF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