pathvisiojs.view.pathwayDiagram.svg.node.entityNode = function(){
  function render(viewport, entityNodeData, allSymbolNames) {
    console.log('entityNodeData');
    console.log(entityNodeData);
    if (!viewport) {
      throw new Error('Error: Missing viewport.');
    }
    if (!entityNodeData) {
      throw new Error('Error: Group data missing.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(viewport, entityNodeData, allSymbolNames, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        return 'entity-node ' + strcase.paramCase(d.ShapeType);
      })
    });
  }
 
  return {
    render:render
  };
}();
