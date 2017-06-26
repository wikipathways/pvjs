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
var highlighter_1 = require("../filters/highlighter");
var Text_1 = require("./Text");
var Node_1 = require("./Node");
var Group_1 = require("./Group");
var Edge_1 = require("./Edge");
var getHighlighted_1 = require("../utils/getHighlighted");
var getHidden_1 = require("../utils/getHidden");
/**
 * Parent Entity component.
 * Most components share many properties so we "lift state up" to the parent.
 */
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(props) {
        return _super.call(this, props) || this;
    }
    Entity.prototype.renderText = function () {
        var _a = this.props, width = _a.width, height = _a.height, id = _a.id, textContent = _a.textContent, fontFamily = _a.fontFamily, fontSize = _a.fontSize, fontStyle = _a.fontStyle, fontWeight = _a.fontWeight, textAlign = _a.textAlign, color = _a.color;
        if (!textContent)
            return;
        return React.createElement(Text_1.Text, { id: "text-for-" + id, key: "text-for-" + id, className: "textlabel", textContent: textContent, fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, fontStyle: fontStyle, textAlign: textAlign, color: color, width: width, height: height });
    };
    Entity.prototype.renderBurrs = function () {
        var _a = this.props, burrs = _a.burrs, entityMap = _a.entityMap, width = _a.width, height = _a.height, kaavioType = _a.kaavioType, edgeDrawers = _a.edgeDrawers, points = _a.points, drawAs = _a.drawAs, backgroundColor = _a.backgroundColor, customStyle = _a.customStyle, icons = _a.icons, highlightedNodes = _a.highlightedNodes, hiddenEntities = _a.hiddenEntities;
        if (!burrs || burrs.length < 1)
            return;
        return burrs.map(function (burrId) { return entityMap[burrId]; })
            .map(function (burr) {
            // NOTE: notice side effect
            burr.width += 0;
            burr.height += 0;
            var attachmentDisplay = burr.attachmentDisplay;
            var position = attachmentDisplay.position;
            var offset = attachmentDisplay.hasOwnProperty('offset') ? attachmentDisplay.offset : [0, 0];
            // kaavioType is referring to the entity the burr is attached to
            if (['Node', 'Group'].indexOf(kaavioType) > -1) {
                burr.x = width * position[0] - burr.width / 2 + offset[0];
                burr.y = height * position[1] - burr.height / 2 + offset[1];
            }
            else if (kaavioType === 'Edge') {
                // TODO get edge logic working so we can position this better
                // TODO look at current production pvjs to see how this is done
                var positionXY = edgeDrawers[drawAs].getPointAtPosition(points, position[0]);
                burr.x = positionXY.x - burr.width / 2 + offset[0];
                burr.y = positionXY.y - burr.height / 2 + offset[1];
            }
            else {
                throw new Error("Cannot handle burr with parent of type " + kaavioType);
            }
            return burr;
        })
            .map(function (burr) {
            // Return a new entity with the burr
            // If just a Node is returned then actions such as highlighting the burr individually cannot be done
            burr.kaavioType = "Node";
            var highlighted = getHighlighted_1.getHighlighted(burr, highlightedNodes);
            var hidden = getHidden_1.getHidden(burr, hiddenEntities);
            var icon = icons[burr.drawAs];
            return React.createElement(Entity, __assign({ key: burr.id }, burr, { edgeDrawers: edgeDrawers, backgroundColor: backgroundColor, customStyle: customStyle, isHighlighted: highlighted.highlighted, highlightedColor: highlighted.color, highlightedNodes: highlightedNodes, icon: icon, icons: icons, entityMap: entityMap, hiddenEntities: hiddenEntities, hidden: hidden }));
        });
    };
    Entity.prototype.render = function () {
        var _a = this.props, rotation = _a.rotation, width = _a.width, height = _a.height, type = _a.type, id = _a.id, x = _a.x, y = _a.y, color = _a.color, kaavioType = _a.kaavioType, customClass = _a.customClass, isHighlighted = _a.isHighlighted, highlightedColor = _a.highlightedColor, hidden = _a.hidden;
        var entityTransform;
        if (x || y || rotation) {
            entityTransform = "translate(" + x + "," + y + ")";
            if (rotation) {
                entityTransform += " rotate(" + rotation + "," + (x + width / 2) + "," + (y + height / 2) + ")";
            }
        }
        // Anders: I think it's best to be explicit. Instead of using components[kaavioType] do this.
        // I know it's a bit redundant but in this case I think it aids comprehension
        var child;
        switch (kaavioType) {
            case 'Node':
                child = React.createElement(Node_1.Node, __assign({}, this.props));
                break;
            case 'Edge':
                child = React.createElement(Edge_1.Edge, __assign({}, this.props));
                break;
            case 'Group':
                child = React.createElement(Group_1.Group, __assign({}, this.props));
                break;
            default:
                throw new Error('The Kaavio type of ' + kaavioType + ' does not exist. Please use one of ' +
                    'Node, Edge, or Group.');
        }
        return (React.createElement("g", { id: id, key: id, className: customClass, color: color, visibility: hidden ? 'hidden' : 'visible', transform: entityTransform, filter: isHighlighted ? 'url(#' + highlighter_1.highlighter(id, highlightedColor).url + ')' : null },
            React.createElement("defs", null, isHighlighted ? highlighter_1.highlighter(id, highlightedColor).filter : null),
            child,
            this.renderBurrs(),
            this.renderText()));
    };
    return Entity;
}(React.Component));
exports.Entity = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRW50aXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBRS9CLHNEQUFtRDtBQUNuRCwrQkFBNEI7QUFDNUIsK0JBQTRCO0FBRTVCLGlDQUE4QjtBQUM5QiwrQkFBNEI7QUFDNUIsMERBQXVEO0FBQ3ZELGdEQUE2QztBQUc3Qzs7O0dBR0c7QUFDSDtJQUE0QiwwQkFBeUI7SUFDakQsZ0JBQVksS0FBa0I7ZUFDMUIsa0JBQU0sS0FBSyxDQUFDO0lBQ2hCLENBQUM7SUFFRCwyQkFBVSxHQUFWO1FBQ1UsSUFBQSxlQUNVLEVBRFIsZ0JBQUssRUFBRSxrQkFBTSxFQUFFLFVBQUUsRUFBRSw0QkFBVyxFQUFFLDBCQUFVLEVBQUUsc0JBQVEsRUFBRSx3QkFBUyxFQUFFLDBCQUFVLEVBQUUsd0JBQVMsRUFBRSxnQkFBSyxDQUNwRjtRQUNqQixFQUFFLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUV4QixNQUFNLENBQUMsb0JBQUMsV0FBSSxJQUFDLEVBQUUsRUFBRSxjQUFZLEVBQUksRUFBRSxHQUFHLEVBQUUsY0FBWSxFQUFJLEVBQUUsU0FBUyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUUsV0FBVyxFQUMzRixVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUN4RixTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxHQUFHLENBQUE7SUFDcEYsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFDVSxJQUFBLGVBRVUsRUFGVCxnQkFBSyxFQUFFLHdCQUFTLEVBQUUsZ0JBQUssRUFBRSxrQkFBTSxFQUFFLDBCQUFVLEVBQUUsNEJBQVcsRUFBRSxr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