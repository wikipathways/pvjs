pathvisiojs.view.pathwayDiagram.svg.node.pathShape.gridSquare = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        path: 'm1,1l99,0l0,99l-99,0l0,-99z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
