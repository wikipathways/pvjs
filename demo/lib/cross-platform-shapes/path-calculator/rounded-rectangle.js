crossPlatformShapes.pathCalculator.roundedRectangle = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  var pathData = [{command: 'moveTo', points: [x, (y + 10)]}, // start at upper left corner, just before curve
        {command: 'bezierCurveTo', points: [x, (y + 10 - 5.43379), (x + 4.56621), (y), (x + 10), (y)]},
        {command: 'lineTo', points: [(x + width - 10), (y)]}, // move to the upper right corner, just before curve
        {command: 'bezierCurveTo', points: [(x + width - 10 + 5.43379), (y), (x + width), (y + 4.56621), (x + width), (y + 10)]},
        {command: 'lineTo', points: [(x + width), (y + height - 10)]}, // move to the lower right corner, just before curve
        {command: 'bezierCurveTo', points: [(x + width), (y + height - 10 + 5.43379), (x + width - 4.56621), (y + height), (x + width - 10), (y + height)]},
        {command: 'lineTo', points: [(x + 10), (y + height)]}, // move to the lower left corner, just before curve
        {command: 'bezierCurveTo', points: [(x + 10 - 5.43379), (y + height), (x), (y + height - 4.56621), (x), (y + height - 10)]},
        {command: 'closePath', points: []}];
  return pathData;
};
