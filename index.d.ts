/// <reference path="./svg-text.d.ts" />
/// <reference path="./tower-strcase.d.ts" />
/// <reference path="./node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="./node_modules/bridgedb/typings/organism.d.ts" />

// for details on vocab, see http://vocabularies.bridgedb.org/ops#

declare interface DataSource {
	about: string;
	conventionalName: string;
	entityType: string; // http://vocabularies.bridgedb.org/ops#type
	fullName: string;
	hasIdentifiersOrgPattern: string;
	hasPrimaryUriPattern: string;
	hasRegexPattern: string;
	hasRegexUriPattern: string;
	idExample: string;
	miriamUrn: string;
	primary: boolean;
	preferredPrefix: string;
	systemCode: string;
	type: string; // http://www.w3.org/1999/02/22-rdf-syntax-ns#type
	alternatePrefix?: string|string[];
	sameAs?: string[]; // http://www.w3.org/2002/07/owl#sameAs
	subject?: string|string[];
}

declare interface Xref {
	identifier: string;
	symbol?: string;
	about?: string;
	isDataItemIn?: DataSource;
	organism?: organism;
	type?: string[];
	xref?: [string, string];
}

declare type LineTypes = 'StraightLine' | 'SegmentedLine' | 'ElbowLine' | 'CurvedLine';

declare type Line = {
	[K in LineTypes]: {
		getPathSegments: (points, markers, elementId?) => any[],
		getPointAtPosition: (points, markers, position) => [number, number]
	};
}

//declare interface PathSegment {}

// Based on the list from here: https://www.w3.org/TR/SVG/painting.html#MarkerProperties
// but in camel case to match React inputs.
declare type MarkerPropertyName = 'markerStart' | 'markerEnd' | 'markerMid' | 'marker';
declare interface MarkerComponentProps {
	backgroundColor: string;
	color: string;
	markerDrawers: Function;
	markerLocationType: MarkerPropertyName;
	markerName: NonFuncIriMarkerPropertyValue & string;
}

declare type NonFuncIriMarkerPropertyValue = 'none' | 'inherit';

declare type IconTypes = 'Arc' | 'Ellipse' | 'Rectangle' | 'RoundedRectangle';

declare interface Icon {
	id: string,
	url: string
}

//// marker
//declare type Icon = {
//	[K in IconTypes]: {
//		shapes: any[],
//		getPathData: (x, y, width, height) => string
//		getDimensions: () => {markerWidth: number, markerHeight: number}
//	};
//}
//// shape
//declare type Icon1 = {
//	[K in IconTypes]: {
//		getPathSegments: (x, y, width, height) => any[]
//	};
//}


//		ellipse: {
//			getPathSegments: function(x, y, width, height) {
//				var cx = x + width/2;
//				var cy = y + height/2;
//				var width_over_2 = width / 2,
//					width_two_thirds = width * 2 / 3,
//					height_over_2 = height / 2;
//
//				var pathData = [{command: 'moveTo', points: [cx, (cy - height_over_2)]},
//					{command: 'bezierCurveTo', points: [(cx + width_two_thirds), (cy - height_over_2), (cx + width_two_thirds), (cy + height_over_2), (cx), (cy + height_over_2)]},
//					{command: 'bezierCurveTo', points: [(cx - width_two_thirds), (cy + height_over_2), (cx - width_two_thirds), (cy - height_over_2), (cx), (cy - height_over_2)]}];
//
//				return pathData;
//			}
//		},
//		ellipseDouble: {
//			getPathSegments: function(x, y, width, height) {
//				var outerEllipse = ellipse.getPathSegments(x, y, width, height);
//
//				var doubleLineGap = 2 * data.borderWidth || 6;
//				var innerEllipse = ellipse.getPathSegments(x + doubleLineGap, y + doubleLineGap, width - 2 * doubleLineGap, height - 2 * doubleLineGap);
//
//				var pathData = outerEllipse.concat(innerEllipse);
//				return pathData;
//			}
//		},
//
//// arrow marker
//			shapes: [
//				{
//					tag: 'rect',
//					attributes: {
//						x: 0,
//						y: 5.4,
//						width: 2,
//						height: 1.2,
//						stroke: backgroundColor,
//						fill: backgroundColor
//					},
//				},
//				{
//					tag: 'polygon',
//					attributes: {
//						points: '12,11 0,6 12,1',
//						strokeWidth: 0,
//						fill: color
//					}
//				}
//			],
//			getPathSegments: function(x, y, width, height) {
//				return [{
//					command: 'M',
//					points: [(x), y]
//				},{
//					command: 'L',
//					points: [x + width, (y + height/2)]
//				}, {
//					command: 'L',
//					points: [(x), (y + height)]
//				}, {
//					command: 'Z',
//					points: []
//				}];
//			},
//			getDimensions: function() {
//				return {
//					markerWidth: 12,
//					markerHeight: 12
//				};
//			},
