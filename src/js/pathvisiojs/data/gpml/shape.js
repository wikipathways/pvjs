pathvisiojs.data.gpml.shape = function(){
  function toRenderableJson(gpmlShape, pathwayIri, callbackInside) {
    try {
      pathvisiojs.data.gpml.entityNode.toRenderableJson(gpmlShape, pathwayIri, function(jsonShape, ports) {
        callbackInside(jsonShape, ports);
      });
    }
    catch (e) {
      throw new Error("Error converting shape to json: " + e.message);
      callbackInside(e);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();


