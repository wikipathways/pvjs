import * as _ from 'lodash';
import * as $ from 'jquery';
import * as d3 from 'd3';
import * as ReactDOM from 'react-dom';

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
     * Toggle the highlighting of one or multiple entities. Returns this for chaining
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resets - Object containg which resets should be carried out
     */
    toggleHighlight(entity_id: any, color: string,
                    resets: {others: boolean, panZoom: boolean, hidden: boolean}
                    = {others: false, panZoom: false, hidden: false}): Manipulator {
        if(resets.panZoom) this.resetPanZoom();
        if(resets.hidden) this.resetHidden();

        if (typeof entity_id === 'string'){
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if(resets.others) this.resetHighlighted(entity_id as string[]);

        entity_id.forEach(single_id => {
            const highlighted = this.kaavio.isHighlighted(single_id);
            if(highlighted){
                this.highlightOff(single_id)
            }
            else {
                this.highlightOn(single_id, color)
            }
        });

        return this;
    }

    /**
     * Turn on the highlighting of one entity. Returns this for chaining
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resets - Object containing which resets should be carried out
     */
    highlightOn(entity_id: any, color: string,
                resets: {others: boolean, panZoom: boolean, hidden: boolean}
                = {others: false, panZoom: false, hidden: false}): Manipulator {
        if(resets.panZoom) this.resetPanZoom();
        if(resets.hidden) this.resetHidden();
        if(! color) throw new Error("No color specified.");

        if (typeof entity_id === 'string'){
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }

        if(resets.others) this.resetHighlighted(entity_id);
        const toHighlight = entity_id.map(single_id => {
            return {
                node_id: single_id,
                color: color
            }
        });

        this.kaavio.pushHighlighted(toHighlight);
        return this;
    }

    /**
     * Turn off the highlighting of one or multiple entities. Returns this for chaining
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    highlightOff(entity_id: any, resets: {others: boolean, panZoom: boolean, hidden: boolean} =
                     {others: false, panZoom: false, hidden: false}): Manipulator {
        if(resets.panZoom) this.resetPanZoom();
        if(resets.hidden) this.resetHidden();

        if (typeof entity_id === 'string'){
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }

        if(resets.others) this.resetHighlighted(entity_id);

        this.kaavio.popHighlighted(entity_id);
        return this;
    }

    /**
     * Un-highlight all highlighted entities except those in the exclude array. Returns this for chaining
     * @param exclude
     */
    resetHighlighted(exclude?: string[]): Manipulator {
        this.kaavio.resetHighlighted(exclude);
        return this;
    }

    /**
     * Toggle the displaying of one or multiple entities. Returns this for chaining
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    toggleHidden(entity_id: any, resets: {others: boolean, panZoom: boolean, highlighted: boolean} =
                     {others: false, panZoom: false, highlighted: false}): Manipulator {
        if(resets.panZoom) this.resetPanZoom();
        if(resets.highlighted) this.resetHighlighted();

        if (typeof entity_id === 'string'){
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }

        if(resets.others) this.resetHidden(entity_id);
        entity_id.forEach(single => {
            const hidden = this.kaavio.isHidden(single);
            if(hidden){
                this.show(single);
            }
            else {
                this.hide(single);
            }
        });

        return this;
    }

    /**
     * Hide one or multiple entities. Returns this for chaining
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    hide(entity_id: string | string[],
         resets: {others: boolean, panZoom: boolean, highlighted: boolean} =
             {others: false, panZoom: false, highlighted: false}): Manipulator {
        if(resets.panZoom) this.resetPanZoom();
        if(resets.panZoom) this.resetHighlighted();

        if (typeof entity_id === 'string'){
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }
        if(resets.panZoom) this.resetHidden(entity_id as string[]);

        this.kaavio.pushHidden(entity_id);
        return this;
    }

    /**
     * Show one or multiple entities. Returns this for chaining
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    show(entity_id: string | string[],
         resets: {others: boolean, panZoom: boolean, highlighted: boolean} =
             {others: false, panZoom: false, highlighted: false}): Manipulator {
        if(resets.panZoom) this.resetPanZoom();
        if(resets.highlighted) this.resetHighlighted();

        if (typeof entity_id === 'string'){
            let arr = [];
            arr.push(entity_id);
            entity_id = arr;
        }

        if(resets.others) this.resetHidden(entity_id as string[]);
        this.kaavio.popHidden(entity_id);
        return this;
    }

    /**
     * Un-highlight all highlighted nodes except those in the exclude array.
     * Returns this for chaining
     * @param exclude
     */
    resetHidden(exclude?: string[]): Manipulator {
        this.kaavio.resetHidden(exclude);
        return this;
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

        const scalingFactor = 0.8;
        return relativeArea * scalingFactor;
    }

    /**
     * Zoom in.
     * Returns this for chaining
     * @param zoom_perc
     */
    zoom(zoom_perc: number): Manipulator {
        this.panZoom.zoom(zoom_perc);
        return this
    }

    /**
     * Zoom onto a specific node
     * Returns this for chaining
     * @param node_id
     * @param resets - the resets that should be carried out.
     */
    zoomOn(node_id: string | string[], resets: {highlighted: boolean, hidden: boolean}
            = {highlighted: false, hidden: false}): Manipulator {
        if(resets.highlighted) this.resetHighlighted();
        if(resets.hidden) this.resetHidden();
        const zoom_perc = this.computeZoom(node_id);
        this.panTo(node_id);
        this.zoom(zoom_perc);
        return this
    }

    /**
     * Zoom the diagram in.
     * Returns this for chaining
     * Just a wrapper to access the method in the panZoom component
     */
    zoomIn(): Manipulator {
        this.panZoom.zoomIn();
        return this;
    }

    /**
     * Zoom the diagram out
     * Returns this for chaining
     * Just a wrapper to access the method in the panZoom component
     */
    zoomOut(): Manipulator {
        this.panZoom.zoomOut();
        return this;
    }

    /**
     * Pan to a specific set of coordinates.
     * Returns this for chaining
     * @param coordinates
     */
    pan(coordinates: {x: number, y: number}): Manipulator {
        this.panZoom.pan(coordinates);
        return this;
    }

    /**
     * Pan to a specific node. Returns this for chaining
     * @param node_id
     * @param resets - the resets to be carried out.
     */
    panTo(node_id: string | string[],
          resets: {panZoom: boolean, highlighted: boolean, hidden: boolean}
          = {panZoom: false, highlighted: false, hidden: false}): Manipulator {
        if(resets.panZoom) this.resetPanZoom();
        if(resets.highlighted) this.resetHighlighted();
        if(resets.hidden) this.resetHidden();

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
        return this;
    }

    /**
     * Reset the pan, zoom and center.
     * Returns this for chaining
     */
    resetPanZoom(): Manipulator {
        this.panZoom.resetPanZoom();
        return this;
    }

    /**
     * Reset everything! Resets pan, zoom, hidden, and highlighted
     */
    reset(): Manipulator {
        this.resetPanZoom();
        this.resetHidden();
        this.resetHighlighted();
        return this;
    }
}
