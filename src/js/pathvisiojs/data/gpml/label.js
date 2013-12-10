pathvisiojs.data.gpml.label = function(){
  function toRenderableJson(gpmlLabel, pathwayIri, callbackInside) {
    try {
      pathvisiojs.data.gpml.entityNode.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel, ports) {
        jsonLabel.nodeType = "Label";
        callbackInside(jsonLabel, ports);
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


