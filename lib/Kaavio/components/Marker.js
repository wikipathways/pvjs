import * as React from 'react';
export const MARKER_PROPERTY_NAMES = ['markerStart', 'markerMid', 'markerEnd', 'marker'];
export const NON_FUNC_IRI_MARKER_PROPERTY_VALUES = ['none', 'inherit'];
export function getMarkerId(markerLocationType, markerName, color, backgroundColor) {
    return [markerLocationType, markerName, color, backgroundColor]
        .join('-')
        .replace(/[^A-Za-z0-9-]/g, '');
}
export function getMarkerPropertyValue(markerLocationType, markerName, color, backgroundColor) {
    // Don't make a funciri out of any of the names in NON_FUNC_IRI_MARKER_PROPERTY_VALUES
    if (NON_FUNC_IRI_MARKER_PROPERTY_VALUES.indexOf(markerName) > -1) {
        return markerName;
    }
    return `url(#${getMarkerId(markerLocationType, markerName, color, backgroundColor)})`;
}
export class Marker extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { id, backgroundColor, color, markerLocationType, markerDrawers, markerName } = this.props;
        const markerDrawer = markerDrawers[markerName](backgroundColor, color);
        const { markerAttributes, groupChildren } = markerDrawer;
        const { markerWidth, markerHeight } = markerAttributes;
        const markerId = getMarkerId(markerLocationType, markerName, color, backgroundColor);
        return React.createElement("marker", Object.assign({ id: markerId, key: markerId, markerUnits: "strokeWidth", orient: "auto", preserveAspectRatio: "none", refX: (markerLocationType === 'markerEnd') ? markerWidth : 0, refY: markerHeight / 2, viewBox: `0 0 ${markerWidth} ${markerHeight}` }, markerAttributes),
            React.createElement("g", { id: `g-${markerId}`, key: `g-${markerId}`, transform: (markerLocationType === 'markerEnd') ? '' : `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` }, groupChildren));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0thYXZpby9jb21wb25lbnRzL01hcmtlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFHL0IsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQXNDLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUgsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQWlELENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRXJILE1BQU0sc0JBQ0osa0JBQXNDLEVBQ3RDLFVBQWtCLEVBQ2xCLEtBQWEsRUFDYixlQUF1QjtJQUV4QixNQUFNLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQztTQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDO1NBRVQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFFRCxNQUFNLGlDQUNKLGtCQUFzQyxFQUN0QyxVQUFrRCxFQUNsRCxLQUFhLEVBQ2IsZUFBdUI7SUFFeEIsc0ZBQXNGO0lBQ3RGLEVBQUUsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQVEsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQztBQUN2RixDQUFDO0FBRUQsTUFBTSxhQUFjLFNBQVEsS0FBSyxDQUFDLFNBQW1CO0lBQ2xELFlBQVksS0FBMkI7UUFDeEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVDLE1BQU07UUFDUCxNQUFNLEVBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFaEcsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLEdBQUcsWUFBWSxDQUFDO1FBQ3pELE1BQU0sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEdBQUcsZ0JBQWdCLENBQUM7UUFFdkQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFckYsTUFBTSxDQUFDLDhDQUNGLEVBQUUsRUFBRSxRQUFRLEVBQ1osR0FBRyxFQUFFLFFBQVEsRUFDYixXQUFXLEVBQUMsYUFBYSxFQUN6QixNQUFNLEVBQUMsTUFBTSxFQUNiLG1CQUFtQixFQUFDLE1BQU0sRUFDMUIsSUFBSSxFQUFFLENBQUMsa0JBQWtCLEtBQUssV0FBVyxDQUFDLEdBQUksV0FBVyxHQUFHLENBQUMsRUFDN0QsSUFBSSxFQUFFLFlBQVksR0FBRyxDQUFDLEVBQ3RCLE9BQU8sRUFBRSxPQUFRLFdBQVksSUFBSyxZQUFZLEVBQUUsSUFDNUMsZ0JBQWdCO1lBQ3hCLDJCQUFHLEVBQUUsRUFBRSxLQUFLLFFBQVEsRUFBRSxFQUNwQixHQUFHLEVBQUUsS0FBSyxRQUFRLEVBQUUsRUFDcEIsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEtBQUssV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLGVBQWdCLFdBQVcsR0FBRyxDQUFFLEtBQU0sWUFBWSxHQUFHLENBQUUsR0FBRyxJQUNqSCxhQUFhLENBQ1gsQ0FDSSxDQUFDO0lBQ1gsQ0FBQztDQUNEIn0=