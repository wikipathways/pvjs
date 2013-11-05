pathvisio.renderer.svg.node.shape.nonscalable = function(){
  function render(nodes, pathway, scalableShapesList) {
    if (!nodes || !pathway || !scalableShapesList) {
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!scalableShapesList) {
        console.log('scalableShapesList not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or scalableShapesList.');
    }

    // Update… 
    var nonscalableShapes = nodes.selectAll("path.shape")
    .data(function(d) { return d.filter(function(element) {
      return scalableShapesList.indexOf(element.shapeType) === -1; })
    })
    .attr('class', 'shape');

    // Enter…
    nonscalableShapes.enter().append("path")
    .attr('class', 'shape');

    // Exit…
    nonscalableShapes.exit().remove();
  }


  return {
    render:render
  };
}();
