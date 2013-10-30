pathvisio.converter.gpml.node = function(){

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

      var jsonAnchorsFromThisNode = pathvisio.converter.gpml.anchor.getAllFromNode(jsonNode);

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

/*




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
          }

          if (element.shapeType !== 'none') {
            element.fillOpacity = 1;
          }
        }
      }

      if (element.graphics.hasOwnProperty("lineThickness")) {
        element.strokeWidth = element.graphics.lineThickness;
      }

      if (element.graphics.hasOwnProperty('lineStyle')) {
        element.strokeStyle = element.graphics.lineStyle.toLowerCase();
        if (element.strokeStyle === 'broken') {
          element.strokeStyle = 'dashed';
        }
      }

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
            }
          }
        });
        delete element.attributes;
      }

      if (element.graphics.hasOwnProperty("rotation")) {

        // get rotation in degrees because SVG rotate attribute uses degrees
        // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

        element.rotation = element.graphics.rotation * (180 / Math.PI);
        //element.rotation = Math.round( element.rotation * 100 ) / 100;
      }

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
          }

          // default fontSize is already specified in the CSS of pathway-template.svg, but I need the font size
          // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.
          
          var fontSize = null;

          if (element.graphics.hasOwnProperty("fontSize")) {
            fontSize = element.graphics.fontSize;
          }
          else {
            fontSize = 10;
          }
          element.textLabel.fontSize = fontSize;

          if (element.graphics.hasOwnProperty("fontName")) {
            element.textLabel.fontFamily = element.graphics.fontName;
          }

          if (element.graphics.hasOwnProperty("fontWeight")) {
            element.textLabel.fontWeight = element.graphics.fontWeight.toLowerCase();
          }

          if (element.graphics.hasOwnProperty("fontStyle")) {
            element.textLabel.fontStyle = element.graphics.fontStyle.toLowerCase();
          }

          if (alignToAnchorMappings.hasOwnProperty(element.graphics.align)) {
            element.textLabel.textAnchor = alignToAnchorMappings[element.graphics.align];
          }
          else {
            element.textLabel.textAnchor = 'middle';
          }

          if (element.graphics.hasOwnProperty("valign")) {
            element.textLabel.vAlign = element.graphics.valign.toLowerCase();
          }
          else {
            element.textLabel.vAlign = 'top';
          }
        }
      }

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
