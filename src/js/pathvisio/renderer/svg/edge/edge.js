// Edges (interactions and graphical lines)

pathvisio.renderer.svg.edge = function(){

  function render(svg, pathway, edge) {
    if (!svg || !pathway || !edge) {
      return console.warn('Error: Missing one or more required parameters: svg, pathway, edge.');
    }

    console.log('edge');
    console.log(edge);

      var pathData = null;

      var edgeElement = svg.select('#viewport').append("path")
      .attr("id", edge.edgeType + '-' + edge.graphId )
      .attr("class", function () {
        var styleClass = 'edge ' + edge.edgeType + ' ';
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke";
          }
        }
        return styleClass;
      })
      .attr("style", function () {
        var style = 'stroke-width:' + edge.strokeWidth + '; ';
        if (edge.hasOwnProperty('stroke')) {
          style += 'stroke:' + edge.stroke + '; ';
        }
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * edge.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function () {
        var markerStart = pathvisio.renderer.svg.edge.marker.render(svg, edge.markerStart, 'start', edge.stroke);
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function () {
        var markerEnd = pathvisio.renderer.svg.edge.marker.render(svg, edge.markerEnd, 'end', edge.stroke);
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function () {
        pathData = pathvisio.renderer.svg.edge.pathData.get(svg, pathway, edge);
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            svg.select('#viewport').append("path")
            .attr("class", edge.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + edge.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisio.renderer.svg.edge.marker.render(svg, edge.markerStart, 'start', edge.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisio.renderer.svg.edge.marker.render(svg, edge.markerEnd, 'end', edge.stroke) + ')');
          }
        }
        return pathData;
      });
  }


  function renderAll(svg, pathway) {
    if (!svg || !pathway) {
      return console.warn('Error: Missing one or more required parameters: svg, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = svg.select('#viewport').selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (d) { return d.edgeType + '-' + d.graphId; })
      .attr("class", function (d) {
        var styleClass = 'edge ' + d.edgeType + ' ';
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke";
          }
        }
        return styleClass;
      })
      .attr("style", function (d) {
        var style = 'stroke-width:' + d.strokeWidth + '; ';
        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; ';
        }
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * d.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (d) {
        var markerStart = pathvisio.renderer.svg.edge.marker.render(svg, d.markerStart, 'start', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (d) {
        var markerEnd = pathvisio.renderer.svg.edge.marker.render(svg, d.markerEnd, 'end', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        pathData = pathvisio.renderer.svg.edge.pathData.get(svg, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            svg.select('#viewport').append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisio.renderer.svg.edge.marker.render(svg, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisio.renderer.svg.edge.marker.render(svg, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }

  return {
    render:render,
    renderAll:renderAll
  };
}();
  
