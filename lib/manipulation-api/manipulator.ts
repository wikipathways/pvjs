import * as _ from 'lodash';
import $ = require('jquery');
import d3 = require('d3');

export class Manipulator {
    private pvjs_instance: Pvjs;
    private highlightedNodes: Array<string>;

    constructor(pvjs_instance: Pvjs){
        console.log("Successfully loaded the manipulation API!");
        this.pvjs_instance = pvjs_instance;
        this.highlightedNodes = [];
    }

    /**
     * Toggle the highlighting of one or multiple nodes
     * @param node_id - one identifier or a string of identifiers
     * @param colour - can be any css colour
     * @param resetOthers - Reset all other highlighted nodes before highlighting. Default = true
     *
     * This currently uses the highlighter facilities in Kaavio.
     * However, Kaavio's highlighter is intended for use in the search box at the top of the diagram.
     * Mainly, this is bad because kaavio doesn't have a built in toggle highlight so have to keep track of
     * the highlighted nodes here.
     * TODO: Either write a new highlighter library or rewrite the kaavio one
     *
     */
    toggleHighlight(node_id: any, colour, resetOthers: boolean = true): void {
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
    private toggleHighlightOfOneNode(node_id: string, colour){
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
    private addHighlighted(node_id): void {
        this.highlightedNodes.push(node_id);
    }

    /**
     * Delete the node_id from the highlightedNodes array
     * @param node_id
     */
    private delHighlighted(node_id): void {
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
    private isHighlighted(node_id): boolean {
        let index = this.highlightedNodes.indexOf(node_id);
        return index !== -1;
    }

    /**
     * Un-highlight a node.
     * @param node_id
     */
    private highlightOff(node_id): void {
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

    private findNode(node_id): any {
        return d3.select(this.pvjs_instance.selector).select("g path#" + node_id)[0][0];
    }

    // private convertCoords(x,y) {
    //
    // var offset = svgDoc.getBoundingClientRect();
    //
    // var matrix = elem.getScreenCTM();
    //
    //     return {
    //         x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
    //         y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
    //     };
    // }

    private getNodeCoordinates(node_id): any {
        let node = this.findNode(node_id);
        let clientRect = node.getBBox();

        let x = clientRect.x;
        let y = clientRect.y;
        let width = clientRect.width;
        let height = clientRect.height;

        let centreX = x + (width/2);
        let centreY = y + (height/2);

        const containerHeight = this.pvjs_instance.panZoom.getSizes().height;
        const containerWidth = this.pvjs_instance.panZoom.getSizes().width;
        console.log(containerHeight);
        console.log(containerWidth);
        let realZoom = this.pvjs_instance.panZoom.getSizes().realZoom;
        const offsetTop = containerHeight / 2;
        const offsetLeft = containerWidth / 2;

        return {
            x: (-centreX * realZoom) + offsetLeft,
            y: (-centreY * realZoom) + offsetTop
        }
    }

    private computeZoom(node_id): any {
        let node = this.findNode(node_id);
        const BBox = node.getBBox();

        const nodeArea = BBox.width * BBox.height;
        

        const containerSize = this.pvjs_instance.panZoom.getSizes();
        const containerArea = containerSize.width * containerSize.height;

        const relativeArea = containerArea /nodeArea;
        const scalingFactor = 0.08;
        return relativeArea * scalingFactor;
    }

    zoom(zoom_perc): any {
        this.pvjs_instance.panZoom.zoom(zoom_perc);
        //this.pvjs_instance.panZoom.pan(origin);
    }

    zoomOn(node_id): any {
        let zoom_perc = this.computeZoom(node_id);
        this.zoom(zoom_perc);
        this.panTo(node_id);
    }

    resetZoom(): any {
        this.pvjs_instance.panZoom.reset();
    }

    pan(coordinates): any {
        this.pvjs_instance.panZoom.pan(coordinates);

    }

    panTo(node_id): any {
        let coordinates = this.getNodeCoordinates(node_id);
        this.pan(coordinates);
    }

    resetPan(): any {

    }

    toggleAnnotations(node_id): any {

    }

}