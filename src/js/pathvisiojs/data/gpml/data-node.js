pathvisiojs.data.gpml.dataNode = function() {
  function toRenderableJson(gpmlDataNode, pathwayIri, callbackInside) {
    try {
      pathvisiojs.data.gpml.entityNode.toRenderableJson(gpmlDataNode, pathwayIri, function(jsonDataNode, ports) {
        var database, ID, 
          datasourceReference = gpmlDataNode.select('Xref');
        if (!!datasourceReference) {
          database = datasourceReference.attr('Database')
          ID = datasourceReference.attr('ID')
          if (!!database && !!ID) {
            jsonDataNode.DatasourceReference = {};
            jsonDataNode.DatasourceReference.Database = database;
            jsonDataNode.DatasourceReference.ID = ID;
          }
        }
        dataNodeType = gpmlDataNode.attr('Type');
        jsonDataNode.nodeType = "DataNode";
        jsonDataNode.dataNodeType = dataNodeType;
        jsonDataNode["@type"].push(dataNodeType);
        callbackInside(jsonDataNode, ports);
      });
    }
    catch (e) {
      throw new Error("Error converting DataNode or Port to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
