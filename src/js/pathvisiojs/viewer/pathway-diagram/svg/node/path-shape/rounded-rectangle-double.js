pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangleDouble = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
    var attributes = [
      {
        name:'d',
        path:
          'm6,13c0,-3.80365 3.19635,-7 7,-7l'
        + (nodeWidth - 26)
        + ',0c3.80365,0 7,3.19635 7,7l0,'
        + (nodeHeight - 26)
        + 'c0,3.80365 -3.19635,7 -7,7l'
        + (26 - nodeWidth)
        + ',0c-3.80365,0 -7,-3.19635 -7,-7l0,'
        + (26 - nodeHeight)
        + 'z'
      },
      {
        name:'d',
        path: 'm0,10c0,-5.43379 4.56621,-10 10,-10l'
        + (nodeWidth - 20)
        + ',0c5.43379,0 10,4.56621 10,10l0,'
        + (nodeHeight - 20)
        + 'c0,5.43379 -4.56621,10 -10,10l'
        + (20 - nodeWidth)
        + ',0c-5.43379,0 -10,-4.56621 -10,-10l0,'
        + (20 - nodeHeight)
        + 'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
