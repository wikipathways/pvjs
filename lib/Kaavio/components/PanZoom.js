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
var pan_zoom_style_1 = require("./pan-zoom-style");
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
        _this.init = function (diagram, onReady) {
            _this.destroy(); // Destroy the diagram first in case there is one
            var node = ReactDOM.findDOMNode(diagram);
            SVGPanZoom(node, {
                viewportSelector: '.svg-pan-zoom_viewport',
                controlIconsEnabled: false,
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
        this.init(nextProps.diagram, nextProps.onReady);
    };
    PanZoom.prototype.componentDidMount = function () {
        var _a = this.props, diagram = _a.diagram, onReady = _a.onReady;
        if (!diagram)
            return;
        this.init(diagram, onReady);
    };
    PanZoom.prototype.render = function () {
        return (React.createElement("div", { style: pan_zoom_style_1.styles.zoomControlsWrapper },
            React.createElement("button", { style: pan_zoom_style_1.styles.zoomControl, className: "zoomInClass btn btn-default", onClick: this.zoomIn },
                React.createElement("span", { className: "glyphicon glyphicon-zoom-in" }, " "),
                " "),
            React.createElement("button", { style: pan_zoom_style_1.styles.zoomControl, className: "zoomOutClass btn btn-default", onClick: this.zoomOut },
                React.createElement("span", { className: "glyphicon glyphicon-zoom-out" }, " "),
                " "),
            React.createElement("button", { style: pan_zoom_style_1.styles.zoomControl, className: "resetZoomClass btn btn-default", onClick: this.resetPanZoom }, "Reset")));
    };
    return PanZoom;
}(React.Component));
exports.PanZoom = PanZoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuWm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9QYW5ab29tLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFDL0IseUNBQTJDO0FBQzNDLG9DQUFzQztBQUN0QyxtREFBd0M7QUFFeEMsMEJBQTRCO0FBRTVCO0lBQTZCLDJCQUF5QjtJQUdsRCxpQkFBWSxLQUFLO1FBQWpCLFlBQ0ksa0JBQU0sS0FBSyxDQUFDLFNBQ2Y7UUFjRCxhQUFPLEdBQUc7WUFDTixFQUFFLENBQUEsQ0FBQyxDQUFFLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDO1FBRUYsVUFBSSxHQUFHLFVBQUMsT0FBTyxFQUFFLE9BQU87WUFDcEIsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsaURBQWlEO1lBQ2pFLElBQUksSUFBSSxHQUFlLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFlLENBQUM7WUFDbkUsVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDYixnQkFBZ0IsRUFBRSx3QkFBd0I7Z0JBQzFDLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLEdBQUcsRUFBRSxJQUFJO2dCQUNULE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixtQkFBbUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLFVBQUMsT0FBTzt3QkFDVixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2hDLE9BQU8sQ0FBQyxLQUFJLENBQUMsQ0FBQTtvQkFDakIsQ0FBQztvQkFDRCxrQkFBa0IsRUFBRSxFQUFFO29CQUN0QixPQUFPLEVBQUUsVUFB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