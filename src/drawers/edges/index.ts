import {
  changeDirection,
  Direction,
  PathDataCommand,
  SVGPath,
  SVGPathData,
  SVGPathDataSettings,
  SVGPathSegment,
  SVGPointElement,
  ElbowLine,
  SegmentedLine,
  StraightLine
} from "kaavio/es5/drawers/edges/index";

// Returns the dot product of the given four-element vectors.
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
const d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0];
const d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0];
const d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function lineBasisBezier(pathData, x, y) {
  var pointsForBezier = [];
  pointsForBezier.push([
    d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
    d3_svg_lineDot4(d3_svg_lineBasisBezier1, y)
  ]);

  pointsForBezier.push([
    d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
    d3_svg_lineDot4(d3_svg_lineBasisBezier2, y)
  ]);

  pointsForBezier.push([
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, y)
  ]);

  pathData.push(new SVGPathSegment("C", pointsForBezier));
}

class CurvedLine extends SVGPath {
  constructor(points: SVGPointElement[], markerStart, markerEnd) {
    super(points, function getPathDataFromPoints(
      elbowPoints,
      markerStart,
      markerEnd
    ) {
      // modified from d3js: https://github.com/mbostock/d3/blob/ed54503fc7781d8bfe9e9fe125b76b9bbb5ac05c/src/svg/line.js
      // TODO this code is kind of hacky. it seems to work OK, but it's probably confusing and should be refactored for readability/maintainability.

      var elbowPointCount = elbowPoints.length;
      var firstPoint = elbowPoints[0];
      var lastPoint = elbowPoints[elbowPointCount - 1];
      var points = [];
      points.push(firstPoint);

      var lastSegment = [];
      var pathData = [new SVGPathSegment("M", [firstPoint.x, firstPoint.y])];

      var direction = ([] as unknown) as Direction;
      if (firstPoint.orientation) {
        const orientation = firstPoint.orientation;
        direction.push(orientation[0]);
        direction.push(orientation[1]);
      } else {
        console.error("points");
        console.error(points);
        throw new Error(
          "No orientation specified for curvedline edge w/ points logged above"
        );
      }

      // for curves, I'm calculating and using the points representing the elbow vertices, from the given points (which represent the first point, any elbow segment mid-points and the last point).
      // I'm making sure the curve passes through the midpoint of the marker side that is furthest away from the node it is attached to
      // TODO this code might be confusing, because it involves redefining the points. Look at refactoring it for readability.
      var markerHeightFactor = 0.75;
      if (
        !!markerStart &&
        firstPoint.orientation &&
        typeof firstPoint.orientation[0] !== "undefined" &&
        typeof firstPoint.orientation[1] !== "undefined"
      ) {
        var firstPointWithOffset: any = {};
        var firstOffset;
        var firstMarkerData = { x: 0, y: 0, markerWidth: 12, markerHeight: 12 };
        if (!!firstMarkerData) {
          firstOffset = markerHeightFactor * firstMarkerData.markerHeight;
        } else {
          firstOffset = 12;
        }
        firstPointWithOffset.x =
          firstPoint.orientation[0] * firstOffset + firstPoint.x;
        firstPointWithOffset.y =
          firstPoint.orientation[1] * firstOffset + firstPoint.y;
        pathData.push(
          new SVGPathSegment("L", [
            firstPointWithOffset.x,
            firstPointWithOffset.y
          ])
        );
        points[0] = firstPointWithOffset;
      }

      if (
        !!markerEnd &&
        lastPoint.orientation &&
        typeof lastPoint.orientation[0] !== "undefined" &&
        typeof lastPoint.orientation[1] !== "undefined"
      ) {
        lastSegment.push(new SVGPathSegment("L", [lastPoint.x, lastPoint.y]));

        var lastPointWithOffset: any = {};
        var lastOffset;
        var lastMarkerData = { x: 0, y: 0, markerWidth: 12, markerHeight: 12 };
        if (!!lastMarkerData) {
          lastOffset = markerHeightFactor * lastMarkerData.markerHeight;
        } else {
          lastOffset = 12;
        }
        lastPointWithOffset.x =
          lastPoint.orientation[0] * lastOffset + lastPoint.x;
        lastPointWithOffset.y =
          lastPoint.orientation[1] * lastOffset + lastPoint.y;
        elbowPoints[elbowPointCount - 1] = lastPoint = lastPointWithOffset;
      }

      elbowPoints.forEach(function(elbowPoint, index) {
        var x0, y0, x1, y1;
        if (index > 0 && index < elbowPointCount) {
          x0 =
            Math.abs(direction[0]) *
              (elbowPoints[index].x - elbowPoints[index - 1].x) +
            elbowPoints[index - 1].x;
          y0 =
            Math.abs(direction[1]) *
              (elbowPoints[index].y - elbowPoints[index - 1].y) +
            elbowPoints[index - 1].y;
          points.push({ x: x0, y: y0 });
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
      pathData.push(
        new SVGPathSegment("L", [
          d3_svg_lineDot4(d3_svg_lineBasisBezier3, px),
          d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
        ])
      );
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
      pathData.push(new SVGPathSegment("L", [pi.x, pi.y]));
      pathData = pathData.concat(lastSegment);
      return pathData;
    });
    this.pathData = this.getPathDataFromPoints(points, markerStart, markerEnd);
    this.d = this.getPathStringFromPathData(this.pathData);
  }
}

export { ElbowLine, SegmentedLine, StraightLine, CurvedLine };
