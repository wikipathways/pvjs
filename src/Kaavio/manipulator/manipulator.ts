import * as _ from 'lodash';
import $ = require('jquery');
import d3 = require('d3');
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';

export class Manipulator {
    private diagram;
    private highlightedNodes: Array<string>;
    private panZoom;
    private kaavio: any;
    private relPoint: any; // A point used to calculate element positions

    constructor(kaavioRef, panZoomRef){
        this.highlightedNodes = [];

        // Subscribe to the panZoomEnabled observable, wait for panZoom to be ready.
        kaavioRef.kaavioReady.subscribe(res => {
            if(res === true) {
                this.panZoom = panZoomRef;
            }
            this.kaavio = kaavioRef;
            this.diagram = ReactDOM.findDOMNode(kaavioRef.diagramRef);
            this.relPoint = this.diagram.createSVGPoint();
        })
    }

    /**
     * Toggle the highlighting of one or multiple nodes
     * @param node_id - one identifier or a string of identifiers
     * @param colour - can be any css colour
     * @param resetOthers - Reset all other highlighted nodes before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     * @param resetZoom - reset the zoom before highlighting. Default = true
     *
     * This currently uses the highlighter facilities in Kaavio.
     * However, Kaavio's highlighter is intended for use in the search box at the top of the diagram.
     * Mainly, this is bad because kaavio doesn't have a built in toggle highlight so have to keep track of
     * the highlighted nodes here.
     * TODO: Either write a new highlighter library or rewrite the kaavio one
     *
     */
    toggleHighlight(node_id: any, colour: string, resetOthers: boolean = true, resetPanZoom: boolean = true): void {
        if(resetPanZoom) this.resetPanZoom();

        if (typeof node_id === 'string'){
            // Just one node_id
            let arr = [];
            arr.push(node_id);

            if(resetOthers) this.resetHighlight(arr);
            this.toggleHighlightOfOneNode(node_id, colour);
            return;
        }

        if(resetOthers) this.resetHighlight(node_id);
        node_id.forEach(singleNode => {
            this.toggleHighlightOfOneNode(singleNode, colour);
        });
    }

    /**
     * Internal method to toggle the highlighting of one node.
     * @param node_id
     * @param colour
     */
    private toggleHighlightOfOneNode(node_id: string, colour: string): void {
        let id = '#' + node_id;
        if(this.isHighlighted(node_id)) {
            this.highlightOff(node_id);
            return;
        }

        let styles;
        this.addHighlighted(node_id);

        this.kaavio.pushHighlighted({
            node_id: node_id,
            color: colour
        });
    }

    /**
     * Push the node_id onto the highlightedNodes array
     * @param node_id
     */
    private addHighlighted(node_id: string): void {
        this.highlightedNodes.push(node_id);
    }

    /**
     * Delete the node_id from the highlightedNodes array
     * @param node_id
     */
    private delHighlighted(node_id: string): void {
        this.delFromArray(this.highlightedNodes, node_id);
    }

    /**
     * Utility function to delete an element from an array
     * @param array
     * @param toDelete
     * @returns {Array<string>}
     */
    private delFromArray(array: Array<string>, toDelete: string): Array<string> {
        let index = array.indexOf(toDelete);
        if (index === -1) return array;
        array.splice(index, 1);
        return this.delFromArray(array, toDelete); // Recursively delete.
    }

    /**
     * Check if a node is highlighted
     * @param node_id
     * @returns {boolean}
     */
    private isHighlighted(node_id: string): boolean {
        let index = this.highlightedNodes.indexOf(node_id);
        return index !== -1;
    }

    /**
     * Un-highlight a node.
     * @param node_id
     */
    private highlightOff(node_id: string): void {
        let id = '#' + node_id;
        this.kaavio.popHighlighted(node_id);
        this.delHighlighted(node_id);
    }

    /**
     * Un-highlight all highlighted nodes except those in the exclude array
     * @param exclude
     */
    resetHighlight(exclude?: string[]): void {
        let toReset = this.highlightedNodes.slice();
        if(exclude){
            exclude.forEach(excluded => {
                this.delFromArray(toReset, excluded);
            });
        }
        toReset.forEach(node_id => {
            this.highlightOff(node_id);
        });
    }

    /**
     * Return the node element reference by the node_id
     * @param node_id
     * @returns {SVGLocatable}
     */
    private findNode(node_id): SVGRectElement {
        return d3.select(this.diagram).select("g#" + node_id)[0][0];
    }

    /**
     * Return the parent viewport that all other elements are relative to
     * @returns {HTMLElement}
     */
    private getViewport(): SVGRectElement {
        return d3.select(this.diagram).select(".svg-pan-zoom_viewport")[0][0]
    }

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
     * Get the bounding box for a group of nodes.
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
     * Zoom in
     * @param zoom_perc
     */
    zoom(zoom_perc: number): void {
        this.panZoom.zoom(zoom_perc);
    }

    /**
     * Zoom onto a specific node
     * @param node_id
     * @param resetHighlight - reset the highlight before zooming. Default = true
     */
    zoomOn(node_id: string | string[], resetHighlight: boolean = true): void {
        const zoom_perc = this.computeZoom(node_id);
        this.panTo(node_id, false, resetHighlight);
        this.zoom(zoom_perc);
    }

    /**
     * Pan to a specific set of coordinates
     * @param coordinates
     */
    pan(coordinates: {x: number, y: number}): void {
        this.panZoom.pan(coordinates);
    }

    /**
     * Pan to a specific node
     * @param node_id
     * @param resetPanZoom - reset the zoom before panning. Default = true
     * @param resetHighlight - rest the highlight before panning. Default = true
     */
    panTo(node_id: string | string[], resetPanZoom: boolean = true, resetHighlight: boolean = true): void {
        if(resetPanZoom) this.resetPanZoom();
        if(resetHighlight) this.resetHighlight();
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
    }

    /**
     * Reset the pan, zoom and center
     */
    resetPanZoom(): void {
        this.panZoom.resetPanZoom();
    }
}
