pathvisiojs.view.pathwayDiagram.svg.node = function(){
  function render(node, allSymbolNames) {

    // TODO this seems like a hack. How can the code be refactored so this line below is not needed?

    if (!node[0] || node[0].length < 1) {return 'nonuniformlyScalingNodes empty'};

    self.node = node;
    node.attr("id", function (d) {return 'node-' + strcase.paramCase(d['@id']);})
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

    // TODO there must be a cleaner, less brittle way of getting nodeData here

    var nodeData = node[0][0].__data__;
    var shapeType = strcase.camelCase(nodeData.ShapeType);
    if (allSymbolNames.indexOf(shapeType) > -1) {
      console.log('We will use an SVG "use" element to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.useElement.render(node);
    }
    else {
      console.log('We will use a pathShape to render this ' + shapeType);
      var nodeAttributes = pathvisiojs.view.pathwayDiagram.svg.pathShape[shapeType].getAttributes(nodeData.Width, nodeData.Height);
      nodeAttributes.forEach(function(attribute) {
        node.attr(attribute.name, attribute.value)
      });
    }
    //*
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
