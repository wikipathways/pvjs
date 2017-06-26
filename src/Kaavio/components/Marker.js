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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWFya2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBR2xCLFFBQUEscUJBQXFCLEdBQXNDLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0csUUFBQSxtQ0FBbUMsR0FBaUQsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFckgscUJBQ0Usa0JBQXNDLEVBQ3RDLFVBQWtCLEVBQ2xCLEtBQWEsRUFDYixlQUF1QjtJQUV4QixNQUFNLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQztTQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDO1NBRVQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFWRCxrQ0FVQztBQUVELGdDQUNFLGtCQUFzQyxFQUN0QyxVQUFrRCxFQUNsRCxLQUFhLEVBQ2IsZUFBdUI7SUFFeEIsc0ZBQXNGO0lBQ3RGLEVBQUUsQ0FBQyxDQUFDLDJDQUFtQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFVBQVEsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLE1BQUcsQ0FBQztBQUN2RixDQUFDO0FBWEQsd0RBV0M7QUFFRDtJQUE0QiwwQkFBeUI7SUFDbEQsZ0JBQVksS0FBMkI7ZUFDeEMsa0JBQU0sS0FBSyxDQUFDO0lBQ2IsQ0FBQztJQUVDLHVCQUFNLEdBQU47UUFDSyxJQUFBLGVBQXlGLEVBQXhGLFVBQUUsRUFBRSxvQ0FBZSxFQUFFLGdCQUFLLEVBQUUsMENBQWtCLEVBQUUsZ0NBQWEsRUFBRSwwQkFBVSxDQUFnQjtRQUVoRyxJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELElBQUEsZ0RBQWdCLEVBQUUsMENBQWEsQ0FBa0I7UUFDakQsSUFBQSwwQ0FBVyxFQUFFLDRDQUFZLENBQXNCO1FBRXZELElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRXJGLE1BQU0sQ0FBQyx5Q0FDRixFQUFFLEVBQUUsUUFBUSxFQUNaLEdBQUcsRUFBRSxRQUFRLEVBQ2IsV0FBVyxFQUFDLGFBQWEsRUFDekIsTUFBTSxFQUFDLE1BQU0sRUFDYixtQkFBbUIsRUFBQyxNQUFNLEVBQzFCLElBQUksRUFBRSxDQUFDLGtCQUFrQixLQUFLLFdBQVcsQ0FBQyxHQUFJLFdBQVcsR0FBRyxDQUFDLEVBQzdELElBQUksRUFBRSxZQUFZLEdBQUcsQ0FBQyxFQUN0QixPQUFPLEVBQUUsU0FBUSxXQUFXLFNBQU0sWUFBYyxJQUM1QyxnQkFBZ0I7WUFDeEIsMkJBQUcsRUFBRSxFQUFFLE9BQUssUUFBVSxFQUNwQixHQUFHLEVBQUUsT0FBSyxRQUFVLEVBQ3BCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixLQUFLLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxpQkFBZ0IsV0FBVyxHQUFHLENBQUMsVUFBTyxZQUFZLEdBQUcsQ0FBQyxNQUFJLElBQ2pILGFBQWEsQ0FDWCxDQUNJLENBQUM7SUFDWCxDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUEvQkQsQ0FBNEIsS0FBSyxDQUFDLFNBQVMsR0ErQjFDO0FBL0JZLHdCQUFNIn0=