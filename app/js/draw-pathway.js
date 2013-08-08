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

function getPathData(d, labelableElements) {
  var pathData = "";

  var sourcePoint = d.points[0];
  if (d.points[0].hasOwnProperty('graphRef')) {
    var sourceGraphRef = sourcePoint.graphRef;

    var sourceElement = labelableElements.filter(function(element) {return element.graphId === sourceGraphRef})[0]
    console.log('sourceElement');
    console.log(sourceElement);

    var sourceX = sourceElement.x + (sourcePoint.relX * sourceElement.width);
    var sourceY = sourceElement.y + (sourcePoint.relY * sourceElement.height);

    pathData = "M " + sourceX + " " + sourceY; 
    console.log('pathData');
    console.log(pathData);

    var sourceDx = sourcePoint.dx;
    var sourceDy = sourcePoint.dy;
  }
  else {
    pathData = "M " + sourcePoint.x + " " + sourcePoint.y; 
    var sourceDx = 1;
    var sourceDy = 1;
  };
  console.log('sourcePoint');
  console.log(sourcePoint);

  var targetPoint = d.points[d.points.length - 1];
  if (d.points[d.points.length - 1].hasOwnProperty('graphRef')) {
    var targetGraphRef = targetPoint.graphRef;

    var targetElement = labelableElements.filter(function(element) {return element.graphId === targetGraphRef})[0]
    console.log('targetElement');
    console.log(targetElement);

    var targetX = targetElement.x + (targetPoint.relX * targetElement.width);
    var targetY = targetElement.y + (targetPoint.relY * targetElement.height);

    var targetDx = targetPoint.dx;
    var targetDy = targetPoint.dy;
  }
  else {
    var targetX = targetPoint.x;
    var targetY = targetPoint.y;

    var targetDx = 1;
    var targetDy = 1;
  };

  console.log(d);
  if ((!d.connectorType) || (d.connectorType === 'undefined') || (d.connectorType === 'straight')) {
    pathData += " L " + targetX + " " + targetY; 
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

      if (Math.abs(sourceDx) === 1) {
        currentDirection = 'H';
      }
      else {
        currentDirection = 'V';
      };
      console.log('currentDirection');
      console.log(currentDirection);
      console.log(sourceX);
      console.log(sourceY);
      console.log(sourceDx);
      console.log(sourceDy);
      console.log(targetX);
      console.log(targetY);
      console.log(targetDx);
      console.log(targetDy);

      if (d.points.length === 2) {
        //if (sourceDx === ((sourceX - targetX) / Math.abs(sourceX - targetX)) || sourceDx === targetDy || sourceDy === targetDx) {
        if (Math.abs(sourceDx) === 1) {
          pathData += " H " + (sourceX + sourceDx * 15); 
          console.log('pathData');
          console.log(pathData);
          currentDirection = switchDirection(currentDirection);
        }
        else {
          //if (sourceDy === ((sourceY - targetY) / Math.abs(sourceY - targetY)) || sourceDx === targetDy || sourceDy === targetDx) {
          if (Math.abs(sourceDy) === 1) {
            pathData += " V " + (sourceY + sourceDy * 15); 
            console.log('pathData');
            console.log(pathData);
            currentDirection = switchDirection(currentDirection);
          };
        };

        if (targetDx === ((targetX - sourceX) / Math.abs(targetX - sourceX)) || sourceDx === targetDy || sourceDy === targetDx) {
        //if (Math.abs(targetDx) === 1) {
          pathData += " H " + (targetX + targetDx * 15) + ' V ' + targetY + ' H ' + targetX; 
          console.log('pathData');
          console.log(pathData);
          currentDirection = switchDirection(currentDirection);
        }
        else {
          if (targetDy === ((targetY - sourceY) / Math.abs(targetY - sourceY)) || sourceDx === targetDy || sourceDy === targetDx) {
          //if (Math.abs(targetDy) === 1) {
            pathData += " V " + (targetY + targetDy * 15) + ' H ' + targetX + ' V ' + targetY; 
            console.log('pathData');
            console.log(pathData);
            currentDirection = switchDirection(currentDirection);
          };
        };
      }
      else {
        d.points.forEach(function(element, index, array) {
          console.log('index');
          console.log(index);
          if ((index > 0) && (index < (array.length - 1))) {
            if (currentDirection === 'H') {
              pathData += ' ' + currentDirection + ' ' + element.x; 
              console.log('pathData');
              console.log(pathData);
            }
            else {
              pathData += ' ' + currentDirection + ' ' + element.y; 
              console.log('pathData');
              console.log(pathData);
            };
          currentDirection = switchDirection(currentDirection);
          console.log('currentDirection');
          console.log(currentDirection);
          };
        });

        if (currentDirection === 'H') {
          pathData += ' ' + currentDirection + ' ' + targetX; 
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + targetY; 
          currentDirection = switchDirection(currentDirection);
          console.log('pathData');
          console.log(pathData);
        }
        else {
          pathData += ' ' + currentDirection + ' ' + targetY; 
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + targetX; 
          currentDirection = switchDirection(currentDirection);
          console.log('pathData');
          console.log(pathData);
        };
      };

      /*
      if (Math.abs(targetDx) === 1) {
        pathData += " V " + targetY + " H " + targetX; 
        console.log('pathData');
        console.log(pathData);
      }
      else {
        pathData += " H " + targetX + " V " + targetY; 
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
        pathData += " L " + targetX + " " + targetY; 
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

            pathData += " S" + pointControl.x + "," + pointControl.y + " " + targetX + "," + targetY; 
            return pathData;
          }
          else {

            // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

            pathData += " T" + targetX + "," + targetY; 
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
          pathData += " L " + targetX + " " + targetY; 
        };
      };
    };
  };
  return pathData;
};

function drawPathway() {
  // be sure server has set gpml mime type to application/gpml+xml
  d3.xml("../../samples/gpml/" + getURLParameter("pathway"), "application/gpml+xml", function(response) {
    //d3.xml("../../samples/gpml/" + getURLParameter("pathway"), "application/gpml+xml", function(error, response) {
    //d3.json("../../samples/gpml/WP673_63184.json", function(error, json) {

    //if (error) return console.warn(error);

    console.log('GPML pathway');
    console.log(response.documentElement);

    var pathway = convertGpml2Json(response);
    self.pathway = pathway;

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
      console.log(
        "x: " + d3.event.x + ", " + 
        "y: " + d3.event.y + ", " + 
        "dx: " + d3.event.dx + ", " + 
        "dy: " + d3.event.dy);
        d.x=d3.event.x;
        d.y=d3.event.y;
        d3.select(this)
        .attr("x", d3.event.x)
        .attr("y", d3.event.y);
    }	

    var svg = self.svg = d3.select("#pathway-container").select(function() {
      return this.getSVGDocument().documentElement;
    });

    svg.attr('width', pathway.boardWidth);
    svg.attr('height', pathway.boardHeight);

    var symbolsAvailable = svg.selectAll('symbol');
    var markersAvailable = svg.selectAll('marker');

    // This section for the Title/Organism/etc needs to be updated. TODO

    var pathwayNameText = svg.append('text')
    .attr("id", 'pathway-name-text')
    .attr("x", 80)
    .attr("y", 10)
    .text(function (d) { return 'Title: ' + pathway.name });

    var pathwayOrganismText = svg.append('text')
    .attr("id", 'pathway-organism-text')
    .attr("x", 80)
    .attr("y", 30)
    .text(function (d) { return 'Organism: ' + pathway.organism });

    // Draw Complexes

    if (pathway.hasOwnProperty('groups')) {
      var complexesContainer = svg.selectAll("use.complex")	
      .data(pathway.groups.filter(function(d, i) { return (d.style === 'Complex'); }))
      .enter()
      .append("use")
      .attr("id", function (d) { return 'complex-' + d.graphId })
      .attr('transform', function(d) { 
        var groupMembers = pathway.labelableElements.filter(function(el) {return (el.groupRef === d.groupId)});
        var groupX = (d3.min(groupMembers, function(el) {return el.x})) - 15;
        var groupY = (d3.min(groupMembers, function(el) {return el.y})) - 15;
        return 'translate(' + groupX + ' ' + groupY + ')'; 
      })
      .attr("width", function (d) {
        var groupMembers = pathway.labelableElements.filter(function(el) {return (el.groupRef === d.groupId)});
        var groupX = (d3.min(groupMembers, function(el) {return el.x})) - 15;
        var groupWidth = (d3.max(groupMembers, function(el) {return el.x + el.width})) - groupX + 15;
        return groupWidth; 
      })
      .attr("height", function (d) { 
        var groupMembers = pathway.labelableElements.filter(function(el) {return (el.groupRef === d.groupId)});
        var groupY = (d3.min(groupMembers, function(el) {return el.y})) - 15;
        var groupHeight = (d3.max(groupMembers, function(el) {return el.y + el.height})) - groupY + 15;
        return groupHeight; 
      })
      .attr("class", "complex")
      .attr("xlink:xlink:href", "#complex")
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
                // Interactions

                var pathData = null;

                var edges = svg.selectAll("path.edge")
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
                          });
                        };
