/// <reference types="react" />
import * as React from 'react';
export declare const MARKER_PROPERTY_NAMES: ReadonlyArray<MarkerPropertyName>;
export declare const NON_FUNC_IRI_MARKER_PROPERTY_VALUES: ReadonlyArray<NonFuncIriMarkerPropertyValue>;
export declare function getMarkerId(markerLocationType: MarkerPropertyName, markerName: string, color: string, backgroundColor: string): string;
export declare function getMarkerPropertyValue(markerLocationType: MarkerPropertyName, markerName: NonFuncIriMarkerPropertyValue & string, color: string, backgroundColor: string): NonFuncIriMarkerPropertyValue | string;
export declare class Marker extends React.Component<any, any> {
    constructor(props: MarkerComponentProps);
    render(): JSX.Element;
}
