"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var ReactDOM = require("react-dom");
/**
 * Class for "The Manipulation API".
 * Really, this is just a wrapper around public functions within Kaavio components with a few extras.
 * Implements highlighting and zooming/panning to nodes or groups of nodes.
 */
var Manipulator = (function () {
    function Manipulator(kaavioRef, panZoomRef, diagramRef) {
        this.panZoom = panZoomRef;
        this.kaavio = kaavioRef;
        this.diagram = ReactDOM.findDOMNode(diagramRef);
        this.relPoint = this.diagram.createSVGPoint();
    }
    /**
     * Toggle the highlighting of one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    Manipulator.prototype.toggleHighlight = function (entity_id, color, resetOthers, resetHidden, resetPanZoom) {
        var _this = this;
        if (resetOthers === void 0) { resetOthers = true; }
        if (resetHidden === void 0) { resetHidden = false; }
        if (resetPanZoom === void 0) { resetPanZoom = true; }
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHidden)
            this.resetHidden();
        if (typeof entity_id === 'string') {
            var arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHighlighted(entity_id);
        entity_id.forEach(function (single_id) {
            var highlighted = _this.kaavio.isHighlighted(single_id);
            if (highlighted) {
                _this.highlightOff(single_id, false, false, false);
            }
            else {
                _this.highlightOn(single_id, color, false, false, false);
            }
        });
    };
    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    Manipulator.prototype.highlightOn = function (entity_id, color, resetOthers, resetHidden, resetPanZoom) {
        if (resetOthers === void 0) { resetOthers = true; }
        if (resetHidden === void 0) { resetHidden = true; }
        if (resetPanZoom === void 0) { resetPanZoom = true; }
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHidden)
            this.resetHidden();
        if (!color)
            throw new Error("No color specified.");
        if (typeof entity_id === 'string') {
            var arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHighlighted(entity_id);
        var toHighlight = entity_id.map(function (single_id) {
            return {
                node_id: single_id,
                color: color
            };
        });
        this.kaavio.pushHighlighted(toHighlight);
    };
    /**
     * Turn off the highlighting of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    Manipulator.prototype.highlightOff = function (entity_id, resetOthers, resetHidden, resetPanZoom) {
        if (resetOthers === void 0) { resetOthers = true; }
        if (resetHidden === void 0) { resetHidden = true; }
        if (resetPanZoom === void 0) { resetPanZoom = true; }
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHidden)
            this.resetHidden();
        if (typeof entity_id === 'string') {
            var arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHighlighted(entity_id);
        this.kaavio.popHighlighted(entity_id);
    };
    /**
     * Un-highlight all highlighted entities except those in the exclude array
     * @param exclude
     */
    Manipulator.prototype.resetHighlighted = function (exclude) {
        this.kaavio.resetHighlighted(exclude);
    };
    /**
     * Toggle the displaying of one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other hidden nodes before hiding. Default = true
     * @param resetHighlighted - Reset the highlighted entities before toggling. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    Manipulator.prototype.toggleHidden = function (entity_id, color, resetOthers, resetHighlighted, resetPanZoom) {
        var _this = this;
        if (resetOthers === void 0) { resetOthers = false; }
        if (resetHighlighted === void 0) { resetHighlighted = true; }
        if (resetPanZoom === void 0) { resetPanZoom = true; }
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            var arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHidden(entity_id);
        entity_id.forEach(function (single) {
            var hidden = _this.kaavio.isHidden(single);
            if (hidden) {
                _this.show(single, false, false, false);
            }
            else {
                _this.hide(single, false, false, false);
            }
        });
    };
    /**
     * Hide one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other hidden entities first. Default = true
     * @param resetHighlighted - Reset the highlighted entities before hiding. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    Manipulator.prototype.hide = function (entity_id, resetOthers, resetHighlighted, resetPanZoom) {
        if (resetOthers === void 0) { resetOthers = true; }
        if (resetHighlighted === void 0) { resetHighlighted = true; }
        if (resetPanZoom === void 0) { resetPanZoom = true; }
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            var arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHidden(entity_id);
        this.kaavio.pushHidden(entity_id);
    };
    /**
     * Show one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other hidden entities first. Default = true
     * @param resetHighlighted - Reset the highlighted entities before showing. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    Manipulator.prototype.show = function (entity_id, resetOthers, resetHighlighted, resetPanZoom) {
        if (resetOthers === void 0) { resetOthers = true; }
        if (resetHighlighted === void 0) { resetHighlighted = true; }
        if (resetPanZoom === void 0) { resetPanZoom = true; }
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            var arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHidden(entity_id);
        this.kaavio.popHidden(entity_id);
    };
    /**
     * Un-highlight all highlighted nodes except those in the exclude array
     * @param exclude
     */
    Manipulator.prototype.resetHidden = function (exclude) {
        this.kaavio.resetHidden(exclude);
    };
    /**
     * Return the node element reference by the node_id
     * @param node_id
     * @returns {SVGLocatable}
     */
    Manipulator.prototype.findNode = function (node_id) {
        return d3.select(this.diagram).select("g#" + node_id)[0][0];
    };
    /**
     * Return the parent viewport that all other elements are relative to
     * @returns {HTMLElement}
     */
    Manipulator.prototype.getViewport = function () {
        return d3.select(this.diagram).select(".svg-pan-zoom_viewport")[0][0];
    };
    /**
     * Get the bounding box of an entity.
     * @param node_id
     * @returns {{x: any, y: any, height: number, width: number}}
     */
    Manipulator.prototype.getNodeBBox = function (node_id) {
        var node = this.findNode(node_id);
        var viewport = this.getViewport();
        var svg = this.diagram;
        var BBox = node.getBBox();
        var matrix = node.getCTM();
        this.relPoint.x = BBox.x;
        this.relPoint.y = BBox.y;
        this.relPoint = this.relPoint.matrixTransform(matrix);
        var realZoom = this.panZoom.getSizes().realZoom;
        return {
            x: this.relPoint.x,
            y: this.relPoint.y,
            height: BBox.height * realZoom,
            width: BBox.width * realZoom
        };
    };
    /**
     * Get the bounding box for a group of entities.
     * Note: if there is a huge number of node_ids this might take a while...
     * @param node_ids
     * @returns {{x: null, y: null, height: number, width: number}}
     */
    Manipulator.prototype.getGroupBBox = function (node_ids) {
        var _this = this;
        var coordLimits = {
            highestX: null,
            lowestX: null,
            highestY: null,
            lowestY: null
        };
        node_ids.forEach(function (node_id) {
            var node = _this.findNode(node_id);
            var clientRect = _this.getNodeBBox(node_id);
            var nodeHighestX = clientRect.x + clientRect.width;
            if (!coordLimits.highestX || nodeHighestX > coordLimits.highestX)
                coordLimits.highestX = nodeHighestX;
            if (!coordLimits.lowestX || clientRect.x < coordLimits.lowestX)
                coordLimits.lowestX = clientRect.x;
            var nodeHighestY = clientRect.y + clientRect.height;
            if (!coordLimits.highestY || nodeHighestY > coordLimits.highestY)
                coordLimits.highestY = nodeHighestY;
            if (!coordLimits.lowestY || clientRect.y < coordLimits.lowestY)
                coordLimits.lowestY = clientRect.y;
        });
        return {
            x: coordLimits.lowestX,
            y: coordLimits.lowestY,
            height: (coordLimits.highestY - coordLimits.lowestY),
            width: (coordLimits.highestX - coordLimits.lowestX)
        };
    };
    /**
     * Compute the amount that the node should be zoomed in by
     * @param node_id
     * @returns {number}
     */
    Manipulator.prototype.computeZoom = function (node_id) {
        var BBox;
        if (typeof node_id === 'string')
            BBox = this.getNodeBBox(node_id);
        else {
            if (node_id.length === 1)
                BBox = this.getNodeBBox(node_id[0]);
            else
                BBox = this.getGroupBBox(node_id);
        }
        var containerSize = this.panZoom.getSizes();
        var relativeArea;
        if (BBox.width >= BBox.height) {
            relativeArea = containerSize.width / BBox.width;
        }
        else {
            relativeArea = containerSize.height / BBox.height;
        }
        relativeArea = relativeArea * containerSize.realZoom;
        var scalingFactor = 0.8;
        return relativeArea * scalingFactor;
    };
    /**
     * Zoom in
     * @param zoom_perc
     */
    Manipulator.prototype.zoom = function (zoom_perc) {
        this.panZoom.zoom(zoom_perc);
    };
    /**
     * Zoom onto a specific node
     * @param node_id
     * @param resetHighlight - reset the highlight before zooming. Default = true
     * @param resetHidden - reset the hidden entities before zooming. Default = true
     */
    Manipulator.prototype.zoomOn = function (node_id, resetHighlight, resetHidden) {
        if (resetHighlight === void 0) { resetHighlight = true; }
        if (resetHidden === void 0) { resetHidden = true; }
        var zoom_perc = this.computeZoom(node_id);
        this.panTo(node_id, false, resetHighlight, resetHidden);
        this.zoom(zoom_perc);
    };
    /**
     * Zoom the diagram in.
     * Just a wrapper to access the method in the panZoom component
     */
    Manipulator.prototype.zoomIn = function () {
        this.panZoom.zoomIn();
    };
    /**
     * Zoom the diagram out
     * Just a wrapper to access the method in the panZoom component
     */
    Manipulator.prototype.zoomOut = function () {
        this.panZoom.zoomOut();
    };
    /**
     * Pan to a specific set of coordinates
     * @param coordinates
     */
    Manipulator.prototype.pan = function (coordinates) {
        this.panZoom.pan(coordinates);
    };
    /**
     * Pan to a specific node
     * @param node_id
     * @param resetPanZoom - reset the zoom before panning. Default = true
     * @param resetHighlight - reset the highlight before panning. Default = true
     * @param resetHidden - reset the hidden entities before panning. Default = true
     */
    Manipulator.prototype.panTo = function (node_id, resetPanZoom, resetHighlight, resetHidden) {
        if (resetPanZoom === void 0) { resetPanZoom = true; }
        if (resetHighlight === void 0) { resetHighlight = true; }
        if (resetHidden === void 0) { resetHidden = true; }
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlight)
            this.resetHighlighted();
        if (resetHidden)
            this.resetHidden();
        var BBox;
        if (typeof node_id === 'string')
            BBox = this.getNodeBBox(node_id);
        else {
            if (node_id.length === 1)
                BBox = this.getNodeBBox(node_id[0]);
            else
                BBox = this.getGroupBBox(node_id);
        }
        var sizes = this.panZoom.getSizes();
        // First get the coordinates of the center of the BBox
        var coordinates = {
            x: -BBox.x - (BBox.width / 2),
            y: -BBox.y - (BBox.height / 2)
        };
        // Now add the current pan to the coordinates
        var pan = this.panZoom.getPan();
        coordinates.x += pan.x;
        coordinates.y += pan.y;
        // Center in the viewport
        coordinates.x += (sizes.width / 2);
        coordinates.y += (sizes.height / 2);
        this.pan(coordinates);
    };
    /**
     * Reset the pan, zoom and center
     */
    Manipulator.prototype.resetPanZoom = function () {
        this.panZoom.resetPanZoom();
    };
    return Manipulator;
}());
exports.Manipulator = Manipulator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaXB1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL21hbmlwdWxhdG9yL21hbmlwdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsdUJBQXlCO0FBQ3pCLG9DQUFzQztBQUV0Qzs7OztHQUlHO0FBQ0g7SUFNSSxxQkFBWSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHFDQUFlLEdBQWYsVUFBZ0IsU0FBYyxFQUFFLEtBQWEsRUFBRSxXQUEyQixFQUFFLFdBQTRCLEVBQ3hGLFlBQTRCO1FBRDVDLGlCQXFCQztRQXJCOEMsNEJBQUEsRUFBQSxrQkFBMkI7UUFBRSw0QkFBQSxFQUFBLG1CQUE0QjtRQUN4Riw2QkFBQSxFQUFBLG1CQUE0QjtRQUN4QyxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUM7WUFBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDL0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQixTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLENBQUM7UUFDRCxFQUFFLENBQUEsQ0FB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