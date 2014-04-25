crossPlatformShapes.pathCalculator.roundedRectangleDouble = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height,
    borderWidth = data.borderWidth;

  var outerRoundedRectangle = crossPlatformShapes.pathCalculator.roundedRectangle(data);

  var innerRoundedRectangleData = data;
  var doubleLineGap = 2 * borderWidth || 6;
  innerRoundedRectangleData.x = x + doubleLineGap;
  innerRoundedRectangleData.y = y + doubleLineGap;
  innerRoundedRectangleData.width = width - 2*doubleLineGap;
  innerRoundedRectangleData.height = height - 2*doubleLineGap;
  var innerRoundedRectangle = crossPlatformShapes.pathCalculator.roundedRectangle(innerRoundedRectangleData);
  var pathData = outerRoundedRectangle.concat(innerRoundedRectangle);

  return pathData;
};
