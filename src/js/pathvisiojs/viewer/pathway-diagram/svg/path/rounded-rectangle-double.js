pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangleDouble = function(){
  'use strict';

  function drawRoundedRectangle(x, y, width, height) {
  }

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
      /*
    var outerRoundedRectangle = drawRoundedRectangle(x, y, width, height);
    var innerRoundedRectangle = drawRoundedRectangle(x + 3, y + 3, width - 3, height - 3);
    //*/
    var attributes = [
      {
        name:'d',
        path:
          'm6,13' +
          'c0,-3.80365 3.19635,-7 7,-7' +
          'l' + (width - 26) + ',0' +
          'c3.80365,0 7,3.19635 7,7' +
          'l0,' + (height - 26) +
          'c0,3.80365 -3.19635,7 -7,7' +
          'l' + (26 - width) + ',0' +
          'c-3.80365,0 -7,-3.19635 -7,-7' +
          'l0,' + (26 - height) +
          'z'
      },
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
