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
        var markerColors = Array.from(edges
            .filter(function (edge) { return edge.hasOwnProperty('color'); })
            .reduce(function (acc, edge) {
            acc.add(edge.color);
            return acc;
        }, new Set()));
        // TODO Currently just keeping the background colors the same as the colours. I.e. arrowhead is same as line
        // Do we want to handle the case where the marker is on top of another entity?
        var markerBackgroundColors = markerColors.slice();
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
        return React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", id: about, version: "1.1", baseProfile: "full", preserveAspectRatio: "xMidYMid", onClick: this.handleClick.bind(this), className: "kaavio-diagram " + customStyle.diagramClass, viewBox: "0 0 " + width + " " + height },
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
                React.createElement("g", { width: width, height: height }, groupedZIndexedEntities.filter(function (entity) { return ['Node', 'Edge', 'Group'].indexOf(entity.kaavioType) > -1; })
                    .filter(function (entity) { return !entity.hasOwnProperty('isPartOf'); })
                    .map(function (entity) {
                    var highlighted = getHighlighted_1.getHighlighted(entity, highlightedNodes);
                    var hidden = getHidden_1.getHidden(entity, hiddenEntities);
                    var icon = icons[entity.drawAs];
                    return React.createElement(Entity_1.Entity, __assign({ key: entity.id }, entity, { icon: icon ? icon : null, edgeDrawers: edgeDrawers, customStyle: customStyle, isHighlighted: highlighted.highlighted, highlightedColor: highlighted.color, highlightedNodes: highlightedNodes, icons: icons, entityMap: entityMap, hidden: hidden, hiddenEntities: hiddenEntities }));
                }))));
    };
    return Diagram;
}(React.Component));
exports.Diagram = Diagram;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRpYWdyYW0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFFL0IsMEJBQTRCO0FBQzVCLG1DQUFnQztBQUdoQyxtQ0FBb0Y7QUFDcEYsMERBQXVEO0FBQ3ZELG1DQUE2QztBQUM3QyxnREFBNkM7QUFFN0M7SUFBNkIsMkJBQXlCO0lBQ2xELGlCQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVELDZCQUFXLEdBQVgsVUFBWSxDQUFDO1FBQ0gsSUFBQSxlQUF1QyxFQUFyQyw0QkFBVyxFQUFFLHdCQUFTLENBQWdCO1FBQzlDLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCw0Q0FBMEIsR0FBMUIsVUFBMkIsZ0JBQWdCO1FBQ2hDLElBQUEsZ0NBQVMsQ0FBZTtRQUMvQixNQUFNLENBQUMsZ0JBQWdCO2FBQ2xCLE1BQU0sQ0FBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBaEIsQ0FBZ0IsQ0FBQzthQUNwQyxNQUFNLENBQUMsVUFBUyxHQUFHLEVBQUUsTUFBTTtZQUN4QixJQUFNLFVBQVUsR0FBRyxNQUFNLENB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