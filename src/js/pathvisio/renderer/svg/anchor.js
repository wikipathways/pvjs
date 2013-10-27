pathvisio.renderer.svg.anchor = function(){

function makeBlocky(x, y) {
 var results = {};
 var column = pathvisio.renderer.pathFinder.xYCoordinatesToMatrixLocation(x, y).column;
 var row = pathvisio.renderer.pathFinder.xYCoordinatesToMatrixLocation(x, y).row;
 results.x = pathvisio.renderer.pathFinder.matrixLocationToXYCoordinates(column, row).x;
 results.y = pathvisio.renderer.pathFinder.matrixLocationToXYCoordinates(column, row).y;
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
