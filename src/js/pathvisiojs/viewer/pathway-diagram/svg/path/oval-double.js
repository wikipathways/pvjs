pathvisiojs.view.pathwayDiagram.svg.path.ovalDouble = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height,
      doubleLineGap = 2 * data.strokeWidth || 6;
    var cx = x + width/2;
    var cy = y + height/2;
    var outerEllipse = pathvisiojs.view.pathwayDiagram.svg.path.oval.drawEllipse(cx, cy, width, height);
    var innerEllipse = pathvisiojs.view.pathwayDiagram.svg.path.oval.drawEllipse(cx, cy, width - 2*doubleLineGap, height - 2*doubleLineGap);

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
