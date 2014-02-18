// includes GPML elements of type Shape, Label and DataNode

pathvisiojs.data.gpml.element.node.entityNode = function(){
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'Transparent',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1
  };

  var setJsonRotationValue = function(jsonNode, currentGpmlRotationValue, defaultGpmlRotationValue) {
    if (currentGpmlRotationValue !== defaultGpmlRotationValue) {
      jsonNode.rotate = currentGpmlRotationValue * 180/Math.PI; //converting from radians to degrees
    }
    return jsonNode;
  };

  var toPvjson = function(gpmlEntityNode, jsonEntityNode, EntityNodeCallback) {
    var graphId = gpmlEntityNode.attr('GraphId') || ('id' + uuid.v4());
    jsonEntityNode.id = '' + graphId;
    jsonEntityNode.GraphId = graphId;

    var isContainedBy = gpmlEntityNode.attr('GroupRef');
    if (!!isContainedBy) {
      jsonEntityNode.isContainedBy = isContainedBy;
    }

    // TODO decide whether we always need a shape
    var shapeType = gpmlEntityNode.select('Graphics').attr('ShapeType') || 'rectangle';
    shapeType = strcase.paramCase(shapeType);
    jsonEntityNode.ShapeType = shapeType;

    jsonEntityNode.zIndex = parseFloat(gpmlEntityNode.select('Graphics').attr('ZOrder'));
    jsonEntityNode.renderableType = 'EntityNode';

    jsonEntityNode["@type"] = jsonEntityNode["@type"] || [];
    jsonEntityNode["@type"].push("EntityNode");
    jsonEntityNode["@type"].push(shapeType);
    var groupedStatus = isContainedBy || 'notGrouped';
    jsonEntityNode["@type"].push(groupedStatus);

    var borderWidth = gpmlEntityNode.select('Graphics').attr('LineThickness') || defaults.LineThickness;
    borderWidth = parseFloat(borderWidth);
    jsonEntityNode.borderWidth = borderWidth;

    // exactly what is meant by "width" and "height" is not clearly specified in GPML,
    // so I analyzed examples by visually inspecting the rendering in PathVisio-Java, at
    // a zoom level that made for easy reading of DataNodes at their default size.
    // This analysis indicates the following meaning for GPML width in CSS2.1 box-model terms:
    // gpmlWidth = elementWidth + elementPadding + elementBorderWidth (1/2 on each side = 1)
    // with a similar calculation for gpmlHeight

    var gpmlWidth = parseFloat(gpmlEntityNode.select('Graphics').attr('Width'));
    jsonEntityNode.width = gpmlWidth + borderWidth;

    var gpmlHeight = parseFloat(gpmlEntityNode.select('Graphics').attr('Height'));
    jsonEntityNode.height = gpmlHeight + borderWidth;

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

    pathvisiojs.data.gpml.element.node.getPorts(jsonEntityNode, function(ports) {
      //console.log('ports');
      //console.log(ports);
      jsonEntityNode.Port = ports;
      pathvisiojs.data.gpml.element.node.toPvjson(gpmlEntityNode, jsonEntityNode, function(jsonEntityNode) {
        EntityNodeCallback(jsonEntityNode, ports);
      });
    });
  };

  return {
    setJsonRotationValue:setJsonRotationValue,
    toPvjson:toPvjson
  };
}();
