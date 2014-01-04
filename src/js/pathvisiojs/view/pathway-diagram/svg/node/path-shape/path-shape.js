pathvisiojs.view.pathwayDiagram.svg.node.pathShape = function(){
  function render(parent, data) {
    var node = parent.append("path")
    .data([data])
    .attr("id", function (d) {return 'node-' + strcase.paramCase(d['@id']);})
    .attr("class", function (d) {
      var cssClass = 'symbol ';
      return cssClass;
    })

    var re;
    var pathShapeNameToUse = strcase.camelCase(data.ShapeType);
    if (!pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
      re = /-double$/gi;
      pathShapeNameToUse = pathShapeNameToUse.replace(re, '');
      if (pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
      }
      else {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available. Using pathShape "rounded-rectangle" instead');
        pathShapeNameToUse = 'roundedRectangle';
      }
    }

    var nodeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.pathShape[pathShapeNameToUse].getAttributes(data.width, data.height);
    nodeAttributes.forEach(function(attribute) {
      node.attr(attribute.name, attribute.value)
    });
  }

  /*
  function render(pathShape) {

    // TODO this seems like a hack. How can the code be refactored so this line below is not needed?

    if (!pathShape[0] || pathShape[0].length < 1) {return 'nonuniformlyScalingNodes empty'};
    self.pathShape = pathShape;
    pathShape.attr("id", function (d) {return 'shape-' + d.id;})
    .attr("class", function (d) {
      var cssClass = '';
      if (d.elementType === 'data-node') {
        cssClass = 'shape ' + d.dataNodeType + ' ' + d.shapeType;
      }
      else {
        cssClass = 'shape ' + d.shapeType;
      }
      return cssClass;
    })

    // TODO there must be a cleaner, less brittle way of getting nodeData here

    var nodeData = pathShape[0].parentNode.__data__;
    var shapeType = strcase.camelCase(nodeData.shapeType);
    var pathShapeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.shape.pathShape[shapeType].getAttributes(nodeData.width, nodeData.height);
    pathShapeAttributes.forEach(function(attribute) {
      pathShape.attr(attribute.name, attribute.value)
    });
  }
  //*/

 /*
  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      //console.log(allSymbolNames);
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
    var pathShapes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    pathShapes.enter().append("path")
    .call(render);

    // Exit…
    pathShapes.exit().remove();

  }
  //*/

  return {
    //renderAll:renderAll,
    render:render
  };
}();
