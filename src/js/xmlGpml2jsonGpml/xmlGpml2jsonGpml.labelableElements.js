pathvisio.xmlGpml2jsonGpml.labelableElements = function(){

    // GPML to jGPML shape name mappings: { "OldName":"new-name" }
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

  function convert(rawJsonLabelableElements) {
    try {

      // LabelableElements

      rawJsonLabelableElements.forEach(function(element, index, array) {
        element.graphId = element.graphid;
        delete element.graphid;

        if (element.hasOwnProperty('groupref')) {
          element.groupRef = element.groupref;
          delete element.groupref;
        };

        if (element.hasOwnProperty('comment')) {
          element.comments = pathvisio.xmlGpml2jsonGpml.convertToArray( element.comment );
          delete element.comment;
        };

        if (element.hasOwnProperty('xref')) {
          if ((element.xref.database === null) && (element.xref.id === null)) {
            delete element.xref;
          };
        };

        // Be warned that support for zIndex in SVG is spotty. It's best to rely on ordering in the DOM as well.

        if (element.graphics.hasOwnProperty("zorder")) {
          element.zIndex = parseFloat(element.graphics.zorder);
        };

        element.x = parseFloat(element.graphics.centerx) - parseFloat(element.graphics.width)/2;
        //element.x = Math.round( element.x * 100 ) / 100;

        element.y = parseFloat(element.graphics.centery) - parseFloat(element.graphics.height)/2;
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

        if ((!(element.graphics.hasOwnProperty("shapetype")))) {
          if (element.elementType === 'data-node') {
            element.symbolType = "rectangle";
          }
          else {
            element.symbolType = "none";
          };
        }
        else {
          element.symbolType = shapeMappings[element.graphics.shapetype];
        };	

        if (element.graphics.hasOwnProperty("fillcolor")) {

          // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
          // license: Use it if you like it

          element.graphics.fillcolor = element.graphics.fillcolor.toLowerCase();

          if (element.graphics.fillcolor === 'transparent') {
            element.fillOpacity = 0;
          }
          else {
            var fill = new RGBColor(element.graphics.fillcolor);
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

        if (element.graphics.hasOwnProperty("linethickness")) {
          element.strokeWidth = element.graphics.linethickness;
        };	

        if (element.graphics.hasOwnProperty('linestyle')) {
          element.strokeStyle = element.graphics.linestyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          };
          delete element.graphics.linestyle;
        };	

        if (element.hasOwnProperty('attribute')) {
          element.attributes = pathvisio.xmlGpml2jsonGpml.convertToArray( element.attribute );
          delete element.attribute;
          element.attributes.forEach(function(el, index, array) {
            if ((el.key === "org.pathvisio.DoubleLineProperty") && (el.value === "Double")) {
              el.strokeStyle = 'double';
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

        if (element.hasOwnProperty("textlabel")) {
          if (element.textlabel === null) {
            delete element.textlabel;
          }
          else {
            var text = element.textlabel.toString().replace("&#xA;","\r\n");
            delete element.textlabel;

            element.textLabel = {};

            element.textLabel.text = text;

            if (element.hasOwnProperty('groupref')) {
              element.groupRef = element.groupref;
              delete element.groupref;
            };

            if (element.hasOwnProperty("stroke")) {

              // element stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

              element.textLabel.fill = element.stroke;
            };	

            // default fontsize is already specified in the CSS of pathway-template.svg, but I need the font size
            // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.

            if (element.graphics.hasOwnProperty("fontsize")) {
              var fontSize = element.graphics.fontsize;
            }
            else {
              var fontSize = 10;
            };
            element.textLabel.fontSize = fontSize;

            if (element.graphics.hasOwnProperty("fontname")) {
              element.textLabel.fontFamily = element.graphics.fontname;
            };

            if (element.graphics.hasOwnProperty("fontweight")) {
              element.textLabel.fontWeight = element.graphics.fontweight.toLowerCase();
            };

            if (element.graphics.hasOwnProperty("fontstyle")) {
              element.textLabel.fontStyle = element.graphics.fontstyle.toLowerCase();
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

        delete element.graphics;
      });

      var validJsonLabelableElements = rawJsonLabelableElements.sort(function(a,b) {return a.zIndex - b.zIndex});
      return validJsonLabelableElements;
    }
    catch (e) {
      console.log("Error //converting labelable elements to json: " + e.message);
      return e;
    };
  };

  return {
    convert:convert
  }
}();
