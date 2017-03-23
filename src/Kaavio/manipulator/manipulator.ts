import * as _ from 'lodash';
import $ = require('jquery');
import d3 = require('d3');
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';

export class Manipulator {
    private diagram;
    private panZoom;
    private kaavio: any;
    private relPoint: any; // A point used to calculate element positions

    constructor(kaavioRef, panZoomRef){

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
     * @param color - can be any css colour
     * @param resetOthers - Reset all other highlighted nodes before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    toggleHighlight(node_id: any, color: string, resetOthers: boolean = false, resetPanZoom: boolean = true): void {
        if(resetPanZoom) this.resetPanZoom();

        if (typeof node_id === 'string'){
            // Just one node_id
            let arr = [];
            arr.push(node_id);

            if(resetOthers) this.resetHighlighted(arr);
            this.toggleHighlightOne(node_id, color);
            return;
        }

        if(resetOthers) this.resetHighlighted(node_id);
        node_id.forEach(singleNode => {
            this.toggleHighlightOne(singleNode, color);
        });
    }

    private toggleHighlightOne(node_id: string, color?: string){
        if(this.kaavio.isHighlighted(node_id)){
            this.highlightOffOne(node_id);
            return;
        }

        if(! color) throw new Error("No color specified.");
        this.highlightOnOne(node_id, color);
    }

    highlightOn(node_id: any, color: string, resetOthers: boolean = true, resetPanZoom: boolean = true): void {
        if(resetPanZoom) this.resetPanZoom();
        if(! color) throw new Error("No color specified.");

        if (typeof node_id === 'string'){
            // Just one node_id
            let arr = [];
            arr.push(node_id);

            if(resetOthers) this.resetHighlighted(arr);
            this.highlightOnOne(node_id, color);
            return;
        }

        if(resetOthers) this.resetHighlighted(node_id);
        node_id.forEach(singleNode => {
            this.highlightOnOne(singleNode, color);
        });
    }

    highlightOff(node_id: any, resetOthers: boolean = true, resetPanZoom: boolean = true): void {
        if(resetPanZoom) this.resetPanZoom();

        if (typeof node_id === 'string'){
            // Just one node_id
            let arr = [];
            arr.push(node_id);

            if(resetOthers) this.resetHighlighted(arr);
            this.highlightOffOne(node_id);
            return;
        }

        if(resetOthers) this.resetHighlighted(node_id);
        node_id.forEach(singleNode => {
            this.highlightOffOne(singleNode);
        });
    }

    private highlightOnOne(node_id: string, color: string): void {
        let id = '#' + node_id;
        this.kaavio.pushHighlighted({
            node_id: node_id,
            color: color
        });
    }

    private highlightOffOne(node_id: string): void {
        let id = '#' + node_id;
        this.kaavio.popHighlighted(node_id);
    }

    /**
     * Un-highlight all highlighted nodes except those in the exclude array
     * @param exclude
     */
    resetHighlighted(exclude?: string[]): void {
        this.kaavio.resetHighlighted(exclude);
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
        if(resetHighlight) this.resetHighlighted();
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
