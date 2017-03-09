import {
    MarkerPropertyName, NonFuncIriMarkerPropertyValue,
    NON_FUNC_IRI_MARKER_PROPERTY_VALUES
} from "./DiagramComponents";
import {highlightedNode} from "./Kaavio";
import * as _ from 'lodash';

export function getMarkerId(
    markerLocationType: MarkerPropertyName,
    markerName: string,
    color: string,
    backgroundColor: string
): string {
    return [markerLocationType, markerName, color, backgroundColor]
        .join('-')
        // we only want alphanumeric values and dashes in the id
        .replace(/[^A-Za-z0-9-]/g, '');
}

export function getMarkerPropertyValue(
    markerLocationType: MarkerPropertyName,
    markerName: NonFuncIriMarkerPropertyValue & string,
    color: string,
    backgroundColor: string
): NonFuncIriMarkerPropertyValue | string {
    // Don't make a funciri out of any of the names in NON_FUNC_IRI_MARKER_PROPERTY_VALUES
    if (NON_FUNC_IRI_MARKER_PROPERTY_VALUES.indexOf(markerName) > -1) {
        return markerName;
    }
    return `url(#${getMarkerId(markerLocationType, markerName, color, backgroundColor)})`;
}

export function getHighlighted(entity, highlightedNodes) {
    let result = {
        highlighted: false,
        color: null
    };
    // Only allow nodes to be highlighted
    if(entity.kaavioType != 'Node') return result;

    let matched: highlightedNode = _.find(highlightedNodes, (value, index) => {
        return value['node_id'] == entity.id;
    }) as highlightedNode;

    if (matched) {
        result.highlighted = true;
        result.color = matched.color;
    }

    return result;
}