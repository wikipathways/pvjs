"use strict";

// Edges (interactions and graphical lines)

pathvisiojs.view.pathwayDiagram.svg.edge = function(){

  function getPointAtPositionById(edgeElementId, position) {
    // position refers to percentage of total length along
    // edge from start toward end

    var edgeElement = d3.select('#' + edgeElementId)[0][0];
    var totalLength = edgeElement.getTotalLength();
    var lengthFromStartToPosition = position * totalLength;
    var point = edgeElement.getPointAtLength(lengthFromStartToPosition);
    return point;
  }

  //var svg, customMarkers;

  function render(args, callback) {
    var svg = args.svg;
    if (!svg) {
      throw new Error('svg missing');
    }
    var pathway = args.pathway;
    if (!pathway) {
      throw new Error('pathway missing');
    }
    var data = args.data;
    if (!data) {
      throw new Error('data missing');
    }
    var container = args.container;
    if (!container) {
      throw new Error('container missing');
    }
    var markerStartName = args.data.markerStart;
    //console.log('markerStartName');
    //console.log(markerStartName);
    var markerEndName = args.data.markerEnd;
    //console.log('markerEndName');
    //console.log(markerEndName);
    var edgeId = strcase.paramCase(data.GraphId);
    /*
    console.log('svg in edge');
    console.log(svg);
    console.log('edge in edge');
    console.log(edge);
    console.log('data in edge');
    console.log(data);
    console.log('markerStartName in edge');
    console.log(markerStartName);
    console.log('markerEndName in edge');
    console.log(markerEndName);
    //*/
    /*
    var createPathDataString = d3.svg.line()
    .x(function(data) { return data.x; })
    .y(function(data) { return data.y; });

    // "stepType" is the term d3js uses to specify type of interpolation.
    // we need to convert from GPML ConnectorType to
    // d3 stepType here
    var gpmlConnectorTypeToD3StepTypeMapping = {
      Straight:'linear',
      Segmented:'linear',
      Elbow:'linear',
      Curved:'basis'
    };
    var stepType = 'linear';
    if (gpmlConnectorTypeToD3StepTypeMapping.hasOwnProperty(data.ConnectorType)) {
      stepType = gpmlConnectorTypeToD3StepTypeMapping[data.ConnectorType];
    }
    createPathDataString.interpolate(stepType);
    //*/
    var edge,
      stroke = data.stroke,
      markerStartAttributeValue,
      markerEndAttributeValue;
    async.series({
      'markerStartAttributeValue': function(callback) {
        var markerStartIdStub = pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[markerStartName];
        if (!!markerStartIdStub) {
          if (!!stroke) { // if edge is not of default stroke color (at time of writing, this was black)
            if (markerStartName === 'none') { // if no marker is to be used, JSON data will specify 'none'
              markerStartAttributeValue = 'none';
              callback(null, markerStartAttributeValue);
            }
            else {
              if (pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerStartIdStub].indexOf(stroke) === -1) { // if no marker of this stroke color exists
                pathvisiojs.view.pathwayDiagram.svg.edge.marker.appendNonDefaultColorMarkerBothEnds(svg, markerStartIdStub, stroke, function() {
                  markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-' + stroke) + ')';
                  callback(null, markerStartAttributeValue);
                });
              }
              else {
                markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-' + stroke) + ')';
                callback(null, markerStartAttributeValue);
              }
            }
          }
          else {
            markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-default') + ')';
            callback(null, markerStartAttributeValue);
          }
        }
        else {
          console.warn('Pathvisiojs does not have access to a marker (arrowhead) of the requested type: "' + markerStartName + '"');
          markerStartAttributeValue = 'none';
          callback(null, markerStartAttributeValue);
        }
      },
      'markerEndAttributeValue': function(callback) {
        var markerEndIdStub = pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[markerEndName];
        if (!!markerEndIdStub) {
          if (!!stroke) { // if edge is not of default stroke color (at time of writing, this was black)
            if (markerEndName === 'none') { // if no marker is to be used, JSON data will specify 'none'
              markerEndAttributeValue = 'none';
              callback(null, markerEndAttributeValue);
            }
            else {
              if (pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerEndIdStub].indexOf(stroke) === -1) { // if no marker of this stroke color exists
                pathvisiojs.view.pathwayDiagram.svg.edge.marker.appendNonDefaultColorMarkerBothEnds(svg, markerEndIdStub, stroke, function() {
                  markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-' + stroke) + ')';
                  callback(null, markerEndAttributeValue);
                });
              }
              else {
                markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-' + stroke) + ')';
                callback(null, markerEndAttributeValue);
              }
            }
          }
          else {
            markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-default') + ')';
            callback(null, markerEndAttributeValue);
          }
        }
        else {
          console.warn('Pathvisiojs does not have access to a marker (arrowhead) of the requested type: "' + markerEndName + '"');
          markerEndAttributeValue = 'none';
          callback(null, markerEndAttributeValue);
        }
      },
      'edge': function(callback) {
        edge = container.selectAll('#' + strcase.paramCase(data.GraphId))
        .data([data])
        .enter().append("path") // TODO check whether this option works with groups for both the temporary frameIt hack and the final pathvisio JSON model
        //.enter().insert("path", ":first-child") // this option may cause problems in the future if we have groups with fully opaque backgrounds
        callback(null, edge);
      },
      /*
      'convertedPointSet': function(callback) {
        var index, firstSegmentHorizontal, currentSegmentHorizontal, convertedPointSet;

        // in GPML, some points are implied, such as for many curves and elbows with only two points.
        // This code below fills in the implied points, returning the full set of points.

        convertedPointSet = [];

        if ((!data.ConnectorType) || (data.ConnectorType === undefined) || (data.ConnectorType === 'Straight') || (data.ConnectorType === 'Segmented')) {
          callback(null, data.Point);
        }
        else {

          // Elbow and Curved are considered together, because a Curve is just a modification
          // of an Elbow. The Curve uses the Elbow point set, but it has interpolation of
          // basis instead of linear.

          if (data.ConnectorType === 'Elbow' || data.ConnectorType === 'Curved') {
            if (data.Point.length === 2) {

              // GPML specifies just the start and end points and assumes a programmatic
              // path finding algorithm will fill in the intermediate points, unless
              // the user explicitly sets the intermediate points by dragging the edge.

              // fill in intermediate points using default algorithmic layout

              pathvisiojs.view.pathwayDiagram.pathFinder.getPath(svg, data, function(convertedPointSet) {
                callback(null, convertedPointSet);
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
                if (Math.abs(data.Point[0].RelY) === 1) {
                  firstSegmentHorizontal = false;
                }
                else {
                  if ((Math.abs(data.Point[data.Point.length - 1].RelX) === 1) && pathvisiojs.utilities.isOdd(data.Point.length)) {
                    firstSegmentHorizontal = true;
                  }
                  else {
                    firstSegmentHorizontal = false;
                  }
                }
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
              callback(null, convertedPointSet);
            }
          }
          else {
            console.warn('Warning: pathvisiojs does not support connector type: ' + data.ConnectorType + '. Using linear interpolation as fallback.');
            callback(null, data.Point);
          }
        }
      }
    },
    function(err, results) {
    //*/
    'path': function() {
      edge.attr("id", edgeId)
      .attr("marker-start", markerStartAttributeValue)
      .attr("marker-end", markerEndAttributeValue)
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:#' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("fill", 'none')
      .attr("d", function (data) {
        return pathvisiojs.view.pathwayDiagram.svg.edge.path.getPath(data); //createPathDataString(results.convertedPointSet);
      });

     /****************** 
       * anchor(s) (note that this method is called from ...EDGE.render() but the result is to render a NODE)
       * ***************/

      if (data.hasOwnProperty('Anchor')) {
        pathvisiojs.view.pathwayDiagram.svg.node.anchor.render(container, edgeId, data.Anchor);
      }

      /****************** 
       * citation(s)
       * ***************/

      if (data.hasOwnProperty('PublicationXref')) {
        pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(edgeId, 'edge', pathway, data.PublicationXref);
        callback(edge);
      }
      else {
        callback(edge);
      }
    }
   }); //close async
  } //close function

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
    getPointAtPositionById:getPointAtPositionById
    //renderAll:renderAll
  };
}();
  
