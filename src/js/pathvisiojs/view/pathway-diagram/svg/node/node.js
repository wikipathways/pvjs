// Draw nodes. Includes data nodes, shapes, labels, cellular components...

pathvisiojs.view.pathwayDiagram.svg.node = function(){
  
  var pathwayHere, uniformlyScalingShapesListHere;

  function dragmove(d) {
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
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


    var args = {};
    args.svg = d3.select('svg');
    args.pathway = pathwayHere;
    args.uniformlyScalingShapesList = uniformlyScalingShapesListHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});

  }

  function renderAll(viewport, pathway, uniformlyScalingShapesList) {
    if (!viewport || !pathway) {
      if (!viewport) {
        console.log('viewport');
      }
      if (!pathway) {
        console.log('pathway');
      }
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    pathwayHere = pathway;
    uniformlyScalingShapesListHere = uniformlyScalingShapesList;
    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    // Update… 
    var nodes = viewport.selectAll("g.node")
    .data(function(d) {
      console.log('d');
      console.log(d);
      return d.pathwayElements.filter(function(element) { return element['@type'] = 'gpml:DataNode'; })
    })
    .attr("id", function (d) { return 'node-' + d["@id"]; })
    .attr('class', 'node')
    .attr('transform', function(d) {return 'translate(' + (d['gpml:centerx'] - d['gpml:width']/2) + ' ' + (d['gpml:centery'] - d['gpml:height']/2) + ')';})
    .on("click", function(d,i) {
      console.log('clicked a data node');
        // only for data nodes
        console.log(pathway);
        console.log(pathway['biopax:organism']);
        pathvisiojs.view.annotation.xRef.render(pathway['biopax:organism'], d.xRef['@id'], d.xRef.database, d.textLabel.text, d.dataNodeType);
      }
    })
    .call(drag)

    // Enter…
    })
    .call(drag)

    // Enter…
    nodes.enter().append("g")
    .attr("id", function (d) { return 'node-' + d["@id"]; })
    .attr('class', 'node')
    .attr('transform', function(d) {return 'translate(' + (d['gpml:centerx'] - d['gpml:width']/2) + ' ' + (d['gpml:centery'] - d['gpml:height']/2) + ')';})
    .on("click", function(d,i) {
      console.log('clicked a data node');
        // only for data nodes
        console.log(pathway);
        console.log(pathway['biopax:organism']);
        pathvisiojs.view.annotation.xRef.render(pathway['biopax:organism'], d.xRef['@id'], d.xRef.database, d.textLabel.text, d.dataNodeType);
      }
    })
    .call(drag)

    // Exit…
    nodes.exit().remove();

    // Shapes
    pathvisiojs.view.pathwayDiagram.svg.node.shape.render(nodes, pathway, uniformlyScalingShapesList);

    // Labels
    pathvisiojs.view.pathwayDiagram.svg.node.label.renderAll(nodes, pathway);
  }

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
    renderAll:renderAll,
    getPortCoordinates:getPortCoordinates,
    highlightByLabel:highlightByLabel
  };
}();
