import * as _ from 'lodash';
import $ = require('jquery');
import d3 = require('d3');

export class Manipulator {
    private pvjs_instance: Pvjs;
    private highlightedNodes: Array<string>;

    constructor(pvjs_instance: Pvjs){
        console.log("Successfully loaded the manipulation API!");
        this.pvjs_instance = pvjs_instance;
        this.highlightedNodes = ['123'];
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

    private addHighlighted(node_id): void {
        this.highlightedNodes.push(node_id);
    }

    private delHighlighted(node_id): void {
        this.delFromArray(this.highlightedNodes, node_id);
    }

    private delFromArray(array: Array<string>, toDelete: string): Array<string> {
        let index = array.indexOf(toDelete);
        if (index === -1) return array;
        array.splice(index, 1);
        return this.delFromArray(array, toDelete); // Recursively delete.
    }

    private isHighlighted(node_id): boolean {
        let index = this.highlightedNodes.indexOf(node_id);
        return index !== -1;
    }

    private highlightOff(node_id): void {
        let id = '#' + node_id;
        this.pvjs_instance.highlighter.attenuate(id);
        this.delHighlighted(node_id);
    }

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
        return d3.select(this.pvjs_instance.selector).select("g path#" + node_id);
    }

    private getNodeCoordinates(node_id): any {
        let node = this.findNode(node_id);
        let x = d3.transform(node.attr("transform")).translate[0];
    }

    zoom(zoom_perc, origin): any {
        this.pvjs_instance.panZoom.zoomAtPoint(zoom_perc, origin);
    }

    zoomOn(node_id): any {

    }

    resetZoom(): any {
        this.pvjs_instance.panZoom.reset();
    }

    pan(coordinates): any {

    }

    panTo(node_id): any {

    }

    resetPan(): any {

    }

    toggleAnnotations(node_id): any {

    }

}