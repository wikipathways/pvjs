crossPlatformShapes.pathCalculator.arc = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  var yControlPoint = height * (2/3);

  var pathData = [{command: 'moveTo', points: [x, y]},
    {command: 'bezierCurveTo', points: [(x), (y + yControlPoint), (x + width), (y + yControlPoint), (x + width), (y)]}];

  return pathData;
};
