/// <reference types="react" />
import * as React from 'react';
export declare function doubleStroke({source, strokeWidth}: {
    source?: string;
    strokeWidth?: number;
}): JSX.Element[];
export declare function round({source, strokeWidth}: {
    source?: string;
    strokeWidth?: number;
}): JSX.Element[];
export declare function generateFilterId(filterName: any, strokeWidth: any): string;
export declare class Filter extends React.Component<any, any> {
    constructor(props: any);
    render(): JSX.Element;
}
