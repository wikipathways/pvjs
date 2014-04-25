crossPlatformShapes.pathCalculator.ellipse = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;
  var cx = x + width/2;
  var cy = y + height/2;
  var width_over_2 = width / 2,
    width_two_thirds = width * 2 / 3,
    height_over_2 = height / 2;

  var pathData = [{command: 'moveTo', points: [cx, (cy - height_over_2)]},
    {command: 'bezierCurveTo', points: [(cx + width_two_thirds), (cy - height_over_2), (cx + width_two_thirds), (cy + height_over_2), (cx), (cy + height_over_2)]},
    {command: 'bezierCurveTo', points: [(cx - width_two_thirds), (cy + height_over_2), (cx - width_two_thirds), (cy - height_over_2), (cx), (cy - height_over_2)]}];
  return pathData;
};
