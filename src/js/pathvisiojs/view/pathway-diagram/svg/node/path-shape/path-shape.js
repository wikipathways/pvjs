pathvisiojs.view.pathwayDiagram.svg.node.pathShape = function(){
  'use strict';

  function render(parent, data) {
    /*
    console.log(parent);
    console.log(data);
    //*/
    var re;
    var pathShapeNameToUse = strcase.camelCase(data.ShapeType);
    if (!pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
      re = /Double$/gi;
      pathShapeNameToUse = pathShapeNameToUse.replace(re, '');
      if (pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
      }
      else {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available. Using pathShape "rounded-rectangle" instead');
        pathShapeNameToUse = 'roundedRectangle';
      }
    }

    //style attribute modified on parent 
    var style = parent.attr('style');
    parent.attr('style', function(d) {
        if(d.hasOwnProperty('borderColor')) {
	  if(d.nodeType != 'Label'){  //Label "Color" attrs are NOT for borderColor of svg-specific rectangle shape
            style += 'stroke:' + d.borderColor + '; ';
	  }
        }
        return style;})

    //other attributes extracted and applied to new g element
    var stroke = 1
    var transform = '';
    var g = parent.insert('g', ':first-child');
    g.attr('stroke-width', function(d) {
        if(!isNaN(d.borderWidth)){
          stroke = d.borderWidth; //LineThickness in GPML
        }
        return stroke;})
      .attr('transform', function(d) {
        if (d.rotate){
          transform += ' rotate(' + d.rotate + ',' + d.width/2 + ',' + d.height/2 + ')';
        }
        return transform;});

    var nodeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.pathShape[pathShapeNameToUse].getAttributes(data.width, data.height, data.borderWidth);
    nodeAttributes.forEach(function(attribute) {

     if(attribute.scale == 'true'){
        g.attr('stroke-width', function(d) {
          return stroke / ((d.width + d.height) / 200);
	})
	.attr('transform', function(d) {
	  transform += ' scale('+d.width/100+', '+d.height/100+')';
	  return transform;
	});
     }

      //handle alt path types and lists of attrs
      var child = 'path';
      var names = [attribute.name];
      var paths = [attribute.path];
      if (attribute.alt){
	child = attribute.alt;
	names = attribute.name;
	paths = attribute.path;
      }
      var childElement = g.append(child);
      for(var i = 0; i < names.length; i++){
	childElement.attr(names[i], paths[i]);
      }
    });
  }

  /*
  function render(pathShape) {

    // TODO this seems like a hack. How can the code be refactored so this line below is not needed?

    if (!pathShape[0] || pathShape[0].length < 1) {return 'nonuniformlyScalingNodes empty'};
    self.pathShape = pathShape;
    pathShape.attr('id', function (d) {return 'shape-' + d.id;})
    .attr('class', function (d) {
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
