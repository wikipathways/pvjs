"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = edgeDrawers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRnZURyYXdlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFZGdlRHJhd2Vycy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sV0FBVyxHQUFHO0lBQ25CLFVBQVUsRUFBRTtRQUNYLG1IQUFtSDtRQUNuSCw4SUFBOEk7UUFDOUksZUFBZSxFQUFFLFVBQVMsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUztZQUN2RSw2REFBNkQ7WUFDN0QseUJBQXlCLENBQUMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDO1lBRUQsZ0VBQWdFO1lBQ2hFLDJDQUEyQztZQUMzQyxJQUFJLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDNUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUMxQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9DLHFFQUFxRTtZQUNyRSxxRUFBcUU7WUFDckUseUJBQXlCLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO2dCQUN6QixlQUFlLENBQUMs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