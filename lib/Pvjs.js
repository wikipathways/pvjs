"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var React = require("react");
var js_base64_1 = require("js-base64");
var Kaavio_1 = require("./Kaavio");
var Filters_1 = require("./Kaavio/components/Filters");
var bridgedb_1 = require("bridgedb");
// The edge drawing definitions are in Kaavio because they can be generically used.
var EdgeDrawers_1 = require("./Kaavio/components/EdgeDrawers");
// But the icons and markers are specific to Pvjs (less likely to useful to other applications).
var main_1 = require("./icons/main");
var markerDrawers_1 = require("./markerDrawers");
var gpml2pvjson_1 = require("gpml2pvjson");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/dom/ajax");
require("rxjs/add/operator/do");
require("rxjs/add/operator/let");
require("rxjs/add/operator/map");
var Spinner = require("react-spinkit");
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
var Pvjs = (function (_super) {
    __extends(Pvjs, _super);
    function Pvjs(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pvjson: null,
            filters: null,
            loading: false,
            loaded: false,
            detailPanelOpen: false,
            selected: null,
            error: null
        };
        return _this;
    }
    Pvjs.prototype.handleError = function (error) {
        console.error('Error getting pathway (is webservice.wikipathways.org down?) \n', "Message: " + (error.message || 'none specified') + " \n", "Status: " + (error.status || 'none specified') + " \n");
        error.friendlyMessage = error.friendlyMessage || "Make sure you're connected to the internet and reload the page.";
        this.setState({ error: error, loaded: false, loading: false });
    };
    Pvjs.prototype.getPathway = function () {
        var _this = this;
        this.setState({ loading: true });
        var _a = this.props, about = _a.about, version = _a.version;
        // TODO handle version
        var src = about.replace(/.*wikipathways[:\/]/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=');
        // Use the Fetch API to get the GPML and then convert it to JSON
        var gpmlFetch = fetch(src)
            .then(function (response) {
            if (!response.ok) {
                throw {
                    message: 'Getting pathway failed',
                    status: response.status,
                    friendlyMessage: 'Couldn\'t get the pathway.'
                };
            }
            return response;
        })
            .then(function (response) { return response.json(); })
            .then(function (json) {
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
            return js_base64_1.Base64.decode(json.data);
        })
            .catch(function (err) { return _this.handleError(err); });
        // gpml2pvjson needs an observable stream
        var observable = Observable_1.Observable.fromPromise(gpmlFetch);
        return gpml2pvjson_1.gpml2pvjson(observable, about).subscribe(function (pvjson) {
            var entities = pvjson.entities, organism = pvjson.organism, name = pvjson.name;
            pvjson.entities = entities.map(function (entity) {
                if (entity.displayName) {
                    // Set the inner text to the displayName
                    // We don't need displayName
                    entity.textContent = entity.displayName;
                }
                // Remove the displayName
                return lodash_1.omit(entity, ['displayName']);
            });
            // Build up the title for the diagram
            var infoBoxTextContent = "Title: " + name + " \n Organism: " + organism;
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
            pvjson.entities = pvjson.entities.reduce(function (acc, entity) {
                if (entity.hasOwnProperty('citation')) {
                    var burrs = entity.burrs || [];
                    var citation = entity.citation, kaavioType = entity.kaavioType;
                    var citationBurrId = "citation-burr-" + citation.join('-') + "-for-" + entity.id;
                    burrs.push(citationBurrId);
                    entity.burrs = burrs;
                    var citationDisplayString = createPublicationXrefString(citation
                        .map(function (cId) { return lodash_1.find(pvjson.entities, { id: cId }); })
                        .map(function (c) { return c.textContent; }));
                    var citationBurr = {
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
            var filters = pvjson.entities
                .filter(function (entity) { return entity.lineStyle === 'double'; })
                .reduce(function (acc, entity) {
                var lineStyle = entity.lineStyle;
                var entityFilters = [];
                if (entity.filter) {
                    entityFilters.push(entity.filter);
                }
                var strokeWidth = entity.borderWidth;
                entityFilters.push(Filters_1.generateFilterId('doubleStroke', strokeWidth));
                var filterId = entityFilters.join('_');
                // NOTE: notice side effect
                entity.filter = filterId;
                acc.push(filterId);
                return acc;
            }, []);
            // Reduce the filters further. Add any children needed.
            filters.reduce(function (acc, filterId) {
                var filterChildren = filterId.split('_').reduce(function (subAcc, subFilter) {
                    var _a = subFilter.split('-'), filterName = _a[0], strokeWidthAsString = _a[1];
                    var strokeWidth = parseFloat(strokeWidthAsString);
                    if (filterName !== 'doubleStroke')
                        return;
                    Filters_1.doubleStroke({
                        source: filterId.indexOf('ound') > -1 ? 'roundResult' : 'SourceGraphic',
                        strokeWidth: strokeWidth,
                    }).forEach(function (x) {
                        subAcc.push(x);
                    });
                    return subAcc;
                }, []);
                acc.push(React.createElement(Filters_1.Filter, { id: filterId, key: filterId, children: filterChildren }));
                return acc;
            }, []);
            _this.setState({ pvjson: pvjson, filters: filters, loaded: true, loading: false });
        }, function (err) { return _this.handleError(err); });
    };
    Pvjs.prototype.closeActive = function () {
        this.setState({ selected: null, detailPanelOpen: false });
    };
    Pvjs.prototype.handleClick = function (e) {
        var that = this;
        var entity = e.entity;
        if (entity && entity.type.indexOf('DataNode') > -1 && entity.dbId && entity.dbName) {
            that.setState({ selected: entity, detailPanelOpen: true });
        }
    };
    Pvjs.prototype.componentWillMount = function () {
        this.getPathway();
    };
    Pvjs.prototype.componentWillReceiveProps = function (nextProps) {
        var prevProps = this.props;
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
    };
    ;
    Pvjs.prototype.componentWillUnmount = function () {
        // TODO cancel any pending network requests, possibly something like this:
        //this.pathwayRequest.dispose();
    };
    Pvjs.prototype.onKaavioReady = function (kaavio) {
        this.manipulator = kaavio.manipulator;
    };
    Pvjs.prototype.handleCloseDetailsPanel = function () {
        this.setState({ detailPanelOpen: false });
    };
    Pvjs.prototype.renderDetailsPanel = function () {
        var _this = this;
        var _a = this.state, pvjson = _a.pvjson, selected = _a.selected, detailPanelOpen = _a.detailPanelOpen;
        if (!detailPanelOpen)
            return null;
        return (React.createElement(bridgedb_1.XrefsAnnotationPanel, { key: "details-panel", bridgeDb: new bridgedb_1.BridgeDb(), organism: pvjson.organism, entityType: !!selected && selected.wpType, displayName: !!selected && selected.textContent, dataSource: selected && selected.dbName, identifier: !!selected && selected.dbId, handleClose: function (_) { return _this.handleCloseDetailsPanel(); } }));
    };
    Pvjs.prototype.renderLoadingIndicator = function () {
        var _a = this.state, loaded = _a.loaded, loading = _a.loading, error = _a.error;
        var spinnerStyle = {
            width: '80px',
            position: 'absolute',
            top: '50%',
            'left': '50%',
            transform: 'translate(-50%, 50%)'
        };
        if (loading && !loaded && !error)
            return React.createElement(Spinner, { spinnerName: "wandering-cubes", style: spinnerStyle });
    };
    Pvjs.prototype.renderError = function () {
        var _a = this.state, loading = _a.loading, error = _a.error;
        var errorStyle = {
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
    };
    Pvjs.prototype.renderKaavio = function () {
        var _this = this;
        var _a = this.state, loaded = _a.loaded, pvjson = _a.pvjson, filters = _a.filters;
        var _b = this.props, about = _b.about, customStyle = _b.customStyle, showPanZoomControls = _b.showPanZoomControls;
        if (!loaded)
            return null;
        return React.createElement(Kaavio_1.Kaavio, { ref: function (kaavio) { return _this.kaavioRef = kaavio; }, handleClick: function (e) { return _this.handleClick(e); }, about: about, entities: pvjson.entities, name: pvjson.name, width: pvjson.width, height: pvjson.height, backgroundColor: pvjson.backgroundColor, customStyle: customStyle, edgeDrawers: EdgeDrawers_1.default, icons: main_1.default, markerDrawers: markerDrawers_1.default, filters: filters, onReady: function (kaavio) { return _this.onKaavioReady(kaavio); }, showPanZoomControls: showPanZoomControls });
    };
    Pvjs.prototype.render = function () {
        return (
        // Add position relative to keep the absolute positioned annotationsPanel within bounds
        React.createElement("section", { style: { position: 'relative', minHeight: '30rem' } },
            this.renderError(),
            this.renderLoadingIndicator(),
            this.renderKaavio(),
            this.renderDetailsPanel()));
    };
    return Pvjs;
}(React.Component));
exports.Pvjs = Pvjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHZqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QdmpzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMEM7QUFDMUMsNkJBQStCO0FBRS9CLHVDQUFpQztBQUNqQyxtQ0FBZ0M7QUFDaEMsdURBQTBGO0FBQzFGLHFDQUF3RDtBQUN4RCxtRkFBbUY7QUFDbkYsK0RBQTBEO0FBQzFELGdHQUFnRztBQUNoRyxxQ0FBaUM7QUFDakMsaURBQTRDO0FBQzVDLDJDQUF3QztBQUN4Qyw4Q0FBMkM7QUFDM0Msd0NBQXNDO0FBQ3RDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0IsaUNBQStCO0FBRS9CLHVDQUF5QztBQUV6Qyw0QkFBNEI7QUFDNUIsbURBQW1EO0FBQ25ELDJCQUEyQjtBQUMzQix1REFBdUQ7QUFDdkQscUNBQXFDO0FBQ3JDLHFDQUFxQyxjQUFjO0lBQ2xELElBQUkscUJBQXFCLENBQUM7SUFDMUIsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLHFCQUFxQixHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQyxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLHFCQUFxQixHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVyRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDO2dCQUNILENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRVAsRUFBRSxDQUFDLENBQUMsY0FB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