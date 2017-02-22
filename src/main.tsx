import { omit } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Kaavio from './kaavio/main';
require('./stripped-bootstrap.css');
import * as WikiPathwaysDefaultDisplayStyle from './WikiPathwaysDefaultDisplayStyle';

//import gpml2pvjson from 'gpml2pvjson/lib/main';
let gpml2pvjson = require('gpml2pvjson').default;

import { Observable } from 'rxjs/Observable';
import { AjaxRequest } from  'rxjs/observable/dom/AjaxObservable';
import 'rxjs/add/observable/dom/ajax';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';

// https://github.com/wikipathways/pvjs/tree/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols
let icons = {
	Arc: {
		id: 'arc',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/arc.svg'
	},
	Brace: {
		id: 'brace',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/brace.svg'
	},
	EndoplasmicReticulum: {
		id: 'endoplasmic-reticulum',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/endoplasmic-reticulum.svg'
	},
	Hexagon: {
		id: 'hexagon',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/hexagon.svg'
	},
	GolgiApparatus: {
		id: 'golgi-apparatus',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/golgi-apparatus.svg'
	},
	MimDegradation: {
		id: 'mim-degradation',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/mim-degradation.svg'
	},
	Mitochondria: {
		id: 'mitochondria',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/mitochondria.svg'
	},
	None: {
		id: 'none',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/none.svg'
	},
	Oval: {
		id: 'oval',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/oval.svg'
	},
	Pentagon: {
		id: 'pentagon',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/pentagon.svg'
	},
	Rectangle: {
		id: 'rectangle',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/rectangle.svg'
		//url: 'http://clipartist.net/social/clipartist.net/B/base_tux_g_v_linux.svg#layer1',
		//url: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-address-book.svg#Layer_1'
		//url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg',
		//url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg#svg2',
		//url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Svg_example2.svg',
	},
//	RoundedRectangle: {
//		id: 'svg4333',
//		url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Black_box.svg#svg4333',
//	},
	Triangle: {
		id: 'triangle',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/triangle.svg'
	},
	SarcoplasmicReticulum: {
		id: 'sarcoplasmic-reticulum',
		url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/sarcoplasmic-reticulum.svg'
	},
	Silly: {
		id: 'svg2',
		url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg',
		//url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg#svg2',
		//url: 'http://clipartist.net/social/clipartist.net/B/base_tux_g_v_linux.svg#layer1',
		//url: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-address-book.svg#Layer_1'
		//url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Svg_example2.svg',
	},
} as any;
icons.Circle = icons.Oval;
icons.Complex = icons.Hexagon;
icons.RoundedRectangle = icons.Rectangle;

class DoubleStrokeFilter extends React.Component<any, any> {
  constructor(props) {
		super(props);
		this.state = {...props};
  }
	render() {
		let that = this;
		const { id, strokeWidth } = that.state;
		if (strokeWidth === 1) {
			return <filter id={id} key={id}>
				<feComposite key="darkened" in="SourceGraphic" in2="SourceGraphic" operator="over" result="darkened" />
				<feMorphology key="dilated" in="SourceGraphic" operator="dilate" radius="1" result="dilated" />
				<feComposite key="doubled" in="dilated" in2="darkened" operator="out" result="doubled" />
			</filter>;
		}
		 
		return <filter id={id} key={id}>
			<feMorphology key="dilated" in="SourceGraphic" operator="dilate" radius={strokeWidth} result="dilated" />
			<feComposite key="doubled" in="dilated" operator="xor" in2="SourceGraphic" result="doubled" />
		</filter>;
	}
}

let edgeDrawers = {
	CurvedLine: {
		// modified from d3js: https://github.com/mbostock/d3/blob/ed54503fc7781d8bfe9e9fe125b76b9bbb5ac05c/src/svg/line.js
		// TODO this code is kind of hacky. it seems to work OK, but it's probably confusing and should be refactored for readability/maintainability.
		getPathSegments: function(elbowPoints, elementId, markerStart, markerEnd) {
			// Returns the dot product of the given four-element vectors.
			function d3_svg_lineDot4(a, b) {
				return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
			}

			// Matrix to transform basis (b-spline) control points to bezier
			// control points. Derived from FvD 11.2.8.
			var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
					d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
					d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

			// Pushes a "C" Bézier curve onto the specified path array, given the
			// two specified four-element arrays which define the control points.
			function lineBasisBezier(pathData, x, y) {
				var pointsForBezier = [];
				pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), d3_svg_lineDot4(d3_svg_lineBasisBezier1, y)]);

				pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), d3_svg_lineDot4(d3_svg_lineBasisBezier2, y)]);

				pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), d3_svg_lineDot4(d3_svg_lineBasisBezier3, y)]);

				pathData.push({command: 'bezierCurveTo', points: pointsForBezier});
			}

			function changeDirection(currentDirection) {
				var xDirection = Math.abs(Math.abs(currentDirection[0]) - 1);
				var yDirection = Math.abs(Math.abs(currentDirection[1]) - 1);
				return [xDirection, yDirection];
			}

			var elbowPointCount = elbowPoints.length;
			var firstPoint = elbowPoints[0],
				lastPoint = elbowPoints[elbowPointCount - 1];
			var points = [];
			points.push(firstPoint);

			var lastSegment = [];
			var pathData = [{command: 'M', points: [firstPoint.x, firstPoint.y]}];

			var direction = [];
			if (firstPoint.anchor) {
				direction.push(firstPoint.anchor[2]);
				direction.push(firstPoint.anchor[3]);
			} else {
				// arbitrary
				direction = [1, 0];
				console.warn('No anchor specified for edge "' + elementId + '"');
			}

			// for curves, I'm calculating and using the points representing the elbow vertices, from the given points (which represent the first point, any elbow segment mid-points and the last point).
			// I'm making sure the curve passes through the midpoint of the marker side that is furthest away from the node it is attached to
			// TODO this code might be confusing, because it involves redefining the points. Look at refactoring it for readability.
			var markerHeightFactor = 0.75;
			if (!!markerStart && firstPoint.anchor && typeof(firstPoint.anchor[2]) !== 'undefined' && typeof(firstPoint.anchor[3]) !== 'undefined') {
				var firstPointWithOffset: any = {};
				var firstOffset;
				//var firstMarkerData = crossPlatformShapesInstance.presetShapes[markerStart].getDimensions(crossPlatformShapesInstance);
				var firstMarkerData = {x: 0, y: 0, markerWidth: 12, markerHeight: 12};
				if (!!firstMarkerData) {
					firstOffset = markerHeightFactor * firstMarkerData.markerHeight;
				} else {
					firstOffset = 12;
				}
				firstPointWithOffset.x = firstPoint.anchor[2] * firstOffset + firstPoint.x;
				firstPointWithOffset.y = firstPoint.anchor[3] * firstOffset + firstPoint.y;
				pathData.push({command: 'L', points: [firstPointWithOffset.x, firstPointWithOffset.y]});
				points[0] = firstPointWithOffset;
			}

			if (!!markerEnd && lastPoint.anchor && typeof(lastPoint.anchor[2]) !== 'undefined' && typeof(lastPoint.anchor[3]) !== 'undefined') {
				lastSegment.push({command: 'L', points: [lastPoint.x, lastPoint.y]});

				var lastPointWithOffset: any = {};
				var lastOffset;
				//var lastMarkerData = crossPlatformShapesInstance.presetShapes[markerEnd].getDimensions(crossPlatformShapesInstance);
				var lastMarkerData = {x: 0, y: 0, markerWidth: 12, markerHeight: 12};
				if (!!lastMarkerData) {
					lastOffset = markerHeightFactor * lastMarkerData.markerHeight;
				} else {
					lastOffset = 12;
				}
				lastPointWithOffset.x = lastPoint.anchor[2] * lastOffset + lastPoint.x;
				lastPointWithOffset.y = lastPoint.anchor[3] * lastOffset + lastPoint.y;
				elbowPoints[elbowPointCount - 1] = lastPoint = lastPointWithOffset;
			}

			elbowPoints.forEach(function(elbowPoint, index) {
				var x0, y0, x1, y1;
				if (index > 0 && index < elbowPointCount) {
					x0 = Math.abs(direction[0]) * (elbowPoints[index].x - elbowPoints[index - 1].x) + elbowPoints[index - 1].x;
					y0 = Math.abs(direction[1]) * (elbowPoints[index].y - elbowPoints[index - 1].y) + elbowPoints[index - 1].y;
					points.push({x: x0, y: y0});
					direction = changeDirection(direction);
				}
			});
			points.push(lastPoint);

			var i = 1,
				n = points.length,
				pi = points[0],
				x0 = pi.x,
				y0 = pi.y,
				px = [x0, x0, x0, (pi = points[1]).x],
				py = [y0, y0, y0, pi.y];
				pathData.push({command: 'L', points: [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)]});
			points.push(points[n - 1]);
			while (++i <= n) {
				pi = points[i];
				px.shift(); px.push(pi.x);
				py.shift(); py.push(pi.y);
				lineBasisBezier(pathData, px, py);
			}
			points.pop();
			pathData.push({command: 'L', points: [pi.x, pi.y]});
			pathData = pathData.concat(lastSegment);
			return pathData;
		},
		getPointAtPosition: function(targetEdgeData, position) {
			// TODO make this actually calculate and return a value
			return {x:0, y: 0};
		},
	},
	ElbowLine: {
		getPathSegments: function(points, elementId) {
			function changeDirection(currentDirection) {
				var xDirection = Math.abs(Math.abs(currentDirection[0]) - 1);
				var yDirection = Math.abs(Math.abs(currentDirection[1]) - 1);
				return [xDirection, yDirection];
			}

			var pointCount = points.length;
			var firstPoint = points[0],
				lastPoint = points[pointCount - 1];

			var pathData = [{command: 'M', points: [firstPoint.x, firstPoint.y]}];

			var direction = [];
			if (firstPoint.anchor) {
				direction.push(firstPoint.anchor[2]);
				direction.push(firstPoint.anchor[3]);
			} else {
				// arbitrary
				direction = [1, 0];
				console.warn('No anchor specified for edge "' + elementId + '"');
			}

			points.forEach(function(point, index) {
				if (index > 0 && index < pointCount) {
					var x0 = Math.abs(direction[0]) * (points[index].x - points[index - 1].x) + points[index - 1].x,
						y0 = Math.abs(direction[1]) * (points[index].y - points[index - 1].y) + points[index - 1].y;
					pathData.push({command: 'L', points: [x0, y0]});
					direction = changeDirection(direction);
				}
			});

			pathData.push({command: 'L', points: [lastPoint.x, lastPoint.y]});

			return pathData;
		},
		getPointAtPosition: function(targetEdgeData, position) {
			// TODO make this actually calculate and return a value
			return {x:0, y: 0};
		},
	},
	SegmentedLine: {
		getPathSegments: function(points) {
			var firstPoint = points[0];

			var pathData = [{command: 'M', points: [firstPoint.x, firstPoint.y]}];

			points.forEach(function(point, index) {
				if (index > 0) {
					pathData.push({command: 'L', points: [point.x, point.y]});
				}
			});

			return pathData;
		},
		getPointAtPosition: function(targetEdgeData, position) {
			// TODO make this actually calculate and return a value
			return {x:0, y: 0};
		},
	},
	StraightLine: {
		getPathSegments: function(points) {
			const firstPoint = points[0];
			const lastPoint = points[points.length - 1];
			const x0 = firstPoint.x;
			const y0 = firstPoint.y;
			const x1 = lastPoint.x;
			const y1 = lastPoint.y;

			return [{
				command: 'M',
				points: [x0, y0]
			}, {
				command: 'L',
				points: [x1, y1]
			}];
		},
		getPointAtPosition: function(targetEdgeData, position) {
			const points = targetEdgeData.points;
			const firstPoint = points[0];
			const lastPoint = points[points.length - 1];
			const x0 = firstPoint.x;
			const y0 = firstPoint.y;
			const x1 = lastPoint.x;
			const y1 = lastPoint.y;

			var x = x0 + (x1 - x0) * position;
			var y = y0 + (y1 - y0) * position;
			return {x: x, y: y};
		},
	},
};

// TODO groupChildren were originally drawn as markerStart, but markerEnd is actually used much
// more often than markerStart. So for performance and simplicity reasons, it would be better that
// the groupChildren were drawn for markerEnd. When we redraw them, we can get rid of the extra g
// element and its transform for each markerDrawer below.

// NOTE: All markers put the groupChildren (visible marker contents) inside a group g element.
// Draw the groupChildren for markerEnd. If a marker is markerStart, Kaavio will rotate it 180deg.
let markerDrawers: any = {
	Arrow: function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="Arrow" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke={backgroundColor} fill={backgroundColor}/>
					<polygon points="12,11 0,6 12,1" strokeWidth="0" fill={color}/>
				</g>
			],
		};
	},
	'mim-binding': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-binding" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke={backgroundColor} fill={backgroundColor}/>
					<polygon points="12,12 0,6 12,0 5,6" strokeWidth="0" fill={color}/>
				</g>
			],
		};
	},
	'mim-necessary-stimulation': function(backgroundColor, color) {
		const markerWidth = 16;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-necessary-stimulation" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke="none" fill={backgroundColor}/>
					<line x1="14" y1="0" x2="14" y2="12" stroke={color} strokeWidth="1" fill="none"/>
					<line x1="16" y1="6" x2="16" y2="6" stroke="none" fill="none"/>
					<polygon points="0,6 9,11 9,1" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-stimulation': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-stimulation" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke="none" fill={backgroundColor}/>
					<line x1="12" y1="6" x2="12" y2="6" stroke="none" fill="none"/>
					<polygon points="0,6 11,11 11,1" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-modification': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-modification" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke={backgroundColor} fill={backgroundColor}/>
					<polygon points="0,6 11,11 11,1" strokeWidth="0" fill={color}/>
				</g>
			],
		};
	},
	'mim-catalysis': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-catalysis" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<circle cx="6" cy="6" r="5.3px" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-cleavage': function(backgroundColor, color) {
		const markerWidth = 20;
		const markerHeight = 30;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-cleavage" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="14.3" width="18.4" height="1.4" stroke={backgroundColor} fill={backgroundColor}/>
					<line x1="18" y1="14.5" x2="18" y2="30" stroke={color} strokeWidth="1"/>
					<line x1="18" y1="30" x2="0" y2="0" stroke={color} strokeWidth="1"/>
				</g>
			],
		};
	},
	'mim-covalent-bond': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-covalent-bond" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="0" width="0" height="0" stroke={backgroundColor} strokeWidth="0" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-transcription-translation': function(backgroundColor, color) {
		const markerWidth = 20;
		const markerHeight = 24;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-transcription-translation" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="11" width="12" height="2" stroke={backgroundColor} fill={backgroundColor}/>
					<line x1="15" y1="12" x2="15" y2="5" stroke={color} strokeWidth="1" fill="none"/>
					<line x1="15.5" y1="5" x2="8" y2="5" stroke={color} strokeWidth="1" fill="none"/>
					<polygon points="0,5 8,1 8,9" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-gap': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-gap" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.3" width="8" height="1.4" stroke="none" fill={backgroundColor}/>
				</g>
			],
		};
	},
	TBar: function(backgroundColor, color) {
		const markerWidth = 10;
		const markerHeight = 20;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="TBar" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="9" width="8" height="2" fill={backgroundColor}/>
					<line x="0" y="0" width="12" height="12" stroke={color} strokeWidth="1.8" x1="7" y1="0" x2="7" y2="20"/>
				</g>
			],
		};
	},
};
markerDrawers['mim-inhibition'] = markerDrawers.TBar;
markerDrawers['mim-conversion'] = markerDrawers.Arrow;

// TODO the branching markerDrawers are currently just be copies of Arrow,
// because we didn't have time to draw them. But we should either delete
// these or else draw them properly.
markerDrawers['mim-branching-left'] = markerDrawers.Arrow;
markerDrawers['mim-branching-right'] = markerDrawers.Arrow;

class Pvjs extends React.Component<any, any> {
	pathwayRequest: Observable<any>;
  constructor(props) {
		const customStyle = props.customStyle || {};
		super(props);
		this.state = {
			id: props.id,
			pvjson: {
				elements: [],
				organism: '',
				name: '',
			},
			customStyle: props.customStyle,
		};
  }

	getPathway() {
		let that = this;
		const state = that.state;
		// NOTE: this is in case the pathway id is provided as something like wikipathways:WP554
		// TODO what about if it's provided as something like this: http://identifiers.org/wikipathways/WP554
		const fullId = state.id.replace(/wikipathways:/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=')
		const ajaxRequest: AjaxRequest = {
			url: fullId,
			method: 'GET',
			responseType: 'json',
			timeout: 1 * 1000, // ms
			crossDomain: true,
		};
		return gpml2pvjson(
				Observable.ajax(ajaxRequest)
					.map((ajaxResponse): {data: string} => ajaxResponse.xhr.response)
					.map(res => atob(res.data)),
				fullId
		)
			.subscribe(function(pvjson) {
				let { elements, organism, name } = pvjson;

				const infoBoxTextContent = `Title: ${name}\rOrganism: ${organism}`;

				pvjson.elements = elements.map(function(element) {
					const displayName = element.displayName;
					if (displayName) {
						element.textContent = displayName;
					}
					omit(element, ['displayName']);
					return element;
				}).concat([{
					id: 'pvjs-infobox',
					pvjsonType: 'Node',
					drawAs: 'None',
					backgroundColor: 'transparent',
					borderWidth: 0,
					color: '#999999',
					fontSize: 14,
					textContent: infoBoxTextContent,
					textAlign: 'start',
					type: [
						'Node',
						'Label',
						'InfoBox',
					],
					padding: '0.5em',
					verticalAlign: 'middle',
					x: 5,
					y: 5,
					height: 30,
					width: infoBoxTextContent.length * 3.5,
					zIndex: Infinity,
				}]);
				that.setState({pvjson: pvjson});
			}, function(err) {
				err.message = err.message || '';
				err.message += ' Error getting pathway (is webservice.wikipathways.org down?)'
				console.error(err);
				that.setState({});
			})
	}

	componentDidMount() {
		let that = this;
		that.getPathway();
	}

	// TODO is this correct? Or should we use componentWillUpdate?
	componentDidUpdate(prevProps, prevState) {
		let that = this;
		const state = that.state;
		if (JSON.stringify(prevState.pvjson) !== JSON.stringify(state.pvjson)) {
			that.getPathway();
		}
	}

	componentWillUnmount() {
		let that = this;
		// TODO cancel any pending network requests, possibly something like this:
		//that.pathwayRequest.dispose();
	}	

  render() {
		let that = this;
		const state = that.state;
		const { pvjson, id, customStyle } = state;

		const doubleStrokeFilters = Array.from(
				pvjson.elements
					.filter((element) => element.lineStyle === 'double')
					.reduce(function(acc, element) {
						// we can't handle a strokeWidth of 0.4
						const roundedStrokeWidth = Math.max(1, Math.round(element.borderWidth || 1));
						element.filter = 'double' + roundedStrokeWidth;
						acc.add(roundedStrokeWidth);
						return acc;
					}, new Set())
		)
		.reduce(function(acc: any, strokeWidth) {
			const id = `double${strokeWidth}`;
			acc.push(function double() {
				return <DoubleStrokeFilter id={id} key={id} strokeWidth={strokeWidth} />;
			});
			return acc;
		}, []);
		
		const filters = doubleStrokeFilters;

		return <Kaavio id={id} pvjson={pvjson} customStyle={/*customStyle*/WikiPathwaysDefaultDisplayStyle} edgeDrawers={edgeDrawers} icons={icons} markerDrawers={markerDrawers} filters={filters} />;
	}
}

export default Pvjs;
