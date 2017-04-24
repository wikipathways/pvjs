/// <reference types="react" />
import * as React from 'react';
import { Observable } from "rxjs/Rx";
export declare class PanZoom extends React.Component<any, any> {
    panZoom: any;
    private didZoom;
    private didPan;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any, nextState: any): void;
    componentDidMount(): void;
    destroy: () => void;
    init: (diagram: any, onReady: any, showControls: boolean) => void;
    getSizes: () => any;
    getPan: () => any;
    zoom: (zoom_perc: number) => Observable<number>;
    pan: (coordinates: {
        x: number;
        y: number;
    }) => Observable<{
        x: number;
        y: number;
    }>;
    zoomIn: () => Observable<number>;
    zoomOut: () => Observable<number>;
    resetPan: () => Observable<{
        x: number;
        y: number;
    }>;
    resetZoom: () => Observable<number>;
    reset: () => Observable<number | {
        x: number;
        y: number;
    }>;
    render(): any;
}
