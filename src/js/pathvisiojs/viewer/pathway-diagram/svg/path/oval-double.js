pathvisiojs.view.pathwayDiagram.svg.path.ovalDouble = function(){
  'use strict';

  function drawEllipse(x, y, width, height) {
    var width_over_2 = width / 2,
      width_two_thirds = width * 2 / 3,
      height_over_2 = height / 2;
    var pathData = 'M ' + x + ' ' + (y - height_over_2) + ' ' +
      'C ' + (x + width_two_thirds) + ' ' + (y - height_over_2) + ' ' + (x + width_two_thirds) + ' ' + (y + height_over_2) + ' ' + (x) + ' ' + (y + height_over_2) +
      'C ' + (x - width_two_thirds) +  ' ' + (y + height_over_2) +  ' ' + (x - width_two_thirds) +  ' ' + (y - height_over_2) + ' ' + (x) +  ' ' + (y - height_over_2);
    return pathData;
  }

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var cx = x + width/2;
    var cy = y + height/2;
    var outerEllipse = drawEllipse(cx, cy, width, height);
    var doubleLineGap = 3;
    var innerEllipse = drawEllipse(cx, cy, width - 2*doubleLineGap, height - 2*doubleLineGap);

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
