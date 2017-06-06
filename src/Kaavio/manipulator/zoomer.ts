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

    computeZoom(containerDims: {width: number, height: number}, entityDims: {width: number, height: number},
                scalingFactor = 1) {
        let relativeArea;
        if (entityDims.width >= entityDims.height) {
            relativeArea = containerDims.width / entityDims.width;
        }
        else {
            relativeArea = containerDims.height / entityDims.height;
        }
        return relativeArea * scalingFactor;
    }

    computeZoomForEntity(entity_id: string | string[]): number {
        let BBox;
        const containerSize = this.panZoom.getSizes();
        if(typeof entity_id === 'string') BBox = getNodeBBox(entity_id, this.diagram, containerSize.realZoom);
        else {
            if(entity_id.length === 1) BBox = getNodeBBox(entity_id[0], this.diagram, containerSize.realZoom);
            else BBox = getGroupBBox(entity_id, this.diagram, this.panZoom.getSizes().realZoom);
        }
        return this.computeZoom(containerSize, BBox, 0.95)
    }

    private animateZoom(zoom_perc: number): Promise<any> {
        const duration = 300;
        const zoomStep = .1;
        const curZoom = this.panZoom.getZoom();
        const diffZoom = Math.abs(curZoom - zoom_perc);
        const totalSteps = Math.round(diffZoom/zoomStep);

        let step = 0;

        return new Promise(resolve => {
            const intervalID = setInterval(() => {
                if(step <= totalSteps) {
                    this.panZoom.zoom(curZoom + (step * zoomStep));
                    step++;
                }
                else {
                    clearInterval(intervalID);
                    resolve()
                }
            }, duration / totalSteps)
        });
    }

    zoom(zoom_perc: number, animate = true): Promise<any> {
        if(animate) {
            return this.animateZoom(zoom_perc);
        } else {
            return new Promise(resolve => {
                this.panZoom.zoom(zoom_perc);
                resolve();
            });
        }
    }

    zoomOn(entity_id: string | string[], animate = true): Promise<any> {
        // If the diagram is in the process of moving, the computed coordinates will be incorrect
        // by the time the diagram stops moving. Wait for the diagram to stop moving first by using
        // the isUpdating observable
        return this.panZoom.isUpdating$
            .filter(isUpdating => ! isUpdating)
            .first()
            .map(() => {
                const zoom_perc = this.computeZoomForEntity(entity_id);
                return Observable.fromPromise(this.zoom(zoom_perc, animate));
            })
            .toPromise();
    }

    zoomIn(): void {
        this.panZoom.zoomIn();
    }

    zoomOut(): void {
        this.panZoom.zoomOut();
    }

    resetZoom(): void {
        this.panZoom.resetZoom();
    }

}