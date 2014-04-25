crossPlatformShapes.pathCalculator.brace = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;
  
  var pathData = [{command: 'moveTo', points: [x, (y + height)]},
    {command: 'bezierCurveTo', points: [(x), (y), (x + width/2), (y + height), (x + width/2), (y)]},
    {command: 'bezierCurveTo', points: [(x + width/2), (y + height), (x + width), (y), (x + width), (y + height)]}];

  return pathData;
};
