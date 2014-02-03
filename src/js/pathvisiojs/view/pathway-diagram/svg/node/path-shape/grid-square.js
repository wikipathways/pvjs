pathvisiojs.view.pathwayDiagram.svg.node.pathShape.gridSquare = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
	  scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm1,1l99,0l0,99l-99,0l0,-99z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
