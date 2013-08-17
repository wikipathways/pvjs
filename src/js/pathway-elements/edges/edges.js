// Edges (interactions and graphical lines)

pathvisio.edges = function(){
  var current = null;
  function drawAll() {
    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = svg.selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (d) { return d.edgeType + '-' + d.graphId; })
      .attr("class", function (d) { 
        var styleClass = 'edge ' + d.edgeType + ' ';
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'broken') {
            styleClass += " broken-stroke"; 
          };
        };
        return styleClass; 
      })
      .attr("d", function (d) {
        pathData = pathvisio.edges.pathData.get(d, pathway.labelableElements);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            svg.append("path")
            .attr("class", d.edgeType + "-double")
            .attr("d", pathData)
            .attr("style", "stroke:white; stroke-width:" + d.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisio.edges.markers.draw(d.markerStart, 'start', d.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisio.edges.markers.draw(d.markerEnd, 'end', d.stroke) + ')');
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
//      .attr("marker-start", function (d) { 
//        markerStart = pathvisio.edges.markers.draw(d.markerStart, 'start', d.stroke);
//        if (d.hasOwnProperty('strokeStyle')) {
//          if (d.strokeStyle === 'double') {
//            markerStart = 'mim-gap-start-black';
//          };
//        };
//        return 'url(#' + markerStart + ')'; 
//      })
//      .attr("marker-end", function (d) { 
//        markerEnd = pathvisio.edges.markers.draw(d.markerEnd, 'end', d.stroke);
//        if (d.hasOwnProperty('strokeStyle')) {
//          if (d.strokeStyle === 'double') {
//            markerEnd = 'mim-gap-end-black';
//          };
//        };
//        return 'url(#' + markerEnd + ')'; 
//      })
      .attr("fill", 'none');
    };
  };

  return {
    drawAll:drawAll
  }
}();
  
