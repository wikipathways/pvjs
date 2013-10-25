pathvisio.converter.gpml.edge = function(){

  function toRenderableJson(gpmlEdge, jsonEdge, callback) {
    try {
      jsonEdge.renderableType = 'edge';
      var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
      if (!!connectorType) {
        jsonEdge.connectorType = connectorType.toLowerCase();
      }
      else {
        jsonEdge.connectorType = 'straight';
      }

      var gpmlPoints = gpmlEdge.selectAll('Point');
      var jsonPoints = [];
      if (gpmlPoints.length > 0) {
        gpmlPoints.each(function() {
          pathvisio.converter.gpml.edge.point.toRenderableJson(d3.select(this), function(jsonPoint) {
            jsonPoints.push(jsonPoint);
          });
        });
        jsonEdge.points = jsonPoints;
      }
      callback(jsonEdge);
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
