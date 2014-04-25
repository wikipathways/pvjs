crossPlatformShapes.pathCalculator.pentagon = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;
   
  var pathData = [{command: 'moveTo', points: [x, (y + 0.81*height)]},
    {command: 'lineTo', points: [x, (y+ 0.19*height)]},
    {command: 'lineTo', points: [(x+ 0.62*width), y]},
    {command: 'lineTo', points: [(x+ width), (y+ 0.5*height)]},
    {command: 'lineTo', points: [(x+ 0.62*width), (y + height)]},
    {command: 'closePath', points: []}];

  return pathData;
};
