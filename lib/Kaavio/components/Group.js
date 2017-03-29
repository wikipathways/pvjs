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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL2NvbXBvbmVudHMvR3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBRS9CLDBEQUF1RDtBQUN2RCxtQ0FBZ0M7QUFDaEMsK0JBQTRCO0FBQzVCLGdEQUE2QztBQUU3QywyREFBMkQ7QUFDM0Q7SUFBbUMsaUNBQXlCO0lBQ3hELHVCQUFZLFdBQWdCO2VBQ3hCLGtCQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNELDhCQUFNLEdBQU47UUFDVSxJQUFBLGVBQzBCLEVBRHpCLFFBQUMsRUFBRSxRQUFDLEVBQUUsd0JBQVMsRUFBRSxzQ0FBZ0IsRUFBRSxvQ0FBZSxFQUFFLDRCQUFXLEVBQUUsZ0JBQUssRUFBRSw0QkFBVyxFQUFFLHNCQUFRLEVBQUUsVUFBRSxFQUNwRyxrQ0FBYyxDQUFlO1FBRWpDLElBQU0sUUFBUSxHQUFHLFFBQVE7YUFDcEIsR0FBRyxDQUFDLFVBQUMsV0FBVyxJQUFLLE9BQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUMsaUhBQWlIO2FBQzlKLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWhELENBQWdELENBQUMsQ0FBQyx5REFBeUQ7YUFDNUgsR0FBRyxDQUFDLFVBQUEsTUFBTTtZQUNQLHlCQUF5QjtZQUN6QixJQUFJLEtBQUssQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDMUIsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDbkIsQ0FBQztZQUVELHVFQUF1RTtZQUN2RSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUN6QixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDMUIsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFBLE1BQU07WUFDUCxJQUFNLFdBQVcsR0FBRywrQkFBYyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdELElBQU0sTUFBTSxHQUFHLHFCQUFTLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLG9CQUFDLGVBQU0sYUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBTSxNQUFNLElBQUUsSUFBSSxFQUFFLElBQUksR0FBRSxJQUFJLEdBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQzVFLGVBQWUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFDMUQsYUFBYSxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFDM0UsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUN0RSxNQUFNLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQzNELENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNQLE1BQU0sQ0FBQyxvQkFBQyxXQUFJLGFBQUMsR0FBRyxFQUFFLEVBQUUsSUFBTSxJQUFJLENBQUMsS0FBSyxJQUFFLFFBQVEsRUFBRSxRQUFRLElBQUcsQ0FBQztJQUNoRSxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBN0NELENBQW1DLEtBQUssQ0FBQyxTQUFTLEdBNkNqRDtBQTdDWSxzQ0FBYTtBQStDMUI7Ozs7OztHQU1HO0FBQ1UsUUFBQSxLQUFLLEdBQUcsVUFBQyxXQUFXLElBQUssT0FBQSxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyJ9