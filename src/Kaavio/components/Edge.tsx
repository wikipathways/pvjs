import {intersection, keys} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getMarkerPropertyValue, MARKER_PROPERTY_NAMES} from './Marker';
import {Entity} from './Entity';

export class Edge extends React.Component<any, any> {
  constructor(props) {
		super(props);
		// NOTE: currently, props.backgroundColor is the background color of the diagram as a whole,
		// not necessarily that of the edge or any entity the edge is on top of. That could be a
		// problem for markers like Catalysis.
		this.state = {...props};
	}

	componentWillReceiveProps(nextProps) {
		let prevProps = this.props;
		const prevHighlightedColor = prevProps.highlightedColor;
		const prevHighlighted = prevProps.isHighlighted;
		const {isHighlighted, highlightedColor} = nextProps;
		if((isHighlighted != prevHighlighted) || (highlightedColor != prevHighlightedColor)) {
			console.log("Updating edge")
			this.setState({
				isHighlighted: isHighlighted,
				highlightedColor: highlightedColor
			})
		}
	}

  render() {
		let that = this;
		const state = that.state;
		const {backgroundColor, edgeDrawers, entity, entityMap} = state;
		const {color, borderWidth, points, id, drawAs, strokeDasharray} = entity;

		const {getPathSegments, getPointAtPosition} = edgeDrawers[drawAs];
		const pathSegments = getPathSegments(points, id);
		const d = pathSegments
			.map(function(pathSegment) {
				return pathSegment.command + pathSegment.points.join(',');
			})
			.join('');
			 
		const markerProperties = intersection(
				MARKER_PROPERTY_NAMES,
				keys(entity)
		)
		.reduce(function(acc: any[], markerLocationType: MarkerPropertyName) {
			const markerName = entity[markerLocationType];
			if (markerName) {
				acc.push({
					name: markerLocationType,
					value: getMarkerPropertyValue(markerLocationType, markerName, color, backgroundColor)
				});
			}
			return acc;
		}, []) as any[];

		let opts = {
			className: entity.type.join(' '),
			d: d,
			fill: 'transparent',
			stroke: color,
			strokeDasharray: strokeDasharray,
			strokeWidth: borderWidth,
			id: entity.id,
		};
		markerProperties.forEach(function(attribute) {
			opts[attribute.name] = attribute.value;
		});

		return <Entity {...state} children={[
			<path key={`path-for-${entity.id}`} {...opts}/>
		]} />;
	}
}
