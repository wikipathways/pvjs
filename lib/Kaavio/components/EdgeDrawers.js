"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var edgeDrawers = {
    CurvedLine: {
        // modified from d3js: https://github.com/mbostock/d3/blob/ed54503fc7781d8bfe9e9fe125b76b9bbb5ac05c/src/svg/line.js
        // TODO this code is kind of hacky. it seems to work OK, but it's probably confusing and should be refactored for readability/maintainability.
        getPathSegments: function (elbowPoints, elementId, markerStart, markerEnd) {
            // Returns the dot product of the given four-element vectors.
            function d3_svg_lineDot4(a, b) {
                return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
            }
            // Matrix to transform basis (b-spline) control points to bezier
            // control points. Derived from FvD 11.2.8.
            var d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0], d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0], d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];
            // Pushes a "C" Bézier curve onto the specified path array, given the
            // two specified four-element arrays which define the control points.
            function lineBasisBezier(pathData, x, y) {
                var pointsForBezier = [];
                pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), d3_svg_lineDot4(d3_svg_lineBasisBezier1, y)]);
                pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), d3_svg_lineDot4(d3_svg_lineBasisBezier2, y)]);
                pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), d3_svg_lineDot4(d3_svg_lineBasisBezier3, y)]);
                pathData.push({ command: 'C', points: pointsForBezier });
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
            var pathData = [{ command: 'M', points: [firstPoint.x, firstPoint.y] }];
            var direction = [];
            if (firstPoint.attachmentDisplay) {
                var attachmentDisplay = firstPoint.attachmentDisplay;
                direction.push(attachmentDisplay.orientation[0]);
                direction.push(attachmentDisplay.orientation[1]);
            }
            else {
                // best guess
                var xDisplacement = lastPoint.x - firstPoint.x;
                var absXDisplacement = Math.abs(xDisplacement);
                var yDisplacement = lastPoint.y - firstPoint.y;
                var absYDisplacement = Math.abs(yDisplacement);
                if (absXDisplacement > absYDisplacement) {
                    direction = [0.5 * xDisplacement / absXDisplacement, 0];
                }
                else {
                    direction = [0, 0.5 * yDisplacement / absYDisplacement];
                }
                console.warn('No attachmentDisplay specified for edge "' + elementId + '"');
            }
            // for curves, I'm calculating and using the points representing the elbow vertices, from the given points (which represent the first point, any elbow segment mid-points and the last point).
            // I'm making sure the curve passes through the midpoint of the marker side that is furthest away from the node it is attached to
            // TODO this code might be confusing, because it involves redefining the points. Look at refactoring it for readability.
            var markerHeightFactor = 0.75;
            if (!!markerStart && firstPoint.attachmentDisplay && typeof (firstPoint.attachmentDisplay.orientation[0]) !== 'undefined' && typeof (firstPoint.attachmentDisplay.orientation[1]) !== 'undefined') {
                var firstPointWithOffset = {};
                var firstOffset;
                //var firstMarkerData = crossPlatformShapesInstance.presetShapes[markerStart].getDimensions(crossPlatformShapesInstance);
                var firstMarkerData = { x: 0, y: 0, markerWidth: 12, markerHeight: 12 };
                if (!!firstMarkerData) {
                    firstOffset = markerHeightFactor * firstMarkerData.markerHeight;
                }
                else {
                    firstOffset = 12;
                }
                firstPointWithOffset.x = firstPoint.attachmentDisplay.orientation[0] * firstOffset + firstPoint.x;
                firstPointWithOffset.y = firstPoint.attachmentDisplay.orientation[1] * firstOffset + firstPoint.y;
                pathData.push({ command: 'L', points: [firstPointWithOffset.x, firstPointWithOffset.y] });
                points[0] = firstPointWithOffset;
            }
            if (!!markerEnd && lastPoint.attachmentDisplay && typeof (lastPoint.attachmentDisplay.orientation[0]) !== 'undefined' && typeof (lastPoint.attachmentDisplay.orientation[1]) !== 'undefined') {
                lastSegment.push({ command: 'L', points: [lastPoint.x, lastPoint.y] });
                var lastPointWithOffset = {};
                var lastOffset;
                //var lastMarkerData = crossPlatformShapesInstance.presetShapes[markerEnd].getDimensions(crossPlatformShapesInstance);
                var lastMarkerData = { x: 0, y: 0, markerWidth: 12, markerHeight: 12 };
                if (!!lastMarkerData) {
                    lastOffset = markerHeightFactor * lastMarkerData.markerHeight;
                }
                else {
                    lastOffset = 12;
                }
                lastPointWithOffset.x = lastPoint.attachmentDisplay.orientation[0] * lastOffset + lastPoint.x;
                lastPointWithOffset.y = lastPoint.attachmentDisplay.orientation[1] * lastOffset + lastPoint.y;
                elbowPoints[elbowPointCount - 1] = lastPoint = lastPointWithOffset;
            }
            elbowPoints.forEach(function (elbowPoint, index) {
                var x0, y0, x1, y1;
                if (index > 0 && index < elbowPointCount) {
                    x0 = Math.abs(direction[0]) * (elbowPoints[index].x - elbowPoints[index - 1].x) + elbowPoints[index - 1].x;
                    y0 = Math.abs(direction[1]) * (elbowPoints[index].y - elbowPoints[index - 1].y) + elbowPoints[index - 1].y;
                    points.push({ x: x0, y: y0 });
                    direction = changeDirection(direction);
                }
            });
            points.push(lastPoint);
            var i = 1, n = points.length, pi = points[0], x0 = pi.x, y0 = pi.y, px = [x0, x0, x0, (pi = points[1]).x], py = [y0, y0, y0, pi.y];
            pathData.push({ command: 'L', points: [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)] });
            points.push(points[n - 1]);
            while (++i <= n) {
                pi = points[i];
                px.shift();
                px.push(pi.x);
                py.shift();
                py.push(pi.y);
                lineBasisBezier(pathData, px, py);
            }
            points.pop();
            pathData.push({ command: 'L', points: [pi.x, pi.y] });
            pathData = pathData.concat(lastSegment);
            return pathData;
        },
        // TODO
        getPointAtPosition: function (points, position) { return {}; },
    },
    ElbowLine: {
        getPathSegments: function (points, elementId) {
            function changeDirection(currentDirection) {
                var xDirection = Math.abs(Math.abs(currentDirection[0]) - 1);
                var yDirection = Math.abs(Math.abs(currentDirection[1]) - 1);
                return [xDirection, yDirection];
            }
            var pointCount = points.length;
            var firstPoint = points[0], lastPoint = points[pointCount - 1];
            var pathData = [{ command: 'M', points: [firstPoint.x, firstPoint.y] }];
            var direction = [];
            if (firstPoint.attachmentDisplay) {
                direction.push(firstPoint.attachmentDisplay.orientation[0]);
                direction.push(firstPoint.attachmentDisplay.orientation[1]);
            }
            else {
                // arbitrary
                direction = [1, 0];
                console.warn('No attachmentDisplay specified for edge "' + elementId + '"');
            }
            points.forEach(function (point, index) {
                if (index > 0 && index < pointCount) {
                    var x0 = Math.abs(direction[0]) * (points[index].x - points[index - 1].x) + points[index - 1].x, y0 = Math.abs(direction[1]) * (points[index].y - points[index - 1].y) + points[index - 1].y;
                    pathData.push({ command: 'L', points: [x0, y0] });
                    direction = changeDirection(direction);
                }
            });
            pathData.push({ command: 'L', points: [lastPoint.x, lastPoint.y] });
            return pathData;
        },
        // TODO
        getPointAtPosition: function (points, position) { return {}; },
    },
    SegmentedLine: {
        getPathSegments: function (points) {
            var firstPoint = points[0];
            var pathData = [{ command: 'M', points: [firstPoint.x, firstPoint.y] }];
            points.forEach(function (point, index) {
                if (index > 0) {
                    pathData.push({ command: 'L', points: [point.x, point.y] });
                }
            });
            return pathData;
        },
        // TODO
        getPointAtPosition: function (points, position) { return {}; },
    },
    StraightLine: {
        getPathSegments: function (points) {
            var firstPoint = points[0];
            var lastPoint = points[points.length - 1];
            var x0 = firstPoint.x;
            var y0 = firstPoint.y;
            var x1 = lastPoint.x;
            var y1 = lastPoint.y;
            return [{
                    command: 'M',
                    points: [x0, y0]
                }, {
                    command: 'L',
                    points: [x1, y1]
                }];
        },
        getPointAtPosition: function (points, position) {
            var firstPoint = points[0];
            var lastPoint = points[points.length - 1];
            var x0 = firstPoint.x;
            var y0 = firstPoint.y;
            var x1 = lastPoint.x;
            var y1 = lastPoint.y;
            var x = x0 + (x1 - x0) * position;
            var y = y0 + (y1 - y0) * position;
            return { x: x, y: y };
        },
    },
};
// TODO calculate these!
edgeDrawers.CurvedLine.getPointAtPosition = edgeDrawers.StraightLine.getPointAtPosition;
edgeDrawers.SegmentedLine.getPointAtPosition = edgeDrawers.SegmentedLine.getPointAtPosition;
edgeDrawers.ElbowLine.getPointAtPosition = edgeDrawers.ElbowLine.getPointAtPosition;
exports.default = edgeDrawers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRnZURyYXdlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL2NvbXBvbmVudHMvRWRnZURyYXdlcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxXQUFXLEdBQUc7SUFDbkIsVUFBVSxFQUFFO1FBQ1gsbUhBQW1IO1FBQ25ILDhJQUE4STtRQUM5SSxlQUFlLEVBQUUsVUFBUyxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTO1lBQ3ZFLDZEQUE2RDtZQUM3RCx5QkFBeUIsQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELENBQUM7WUFFRCxnRUFBZ0U7WUFDaEUsMkNBQTJDO1lBQzNDLElBQUksdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUM1Qyx1QkFBdUIsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0MscUVBQXFFO1lBQ3JFLHFFQUFxRTtZQUNyRSx5QkFBeUIsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLGVBQWUs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