pathvisiojs.data.gpml.node = function(){

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

  // gpmlNode is NOT referring to data nodes exclusively. It is also referring to any other non-edge elements that can have anchors.

  function toRenderableJson(gpmlNode, jsonNode, callback) {
    try {

      var comments = gpmlNode.selectAll('Comment');
      if (comments[0].length > 0) {
        jsonNode.comments = [];
        comments.each(function() {
          jsonNode.comments.push(d3.select(this).text());
        });
      }

      // Be warned that support for zIndex in SVG is spotty (non-existent? TODO check css cross-browser). You should rely on ordering in the DOM.

      var zIndex = gpmlNode.select('Graphics').attr('ZOrder');
      if (!!zIndex) {
        jsonNode.zIndex = parseFloat(zIndex);
      }

      var centerX = parseFloat(gpmlNode.select('Graphics').attr('CenterX'));
      jsonNode.width = parseFloat(gpmlNode.select('Graphics').attr('Width'));
      jsonNode.x = centerX - jsonNode.width/2;

      var centerY = parseFloat(gpmlNode.select('Graphics').attr('CenterY'));
      jsonNode.height = parseFloat(gpmlNode.select('Graphics').attr('Height'));
      jsonNode.y = centerY - jsonNode.height/2;

      jsonNode.id = gpmlNode.attr('GraphId');

      var jsonAnchorsFromThisNode = pathvisiojs.data.gpml.anchor.getAllFromNode(jsonNode);

      var color;
      var colorValue = gpmlNode.select('Graphics').attr('Color');
      if (!!colorValue) {
        color = new RGBColor(colorValue);
        if (color.ok) {
          jsonNode.stroke = color.toHex();
        }
        else {
          console.warn('Invalid Color encountered. Setting Color to black.');
          jsonNode.stroke = "#000000";
        }
      }

      var shapeType = gpmlNode.select('Graphics').attr('ShapeType'); 
      if (!shapeType) {

        // To display correctly, a data-node must have a shape type.
        // If no shape type is specified in GPML, this code will
        // make the default be 'rectangle'

        if (jsonNode.nodeType === 'data-node') {
          jsonNode.shapeType = "rectangle";
        }
        else {
          jsonNode.shapeType = "none";
        }
      }
      else {
        jsonNode.shapeType = caseConverter.paramCase(shapeType);
      }

      var fillColor = gpmlNode.select('Graphics').attr('FillColor'); 
      var validRGBFillColor;
      if (!!fillColor) {

        // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
        // license: Use it if you like it

        fillColor = fillColor.toLowerCase();

        if (fillColor === 'transparent') {
          jsonNode.fillOpacity = 0;
        }
        else {
          rGBFillColor = new RGBColor(fillColor);
          if (rGBFillColor.ok) {
            jsonNode.fill = rGBFillColor.toHex();
          }
          else {
            console.warn('Invalid FillColor encountered. Setting FillColor to gray.');
            jsonNode.fill = "#999999";
          }

          if (jsonNode.shapeType !== 'none') {
            jsonNode.fillOpacity = 1;
          }
        }
      }

      var strokeWidth = gpmlNode.select('Graphics').attr('LineThickness'); 
      if (!!strokeWidth) {
        jsonNode.strokeWidth = strokeWidth;
      }

      var attributes = gpmlNode.selectAll('Attribute');

      var strokeStyle = gpmlNode.select('Graphics').attr('LineStyle'); 
      if (!!strokeStyle) {
        strokeStyle = strokeStyle.toLowerCase();
        if (strokeStyle === 'broken') {
          jsonNode.strokeStyle = 'dashed';
        }
        else {
          jsonNode.strokeStyle = strokeStyle;
        }
      }
      else {

        // As currently specified, a given element can only have one strokeStyle.
        // This one strokeStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has strokeStyle of double.

        if (attributes.length > 0) {
          strokeStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (strokeStyle[0].length > 0) {
            jsonNode.strokeStyle = 'double';
          }
        }
      }

      ///*
      if (attributes.length > 0) {
        var cellularComponent = attributes.filter(function(d, i) {
          return d3.select(this).attr('Key') === 'org.pathvisiojs.CellularComponentProperty' && d3.select(this).attr('Value') != 'None';
        });
        if (cellularComponent[0].length > 0) {
          jsonNode.cellularComponent = cellularComponent.attr('Value');
        }
      }
      //*/

      // TODO move this to label.js
      // textLabel data

      var textLabel = gpmlNode.attr('TextLabel');
      self.gpmlNode = gpmlNode;
      console.log('textLabel');
      console.log(textLabel);
      ///*
      if (!!textLabel) {
        var text = textLabel.toString().replace("&#xA;","\r\n");

          jsonNode.textLabel = {};

          jsonNode.textLabel.text = text;

          if (jsonNode.hasOwnProperty("stroke")) {

            // jsonNode stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

            jsonNode.textLabel.fill = jsonNode.stroke;
          }

          // default fontSize is already specified in the CSS of pathway-template.svg, but I need the font size
          // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.
          
          var fontSize;
          fontSize = gpmlNode.select('Graphics').attr("FontSize");
          if (!fontSize) {
            fontSize = 10;
          }

          jsonNode.textLabel.fontSize = fontSize;

          var fontName;
          fontName = gpmlNode.select('Graphics').attr("FontName");
          if (!!fontName) {
            jsonNode.textLabel.fontFamily = fontName.toLowerCase();
          }

          var fontWeight;
          fontWeight = gpmlNode.select('Graphics').attr("FontWeight");
          if (!!fontWeight) {
            jsonNode.textLabel.fontWeight = fontWeight.toLowerCase();
          }

          var fontStyle;
          fontStyle = gpmlNode.select('Graphics').attr("FontStyle");
          if (!!fontStyle) {
            jsonNode.textLabel.fontStyle = fontStyle.toLowerCase();
          }

          var textAnchor;
          textAnchor = gpmlNode.select('Graphics').attr("Align");
          if (alignToAnchorMappings.hasOwnProperty(textAnchor)) {
            jsonNode.textLabel.textAnchor = textAnchor.toLowerCase();
          }
          else {
            jsonNode.textLabel.textAnchor = 'middle';
          }

          var vAlign;
          vAlign = gpmlNode.select('Graphics').attr("Valign");
          if (!!vAlign) {
            jsonNode.textLabel.vAlign = vAlign.toLowerCase();
          }
          else {
            jsonNode.textLabel.vAlign = 'top';
          }
        }
        //*/

/*



      if (element.graphics.hasOwnProperty("rotation")) {

        // get rotation in degrees because SVG rotate attribute uses degrees
        // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

        element.rotation = element.graphics.rotation * (180 / Math.PI);
        //element.rotation = Math.round( element.rotation * 100 ) / 100;
      }


      // BiopaxRefs 

      try {
        if (element.hasOwnProperty('biopaxRef')) {
          element.biopaxRefs = pathvisiojs.utilities.convertToArray( element.biopaxRef );
          delete element.biopaxRef;

          //biopaxRefs.forEach(function(element, index, array) {
          // do something
          //});
        }
        else {
          console.log("No element(s) named 'biopaxRef' found for this node in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting node's biopaxRef to json: " + e.message);
      }

      delete element.graphics;
      //*/

      callback(jsonNode, jsonAnchorsFromThisNode);
    }
    catch (e) {
      console.log("Error converting node to json: " + e.message);
      return e;
    }
  }

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  return {
    toRenderableJson:toRenderableJson,
    getPortCoordinates:getPortCoordinates
  };
}();
