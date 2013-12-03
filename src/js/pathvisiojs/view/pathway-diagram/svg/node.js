pathvisiojs.view.pathwayDiagram.svg.node = function(){
  function render(parent, data, allSymbolNames) {
    var shapeType = strcase.camelCase(data.ShapeType);
    if (allSymbolNames.indexOf(shapeType) > -1) {
      console.log('We will use an SVG "use" element to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.useElement.render(parent, data);
    }
    else {
      console.log('We will use a pathShape to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.pathShape.render(parent, data);
    }



    /*
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
    //*/
  }

  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      console.log(allSymbolNames);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!allSymbolNames) {
        console.log('allSymbolNames not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or allSymbolNames.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return allSymbolNames.indexOf(d.shapeType) === -1; });

    // Update… 
    var nodes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    nodes.enter().append("path")
    .call(render);

    // Exit…
    nodes.exit().remove();

  }

  return {
    renderAll:renderAll,
    render:render
  };
}();
