import * as d3 from 'd3';
import * as ReactDOM from 'react-dom';
/**
 * Class for "The Manipulation API".
 * Really, this is just a wrapper around public functions within Kaavio components with a few extras.
 * Implements highlighting and zooming/panning to nodes or groups of nodes.
 */
export class Manipulator {
    constructor(kaavioRef, panZoomRef, diagramRef) {
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
    toggleHighlight(entity_id, color, resetOthers = true, resetHidden = false, resetPanZoom = true) {
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHidden)
            this.resetHidden();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHighlighted(entity_id);
        entity_id.forEach(single_id => {
            const highlighted = this.kaavio.isHighlighted(single_id);
            if (highlighted) {
                this.highlightOff(single_id, false, false, false);
            }
            else {
                this.highlightOn(single_id, color, false, false, false);
            }
        });
    }
    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    highlightOn(entity_id, color, resetOthers = true, resetHidden = true, resetPanZoom = true) {
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHidden)
            this.resetHidden();
        if (!color)
            throw new Error("No color specified.");
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHighlighted(entity_id);
        const toHighlight = entity_id.map(single_id => {
            return {
                node_id: single_id,
                color: color
            };
        });
        this.kaavio.pushHighlighted(toHighlight);
    }
    /**
     * Turn off the highlighting of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    highlightOff(entity_id, resetOthers = true, resetHidden = true, resetPanZoom = true) {
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHidden)
            this.resetHidden();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHighlighted(entity_id);
        this.kaavio.popHighlighted(entity_id);
    }
    /**
     * Un-highlight all highlighted entities except those in the exclude array
     * @param exclude
     */
    resetHighlighted(exclude) {
        this.kaavio.resetHighlighted(exclude);
    }
    /**
     * Toggle the displaying of one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other hidden nodes before hiding. Default = true
     * @param resetHighlighted - Reset the highlighted entities before toggling. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    toggleHidden(entity_id, color, resetOthers = false, resetHighlighted = true, resetPanZoom = true) {
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHidden(entity_id);
        entity_id.forEach(single => {
            const hidden = this.kaavio.isHidden(single);
            if (hidden) {
                this.show(single, false, false, false);
            }
            else {
                this.hide(single, false, false, false);
            }
        });
    }
    /**
     * Hide one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other hidden entities first. Default = true
     * @param resetHighlighted - Reset the highlighted entities before hiding. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    hide(entity_id, resetOthers = true, resetHighlighted = true, resetPanZoom = true) {
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHidden(entity_id);
        this.kaavio.pushHidden(entity_id);
    }
    /**
     * Show one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other hidden entities first. Default = true
     * @param resetHighlighted - Reset the highlighted entities before showing. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    show(entity_id, resetOthers = true, resetHighlighted = true, resetPanZoom = true) {
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resetOthers)
            this.resetHidden(entity_id);
        this.kaavio.popHidden(entity_id);
    }
    /**
     * Un-highlight all highlighted nodes except those in the exclude array
     * @param exclude
     */
    resetHidden(exclude) {
        this.kaavio.resetHidden(exclude);
    }
    /**
     * Return the node element reference by the node_id
     * @param node_id
     * @returns {SVGLocatable}
     */
    findNode(node_id) {
        return d3.select(this.diagram).select("g#" + node_id)._groups[0][0];
    }
    /**
     * Return the parent viewport that all other elements are relative to
     * @returns {HTMLElement}
     */
    getViewport() {
        return d3.select(this.diagram).select(".svg-pan-zoom_viewport")._groups[0][0];
    }
    /**
     * Get the bounding box of an entity.
     * @param node_id
     * @returns {{x: any, y: any, height: number, width: number}}
     */
    getNodeBBox(node_id) {
        let node = this.findNode(node_id);
        let viewport = this.getViewport();
        let svg = this.diagram;
        let BBox = node.getBBox();
        let matrix = node.getCTM();
        this.relPoint.x = BBox.x;
        this.relPoint.y = BBox.y;
        this.relPoint = this.relPoint.matrixTransform(matrix);
        const realZoom = this.panZoom.getSizes().realZoom;
        return {
            x: this.relPoint.x,
            y: this.relPoint.y,
            height: BBox.height * realZoom,
            width: BBox.width * realZoom
        };
    }
    /**
     * Get the bounding box for a group of entities.
     * Note: if there is a huge number of node_ids this might take a while...
     * @param node_ids
     * @returns {{x: null, y: null, height: number, width: number}}
     */
    getGroupBBox(node_ids) {
        const coordLimits = {
            highestX: null,
            lowestX: null,
            highestY: null,
            lowestY: null
        };
        node_ids.forEach(node_id => {
            const node = this.findNode(node_id);
            const clientRect = this.getNodeBBox(node_id);
            const nodeHighestX = clientRect.x + clientRect.width;
            if (!coordLimits.highestX || nodeHighestX > coordLimits.highestX)
                coordLimits.highestX = nodeHighestX;
            if (!coordLimits.lowestX || clientRect.x < coordLimits.lowestX)
                coordLimits.lowestX = clientRect.x;
            const nodeHighestY = clientRect.y + clientRect.height;
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
    }
    /**
     * Compute the amount that the node should be zoomed in by
     * @param node_id
     * @returns {number}
     */
    computeZoom(node_id) {
        let BBox;
        if (typeof node_id === 'string')
            BBox = this.getNodeBBox(node_id);
        else {
            if (node_id.length === 1)
                BBox = this.getNodeBBox(node_id[0]);
            else
                BBox = this.getGroupBBox(node_id);
        }
        const containerSize = this.panZoom.getSizes();
        let relativeArea;
        if (BBox.width >= BBox.height) {
            relativeArea = containerSize.width / BBox.width;
        }
        else {
            relativeArea = containerSize.height / BBox.height;
        }
        relativeArea = relativeArea * containerSize.realZoom;
        const scalingFactor = 0.8;
        return relativeArea * scalingFactor;
    }
    /**
     * Zoom in
     * @param zoom_perc
     */
    zoom(zoom_perc) {
        this.panZoom.zoom(zoom_perc);
    }
    /**
     * Zoom onto a specific node
     * @param node_id
     * @param resetHighlight - reset the highlight before zooming. Default = true
     * @param resetHidden - reset the hidden entities before zooming. Default = true
     */
    zoomOn(node_id, resetHighlight = true, resetHidden = true) {
        const zoom_perc = this.computeZoom(node_id);
        this.panTo(node_id, false, resetHighlight, resetHidden);
        this.zoom(zoom_perc);
    }
    /**
     * Zoom the diagram in.
     * Just a wrapper to access the method in the panZoom component
     */
    zoomIn() {
        this.panZoom.zoomIn();
    }
    /**
     * Zoom the diagram out
     * Just a wrapper to access the method in the panZoom component
     */
    zoomOut() {
        this.panZoom.zoomOut();
    }
    /**
     * Pan to a specific set of coordinates
     * @param coordinates
     */
    pan(coordinates) {
        this.panZoom.pan(coordinates);
    }
    /**
     * Pan to a specific node
     * @param node_id
     * @param resetPanZoom - reset the zoom before panning. Default = true
     * @param resetHighlight - reset the highlight before panning. Default = true
     * @param resetHidden - reset the hidden entities before panning. Default = true
     */
    panTo(node_id, resetPanZoom = true, resetHighlight = true, resetHidden = true) {
        if (resetPanZoom)
            this.resetPanZoom();
        if (resetHighlight)
            this.resetHighlighted();
        if (resetHidden)
            this.resetHidden();
        let BBox;
        if (typeof node_id === 'string')
            BBox = this.getNodeBBox(node_id);
        else {
            if (node_id.length === 1)
                BBox = this.getNodeBBox(node_id[0]);
            else
                BBox = this.getGroupBBox(node_id);
        }
        const sizes = this.panZoom.getSizes();
        // First get the coordinates of the center of the BBox
        let coordinates = {
            x: -BBox.x - (BBox.width / 2),
            y: -BBox.y - (BBox.height / 2)
        };
        // Now add the current pan to the coordinates
        const pan = this.panZoom.getPan();
        coordinates.x += pan.x;
        coordinates.y += pan.y;
        // Center in the viewport
        coordinates.x += (sizes.width / 2);
        coordinates.y += (sizes.height / 2);
        this.pan(coordinates);
    }
    /**
     * Reset the pan, zoom and center
     */
    resetPanZoom() {
        this.panZoom.resetPanZoom();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaXB1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL21hbmlwdWxhdG9yL21hbmlwdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBRXRDOzs7O0dBSUc7QUFDSCxNQUFNO0lBTUYsWUFBWSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILGVBQWUsQ0FBQyxTQUFjLEVBQUUsS0FBYSxFQUFFLGNBQXVCLElBQUksRUFBRSxjQUF1QixLQUFLLEVBQ3hGLGVBQXdCLElBQUk7UUFDeEMsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDO1lBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQy9CLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEIsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDO1lBQUMsSUFBSSxDQUFDLGdC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