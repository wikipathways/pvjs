pathvisiojs.view.pathwayDiagram.svg.node.pathShape.ovalDouble = function(){
  'use strict';

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
    var outerEllipse = drawEllipse(x, y, width, height);
    var innerEllipse = drawEllipse(x + 3, y + 3, width - 3, height - 3);

    /*
m74.23027,549.04834
c0,-37.56906 22.37569,-68 50,-68
c27.62431,0 50,30.43094 50,68
c0,37.56903 -22.37569,68 -50,68
c-27.62431,0 -50,-30.43097 -50,-68
z
//*/

    var attributes = [
      {
        name:'d',
        path:outerEllipse + ' ' + innerEllipse
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
