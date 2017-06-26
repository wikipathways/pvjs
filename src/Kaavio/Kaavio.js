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
var React = require("react");
var Diagram_1 = require("./components/Diagram");
var PanZoom_1 = require("./components/PanZoom");
/**
 * Kaavio component.
 * This is the highest component in Kaavio. All states are handled here and passed down as props to other components.
 *
 * You may pass an onReady(kaavio) function to this. This will be called with the Kaavio reference when everything is
 * rendered. You can access the manipulation API via kaavio.manipulator
 */
var Kaavio = (function (_super) {
    __extends(Kaavio, _super);
    function Kaavio(props) {
        var _this = _super.call(this, props) || this;
        _this.onPanZoomReady = function (panZoom) {
            // Fire the onReady function with a reference to Kaavio
            var onReady = _this.props.onReady;
            onReady(_this);
        };
        _this.handleClick = function (e) {
            var onEntityClick = _this.props.onEntityClick;
            var entity = e.entity;
            if (onEntityClick && entity)
                onEntityClick(entity);
        };
        _this.state = {
            diagramRef: null,
        };
        return _this;
    }
    Kaavio.prototype.render = function () {
        var _this = this;
        var _a = this.props, customStyle = _a.customStyle, filters = _a.filters, entities = _a.entities, name = _a.name, width = _a.width, height = _a.height, edgeDrawers = _a.edgeDrawers, icons = _a.icons, markerDrawers = _a.markerDrawers, highlightedEntities = _a.highlightedEntities, hiddenEntities = _a.hiddenEntities, zoomedEntities = _a.zoomedEntities, pannedEntities = _a.pannedEntities, _b = _a.showPanZoomControls, showPanZoomControls = _b === void 0 ? true : _b;
        var backgroundColor = customStyle.backgroundColor || 'white';
        var about = 'kaavio-container';
        // This is a port to the legacy use of node_id
        // TODO: Change all references of highlightedNodes to the new highlightedEntities
        var highlightedEntitiesLegacy = highlightedEntities ? highlightedEntities.map(function (singleHighlightedEntity) {
            return {
                node_id: singleHighlightedEntity.entityId,
                color: singleHighlightedEntity.color
            };
        }) : [];
        var entityMap = entities.reduce(function (acc, entity) {
            acc[entity.id] = entity;
            return acc;
        }, {});
        var zIndices = entities
            .sort(function (a, b) {
            if (a.zIndex > b.zIndex) {
                return 1;
            }
            else if (a.zIndex < b.zIndex) {
                return -1;
            }
            else {
                return 0;
            }
        })
            .map(function (entity) { return entity.id; });
        // TODO: Don't use refs!
        // Accessing the diagram ref from the state is a little bit of a hack to get panZoom working.
        // Consider refactoring the panZoom to be truly Reactive and not use refs
        return (React.createElement("div", { id: about, className: "kaavio-container " + customStyle.containerClass },
            React.createElement(Diagram_1.Diagram, { ref: function (diagram) { return !_this.state.diagramRef && _this.setState({ diagramRef: diagram }); }, about: "kaavio-diagram-for-" + about, name: name, width: width, height: height, backgroundColor: backgroundColor, edgeDrawers: edgeDrawers, entityMap: entityMap, filters: filters, handleClick: this.handleClick, icons: icons, markerDrawers: markerDrawers, zIndices: zIndices, customStyle: customStyle, highlightedNodes: highlightedEntitiesLegacy, hiddenEntities: hiddenEntities }),
            React.createElement(PanZoom_1.PanZoom, { diagram: this.state.diagramRef, zoomedEntities: zoomedEntities, pannedEntities: pannedEntities, onReady: this.onPanZoomReady, showPanZoomControls: showPanZoomControls })));
    };
    return Kaavio;
}(React.Component));
exports.Kaavio = Kaavio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FhdmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiS2FhdmlvLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQixnREFBNkM7QUFDN0MsZ0RBQTZDO0FBRTdDOzs7Ozs7R0FNRztBQUNIO0lBQTRCLDBCQUF5QjtJQUVwRCxnQkFBWSxLQUFLO1FBQWpCLFlBQ0Msa0JBQU0sS0FBSyxDQUFDLFNBSVo7UUFFRCxvQkFBYyxHQUFHLFVBQUMsT0FBTztZQUN4Qix1REFBdUQ7WUFDaEQsSUFBQSw2QkFBTyxDQUFlO1lBQzdCLE9BQU8sQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQztRQUVGLGlCQUFXLEdBQUcsVUFBQyxDQUFDO1lBQ1AsSUFBQSx5Q0FBYSxDQUFnQjtZQUNyQyxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUM7Z0JBQzNCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUE7UUFoQkEsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNaLFVBQVUsRUFBRSxJQUFJO1NBQ2hCLENBQUM7O0lBQ0gsQ0FBQztJQWVELHVCQUFNLEdBQU47UUFBQSxpQkFnRUM7UUEvRE0sSUFBQSxlQUVtQyxFQUZsQyw0QkFBVyxFQUFFLG9CQUFPLEVBQUUsc0JBQVEsRUFBRSxjQUFJLEVBQUUsZ0JBQUssRUFBRSxrQkFBTSxFQUFFLDRCQUFXLEVBQUUsZ0JBQUssRUFDN0UsZ0NBQWEsRUFBRSw0Q0FBbUIsRUFBRSxrQ0FBYyxFQUFFLGtDQUFjLEVBQUUsa0NBQWMsRUFDbEYsMkJBQTBCLEVBQTFCLCtDQUEwQixDQUFlO1FBRTFDLElBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxlQUFlLElBQUksT0FBTyxDQUFFO1FBQ2hFLElBQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDO1FBRWpDLDhDQUE4QztR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