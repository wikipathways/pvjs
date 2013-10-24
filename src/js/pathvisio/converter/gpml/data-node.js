pathvisio.converter.gpml.dataNode = function() {

  function toRenderableJson(gpmlDataNode, callback) {
    self.gpmlDataNode = gpmlDataNode;
    var jsonDataNode = {};

    try {

      jsonDataNode.renderableType = 'node';
      jsonDataNode.nodeType = 'data-node';
      jsonDataNode.dataNodeType = caseConverter.paramCase(gpmlDataNode.attr('Type'));

      var xRef = gpmlDataNode.select('Xref');
      if ((!!xRef.attr('Database')) && (!!xRef.attr('ID'))) {
        jsonDataNode.xRef = {};
        jsonDataNode.xRef.database = xRef.attr('Database');
        jsonDataNode.xRef.id = xRef.attr('ID');
      }

      pathvisio.converter.gpml.node.toRenderableJson(gpmlDataNode, jsonDataNode, function(jsonNode) {
        jsonDataNode = jsonNode;
      });

      callback(jsonDataNode);

    }
    catch (e) {
      console.log("Error converting data node to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
