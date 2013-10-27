// TODO Rewrite the code for getting elbow and curve edge points. For reference, see these links:
//
// Elbows:
// [PathVisio Java code for elbows](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/ElbowConnectorShape.java)
// [jsPlumb JavaScript implemention of elbows](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-flowchart.js)
// [W3C documention on vertical and horizontal path movement - "lineto" commands - for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
//
// Bezier Curves:
// [PathVisio Java code for cubic bezier curve](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/CurvedConnectorShape.java)
// [jsPlumb JavaScript implemention of bezier curves](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-bezier.js)
// [W3C documention on cubic bezier curves for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
// There are other types of SVG curves, but I understand the Java code to use bezier curves.

pathvisio.renderer.svg.edge.pathData = function(){

  var currentDirection, startDirection, endDirection, controlPoint;

  function switchDirection(currentDirection) {
    currentDirection = currentDirection.toUpperCase();
    if (currentDirection === 'H') {
      return 'V';
    }
    else {
      return 'H';
    }
  }

  function get(svg, pathway, edge) {
    if (!svg || !edge) {
      return console.warn('Error: Missing input parameters.');
    }

    var index;
    var pointStart = edge.points[0];
    var source = pathvisio.renderer.svg.edge.point.getCoordinates(svg, pathway, pointStart);

    self.points = edge.points;

    var pointCoordinatesArray = self.pointCoordinatesArray = [];
    var pointCoordinates;
    edge.points.forEach(function(element) {
      pointCoordinates = pathvisio.renderer.svg.edge.point.getCoordinates(svg, pathway, element);
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
    var target = pathvisio.renderer.svg.edge.point.getCoordinates(svg, pathway, pointEnd);

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
    }
    else {

      // It doesn't make sense for an unconnected interaction or graphical line to be an elbow, so any that are
      // so specified will be rendern as segmented lines.

      if (edge.connectorType === 'elbow' && edge.points[0].hasOwnProperty('anchorId') && edge.points[edge.points.length - 1].hasOwnProperty('anchorId')) {
        var startAnchor = pathway.elements.filter(function(element) {return element.id === edge.points[0].anchorId})[0];
        self.startAnchor = startAnchor;
        self.edge = edge;

        // distance to move away from node when we can't go directly to the next node

        var stubLength = 15;

        if (Math.abs(startAnchor.dx) === 1) {
          startDirection = 'H';
        }
        else {
          if (Math.abs(startAnchor.dy) === 1) {
            startDirection = 'V';
          }
          else {
            console.log('no direction specified.');
          }
        }

        currentDirection = startDirection;

        var endAnchor = pathway.elements.filter(function(element) {return element.id === pointEnd.anchorId})[0];
        self.endAnchor = endAnchor;

        if (Math.abs(endAnchor.dx) === 1) {
          endDirection = 'H';
        }
        else {
          if (Math.abs(endAnchor.dy) === 1) {
            endDirection = 'V';
          }
          else {
            console.log('no direction specified.');
          }
        }

        ///*

        var pathCoordinatesArray = [];
        if (edge.points.length === 2) {
          pathCoordinatesArray = pathvisio.renderer.pathFinder.getPath(pathway, edge);
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
        }

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

        index = 0;
        do {
          index += 1;
          pathData += ' L ' + pathCoordinatesArray[index].x + ' ' + pathCoordinatesArray[index].y;
        } while (index < pathCoordinatesArray.length - 1);

      }
      else {
        if (edge.connectorType === 'segmented') {
          edge.points.forEach(function(element, index, array) {
            if ((index > 0) && (index < (array.length -1))) {
              pathData += " L " + element.x + " " + element.y;
            }
          });
          pathData += " L " + target.x + " " + target.y;
        }
        else {
          if (edge.connectorType === 'curved') {


            if (edge.points.length === 2) {
              pathCoordinatesArray = pathvisio.renderer.pathFinder.getPath(pathway, edge);
              console.log(pathCoordinatesArray);
            }
            else {
              pathCoordinatesArray = edge.points;
            }


            pathCoordinatesArray.forEach(function(element, index, array) {
              console.log(element);
              if ((index > 0) && (index < (array.length - 1))) {
                target.x = (array[index].x + array[index - 1].x)/2;
                target.y = (array[index].y + array[index - 1].y)/2;
                pathData += " T" + target.x + "," + target.y;
              }
            });

            pathData += " T" + pathCoordinatesArray[pathCoordinatesArray.length - 1].x + "," + pathCoordinatesArray[pathCoordinatesArray.length - 1].y;

            /*

            controlPoint = {};
            pathCoordinatesArray.forEach(function(element, index, array) {
              console.log(element);
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
            console.log('Warning: pathvisio.js does not support connector type: ' + edge.connectorType);
            edge.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length -1))) {
                pathData += " L " + element.x + " " + element.y;
              }
            });
            pathData += " L " + target.x + " " + target.y;
          }
        }
      }
    }
    return pathData;
  }

  return {
    get:get
  };
}();
