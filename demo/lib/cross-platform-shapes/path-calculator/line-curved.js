crossPlatformShapes.pathCalculator.lineCurved = function(data){
  'use strict';

  //for generating bezier curves through a path of points (pathpoints, not waypoints)
  var svgCurve = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  //.interpolate("cardinal");
  .interpolate("basis");

  var pathData = svgCurve(data.points);

  return pathData;
};
