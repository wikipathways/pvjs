pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        path: 'm0,10' +
          'c0,-5.43379 4.56621,-10 10,-10' +
          'l' + (width - 20) + ',0' +
          'c5.43379,0 10,4.56621 10,10' +
          'l0,' + (height - 20) +
          'c0,5.43379 -4.56621,10 -10,10' +
          'l' + (20 - width) + ',0' +
          'c-5.43379,0 -10,-4.56621 -10,-10' +
          'l0,' + (20 - height) +
          'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
