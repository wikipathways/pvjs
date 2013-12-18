pathvisiojs.data.gpml.label = function(){

  var pathvisioDefaultStyleValues = {
    'Rotation':null,
    'Color':null,
    'FillColor':'ffffff',
    'FontSize':10,
    'FontWeight':null
  }

  function toRenderableJson(gpmlLabel, pathwayIri, callbackInside) {
    try {
      pathvisiojs.data.gpml.entityNode.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel, ports) {
        jsonLabel.nodeType = "Label";
        pathvisiojs.data.gpml.text.toRenderableJson(gpmlLabel, pathvisioDefaultStyleValues, function(text) {
          if (!!text) {
            jsonLabel.text = text;
          }

          jsonLabel = pathvisiojs.data.gpml.setJsonColor(jsonLabel,
                        gpmlLabel.select('Graphics').attr('Color'),
                        pathvisioDefaultStyleValues.Color);

          jsonLabel = pathvisiojs.data.gpml.node.setJsonBackgroundColor(jsonLabel,
                        gpmlLabel.select('Graphics').attr('FillColor'),
                        pathvisioDefaultStyleValues.FillColor);

          var gpmlBackgroundColor = gpmlLabel.select('Graphics').attr('FillColor');
          var jsonBackgroundColor = pathvisiojs.data.gpml.getGpmlColor(gpmlBackgroundColor, pathvisioDefaultStyleValues.FillColor);
          if (!!jsonBackgroundColor) {
            jsonLabel.backgroundColor = jsonBackgroundColor;
          }

          pathvisiojs.data.gpml.node.getPorts(jsonLabel, function(ports) {
            jsonLabel.Port = ports;
            callbackInside(jsonLabel, ports);
          });
        });
      });
    }
    catch (e) {
      console.log("Error converting label to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();


