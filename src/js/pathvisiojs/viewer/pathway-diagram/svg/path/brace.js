pathvisiojs.view.pathwayDiagram.svg.node.pathShape.brace = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        path: 'm1.5,98.5c0,-32.50001 8.16667,-48.75 24.5,-48.75s24.5,-16.25001 24.5,-48.75c0,32.49999 8.16666,48.75 24.49999,48.75s24.5,16.24999 24.5,48.75'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
