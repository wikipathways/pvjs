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
var getHighlighted_1 = require("../utils/getHighlighted");
var Entity_1 = require("./Entity");
var Node_1 = require("./Node");
var getHidden_1 = require("../utils/getHidden");
// Must also export this class for type definitions to work
var nodeWithGroup = (function (_super) {
    __extends(nodeWithGroup, _super);
    function nodeWithGroup(wrappedNode) {
        return _super.call(this, wrappedNode.props) || this;
    }
    nodeWithGroup.prototype.render = function () {
        var _a = this.props, x = _a.x, y = _a.y, entityMap = _a.entityMap, highlightedNodes = _a.highlightedNodes, backgroundColor = _a.backgroundColor, customStyle = _a.customStyle, icons = _a.icons, edgeDrawers = _a.edgeDrawers, contains = _a.contains, id = _a.id, hiddenEntities = _a.hiddenEntities;
        var children = contains
            .map(function (containedId) { return entityMap[containedId]; }) // TODO: Refactor this so contains is actually the map of elements. Then don't have to pass through entityMap too
            .filter(function (entity) { return ['Node', 'Edge'].indexOf(entity.kaavioType) > -1; }) // Ensure only node or Edge. We don't allow nested Groups
            .map(function (entity) {
            // Set the X and Y values
            var toSet;
            if (entity.kaavioType == 'Edge') {
                toSet = entity.points;
            }
            else {
                toSet = entity;
            }
            // Keep a reference to the origin X and Y values in case of a re-render
            if (!toSet.origX) {
                toSet.origX = toSet.x;
            }
            if (!toSet.origY) {
                toSet.origY = toSet.y;
            }
            toSet.x = toSet.origX - x;
            toSet.y = toSet.origY - y;
            return toSet;
        })
            .map(function (entity) {
            var highlighted = getHighlighted_1.getHighlighted(entity, highlightedNodes);
            var hidden = getHidden_1.getHidden(entity, hiddenEntities);
            var icon = icons[entity.drawAs];
            return React.createElement(Entity_1.Entity, __assign({ key: entity.id }, entity, { icon: icon ? icon : null, edgeDrawers: edgeDrawers, backgroundColor: backgroundColor, customStyle: customStyle, isHighlighted: highlighted.highlighted, highlightedColor: highlighted.color, highlightedNodes: highlightedNodes, icons: icons, entityMap: entityMap, hidden: hidden, hiddenEntities: hiddenEntities }));
        });
        return React.createElement(Node_1.Node, __assign({ key: id }, this.props, { children: children }));
    };
    return nodeWithGroup;
}(React.Component));
exports.nodeWithGroup = nodeWithGroup;
/**
 * Higher order Group component.
 * Much of the implementation of a Group is the same as the Node, since a group is a node but with children...
 * See: https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.z5a94mm1b
 *
 * @returns {Group}
 */
exports.Group = function (wrappedNode) { return new nodeWithGroup(wrappedNode); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHcm91cC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUUvQiwwREFBdUQ7QUFDdkQsbUNBQWdDO0FBQ2hDLCtCQUE0QjtBQUM1QixnREFBNkM7QUFFN0MsMkRBQTJEO0FBQzNEO0lBQW1DLGlDQUF5QjtJQUN4RCx1QkFBWSxXQUFnQjtlQUN4QixrQkFBTSxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDRCw4QkFBTSxHQUFOO1FBQ1UsSUFBQSxlQUMwQixFQUR6QixRQUFDLEVBQUUsUUFBQyxFQUFFLHdCQUFTLEVBQUUsc0NBQWdCLEVBQUUsb0NBQWUsRUFBRSw0QkFBVyxFQUFFLGdCQUFLLEVBQUUsNEJBQVcsRUFBRSxzQkFBUSxFQUFFLFVBQUUsRUFDcEcsa0NBQWMsQ0FBZTtRQUVqQyxJQUFNLFFBQVEsR0FBRyxRQUFRO2FBQ3BCLEdBQUcsQ0FBQyxVQUFDLFdBQVcsSUFBSyxPQUFBLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLGlIQUFpSDthQUM5SixNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDLENBQUMseURBQXlEO2FBQzVILEdBQUcsQ0FBQyxVQUFBLE1BQU07WUFDUCx5QkFBeUI7WUFDekIsSUFBSSxLQUFLLENBQUM7WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzFCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ25CLENBQUM7WUFFRCx1RUFBdUU7WUFDdkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDekIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUM7WUFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBQSxNQUFNO1lBQ1AsSUFBTSxXQUFXLEdBQUcsK0JBQWMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUM3RCxJQUFNLE1BQU0sR0FBRyxxQkFBUyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNqRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxvQkFBQyxlQUFNLGFBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQU0sTUFBTSxJQUFFLElBQUksRUFBRSxJQUFJLEdBQUUsSUFBSSxHQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUM1RSxlQUFlLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQzFELGFBQWEsRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQzNFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFDdEUsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUMzRCxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsb0JBQUMsV0FBSSxhQUFDLEdBQUcsRUFBRSxFQUFFLElBQU0sSUFBSSxDQUFDLEtBQUssSUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFHLENBQUM7SUFDaEUsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQTdDRCxDQUFtQyxLQUFLLENBQUMsU0FBUyxHQTZDakQ7QUE3Q1ksc0NBQWE7QUErQzFCOzs7Ozs7R0FNRztBQUNVLFFBQUEsS0FBSyxHQUFHLFVBQUMsV0FBVyxJQUFLLE9BQUEsSUFBSSxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQTlCLENBQThCLENBQUMifQ==