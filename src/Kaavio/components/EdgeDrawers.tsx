const edgeDrawers = {
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

				pathData.push({command: 'C', points: pointsForBezier});
			}

			function changeDirection(currentDirection) {
				var xDirection = Math.abs(Math.abs(currentDirection[0]) - 1);
				var yDirection = Math.abs(Math.abs(currentDirection[1]) - 1);
				return [xDirection, yDirection];
			}

			var elbowPointCount = elbowPoints.length;
			var firstPoint = elbowPoints[0];
			var lastPoint = elbowPoints[elbowPointCount - 1];
			var points = [];
			points.push(firstPoint);

			var lastSegment = [];
			var pathData = [{command: 'M', points: [firstPoint.x, firstPoint.y]}];

			var direction = [];
			if (firstPoint.attachmentDisplay) {
				const attachmentDisplay = firstPoint.attachmentDisplay;
				direction.push(attachmentDisplay.orientation[0]);
				direction.push(attachmentDisplay.orientation[1]);
			} else {
				// best guess
				const xDisplacement = lastPoint.x - firstPoint.x;
				const absXDisplacement = Math.abs(xDisplacement);
				const yDisplacement = lastPoint.y - firstPoint.y;
				const absYDisplacement = Math.abs(yDisplacement);
				if (absXDisplacement > absYDisplacement) {
					direction = [0.5 * xDisplacement / absXDisplacement, 0];
				} else {
					direction = [0, 0.5 * yDisplacement / absYDisplacement];
				}
				console.warn('No attachmentDisplay specified for edge "' + elementId + '"');
			}

			// for curves, I'm calculating and using the points representing the elbow vertices, from the given points (which represent the first point, any elbow segment mid-points and the last point).
			// I'm making sure the curve passes through the midpoint of the marker side that is furthest away from the node it is attached to
			// TODO this code might be confusing, because it involves redefining the points. Look at refactoring it for readability.
			var markerHeightFactor = 0.75;
			if (!!markerStart && firstPoint.attachmentDisplay && typeof(firstPoint.attachmentDisplay.orientation[0]) !== 'undefined' && typeof(firstPoint.attachmentDisplay.orientation[1]) !== 'undefined') {
				var firstPointWithOffset: any = {};
				var firstOffset;
				//var firstMarkerData = crossPlatformShapesInstance.presetShapes[markerStart].getDimensions(crossPlatformShapesInstance);
				var firstMarkerData = {x: 0, y: 0, markerWidth: 12, markerHeight: 12};
				if (!!firstMarkerData) {
					firstOffset = markerHeightFactor * firstMarkerData.markerHeight;
				} else {
					firstOffset = 12;
				}
				firstPointWithOffset.x = firstPoint.attachmentDisplay.orientation[0] * firstOffset + firstPoint.x;
				firstPointWithOffset.y = firstPoint.attachmentDisplay.orientation[1] * firstOffset + firstPoint.y;
				pathData.push({command: 'L', points: [firstPointWithOffset.x, firstPointWithOffset.y]});
				points[0] = firstPointWithOffset;
			}

			if (!!markerEnd && lastPoint.attachmentDisplay && typeof(lastPoint.attachmentDisplay.orientation[0]) !== 'undefined' && typeof(lastPoint.attachmentDisplay.orientation[1]) !== 'undefined') {
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
				lastPointWithOffset.x = lastPoint.attachmentDisplay.orientation[0] * lastOffset + lastPoint.x;
				lastPointWithOffset.y = lastPoint.attachmentDisplay.orientation[1] * lastOffset + lastPoint.y;
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
		// TODO
		getPointAtPosition: function(points, position) {return {}},
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
			if (firstPoint.attachmentDisplay) {
				direction.push(firstPoint.attachmentDisplay.orientation[0]);
				direction.push(firstPoint.attachmentDisplay.orientation[1]);
			} else {
				// arbitrary
				direction = [1, 0];
				console.warn('No attachmentDisplay specified for edge "' + elementId + '"');
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
		// TODO
		getPointAtPosition: function(points, position) {return {}},
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
		// TODO
		getPointAtPosition: function(points, position) {return {}},
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
		getPointAtPosition: function(points, position) {
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

// TODO calculate these!
edgeDrawers.CurvedLine.getPointAtPosition = edgeDrawers.StraightLine.getPointAtPosition;
edgeDrawers.SegmentedLine.getPointAtPosition = edgeDrawers.SegmentedLine.getPointAtPosition;
edgeDrawers.ElbowLine.getPointAtPosition = edgeDrawers.ElbowLine.getPointAtPosition;

export default edgeDrawers;
