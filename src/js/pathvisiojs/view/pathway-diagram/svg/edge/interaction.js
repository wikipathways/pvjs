"use strict";
pathvisiojs.view.pathwayDiagram.svg.edge.interaction = function(){
  function getMarkerNameFromInteractionGraph(InteractionGraph) {
    var interactionType;
    if (!InteractionGraph) {
      return 'none';
    }
    else {
      interactionType = InteractionGraph.interactionType;
      if (!interactionType) {
        return 'none';
        console.warn('No interactionType specified for interaction.');
      }
      else {

        // TODO check for whether marker is specified in list of availableMarkers

        return strcase.paramCase(interactionType);
      }
    }
  }

  //function render(svg, target, data) {
  function render(args) {
    var svg = args.svg;
    var container = args.container;
    var data = args.data;
    /*
    console.log('container');
    console.log(container);
    console.log('data');
    console.log(data);
    //*/


    var firstInteractionGraph, lastInteractionGraph, markerStart, markerEnd;
    if (!!data.InteractionGraph) {
      if (data.InteractionGraph.length > 1) {
        firstInteractionGraph = data.InteractionGraph[0];
        //markerStart = getMarkerNameFromInteractionGraph(firstInteractionGraph);
        lastInteractionGraph = data.InteractionGraph[data.InteractionGraph.length - 1];
        //markerEnd = getMarkerNameFromInteractionGraph(lastInteractionGraph);
      }
      else {
        lastInteractionGraph = data.InteractionGraph[0];
        //markerEnd = getMarkerNameFromInteractionGraph(lastInteractionGraph);
      }
    }

    pathvisiojs.view.pathwayDiagram.svg.edge.render(args, function(interaction) {
      interaction.attr("class", function (data) {
        var cssClass = 'edge interaction';
        if (!!data.DatasourceReference) {
          cssClass += 'has-xref ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })

      var containerElement = container[0][0];
      var containerElementX, containerElementY;
      if (containerElement.hasOwnProperty('__data__')) {
        interaction.attr('transform', function() {
          containerElementX = containerElement.__data__.x || 0;
          containerElementY = containerElement.__data__.y || 0;
          return 'translate(' + (-1*containerElementX) + ' ' + (-1*containerElementY) + ')';
        })
      }
    });


    // I want to get the marker name from the interactionType later.
    //pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes(svg, interaction, data, markerStart, markerEnd);

    /*
    // Update…
    var interaction = container.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .call(setAttributes);

    // Enter…
    interaction.enter().append("path")
    .call(setAttributes);

    // Exit…
    interaction.exit().remove();
    //*/

  }


  /*
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
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var cssClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (data) {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (data) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
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
  //*/


  return {
    render:render,
    //renderAll:renderAll
  };
}();
  
