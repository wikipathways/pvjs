pathvisio.renderer.svg.node.shape = function(){
  function getElementType(shapeType, scalableShapesList) {
    if (scalableShapesList.indexOf(shapeType) > -1) {
      elementType = 'use';
    }
    else {
      elementType = 'path';
    }
    return elementType;
  }

  function render(nodes, pathway, scalableShapesList) {
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

    pathvisio.renderer.svg.node.shape.scalable.render(nodes, pathway, scalableShapesList);

    // this doesn't work yet
    //pathvisio.renderer.svg.node.shape.nonscalable.render(nodes, pathway, scalableShapesList);

    /*
    // or do it all here with functions for specifying element type, etc. (This doesn't work yet below.)
    if (!nodes || !pathway || !scalableShapesList) {
      console.log(scalableShapesList);
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
      var elementType = getElementType(d.shapeType, scalableShapesList);
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
