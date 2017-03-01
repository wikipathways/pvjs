import {
    MarkerPropertyName, NonFuncIriMarkerPropertyValue,
    NON_FUNC_IRI_MARKER_PROPERTY_VALUES
} from "./DiagramComponents";

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