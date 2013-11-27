// TODO Rewrite the code for getting elbow and curve edge points. For reference, see these links:
//
// Elbows:
// [PathVisio Java code for elbows](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisiojs.core/src/org/pathvisio/core/model/ElbowConnectorShape.java)
// [jsPlumb JavaScript implemention of elbows](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-flowchart.js)
// [W3C documention on vertical and horizontal path movement - "lineto" commands - for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
//
// Bezier Curves:
// [PathVisio Java code for cubic bezier curve](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisiojs.core/src/org/pathvisio/core/model/CurvedConnectorShape.java)
// [jsPlumb JavaScript implemention of bezier curves](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-bezier.js)
// [W3C documention on cubic bezier curves for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
// There are other types of SVG curves, but I understand the Java code to use bezier curves.

pathvisiojs.view.pathwayDiagram.svg.edge.pathData = function(){

  function getPathDirectionForElbowFromPoint(pathway, edge, point) {
    var direction, otherEndDirection, otherEndPoint;

    direction = getPathDirectionForElbowFromPointByAnchor(pathway, point); 
    if (!direction) {
      if (point === edge.points[0]) {
        otherEndPoint = edge.points[edge.points.length - 1];
      }
      else {
        otherEndPoint = edge.points[0];
      }

      otherEndDirection = getPathDirectionForElbowFromPointByAnchor(pathway, otherEndPoint); 
      if (!!otherEndDirection) {
        if (pathvisiojs.utilities.isOdd(edge.points.length)) {
          direction = switchDirection(otherEndDirection);
        }
        else {
          direction = otherEndDirection;
        }
      }
      else {
        direction = getPathDirectionForElbowFromPointByDistance(pathway, edge, point);
      }
    }
    return direction;
  }

  function getPathDirectionForElbowFromPointByAnchor(pathway, point) {
    var anchor = pathway.elements.filter(function(element) {return element.id === point.anchorId})[0];
    if (!!anchor) {
      if (Math.abs(anchor.dx) === 1 || Math.abs(anchor.dy) === 1) {
        if (Math.abs(anchor.dx) === 1) {
          direction = 'H';
        }
        else {
          if (Math.abs(anchor.dy) === 1) {
            direction = 'V';
          }
        }
      }
      else {
        direction = undefined;
      }
    }
    else {
      direction = undefined;
    }
    return direction;
  }

  function getPathDirectionForElbowFromPointByDistance(pathway, edge, point) {
    var direction, comparisonPoint;
    if (point === edge.points[0]) {
      comparisonPoint = edge.points[1];
    }
    else {
      comparisonPoint = edge.points[edge.points.length - 1];
    }
    if (Math.abs(comparisonPoint.x - point.x) < Math.abs(comparisonPoint.y - point.y)) {
      direction = 'V';
    }
    else {
      direction = 'H';
    }
    return direction;
  }

  function switchDirection(currentDirection) {
    currentDirection = currentDirection.toUpperCase();
    if (currentDirection === 'H') {
      return 'V';
    }
    else {
      return 'H';
    }
  }

  function get(viewport, pathway, edge, callback) {
    if (!viewport || !edge) {
      return console.warn('Error: Missing input parameters.');
    }


    var currentDirection, startDirection, endDirection, controlPoint, index;
    var pointStart = edge.points[0];
    var source = pathvisiojs.view.pathwayDiagram.svg.edge.point.getCoordinates(viewport, pathway, pointStart);

    var pointCoordinatesArray = self.pointCoordinatesArray = [];
    var pointCoordinates;
    edge.points.forEach(function(element) {
      pointCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.point.getCoordinates(viewport, pathway, element);
      pointCoordinatesArray.push(pointCoordinates)
    })

    if (pointStart.dx === undefined) {
      source.dx = 0;
    }
    else {
      source.dx = pointStart.dx;
    }

    if (pointStart.dy === undefined) {
      source.dy = 0;
    }
    else {
      source.dy = pointStart.dy;
    }

    var pointEnd = edge.points[edge.points.length - 1];
    var target = pathvisiojs.view.pathwayDiagram.svg.edge.point.getCoordinates(viewport, pathway, pointEnd);

    if (pointEnd.dx === undefined) {
      target.dx = 0;
    }
    else {
      target.dx = pointEnd.dx;
    }

    if (pointEnd.dy === undefined) {
      target.dy = 0;
    }
    else {
      target.dy = pointEnd.dy;
    }

    var pathData = 'M ' + source.x + ' ' + source.y;

    if ((!edge.connectorType) || (edge.connectorType === undefined) || (edge.connectorType === 'straight')) {
      pathData += " L " + target.x + " " + target.y;
      callback(pathData);
    }
    else {
      if (edge.connectorType === 'elbow') {

        // distance to move away from node when we can't go directly to the next node

        var stubLength = 15;

        startDirection = getPathDirectionForElbowFromPoint(pathway, edge, pointStart);
        console.log(startDirection);
        currentDirection = startDirection;
        endDirection = getPathDirectionForElbowFromPoint(pathway, edge, pointEnd);

        var pathCoordinatesArray = [];


        async.series([
          function(callbackInside){
            if (edge.points.length === 2) {
              pathvisiojs.view.pathwayDiagram.pathFinder.getPath(pathway, edge, function(data) {
                pathCoordinatesArray = data;
                callbackInside(null);
              });
            }
            else {
              pathCoordinatesArray.push({
                'x': pointStart.x,
                'y': pointStart.y
              });

              index = 0;
              do {
                index += 1;

                if (currentDirection === 'H') {
                  pathCoordinatesArray.push({
                    'x': edge.points[index].x,
                    'y': edge.points[index - 1].y
                  });
                }
                else {
                  pathCoordinatesArray.push({
                    'x': edge.points[index - 1].x,
                    'y': edge.points[index].y
                  });
                }
                currentDirection = switchDirection(currentDirection);
              } while (index < edge.points.length - 1);

              pathCoordinatesArray.push({
                'x': pointEnd.x,
                'y': pointEnd.y
              });
              callbackInside(null);
            }
          }
        ],
        function(err) {
          // reposition start and end point to match source and origin

          if (pathCoordinatesArray.length === 3) {
            if (Math.abs(pathCoordinatesArray[1].x - pointStart.x) < Math.abs(pathCoordinatesArray[1].x - pointEnd.x)) {
              pathCoordinatesArray[1].x = pointStart.x;
              pathCoordinatesArray[1].y = pointEnd.y;
            }
            else {
              pathCoordinatesArray[1].x = pointEnd.x;
              pathCoordinatesArray[1].y = pointStart.y;
            }
          }
          else {
            if (Math.abs(pathCoordinatesArray[1].x - pointStart.x) < Math.abs(pathCoordinatesArray[1].y - pointStart.y)) {
              pathCoordinatesArray[1].x = pointStart.x;
            }
            else {
              pathCoordinatesArray[1].y = pointStart.y;
            }

            if (Math.abs(pathCoordinatesArray[pathCoordinatesArray.length - 2].x - pointEnd.x) < Math.abs(pathCoordinatesArray[pathCoordinatesArray.length - 2].y - pointEnd.y)) {
              pathCoordinatesArray[pathCoordinatesArray.length - 2].x = pointEnd.x;
            }
            else {
              pathCoordinatesArray[pathCoordinatesArray.length - 2].y = pointEnd.y;
            }
          }

          if (startDirection === 'H') {
            pathCoordinatesArray[1].y = pointStart.y;
          }
          else {
            if (startDirection === 'V') {
              pathCoordinatesArray[1].x = pointStart.x;
            }
          }

          if (endDirection === 'H') {
            pathCoordinatesArray[pathCoordinatesArray.length - 2].y = pointEnd.y;
          }
          else {
            if (endDirection === 'V') {
              pathCoordinatesArray[pathCoordinatesArray.length - 2].x = pointEnd.x;
            }
          }

                console.log('pathCoordinatesArray');
                console.log(pathCoordinatesArray);
                self.pathCoordinatesArray = pathCoordinatesArray;
          index = 0;
          do {
            index += 1;
            pathData += ' L ' + pathCoordinatesArray[index].x + ' ' + pathCoordinatesArray[index].y;
          } while (index < pathCoordinatesArray.length - 1);
                console.log('pathData');
                console.log(pathData);
                callback(pathData);

        });











      }
      else {
        if (edge.connectorType === 'segmented') {
          edge.points.forEach(function(element, index, array) {
            if ((index > 0) && (index < (array.length -1))) {
              pathData += " L " + element.x + " " + element.y;
            }
          });
          pathData += " L " + target.x + " " + target.y;
          callback(pathData);
        }
        else {
          if (edge.connectorType === 'curved') {


            if (edge.points.length === 2) {
              pathCoordinatesArray = pathvisiojs.view.pathwayDiagram.pathFinder.getPath(pathway, edge);
            }
            else {
              pathCoordinatesArray = edge.points;
            }


            pathCoordinatesArray.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                target.x = (array[index].x + array[index - 1].x)/2;
                target.y = (array[index].y + array[index - 1].y)/2;
                pathData += " T" + target.x + "," + target.y;
              }
            });

            pathData += " T" + pathCoordinatesArray[pathCoordinatesArray.length - 1].x + "," + pathCoordinatesArray[pathCoordinatesArray.length - 1].y;
            callback(pathData);

            /*

            controlPoint = {};
            pathCoordinatesArray.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                controlPoint.x = element.x;
                controlPoint.y = element.y;
                target.x = (array[index].x + array[index - 1].x)/2;
                target.y = (array[index].y + array[index - 1].y)/2;
                pathData += " S" + controlPoint.x + "," + controlPoint.y + " " + target.x + "," + target.y;
              }
            });

            pathData += " S" + controlPoint.x + "," + controlPoint.y + " " + pathCoordinatesArray[pathCoordinatesArray.length - 1].x + "," + pathCoordinatesArray[pathCoordinatesArray.length - 1].y;
//*/

            /*
            if (edge.points.length === 3) {

              // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

              var controlPoint = edge.points[1];

              pathData += " S" + controlPoint.x + "," + controlPoint.y + " " + target.x + "," + target.y;
              return pathData;
            }
            else {

              // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

              pathData += " T" + target.x + "," + target.y;
              return pathData;
            }
            //*/
            



          }
          else {
            console.log('Warning: pathvisiojs does not support connector type: ' + edge.connectorType);
            edge.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length -1))) {
                pathData += " L " + element.x + " " + element.y;
              }
            });
            pathData += " L " + target.x + " " + target.y;
            callback(pathData);
          }
        }
      }
    }
    /*
    console.log('returned pathData');
    console.log(pathData);
    return pathData;
    //*/
  }

  return {
    get:get
  };
}();
