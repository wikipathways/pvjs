"use strict";

pathvisiojs.data.gpml.element.node.entityNode.label = Object.create(pathvisiojs.data.gpml.element.node.entityNode);

  var pathvisioDefaultStyleValuesLabel = {
    'Label':{
      'Rotation':null,
      'Color':null,
      'FillColor':'ffffff',
      'FontSize':10,
      'FontWeight':null
    }
  }

pathvisiojs.data.gpml.element.node.entityNode.label.toRenderableJson = function(gpmlLabel, pathwayIri, callbackInside) {
  /*
  console.log('gpmlLabel');
  console.log(gpmlLabel[0][0]);
  console.log('pathwayIri');
  console.log(pathwayIri);
  console.log('callbackInside');
  console.log(callbackInside);
  //*/
  var jsonLabel = {};
  jsonLabel.nodeType = "Label";
  pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson(gpmlLabel, jsonLabel, pathvisioDefaultStyleValuesLabel.Label, pathwayIri, function(jsonLabel) {
    pathvisiojs.data.gpml.text.toRenderableJson(gpmlLabel, pathvisioDefaultStyleValuesLabel.Label, function(text) {
      if (!!text) {
        jsonLabel.text = text;
      }

      jsonLabel = pathvisiojs.data.gpml.setColorAsJson(jsonLabel,
                    gpmlLabel.select('Graphics').attr('Color'),
                    pathvisioDefaultStyleValuesLabel.Label.Color);

      jsonLabel = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonLabel,
                    gpmlLabel.select('Graphics').attr('FillColor'),
                    pathvisioDefaultStyleValuesLabel.Label.FillColor);

      var gpmlBackgroundColor = gpmlLabel.select('Graphics').attr('FillColor');
      var jsonBackgroundColor = pathvisiojs.data.gpml.getColor(gpmlBackgroundColor, pathvisioDefaultStyleValuesLabel.Label.FillColor);
      if (!!jsonBackgroundColor) {
        jsonLabel.backgroundColor = jsonBackgroundColor;
      }

      callbackInside(jsonLabel);
    });
  });
}
