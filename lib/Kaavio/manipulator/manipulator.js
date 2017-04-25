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
     * Toggle the highlighting of one entity.
     * @param entity_id - one identifier
     * @param color - can be any css colour
     */
    toggleHighlight(entity_id, color) {
        const highlighted = this.kaavio.isHighlighted(entity_id);
        if (highlighted) {
            this.highlightOff(entity_id);
        }
        else {
            this.highlightOn(entity_id, color);
        }
    }
    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier
     * @param color - can be any css colour
     */
    highlightOn(entity_id, color) {
        if (!color)
            throw new Error("No color specified.");
        this.kaavio.pushHighlighted({
            node_id: entity_id,
            color: color
        });
    }
    /**
     * Turn off the highlighting of one entity.
     * @param entity_id - one identifier
     */
    highlightOff(entity_id) {
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
     * Toggle the displaying of one entity.
     * @param entity_id - one identifier
     */
    toggleHidden(entity_id) {
        const hidden = this.kaavio.isHidden(entity_id);
        if (hidden) {
            this.show(entity_id);
        }
        else {
            this.hide(entity_id);
        }
    }
    /**
     * Hide one entity.
     * @param entity_id - one identifier
     */
    hide(entity_id) {
        this.kaavio.pushHidden(entity_id);
    }
    /**
     * Show one entity
     * @param entity_id - one identifier
     */
    show(entity_id) {
        this.kaavio.popHidden(entity_id);
    }
    /**
     * Un-hide all highlighted nodes except those in the exclude array.
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
     */
    zoomOn(node_id) {
        // If the diagram is in the process of moving, the computed coordinates will be incorrect
        // by the time the diagram stops moving. Wait for the diagram to stop moving first by using
        // the isUpdating observable
        this.panZoom.isUpdating$
            .filter(isUpdating => !isUpdating)
            .first()
            .subscribe(() => {
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
    panTo(node_id) {
        // If the diagram is in the process of moving, the computed coordinates will be incorrect
        // by the time the diagram stops moving. Wait for the diagram to stop moving first by using
        // the isUpdating observable
        this.panZoom.isUpdating$
            .filter(isUpdating => !isUpdating)
            .first()
            .subscribe(() => {
            // Calculate the coordinates to pan to
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
    /**
     * Reset everything! Resets pan, zoom, hidden, and highlighted
     */
    reset() {
        this.resetZoom();
        this.resetPan();
        this.resetHidden();
        this.resetHighlighted();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaXB1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL21hbmlwdWxhdG9yL21hbmlwdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBR3RDOzs7O0dBSUc7QUFDSCxNQUFNO0lBTUYsWUFBWSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNO1lBQ3ZDLE1BQU0sQ0FBQztnQkFDSCxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ2IsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO2dCQUM3QixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7Z0JBQy9CLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSTthQUNyQixDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWUsQ0FBQyxTQUFpQixFQUFFLEtBQWE7UUFDNUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQztZQUNaLElB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