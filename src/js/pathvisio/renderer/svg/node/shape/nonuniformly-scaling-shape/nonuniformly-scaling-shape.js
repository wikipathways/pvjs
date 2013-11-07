pathvisio.renderer.svg.node.shape.nonuniformlyScalingShape = function(){
  function render(nonuniformlyScalingShape) {

    // TODO this seems like a hack. How can the code be refactored so this line below is not needed?

    if (!nonuniformlyScalingShape[0] || nonuniformlyScalingShape[0].length < 1) {return 'nonuniformlyScalingNodes empty'};
    self.nonuniformlyScalingShape = nonuniformlyScalingShape;
    nonuniformlyScalingShape.attr("id", function (d) {return 'shape-' + d.id;})
    .attr("class", function (d) {
      var styleClass = '';
      if (d.elementType === 'data-node') {
        styleClass = 'shape ' + d.dataNodeType + ' ' + d.shapeType;
      }
      else {
        styleClass = 'shape ' + d.shapeType;
      }
      return styleClass;
    })

    // TODO there must be a cleaner, less brittle way of getting nodeData here

    var nodeData = nonuniformlyScalingShape[0].parentNode.__data__;
    var shapeType = caseConverter.camelCase(nodeData.shapeType);
    var nonuniformlyScalingShapeAttributes = pathvisio.renderer.svg.node.shape.nonuniformlyScalingShape[shapeType].getAttributes(nodeData.width, nodeData.height);
    nonuniformlyScalingShapeAttributes.forEach(function(attribute) {
      nonuniformlyScalingShape.attr(attribute.name, attribute.value)
    });
  }

  function renderAll(nodes, pathway, uniformlyScalingShapesList) {
    if (!nodes || !pathway || !uniformlyScalingShapesList) {
      console.log(uniformlyScalingShapesList);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!uniformlyScalingShapesList) {
        console.log('uniformlyScalingShapesList not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or uniformlyScalingShapesList.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return uniformlyScalingShapesList.indexOf(d.shapeType) === -1; });

    // Update… 
    var nonuniformlyScalingShapes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    nonuniformlyScalingShapes.enter().append("path")
    .call(render);

    // Exit…
    nonuniformlyScalingShapes.exit().remove();

  }

  return {
    renderAll:renderAll
  };
}();
