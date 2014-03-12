pathvisiojs.view.pathwayDiagram.svg.node.pathShape.arc = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        path: 'm99.5,50c0,27.338341 -22.162117,49.5 -49.5,49.5s-49.5,-22.161659 -49.5,-49.5'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
