pathvisiojs.view.pathwayDiagram.svg.node.pathShape.none = function(){

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: ''
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
