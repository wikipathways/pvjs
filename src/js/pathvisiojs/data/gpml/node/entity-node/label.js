"use strict";

pathvisiojs.data.gpml.element.node.entityNode.label = Object.create(pathvisiojs.data.gpml.element.node.entityNode);

pathvisiojs.data.gpml.element.node.entityNode.label.Rotation = null;
pathvisiojs.data.gpml.element.node.entityNode.label.Color = null;
pathvisiojs.data.gpml.element.node.entityNode.label.FillColor = 'ffffff';
pathvisiojs.data.gpml.element.node.entityNode.label.FontSize = 10;
pathvisiojs.data.gpml.element.node.entityNode.label.FontWeight = null;

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
  pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson(gpmlLabel, jsonLabel, pathvisiojs.data.gpml.element.node.entityNode.label.Label, pathwayIri, function(jsonLabel) {
    pathvisiojs.data.gpml.text.toRenderableJson(gpmlLabel, pathvisiojs.data.gpml.element.node.entityNode.label.Label, function(text) {
      if (!!text) {
        jsonLabel.text = text;
      }

      jsonLabel = pathvisiojs.data.gpml.setColorAsJson(jsonLabel,
                    gpmlLabel.select('Graphics').attr('Color'),
                    pathvisiojs.data.gpml.element.node.entityNode.label.Label.Color);

      jsonLabel = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonLabel,
                    gpmlLabel.select('Graphics').attr('FillColor'),
                    pathvisiojs.data.gpml.element.node.entityNode.label.Label.FillColor);

      var gpmlBackgroundColor = gpmlLabel.select('Graphics').attr('FillColor');
      var jsonBackgroundColor = pathvisiojs.data.gpml.getColor(gpmlBackgroundColor, pathvisiojs.data.gpml.element.node.entityNode.label.Label.FillColor);
      if (!!jsonBackgroundColor) {
        jsonLabel.backgroundColor = jsonBackgroundColor;
      }

      callbackInside(jsonLabel);
    });
  });
}
