"use strict"

pathvisiojs.view.pathwayDiagram.svg.node.anchor = function(){

  function render(container, parentEdgeId, data) {
    // renders all anchors for a given edge

    // TODO look at using markers for this instead of independent symbols
    // TODO use ...svg.node.render() with this

    if (!svg) {
      throw new Error('svg missing for rendering anchors.');
    }
    if (!container) {
      throw new Error('container element not specified for rendering anchors.');
    }
    if (!parentEdgeId) {
      throw new Error('parentEdgeId missing for rendering anchors.');
    }
    if (!data) {
      throw new Error('anchor data missing for rendering anchors.');
    }

    // make sure it's an array
    data = pathvisiojs.utilities.convertToArray(data);

    var defaultAnchorWidth = 10;
    var defaultAnchorHeight = 10;
    var anchors = container.selectAll('use.anchor.parent-edge-' + strcase.paramCase(parentEdgeId))
    .data(data)
    .enter()
    .append('use')
    .attr('x', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      return anchorCoordinates.x - defaultAnchorWidth/2;
    })
    .attr('y', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      return anchorCoordinates.y - defaultAnchorHeight/2;
    })
    .attr('width', defaultAnchorWidth)
    .attr('height', defaultAnchorHeight)
    .attr('xlink:xlink:href', function(d) {
      var backgroundImageId;
      var backgroundImage = d.backgroundImage;
      if (!!backgroundImage) {
        // check for whether desired shape type is available as a symbol
        backgroundImageId = pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping[strcase.paramCase(backgroundImage)]; 
        if (!!backgroundImageId) {
          //console.log('We will use an SVG "use" element to render this ' + shapeType);
          return '#' + backgroundImageId;
        }
        else {
          return 'none'
        }
      }
      else {
        return 'none'
      }
    })
    .attr('class', 'node anchor parent-edge-' + strcase.paramCase(parentEdgeId))
    .attr('style', function(d) {
      var style = ''
      if (d.hasOwnProperty('backgroundColor')) {
        style += 'fill:' + d.backgroundColor + '; ';
      }
      return style;
    })
  }

  /*
  function makeBlocky(x, y) {
    var results = {};
    
    var matrixLocation = pathvisiojs.view.pathwayDiagram.pathFinder.xYCoordinatesToMatrixLocation(x, y, squareLength);
    var column = matrixLocation.column;
    var row = matrixLocation.row;

    var xyCoordinates = pathvisiojs.view.pathwayDiagram.pathFinder.matrixLocationToXYCoordinates(column, row, squareLength);
    results.x = xyCoordinates.x;
    results.y = xyCoordinates.y;
    return results;
  }

  function render(svg, container, parentEdgeId, data) {
    if (!svg) {
      throw new Error('svg missing for rendering anchors.');
    }
    if (!container) {
      throw new Error('container element not specified for rendering anchors.');
    }
    if (!parentEdgeId) {
      throw new Error('parentEdgeId missing for rendering anchors.');
    }
    if (!data) {
      throw new Error('anchor data missing for rendering anchors.');
    }

    var squareLength = d3.select('svg')[0][0].pathvisiojs.gridData.squareLength;

    var anchors = container.selectAll('use.anchor.parent-edge-' + strcase.paramCase(parentEdgeId))
    .data(data)
    .enter()
    .append('use')
    .attr('x', function(d) {return makeBlocky(d.x, d.y, squareLength).x; })
    .attr('y', function(d) {return makeBlocky(d.x, d.y, squareLength).y; })
    .attr('width', pathvisioNS.grid.squareLength)
    .attr('height', pathvisioNS.grid.squareLength)
    .attr('xlink:xlink:href', '#' + pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping('oval'))
    .attr('class', 'node anchor')
    .attr('style', function(d) {return 'fill:red; stroke:none;';});
  }
  //*/

  /*
  function renderAll(container, pathway) {
    if (!args.container) {
      throw new Error('Error: container element not specified for rendering anchors.');
    }
    if (!args.data) {
      throw new Error('Error: group data missing for rendering anchors.');
    }

    // make sure it's an array
    anchors = pathvisiojs.utilities.convertToArray(anchors);

    var anchors = pathway.elements.filter(function(element) {
      return element.renderableType === 'anchor';
    });

    var anchorElements = container.selectAll('use.anchor')
    .data(anchors)
    .enter()
    .append('use')
    .attr('x', function(d) {return makeBlocky(d.x, d.y).x; })
    .attr('y', function(d) {return makeBlocky(d.x, d.y).y; })
    .attr('width', squareLength)
    .attr('height', squareLength)
    .attr('xlink:xlink:href', '#' + pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping('oval'))
    .attr('class', 'node anchor')
    .attr('style', function(d) {return 'fill:red; stroke:none;';});
  }
  //*/

  return {
    render:render
    //renderAll:renderAll
  };
}();
