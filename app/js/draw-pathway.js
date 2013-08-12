function clone(selector) {
  var node = d3.select(selector).node();
  return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
};

function getURLParameter(name) {

  // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
  // This will be replaced once we get the backend php to get the json

  var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  if (parameter !== null) {
    return parameter;
  }
  else {
    return "WP673_63184";
  };
}

function splitTextByLines(text) {

  // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.

  return text.split(/\r\n|\r|\n/g);
};

function getMarker(name, position, color) {
  var markerName = '';
  if (name === 'none') {
    markerName = name;
  }
  else {

    // if it's black, use the default

    if ( (color === '#000') || (color === '#000000') || (!(color)) ) {
      markerName = name + '-' + position + '-black';
    }

    // else create a new marker with the desired color

    else {
      var svg = d3.select("#pathway-container").select(function() {
        return this.contentDocument.documentElement;
      });

      var markerElementBlack = svg.select('marker#' + name + '-' + position + '-black');

      var markerElement = clone(markerElementBlack[0][0]);

      // define style of marker element

      var markerElementStyle = '';

      if (markerElement[0][0].getAttribute('stroke') === 'black') {
        markerElementStyle += 'stroke:' + color + '; ';
      };

      if (markerElement[0][0].getAttribute('fill') === 'black') {
        markerElementStyle += 'fill:' + color + '; ';
      };

      markerElement[0][0].setAttribute('id', name + '-' + position + '-' + color );
      markerElement[0][0].setAttribute('style', markerElementStyle);

      markerName = name + '-' + position + '-' + color;
    };
  };
  return markerName;
};

function getEdgeTerminusRef(point) {
  self.point=point;
  if (point.hasOwnProperty('graphRef')) {
    if (pathway.hasOwnProperty('labelableElements')) {
      var labelableElement = pathway.labelableElements.filter(function(element) {return element.graphId === point.graphRef})[0]
      if (labelableElement !== undefined) {
        return {'type':'labelableElement', 'element':labelableElement};
      };
    };

    if (pathway.hasOwnProperty('groups')) {
      var group = pathway.groups.filter(function(element) {return element.graphId === point.graphRef})[0]
      if (group !== undefined) {
        return {'type':'group', 'groupId':group.groupId};
      };
    };

    var edgesWithAnchors = pathway.edges.filter(function(element) {return element.hasOwnProperty('anchors')})
    var i = -1;
    do {
      i += 1;
      var anchor = edgesWithAnchors[i].anchors.filter(function(element) {return element.graphId === point.graphRef})[0]
    } while (anchor === undefined && i < edgesWithAnchors.length);

    return {'type':'anchor', 'element':anchor, 'edge':edgesWithAnchors[i]};

  }
  else {
    return {'type':'unconnected'};
  };
};

function getGroupDimensions(groupId) {
  var groupMembers = pathway.labelableElements.filter(function(el) {return (el.groupRef === groupId)});
  var group = {};

  // I think this is margin, not padding, but I'm not sure

  var margin = 12;
  group.x = (d3.min(groupMembers, function(el) {return el.x})) - margin;
  group.y = (d3.min(groupMembers, function(el) {return el.y})) - margin;

  group.width = (d3.max(groupMembers, function(el) {return el.x + el.width})) - group.x + margin;
  group.height = (d3.max(groupMembers, function(el) {return el.y + el.height})) - group.y + margin;

  return group;
};

function getBBoxPortCoordinates(boxDimensions, relX, relY) {
  var port = {};
  port.x = boxDimensions.x + (relX * boxDimensions.width);
  port.y = boxDimensions.y + (relY * boxDimensions.height);
  return port;
};

