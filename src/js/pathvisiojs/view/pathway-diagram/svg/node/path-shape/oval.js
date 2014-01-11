pathvisiojs.view.pathwayDiagram.svg.node.pathShape.oval = function(){

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
	  parent:'scale', //adds transform and stroke-width attrs to parent g container
          path: 'm0,50c0,-27.62431 22.37569,-50 50,-50c27.62431,0 50,22.37569 50,50c0,27.62431 -22.37569,50 -50,50c-27.62431,0 -50,-22.37569 -50,-50z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
