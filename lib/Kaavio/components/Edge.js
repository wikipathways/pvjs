import { intersection, keys } from 'lodash';
import * as React from 'react';
import { getMarkerPropertyValue, MARKER_PROPERTY_NAMES } from './Marker';
export class Edge extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { id, drawAs, color, strokeDasharray, borderWidth, edgeDrawers, points, backgroundColor, type } = this.props;
        const { getPathSegments, getPointAtPosition } = edgeDrawers[drawAs];
        const pathSegments = getPathSegments(points, id);
        const d = pathSegments
            .map(function (pathSegment) {
            return pathSegment.command + pathSegment.points.join(',');
        })
            .join('');
        const markerProperties = intersection(MARKER_PROPERTY_NAMES, keys(this.props))
            .reduce((acc, markerLocationType) => {
            const markerName = this.props[markerLocationType];
            if (markerName) {
                acc.push({
                    name: markerLocationType,
                    value: getMarkerPropertyValue(markerLocationType, markerName, color, backgroundColor)
                });
            }
            return acc;
        }, []);
        let opts = {
            className: type,
            d: d,
            fill: 'transparent',
            stroke: color,
            strokeDasharray: strokeDasharray,
            strokeWidth: borderWidth,
            id: id,
        };
        markerProperties.filter(attribute => {
            // Ensure only markerEnd, markerStart or markerMid
            const allowed = ['markerMid', 'markerStart', 'markerEnd'];
            return allowed.indexOf(attribute.name) > -1;
        }).forEach((attribute) => {
            opts[attribute.name] = attribute.value;
        });
        return React.createElement("path", Object.assign({ key: `path-for-${id}` }, opts));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9FZGdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBUyxNQUFNLFFBQVEsQ0FBQztBQUNsRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFdkUsTUFBTSxXQUFZLFNBQVEsS0FBSyxDQUFDLFNBQW1CO0lBQy9DLFlBQVksS0FBSztRQUNiLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBQyxHQUM3RixJQUFJLENBQUMsS0FBSyxDQUFDO1FBRWpCLE1BQU0sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsR0FBRyxZQUFZO2FBQ2pCLEdBQUcsQ0FBQyxVQUFTLFdBQVc7WUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWQsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQ2pDLHFCQUFxQixFQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNuQjthQUNJLE1BQU0sQ0FBQyxDQUFDLEdBQVUsRUFBRSxrQkFBc0M7WUFDdkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDTCxJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsc0JBQXNCLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUM7aUJBQ3hGLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxFQUFFLEVBQUUsQ0FBVSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHO1lBQ1AsU0FBUyxFQUFFLElBQUk7WUFDZixDQUFDLEVBQUUsQ0FBQztZQUNKLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxLQUFLO1lBQ2IsZUFBZSxFQUFFLGVBQWU7WUFDaEMsV0FBVyxFQUFFLFdBQVc7WUFDeEIsRUFBRSxFQUFFLEVBQUU7U0FDVCxDQUFDO1FBQ0YsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFNBQVM7WUFDN0Isa0RBQWtEO1lBQ2xELE1BQU0sT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUztZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsNENBQU0sR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFLElBQU0sSUFBSSxFQUFHLENBQUM7SUFDcEQsQ0FBQztDQUNKIn0=