crossPlatformShapes.pathCalculator.complex = function(data){
  'use strict';

    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var pathData = [{command: 'moveTo', points: [(x + 18), y]},
        {command: 'lineTo', points: [(x + width - 18), y] },
        {command: 'lineTo', points: [(x + width), (y + 18)] },
        {command: 'lineTo', points: [(x + width), (y + height - 18)] },
        {command: 'lineTo', points: [(x + width - 18), (y + height)] },
        {command: 'lineTo', points: [(x + 18), (y + height)] },
        {command: 'lineTo', points: [(x), (y + height - 18)] },
        {command: 'lineTo', points: [(x), (y + 18)] },
        {command: 'closePath', points: []}];
  return pathData;
};
