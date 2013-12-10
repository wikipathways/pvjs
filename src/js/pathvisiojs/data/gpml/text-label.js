pathvisiojs.data.gpml.textLabel = function() {

  function toRenderableJson(gpmlTextLabel, callbackInside) {
    try {
      var jsonTextLabel = {};
      var textLabel = {};
      textLabel.tspan = gpmlDataNode.attr('TextLabel').split(/\r\n|\r|\n|&#xA;/g);
      jsonTextLabel["TextLabel"] = textLabel;
      jsonTextLabel["CenterX"] = parseFloat(gpmlDataNode.select('Graphics').attr('CenterX'));
      jsonTextLabel["CenterY"] = parseFloat(gpmlDataNode.select('Graphics').attr('CenterY'));
      jsonTextLabel["Width"] = parseFloat(gpmlDataNode.select('Graphics').attr('Width'));
      jsonTextLabel["Height"] = parseFloat(gpmlDataNode.select('Graphics').attr('Height'));

      callbackInside(jsonTextLabel);
    }
    catch (e) {
      throw new Error("Error converting DataNode to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
