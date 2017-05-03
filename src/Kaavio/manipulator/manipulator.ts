import * as _ from 'lodash';
import * as $ from 'jquery';
import * as d3 from 'd3';
import * as ReactDOM from 'react-dom';
import {Observable} from "rxjs";

/**
 * Class for "The Manipulation API".
 * Really, this is just a wrapper around public functions within Kaavio components with a few extras.
 * Implements highlighting and zooming/panning to nodes or groups of nodes.
 */
export class Manipulator {
    private diagram;
    private panZoom;
    private kaavio: any;
    private relPoint: any; // A point used to calculate element positions

    constructor(kaavioRef, panZoomRef, diagramRef){
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
            }
        });
    }

    /**
     * Toggle the highlighting of one entity.
     * @param entity_id - one identifier
     * @param color - can be any css colour
     */
    toggleHighlight(entity_id: string, color: string): void {
        const highlighted = this.kaavio.isHighlighted(entity_id);
        if(highlighted){
            this.highlightOff(entity_id)
        }
        else {
            this.highlightOn(entity_id, color)
        }
    }

    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier
     * @param color - can be any css colour
     */
    highlightOn(entity_id: string, color: string): void {
        if(! color) throw new Error("No color specified.");

        this.kaavio.pushHighlighted({
            node_id: entity_id,
            color: color
        });
    }

    /**
     * Turn off the highlighting of one entity.
     * @param entity_id - one identifier
     */
    highlightOff(entity_id: string): void {
        this.kaavio.popHighlighted(entity_id);
    }

    /**
     * Un-highlight all highlighted entities except those in the exclude array.
     * @param exclude
     */
    resetHighlighted(exclude?: string[]): void {
        this.kaavio.resetHighlighted(exclude);
    }

    /**
     * Toggle the displaying of one entity.
     * @param entity_id - one identifier
     */
    toggleHidden(entity_id: string): void {
        const hidden = this.kaavio.isHidden(entity_id);
        if(hidden){
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
    hide(entity_id: string): void {
        this.kaavio.pushHidden(entity_id);
    }

    /**
     * Show one entity
     * @param entity_id - one identifier
     */
    show(entity_id: string): void {
        this.kaavio.popHidden(entity_id);
    }

    /**
     * Un-hide all highlighted nodes except those in the exclude array.
     * @param exclude
     */
    resetHidden(exclude?: string[]): void {
        this.kaavio.resetHidden(exclude);
    }

    /**
     * Return the node element reference by the node_id
     * @param node_id
     * @returns {SVGLocatable}
     */
    private findNode(node_id): SVGRectElement {
        return d3.select(this.diagram).select("g#" + node_id)._groups[0][0];
    }

    /**
     * Return the parent viewport that all other elements are relative to
     * @returns {HTMLElement}
     */
    private getViewport(): SVGRectElement {
        return d3.select(this.diagram).select(".svg-pan-zoom_viewport")._groups[0][0]
    }
    /**
     * Get the bounding box of an entity.
     * @param node_id
     * @returns {{x: any, y: any, height: number, width: number}}
     */
    private getNodeBBox(node_id: string): {x: number, y: number, height: number, width: number} {
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
        }
    }

    /**
     * Get the bounding box for a group of entities.
     * Note: if there is a huge number of node_ids this might take a while...
     * @param node_ids
     * @returns {{x: null, y: null, height: number, width: number}}
     */
    private getGroupBBox(node_ids: string[]): {x: number, y: number, height: number, width: number} {
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
            if (!coordLimits.highestX ||  nodeHighestX > coordLimits.highestX) coordLimits.highestX = nodeHighestX;
            if (!coordLimits.lowestX || clientRect.x < coordLimits.lowestX) coordLimits.lowestX = clientRect.x;

            const nodeHighestY = clientRect.y + clientRect.height;
            if (!coordLimits.highestY || nodeHighestY > coordLimits.highestY) coordLimits.highestY = nodeHighestY;
            if (!coordLimits.lowestY || clientRect.y < coordLimits.lowestY) coordLimits.lowestY = clientRect.y;
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
    private computeZoom(node_id: string | string[]): number {
        let BBox;
        if(typeof node_id === 'string') BBox = this.getNodeBBox(node_id);
        else {
            if(node_id.length === 1) BBox = this.getNodeBBox(node_id[0]);
            else BBox = this.getGroupBBox(node_id);
        }
        const containerSize = this.panZoom.getSizes();
        let relativeArea;
        if(BBox.width >= BBox.height){
            relativeArea = containerSize.width / BBox.width;
        }
        else {
            relativeArea = containerSize.height / BBox.height
        }

        relativeArea = relativeArea * containerSize.realZoom;

        const scalingFactor = 0.95;
        return relativeArea * scalingFactor;
    }

    /**
     * Zoom in.
     * @param zoom_perc
     */
    zoom(zoom_perc: number): void{
        this.panZoom.zoom(zoom_perc);
    }

    /**
     * Zoom onto a specific node
     * @param node_id
     */
    zoomOn(node_id: string | string[]): void {
        // If the diagram is in the process of moving, the computed coordinates will be incorrect
        // by the time the diagram stops moving. Wait for the diagram to stop moving first by using
        // the isUpdating observable
        this.panZoom.isUpdating$
            .filter(isUpdating => ! isUpdating)
            .first()
            .subscribe(() => {
                const zoom_perc = this.computeZoom(node_id);
                this.panTo(node_id);
                this.zoom(zoom_perc);
            })
    }

    /**
     * Zoom the diagram in.
     * Just a wrapper to access the method in the panZoom component
     */
    zoomIn(): void {
        this.panZoom.zoomIn();
    }

    /**
     * Zoom the diagram out
     * Just a wrapper to access the method in the panZoom component
     */
    zoomOut(): void {
        this.panZoom.zoomOut();
    }

    /**
     * Pan to a specific set of coordinates.
     * @param coordinates
     */
    pan(coordinates: {x: number, y: number}): void {
        this.panZoom.pan(coordinates);
    }

    /**
     * Pan to a specific node.
     * @param node_id
     * @param resets - the resets to be carried out.
     */
    panTo(node_id: string | string[]): void {
        // If the diagram is in the process of moving, the computed coordinates will be incorrect
        // by the time the diagram stops moving. Wait for the diagram to stop moving first by using
        // the isUpdating observable
        this.panZoom.isUpdating$
            .filter(isUpdating => ! isUpdating)
            .first()
            .subscribe(() => {
                // Calculate the coordinates to pan to
                let BBox;
                if (typeof node_id === 'string') BBox = this.getNodeBBox(node_id);
                else {
                    if(node_id.length === 1) BBox = this.getNodeBBox(node_id[0]);
                    else BBox = this.getGroupBBox(node_id);
                }

                const sizes = this.panZoom.getSizes();

                // First get the coordinates of the center of the BBox
                let coordinates = {
                    x: -BBox.x -  (BBox.width / 2),
                    y: -BBox.y - (BBox.height / 2)
                };

                // Now add the current pan to the coordinates
                const pan = this.panZoom.getPan();
                coordinates.x += pan.x;
                coordinates.y += pan.y;

                // Center in the viewport
                coordinates.x += (sizes.width/2);
                coordinates.y += (sizes.height/2);

                this.pan(coordinates);
            })
    }

    resetPan(): Observable<{x: number, y: number}> {
        return this.panZoom.resetPan();
    }

    resetZoom(): Observable<number> {
        return this.panZoom.resetZoom();
    }

    /**
     * Reset everything! Resets pan, zoom, hidden, and highlighted
     */
    reset(): void {
        this.resetZoom();
        this.resetPan();
        this.resetHidden();
        this.resetHighlighted();
    }
}
