// Edges (interactions and graphical lines)

var thisParent;

pathvisiojs.view.pathwayDiagram.svg.edge = function(){
  function render(parent, data) {
    thisParent = self.thisParent = parent;
    console.log('parent[0][0]');
    console.log(parent[0][0]);
    console.log('data');
    console.log(data);

    // Update…
    var edge = parent.selectAll('#' + strcase.paramCase(data['@id']))
    .data([data])
    .call(setAttributes);

    // Enter…
    edge.enter().append("path")
    .call(setAttributes);

    // Exit…
    edge.exit().remove();

  }

  function setAttributes(edge) {
    console.log('edge me');
    console.log(edge);

    var Straight = Segmented = d3.svg.line()
      .x(function(d) { return d.X; })
      .y(function(d) { return d.Y; })
      .interpolate("linear");

    var stepType;
    var Elbow = d3.svg.line()
      .x(function(d) { return d.X; })
      .y(function(d) { return d.Y; })
      .interpolate(stepType);

      /*
      var pathData = null;
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, edge, function(data) {
          pathData = data;
          console.log('pathData');
          console.log(pathData);
          //*/

      edge.attr("id", function(d) { return strcase.paramCase(d['@id']); })
      .attr("class", function () {
        var styleClass = 'edge ' + edge.edgeType + ' ';
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke";
          }
        }
        return styleClass;
      })
      .attr('transform', function(d) {
        var parentElement = {}
        if (thisParent[0][0].hasOwnProperty('__data__')) {
          parentElement.x = (thisParent[0][0].__data__['CenterX'] - thisParent[0][0].__data__['Width']/2);
          parentElement.y = (thisParent[0][0].__data__['CenterY'] - thisParent[0][0].__data__['Height']/2);
        }
        else {
          parentElement.x = 0;
          parentElement.y = 0;
        }
        return 'translate(' + (-1*parentElement.x) + ' ' + (-1*parentElement.y) + ')';
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
      /*
      .attr("marker-start", function () {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, edge.markerStart, 'start', edge.stroke);
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (d) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, strcase.paramCase(d.interactionType), 'end', d.stroke);
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      //*/
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        /*
          if (edge.hasOwnProperty('strokeStyle')) {
            if (edge.strokeStyle === 'double') {

              // setting stroke-width equal to its specified line value is
              // what PathVisio (Java) does, but the white line (overlaying the
              // thick line to create a "double line") is hard to see at 1px.

              viewport.append("path")
              .attr("class", edge.edgeType + "-double")
              .attr("d", pathData)
              .attr("class", "stroke-color-equals-default-fill-color")
              .attr("style", "stroke-width:" + edge.strokeWidth + '; ')
              //.attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, edge.markerStart, 'start', edge.stroke) + ')')
              .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, strcase.paramCase(edge.interactionType), 'end', edge.stroke) + ')');
            }
          }
          //*/
          if (data.ConnectorType === 'Elbow') {
            if (data.RelY === -1 || data.RelY === 1) {
              stepType = 'step-before';
            }
            else {
              stepType = 'step-after';
            }
          }
          console.log(data.Point);
          return Straight(data.Point);
          //return data.ConnectorType;
        });
      //});
  }


  function renderAll(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = viewport.selectAll("pathway.edge")
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
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, d.markerStart, 'start', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (d) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, d.markerEnd, 'end', d.stroke);
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
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke) + ')');
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
  
