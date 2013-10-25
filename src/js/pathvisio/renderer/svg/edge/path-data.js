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

pathvisio.pathway.edge.pathData = function(){

  var currentDirection = null;

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

    var sourcePoint = edge.points[0];
    var source = pathvisio.pathway.edge.point.getCoordinates(svg, pathway, sourcePoint);

    self.points = edge.points;

    var pointCoordinatesArray = self.pointCoordinatesArray = [];
    var pointCoordinates;
    edge.points.forEach(function(element) {
      pointCoordinates = pathvisio.pathway.edge.point.getCoordinates(svg, pathway, element);
      pointCoordinatesArray.push(pointCoordinates)
    })

    if (sourcePoint.dx === undefined) {
      source.dx = 0;
    }
    else {
      source.dx = sourcePoint.dx;
    }

    if (sourcePoint.dy === undefined) {
      source.dy = 0;
    }
    else {
      source.dy = sourcePoint.dy;
    }

    var targetPoint = edge.points[edge.points.length - 1];
    var target = pathvisio.pathway.edge.point.getCoordinates(svg, pathway, targetPoint);

    if (targetPoint.dx === undefined) {
      target.dx = 0;
    }
    else {
      target.dx = targetPoint.dx;
    }

    if (targetPoint.dy === undefined) {
      target.dy = 0;
    }
    else {
      target.dy = targetPoint.dy;
    }

    var pathData = 'M ' + source.x + ' ' + source.y;

    if ((!edge.connectorType) || (edge.connectorType === undefined) || (edge.connectorType === 'straight')) {
      pathData += " L " + target.x + " " + target.y;
    }
    else {

      // just a start for the elbow connector type. still need to consider several other potential configurations.
      // It doesn't make sense for an unconnected interaction or graphical line to be an elbow, so any that are
      // so specified will be drawn as segmented lines.

      if (edge.connectorType === 'elbow' && edge.points[0].hasOwnProperty('graphRef') && edge.points[edge.points.length - 1].hasOwnProperty('graphRef')) {

        // distance to move away from node when we can't go directly to the next node

        var stubLength = 15;

        if (Math.abs(source.dx) === 1) {
          currentDirection = 'H';
        }
        else {
          currentDirection = 'V';
        }

        // first segment

        console.log('test');
console.log((((pointCoordinatesArray[1].x - pointCoordinatesArray[0].x)/Math.abs(pointCoordinatesArray[1].x - pointCoordinatesArray[0].x) !== edge.points[0].dx) || (edge.points.length === 2)));

        if (edge.points[0].hasOwnProperty('dx')) {
          // if the target is closer to the source than stubLength
          if (Math.abs(pointCoordinatesArray[1].x - pointCoordinatesArray[0].x) < stubLength) {
            pathData += ' ' + currentDirection.toLowerCase() + ' ' + String((pointCoordinatesArray[1].x - pointCoordinatesArray[0].x)/2);
          }
          else {
            if (((pointCoordinatesArray[1].x - pointCoordinatesArray[0].x)/Math.abs(pointCoordinatesArray[1].x - pointCoordinatesArray[0].x) !== edge.points[0].dx) || (edge.points.length === 2)) {
              pathData += ' ' + currentDirection.toLowerCase() + ' ' + String((-1) * edge.points[0].dx * stubLength);
            }
            else {
              pathData += ' ' + currentDirection.toUpperCase() + ' ' + pointCoordinatesArray[1].x;
            }
          }





        }
        else {
          // if the target is closer to the source than stubLength
          if (Math.abs(pointCoordinatesArray[1].y - pointCoordinatesArray[0].y) < stubLength) {
            pathData += ' ' + currentDirection.toLowerCase() + ' ' + String((pointCoordinatesArray[1].y - pointCoordinatesArray[0].y)/2);
          }
          else {
            if (((pointCoordinatesArray[1].y - pointCoordinatesArray[0].y)/Math.abs(pointCoordinatesArray[1].y - pointCoordinatesArray[0].y) !== edge.points[0].dy) || (edge.points.length === 2)) {
              pathData += ' ' + currentDirection.toLowerCase() + ' ' + String((-1) * edge.points[0].dy * stubLength);
            }
            else {
              pathData += ' ' + currentDirection.toUpperCase() + ' ' + pointCoordinatesArray[1].y;
            }
          }
        }

        // above doesn't quite work yet, so below works for most cases

        /*
        if (( edge.points.length === 2 && pathvisio.pathway.edge.point.isTwoPointElbow(source, target)) ) {
        }
        else {
          if ( edge.points.length > 2 ) {
            edge.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                if (currentDirection === 'H') {
                  pathData += ' ' + currentDirection + ' ' + element.x;
                }
                else {
                  pathData += ' ' + currentDirection + ' ' + element.y;
                }
                currentDirection = switchDirection(currentDirection);
              }
            });
          }
          else {
            //if (source.dx === ((source.x - target.x) / Math.abs(source.x - target.x)) || source.dx === target.dy || source.dy === target.dx) {
            if (Math.abs(source.dx) === 1) {
              pathData += " H " + (source.x + source.dx * 15);
            }
            else {
              //if (source.dy === ((source.y - target.y) / Math.abs(source.y - target.y)) || source.dx === target.dy || source.dy === target.dx) {
              if (Math.abs(source.dy) === 1) {
                pathData += " V " + (source.y + source.dy * 15);
                currentDirection = switchDirection(currentDirection);
              }
            }

            if (target.dx === ((target.x - source.x) / Math.abs(target.x - source.x)) || source.dx === target.dy || source.dy === target.dx) {
              //if (Math.abs(target.dx) === 1) {
              pathData += " H " + (target.x + target.dx * 15) + ' V ' + target.y + ' H ' + target.x;
              currentDirection = switchDirection(currentDirection);
            }
            else {
              if (target.dy === ((target.y - source.y) / Math.abs(target.y - source.y)) || source.dx === target.dy || source.dy === target.dx) {
                //if (Math.abs(target.dy) === 1) {
                pathData += " V " + (target.y + target.dy * 15) + ' H ' + target.x + ' V ' + target.y;
                currentDirection = switchDirection(currentDirection);
              }
            }
          }
        }

        if (currentDirection === 'H') {
          pathData += ' ' + currentDirection + ' ' + target.x;
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.y;
          currentDirection = switchDirection(currentDirection);
        }
        else {
          pathData += ' ' + currentDirection + ' ' + target.y;
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.x;
          currentDirection = switchDirection(currentDirection);
        }
//*/
        /*
           if (Math.abs(target.dx) === 1) {
           pathData += " V " + target.y + " H " + target.x;
           console.log('pathData');
           console.log(pathData);
           }
           else {
           pathData += " H " + target.x + " V " + target.y;
           console.log('pathData');
           console.log(pathData);
           }
           */
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
            if (edge.points.length === 3) {

              // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

              var pointControl = edge.points[1];

              pathData += " S" + pointControl.x + "," + pointControl.y + " " + target.x + "," + target.y;
              return pathData;
            }
            else {

              // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

              pathData += " T" + target.x + "," + target.y;
              return pathData;
            }
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
