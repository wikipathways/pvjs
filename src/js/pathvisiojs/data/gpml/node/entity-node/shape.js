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

  function toPvjson(gpmlSelection, shapeSelection, callback) {
    
    // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
    // Below we correct the GPMl so that the display in pathvisiojs will matches the display in PathVisio-Java.
    var gpmlWidth, gpmlCenterX;
    if (shapeSelection.select('Graphics').attr('ShapeType') === 'Triangle') {
      gpmlWidth = parseFloat(shapeSelection.select('Graphics').attr('Width'));
      gpmlCenterX = parseFloat(shapeSelection.select('Graphics').attr('CenterX'));
      shapeSelection.select('Graphics').attr('CenterX', gpmlCenterX + gpmlWidth * 0.27);
      shapeSelection.select('Graphics').attr('Width', gpmlWidth * 0.98);
    }

    var jsonShape = {}, jsonPath = {};
    jsonShape.nodeType = "Shape";

    var attributes = shapeSelection.selectAll('Attribute');
    var CellularComponent;
    if (attributes.length > 0) {
      CellularComponent = attributes.filter(function(d, i) {
        return d3.select(this).attr('Key') === 'org.pathvisio.CellularComponentProperty' && d3.select(this).attr('Value') !== 'None';
      });

      if (CellularComponent[0].length > 0) {
        jsonShape.CellularComponent = CellularComponent.attr('Value');
      }
    }

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(shapeSelection, jsonShape, function(jsonShape) {
      pathvisiojs.data.gpml.text.toPvjson(shapeSelection, defaults, function(text) {
        if (!!text) {
          jsonShape.text = text;
        }

        jsonShape = pathvisiojs.data.gpml.setColorAsJson(jsonShape,
                      shapeSelection.select('Graphics').attr('Color'),
                      defaults.Color);

        var gpmlFillColor = shapeSelection.select('Graphics').attr('FillColor') || defaults.FillColor;
        jsonShape = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonShape, gpmlFillColor);

        jsonShape = pathvisiojs.data.gpml.element.node.entityNode.setJsonRotationValue(jsonShape,
                      shapeSelection.select('Graphics').attr('Rotation'),
                      defaults.Rotation);

        jsonShape = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonShape,
                      shapeSelection.select('Graphics').attr('LineStyle'),
                      defaults.LineStyle);
        //*
        pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, shapeSelection, jsonPath, function(jsonPath, pvjsonText) {
          pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, shapeSelection, jsonPath, pvjsonText, function(jsonPath, updatedPvjsonText) {
            pvjsonText = updatedPvjsonText;
            /*
            console.log('jsonPath inside');
            console.log(jsonPath);
            console.log('pvjsonText inside');
            console.log(pvjsonText);
            console.log('jsonDataNode inside');
            console.log(jsonDataNode);
            //*/
            callback(jsonShape, jsonPath, pvjsonText);
          });
        });
        //*/
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


