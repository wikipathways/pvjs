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
    

    var jsonShape = {}, jsonPath = {};
    jsonShape.nodeType = "Shape";


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
            callback(jsonPath);
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


