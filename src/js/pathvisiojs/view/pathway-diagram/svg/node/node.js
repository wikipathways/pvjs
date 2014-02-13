pathvisiojs.view.pathwayDiagram.svg.node = function(){
  'use strict';
  function dragmove(d) {
    /*
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
    //*/
    // don't have anchors rendered yet
    /*
    var changingAnchors = pathwayHere.elements.filter(function(element) {return element.parentId === d.id});
    var d3Node = self.d3Node = d3.select(this);
    console.log('changingAnchors');
    console.log(changingAnchors);
    d3Node.attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
    changingAnchors.forEach(function(anchor){
      console.log('anchor');
      console.log(anchor);
      console.log(d3Node);
      self.d3Node = d3Node;
      self.anchor = anchor;
      anchor.x = d3Node.select('#' + anchor.id)[0][0].getCTM().e;
      anchor.y = d3Node.select('#' + anchor.id)[0][0].getCTM().f; 
    })
    //*/
    d.x = d3.event.x;
    d.y = d3.event.y;


    /*
    var args = {};
    args.svg = d3.select('svg');
    args.pathway = pathwayHere;
    args.uniformlyScalingShapesList = uniformlyScalingShapesListHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});
    */
  }

  function render(args, callback) {
    if (!args) {
      throw new Error('Need input args to render a node.');
    }

    var nodeContainer = args.element,
      data = args.data,
      pathway = args.pathway,
      parentDataElement,
      translatedX,
      translatedY;

    if (!pathway) {
      throw new Error('Need a pathway to render a node.');
    }
    if (!nodeContainer) {
      throw new Error('Need a nodeContainer to render a node.');
    }
    if (!data) {
      throw new Error('Need input data to render a node.');
    }

    if (data.hasOwnProperty('isContainedBy')) {
      parentDataElement = pathway.elements.filter(function(element) {
        return element['id'] === data.isContainedBy;
      })[0];
      translatedX = data.x - parentDataElement.x;
      translatedY = data.y - parentDataElement.y;
    }
    else {
      translatedX = data.x;
      translatedY = data.y;
    }

    /************ 
     * container
     * *********/

    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    nodeContainer.attr('transform', function(d) {
      return 'translate(' + translatedX + ' ' + translatedY + ')';
    })
    .attr("style", function (d) {
      var style = '';
      if (d.hasOwnProperty('backgroundColor')) {
	if (d.ShapeType == 'brace' || d.ShapeType == 'arc'){ 
	  //Brace color is NOT for fill and should always be transparent
	  style = 'fill-opacity:0; ';
	} 
        else if (d.nodeType == 'Label' && d.backgroundColor == '#ffffff'){  
	  //Label fill attr is programmatically IGNORED when set to Java editor default of white.
	  //This is obviously a hack that should ultimately be resolved by fixing the editor's 
	  // default for label backgroundColor.
	  style = '' ;
	}
	else {
          style = 'fill:' + d.backgroundColor + '; fill-opacity:1; ';
	}
      }
      return style;
    })
    .call(drag)



    /****************** 
     * background shape
     * ***************/

    var shapeType = strcase.paramCase(data.ShapeType);
    
    // check for whether desired shape type is available as a symbol
//    if (pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping.hasOwnProperty(shapeType)) {
      //console.log('We will use an SVG "use" element to render this ' + shapeType);
//      pathvisiojs.view.pathwayDiagram.svg.node.useElement.render(nodeContainer, data);
//    }
    // else check for whether it is available as a pathShape
//    else {
      //console.log('We will use a pathShape to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(nodeContainer, data);
//    }

    /****************** 
     * text label
     * ***************/

    if (data.hasOwnProperty('text')) {
      pathvisiojs.view.pathwayDiagram.svg.node.text.render(nodeContainer, data);
    }

    /****************** 
     * citation(s)
     * ***************/

    if (data.hasOwnProperty('PublicationXref')) {
      pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(nodeContainer, 'node', args.pathway, data.PublicationXref);
    }

    callback(nodeContainer);
  }

  /*
  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      //console.log(args.allSymbolNames);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!args.allSymbolNames) {
        console.log('args.allSymbolNames not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or args.allSymbolNames.');
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
  //*/

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  function highlight(selector, style, svgId) {
    svgId = svgId || 'pathvisiojs-diagram';
    var svg = d3.select('#' + svgId);
    var styles = d3.map(style).entries();
    var selectedNodes = svg.selectAll(selector);
    selectedNodes.each(function() {
      var node = d3.select(this);
      console.log(node);
      self.myNode = node;
      var height = node[0][0].getBBox().height;
      var width = node[0][0].getBBox().width; 
      var highlighter = node.append('rect') 
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('width', width + 5)
      .attr('height', height + 5);

      styles.forEach(function(styleAttribute){
        highlighter.attr(strcase.paramCase(styleAttribute.key), styleAttribute.value);
      });
    });
  }  

  function highlightByLabel(svg, pathway, nodeLabel) {
    var svg = d3.selectAll('#pathvisiojs-diagram');
    svg.selectAll('.highlighted-node').remove();
    var allDataNodesWithText = pathway.DataNode.filter(function(d, i) {return (!!d.text);});
    var selectedNodes = allDataNodesWithText.filter(function(d, i) {return d.text.line.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeContainer = svg.select('#pathway-iri-' + node.GraphId); //strcase.paramCase(node['id']));
      var height = nodeContainer[0][0].getBBox().height;
      var width = nodeContainer[0][0].getBBox().width; 
      nodeContainer.append('rect') 
      .attr('class', 'highlighted-node')
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
  }  

  return {
    //renderAll:renderAll,
    render:render,
    getPortCoordinates:getPortCoordinates,
    highlight:highlight,
    highlightByLabel:highlightByLabel
  };
}();
