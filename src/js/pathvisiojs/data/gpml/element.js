"use strict";

// includes all GPML elements. Is parent of node and edge.

pathvisiojs.data.gpml.element = {};

// set default values. "swing" refers to PathVisio-Java.
pathvisiojs.data.gpml.element.color = {};
pathvisiojs.data.gpml.element.color.swing = '000000';
pathvisiojs.data.gpml.element.color.gpml = null;

pathvisiojs.data.gpml.element.fillColor = {};
pathvisiojs.data.gpml.element.fillColor.swing = 'ffffff';
pathvisiojs.data.gpml.element.fillColor.gpml = null;

pathvisiojs.data.gpml.element.lineStyle = {};
pathvisiojs.data.gpml.element.lineStyle.swing = 'Solid';
pathvisiojs.data.gpml.element.lineStyle.gpml = null;

pathvisiojs.data.gpml.element.fontSize = {};
pathvisiojs.data.gpml.element.fontSize.swing = 10;
pathvisiojs.data.gpml.element.fontSize.gpml = 10;

pathvisiojs.data.gpml.element.fontWeight = {};
pathvisiojs.data.gpml.element.fontWeight.swing = null;
pathvisiojs.data.gpml.element.fontWeight.gpml = null;

pathvisiojs.data.gpml.element.fontName = {};
pathvisiojs.data.gpml.element.fontName.swing = 'Arial';
pathvisiojs.data.gpml.element.fontName.gpml = null;
  
pathvisiojs.data.gpml.element.toRenderableJson = function(gpmlElement, jsonElement, elementCallback) {
  jsonElement["@type"] = jsonElement["@type"] || [];
  jsonElement["@type"].push("element");

  pathvisiojs.data.gpml.biopaxRef.getAllAsRenderableJson(gpmlElement, function(publicationXrefs) {
    if (!!publicationXrefs) {
      jsonElement.PublicationXref = publicationXrefs;
    }
    elementCallback(jsonElement);
  });

  /*
     var graphics = gpmlElement.select('Graphics'),
     zIndex,
     borderWidth;
     if (graphics[0].length > 0) {
     zIndex = graphics.attr('ZOrder') || 1;
     jsonElement.zIndex = parseFloat(borderWidth);

     borderWidth = graphics.attr('LineThickness') || 1;
     jsonElement.borderWidth = parseFloat(borderWidth);
     }
  //*/
};
