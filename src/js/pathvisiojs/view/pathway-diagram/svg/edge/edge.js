// Edges (interactions and graphical lines)

pathvisiojs.view.pathwayDiagram.svg.edge = function(){
  function render(parent, data) {
    console.log('parent');
    console.log(parent);
    console.log('data');
    console.log(data);

    // defining this function inside the render function, because I don't know how else
    // to pass the data value to a d3.call() function

    function setAttributes(edge) {
        var createPathDataString = d3.svg.line()
        .x(function(data) { return data.x; })
        .y(function(data) { return data.y; });

        //*


    async.series({
      'fullPointSetAndStepType': function(callback) {

        // in GPML, some points are implied, such as for many curves and elbows with only two points.
        // This code below fills in the implied points, returning the full set of points.

        var stepType, index, horizontal,
        fullPointSet = [];

        if ((!data.ConnectorType) || (data.ConnectorType === undefined) || (data.ConnectorType === 'Straight') || (data.ConnectorType === 'Segmented')) {
          stepType = 'linear';
          callback(null, {'fullPointSet': data.Point, 'stepType': stepType});
        }
        else {
          if (data.ConnectorType === 'Elbow' || data.ConnectorType === 'Curved') {
            if (data.ConnectorType === 'Elbow') {
              if (data.RelY === '-1.0' || data.RelY === '1.0') {
                stepType = 'step-before';
              }
              else {
                stepType = 'step-after';
              }
            }
            else {
              if (data.ConnectorType === 'Curved') {
                stepType = 'basis';
              }
            }

            if (data.Point.length === 2) {
              pathvisiojs.view.pathwayDiagram.pathFinder.getPath(data, function(fullPointSet) {
                callback(null, {'fullPointSet': fullPointSet, 'stepType': stepType});
              });
            }
            else {
              if (Math.abs(data.Point[0].RelX) === 1) {
                horizontal = true;
              }
              else {
                horizontal = false;
              }

              fullPointSet.push(data.Point[0]);

              index = 0;
              do {
                index += 1;

                if (horizontal) {
                  fullPointSet.push({
                    'x':data.Point[index].x,
                    'y':data.Point[index - 1].y
                  });
                }
                else {
                  fullPointSet.push({
                    'x':data.Point[index - 1].x,
                    'y':data.Point[index].y
                  });
                }

                horizontal = !horizontal;

              } while (index < data.Point.length - 1);

              fullPointSet.push(data.Point[data.Point.length - 1]);
              callback(null, {'fullPointSet': fullPointSet, 'stepType': stepType});
            }
          }
          else {
            console.warn('Warning: pathvisiojs does not support connector type: ' + data.ConnectorType + '. Using linear interpolation as fallback.');
            stepType = 'linear';
            callback(null, {'fullPointSet': data.Point, 'stepType': stepType});
          }
        }
      }
    },
    function(err, results) {

          //*/

          edge.attr("id", function(data) { return strcase.paramCase(data.GraphId); })
          .attr("class", function (data) {
            var styleClass = 'edge ';
            if (!!data.DatasourceReference) {
              styleClass += 'annotated-interaction ';
            }
            else {
              styleClass += strcase.paramCase(data.edgeType) + ' ';
            }
            if (data.hasOwnProperty('strokeStyle')) {
              if (data.strokeStyle === 'dashed') {
                styleClass += " dashed-stroke";
              }
            }
            return styleClass;
          })
          .attr('transform', function() {
            var parentElement = {}
            if (parent[0][0].hasOwnProperty('__data__')) {
              parentElement.x = (parent[0][0].__data__.x);
              parentElement.y = (parent[0][0].__data__.y);
            }
            else {
              parentElement.x = 0;
              parentElement.y = 0;
            }
            return 'translate(' + (-1*parentElement.x) + ' ' + (-1*parentElement.y) + ')';
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
          //*/
          .attr("marker-end", function (data) {
            // TODO don't redefine svg
            var svg = d3.select('#svg');
            var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, strcase.paramCase(data.interactionType), 'end', data.stroke);
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

          //.attr("d", pathData)
            //*
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

              createPathDataString.interpolate(results.fullPointSetAndStepType.stepType);

              return createPathDataString(results.fullPointSetAndStepType.fullPointSet);
            });
          });
      }

    var edge = parent.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .enter().append("path")
    .call(setAttributes);

    /*
    // Update…
    var edge = parent.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .call(setAttributes);

    // Enter…
    edge.enter().append("path")
    .call(setAttributes);

    // Exit…
    edge.exit().remove();
    //*/

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
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var styleClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke";
          }
        }
        return styleClass;
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


  return {
    render:render,
    renderAll:renderAll
  };
}();
  
