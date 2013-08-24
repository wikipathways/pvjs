// Draw Labelable Elements. Includes data nodes, shapes, labels, cellular components...

pathway.labelableElements = function(){ 
  function drawAll() {
    var labelableElementsContainer = pathway.data.svg.selectAll("g.labelable-elements-container")	
    .data(pathway.data.labelableElements)
    .enter()
    .append("g")
    .attr("id", function (d) { return 'labelable-elements-container-' + d.graphId })
    .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
    .attr("class", "labelable-elements-container");
    //.call(drag);

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
        return styleClass })
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", function (d) { return d.width; })
        .attr("height", function (d) { return d.height; })
        .attr("z-index", function (d) { return d.zIndex; })
        .attr("style", function (d) { 
          var style = '';

          if (d.hasOwnProperty('fill')) {
            style += 'fill:' + d.fill + '; '; 
          };

          if (d.hasOwnProperty('fillOpacity')) {
            style += 'fill-opacity:' + d.fillOpacity + '; '; 
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

          if (d.hasOwnProperty('strokeStyle')) {
            if (d.strokeStyle === 'dashed') {
              style += 'stroke-dasharray: 5,3; '; 
            };
            // TODO currently cannot render double lines for linestyles for labelableElements.
          };

          return style; 
        });

        if (symbolsAvailable.filter(function(d, i) { return (symbolsAvailable[0][i].id === pathway.data.labelableElements[0].symbolType); }).length > 0) {
          // d3 bug strips 'xlink' so need to say 'xlink:xlink';
          labelableElement.attr("xlink:xlink:href", function (d) {return "#" + d.symbolType; });
        }
        else {
          labelableElement.attr("xlink:xlink:href", "#rectangle");
          console.log('Pathvisio.js does not have access to the requested symbol: ' + pathway.data.labelableElements[0].symbolType + '. Rectangle used as placeholder.');
        };

        // use this for tspan option for rendering text, including multi-line

        if (d.hasOwnProperty('textLabel')) {
          var labelableElementText = d3.select(this).append('text')
          .attr("id", function (d) { return 'labelable-element-text-' + d.graphId; })
          .attr("x", 0)
          .attr("y", 0)
          .attr('transform', function(d) {

            // tweak left, center, right horizontal alignment

            if (d.textLabel.hasOwnProperty('textAnchor')) {

              // giving padding of 5. maybe this should go into the CSS.

              if (d.textLabel.textAnchor === 'start') {
                var dx = 5;
              }
              else {
                if (d.textLabel.textAnchor === 'end') {
                  var dx = d.width - 5;
                }
                else {
                  var dx = d.width / 2;
                };
              };
            }
            else {
              var dx = d.width / 2;
            };

            // set top, middle, bottom vertical alignment

            if (d.textLabel.hasOwnProperty('vAlign')) {
              if (d.textLabel.vAlign === 'top') {
                var dy = 5 + (1 * d.textLabel.fontSize);
              }
              else {
                if (d.textLabel.vAlign === 'bottom') {
                  var dy = d.height - (5 + (0.3 * d.textLabel.fontSize) + ((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize));
                }
                else {
                  var dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
                };
              };
            }
            else {
              var dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
            };
            return 'translate(' + dx + ' ' + dy + ')'; })
            .attr("class", function (d) { 
              var styleClass = ''; 
              if (d.elementType === 'data-node') {
                styleClass = d.dataNodeType; 
              };
              return styleClass })
            .attr("style", function (d) { 
              var style = '';
              var fontSize = d.fontSize;
              if (d.textLabel.hasOwnProperty('fill')) {
                style += 'fill:' + d.textLabel.fill + '; '; 
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
                var textArray = pathvisio.helpers.splitStringByNewLine(d.textLabel.text);
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

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  };
 
  return { 
    drawAll:drawAll,
    getPortCoordinates:getPortCoordinates 
  } 
}();
