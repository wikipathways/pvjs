import {Edge} from "./Edge";
import {Node} from './Node'
import {Marker} from './Marker';
import {Group} from './Group';
import {NonFuncIriMarkerPropertyValue, MarkerPropertyName} from "./typings";
export * from './typings.d.ts';

export const Components = {
    Edge: Edge,
    Node: Node,
    Marker: Marker,
    Group: Group
};

export const NON_FUNC_IRI_MARKER_PROPERTY_VALUES: NonFuncIriMarkerPropertyValue[] = ['none', 'inherit'];
export const MARKER_PROPERTY_NAMES: MarkerPropertyName[] = ['markerStart', 'markerMid', 'markerEnd', 'marker'];