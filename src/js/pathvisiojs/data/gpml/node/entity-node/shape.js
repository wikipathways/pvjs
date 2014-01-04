"use strict";
pathvisiojs.data.gpml.element.node.entityNode.shape = function(){

  var pathvisioDefaultStyleValues = {
    'Shape':{
      'Rotation':'0.0',
      'Color':null,
      'FillColor':null,
      'FontSize':10,
      'FontWeight':null,
      'LineStyle':null,
      'LineThickness':null,
      'Cell':{
        'Color':'c0c0c0',
        'LineStyle':'Broken'
      },
      'Nucleus':{
        'Color':'c0c0c0'
      },
      'EndoplasmicReticulum':{
        'Color':'c0c0c0'
      },
      'GolgiApparatus':{
        'Color':'c0c0c0'
      },
      'Mitochondria':{
        'Color':'c0c0c0'
      },
      'SarcoplasmicReticulum':{
        'Color':'c0c0c0'
      },
      'Organelle':{
        'Color':'c0c0c0'
      },
      'Vesicle':{
        'Color':'c0c0c0'
      },
      'ExtracellularRegion':{
        'Color':'c0c0c0'
      }
    }
  }

  function toRenderableJson(gpmlShape, pathwayIri, callback) {
    
    // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
    // Below we correct the GPMl so that the display in pathvisiojs will matches the display in PathVisio-Java.
    console.log('gpmlShape at first');
    console.log(gpmlShape);
    self.myGpmlShape = gpmlShape;
    var gpmlWidth, gpmlCenterX; 
    if (gpmlShape.select('Graphics').attr('ShapeType') === 'Triangle') {
      gpmlWidth = parseFloat(gpmlShape.select('Graphics').attr('Width'));
      gpmlCenterX = parseFloat(gpmlShape.select('Graphics').attr('CenterX'));
      gpmlShape.select('Graphics').attr('CenterX', gpmlCenterX + gpmlWidth * 0.27);
      gpmlShape.select('Graphics').attr('Width', gpmlWidth * 0.98);
      console.log('gpmlShape');
      console.log(gpmlShape);
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

    var thisPathvisioDefaultStyleValues;
    if (!!jsonShape.CellularComponent) {
      thisPathvisioDefaultStyleValues = pathvisiojs.utilities.collect(pathvisioDefaultStyleValues.Shape, pathvisioDefaultStyleValues.Shape[strcase.classCase(jsonShape.CellularComponent)]);
    }
    else {
      thisPathvisioDefaultStyleValues = pathvisioDefaultStyleValues.Shape;
    }

    pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson(gpmlShape, jsonShape, thisPathvisioDefaultStyleValues, pathwayIri, function(jsonShape) {
      pathvisiojs.data.gpml.text.toRenderableJson(gpmlShape, thisPathvisioDefaultStyleValues, function(text) {
        if (!!text) {
          jsonShape.text = text;
        }

        jsonShape = pathvisiojs.data.gpml.setColorAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('Color'),
                      thisPathvisioDefaultStyleValues.Color);

        jsonShape = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonShape,
                      gpmlShape.select('Graphics').attr('FillColor'),
                      thisPathvisioDefaultStyleValues.FillColor);

        jsonShape = pathvisiojs.data.gpml.element.node.entityNode.setJsonRotationValue(jsonShape,
                      gpmlShape.select('Graphics').attr('Rotation'),
                      thisPathvisioDefaultStyleValues.Rotation);

        jsonShape = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('LineStyle'),
                      thisPathvisioDefaultStyleValues.LineStyle);

        callback(jsonShape);
      });
    });
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();


