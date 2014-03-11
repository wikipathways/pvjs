pathvisiojs.view.pathwayDiagram.svg.grid = function(){
  'use strict';

/*  Linear algebra conventions call for specifying an element of a matrix as row #, column #.
 *  The rows and columns use one-based indexing. Example: Element.1,2 is the element in the first row and the second column.
 *  The code in PathFinding.js uses x to refer to column # and y to refer to row #.
 *  JavaScript uses zero-based indexing for matrices. Example: matrix[0][1] refers to the element in the first row and the second column.
 *  This code will follow the PathFinding.js conventions and use zero-based indexing,
 *  so be careful to note this may differ from linear algebra conventions.
 * */

  function render(svg) {
    var viewport = svg.select('#viewport');

    var grid = viewport.selectAll('use.grid-square')
    .data(pathvisioNS.grid.gridRenderingData)
    .enter()
    .append('use')
    .attr('x', function(d) {return d.x;})
    .attr('y', function(d) {return d.y;})
    .attr('width', pathvisioNS.grid.squareLength)
    .attr('height', pathvisioNS.grid.squareLength)
    .attr('xlink:xlink:href', '#grid-square')
    .attr('class', 'grid-square')
    .attr('style', function(d) {return 'fill:' + d.fill + '; fill-opacity:0.3; stroke:darkgray;';});
  }

  return {
    render:render
  };
}();
