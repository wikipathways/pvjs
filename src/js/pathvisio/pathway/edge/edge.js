// Edges (interactions and graphical lines)

pathvisio.pathway.edge = function(){
  var current = null;
  function drawAll() {
    if (pathvisio.pathways[pathvisio.current.svgSelector].hasOwnProperty('edges')) {
      var pathData = null;

      var edges = pathvisio.current.svg.selectAll("pathway.edge")
      .data(pathvisio.pathways[pathvisio.current.svgSelector].edges)
      .enter()
      .append("path")
      .attr("id", function (d) { return d.edgeType + '-' + d.graphId; })
      .attr("class", function (d) { 
        var styleClass = 'edge ' + d.edgeType + ' ';
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke"; 
          };
        };
        return styleClass; 
      })
      .attr("d", function (d) {
        pathData = pathvisio.pathway.edge.pathData.get(d);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            pathvisio.current.svg.append("path")
            .attr("class", d.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "drawing-board-color-stroke")
            .attr("style", "stroke-width:" + d.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisio.pathway.edge.marker.draw(d.markerStart, 'start', d.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisio.pathway.edge.marker.draw(d.markerEnd, 'end', d.stroke) + ')');
          };
        };
        return pathData; 
      })
      .attr("style", function (d) { 
        var style = 'stroke-width:' + d.strokeWidth + '; ';
        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; '; 
        };
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * d.strokeWidth) + '; '; 
          };
        };
        return style; 
      })
      .attr("marker-start", function (d) { 
        markerStart = pathvisio.pathway.edge.marker.draw(d.markerStart, 'start', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          };
        };
        return 'url(#' + markerStart + ')'; 
      })
      .attr("marker-end", function (d) { 
        markerEnd = pathvisio.pathway.edge.marker.draw(d.markerEnd, 'end', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          };
        };
        return 'url(#' + markerEnd + ')'; 
      })
      .attr("fill", 'none');
    };
  };

  return {
    drawAll:drawAll
  }
}();
  
