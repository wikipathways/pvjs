import {Kaavio} from "../Kaavio";
import {Observable} from "rxjs";
import {PanZoom} from "../components/PanZoom";
import {findNode, getNodeBBox, getGroupBBox} from "./utils";

export class Zoomer {
    private kaavio: Kaavio;
    private panZoom: PanZoom;
    private diagram: any;

    constructor(kaavio: Kaavio, panZoom: PanZoom, diagram) {
        this.kaavio = kaavio;
        this.panZoom = panZoom;
        this.diagram = diagram;
    }

    /**
     * Compute the amount that the node should be zoomed in by
     * @param node_id
     * @returns {number}
     */
    private computeZoom(node_id: string | string[]): number {
        let BBox;
        const containerSize = this.panZoom.getSizes();
        if(typeof node_id === 'string') BBox = getNodeBBox(node_id, this.diagram, containerSize.realZoom);
        else {
            if(node_id.length === 1) BBox = getNodeBBox(node_id[0], this.diagram, containerSize.realZoom);
            else BBox = getGroupBBox(node_id, this.diagram, this.panZoom.getSizes().realZoom);
        }
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

    private animateZoom(zoom_perc: number): void {
        const duration = 300;
        const zoomStep = .1;
        const curZoom = this.panZoom.getZoom();
        const diffZoom = Math.abs(curZoom - zoom_perc);

        const totalSteps = Math.round(diffZoom/zoomStep);
        let step = 0;
        const intervalID = setInterval(() => {
            if(step <= totalSteps) {
                this.panZoom.zoom(curZoom + (step * zoomStep));
                step++;
            }
            else {
                clearInterval(intervalID);
            }
        }, duration / totalSteps)
    }

    /**
     * Zoom in by a percentage
     * @param zoom_perc
     * @param animate
     */
    zoom(zoom_perc: number, animate = true): void{
        if(animate) {
            this.animateZoom(zoom_perc);
        } else {
            this.panZoom.zoom(zoom_perc);
        }
    }

    /**
     * Zoom onto a specific node
     * @param node_id
     * @param animate - should the diagram be animated?
     */
    zoomOn(node_id: string | string[], animate = true): void {
        // If the diagram is in the process of moving, the computed coordinates will be incorrect
        // by the time the diagram stops moving. Wait for the diagram to stop moving first by using
        // the isUpdating observable
        this.panZoom.isUpdating$
            .filter(isUpdating => ! isUpdating)
            .first()
            .subscribe(() => {
                const zoom_perc = this.computeZoom(node_id);
                console.log(zoom_perc)
                this.zoom(zoom_perc, animate);
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

    resetZoom(): void {
        this.panZoom.resetZoom();
    }

}