/// <reference path="../../index.d.ts" />

import { intersection, keys } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getMarkerPropertyValue, MARKER_PROPERTY_NAMES } from './Marker';

export class Edge extends React.Component<any, any> {
  constructor(props) {
		super(props);
		this.state = {
			// NOTE: currently, this is the background color of the diagram as a whole,
			// not necessarily that of the edge or any element the edge is on top of.
			backgroundColor: props.backgroundColor,
			edgeDrawers: props.edgeDrawers,
			element: props.element,
		}
	}
  render() {
		let that = this;
		const state = that.state;
		const { backgroundColor, edgeDrawers, element } = state;
		const { color, borderWidth, points, id, drawAs, strokeDasharray } = element;

		const { getPathSegments, getPointAtPosition } = edgeDrawers[drawAs];
		const pathSegments = getPathSegments(points, id);
		const d = pathSegments
			.map(function(pathSegment) {
				return pathSegment.command + pathSegment.points.join(',');
			})
			.join('');
			 
		const markerProperties = intersection(
				MARKER_PROPERTY_NAMES,
				keys(element)
		)
		.reduce(function(acc: any[], markerLocationType: MarkerPropertyName) {
			const markerName = element[markerLocationType];
			if (markerName) {
				acc.push({
					name: markerLocationType,
					value: getMarkerPropertyValue(markerLocationType, markerName, color, backgroundColor)
				});
			}
			return acc;
		}, []) as any[];

		let opts = {
			className: element.type.join(' '),
			d: d,
			fill: 'transparent',
			stroke: color,
			strokeDasharray: strokeDasharray,
			strokeWidth: borderWidth,
			id: element.id,
		};
		markerProperties.forEach(function(attribute) {
			opts[attribute.name] = attribute.value;
		});

		return <path {...opts}/>;
	}
}

export default Edge;
