crossPlatformShapes.pathCalculator.tBar = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  var pathData = [{command: 'moveTo', points: [x, y]},
    {command: 'lineTo', points: [(x), (y + height)]}];

  return pathData;
};
