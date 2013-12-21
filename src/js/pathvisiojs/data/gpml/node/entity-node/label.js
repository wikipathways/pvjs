"use strict";
pathvisiojs.data.gpml.node.entityNode.label = function(){

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
    /*
    console.log('gpmlLabel');
    console.log(gpmlLabel[0][0]);
    console.log('pathwayIri');
    console.log(pathwayIri);
    console.log('callbackInside');
    console.log(callbackInside);
    //*/
    try {
      var jsonLabel = {};
      pathvisiojs.data.gpml.node.entityNode.toRenderableJson(gpmlLabel, jsonLabel, pathwayIri, function(jsonLabel) {
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
      throw new Error("Error converting label to json: " + e.message);
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();


