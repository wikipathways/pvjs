pathvisiojs.view.pathwayDiagram.svg.node.pathShape.triangle = function(){

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,'+nodeHeight+'l0,-'+nodeHeight+'l'+nodeWidth+','+nodeHeight/2+'l-'+nodeWidth+','+nodeHeight/2+'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
