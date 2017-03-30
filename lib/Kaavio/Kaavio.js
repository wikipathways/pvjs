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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Diagram_1 = require("./components/Diagram");
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
var csstips_1 = require("csstips");
var PanZoom_1 = require("./components/PanZoom");
var manipulator_1 = require("./manipulator");
// pullAllWith is missing from the lodash typings so just require for now
// See issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13747
// TODO: Track the issue and go back to import * as _ from 'lodash'
var _ = require('lodash');
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
        _this.pushHighlighted = function (highlighted) {
            var toHighlight;
            if (highlighted.constructor !== Array) {
                toHighlight = [highlighted];
            }
            else {
                toHighlight = highlighted;
            }
            var highlightedNodes = _this.state.highlightedNodes;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(highlightedNodes, toHighlight, function (arrVal, othVal) {
                return arrVal.node_id == othVal.node_id;
            });
            _this.setState({
                highlightedNodes: highlightedNodes.concat(toHighlight)
            });
        };
        _this.popHighlighted = function (node_id) {
            var toRemove;
            if (typeof node_id === 'string') {
                toRemove = [node_id];
            }
            else {
                toRemove = node_id;
            }
            var highlightedNodes = _this.state.highlightedNodes;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(highlightedNodes, toRemove, function (arrVal, othVal) {
                return arrVal.node_id == othVal;
            });
            _this.setState({ highlightedNodes: highlightedNodes });
        };
        _this.resetHighlighted = function (exclude) {
            var highlightedNodes = _this.state.highlightedNodes;
            var toReset = highlightedNodes.map(function (highlightedNode) {
                return highlightedNode.node_id;
            });
            if (exclude) {
                toReset = _.pullAll(toReset, exclude);
            }
            _this.popHighlighted(toReset);
        };
        _this.isHighlighted = function (node_id) {
            var highlightedNodes = _this.state.highlightedNodes;
            return !!highlightedNodes.find(function (elem) {
                return elem.node_id === node_id;
            });
        };
        _this.pushHidden = function (entity_id) {
            var toHide;
            if (entity_id.constructor !== Array) {
                toHide = [entity_id];
            }
            else {
                toHide = entity_id;
            }
            var hiddenEntities = _this.state.hiddenEntities;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(hiddenEntities, toHide, function (arrVal, othVal) {
                return arrVal == othVal;
            });
            _this.setState({
                hiddenEntities: hiddenEntities.concat(toHide)
            });
        };
        _this.popHidden = function (entity_id) {
            var toRemove;
            if (typeof entity_id === 'string') {
                toRemove = [entity_id];
            }
            else {
                toRemove = entity_id;
            }
            var hiddenEntities = _this.state.hiddenEntities;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(hiddenEntities, toRemove, function (arrVal, othVal) {
                return arrVal == othVal;
            });
            _this.setState({ hiddenEntities: hiddenEntities });
        };
        _this.resetHidden = function (exclude) {
            var hiddenEntities = _this.state.hiddenEntities;
            var toReset = hiddenEntities;
            if (exclude) {
                toReset = _.pullAll(toReset, exclude);
            }
            _this.popHidden(toReset);
        };
        _this.isHidden = function (entity_id) {
            var hiddenEntities = _this.state.hiddenEntities;
            return hiddenEntities.indexOf(entity_id) > -1;
        };
        _this.state = {
            diagramRef: null,
            highlightedNodes: [],
            hiddenEntities: [],
        };
        csstips_1.normalize();
        // TODO doublecheck how to use setupPage
        csstips_1.setupPage('#' + _this.props.about);
        return _this;
    }
    Kaavio.prototype.onPanZoomReady = function (panZoom) {
        var diagramRef = this.state.diagramRef;
        if (!diagramRef)
            return;
        this.manipulator = new manipulator_1.Manipulator(this, panZoom, diagramRef);
        // Fire the onReady function with a reference to Kaavio
        var onReady = this.props.onReady;
        onReady(this);
    };
    Kaavio.prototype.render = function () {
        var _this = this;
        var _a = this.props, customStyle = _a.customStyle, filters = _a.filters, handleClick = _a.handleClick, entities = _a.entities, name = _a.name, width = _a.width, height = _a.height, edgeDrawers = _a.edgeDrawers, icons = _a.icons, markerDrawers = _a.markerDrawers, _b = _a.showPanZoomControls, showPanZoomControls = _b === void 0 ? true : _b;
        var _c = this.state, highlightedNodes = _c.highlightedNodes, hiddenEntities = _c.hiddenEntities;
        var backgroundColor = customStyle.backgroundColor || 'white';
        var about = this.props.about;
        about = about || ('kaavio-container-' + new Date().toISOString()).replace(/\W/g, '');
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
        return (React.createElement("div", { id: about, width: width, height: height, className: "kaavio-container " + customStyle.containerClass },
            React.createElement(Diagram_1.Diagram, { ref: function (diagram) { return !_this.state.diagramRef && _this.setState({ diagramRef: diagram }); }, about: "kaavio-diagram-for-" + about, name: name, width: width, height: height, backgroundColor: backgroundColor, edgeDrawers: edgeDrawers, entityMap: entityMap, filters: filters, handleClick: handleClick, icons: icons, markerDrawers: markerDrawers, zIndices: zIndices, customStyle: customStyle, highlightedNodes: highlightedNodes, hiddenEntities: hiddenEntities }),
            React.createElement(PanZoom_1.PanZoom, { diagram: this.state.diagramRef, onReady: function (panZoom) { return _this.onPanZoomReady(panZoom); }, showPanZoomControls: showPanZoomControls })));
    };
    return Kaavio;
}(React.Component));
exports.Kaavio = Kaavio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FhdmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0thYXZpby9LYWF2aW8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDZCQUErQjtBQUUvQixnREFBNkM7QUFDN0Msb0VBQW9FO0FBQ3BFLDBCQUEwQjtBQUMxQixtQ0FBNkM7QUFDN0MsZ0RBQTZDO0FBQzdDLDZDQUEwQztBQUUxQyx5RUFBeUU7QUFDekUsNkVBQTZFO0FBQzdFLG1FQUFtRTtBQUNuRSxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFPNUI7Ozs7OztHQU1HO0FBQ0g7SUFBNEIsMEJBQXlCO0lBR3BELGdCQUFZLEtBQUs7UUFBakIsWUFDQyxrQkFBTSxLQUFLLENBQUMsU0FVWjtRQVlELHFCQUFlLEdBQUcsVUFBQyxXQUFnRDtZQUNsRSxJQUFJLFdBQVcsQ0FBQztZQUNoQixFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFBLENBQUM7Z0JBQ3JDLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQzNCLENBQUM7WUFFTSxJQUFBLCtDQUFnQixDQUFlO1lBRXRDLGlGQUFpRjtZQUNqRixDQUFDLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFNO2dCQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLFFBQVEsQ0FBQztnQkFDYixnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO2FBQ3RELENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLG9CQUFjLEdBQUcs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