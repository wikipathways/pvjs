pathvisiojs.data.gpml.text = function() {
  function toRenderableJson(gpmlNode, callback) {
    try {
      jsonText = {};
      jsonText["tspan"] = gpmlNode.attr('TextLabel').split(/\r\n|\r|\n|&#xA;/g);
      var textAlign = gpmlNode.select('Graphics').attr('Align') || 'center';
      jsonText["textAlign"] = textAlign.toLowerCase();
      var verticalAlign = gpmlNode.select('Graphics').attr('Valign') || 'top';
      jsonText["verticalAlign"] = verticalAlign.toLowerCase();
      var fontSize = gpmlNode.select('Graphics').attr('FontSize') || 10;
      jsonText["fontSize"] = parseFloat(fontSize);
      var fontStyle = gpmlNode.select('Graphics').attr('FontStyle') || 'normal';
      jsonText["fontStyle"] = fontStyle.toLowerCase();
      var fontWeight = gpmlNode.select('Graphics').attr('FontWeight') || 'normal';
      jsonText["fontWeight"] = fontWeight.toLowerCase();
      jsonText["fontFamily"] = gpmlNode.select('Graphics').attr('FontName') || 'Arial';

      var color;
      var colorValue = gpmlNode.select('Graphics').attr('Color');
      if (!!colorValue) {
        color = new RGBColor(colorValue);
        if (color.ok) {
          jsonText["color"] = color.toHex();
        }
        else {
          console.warn('Invalid color encountered. Setting color to black.');
          jsonText["color"] = "#000000";
        }
      }

      callback(jsonText);
    }
    catch (e) {
      throw new Error("Error converting gpmlNode's text to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
