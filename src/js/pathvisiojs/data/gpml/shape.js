pathvisiojs.data.gpml.shape = function(){

  var pathvisioDefaultStyleValues = {
    'Rotation':'0.0',
    'Color':'c0c0c0',
    'FillColor':null,
    'FontSize':10,
    'FontWeight':null
  }

  function toRenderableJson(gpmlShape, pathwayIri, callbackInside) {
    try {
      pathvisiojs.data.gpml.entityNode.toRenderableJson(gpmlShape, pathwayIri, function(jsonShape) {
        jsonShape.nodeType = "Shape";

        var attributes = gpmlShape.selectAll('Attribute');
        var cellularComponent;
        if (attributes.length > 0) {
          cellularComponent = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisio.CellularComponentProperty' && d3.select(this).attr('Value') !== 'None';
          });

          if (cellularComponent[0].length > 0) {
            jsonShape.cellularComponent = cellularComponent.attr('Value');
          }
        }

        pathvisiojs.data.gpml.text.toRenderableJson(gpmlShape, pathvisioDefaultStyleValues, function(text) {
          if (!!text) {
            jsonShape.text = text;
          }

          jsonShape = pathvisiojs.data.gpml.setColorAsJson(jsonShape,
                        gpmlShape.select('Graphics').attr('Color'),
                        pathvisioDefaultStyleValues.Color);

          jsonShape = pathvisiojs.data.gpml.node.setJsonBackgroundColor(jsonShape,
                        gpmlShape.select('Graphics').attr('FillColor'),
                        pathvisioDefaultStyleValues.FillColor);

          jsonShape = pathvisiojs.data.gpml.entityNode.setJsonRotationValue(jsonShape,
                        gpmlShape.select('Graphics').attr('Rotation'),
                        pathvisioDefaultStyleValues.Rotation);

          callbackInside(jsonShape);
        });
      });
    }
    catch (e) {
      throw new Error("Error converting shape to json: " + e.message);
      callbackInside(e);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();


