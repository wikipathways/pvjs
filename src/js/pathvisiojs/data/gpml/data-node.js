pathvisiojs.data.gpml.dataNode = function() {

  function toRenderableJson(gpmlDataNode, pathwayIri, callbackInside) {
    self.gpmlDataNode = gpmlDataNode;
    var jsonDataNode = {};

    try {
      graphId = gpmlDataNode.attr('GraphId') || ('id' + uuid.v4());
      elementIri = pathwayIri + "#" + graphId;
      jsonDataNode = {};
      jsonDataNode["@id"] = elementIri;
      jsonDataNode["GraphId"] = graphId;
      jsonDataNode["DatasourceReference"] = {};
      jsonDataNode["DatasourceReference"]["Database"] = gpmlDataNode.select('Xref').attr('Database');
      jsonDataNode["DatasourceReference"]["ID"] = gpmlDataNode.select('Xref').attr('ID')
      shapeType = gpmlDataNode.select('Graphics').attr('ShapeType') || 'rectangle';
      shapeType = strcase.paramCase(shapeType);
      jsonDataNode["ShapeType"] = shapeType;
      dataNodeType = gpmlDataNode.attr('Type');
      jsonDataNode["dataNodeType"] = dataNodeType;
      jsonDataNode["@type"] = [
        "Shape",
        shapeType,
        "DataNode",
        dataNodeType
      ];
      var textLabel = {};
      textLabel.tspan = gpmlDataNode.attr('TextLabel').split(/\r\n|\r|\n|&#xA;/g);
      //textLabel.lines = gpmlDataNode.attr('TextLabel').split(/\r\n|\r|\n|&#xA;/g);
      jsonDataNode["TextLabel"] = textLabel;
      jsonDataNode["CenterX"] = gpmlDataNode.select('Graphics').attr('CenterX');
      jsonDataNode["CenterY"] = gpmlDataNode.select('Graphics').attr('CenterY');
      jsonDataNode["Width"] = gpmlDataNode.select('Graphics').attr('Width');
      jsonDataNode["Height"] = gpmlDataNode.select('Graphics').attr('Height');
      linestyle = gpmlDataNode.select('Graphics').attr('LineStyle');
      if (!!linestyle) {
        linestyle = 'Solid';
      };
      jsonDataNode["LineStyle"] = linestyle;

      callbackInside(jsonDataNode);
    }
    catch (e) {
      console.log("Error converting data node to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
