import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getMarkerId} from "../utils";
import {MarkerProps} from "./";

export class Marker extends React.Component<any, any> {
    constructor(props: MarkerProps) {
        super(props);
        this.state = {
            markerName: props.markerName,
            color: props.color,
            backgroundColor: props.backgroundColor,
            markerLocationType: props.markerLocationType,
            markerDrawers: props.markerDrawers,
        }
    }
    render() {
        let that = this;
        const state = that.state;
        const { backgroundColor, color, markerLocationType, markerDrawers, markerName } = state;

        const markerDrawer = markerDrawers[markerName](backgroundColor, color);
        const { markerAttributes, groupChildren } = markerDrawer;
        const { markerWidth, markerHeight } = markerAttributes;

        const markerId = getMarkerId(markerLocationType, markerName, color, backgroundColor);

        return <marker
            id={markerId}
            key={markerId}
            markerUnits="strokeWidth"
            orient="auto"
            preserveAspectRatio="none"
            refX={(markerLocationType === 'markerEnd') ?  markerWidth : 0}
            refY={markerHeight / 2}
            viewBox={`0 0 ${ markerWidth } ${ markerHeight}`}
            {...markerAttributes}>
            <g id={`g-${markerId}`}
               key={`g-${markerId}`}
               transform={(markerLocationType === 'markerEnd') ? '' : `rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
                {groupChildren}
            </g>
        </marker>;
    }
}