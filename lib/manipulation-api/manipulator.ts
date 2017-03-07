import * as _ from 'lodash';
import $ = require('jquery');
import d3 = require('d3');

export class Manipulator {
    private pvjs_instance: Pvjs;
    private highlightedNodes: Array<string>;
    private panZoom;

    constructor(pvjs_instance: Pvjs){
        this.pvjs_instance = pvjs_instance;
        this.highlightedNodes = [];

        this.panZoom = pvjs_instance.panZoom; // TODO: This is a hack for now. Fix this
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
        if(colour){
            styles = {
                backgroundColor: colour
            }
        }
        this.addHighlighted(node_id);
        this.pvjs_instance.highlighter.highlight(id, null, styles);
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
        this.pvjs_instance.highlighter.attenuate(id);
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
    private findNode(node_id): SVGLocatable {
        return d3.select(this.pvjs_instance.selector).select("g path#" + node_id)[0][0];
    }

    /**
     * Return the coordinates of the center of the node referenced by the node_id
     * @param node_id
     * @returns {{x: number, y: number}}
     */
    private getNodeCoordinates(node_id: string): {x: number, y: number} {
        let node = this.findNode(node_id);
        let clientRect = node.getBBox();

        let x = clientRect.x;
        let y = clientRect.y;
        let width = clientRect.width;
        let height = clientRect.height;

        let centreX = x + (width/2);
        let centreY = y + (height/2);

        const containerHeight = this.panZoom.getSizes().height;
        const containerWidth = this.panZoom.getSizes().width;
        let realZoom = this.panZoom.getSizes().realZoom;
        const offsetTop = containerHeight / 2;
        const offsetLeft = containerWidth / 2;

        return {
            x: (-centreX * realZoom) + offsetLeft,
            y: (-centreY * realZoom) + offsetTop
        }
    }

    /**
     * Return the coordinates that should be panned to to get the desired node into the center of the diagram
     * @param node_id
     * @returns {{x: number, y: number}}
     */
    private getNodeCoordinatesWithOffset(node_id: string): {x: number, y:number}{
        const coordinates = this.getNodeCoordinates(node_id);

        const containerHeight = this.panZoom.getSizes().height;
        const containerWidth = this.panZoom.getSizes().width;
        let realZoom = this.panZoom.getSizes().realZoom;
        coordinates.x += containerWidth / 2;
        coordinates.y += containerHeight / 2;

        return coordinates;
    }

    /**
     * Compute the amount that the node should be zoomed in by
     * @param node_id
     * @returns {number}
     */
    private computeZoom(node_id: string): number {
        let node = this.findNode(node_id);
        const BBox = node.getBBox();

        const nodeArea = BBox.width * BBox.height;
        

        const containerSize = this.panZoom.getSizes();
        const containerArea = containerSize.width * containerSize.height;

        const relativeArea = containerArea /nodeArea;
        const scalingFactor = 0.08;
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
    zoomOn(node_id: string, resetHighlight: boolean = true): void {
        let zoom_perc = this.computeZoom(node_id);
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
    panTo(node_id: string, resetPanZoom: boolean = true, resetHighlight: boolean = true): void {
        if(resetPanZoom) this.resetPanZoom();
        if(resetHighlight) this.resetHighlight();
        let coordinates = this.getNodeCoordinates(node_id);
        this.pan(coordinates);
    }

    /**
     * Reset the pan, zoom and center
     */
    resetPanZoom(): void {
        this.panZoom.resetPan();
        this.panZoom.resetZoom();
        this.panZoom.center();
    }

    toggleAnnotations(node_id): any {

    }
}
