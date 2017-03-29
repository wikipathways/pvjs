/// <reference types="react" />
import * as React from 'react';
export declare class PanZoom extends React.Component<any, any> {
    panZoom: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any, nextState: any): void;
    componentDidMount(): void;
    destroy: () => void;
    init: (diagram: any, onReady: any) => void;
    getSizes: () => any;
    getPan: () => any;
    zoom: (zoom_perc: number) => void;
    pan: (coordinates: {
        x: number;
        y: number;
    }) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetPanZoom: () => void;
    render(): JSX.Element;
}
