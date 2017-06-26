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
// TODO: Add to docs that webpack must be used to bring in CSS
// SEE https://github.com/KyleAMathews/react-spinkit#css
var Spinner = require("react-spinkit");
var WikiPathwaysDefaultDisplayStyle = require("./WikiPathways.style");
require("whatwg-fetch");
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
        _this.handleEntityClick = function (entity) {
            var _a = _this.props, onEntityClick = _a.onEntityClick, _b = _a.detailPanelEnabled, detailPanelEnabled = _b === void 0 ? true : _b;
            if (onEntityClick)
                onEntityClick(entity);
            if (entity.type.indexOf('DataNode') > -1 && entity.dbId && entity.dbName) {
                _this.setState({ selected: entity, detailPanelOpen: detailPanelEnabled });
            }
        };
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
        var _a = this.props, wpId = _a.wpId, _b = _a.version, version = _b === void 0 ? 0 : _b;
        // TODO handle version
        var src = "http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=" + wpId + "&revision=" + version;
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
        // Just for gpm2vpvjson legacy
        var about = "http://identifiers.org/wikipathways/" + wpId;
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
            var infoBoxTextContent = "Title: " + name + "\nOrganism: " + organism;
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
    Pvjs.prototype.componentWillMount = function () {
        this.getPathway();
    };
    Pvjs.prototype.componentWillReceiveProps = function (nextProps) {
        var prevProps = this.props;
        if (nextProps.wpId !== prevProps.wpId || nextProps.version !== prevProps.version) {
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
        // this.pathwayRequest.dispose();
    };
    Pvjs.prototype.onKaavioReady = function () {
        var onReady = this.props.onReady;
        if (onReady) {
            var pvjson = this.state.pvjson;
            onReady(pvjson.entities);
        }
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
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        };
        if (loading && !loaded && !error)
            return React.createElement(Spinner, { name: "wandering-cubes", style: spinnerStyle });
    };
    Pvjs.prototype.renderError = function () {
        var _a = this.state, loading = _a.loading, error = _a.error;
        var errorStyle = {
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
    };
    Pvjs.prototype.renderKaavio = function () {
        var _this = this;
        var _a = this.state, loaded = _a.loaded, pvjson = _a.pvjson, filters = _a.filters;
        var _b = this.props, wpId = _b.wpId, showPanZoomControls = _b.showPanZoomControls, highlightedEntities = _b.highlightedEntities, hiddenEntities = _b.hiddenEntities, zoomedEntities = _b.zoomedEntities, pannedEntities = _b.pannedEntities;
        var customStyle = this.props.customStyle || WikiPathwaysDefaultDisplayStyle;
        if (!loaded)
            return null;
        return React.createElement(Kaavio_1.Kaavio, { ref: function (kaavio) { return _this.kaavioRef = kaavio; }, onEntityClick: this.handleEntityClick, entities: pvjson.entities, name: pvjson.name, width: pvjson.width, height: pvjson.height, backgroundColor: pvjson.backgroundColor, customStyle: customStyle, edgeDrawers: EdgeDrawers_1.default, icons: main_1.default, markerDrawers: markerDrawers_1.default, filters: filters, highlightedEntities: highlightedEntities, hiddenEntities: hiddenEntities, pannedEntities: pannedEntities, zoomedEntities: zoomedEntities, onReady: function (kaavio) { return _this.onKaavioReady(); }, showPanZoomControls: showPanZoomControls });
    };
    Pvjs.prototype.render = function () {
        var customStyle = this.props.customStyle || WikiPathwaysDefaultDisplayStyle;
        return (React.createElement("section", { className: customStyle.globalClass },
            this.renderError(),
            this.renderLoadingIndicator(),
            this.renderKaavio(),
            this.renderDetailsPanel()));
    };
    return Pvjs;
}(React.Component));
exports.Pvjs = Pvjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHZqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlB2anMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTBDO0FBQzFDLDZCQUErQjtBQUUvQix1Q0FBaUM7QUFDakMsbUNBQWdDO0FBQ2hDLHVEQUEwRjtBQUMxRixxQ0FBd0Q7QUFDeEQsbUZBQW1GO0FBQ25GLCtEQUEwRDtBQUMxRCxnR0FBZ0c7QUFDaEcscUNBQWlDO0FBQ2pDLGlEQUE0QztBQUM1QywyQ0FBd0M7QUFDeEMsOENBQTJDO0FBQzNDLHdDQUFzQztBQUN0QyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLGlDQUErQjtBQUMvQiw4REFBOEQ7QUFDOUQsd0RBQXdEO0FBQ3hELHVDQUF5QztBQUV6QyxzRUFBd0U7QUFFeEUsd0JBQXNCO0FBRXRCLDRCQUE0QjtBQUM1QixtREFBbUQ7QUFDbkQsMkJBQTJCO0FBQzNCLHVEQUF1RDtBQUN2RCxxQ0FBcUM7QUFDckMscUNBQXFDLGNBQWM7SUFDbEQsSUFBSSxxQkFBcUIsQ0FBQztJQUMxQixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMscUJBQXFCLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNQLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YscUJBQXFCLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXJELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixHQUFHLENBQUM7Z0JBQ0gs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