pathvisiojs.data.gpml.dataNode = function() {

  function toRenderableJson(gpmlDataNode, pathwayIri, callbackInside) {
    try {
      var jsonDataNode = {};
      graphId = gpmlDataNode.attr('GraphId') || ('id' + uuid.v4());
      jsonDataNode["@id"] = pathwayIri + "#" + graphId;
      jsonDataNode["GraphId"] = graphId;
      var groupRef = gpmlDataNode.attr('GroupRef');
      if (!!groupRef) {
        jsonDataNode["GroupRef"] = groupRef;
        jsonDataNode["dependsOn"] = [pathwayIri + "#" + groupRef];
      }
      var datasourceReference = gpmlDataNode.select('Xref');
      if (!!datasourceReference && datasourceReference.length > 0) {
        jsonDataNode["DatasourceReference"] = {};
        jsonDataNode["DatasourceReference"]["Database"] = datasourceReference.attr('Database');
        jsonDataNode["DatasourceReference"]["ID"] = datasourceReference.attr('ID')
      }
      shapeType = gpmlDataNode.select('Graphics').attr('ShapeType') || 'rectangle';
      shapeType = strcase.paramCase(shapeType);
      jsonDataNode["ShapeType"] = shapeType;
      jsonDataNode["zIndex"] = parseFloat(gpmlDataNode.select('Graphics').attr('ZOrder'));
      jsonDataNode["renderableType"] = 'entityNode';
      dataNodeType = gpmlDataNode.attr('Type');
      jsonDataNode["dataNodeType"] = dataNodeType;
      jsonDataNode["@type"] = [
        "element",
        "node",
        "entityNode",
        shapeType,
        "DataNode",
        dataNodeType,
        groupRef || 'notGrouped'
      ];
      var textLabel = {};
      textLabel.tspan = gpmlDataNode.attr('TextLabel').split(/\r\n|\r|\n|&#xA;/g);
      jsonDataNode["TextLabel"] = textLabel;
      jsonDataNode["CenterX"] = parseFloat(gpmlDataNode.select('Graphics').attr('CenterX'));
      jsonDataNode["CenterY"] = parseFloat(gpmlDataNode.select('Graphics').attr('CenterY'));
      jsonDataNode["Width"] = parseFloat(gpmlDataNode.select('Graphics').attr('Width'));
      jsonDataNode["Height"] = parseFloat(gpmlDataNode.select('Graphics').attr('Height'));
      linestyle = gpmlDataNode.select('Graphics').attr('LineStyle');
      if (!!linestyle) {
        linestyle = 'Solid';
      };
      jsonDataNode["LineStyle"] = linestyle;

      callbackInside(jsonDataNode);
    }
    catch (e) {
      throw new Error("Error converting DataNode to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
