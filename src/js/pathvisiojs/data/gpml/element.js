// includes all GPML elements. Is parent of node and edge.

pathvisiojs.data.gpml.element = function() {

  function toRenderableJson(gpmlElement, jsonElement, elementCallback) {
    try {
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

    }
    catch (e) {
      throw new Error("Error converting gpmlElement to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
