pathvisiojs.data.gpml.text = function() {
  function toRenderableJson(gpmlTextLabel) {
    try {
      jsonText = {};
      jsonText["tspan"] = gpmlDataNode.attr('TextLabel').split(/\r\n|\r|\n|&#xA;/g);
      var textAlign = gpmlDataNode.select('Graphics').attr('Align') || 'center';
      jsonText["textAlign"] = textAlign.toLowerCase();
      var verticalAlign = gpmlDataNode.select('Graphics').attr('Valign') || 'top';
      jsonText["verticalAlign"] = verticalAlign.toLowerCase();
      var fontSize = gpmlDataNode.select('Graphics').attr('FontSize') || 10;
      jsonText["fontSize"] = parseFloat(fontSize);
      var fontStyle = gpmlDataNode.select('Graphics').attr('FontStyle') || 'normal';
      jsonText["fontStyle"] = fontStyle.toLowerCase();
      var fontWeight = gpmlDataNode.select('Graphics').attr('FontWeight') || 'normal';
      jsonText["fontWeight"] = fontWeight.toLowerCase();
      jsonText["fontFamily"] = gpmlDataNode.select('Graphics').attr('FontName') || 'Arial';

      return jsonText;
    }
    catch (e) {
      throw new Error("Error converting gpmlTextLabel to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
