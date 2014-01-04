"use strict";
pathvisiojs.view.pathwayDiagram.svg.node = function(){
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
    if (!args.target) {
      throw new Error('Need a target to render a node.');
    }
    if (!args.data) {
      throw new Error('Need input data to render a node.');
    }

    /************ 
     * container
     * *********/

    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    var nodeContainer = args.target.selectAll('#node-container-' + strcase.paramCase(args.data['@id']))
    .data([args.data])
    .enter()
    .append("g")
    .attr("id", function (d) { return 'node-container-' + strcase.paramCase(d['@id']); })
    .attr('transform', function(d) {
      var targetElement = {}
      if (args.target[0][0].hasOwnProperty('__data__')) {
        targetElement.x = (args.target[0][0].__data__.x);
        targetElement.y = (args.target[0][0].__data__.y);
      }
      else {
        targetElement.x = 0;
        targetElement.y = 0;
      }
      var element = {}
      element.x = d.x - targetElement.x;
      element.y = d.y - targetElement.y;
      return 'translate(' + element.x + ' ' + element.y + ')';
    })
    .attr("style", function (d) {
      var style = '';
      if (d.hasOwnProperty('backgroundColor')) {
        style += 'fill:' + d.backgroundColor + '; ';
      }
      return style;
    })
    .call(drag)

    /****************** 
     * background shape
     * ***************/

    var shapeType = strcase.paramCase(args.data.ShapeType);
    
    // check for whether desired shape type is available as a symbol
    if (pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping.hasOwnProperty(shapeType)) {
      //console.log('We will use an SVG "use" element to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.node.useElement.render(nodeContainer, args.data);
    }
    // else check for whether it is available as a pathShape
    else {
      //console.log('We will use a pathShape to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(nodeContainer, args.data);
    }

    /****************** 
     * text label
     * ***************/

    if (args.data.hasOwnProperty('text')) {
      pathvisiojs.view.pathwayDiagram.svg.node.text.render(nodeContainer, args.data);
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

  function highlightByLabel(svg, pathway, nodeLabel) {
    svg.selectAll('.highlighted-node').remove();
    var dataNodesWithText = pathway.elements.filter(function(d, i) {return d.nodeType === 'data-node' && (!!d.textLabel);});
    var selectedNodes = dataNodesWithText.filter(function(d, i) {return d.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeDomElement = svg.select('#node-' + node.id);
      var height = nodeDomElement[0][0].getBBox().height;
      var width = nodeDomElement[0][0].getBBox().width;
      nodeDomElement.append('rect')
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
    highlightByLabel:highlightByLabel
  };
}();
