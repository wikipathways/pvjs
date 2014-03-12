pathvisiojs.view.pathwayDiagram.svg.node.pathShape.oval = function(){
  'use strict';

  // TODO don't repeat this with the def in ovalDouble
  function drawEllipse(x, y, width, height) {
    var width_over_2 = width / 2,
      width_two_thirds = width * 2 / 3,
      height_over_2 = height / 2;
    var pathData = 'm ' + x + ' ' + (y - height_over_2) + ' ' +
    'c ' + (x + width_two_thirds) + ' ' + (y - height_over_2) + ' ' + (x + width_two_thirds) + ' ' + (y + height_over_2) + ' ' + (x) + ' ' + (y + height_over_2) +
    'c ' + (x - width_two_thirds) +  ' ' + (y + height_over_2) +  ' ' + (x - width_two_thirds) +  ' ' + (y - height_over_2) + ' ' + (x) +  ' ' + (y - height_over_2) +
    'z';
  }

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var path = drawEllipse(x, y, width, height);
    var attributes = [
      {
        name:'d',
        path:path
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
