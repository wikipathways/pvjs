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
var lodash_1 = require("lodash");
var React = require("react");
var Marker_1 = require("./Marker");
var Edge = (function (_super) {
    __extends(Edge, _super);
    function Edge(props) {
        return _super.call(this, props) || this;
    }
    Edge.prototype.render = function () {
        var _this = this;
        var _a = this.props, id = _a.id, drawAs = _a.drawAs, color = _a.color, strokeDasharray = _a.strokeDasharray, borderWidth = _a.borderWidth, edgeDrawers = _a.edgeDrawers, points = _a.points, backgroundColor = _a.backgroundColor, type = _a.type;
        var _b = edgeDrawers[drawAs], getPathSegments = _b.getPathSegments, getPointAtPosition = _b.getPointAtPosition;
        var pathSegments = getPathSegments(points, id);
        var d = pathSegments
            .map(function (pathSegment) {
            return pathSegment.command + pathSegment.points.join(',');
        })
            .join('');
        var markerProperties = lodash_1.intersection(Marker_1.MARKER_PROPERTY_NAMES, lodash_1.keys(this.props))
            .reduce(function (acc, markerLocationType) {
            var markerName = _this.props[markerLocationType];
            if (markerName) {
                acc.push({
                    name: markerLocationType,
                    value: Marker_1.getMarkerPropertyValue(markerLocationType, markerName, color, backgroundColor)
                });
            }
            return acc;
        }, []);
        var opts = {
            className: type,
            d: d,
            fill: 'transparent',
            stroke: color,
            strokeDasharray: strokeDasharray,
            strokeWidth: borderWidth,
            id: id,
        };
        markerProperties.filter(function (attribute) {
            // Ensure only markerEnd, markerStart or markerMid
            var allowed = ['markerMid', 'markerStart', 'markerEnd'];
            return allowed.indexOf(attribute.name) > -1;
        }).forEach(function (attribute) {
            opts[attribute.name] = attribute.value;
        });
        return React.createElement("path", __assign({ key: "path-for-" + id }, opts));
    };
    return Edge;
}(React.Component));
exports.Edge = Edge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9FZGdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFrRDtBQUNsRCw2QkFBK0I7QUFFL0IsbUNBQXVFO0FBRXZFO0lBQTBCLHdCQUF5QjtJQUMvQyxjQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVELHFCQUFNLEdBQU47UUFBQSxpQkE2Q0M7UUE1Q1MsSUFBQSxlQUNVLEVBRFQsVUFBRSxFQUFFLGtCQUFNLEVBQUUsZ0JBQUssRUFBRSxvQ0FBZSxFQUFFLDRCQUFXLEVBQUUsNEJBQVcsRUFBRSxrQkFBTSxFQUFFLG9DQUFlLEVBQUUsY0FBSSxDQUNqRjtRQUVYLElBQUEsd0JBQTJELEVBQTFELG9DQUFlLEVBQUUsMENBQWtCLENBQXdCO1FBQ2xFLElBQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBTSxDQUFDLEdBQUcsWUFBWTthQUNqQixHQUFHLENBQUMsVUFBUyxXQUFXO1lBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVkLElBQU0sZ0JBQWdCLEdBQUcscUJBQVksQ0FDakMsOEJBQXFCLEVBQ3JCLGFBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ25CO2FBQ0ksTUFBTSxDQUFDLFVBQUMsR0FBVSxFQUFFLGtCQUFzQztZQUN2RCxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNMLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSwrQkFBc0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQztpQkFDeEYsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDLEVBQUUsRUFBRSxDQUFVLENBQUM7UUFFcEIsSUFBSSxJQUFJLEdBQUc7WUFDUCxTQUFTLEVBQUUsSUFBSTtZQUNmLENBQUMsRUFBRSxDQUFDO1lBQ0osSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLEtBQUs7WUFDYixlQUFlLEVBQUUsZUFBZTtZQUNoQyxXQUFXLEVBQUUsV0FBVztZQUN4QixFQUFFLEVBQUUsRUFBRTtTQUNULENBQUM7UUFDRixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTO1lBQzdCLGtEQUFrRDtZQUNsRCxJQUFNLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLHVDQUFNLEdBQUcsRUFBRSxjQUFZLEVBQUksSUFBTSxJQUFJLEVBQUcsQ0FBQztJQUNwRCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFuREQsQ0FBMEIsS0FBSyxDQUFDLFNBQVMsR0FtRHhDO0FBbkRZLG9CQUFJIn0=