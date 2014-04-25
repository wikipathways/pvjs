crossPlatformShapes.pathCalculator.ellipseDouble = function(data){
  'use strict';

  var outerEllipse = crossPlatformShapes.pathCalculator.ellipse(data);

  var innerEllipseData = data;
  var doubleLineGap = 2 * data.borderWidth || 6;
  innerEllipseData.x = data.x + doubleLineGap;
  innerEllipseData.y = data.y + doubleLineGap;
  innerEllipseData.width = data.width - 2*doubleLineGap;
  innerEllipseData.height = data.height - 2*doubleLineGap;
  var innerEllipse = crossPlatformShapes.pathCalculator.ellipse(innerEllipseData);

  var pathData = outerEllipse.concat(innerEllipse);
  return pathData;
};
