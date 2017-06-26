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
var SVGPanZoom = require("svg-pan-zoom");
var ReactDOM = require("react-dom");
var lodash_1 = require("lodash");
var d3 = require("d3");
var PanZoom = (function (_super) {
    __extends(PanZoom, _super);
    function PanZoom(props) {
        var _this = _super.call(this, props) || this;
        _this.destroy = function () {
            var panZoom = _this.state.panZoom;
            if (!panZoom)
                return;
            panZoom.destroy();
            _this.setState({
                ready: false,
                shouldPan: false,
                shouldZoom: false,
                panZoom: null,
            });
        };
        _this.init = function (diagram, onInit) {
            _this.destroy(); // Destroy the diagram first in case there is one
            var node = ReactDOM.findDOMNode(diagram);
            SVGPanZoom(node, {
                viewportSelector: '.svg-pan-zoom_viewport',
                controlIconsEnabled: true,
                fit: true,
                center: true,
                minZoom: 0.1,
                maxZoom: 20.0,
                zoomEnabled: false,
                customEventsHandler: {
                    init: function (options) {
                        if (!onInit)
                            return;
                        onInit(options.instance);
                        var onReady = _this.props.onReady;
                        onReady();
                    },
                    haltEventListeners: [],
                    destroy: function () { }
                },
                beforeZoom: function () {
                    // Don't allow if not ready
                    var ready = _this.state.ready;
                    if (!ready)
                        return false;
                    // Don't allow any more zooming until done
                    // Reset the zoomedEntities since the diagram has moved and we can't be sure they are still zoomed on
                    _this.setState({ ready: false, zoomedEntities: [] });
                    return true;
                },
                beforePan: function () {
                    // Don't allow if not ready
                    var ready = _this.state.ready;
                    if (!ready)
                        return false;
                    // Don't allow any more panning until done
                    // Reset pannedEntities since the diagram has moved and we can't be sure they are still panned on
                    _this.setState({ ready: false, pannedEntities: [] });
                    return true;
                },
                onUpdatedCTM: function () { return _this.setState({ ready: true }); }
            });
        };
        _this.state = {
            ready: false,
            panZoom: null,
            shouldZoom: false,
            shouldPan: false,
            // Users can pan/zoom the diagram so the state provides an actual representation of the pan/zoom state
            zoomedEntities: props.zoomedEntities,
            pannedEntities: props.pannedEntities,
        };
        return _this;
    }
    PanZoom.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var prevProps = this.props;
        var _a = nextProps.pannedEntities, pannedEntities = _a === void 0 ? [] : _a, _b = nextProps.zoomedEntities, zoomedEntities = _b === void 0 ? [] : _b, diagram = nextProps.diagram;
        if (!lodash_1.isEqual(diagram, prevProps.diagram)) {
            var onInit = function (panZoomInstance) {
                _this.setState({
                    panZoom: panZoomInstance,
                    ready: true,
                    shouldZoom: true,
                    shouldPan: true,
                });
            };
            this.init(nextProps.diagram, onInit);
        }
        if (!lodash_1.isEqual(this.state.pannedEntities, pannedEntities) || pannedEntities.length < 1) {
            this.setState({ shouldPan: true, pannedEntities: pannedEntities });
        }
        if (!lodash_1.isEqual(this.state.zoomedEntities, zoomedEntities) || zoomedEntities.length < 1) {
            this.setState({ shouldZoom: true, zoomedEntities: zoomedEntities });
        }
    };
    PanZoom.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        // Whenever the state or props change, we check if the component should pan or zoom
        // If ONE of them is needed, it is performed
        // By calling setState in the then callback, this will be called again
        // So if both of them are needed, they are performed one after the other
        var _a = this.state, shouldPan = _a.shouldPan, shouldZoom = _a.shouldZoom, ready = _a.ready;
        if (shouldPan && ready) {
            this.panToEntities().then(function () {
                _this.setState({ shouldPan: false });
            });
        }
        else if (shouldZoom && ready) {
            this.zoomOnEntities().then(function () {
                _this.setState({ shouldZoom: false });
            });
        }
    };
    PanZoom.prototype.zoomOnEntities = function () {
        var _this = this;
        var _a = this.props.zoomedEntities, zoomedEntities = _a === void 0 ? [] : _a;
        var panZoom = this.state.panZoom;
        return new Promise(function (resolve) {
            if (!zoomedEntities || zoomedEntities.length < 1) {
                panZoom.resetZoom();
                resolve();
                return;
            }
            panZoom.setOnZoom(function () {
                panZoom.setOnZoom(function () { });
                resolve();
            });
            var BBox = _this.locate(zoomedEntities);
            var containerBBox = panZoom.getSizes();
            var scalingFactor = 0.8;
            if (BBox.width >= BBox.height) {
                panZoom.zoom((containerBBox.width / BBox.width) * scalingFactor * containerBBox.realZoom);
                return;
            }
            panZoom.zoom((containerBBox.height / BBox.height) * scalingFactor * containerBBox.realZoom);
        });
    };
    PanZoom.prototype.panToEntities = function () {
        var _this = this;
        var _a = this.props.pannedEntities, pannedEntities = _a === void 0 ? [] : _a;
        var panZoom = this.state.panZoom;
        return new Promise(function (resolve) {
            if (!pannedEntities || pannedEntities.length < 1) {
                panZoom.center();
                resolve();
                return;
            }
            panZoom.setOnPan(function () {
                panZoom.setOnPan(function () { });
                resolve();
            });
            var BBox = _this.locate(pannedEntities);
            var curPan = panZoom.getPan();
            var containerSizes = panZoom.getSizes();
            var coordinates = {
                x: -BBox.x - (BBox.width / 2) + curPan.x + (containerSizes.width / 2),
                y: -BBox.y - (BBox.height / 2) + curPan.y + (containerSizes.height / 2),
            };
            panZoom.pan(coordinates);
        });
    };
    PanZoom.prototype.locate = function (entities) {
        var diagram = this.props.diagram;
        var panZoom = this.state.panZoom;
        var diagramDOMNode = ReactDOM.findDOMNode(diagram);
        // This may not be the best algorithm to do this. It will compute the BBox for every entity
        // TODO: Increase efficiency of this
        var BBoxes = entities
            .map(function (singleEntity) { return d3.select(diagramDOMNode).select("g#" + singleEntity)._groups[0][0]; })
            .filter(function (locatedEntity) { return !!locatedEntity; })
            .map(function (locatedEntity) { return Object.assign({}, { BBox: locatedEntity.getBBox(), matrix: locatedEntity.getCTM() }); })
            .map(function (coords) {
            var relPoint = diagramDOMNode.createSVGPoint();
            relPoint.x = coords.BBox.x;
            relPoint.y = coords.BBox.y;
            var newRelPoint = relPoint.matrixTransform(coords.matrix);
            var realZoom = panZoom.getSizes().realZoom;
            return {
                x: newRelPoint.x,
                y: newRelPoint.y,
                width: coords.BBox.width * realZoom,
                height: coords.BBox.height * realZoom,
            };
        });
        if (BBoxes.length === 1) {
            return BBoxes[0];
        }
        var minX = lodash_1.minBy(BBoxes, function (BBox) { return BBox.x; }).x;
        var minY = lodash_1.minBy(BBoxes, function (BBox) { return BBox.y; }).y;
        var maxX = lodash_1.maxBy(BBoxes, function (BBox) { return BBox.x; }).x;
        var maxY = lodash_1.maxBy(BBoxes, function (BBox) { return BBox.y; }).y;
        return {
            x: minX,
            y: minY,
            height: maxY - minY,
            width: maxX - minX,
        };
    };
    PanZoom.prototype.render = function () {
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    };
    return PanZoom;
}(React.Component));
exports.PanZoom = PanZoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuWm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlBhblpvb20udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBQy9CLHlDQUEyQztBQUMzQyxvQ0FBc0M7QUFDdEMsaUNBQStDO0FBQy9DLHVCQUF5QjtBQUV6QjtJQUE2QiwyQkFBeUI7SUFDbEQsaUJBQVksS0FBSztRQUFqQixZQUNJLGtCQUFNLEtBQUssQ0FBQyxTQVVmO1FBMkNELGFBQU8sR0FBRztZQUNFLElBQUEsNkJBQU8sQ0FBZ0I7WUFDL0IsRUFBRSxDQUFBLENBQUMsQ0FBRSxPQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixLQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUssRUFBRSxLQUFLO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixVQUFVLEVBQUUsS0FBSztnQkFDakIsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDO1FBRUYsVUFBSSxHQUFHLFVBQUMsT0FBTyxFQUFFLE1BQU87WUFDcEIsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsaURBQWlEO1lBQ2pFLElBQUksSUFBSSxHQUFlLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFlLENBQUM7WUFDbkUsVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDYixnQkFBZ0IsRUFBRSx3QkFBd0I7Z0JBQzFDLG1CQUFtQixFQUFFLElBQUk7Z0JBQ3pCLEdBQUcsRUFBRSxJQUFJO2dCQUNULE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixtQkFBbUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLFVBQUMsT0FBTzt3QkFDVixFQUFFLENBQUEsQ0FBQyxDQUFFLE1BQU8sQ0FB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