pathvisio.converter.gpml.interaction = function() {

  function toRenderableJson(gpmlInteraction, callback) {
    var jsonInteraction = {};

    try {
      jsonInteraction.edgeType = 'interaction';
      pathvisio.converter.gpml.edge.toRenderableJson(gpmlInteraction, jsonInteraction, function(jsonEdge) {
        jsonInteraction = jsonEdge;
      });

      callback(jsonInteraction);

    }
    catch (e) {
      console.log("Error converting interaction to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
