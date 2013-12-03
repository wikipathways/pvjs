pathvisiojs.view.pathwayDiagram.svg.entityNode = function(){
  function render(viewport, entityNodeData, allSymbolNames) {
    console.log('entityNodeData');
    console.log(entityNodeData);
    if (!viewport) {
      throw new Error('Error: Missing viewport.');
    }
    if (!entityNodeData) {
      throw new Error('Error: Group data missing.');
    }

    pathvisiojs.view.pathwayDiagram.svg.nodeContainer.render(viewport, entityNodeData, allSymbolNames);
    /*
    var entityNodeContainer = viewport.selectAll('#node-container-' + strcase.paramCase(entityNodeData['@id']))
    .data([entityNodeData])
    .enter()
    .append("g")
    .attr("class", function (d) {
      return 'entity-node ' + strcase.paramCase(d.ShapeType);
    })
    .call()

    var entityNodeShape = entityNodeContainer.append("path")
    .data([entityNodeData])
    .attr("class", function (d) {
      return 'entity-node shape ' + strcase.paramCase(d.ShapeType);
    })
    .call(function() {
      pathvisiojs.view.pathwayDiagram.svg.node.render(this, allSymbolNames)
    })
    //*/
  }
 
  return {
    render:render
  };
}();