function getEdgeTerminusCoordinatesNonAnchor(point) {
  var coordinates = {};
  var edgeTerminusRef = getEdgeTerminusRef(point);
  if (edgeTerminusRef.type === 'unconnected') {
    coordinates.x = point.x;
    coordinates.y = point.y;
    return coordinates;
  }
  else {
    if (edgeTerminusRef.type === 'labelableElement') {
      var coordinates = getBBoxPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
      return coordinates;
    }
    else {
      if (edgeTerminusRef.type === 'group') {
        var groupDimensions = getGroupDimensions(edgeTerminusRef.groupId);
        var coordinates = getBBoxPortCoordinates(groupDimensions, point.relX, point.relY);
        return coordinates;
      }
      else {
        return 'error';
      };
    };
  };
};

function getEdgeTerminusCoordinates(point) {
  var coordinates = {};
  var edgeTerminusRef = getEdgeTerminusRef(point);
  if (edgeTerminusRef.type !== 'anchor') {
    return getEdgeTerminusCoordinatesNonAnchor(point);
  }
  else {

    // this needs work to do more than one level deep of anchors

    secondarySourcePoint = edgeTerminusRef.edge.points[0];
    secondaryTargetPoint = edgeTerminusRef.edge.points[edgeTerminusRef.edge.points.length - 1];

    if (getEdgeTerminusRef(secondarySourcePoint).type !== 'anchor' && getEdgeTerminusRef(secondaryTargetPoint).type !== 'anchor') {
      secondarySourcePointCoordinates = getEdgeTerminusCoordinatesNonAnchor(secondarySourcePoint);
      secondaryTargetPointCoordinates = getEdgeTerminusCoordinatesNonAnchor(secondaryTargetPoint);

      coordinates.x = secondarySourcePointCoordinates.x + edgeTerminusRef.element.position * ( secondaryTargetPointCoordinates.x - secondarySourcePointCoordinates.x );
      coordinates.y = secondarySourcePointCoordinates.y + edgeTerminusRef.element.position * ( secondaryTargetPointCoordinates.y - secondarySourcePointCoordinates.y );

      return coordinates;
    };
  };
};

function isTwoPointElbow(source, target) {
  var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) ); 
  var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
  var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
  return ( isRightAngle && sourcePasses && targetPasses );
};

