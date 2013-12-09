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
      var database, ID, 
        datasourceReference = gpmlDataNode.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database')
        ID = datasourceReference.attr('ID')
        if (!!database && !!ID) {
          jsonDataNode["DatasourceReference"] = {};
          jsonDataNode["DatasourceReference"]["Database"] = database;
          jsonDataNode["DatasourceReference"]["ID"] = ID;
        }
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

      var color;
      var colorValue = gpmlDataNode.select('Graphics').attr('Color');
      if (!!colorValue) {
        color = new RGBColor(colorValue);
        if (color.ok) {
          jsonDataNode["color"] = color.toHex();
        }
        else {
          console.warn('Invalid Color encountered. Setting Color to black.');
          jsonDataNode["color"] = "#000000";
        }
      }

      jsonDataNode["borderColor"] = jsonDataNode["color"];

      var backgroundColor;
      var backgroundColorValue = gpmlDataNode.select('Graphics').attr('FillColor');
      if (!!backgroundColorValue) {
        backgroundColor = new RGBColor(backgroundColorValue);
        if (backgroundColor.ok) {
          jsonDataNode["backgroundColor"] = backgroundColor.toHex();
        }
        else {
          console.warn('Invalid backgroundColor encountered. Setting backgroundColor to black.');
          jsonDataNode["backgroundColor"] = "#000000";
        }
      }

      var borderWidth = gpmlDataNode.select('Graphics').attr('LineThickness') || 1;
      jsonDataNode["borderWidth"] = parseFloat(borderWidth);

      // the width and height values are not clearly specified in GPML, but the closest
      // I could come up with for interpreting them as actually rendered in PathVisio (Java)
      // at scales in common use is that gpmlWidth = elementWidth + elementPadding + elementBorderWidth (on each side)
      // with a similar calculation for gpmlHeight

      var gpmlWidth = parseFloat(gpmlDataNode.select('Graphics').attr('Width'));
      jsonDataNode["width"] = gpmlWidth + jsonDataNode["borderWidth"];

      var gpmlHeight = parseFloat(gpmlDataNode.select('Graphics').attr('Height'));
      jsonDataNode["height"] = gpmlHeight + jsonDataNode["borderWidth"];

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
