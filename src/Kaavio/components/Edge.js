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
        var _a = this.props, id = _a.id, drawAs = _a.drawAs, color = _a.color, strokeDasharray = _a.strokeDasharray, borderWidth = _a.borderWidth, edgeDrawers = _a.edgeDrawers, points = _a.points, type = _a.type;
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
                    // Currently just using the same color for backgroundColor (arrow head) as color (line)
                    // See line 86 in Kaavio.tsx
                    value: Marker_1.getMarkerPropertyValue(markerLocationType, markerName, color, color)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVkZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBa0Q7QUFDbEQsNkJBQStCO0FBRS9CLG1DQUF1RTtBQUV2RTtJQUEwQix3QkFBeUI7SUFDL0MsY0FBWSxLQUFLO2VBQ2Isa0JBQU0sS0FBSyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBQUEsaUJBK0NDO1FBOUNTLElBQUEsZUFDVSxFQURULFVBQUUsRUFBRSxrQkFBTSxFQUFFLGdCQUFLLEVBQUUsb0NBQWUsRUFBRSw0QkFBVyxFQUFFLDRCQUFXLEVBQUUsa0JBQU0sRUFBRSxjQUFJLENBQ2hFO1FBRVgsSUFBQSx3QkFBMkQsRUFBMUQsb0NBQWUsRUFBRSwwQ0FBa0IsQ0FBd0I7UUFDbEUsSUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFNLENBQUMsR0FBRyxZQUFZO2FBQ2pCLEdBQUcsQ0FBQyxVQUFTLFdBQVc7WUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWQsSUFBTSxnQkFBZ0IsR0FBRyxxQkFBWSxDQUNqQyw4QkFBcUIsRUFDckIsYUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDbkI7YUFDSSxNQUFNLENBQUMsVUFBQyxHQUFVLEVBQUUsa0JBQXNDO1lBQ3ZELElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ0wsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsdUZBQXVGO29CQUN2Riw0QkFBNEI7b0JBQzVCLEtBQUssRUFBRSwrQkFBc0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztpQkFDOUUsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDLEVBQUUsRUFBRSxDQUFVLENBQUM7UUFFcEIsSUFBSSxJQUFJLEdBQUc7WUFDUCxTQUFTLEVBQUUsSUFBSTtZQUNmLENBQUMsRUFBRSxDQUFDO1lBQ0osSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLEtBQUs7WUFDYixlQUFlLEVBQUUsZUFBZTtZQUNoQyxXQUFXLEVBQUUsV0FBVztZQUN4QixFQUFFLEVBQUUsRUFBRTtTQUNULENBQUM7UUFDRixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTO1lBQzdCLGtEQUFrRDtZQUNsRCxJQUFNLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLHVDQUFNLEdBQUcsRUFBRSxjQUFZLEVBQUksSUFBTSxJQUFJLEVBQUcsQ0FBQztJQUNwRCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFyREQsQ0FBMEIsS0FBSyxDQUFDLFNBQVMsR0FxRHhDO0FBckRZLG9CQUFJIn0=