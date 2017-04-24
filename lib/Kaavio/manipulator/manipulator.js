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
     * Return a list of the entities in the diagram.
     * Only return the useful properties though.
     */
    getEntities() {
        return this.kaavio.getEntities().map(entity => {
            return {
                id: entity.id,
                kaavioType: entity.kaavioType,
                textContent: entity.textContent,
                types: entity.type
            };
        });
    }
    /**
     * Toggle the highlighting of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resets - Object containg which resets should be carried out
     */
    toggleHighlight(entity_id, color, resets = { others: false, panZoom: false, hidden: false }) {
        if (resets.panZoom)
            this.resetPanZoom();
        if (resets.hidden)
            this.resetHidden();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resets.others)
            this.resetHighlighted(entity_id);
        entity_id.forEach(single_id => {
            const highlighted = this.kaavio.isHighlighted(single_id);
            if (highlighted) {
                this.highlightOff(single_id);
            }
            else {
                this.highlightOn(single_id, color);
            }
        });
    }
    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resets - Object containing which resets should be carried out
     */
    highlightOn(entity_id, color, resets = { others: false, panZoom: false, hidden: false }) {
        if (resets.panZoom)
            this.resetPanZoom();
        if (resets.hidden)
            this.resetHidden();
        if (!color)
            throw new Error("No color specified.");
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resets.others)
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
     * @param resets - Object containing which resets should be carried out
     */
    highlightOff(entity_id, resets = { others: false, panZoom: false, hidden: false }) {
        if (resets.panZoom)
            this.resetPanZoom();
        if (resets.hidden)
            this.resetHidden();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resets.others)
            this.resetHighlighted(entity_id);
        this.kaavio.popHighlighted(entity_id);
    }
    /**
     * Un-highlight all highlighted entities except those in the exclude array.
     * @param exclude
     */
    resetHighlighted(exclude) {
        this.kaavio.resetHighlighted(exclude);
    }
    /**
     * Toggle the displaying of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    toggleHidden(entity_id, resets = { others: false, panZoom: false, highlighted: false }) {
        if (resets.panZoom)
            this.resetPanZoom();
        if (resets.highlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resets.others)
            this.resetHidden(entity_id);
        entity_id.forEach(single => {
            const hidden = this.kaavio.isHidden(single);
            if (hidden) {
                this.show(single);
            }
            else {
                this.hide(single);
            }
        });
    }
    /**
     * Hide one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    hide(entity_id, resets = { others: false, panZoom: false, highlighted: false }) {
        if (resets.panZoom)
            this.resetPanZoom();
        if (resets.panZoom)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resets.panZoom)
            this.resetHidden(entity_id);
        this.kaavio.pushHidden(entity_id);
    }
    /**
     * Show one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    show(entity_id, resets = { others: false, panZoom: false, highlighted: false }) {
        if (resets.panZoom)
            this.resetPanZoom();
        if (resets.highlighted)
            this.resetHighlighted();
        if (typeof entity_id === 'string') {
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if (resets.others)
            this.resetHidden(entity_id);
        this.kaavio.popHidden(entity_id);
    }
    /**
     * Un-highlight all highlighted nodes except those in the exclude array.
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
     * Zoom in.
     * @param zoom_perc
     */
    zoom(zoom_perc) {
        this.panZoom.zoom(zoom_perc);
    }
    /**
     * Zoom onto a specific node
     * @param node_id
     * @param resets - the resets that should be carried out.
     */
    zoomOn(node_id, resets = { highlighted: false, hidden: false }) {
        if (resets.highlighted)
            this.resetHighlighted();
        if (resets.hidden)
            this.resetHidden();
        // We must reset the zoom first, wait for it, and then compute the zoom level
        // Otherwise, the computed value may be incorrect
        this.resetZoom().subscribe(_ => {
            const zoom_perc = this.computeZoom(node_id);
            this.panTo(node_id);
            this.zoom(zoom_perc);
        });
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
     * Pan to a specific set of coordinates.
     * @param coordinates
     */
    pan(coordinates) {
        this.panZoom.pan(coordinates);
    }
    /**
     * Pan to a specific node.
     * @param node_id
     * @param resets - the resets to be carried out.
     */
    panTo(node_id, resets = { panZoom: false, highlighted: false, hidden: false }) {
        if (resets.panZoom)
            this.resetPanZoom();
        if (resets.highlighted)
            this.resetHighlighted();
        if (resets.hidden)
            this.resetHidden();
        // We must reset the panZoom first, wait for it to happen, and then compute the location.
        // Otherwise, the computed coordinates will be in an incorrect position
        this.resetPan().subscribe(_ => {
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
        });
    }
    resetPan() {
        return this.panZoom.resetPan();
    }
    resetZoom() {
        return this.panZoom.resetZoom();
    }
    resetPanZoom() {
        return this.panZoom.reset();
    }
    /**
     * Reset everything! Resets pan, zoom, hidden, and highlighted
     */
    reset() {
        this.resetPanZoom();
        this.resetHidden();
        this.resetHighlighted();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaXB1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL21hbmlwdWxhdG9yL21hbmlwdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBR3RDOzs7O0dBSUc7QUFDSCxNQUFNO0lBTUYsWUFBWSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNO1lBQ3ZDLE1BQU0sQ0FBQztnQkFDSCxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ2IsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO2dCQUM3QixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7Z0JBQy9CLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSTthQUNyQixDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxlQUFlLENBQUMsU0FBYyxFQUFFLEtBQWEsRUFDN0IsU0FDRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDO1FBQzVELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENB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