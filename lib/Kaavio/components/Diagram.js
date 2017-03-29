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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _ = require("lodash");
var Entity_1 = require("./Entity");
var Marker_1 = require("./Marker");
var getHighlighted_1 = require("../utils/getHighlighted");
var Marker_2 = require("./Marker");
var getHidden_1 = require("../utils/getHidden");
var Diagram = (function (_super) {
    __extends(Diagram, _super);
    function Diagram(props) {
        return _super.call(this, props) || this;
    }
    Diagram.prototype.handleClick = function (e) {
        var _a = this.props, handleClick = _a.handleClick, entityMap = _a.entityMap;
        var id = e.target.parentNode.parentNode.getAttribute('id');
        var entity = entityMap[id];
        handleClick(_.omitBy(_.defaults({ entity: entity }, e), function (v, k) { return k.indexOf('_') === 0; }));
    };
    Diagram.prototype.getGroupedZIndexedEntities = function (zIndexedEntities) {
        var entityMap = this.props.entityMap;
        return zIndexedEntities
            .filter(function (entity) { return !entity.isPartOf; })
            .reduce(function (acc, entity) {
            var kaavioType = entity.kaavioType;
            if (kaavioType === 'Group') {
                // TODO: refactor this so that contains is actually a map of the contained elements. Not just an array of their IDs
                entity.contains = entity.contains
                    .map(function (id) { return entityMap[id]; })
                    .sort(function (a, b) {
                    var zIndexA = a.zIndex;
                    var zIndexB = b.zIndex;
                    if (zIndexA < zIndexB) {
                        return 1;
                    }
                    else if (zIndexA > zIndexB) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                })
                    .map(function (entity) { return entity.id; });
            }
            else if (entity.hasOwnProperty('burrs')) {
                entity.burrs = entity.burrs
                    .map(function (id) { return entityMap[id]; })
                    .sort(function (a, b) {
                    var zIndexA = a.zIndex;
                    var zIndexB = b.zIndex;
                    if (zIndexA < zIndexB) {
                        return 1;
                    }
                    else if (zIndexA > zIndexB) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                })
                    .map(function (entity) { return entity.id; });
            }
            if (['Burr'].indexOf(kaavioType) === -1 && !entity.hasOwnProperty('isPartOf')) {
                acc.push(entity);
            }
            return acc;
        }, []);
    };
    Diagram.prototype.getMarkerInputs = function (zIndexedEntities) {
        var backgroundColor = this.props.backgroundColor;
        var edges = zIndexedEntities
            .filter(function (entity) { return entity.kaavioType === 'Edge'; });
        // TODO Currently just using the background color of the diagram as a whole.
        // Do we want to handle the case where the marker is on top of another entity?
        var markerBackgroundColors = [backgroundColor];
        var markerColors = Array.from(edges
            .filter(function (edge) { return edge.hasOwnProperty('color'); })
            .reduce(function (acc, edge) {
            acc.add(edge.color);
            return acc;
        }, new Set()));
        var markerNames = Array.from(edges
            .reduce(function (acc, edge) {
            _.intersection(Marker_1.MARKER_PROPERTY_NAMES, _.keys(edge))
                .forEach(function (markerLocationType) {
                var markerName = edge[markerLocationType];
                // we don't want to create a marker def for markers with names like "none"
                if (Marker_1.NON_FUNC_IRI_MARKER_PROPERTY_VALUES.indexOf(markerName) === -1) {
                    acc.add(edge[markerLocationType]);
                }
            });
            return acc;
        }, new Set()));
        return markerColors
            .map(function (color) { return ({ color: color }); })
            .reduce(function (acc, partialInput) {
            var pairs = _.toPairs(partialInput);
            return acc.concat(markerBackgroundColors
                .map(function (markerBackgroundColor) {
                return pairs
                    .reduce(function (subAcc, pair) {
                    var key = pair[0];
                    subAcc[key] = pair[1];
                    subAcc.markerBackgroundColor = markerBackgroundColor;
                    return subAcc;
                }, {});
            }));
        }, [])
            .reduce(function (acc, partialInput) {
            var pairs = _.toPairs(partialInput);
            return acc.concat(Marker_1.MARKER_PROPERTY_NAMES
                .map(function (markerLocationType) {
                return pairs
                    .reduce(function (subAcc, pair) {
                    var key = pair[0];
                    subAcc[key] = pair[1];
                    subAcc.markerLocationType = markerLocationType;
                    return subAcc;
                }, {});
            }));
        }, [])
            .reduce(function (acc, partialInput) {
            var pairs = _.toPairs(partialInput);
            return acc.concat(markerNames
                .map(function (markerName) {
                return pairs
                    .reduce(function (subAcc, pair) {
                    var key = pair[0];
                    subAcc[key] = pair[1];
                    subAcc.markerName = markerName;
                    return subAcc;
                }, {});
            }));
        }, []);
    };
    Diagram.prototype.render = function () {
        var _a = this.props, about = _a.about, backgroundColor = _a.backgroundColor, customStyle = _a.customStyle, edgeDrawers = _a.edgeDrawers, entityMap = _a.entityMap, filters = _a.filters, height = _a.height, name = _a.name, organism = _a.organism, markerDrawers = _a.markerDrawers, width = _a.width, zIndices = _a.zIndices, highlightedNodes = _a.highlightedNodes, icons = _a.icons, hiddenEntities = _a.hiddenEntities;
        var zIndexedEntities = zIndices
            .map(function (id) { return entityMap[id]; });
        var groupedZIndexedEntities = this.getGroupedZIndexedEntities(zIndexedEntities);
        var markerInputs = this.getMarkerInputs(zIndexedEntities);
        return React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", id: about, version: "1.1", baseProfile: "full", preserveAspectRatio: "xMidYMid", width: width, height: height, onClick: this.handleClick.bind(this), className: "kaavio-diagram " + customStyle.diagramClass, style: { overflow: 'hidden' } },
            React.createElement("style", { type: "text/css", dangerouslySetInnerHTML: { __html: "\n\t\t\t\t<![CDATA[\n\t\t\t\t\t" + '' /*customStyle*/ + "\n\t\t\t\t]]>\n\t\t\t" } }),
            React.createElement("g", { className: "viewport " + customStyle.viewportClass + " svg-pan-zoom_viewport" },
                React.createElement("defs", null,
                    React.createElement("clipPath", { id: "rounded-rectangle-clip-path", clipPathUnits: "objectBoundingBox" },
                        React.createElement("rect", { x: "0", y: "0", rx: "0.125", ry: "0.25", width: "1", height: "1" })),
                    filters,
                    markerInputs.map(function (input) {
                        var markerLocationType = input.markerLocationType, markerName = input.markerName, color = input.color, markerBackgroundColor = input.markerBackgroundColor;
                        return React.createElement(Marker_2.Marker, { key: Marker_2.getMarkerId(markerLocationType, markerName, color, markerBackgroundColor), color: color, backgroundColor: markerBackgroundColor, markerLocationType: markerLocationType, markerName: markerName, markerDrawers: markerDrawers });
                    })),
                React.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%", className: "kaavio-viewport-background", fill: backgroundColor }),
                groupedZIndexedEntities.filter(function (entity) { return ['Node', 'Edge', 'Group'].indexOf(entity.kaavioType) > -1; })
                    .filter(function (entity) { return !entity.hasOwnProperty('isPartOf'); })
                    .map(function (entity) {
                    var highlighted = getHighlighted_1.getHighlighted(entity, highlightedNodes);
                    var hidden = getHidden_1.getHidden(entity, hiddenEntities);
                    var icon = icons[entity.drawAs];
                    return React.createElement(Entity_1.Entity, __assign({ key: entity.id }, entity, { icon: icon ? icon : null, edgeDrawers: edgeDrawers, backgroundColor: backgroundColor, customStyle: customStyle, isHighlighted: highlighted.highlighted, highlightedColor: highlighted.color, highlightedNodes: highlightedNodes, icons: icons, entityMap: entityMap, hidden: hidden, hiddenEntities: hiddenEntities }));
                })));
    };
    return Diagram;
}(React.Component));
exports.Diagram = Diagram;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9EaWFncmFtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUUvQiwwQkFBNEI7QUFDNUIsbUNBQWdDO0FBR2hDLG1DQUFvRjtBQUNwRiwwREFBdUQ7QUFDdkQsbUNBQTZDO0FBQzdDLGdEQUE2QztBQUU3QztJQUE2QiwyQkFBeUI7SUFDbEQsaUJBQVksS0FBSztlQUNiLGtCQUFNLEtBQUssQ0FBQztJQUNoQixDQUFDO0lBRUQsNkJBQVcsR0FBWCxVQUFZLENBQUM7UUFDSCxJQUFBLGVBQXVDLEVBQXJDLDRCQUFXLEVBQUUsd0JBQVMsQ0FBZ0I7UUFDOUMsSUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVELDRDQUEwQixHQUExQixVQUEyQixnQkFBZ0I7UUFDaEMsSUFBQSxnQ0FBUyxDQUFlO1FBQy9CLE1BQU0sQ0FBQyxnQkFBZ0I7YUFDbEIsTUFBTSxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFoQixDQUFnQixDQUFDO2FBQ3BDLE1BQU0sQ0FBQyxVQUFTLEdBQUcsRUFBRSxN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