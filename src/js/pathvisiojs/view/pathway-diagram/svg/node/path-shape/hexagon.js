pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hexagon = function(){

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
	  parent:'scale', //adds transform and stroke-width attrs to parent g container
          path: 'm1.42004,50.99635l21.07262,-42.13943l56.19152,0l21.0667,42.13943l-21.0667,42.14507l-56.19152,0l-21.07262,-42.14507z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
