// Draw Labelable Elements. Includes data nodes, shapes, labels, cellular components...

pathvisio.pathway.labelableElement = function(){ 

  // GPML to JSON shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

  var shapeMappings = {
    "Arc" : "arc",
    "Brace" : "brace",
    "Cell" : "cell",
    "Endoplasmic Reticulum" : "endoplasmic-reticulum",
    "Extracellular region" : "extracellular-region",
    "Golgi Apparatus" : "golgi-apparatus",
    "Hexagon" : "hexagon",
    "mim-degradation" : "mim-degradation",
    "Mitochondria" : "mitochondria",
    "Nucleus" : "nucleus",
    "Organelle" : "organelle",
    "Oval" : "oval",
    "Pentagon" : "pentagon",
    "Rectangle" : "rectangle",
    "RoundedRectangle" : "rounded-rectangle",
    "Sarcoplasmic Reticulum" : "sarcoplasmic-reticulum",
    "Triangle" : "triangle",
    "Vesicle" : "vesicle"
  }; 

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

  function gpml2json(rawJsonLabelableElements) {
    try {

      // LabelableElements

      rawJsonLabelableElements.forEach(function(element, index, array) {
        if (element.hasOwnProperty('comment')) {
          element.comments = pathvisio.helpers.convertToArray( element.comment );
          delete element.comment;
        };

        if (element.hasOwnProperty('xref')) {
          if ((!element.xref.database) && (!element.xref.id)) {
            delete element.xref;
          }
          else {
            element.xref = element.xRef;
            delete element.xref;
          };
        };

        // Be warned that support for zIndex in SVG is spotty. It's best to rely on ordering in the DOM as well.

        if (element.graphics.hasOwnProperty("zorder")) {
          element.zIndex = parseFloat(element.graphics.zorder);
        };

        element.x = parseFloat(element.graphics.centerX) - parseFloat(element.graphics.width)/2;
        //element.x = Math.round( element.x * 100 ) / 100;

        element.y = parseFloat(element.graphics.centerY) - parseFloat(element.graphics.height)/2;
        //element.y = Math.round( element.y * 100 ) / 100;

        element.width = parseFloat(element.graphics.width);
        //element.width = Math.round( element.width * 100 ) / 100;

        element.height = parseFloat(element.graphics.height);
        //element.height = Math.round( element.height * 100 ) / 100;

        if (element.graphics.hasOwnProperty("color")) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) { 
            element.stroke = color.toHex();
          }
          else {
            console.warn('Invalid Color encountered. Setting Color to black.');
            element.fill = "#000000";
          };
        };

        if ((!(element.graphics.hasOwnProperty("shapeType")))) {
          if (element.elementType === 'data-node') {
            element.symbolType = "rectangle";
          }
          else {
            element.symbolType = "none";
          };
        }
        else {
          element.symbolType = shapeMappings[element.graphics.shapeType];
        };	

        if (element.graphics.hasOwnProperty("fillColor")) {

          // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
          // license: Use it if you like it

          element.graphics.fillColor = element.graphics.fillColor.toLowerCase();

          if (element.graphics.fillColor === 'transparent') {
            element.fillOpacity = 0;
          }
          else {
            var fill = new RGBColor(element.graphics.fillColor);
            if (fill.ok) { 
              element.fill = fill.toHex();
            }
            else {
              console.warn('Invalid FillColor encountered. Setting FillColor to gray.');
              element.fill = "#999999";
            };

            if (element.symbolType !== 'none') {
              element.fillOpacity = 1;
            };
          };
        };

        if (element.graphics.hasOwnProperty("lineThickness")) {
          element.strokeWidth = element.graphics.lineThickness;
        };	

        if (element.graphics.hasOwnProperty('lineStyle')) {
          element.strokeStyle = element.graphics.lineStyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          };
        };	

        if (element.hasOwnProperty('attribute')) {
          element.attributes = pathvisio.helpers.convertToArray( element.attribute );
          delete element.attribute;
          element.attributes.forEach(function(el, index, array) {
            if ((el.key === "org.pathvisio.DoubleLineProperty") && (el.value === "Double")) {
              console.log('double');
              console.log(el);
              element.strokeStyle = 'double';
            }
            else {
              if ((el.key === "org.pathvisio.CellularComponentProperty") && (el.value !== "None")) {
                element.cellularComponent = el.value;
              };
            };
          });
          delete element.attributes;
        };	

        if (element.graphics.hasOwnProperty("rotation")) {

          // get rotation in degrees because SVG rotate attribute uses degrees
          // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

          element.rotation = element.graphics.rotation * (180 / Math.PI);
          //element.rotation = Math.round( element.rotation * 100 ) / 100;
        };	

        // textLabel data

        if (element.hasOwnProperty("textLabel")) {
          if (!element.textLabel) {
            delete element.textLabel;
          }
          else {
            var text = element.textLabel.toString().replace("&#xA;","\r\n");
            delete element.textLabel;

            element.textLabel = {};

            element.textLabel.text = text;

            if (element.hasOwnProperty("stroke")) {

              // element stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

              element.textLabel.fill = element.stroke;
            };	

            // default fontSize is already specified in the CSS of pathway-template.svg, but I need the font size
            // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.

            if (element.graphics.hasOwnProperty("fontSize")) {
              var fontSize = element.graphics.fontSize;
            }
            else {
              var fontSize = 10;
            };
            element.textLabel.fontSize = fontSize;

            if (element.graphics.hasOwnProperty("fontName")) {
              element.textLabel.fontFamily = element.graphics.fontName;
            };

            if (element.graphics.hasOwnProperty("fontWeight")) {
              element.textLabel.fontWeight = element.graphics.fontWeight.toLowerCase();
            };

            if (element.graphics.hasOwnProperty("fontStyle")) {
              element.textLabel.fontStyle = element.graphics.fontStyle.toLowerCase();
            };

            if (alignToAnchorMappings.hasOwnProperty(element.graphics.align)) {
              element.textLabel.textAnchor = alignToAnchorMappings[element.graphics.align];
            }
            else {
              element.textLabel.textAnchor = 'middle';
            };

            if (element.graphics.hasOwnProperty("valign")) {
              element.textLabel.vAlign = element.graphics.valign.toLowerCase();
            }
            else {
              element.textLabel.vAlign = 'top';
            };
          };
        };

        // BiopaxRefs 

        try {
          if (element.hasOwnProperty('biopaxRef')) {
            element.biopaxRefs = pathvisio.helpers.convertToArray( element.biopaxRef );
            delete element.biopaxRef;

            //biopaxRefs.forEach(function(element, index, array) {
            // do something
            //});
          }
          else {
            console.log("No element(s) named 'biopaxRef' found for this node in this gpml file.");
          };
        }
        catch (e) {
          console.log("Error converting node's biopaxRef to json: " + e.message);
        };

        delete element.graphics;
      });

      var validJsonLabelableElements = rawJsonLabelableElements.sort(function(a,b) {return a.zIndex - b.zIndex});
      return validJsonLabelableElements;
    }
    catch (e) {
      console.log("Error converting labelable elements to json: " + e.message);
      return e;
    };
  };

  function drawAll() {
    var labelableElementsContainer = pathvisio.data.current.svg.selectAll("g.labelable-elements-container")	
    .data(pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements)
    .enter()
    .append("g")
    .attr("id", function (d) { return 'labelable-elements-container-' + d.graphId })
    .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
    .attr("class", "labelable-elements-container")
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        var xrefDiv = $('.xrefinfo');

        // (id, datasource, species, symbol)

        var xrefHtml = XrefPanel.create(d.xRef.id, d.xRef.database, 'Homo sapiens', d.textLabel.text);
        //var xrefHtml = XrefPanel.create('HMDB01397', 'HMDB', 'Mus musculus', d.textLabel.text);
        window.setTimeout(function() {
          xrefDiv.empty();
          xrefDiv.append(xrefHtml);
        }, 2000);
      };
    });
    //.on("click", function(d,i) { alert(d.xRef.id); });
    //.call(drag);

    var labelableElements = labelableElementsContainer.each(function(d, i) {
      var labelableElement = d3.select(this).append('use')
      .attr("id", function (d) {return 'labelable-element-' + d.graphId})
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
        return styleClass;
      })
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

          // Doubling strokeWidth to create strokeWidthEffective.
          // Reason: stroke is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
          // of the stroke so that the stroke does not go outside its bounding box. Because the outer half of the stroke is not displayed, we need to
          // double the stroke width so that the stroke's apparent width matches the value specified in GPML.

          var strokeWidthEffective = 2 * d.strokeWidth; 
        }
        else {
          var strokeWidthEffective = 2; 
        };

        style += 'stroke-width:' + strokeWidthEffective + '; '; 

        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            style += 'stroke-dasharray: 5,3; '; 
          };

          if (d.strokeStyle === 'double') {

            // draw second element

            d3.select(labelableElementsContainer[0][i]).append("use")
            .attr("id", function (d) {return 'labelable-element-double' + d.graphId})
            .attr("class", function (d) { 
              var styleClass = ''; 
              if (d.elementType === 'data-node') {
                styleClass = "labelable-element " + d.elementType + ' ' + d.dataNodeType; 
              }
              else {
                styleClass = "labelable-element " + d.elementType; 
              };
              return styleClass;
            })
            .attr('transform', function(d) { 
              var transform = 'none';
              if (d.hasOwnProperty('rotation')) {

                // the reference to width and height here is to specify the center of rotation as the center of the second element

                transform = 'rotate(' + d.rotation + ' ' + (d.width/2) + ' ' + (d.height/2) + ')';
              };
              return transform;
            })
            .attr("x", function(d) {return strokeWidthEffective; })
            .attr("y", function(d) {return strokeWidthEffective; })
            .attr("width", function (d) { return d.width - 2*strokeWidthEffective; })
            .attr("height", function (d) { return d.height - 2*strokeWidthEffective; })
            .attr("xlink:xlink:href", function (d) {return "#" + d.symbolType; })
            //.attr("class", "drawing-board-color-stroke")
            .attr("style", function(d) { return style + 'fill-opacity:0; '});
          };
        };

        // be careful that all additions to 'style' go above the 'double-line second element' above
        // so that they are applied to both the first and second elements.

        return style; 
      });

      if (symbolsAvailable.filter(function(d, i) { return (symbolsAvailable[0][i].id === pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements[0].symbolType); }).length > 0) {
        // d3 bug strips 'xlink' so need to say 'xlink:xlink';
        labelableElement.attr("xlink:xlink:href", function (d) {return "#" + d.symbolType; });
      }
      else {
        labelableElement.attr("xlink:xlink:href", "#rectangle");
        console.log('Pathvisio.js does not have access to the requested symbol: ' + pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements[0].symbolType + '. Rectangle used as placeholder.');
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

            if (d.hasOwnProperty('biopaxRefs')) {
              var nodePublicationXrefs = d3.select(this).selectAll(".node-publication-xref-text")	
              .data(d.biopaxRefs)
              .enter()
              .append("text")
              .attr("id", function (d) { return 'node-publication-xref-text-' + d; })
              .attr("x", 0)
              .attr("y", 0)
              .attr('transform', function(d,i) { return 'translate(' + (i*12) + ' ' + (-12) + ')'; })
              .attr("class", 'node-publication-xref-text')
              .attr("style", "")
              .text(function (d) {
                var index = 0;
                var gpmlId = null;
                do {
                  gpmlId = pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs[index].gpmlId;
                  index += 1;
                } while (gpmlId !== d && index < pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs.length);
                return index});
            };

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
          getPortCoordinates:getPortCoordinates, 
          gpml2json:gpml2json
} 
}();
