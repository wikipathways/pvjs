pathvisiojs.data.gpml.element.node.entityNode.shape = function(){
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'Transparent',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1,
    'Rotation':'0.0'
  };

  function toPvjson(gpmlShape, callback) {
    
    // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
    // Below we correct the GPMl so that the display in pathvisiojs will matches the display in PathVisio-Java.
    var gpmlWidth, gpmlCenterX;
    if (gpmlShape.select('Graphics').attr('ShapeType') === 'Triangle') {
      gpmlWidth = parseFloat(gpmlShape.select('Graphics').attr('Width'));
      gpmlCenterX = parseFloat(gpmlShape.select('Graphics').attr('CenterX'));
      gpmlShape.select('Graphics').attr('CenterX', gpmlCenterX + gpmlWidth * 0.27);
      gpmlShape.select('Graphics').attr('Width', gpmlWidth * 0.98);
    }

    var jsonShape = {};
    jsonShape.nodeType = "Shape";

    var attributes = gpmlShape.selectAll('Attribute');
    var CellularComponent;
    if (attributes.length > 0) {
      CellularComponent = attributes.filter(function(d, i) {
        return d3.select(this).attr('Key') === 'org.pathvisio.CellularComponentProperty' && d3.select(this).attr('Value') !== 'None';
      });

      if (CellularComponent[0].length > 0) {
        jsonShape.CellularComponent = CellularComponent.attr('Value');
      }
    }

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlShape, jsonShape, function(jsonShape) {
      pathvisiojs.data.gpml.text.toPvjson(gpmlShape, defaults, function(text) {
        if (!!text) {
          jsonShape.text = text;
        }

        jsonShape = pathvisiojs.data.gpml.setColorAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('Color'),
                      defaults.Color);

        var gpmlFillColor = gpmlShape.select('Graphics').attr('FillColor') || defaults.FillColor;
        jsonShape = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonShape, gpmlFillColor);

        jsonShape = pathvisiojs.data.gpml.element.node.entityNode.setJsonRotationValue(jsonShape,
                      gpmlShape.select('Graphics').attr('Rotation'),
                      defaults.Rotation);

        jsonShape = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('LineStyle'),
                      defaults.LineStyle);

        callback(jsonShape);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


