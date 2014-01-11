pathvisiojs.view.pathwayDiagram.svg.node.pathShape.arc = function(){

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
	  parent:'scale', //adds transform and stroke-width attrs to parent g container
          path: 'm99.5,50c0,27.338341 -22.162117,49.5 -49.5,49.5s-49.5,-22.161659 -49.5,-49.5'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
