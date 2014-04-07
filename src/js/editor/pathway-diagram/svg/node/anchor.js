pathvisiojs.view.pathwayDiagram.svg.node.anchor = function(){
  'use strict';

  function render(container, parentEdgeId, data) {
    // renders all anchors for a given edge

    // TODO look at using markers for this instead of independent symbols

    /*    if (!svg) {
          throw new Error('svg missing for rendering anchors.');
          }
    //*/    

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

    // TODO refactor svg.node.render() so we can use it for the other nodes and for anchors instead of basically repeating much of that method here
    var nodeContainer = container.selectAll('.node.anchor.parent-edge-' + pathvisiojs.view.pathwayDiagram.svg.convertToId(parentEdgeId))
    .data(data)
    .enter()
    .append("g")
    .attr('transform', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      var translateX = anchorCoordinates.x - defaultAnchorWidth/2;
      var translateY = anchorCoordinates.y - defaultAnchorHeight/2;
      return 'translate(' + translateX + ' ' + translateY + ')';
    })
    .attr('class', 'node anchor parent-edge-' + pathvisiojs.view.pathwayDiagram.svg.convertToId(parentEdgeId))
    .attr("style", function (d) {
      var style;
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
    .each(function(d) {
      var thisNodeContainer = d3.select(this);
      if (!d.width) {
        d.width = defaultAnchorWidth;
      }
      if (!d.height) {
        d.height = defaultAnchorHeight;
      }
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(thisNodeContainer, d);
    });

    /*
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
    //*/

  }

  return {
    render:render
    //renderAll:renderAll
  };
}();
