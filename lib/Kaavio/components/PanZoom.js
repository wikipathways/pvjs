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
var SVGPanZoom = require("svg-pan-zoom");
var ReactDOM = require("react-dom");
var _ = require("lodash");
var PanZoom = (function (_super) {
    __extends(PanZoom, _super);
    function PanZoom(props) {
        var _this = _super.call(this, props) || this;
        _this.destroy = function () {
            if (!_this.panZoom)
                return;
            _this.panZoom.destroy();
        };
        _this.init = function (diagram, onReady, showControls) {
            _this.destroy(); // Destroy the diagram first in case there is one
            var node = ReactDOM.findDOMNode(diagram);
            SVGPanZoom(node, {
                viewportSelector: '.svg-pan-zoom_viewport',
                controlIconsEnabled: showControls,
                fit: true,
                center: true,
                minZoom: 0.1,
                maxZoom: 20.0,
                zoomEnabled: false,
                customEventsHandler: {
                    init: function (options) {
                        _this.panZoom = options.instance;
                        onReady(_this);
                    },
                    haltEventListeners: [],
                    destroy: function (_) { }
                }
            });
        };
        _this.getSizes = function () {
            return _this.panZoom.getSizes();
        };
        _this.getPan = function () {
            return _this.panZoom.getPan();
        };
        _this.zoom = function (zoom_perc) {
            _this.panZoom.zoom(zoom_perc);
        };
        _this.pan = function (coordinates) {
            _this.panZoom.pan(coordinates);
        };
        _this.zoomIn = function () {
            _this.panZoom.zoomIn();
        };
        _this.zoomOut = function () {
            _this.panZoom.zoomOut();
        };
        _this.resetPanZoom = function () {
            _this.panZoom.reset();
        };
        return _this;
    }
    PanZoom.prototype.componentWillReceiveProps = function (nextProps, nextState) {
        var prevProps = this.props;
        if (_.isEqual(nextProps.diagram, prevProps.diagram))
            return;
        this.init(nextProps.diagram, nextProps.onReady, nextProps.showPanZoomControls);
    };
    PanZoom.prototype.componentDidMount = function () {
        var _a = this.props, diagram = _a.diagram, onReady = _a.onReady, showPanZoomControls = _a.showPanZoomControls;
        if (!diagram)
            return;
        this.init(diagram, onReady, showPanZoomControls);
    };
    PanZoom.prototype.render = function () {
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    };
    return PanZoom;
}(React.Component));
exports.PanZoom = PanZoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuWm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9QYW5ab29tLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFDL0IseUNBQTJDO0FBQzNDLG9DQUFzQztBQUV0QywwQkFBNEI7QUFFNUI7SUFBNkIsMkJBQXlCO0lBR2xELGlCQUFZLEtBQUs7UUFBakIsWUFDSSxrQkFBTSxLQUFLLENBQUMsU0FDZjtRQWNELGFBQU8sR0FBRztZQUNOLEVBQUUsQ0FBQSxDQUFDLENBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUM7UUFFRixVQUFJLEdBQUcsVUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQXFCO1lBQzNDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLGlEQUFpRDtZQUNqRSxJQUFJLElBQUksR0FBZSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBZSxDQUFDO1lBQ25FLFVBQVUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsZ0JBQWdCLEVBQUUsd0JBQXdCO2dCQUMxQyxtQkFBbUIsRUFBRSxZQUFZO2dCQUNqQyxHQUFHLEVBQUUsSUFBSTtnQkFDVCxNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUUsSUFBSTtnQkFDYixXQUFXLEVBQUUsS0FBSztnQkFDbEIsbUJBQW1CLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxVQUFDLE9BQU87d0JBQ1YsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNoQyxPQUFPLENBQUMsS0FBSSxDQUFDLENBQUE7b0JBQ2pCLENBQUM7b0JBQ0Qsa0JBQWtCLEVBQUUsRUFBRTtvQkFDdEIsT0FBTyxFQUFFLFVBQUMsQ0FBQyxJQUFNLENBQUM7aUJBQ3JCO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBRUYsY0FBUSxHQUFHO1lBQ1AsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDO1FBRUYsWUFBTSxHQUFHO1lBQ0wsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDO1FBRUYsVUFBSSxHQUFHLFVBQUMsU0FBaUI7WUFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDO1FBRUYsU0FBRyxHQUFHLFVBQUMsV0FBbUM7WUFDdEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDO1FBRUYsWUFBTSxHQUFHO1lBQ1AsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN2QixDQUFDLENBQUM7UUFFRixhQUFPLEdBQUc7WUFDTixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUVGLGtCQUFZLEdBQUc7WUFDWCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzs7SUFuRUYsQ0FBQztJQUVELDJDQUF5QixHQUF6QixVQUEwQixTQUFTLEVBQUUsU0FBUztRQUMxQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdCLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELG1DQUFpQixHQUFqQjtRQUNVLElBQUEsZUFBb0QsRUFBbkQsb0JBQU8sRUFBRSxvQkFBTyxFQUFFLDRDQUFtQixDQUFlO1FBQzNELEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUF5REQsd0JBQU0sR0FBTjtRQUNJLHNDQUFzQztRQUN0Qyw0Q0FBNEM7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUEvRUQsQ0FBNkIsS0FBSyxDQUFDLFNBQVMsR0ErRTNDO0FBL0VZLDBCQUFPIn0=