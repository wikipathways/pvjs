crossPlatformShapes.pathCalculator.mimDegradation = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  var ellipse = crossPlatformShapes.pathCalculator.ellipse(data);
  var line = [{command: 'moveTo', points: [x, y]},
    {command: 'lineTo', points: [(x + width), (y + height)]}];
  var pathData = ellipse.concat(line);

  return pathData;
};