function getPathData(d, labelableElements) {
  var sourcePoint = d.points[0];
  var source = getEdgeTerminusCoordinates(sourcePoint);

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
  var target = getEdgeTerminusCoordinates(targetPoint);

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

      if (( d.points.length === 2 && isTwoPointElbow(source, target)) ) {
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

function drawPathway() {
  // be sure server has set gpml mime type to application/gpml+xml
  //d3.xml("../../samples/gpml/" + String(getURLParameter("pathway")), "application/gpml+xml", function(response) {
  //d3.xml("../../samples/gpml/" + getURLParameter("pathway"), "application/gpml+xml", function(error, response) {
  //d3.json("../../samples/gpml/WP673_63184.json", function(error, json) {

  var gpml = document.getElementsByTagName('pathway')[0];
  console.log('gpml1');
  console.log(gpml);

  /*
  var parser = new DOMParser();
  var gpmlDoc = parser.parseFromString(gpmlStr, "application/xml");
  self.gpmlDoc = gpmlDoc;
  var gpml = gpmlDoc.documentElement;
*/

  var pathway = convertGpml2Json(gpml);
  //getJson(gpml, function(pathway) {

  var drag = d3.behavior.drag()
  .on("drag", dragmove);

  function dragmove(d) {
      d.x=d3.event.x;
      d.y=d3.event.y;
      d3.select(this)
      .attr("x", d3.event.x)
      .attr("y", d3.event.y);
  }	

  var svg = d3.select("#pathway-container").select(function() {
    return this.getSVGDocument().documentElement;
  });

  svg.attr('width', pathway.boardWidth);
  svg.attr('height', pathway.boardHeight);

  var symbolsAvailable = svg.selectAll('symbol');
  var markersAvailable = svg.selectAll('marker');

  // Interactions

  var pathData = null;

  var edges = svg.selectAll("pathway.edge")
  .data(pathway.edges)
  .enter()
  .append("path")
  .attr("id", function (d) { return d.edgeType + '-' + d.graphId; })
  .attr("class", function (d) { 
    var styleClass = 'edge ' + d.edgeType + ' ';
    if (d.hasOwnProperty('strokeStyle')) {
      if (d.strokeStyle === 'broken') {
        styleClass += " broken-stroke"; 
      };
    };
    return styleClass; 
  })
  .attr("d", function (d) {
    pathData = getPathData(d, pathway.labelableElements);
    if (d.hasOwnProperty('strokeStyle')) {
      if (d.strokeStyle === 'double') {

        // setting stroke-width equal to its specified line value is
        // what PathVisio (Java) does, but the white line (overlaying the
        // thick line to create a "double line") is hard to see at 1px.

        svg.append("path")
        .attr("class", d.edgeType + "-double")
        .attr("d", pathData)
        .attr("style", "stroke:white; stroke-width:" + d.strokeWidth + '; ')
        .attr("marker-start", 'url(#' + getMarker(d.markerStart, 'start', d.stroke) + ')')
        .attr("marker-end", 'url(#' + getMarker(d.markerEnd, 'end', d.stroke) + ')');
      };
    };
    return pathData; 
  })
  .attr("style", function (d) { 
    var style = 'stroke-width:' + d.strokeWidth + '; ';
    if (d.hasOwnProperty('stroke')) {
      style += 'stroke:' + d.stroke + '; '; 
    };
    if (d.hasOwnProperty('strokeStyle')) {
      if (d.strokeStyle === 'double') {
        style += 'stroke-width:' + (3 * d.strokeWidth) + '; '; 
      };
    };
    return style; 
  })
  .attr("marker-start", function (d) { 
    markerStart = getMarker(d.markerStart, 'start', d.stroke);
    if (d.hasOwnProperty('strokeStyle')) {
      if (d.strokeStyle === 'double') {
        markerStart = 'mim-gap-start-black';
      };
    };
    return 'url(#' + markerStart + ')'; 
  })
  .attr("marker-end", function (d) { 
    markerEnd = getMarker(d.markerEnd, 'end', d.stroke);
    if (d.hasOwnProperty('strokeStyle')) {
      if (d.strokeStyle === 'double') {
        markerEnd = 'mim-gap-end-black';
      };
    };
    return 'url(#' + markerEnd + ')'; 
  })
  .attr("fill", 'none');

  var titleBlock = [];
  if (pathway.hasOwnProperty('name')) {
    titleBlock.push({'key':'Title', 'value':pathway.name});
  };

  if (pathway.hasOwnProperty('license')) {
    titleBlock.push({'key':'Availability', 'value':pathway.license});
  };

  if (pathway.hasOwnProperty('lastModified')) {
    titleBlock.push({'key':'Last modified', 'value':pathway.lastModified});
  };

  if (pathway.hasOwnProperty('organism')) {
    titleBlock.push({'key':'Organism', 'value':pathway.organism});
  };

  var titleBlockElements = svg.selectAll("text.title-block")
  .data(titleBlock)
  .enter()
  .append("text")
  .attr("id", function (d,i) { return "titleBlock-" + i; })
  .attr("class", "title-block")
  .attr("x", 0)
  .attr("y", function(d,i) {return 14 + 14 * i; });

  titleBlockElements.append("tspan")
  .attr("class", "title-block-property-name")
  .text(function (d) { return d.key + ': ' });

  titleBlockElements.append("tspan")
  .text(function (d) { return d.value });

  // Draw Groups 

  if (pathway.hasOwnProperty('groups')) {

    var groupsContainer = svg.selectAll("use.group")	
    .data(pathway.groups)
    .enter()
    .append("use")
    .attr("id", function (d) { return 'group-' + d.graphId })
    .attr('transform', function(d) { 

      // TODO refactor the code below to not repeat itself using getGroupDimensions

      var groupDimensions = getGroupDimensions(d.groupId);
      return 'translate(' + groupDimensions.x + ' ' + groupDimensions.y + ')'; 
    })
    .attr("width", function (d) {
      var groupDimensions = getGroupDimensions(d.groupId);
      return groupDimensions.width; 
    })
    .attr("height", function (d) { 
      var groupDimensions = getGroupDimensions(d.groupId);
      return groupDimensions.height; 
    })
    .attr("class", function(d) { return 'group group-' +  d.style; })
    .attr("xlink:xlink:href", function(d) { return '#group-' +  d.style; })
    .call(drag);
  };

  // Draw Labelable Elements

  var labelableElementsContainer = svg.selectAll("g.labelable-elements-container")	
  .data(pathway.labelableElements)
  .enter()
  .append("g")
  .attr("id", function (d) { return 'labelable-elements-container-' + d.graphId })
  .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
  .attr("class", "labelable-elements-container")
  .call(drag);

  var labelableElements = labelableElementsContainer.each(function(d) {
    var labelableElement = d3.select(this).append('use')
    .attr("id", function (d) {return 'labelable-element-' + d["@GraphId"]})
    .attr('transform', function(d) { 
      var transform = 'none';
      if (d.hasOwnProperty('rotation')) {
        transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
      };
      return transform;
    })
    .attr("class", function (d) { 
      var styleClass = ''; 
      if (d.elementType === 'data-node') {
        styleClass = "labelable-element " + d.elementType + ' ' + d.dataNodeType; 
      }
      else {
        styleClass = "labelable-element " + d.elementType; 
      };
      if (d.hasOwnProperty('strokeStyle')) {
        if (d.strokeStyle === 'broken') {
          styleClass += " broken-stroke"; 
        };
        // TODO currently cannot render double lines for linestyles for labelableElements.
      };
      return styleClass })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function (d) { return d.width; })
      .attr("height", function (d) { return d.height; })
      .attr("z-index", function (d) { return d.zIndex; })
      .attr("style", function (d) { 
        var style = '';
        if (d.hasOwnProperty('fill')) {
          style += ' fill:' + d.fill + '; '; 
        };
        if (d.hasOwnProperty('fillOpacity')) {
          style += ' fill-opacity:' + d.fillOpacity + '; '; 
        };
        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; '; 
        };
        if (d.hasOwnProperty('strokeWidth')) {

          // doubling strokeWidth, because stroke is centered on bounding box, meaning half of it gets cut off.

          style += 'stroke-width:' + 2 * d.strokeWidth + '; '; 
        }
        else {
          if (d.symbolType !== 'none') {
            style += 'stroke-width: 2; '; 
          };
        };
        return style; 
      });

      if (symbolsAvailable.filter(function(d, i) { return (symbolsAvailable[0][i].id === pathway.labelableElements[0].symbolType); }).length > 0) {
        // d3 bug strips 'xlink' so need to say 'xlink:xlink';
        labelableElement.attr("xlink:xlink:href", function (d) {return "#" + d.symbolType; });
      }
      else {
        labelableElement.attr("xlink:xlink:href", "#rectangle");
        console.log('Pathvisio.js does not have access to the requested symbol: ' + pathway.labelableElements[0].symbolType + '. Rectangle used as placeholder.');
      };

      // use this for tspan option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
        var labelableElementText = d3.select(this).append('text')
        .attr("id", function (d) { return 'labelable-element-text-' + d.graphId; })
        .attr("x", 0)
        .attr("y", 0)
        .attr('transform', function(d) {
          if (d.textLabel.hasOwnProperty('textAnchor')) {

            // giving padding of 5. maybe this should go into the CSS.

            if (d.textLabel.textAnchor === 'start') {
              var dx = 5;
            }
            else {
              if (d.textLabel.textAnchor === 'end') {
                var dx = d.width - 5;
              }
            };
          }
          else {
            var dx = d.width / 2;
          };
          var dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((splitTextByLines(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
          return 'translate(' + dx + ' ' + dy + ')'; })
          .attr("class", function (d) { 
            var styleClass = ''; 
            if (d.elementType === 'data-node') {
              styleClass = "labelable-element " + d.elementType + ' ' + d.dataNodeType; 
            }
            else {
              styleClass = "labelable-element " + d.elementType; 
            };
            return styleClass })
            .attr("style", function (d) { 
              var style = '';
              var fontSize = d.fontSize;
              if (d.textLabel.hasOwnProperty('color')) {
                style += 'fill:' + d.textLabel.color + '; '; 
              };
              if (d.textLabel.hasOwnProperty('fontFamily')) {
                style += 'font-family:' + d.textLabel.fontFamily + '; '; 
              };
              if (d.textLabel.hasOwnProperty('fontSize')) {
                style += 'font-size:' + d.textLabel.fontSize + 'px; '; 
              };
              if (d.textLabel.hasOwnProperty('fontWeight')) {
                style += 'font-weight:' + d.textLabel.fontWeight + '; '; 
              };
              if (d.textLabel.hasOwnProperty('fontStyle')) {
                style += 'font-style:' + d.textLabel.fontStyle + '; '; 
              };
              if (d.textLabel.hasOwnProperty('textAnchor')) {
                style += 'text-anchor:' + d.textLabel.textAnchor + '; '; 
              };
              return style; 
            });

            var labelableElementTspan = labelableElementText.each(function(d) {
              var fontSize = d.textLabel.fontSize;
              d3.select(this).selectAll('tspan')
              .data(function (d) {
                var textArray = splitTextByLines(d.textLabel.text);
                return textArray;
              })
              .enter()
              .append('tspan')
              .attr("x", 0)
              .attr("y", function (d, i) { return i * fontSize; })
              .text(function (d) { return d; });
            });
      };

      /*

      // use this for foreignObject object option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
      var labelableElementSwitch = d3.select(this).append('switch');

      var labelableElementForeignObject = labelableElementSwitch.append('foreignObject') 
      //.attr("x", 0)
      //.attr("y", 0)
      .attr("width", function (d) { return d.width + 'px'; })
      .attr("height", function (d) { return d.height + 'px'; });

      var labelableElementBody = labelableElementForeignObject.append('xhtml:body') 
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .attr("id", function (d) { return 'labelable-element-text-' + d.graphId; })
      .attr("style", function (d) { return 'height:' + d.height + 'px'; });

      var labelableElementLink = labelableElementBody.append('link') 
      .attr("rel", "stylesheet")
      .attr("href", "pathways.css")
      .attr("type", "text/css");

      var labelableElementOuter = labelableElementBody.append('div') 
      .attr("class", "outer") 
      .attr("style", function (d) { return 'height:' + d.height + 'px'; });

      var labelableElementP = labelableElementOuter.append('p') 
      .attr("style", function (d) { 
      var style = 'height:' + d.height + 'px; ';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'color:' + d.textLabel.color + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; '; 
      };
      return style; 
      })
      .text(function (d) {
      var text = d.textLabel.text;
      return text; 
      })
      .attr("class", function (d) { 
      var styleClass = ''; 
      if (d.elementType === 'data-node') {
      styleClass = "labelable-element " + d.elementType + ' ' + d.dataNodeType; 
      }
      else {
      styleClass = "labelable-element " + d.elementType; 
      };
      return styleClass });

      var labelableElementText = labelableElementSwitch.append('text')
      .attr("id", function (d) { return 'labelable-element-text-' + d.graphId; })
      .attr("x", function (d) { return d.width / 2; })
      .attr("y", function (d) { return d.height / 2 + 0.3 * d.textLabel.fontSize; })
      //.attr("style", function (d) { return 'stroke:' + 'red'; })
      .attr("style", function (d) { 
      var style = '';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'fill:' + d.textLabel.color + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; '; 
      };
      return style; 
})
.text(function (d) { return d.textLabel.text; });

};
*/
  });
};
