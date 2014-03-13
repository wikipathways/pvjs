pathvisiojs.view.pathwayDiagram.svg.path.lineStraight = function(){
  'use strict';

  function getAttributes(data) {
    var x0 = data.points[0].x,
      y0 = data.points[0].y,
      x1 = data.points[1].x,
      y1 = data.points[1].y;
    var attributes = [
      {
        name:'d',
        path: 'M' + x0 + ',' + y0 + ' L' + x1 + ',' + y1
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
