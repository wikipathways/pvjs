import {intersection, keys, forOwn} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getMarkerPropertyValue, MARKER_PROPERTY_NAMES} from './Marker';

export class Edge extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {id, drawAs, color, strokeDasharray, borderWidth, edgeDrawers, points, type}
            = this.props;

        const {getPathSegments, getPointAtPosition} = edgeDrawers[drawAs];
        const pathSegments = getPathSegments(points, id);
        const d = pathSegments
            .map(function(pathSegment) {
                return pathSegment.command + pathSegment.points.join(',');
            })
            .join('');

        const markerProperties = intersection(
            MARKER_PROPERTY_NAMES,
            keys(this.props)
        )
            .reduce((acc: any[], markerLocationType: MarkerPropertyName) => {
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
            }, []) as any[];

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

        return <path key={`path-for-${id}`} {...opts}/>;
    }
}
