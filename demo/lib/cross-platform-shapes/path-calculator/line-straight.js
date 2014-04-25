crossPlatformShapes.pathCalculator.lineStraight = function(data){
  'use strict';

  var x0 = data.points[0].x,
    y0 = data.points[0].y,
    x1 = data.points[1].x,
    y1 = data.points[1].y;

  var pathData = [{command: 'moveTo', points: [x0, y0]},
    {command: 'lineTo', points: [x1, y1]}];

  return pathData;
};
