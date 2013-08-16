pathvisio.edges.pathData = function(){ 
  function get(d, labelableElements) {
    var sourcePoint = d.points[0];
    var source = pathvisio.edges.endPoints.getCoordinates(sourcePoint);

    if (sourcePoint.dx === undefined) {
      source.dx = 0;
    }
    else { 
      source.dx = sourcePoint.dx;
    };

    if (sourcePoint.dy === undefined) {
      source.dy = 0;
    }
    else { 
      source.dy = sourcePoint.dy;
    };

    var targetPoint = d.points[d.points.length - 1];
    var target = pathvisio.edges.endPoints.getCoordinates(targetPoint);

    if (targetPoint.dx === undefined) {
      target.dx = 0;
    }
    else { 
      target.dx = targetPoint.dx;
    };

    if (targetPoint.dy === undefined) {
      target.dy = 0;
    }
    else { 
      target.dy = targetPoint.dy;
    };

    var pathData = 'M ' + source.x + ' ' + source.y;

    if ((!d.connectorType) || (d.connectorType === undefined) || (d.connectorType === 'straight')) {
      pathData += " L " + target.x + " " + target.y; 
    }
    else {

      // just a start for the elbow connector type. still need to consider several other potential configurations.
      // It doesn't make sense for an unconnected interaction or graphical line to be an elbow, so any that are
      // so specified will be drawn as segmented lines.

      if (d.connectorType === 'elbow' && d.points[0].hasOwnProperty('graphRef') && d.points[d.points.length - 1].hasOwnProperty('graphRef')) {

        function switchDirection(currentDirection) {
          if (currentDirection === 'H') {
            return 'V';
          }
          else {
            return 'H';
          };
        };

        // distance to move away from node when we can't go directly to the next node

        var step = 15;

        if (Math.abs(source.dx) === 1) {
          currentDirection = 'H';
        }
        else {
          currentDirection = 'V';
        };

        //if (d.points.length === 2) {
        //doesn't quite work yet, so this works for most cases

        if (( d.points.length === 2 && pathvisio.edges.endPoints.isTwoPointElbow(source, target)) ) {
        }
        else {
          if ( d.points.length > 2 ) {
            d.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                if (currentDirection === 'H') {
                  pathData += ' ' + currentDirection + ' ' + element.x; 
                }
                else {
                  pathData += ' ' + currentDirection + ' ' + element.y; 
                };
                currentDirection = switchDirection(currentDirection);
              };
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
              };
            };

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
              };
            };
          };
        };

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
        };

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
           };
           */
      }
      else {
        if (d.connectorType === 'segmented') {
          d.points.forEach(function(element, index, array) {
            if ((index > 0) && (index < (array.length -1))) {
              pathData += " L " + element.x + " " + element.y; 
            };
          });
          pathData += " L " + target.x + " " + target.y; 
        }
        else {
          if (d.connectorType === 'curved') {
            if (d.points.length === 3) {

              // see here for PathVisio (Java) code for cubic bezier curve
              // http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/CurvedConnectorShape.java

              // and see W3C documention on cubic bezier curves for SVG:
              // http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands

              // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

              var pointControl = d.points[1];

              pathData += " S" + pointControl.x + "," + pointControl.y + " " + target.x + "," + target.y; 
              return pathData;
            }
            else {

              // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

              pathData += " T" + target.x + "," + target.y; 
              return pathData;
            };
          }
          else {
            console.log('Warning: pathvisio.js does not support connector type: ' + d.connectorType);
            d.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length -1))) {
                pathData += " L " + element.x + " " + element.y; 
              };
            });
            pathData += " L " + target.x + " " + target.y; 
          };
        };
      };
    };
    return pathData;
  };
 
  return { 
    get:get 
  } 
}();
