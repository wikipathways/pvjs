pathvisiojs.view.pathwayDiagram.svg.node.pathShape.ovalDouble = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:['ry','rx','cy','cx'],
	  alt:'ellipse',
          path:[nodeHeight/2,nodeWidth/2,nodeHeight/2,nodeWidth/2] 
	},
        {
          name:['ry','rx','cy','cx'],
          alt:'ellipse',
          path:[nodeHeight/2-6,nodeWidth/2-6,nodeHeight/2,nodeWidth/2]
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
