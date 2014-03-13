pathvisiojs.view.pathwayDiagram.svg.path.rectangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var path = 'M ' + x + ' ' + y +
      'L' + (x + width) + ' ' + y +
      'L' + (x + width) + ' ' + (y + height) +
      'L' + (x) + ' ' + (y + height) +
      'Z';

    var attributes = [
      {
        name:'d',
        path: path
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
