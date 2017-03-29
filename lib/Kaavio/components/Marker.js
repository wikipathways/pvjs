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
exports.MARKER_PROPERTY_NAMES = ['markerStart', 'markerMid', 'markerEnd', 'marker'];
exports.NON_FUNC_IRI_MARKER_PROPERTY_VALUES = ['none', 'inherit'];
function getMarkerId(markerLocationType, markerName, color, backgroundColor) {
    return [markerLocationType, markerName, color, backgroundColor]
        .join('-')
        .replace(/[^A-Za-z0-9-]/g, '');
}
exports.getMarkerId = getMarkerId;
function getMarkerPropertyValue(markerLocationType, markerName, color, backgroundColor) {
    // Don't make a funciri out of any of the names in NON_FUNC_IRI_MARKER_PROPERTY_VALUES
    if (exports.NON_FUNC_IRI_MARKER_PROPERTY_VALUES.indexOf(markerName) > -1) {
        return markerName;
    }
    return "url(#" + getMarkerId(markerLocationType, markerName, color, backgroundColor) + ")";
}
exports.getMarkerPropertyValue = getMarkerPropertyValue;
var Marker = (function (_super) {
    __extends(Marker, _super);
    function Marker(props) {
        return _super.call(this, props) || this;
    }
    Marker.prototype.render = function () {
        var _a = this.props, id = _a.id, backgroundColor = _a.backgroundColor, color = _a.color, markerLocationType = _a.markerLocationType, markerDrawers = _a.markerDrawers, markerName = _a.markerName;
        var markerDrawer = markerDrawers[markerName](backgroundColor, color);
        var markerAttributes = markerDrawer.markerAttributes, groupChildren = markerDrawer.groupChildren;
        var markerWidth = markerAttributes.markerWidth, markerHeight = markerAttributes.markerHeight;
        var markerId = getMarkerId(markerLocationType, markerName, color, backgroundColor);
        return React.createElement("marker", __assign({ id: markerId, key: markerId, markerUnits: "strokeWidth", orient: "auto", preserveAspectRatio: "none", refX: (markerLocationType === 'markerEnd') ? markerWidth : 0, refY: markerHeight / 2, viewBox: "0 0 " + markerWidth + " " + markerHeight }, markerAttributes),
            React.createElement("g", { id: "g-" + markerId, key: "g-" + markerId, transform: (markerLocationType === 'markerEnd') ? '' : "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" }, groupChildren));
    };
    return Marker;
}(React.Component));
exports.Marker = Marker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0thYXZpby9jb21wb25lbnRzL01hcmtlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFHbEIsUUFBQSxxQkFBcUIsR0FBc0MsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvRyxRQUFBLG1DQUFtQyxHQUFpRCxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVySCxxQkFDRSxrQkFBc0MsRUFDdEMsVUFBa0IsRUFDbEIsS0FBYSxFQUNiLGVBQXVCO0lBRXhCLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDO1NBQzdELElBQUksQ0FBQyxHQUFHLENBQUM7U0FFVCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakMsQ0FBQztBQVZELGtDQVVDO0FBRUQsZ0NBQ0Usa0JBQXNDLEVBQ3RDLFVBQWtELEVBQ2xELEtBQWEsRUFDYixlQUF1QjtJQUV4QixzRkFBc0Y7SUFDdEYsRUFBRSxDQUFDLENBQUMsMkNBQW1DLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ25CLENBQUM7SUFDRCxNQUFNLENBQUMsVUFBUSxXQUFXLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUMsTUFBRyxDQUFDO0FBQ3ZGLENBQUM7QUFYRCx3REFXQztBQUVEO0lBQTRCLDBCQUF5QjtJQUNsRCxnQkFBWSxLQUEyQjtlQUN4QyxrQkFBTSxLQUFLLENBQUM7SUFDYixDQUFDO0lBRUMsdUJBQU0sR0FBTjtRQUNLLElBQUEsZUFBeUYsRUFBeEYsVUFBRSxFQUFFLG9DQUFlLEVBQUUsZ0JBQUssRUFBRSwwQ0FBa0IsRUFBRSxnQ0FBYSxFQUFFLDBCQUFVLENBQWdCO1FBRWhHLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0QsSUFBQSxnREFBZ0IsRUFBRSwwQ0FBYSxDQUFrQjtRQUNqRCxJQUFBLDBDQUFXLEVBQUUsNENBQVksQ0FBc0I7UUFFdkQsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFckYsTUFBTSxDQUFDLHlDQUNGLEVBQUUsRUFBRSxRQUFRLEVBQ1osR0FBRyxFQUFFLFFBQVEsRUFDYixXQUFXLEVBQUMsYUFBYSxFQUN6QixNQUFNLEVBQUMsTUFBTSxFQUNiLG1CQUFtQixFQUFDLE1BQU0sRUFDMUIsSUFBSSxFQUFFLENBQUMsa0JBQWtCLEtBQUssV0FBVyxDQUFDLEdBQUksV0FBVyxHQUFHLENBQUMsRUFDN0QsSUFBSSxFQUFFLFlBQVksR0FBRyxDQUFDLEVBQ3RCLE9BQU8sRUFBRSxTQUFRLFdBQVcsU0FBTSxZQUFjLElBQzVDLGdCQUFnQjtZQUN4QiwyQkFBRyxFQUFFLEVBQUUsT0FBSyxRQUFVLEVBQ3BCLEdBQUcsRUFBRSxPQUFLLFFBQVUsRUFDcEIsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEtBQUssV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLGlCQUFnQixXQUFXLEdBQUcsQ0FBQyxVQUFPLFlBQVksR0FBRyxDQUFDLE1BQUksSUFDakgsYUFBYSxDQUNYLENBQ0ksQ0FBQztJQUNYLENBQUM7SUFDRixhQUFDO0FBQUQsQ0FBQyxBQS9CRCxDQUE0QixLQUFLLENBQUMsU0FBUyxHQStCMUM7QUEvQlksd0JBQU0ifQ==