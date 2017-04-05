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
        return d3.select(this.diagram).select("g#" + node_id)[0][0];
    }
    /**
     * Return the parent viewport that all other elements are relative to
     * @returns {HTMLElement}
     */
    getViewport() {
        return d3.select(this.diagram).select(".svg-pan-zoom_viewport")[0][0];
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