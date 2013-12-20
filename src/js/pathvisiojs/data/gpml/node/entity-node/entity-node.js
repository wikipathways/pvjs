// includes GPML elements of type Shape, Label and DataNode

pathvisiojs.data.gpml.node.entityNode = function() {

  function setJsonRotationValue(jsonNode, currentGpmlRotationValue, defaultGpmlRotationValue) {
    if (currentGpmlRotationValue !== defaultGpmlRotationValue) {
      jsonNode.rotate = currentGpmlRotationValue + 'deg';
    }
    return jsonNode;
  }

  function toRenderableJson(gpmlEntityNode, pathwayIri, entityNodeCallback) {
    try {
      jsonEntityNode = {};
      graphId = gpmlEntityNode.attr('GraphId') || ('id' + uuid.v4());
      jsonEntityNode["@id"] = pathwayIri + graphId;
      jsonEntityNode.GraphId = graphId;

      var isContainedBy = gpmlEntityNode.attr('GroupRef');
      if (!!isContainedBy) {
        jsonEntityNode.isContainedBy = pathwayIri + isContainedBy;
      }

      shapeType = gpmlEntityNode.select('Graphics').attr('ShapeType') || 'rectangle';
      if (shapeType === 'None') {
        shapeType = 'rectangle';
      }
      shapeType = strcase.paramCase(shapeType);
      jsonEntityNode.ShapeType = shapeType;
      jsonEntityNode.zIndex = parseFloat(gpmlEntityNode.select('Graphics').attr('ZOrder'));
      jsonEntityNode.renderableType = 'entityNode';
      jsonEntityNode["@type"] = [
        "element",
        "node",
        "entityNode",
        shapeType,
        "EntityNode",
        isContainedBy || 'notGrouped'
      ];

      var borderWidth = gpmlEntityNode.select('Graphics').attr('LineThickness') || 1;
      jsonEntityNode.borderWidth = parseFloat(borderWidth);

      // the width and height values are not clearly specified in GPML, but the closest
      // I could come up with for interpreting them as actually rendered in PathVisio (Java)
      // at scales in common use is that gpmlWidth = elementWidth + elementPadding + elementBorderWidth (on each side)
      // with a similar calculation for gpmlHeight

      var gpmlWidth = parseFloat(gpmlEntityNode.select('Graphics').attr('Width'));
      jsonEntityNode.width = gpmlWidth + jsonEntityNode.borderWidth;

      var gpmlHeight = parseFloat(gpmlEntityNode.select('Graphics').attr('Height'));
      jsonEntityNode.height = gpmlHeight + jsonEntityNode.borderWidth;

      var centerX = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterX'));
      jsonEntityNode.x = centerX - gpmlWidth/2;
      var centerY = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterY'));
      jsonEntityNode.y = centerY - gpmlHeight/2;

      jsonEntityNode.padding = "0.5em";

      var attributes = gpmlEntityNode.selectAll('Attribute');
      var doubleProperty;
      if (attributes.length > 0) {
        doubleProperty = attributes.filter(function(d, i) {
          return d3.select(this).attr('Key') === 'org.pathvisio.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
        });
        if (doubleProperty[0].length > 0) {
          jsonEntityNode.ShapeType = shapeType + '-double';
        }
      }

      pathvisiojs.data.gpml.node.getPorts(jsonEntityNode, function(ports) {
        jsonEntityNode.Port = ports;
        entityNodeCallback(jsonEntityNode);
      });
    }
    catch (e) {
      throw new Error("Error converting EntityNode or Port to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson,
    setJsonRotationValue:setJsonRotationValue
  };
}();
