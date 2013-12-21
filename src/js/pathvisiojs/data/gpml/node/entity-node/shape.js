"use strict";
pathvisiojs.data.gpml.node.entityNode.shape = function(){

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

  function toRenderableJson(gpmlShape, pathwayIri, callbackInside) {
    try {
      var jsonShape = {};
      pathvisiojs.data.gpml.node.entityNode.toRenderableJson(gpmlShape, jsonShape, pathwayIri, function(jsonShape) {
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

        pathvisiojs.data.gpml.text.toRenderableJson(gpmlShape, thisPathvisioDefaultStyleValues, function(text) {
          if (!!text) {
            jsonShape.text = text;
          }

          jsonShape = pathvisiojs.data.gpml.setColorAsJson(jsonShape,
                        gpmlShape.select('Graphics').attr('Color'),
                        thisPathvisioDefaultStyleValues.Color);

          jsonShape = pathvisiojs.data.gpml.node.setJsonBackgroundColor(jsonShape,
                        gpmlShape.select('Graphics').attr('FillColor'),
                        thisPathvisioDefaultStyleValues.FillColor);

          jsonShape = pathvisiojs.data.gpml.node.entityNode.setJsonRotationValue(jsonShape,
                        gpmlShape.select('Graphics').attr('Rotation'),
                        thisPathvisioDefaultStyleValues.Rotation);

          jsonShape = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonShape,
                        gpmlShape.select('Graphics').attr('LineStyle'),
                        thisPathvisioDefaultStyleValues.LineStyle);

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


