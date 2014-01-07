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

    var interaction = container.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .enter().append("path")
    .attr("class", function (data) {
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

    args.edge = interaction;
    pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes(args);

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

  function setAttributes(interaction) {
    var interactionElement = interaction[0][0];
    var data = interactionElement.__data__;
    var createPathDataString = d3.svg.line()
    .x(function(data) { return data.x; })
    .y(function(data) { return data.y; });

    //*

    async.series({
      'stepTypeAndConvertedPointSet': function(callback) {

        // in GPML, some points are implied, such as for many curves and elbows with only two points.
        // This code below fills in the implied points, returning the full set of points.

        var stepType, index, firstSegmentHorizontal, currentSegmentHorizontal,
        convertedPointSet = [];

        if ((!data.ConnectorType) || (data.ConnectorType === undefined) || (data.ConnectorType === 'Straight') || (data.ConnectorType === 'Segmented')) {
          stepType = 'linear';
          callback(null, {'convertedPointSet': data.Point, 'stepType': stepType});
        }
        else {

          // Elbow and Curved are considered together, because a Curve is just a modification
          // of an Elbow. The Curve uses the Elbow point set, but it has interpolation of
          // basis instead of linear.

          if (data.ConnectorType === 'Elbow' || data.ConnectorType === 'Curved') {
            if (data.ConnectorType === 'Elbow') {
              stepType = 'linear';

              // The d3.js step-after and step-before would seem to be well-suited for
              // Elbows, but it won't work for the point set format we are using.
              // The point set formats we could use include the following:
              // 1) linear/path-finding.js format: specify a full set of points, meaning
              // start and end points as well as a point at every change in direction.
              // 2) PathVisio-Java/GPML format: start and end points plus intermediate
              // points specifying the mid-points of each Elbow segment.
              // 3) d3.js step-after and step-before format: start and end points plus
              // a point for every other change in direction.
              //
              // pvjs uses format 1), so that requires a step type of linear. If we
              // used step-before and step-after, we would need to use format 3) and
              // the following code:

              /*
              if (firstSegmentHorizontal) {

                // step-after - alternate between horizontal and vertical segments, as in a step function.

                stepType = 'step-after';
              }
              else {
                stepType = 'step-before';
              }
              //*/

            }
            else {
              if (data.ConnectorType === 'Curved') {
                stepType = 'basis';
              }
            }

            if (data.Point.length === 2) {

              // GPML specifies just the start and end points and assumes a programmatic
              // path finding algorithm will fill in the intermediate points, unless
              // the user explicitly sets the intermediate points by dragging the interaction.

              // fill in intermediate points using default algorithmic layout

              pathvisiojs.view.pathwayDiagram.pathFinder.getPath(svg, data, function(convertedPointSet) {
                callback(null, {'convertedPointSet': convertedPointSet, 'stepType': stepType});
              });
            }
            else {

              // use user-specified intermediate points. This requires converting from
              // point set format #2 (see above) to format #1.

              convertedPointSet.push(data.Point[0]);

              if (Math.abs(data.Point[0].RelX) === 1) {
                firstSegmentHorizontal = true;
              }
              else {
                firstSegmentHorizontal = false;
              }

              currentSegmentHorizontal = firstSegmentHorizontal;
              index = 0;
              do {
                index += 1;

                if (currentSegmentHorizontal) {
                  convertedPointSet.push({
                    'x':data.Point[index].x,
                    'y':data.Point[index - 1].y
                  });
                }
                else {
                  convertedPointSet.push({
                    'x':data.Point[index - 1].x,
                    'y':data.Point[index].y
                  });
                }

                currentSegmentHorizontal = !currentSegmentHorizontal;

              } while (index < data.Point.length - 1);

              convertedPointSet.push(data.Point[data.Point.length - 1]);
              self.myconvertedPointSet = convertedPointSet;
              callback(null, {'convertedPointSet': convertedPointSet, 'stepType': stepType});
            }
          }
          else {
            console.warn('Warning: pathvisiojs does not support connector type: ' + data.ConnectorType + '. Using linear interpolation as fallback.');
            stepType = 'linear';
            callback(null, {'convertedPointSet': data.Point, 'stepType': stepType});
          }
        }
      }
    },
    function(err, results) {

      //*/

      interaction.attr("id", function(data) { return strcase.paramCase(data.GraphId); })
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
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      //.attr("d", pathData)
        //*
      .attr("d", function (data) {
      /*
        if (interaction.hasOwnProperty('strokeStyle')) {
          if (interaction.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", interaction.interactionType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + interaction.strokeWidth + '; ')
            //.attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.interaction.marker.render(viewport, interaction.markerStart, 'start', interaction.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.interaction.marker.render(viewport, strcase.paramCase(edge.interactionType), 'end', edge.stroke) + ')');
          }
        }
        //*/

        createPathDataString.interpolate(results.stepTypeAndConvertedPointSet.stepType);

        return createPathDataString(results.stepTypeAndConvertedPointSet.convertedPointSet);
      });
    });
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
  
