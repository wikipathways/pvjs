pathvisio.renderer.svg.node.shape = function(){
  function getElementType(shapeType, uniformlyScalingShapesList) {
    if (uniformlyScalingShapesList.indexOf(shapeType) > -1) {
      elementType = 'use';
    }
    else {
      elementType = 'path';
    }
    return elementType;
  }

  function render(nodes, pathway, uniformlyScalingShapesList) {
    if (!nodes || !pathway) {
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes or pathway.');
    }


    //not sure whether to break this up into separate classes like immediately below

    pathvisio.renderer.svg.node.shape.uniformlyScalingShape.renderAll(nodes, pathway, uniformlyScalingShapesList);
    pathvisio.renderer.svg.node.shape.nonuniformlyScalingShape.renderAll(nodes, pathway, uniformlyScalingShapesList);

    /*
    // or do it all here with functions for specifying element type, etc. (This doesn't work yet below.)
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

    // Update… 
    var shapes = nodes.selectAll(".shape")
    .data([function(d) {
      console.log('d inside here');
      console.log(d);
      return d;
    }])
    .attr('class', 'shape')

    // Enter…
    //shapes.enter().append('path')
    shapes.enter().append(function(d) {
      var elementType = getElementType(d.shapeType, uniformlyScalingShapesList);
      console.log('elementType');
      console.log(elementType);
      return elementType;
    })
    .attr('class', 'shape');

    // Exit…
    shapes.exit().remove();

//*/

  }

  return {
    render:render
  };
}();
