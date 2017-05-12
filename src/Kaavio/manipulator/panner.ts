import {Kaavio} from "../Kaavio";
import {PanZoom} from "../components/PanZoom";
import {getNodeBBox, getGroupBBox} from "./utils";

export class Panner {
    private kaavio: Kaavio;
    private panZoom: PanZoom;
    private diagram: any;

    constructor(kaavio: Kaavio, panZoom, diagram) {
        this.kaavio = kaavio;
        this.panZoom = panZoom;
        this.diagram = diagram;
    }

    private animatePan(coordinates: {x: number, y: number}): void {
        const duration = 300;
        const panStep = 1;
        const curPan = this.panZoom.getPan();
        const diffX = coordinates.x - curPan.x;
        const diffY = coordinates.y - curPan.y;

        const forwardX = diffX > 0;
        const forwardY = diffY > 0;

        const totalStepsY = Math.round(Math.abs(diffY/panStep));
        const totalStepsX = Math.round(Math.abs(diffX/panStep));
        const totalSteps = Math.max(totalStepsX, totalStepsY);

        let step = 0;
        let prevCoords = curPan;
        const intervalID = setInterval(() => {

            if(step >= totalSteps) {
                clearInterval(intervalID);
                return;
            }

            const doPan = (shouldPanX, shouldPanY, stepFuncX, stepFuncY) => {
                if(!shouldPanX && !shouldPanY) {
                    clearInterval(intervalID);
                    return
                }

                const toPan = {
                    x: shouldPanX ? stepFuncX(prevCoords.x): prevCoords.x,
                    y: shouldPanY ? stepFuncY(prevCoords.y): prevCoords.y
                };
                prevCoords = toPan;
                this.pan(toPan, false);
                step++;
            };

            const addStep = (coord) => coord + step;
            const takeStep = (coord) => coord - step;

            if(forwardX && forwardY) {
                // Bottom right
                return doPan(prevCoords.x <= coordinates.x, prevCoords.y <= coordinates.y, addStep, addStep);
            }
            else if(!forwardX && forwardY) {
                // Bottom left
                return doPan(prevCoords.x >= coordinates.x, prevCoords.y <= coordinates.y, takeStep, addStep);
            }
            else if(forwardX && !forwardY) {
                // Top right
                return doPan(prevCoords.x <= coordinates.x, prevCoords.y >= coordinates.y, addStep, takeStep);
            }

            return doPan(prevCoords.x >= coordinates.x, prevCoords.y >= coordinates.y, takeStep, takeStep);
        }, duration / totalSteps)
    }

    /**
     * Pan to a specific set of coordinates.
     * @param coordinates
     * @param animate
     */
    pan(coordinates: {x: number, y: number}, animate = true): void {
        if(animate)
            return this.animatePan(coordinates);
        this.panZoom.pan(coordinates);
    }

    /**
     * Pan to a specific node.
     * @param node_id
     * @param animate - Should the pan be animated?
     */
    panTo(node_id: string | string[], animate = true): void {
        // If the diagram is in the process of moving, the computed coordinates will be incorrect
        // by the time the diagram stops moving. Wait for the diagram to stop moving first by using
        // the isUpdating observable
        this.panZoom.isUpdating$
            .filter(isUpdating => ! isUpdating)
            .first()
            .subscribe(() => {
                // Calculate the coordinates to pan to
                let BBox;
                if (typeof node_id === 'string') BBox = getNodeBBox(node_id, this.diagram, this.panZoom.getSizes().realZoom);
                else {
                    if(node_id.length === 1) BBox = getNodeBBox(node_id[0], this.diagram, this.panZoom.getSizes().realZoom);
                    else BBox = getGroupBBox(node_id, this.diagram, this.panZoom.getSizes().realZoom);
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

                this.pan(coordinates, animate);
            })
    }

    resetPan(): void {
        this.panZoom.resetPan();
    }
}