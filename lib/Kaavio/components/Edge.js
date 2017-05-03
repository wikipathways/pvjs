import { intersection, keys } from 'lodash';
import * as React from 'react';
import { getMarkerPropertyValue, MARKER_PROPERTY_NAMES } from './Marker';
export class Edge extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { id, drawAs, color, strokeDasharray, borderWidth, edgeDrawers, points, type } = this.props;
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
                    // Currently just using the same color for backgroundColor (arrow head) as color (line)
                    // See line 86 in Kaavio.tsx
                    value: getMarkerPropertyValue(markerLocationType, markerName, color, color)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9FZGdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBUyxNQUFNLFFBQVEsQ0FBQztBQUNsRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFdkUsTUFBTSxXQUFZLFNBQVEsS0FBSyxDQUFDLFNBQW1CO0lBQy9DLFlBQVksS0FBSztRQUNiLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEdBQzVFLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFakIsTUFBTSxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxHQUFHLFlBQVk7YUFDakIsR0FBRyxDQUFDLFVBQVMsV0FBVztZQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFZCxNQUFNLGdCQUFnQixHQUFHLFlBQVksQ0FDakMscUJBQXFCLEVBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ25CO2FBQ0ksTUFBTSxDQUFDLENBQUMsR0FBVSxFQUFFLGtCQUFzQztZQUN2RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNMLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLHVGQUF1RjtvQkFDdkYsNEJBQTRCO29CQUM1QixLQUFLLEVBQUUsc0JBQXNCLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7aUJBQzlFLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxFQUFFLEVBQUUsQ0FBVSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHO1lBQ1AsU0FBUyxFQUFFLElBQUk7WUFDZixDQUFDLEVBQUUsQ0FBQztZQUNKLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxLQUFLO1lBQ2IsZUFBZSxFQUFFLGVBQWU7WUFDaEMsV0FBVyxFQUFFLFdBQVc7WUFDeEIsRUFBRSxFQUFFLEVBQUU7U0FDVCxDQUFDO1FBQ0YsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFNBQVM7WUFDN0Isa0RBQWtEO1lBQ2xELE1BQU0sT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUztZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsNENBQU0sR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFLElBQU0sSUFBSSxFQUFHLENBQUM7SUFDcEQsQ0FBQztDQUNKIn0=