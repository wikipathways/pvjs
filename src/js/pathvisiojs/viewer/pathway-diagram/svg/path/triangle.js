pathvisiojs.view.pathwayDiagram.svg.path.triangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'M' + x + ',' + y +
          'L' + (x + width) + ',' + (y + height/2) +
          'L' + x + ',' + (y + height) +
          'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
