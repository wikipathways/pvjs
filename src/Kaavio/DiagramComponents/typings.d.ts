export interface MarkerProps {
    backgroundColor: string;
    color: string;
    markerDrawers: Function;
    markerLocationType: MarkerPropertyName;
    markerName: NonFuncIriMarkerPropertyValue & string;
}

// Based on the list from here: https://www.w3.org/TR/SVG/painting.html#MarkerProperties
// but in camel case to match React inputs.
export type MarkerPropertyName = 'markerStart' | 'markerEnd' | 'markerMid' | 'marker';

export type NonFuncIriMarkerPropertyValue = 'none' | 'inherit';