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
  if ((!d.connectorType) || (d.connectorType === 'undefined') || (d.connectorType === 'straight')) {
    d.points.forEach(function(element, index, array) {
        if (index === 0) {
          pathData = "M " + element.x + " " + element.y; 
        }
        else {
          pathData += " L " + element.x + " " + element.y; 
        };
        return pathData;
        });
  }
  else {

    // just a start for the elbow connector type. still need to consider several other potential configurations.
    if (d.connectorType === 'elbow') {
        var pointStart = d.points[0];
        var graphRef = pointStart.graphRef;
        var sourceElement = labelableElements.filter(function(element) {return element.graphId === graphRef})[0]
        var dists = [{"location":"n","dist":Math.abs(sourceElement.y - pointStart.y)},
          {"location":"s","dist":Math.abs((sourceElement.y + sourceElement.height) - pointStart.y)},
          {"location":"e","dist":Math.abs((sourceElement.x + sourceElement.width) - pointStart.x)},
          {"location":"w","dist":Math.abs(sourceElement.x - pointStart.x)}];
        dists.sort(function(a,b) { return parseFloat(a.dist) - parseFloat(b.dist) } );
        var xStart = pointStart.x;
        var yStart = pointStart.y;
        pathData = "M " + xStart + " " + yStart; 

        var pointEnd = d.points[d.points.length - 1];
        var graphRef = pointEnd.graphRef;
        var sourceElement = labelableElements.filter(function(element) {return element.graphId === graphRef})[0]
        var distsEnd = [{"location":"n","dist":Math.abs(sourceElement.y - pointEnd.y)},
          {"location":"s","dist":Math.abs((sourceElement.y + sourceElement.height) - pointEnd.y)},
          {"location":"e","dist":Math.abs((sourceElement.x + sourceElement.width) - pointEnd.x)},
          {"location":"w","dist":Math.abs(sourceElement.x - pointEnd.x)}];
        distsEnd.sort(function(a,b) { return parseFloat(a.dist) - parseFloat(b.dist) } );
        var xEnd = pointEnd.x;
        var yEnd = pointEnd.y;
      d.points.forEach(function(element, index, array) {
        if ((index > 0) && (index < array.length - 1)) {
          if ((dists[0].location === "n") || (dists[0].location === "s")) {
            pathData += " V " + (yStart + element.y)/2 + " H " +  element.x + " V " + element.y; 
          }
          else {
            if (dists[0].location === "e" || dists[0].location === "w") {
              pathData += " H " + (xStart + element.x)/2 + " V " +  element.y + " H " + element.x; 
            };
          };
          return pathData;
        };
      });
      if (((dists[0].location === "n") || (dists[0].location === "s")) && ((distsEnd[0].location === "n") || (distsEnd[0].location === "s"))) {
        pathData += " V " + (yStart + element.y)/2 + " H " +  element.x + " V " + element.y; 
      }
      else {
        if (((dists[0].location === "e") || (dists[0].location === "w")) && ((distsEnd[0].location === "e") || (distsEnd[0].location === "w"))) {
          pathData += " H " + (xStart + element.x)/2 + " V " +  element.y + " H " + element.x; 
        }
        else {
          if (((dists[0].location === "n") || (dists[0].location === "s")) && ((distsEnd[0].location === "e") || (distsEnd[0].location === "w"))) {
            pathData += " V " + yEnd + " H " +  xEnd; 
          }
          else {
            if (((dists[0].location === "e") || (dists[0].location === "w")) && ((distsEnd[0].location === "n") || (distsEnd[0].location === "s"))) {
              pathData += " H " +  xEnd + " V " + yEnd; 
            };
          };
        };
      };
    }
    else {
      if (d.connectorType === 'segmented') {
        d.points.forEach(function(element, index, array) {
            if (index === 0) {
              pathData = "M " + element.x + " " + element.y; 
            }
            else {
              pathData += " L " + element.x + " " + element.y; 
            };
            return pathData;
            });
      }
      else {
        if (d.connectorType === 'curved') {
          if (d.points.length === 3) {
           
            // see here for PathVisio (Java) code for cubic bezier curve
            // http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/CurvedConnectorShape.java

            // and see W3C documention on cubic bezier curves for SVG:
            // http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands

            // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

            var pointStart = d.points[0];
            var pointControl = d.points[1];
            var pointEnd = d.points[2];

            pathData = "M" + pointStart.x + "," + pointStart.y + " S" + pointControl.x + "," + pointControl.y + " " + pointEnd.x + "," + pointEnd.y; 
            return pathData;
          }
          else {

            // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

            var pointStart = d.points[0];
            var pointEnd = d.points[1];

            pathData = "M" + pointStart.x + "," + pointStart.y + " T" + pointEnd.x + "," + pointEnd.y; 
            return pathData;
          };
        }
        else {
            console.log('Warning: pathvisio.js does not support connector type: ' + d.connectorType);
            d.points.forEach(function(element, index, array) {
              if (index === 0) {
                pathData = "M " + element.x + " " + element.y; 
              }
              else {
                pathData += " L " + element.x + " " + element.y; 
              };
              return pathData;
              });
        };
      };
    };
  };
  return pathData;
};

function drawPathway() {
  //d3.json("../../samples/gpml/WP673_63184.json", function(error, json) {
  d3.json("../../samples/gpml/" + getURLParameter("pathway") + ".json", function(error, json) {

  // d3.json("../../samples/gpml/all-elements.json",function(error, json) {
  // d3.json("../../samples/gpml/datanodeshapes.json",function(error, json) {

    if (error) return console.warn(error);
    data = json;

    console.log('GPML pathway');
    console.log(data);
    self.data = data;

    // be sure server has set gpml mime type to application/gpml+xml

    //var pathway = convertGpml2Json(xml);
    var pathway = data;

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
            style = 'fill:' + d.fill + '; '; 
          };
          if (d.hasOwnProperty('stroke')) {
            style += 'stroke:' + d.stroke + '; '; 
          };
          if (d.hasOwnProperty('strokeWidth')) {
            style += 'stroke-width:' + d.strokeWidth + '; '; 
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

    // Graphical Lines 

    var pathData = null;

        var graphicalLines = svg.selectAll("path.graphical-line")
        .data(pathway.graphicalLines)
        .enter()
        .append("path")
        .attr("id", function (d) { return 'graphical-line-' + d.graphId; })
        .attr("class", "graphical-line")
        .attr("class", function (d) { 
          var styleClass = 'graphical-line ';
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
              .attr("class", "graphical-line-double")
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

		// if it's a double line, the marker will be taken care of above
		    // we use the gap as a blank

              markerStart = 'mim-gap-start-black';
            };
          };
          return 'url(#' + markerStart + ')'; 
        })
        .attr("marker-end", function (d) { 
          markerEnd = getMarker(d.markerEnd, 'end', d.stroke);
          if (d.hasOwnProperty('strokeStyle')) {
            if (d.strokeStyle === 'double') {

		// if it's a double line, the marker will be taken care of above
		    // we use the gap as a blank

              markerEnd = 'mim-gap-end-black';
            };
          };
          return 'url(#' + markerEnd + ')'; 
        })
        .attr("fill", 'none');

    // Interactions


    var pathData = null;

        var interactions = svg.selectAll("path.interaction")
        .data(pathway.interactions)
        .enter()
        .append("path")
        .attr("id", function (d) { return 'interaction-' + d.graphId; })
        .attr("class", "interaction")
        .attr("class", function (d) { 
          var styleClass = 'interaction ';
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
              .attr("class", "interaction-double")
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
