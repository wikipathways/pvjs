import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const MARKER_PROPERTY_NAMES: ReadonlyArray<MarkerPropertyName> = ['markerStart', 'markerMid', 'markerEnd', 'marker'];
export const NON_FUNC_IRI_MARKER_PROPERTY_VALUES: ReadonlyArray<NonFuncIriMarkerPropertyValue> = ['none', 'inherit'];

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

export class Marker extends React.Component<any, any> {
  	constructor(props: MarkerComponentProps) {
		super(props);
	}

  	render() {
		const {id, backgroundColor, color, markerLocationType, markerDrawers, markerName } = this.props;

		const markerDrawer = markerDrawers[markerName](backgroundColor, color);
		const { markerAttributes, groupChildren } = markerDrawer;
		const { markerWidth, markerHeight } = markerAttributes;

		const markerId = getMarkerId(markerLocationType, markerName, color, backgroundColor);

		return <marker 
							id={markerId}
							key={markerId}
							markerUnits="strokeWidth"
							orient="auto"
							preserveAspectRatio="none"
							refX={(markerLocationType === 'markerEnd') ?  markerWidth : 0}
							refY={markerHeight / 2}
							viewBox={`0 0 ${ markerWidth } ${ markerHeight}`}
							{...markerAttributes}>
			<g id={`g-${markerId}`}
				 key={`g-${markerId}`}
				 transform={(markerLocationType === 'markerEnd') ? '' : `rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
				{groupChildren}
			</g>
		</marker>;
	}
}
