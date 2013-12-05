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
      jsonDataNode["nodeType"] = "DataNode";
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

      pathvisiojs.data.gpml.text.toRenderableJson(gpmlDataNode, function(text) {
        jsonDataNode["text"] = text;
      });
      jsonDataNode["CenterX"] = parseFloat(gpmlDataNode.select('Graphics').attr('CenterX'));
      jsonDataNode["CenterY"] = parseFloat(gpmlDataNode.select('Graphics').attr('CenterY'));
      var linestyle = gpmlDataNode.select('Graphics').attr('LineStyle') || 'Solid';
      jsonDataNode["LineStyle"] = linestyle;

      var color = gpmlDataNode.select('Graphics').attr('Color');
      if (!!color) {
        jsonDataNode["color"] = color;
      }

      var backgroundColor = gpmlDataNode.select('Graphics').attr('FillColor');
      if (!!backgroundColor) {
        jsonDataNode["backgroundColor"] = backgroundColor;
      }

      var borderColor = gpmlDataNode.select('Graphics').attr('Color');
      if (!!borderColor) {
        jsonDataNode["borderColor"] = borderColor;
      }     

      var borderWidth = gpmlDataNode.select('Graphics').attr('LineThickness') || 1;
      jsonDataNode["borderWidth"] = parseFloat(borderWidth);

      // the width and height values are not clearly specified in GPML, but the closest
      // I could come up with for interpreting them as actually rendered in PathVisio (Java)
      // at scales in common use is that gpmlWidth = elementWidth + elementPadding + elementBorderWidth (on each side)
      // with a similar calculation for gpmlHeight

      var gpmlWidth = parseFloat(gpmlDataNode.select('Graphics').attr('Width'));
      jsonDataNode["offsetWidth"] = gpmlWidth + jsonDataNode["borderWidth"];

      var gpmlHeight = parseFloat(gpmlDataNode.select('Graphics').attr('Height'));
      jsonDataNode["offsetHeight"] = gpmlHeight + jsonDataNode["borderWidth"];

      jsonDataNode["padding"] = "0.5em";

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
