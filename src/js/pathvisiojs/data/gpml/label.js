pathvisiojs.data.gpml.label = function(){

  var pathvisioDefaultStyleValues = {
    'Label':{
      'Rotation':null,
      'Color':null,
      'FillColor':'ffffff',
      'FontSize':10,
      'FontWeight':null
    }
  }

  function toRenderableJson(gpmlLabel, pathwayIri, callbackInside) {
    try {
      pathvisiojs.data.gpml.entityNode.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel) {
        jsonLabel.nodeType = "Label";
        pathvisiojs.data.gpml.text.toRenderableJson(gpmlLabel, pathvisioDefaultStyleValues.Label, function(text) {
          if (!!text) {
            jsonLabel.text = text;
          }

          jsonLabel = pathvisiojs.data.gpml.setColorAsJson(jsonLabel,
                        gpmlLabel.select('Graphics').attr('Color'),
                        pathvisioDefaultStyleValues.Label.Color);

          jsonLabel = pathvisiojs.data.gpml.node.setJsonBackgroundColor(jsonLabel,
                        gpmlLabel.select('Graphics').attr('FillColor'),
                        pathvisioDefaultStyleValues.Label.FillColor);

          var gpmlBackgroundColor = gpmlLabel.select('Graphics').attr('FillColor');
          var jsonBackgroundColor = pathvisiojs.data.gpml.getColor(gpmlBackgroundColor, pathvisioDefaultStyleValues.Label.FillColor);
          if (!!jsonBackgroundColor) {
            jsonLabel.backgroundColor = jsonBackgroundColor;
          }

          callbackInside(jsonLabel);
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


