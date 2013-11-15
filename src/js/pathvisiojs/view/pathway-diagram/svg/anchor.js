pathvisiojs.view.pathwayDiagram.svg.anchor = function(){

function makeBlocky(x, y) {
 var results = {};
 var column = pathvisiojs.view.pathwayDiagram.pathFinder.xYCoordinatesToMatrixLocation(x, y).column;
 var row = pathvisiojs.view.pathwayDiagram.pathFinder.xYCoordinatesToMatrixLocation(x, y).row;
 results.x = pathvisiojs.view.pathwayDiagram.pathFinder.matrixLocationToXYCoordinates(column, row).x;
 results.y = pathvisiojs.view.pathwayDiagram.pathFinder.matrixLocationToXYCoordinates(column, row).y;
 return results;
}

  function renderAll(svg, pathway) {

    var anchors = pathway.elements.filter(function(element) {
      return element.renderableType === 'anchor';
    });

    var viewport = svg.select('#viewport');

    var anchorElements = viewport.selectAll('use.anchor')
    .data(anchors)
    .enter()
    .append('use')
    .attr('x', function(d) {return makeBlocky(d.x, d.y).x; })
    .attr('y', function(d) {return makeBlocky(d.x, d.y).y; })
    .attr('width', pathvisioNS.grid.squareLength)
    .attr('height', pathvisioNS.grid.squareLength)
    .attr('xlink:xlink:href', '#grid-square')
    .attr('class', 'anchor')
    .attr('style', function(d) {return 'fill:red; stroke:none;';});
  }

  return {
    renderAll:renderAll
  };
}();
