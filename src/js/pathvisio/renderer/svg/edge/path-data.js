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

      // just a start for the elbow connector type. still need to consider several other potential configurations.
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
            console.log(startAnchor.dx);
            console.log(startAnchor.dy);
        }
        else {
          if (Math.abs(startAnchor.dy) === 1) {
            startDirection = 'V';
            console.log(startAnchor.dx);
            console.log(startAnchor.dy);
          }
          else {
            console.log('no direction specified.');
            console.log(startAnchor.dx);
            console.log(startAnchor.dy);
          }
        }
        
        currentDirection = startDirection;

        var endAnchor = pathway.elements.filter(function(element) {return element.id === pointEnd.anchorId})[0];
        self.endAnchor = endAnchor;

        if (Math.abs(endAnchor.dx) === 1) {
          endDirection = 'H';
            console.log(endAnchor.dx);
            console.log(endAnchor.dy);
        }
        else {
          if (Math.abs(endAnchor.dy) === 1) {
            endDirection = 'V';
            console.log(endAnchor.dx);
            console.log(endAnchor.dy);
          }
          else {
            console.log('no direction specified.');
            console.log(endAnchor.dx);
            console.log(endAnchor.dy);
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


          ///*
          if (startDirection === 'H') {
            pathCoordinatesArray[1].y = pointStart.y;
          }
          else {
            if (startDirection === 'V') {
              pathCoordinatesArray[1].x = pointStart.x;
            }
          }
          //*/

          ///*
          if (endDirection === 'H') {
            pathCoordinatesArray[pathCoordinatesArray.length - 2].y = pointEnd.y;
          }
          else {
            if (endDirection === 'V') {
              pathCoordinatesArray[pathCoordinatesArray.length - 2].x = pointEnd.x;
            }
          }
          //*/

          index = 0;
          do {
            index += 1;
            pathData += ' L ' + pathCoordinatesArray[index].x + ' ' + pathCoordinatesArray[index].y;
            console.log(pathData);
          } while (index < pathCoordinatesArray.length - 1);



        //*/

        ///*
           //else {
           //if ( edge.points.length > 2 ) {

           /*
          var pathCoordinatesArray = pathvisio.renderer.pathFinder.getPath(pathway, edge);
           pathCoordinatesArray.forEach(function(element, index, array) {
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
           pathData += ' L ' + target.x + ' ' + target.y;
           /*
           if (currentDirection === 'H') {
             pathData += ' H ' + target.x + ' V ' + target.y;
           }
           else {
             pathData += ' V ' + target.y + ' H ' + target.x;
           }
           //*/

         //  }
           //}

        // above doesn't quite work yet, so below works for most cases

        /*
        if (( edge.points.length === 2 && pathvisio.renderer.svg.edge.point.isTwoPointElbow(source, target)) ) {
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
