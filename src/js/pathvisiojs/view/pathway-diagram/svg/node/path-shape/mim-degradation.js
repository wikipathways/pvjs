pathvisiojs.view.pathwayDiagram.svg.node.pathShape.mimDegradation = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm8,50c0,-23.20442 18.79558,-42 42,-42c23.20442,0 42,18.79558 42,42c0,23.20442 -18.79558,42 -42,42c-23.20442,0 -42,-18.79558 -42,-42z'
        },
	{
	  name:'d',
	  path:'m1,1l99,99'
	}
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
