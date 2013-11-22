pathvisiojs.data.gpml.graphicalLine = function() {

  function toRenderableJson(gpmlGraphicalLine, callback) {
    var jsonGraphicalLine = {};

    try {
      jsonGraphicalLine.edgeType = 'graphical-line';
      pathvisiojs.data.gpml.edge.toRenderableJson(gpmlGraphicalLine, jsonGraphicalLine, function(jsonEdge) {
        jsonGraphicalLine = jsonEdge;
      });

      callback(jsonGraphicalLine);

    }
    catch (e) {
      console.log("Error converting graphicalLine to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
