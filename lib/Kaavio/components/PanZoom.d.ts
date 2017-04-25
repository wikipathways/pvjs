/// <reference types="react" />
import * as React from 'react';
import { Observable } from "rxjs/Rx";
export declare class PanZoom extends React.Component<any, any> {
    panZoom: any;
    private isUpdating;
    isUpdating$: Observable<boolean>;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any, nextState: any): void;
    componentDidMount(): void;
    destroy: () => void;
    init: (diagram: any, onReady: any, showControls: boolean) => void;
    getSizes: () => any;
    getPan: () => any;
    zoom: (zoom_perc: number) => void;
    pan: (coordinates: {
        x: number;
        y: number;
    }) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetPan: () => void;
    resetZoom: () => void;
    reset: () => void;
    render(): any;
}
