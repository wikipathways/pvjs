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
require("bootstrap/dist/css/bootstrap.min.css");
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
    Pvjs.prototype.getPathway = function () {
        var _this = this;
        this.setState({ loading: true });
        var _a = this.props, about = _a.about, version = _a.version;
        // TODO handle version
        var src = about.replace(/.*wikipathways[:\/]/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=');
        var ajaxRequest = {
            url: src,
            method: 'GET',
            responseType: 'json',
            timeout: 1000,
            crossDomain: true,
        };
        var observable = Observable_1.Observable.ajax(ajaxRequest)
            .map(function (ajaxResponse) { return ajaxResponse.xhr.response; })
            .map(function (res) { return js_base64_1.Base64.decode(res.data); });
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
        }, function (err) {
            console.error(err.message + ': Error getting pathway (is webservice.wikipathways.org down?)');
            err.message = "Make sure you're connected to the internet and reload the page.";
            _this.setState({ error: err, loaded: false, loading: false });
        });
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
    Pvjs.prototype.render = function () {
        var _this = this;
        var _a = this.state, loading = _a.loading, loaded = _a.loaded, error = _a.error, pvjson = _a.pvjson, filters = _a.filters;
        var _b = this.props, about = _b.about, customStyle = _b.customStyle;
        var spinnerStyle = {
            width: '80px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1rem'
        };
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
        if (loading && !loaded && !error)
            return React.createElement(Spinner, { spinnerName: "wandering-cubes", style: spinnerStyle });
        if (!loading && error)
            return (React.createElement("div", { style: errorStyle },
                React.createElement("h3", null, "Uh-oh!"),
                React.createElement("p", null, error.message)));
        return (
        // Add position relative to keep the absolute positioned annotationsPanel within bounds
        React.createElement("section", { style: { position: 'relative' } },
            React.createElement(Kaavio_1.Kaavio, { ref: function (kaavio) { return _this.kaavioRef = kaavio; }, handleClick: function (e) { return _this.handleClick(e); }, about: about, entities: pvjson.entities, name: pvjson.name, width: pvjson.width, height: pvjson.height, backgroundColor: pvjson.backgroundColor, customStyle: customStyle, edgeDrawers: EdgeDrawers_1.default, icons: main_1.default, markerDrawers: markerDrawers_1.default, filters: filters, onReady: function (kaavio) { return _this.onKaavioReady(kaavio); } }),
            this.renderDetailsPanel()));
    };
    return Pvjs;
}(React.Component));
exports.Pvjs = Pvjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHZqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QdmpzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMEM7QUFDMUMsNkJBQStCO0FBRS9CLHVDQUFpQztBQUNqQyxtQ0FBZ0M7QUFDaEMsdURBQTBGO0FBQzFGLHFDQUF3RDtBQUN4RCxnREFBOEM7QUFDOUMsbUZBQW1GO0FBQ25GLCtEQUEwRDtBQUMxRCxnR0FBZ0c7QUFDaEcscUNBQWlDO0FBQ2pDLGlEQUE0QztBQUM1QywyQ0FBd0M7QUFDeEMsOENBQTJDO0FBRTNDLHdDQUFzQztBQUN0QyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLGlDQUErQjtBQUUvQix1Q0FBeUM7QUFFekMsNEJBQTRCO0FBQzVCLG1EQUFtRDtBQUNuRCwyQkFBMkI7QUFDM0IsdURBQXVEO0FBQ3ZELHFDQUFxQztBQUNyQyxxQ0FBcUMsY0FBYztJQUNsRCxJQUFJLHFCQUFxQixDQUFDO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxxQkFBcUIsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1AsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixxQkFBcUIsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFckQsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEdBQUcsQ0FBQztnQkFDSCxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVQLEVBQUUs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