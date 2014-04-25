crossPlatformShapes.pathCalculator.lineElbow = function(data){
  'use strict';

  //for generating line segments through a path of points (pathpoints, not waypoints)
  var svgLine = d3.svg.line()
  .x(function(d) {return d.x;})
  .y(function(d) {return d.y;})
  .interpolate("linear");

  var pathData = svgLine(data.points);

  return pathData;
};

