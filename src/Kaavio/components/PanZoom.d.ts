/// <reference types="react" />
import * as React from 'react';
export declare class PanZoom extends React.Component<any, any> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    destroy: () => void;
    init: (diagram: any, onInit?: any) => void;
    zoomOnEntities(): Promise<{}>;
    panToEntities(): Promise<{}>;
    locate(entities: string[]): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    render(): any;
}
