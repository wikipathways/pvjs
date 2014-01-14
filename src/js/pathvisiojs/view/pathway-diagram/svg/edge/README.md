# How Path Finding Works

GPML gives a set of GPML Points for each edge (GPML Interactions and GraphicalLines). These edges can be of LineType Straight, Segmented, Elbow or Curved.

For Straight, there will always be two GPML Points. For Segmented, there will always be one more GPML Point than there are line segments. For Elbow and Curved, there will be two GPML Points if the user only specified the start and end points. In this case, path finding is needed to fill in the points required to make the edge not cross its source and target nodes, if they exist. If the user specified a point other than the start and end points, that point will be included in the set of GPML Points and path finding is not used, because we can just use the user specified point(s). These additional GPML Point(s) will be specified as the midpoints (I believe the Java term is waypoints) of their respective horizontal or perpendicular line segments.

The pathfinding algorithm for the Elbows and Curves with only two GPML Points specified can be our own or it can be an available open-source library like [PathFinding.js](https://github.com/qiao/PathFinding.js/). The problem with Pathfinding.js is that it is overkill for our needs, because it is too CPU intensive and intended for more complex path finding than our simple elbows.

If GPML Points are specified for an edge that is snapped to a node, these Points should be understood to be cached, because the actual start and end points will be controlled by the location of the node. Using the cached points will reduce the calculations required to initially render a pathway. The cached points, however, need to be updated if the associated node(s) move. If the node is an Anchor on an edge, this calculation can require the calculation of multiple other edge start and end points. For example, an edge snapped to an anchor on a second edge which is in turn snapped to an anchor on a third edge would require calculating the start and end points for the second and third edges before it would be possible to calculate for the given edge. This calculation could involve using the SVG path length functions:

```JS
var path = d3.select('path')[0][0]; //Use the CSS selector appropriate for finding the path of interest
var totalLength = path.getTotalLength();
var point = path.getPointAtLength(0.4 * totalLength); //Finds the SVGPoint that is 40% of the distance along "path" from start point heading toward end point
```

[D3 Path Data Generators](https://github.com/mbostock/d3/wiki/SVG-Shapes#path-data-generators) can help with the construction of these paths. For example, "line.interpolate('step')" could be used for Elbows. Note that the generator expects a start point, an end point and a point for every change in direction of an Elbow, whereas GPML gives a start point and an end point and sometimes gives a waypoint, which is the midpoint of Elbow segments that are not the first and last segments.

For more information on D3 and paths, [dashing d3js](https://www.dashingd3js.com/svg-paths-and-d3js) has some good info.
