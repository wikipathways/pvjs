crossPlatformShapes.pathCalculator.arrow = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  var pathData = [{ command: 'moveTo', points: [(x), y] },
    { command: 'lineTo', points: [x + width, (y + height/2)]},
    { command: 'lineTo', points: [(x), (y + height)] },
    { command: 'closePath', points: [] }];

  return pathData;
};
