pathvisiojs.view.pathwayDiagram.svg.node.pathShape.rectangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var path = 'M ' + x + ' ' + y +
      'L' + width + ' ' + y +
      'L' + width + ' ' + height +
      'L' + x + ' ' + height +
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
