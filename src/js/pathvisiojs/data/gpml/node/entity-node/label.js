pathvisiojs.data.gpml.element.node.entityNode.label = function(){
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'Transparent',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1
  };

  var toPvjson = function(gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {},
      pvjsonText = {};
    /*
    console.log('labelSelection');
    console.log(labelSelection[0][0]);
    console.log('pathwayIri');
    console.log(pathwayIri);
    console.log('callback');
    console.log(callback);
    //*/

    var jsonLabel = {};
    jsonLabel.nodeType = "Label";
    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(labelSelection, jsonLabel, function(jsonLabel) {
      pathvisiojs.data.gpml.text.toPvjson(labelSelection, defaults, function(text) {
        if (!!text) {
          jsonLabel.text = text;
        }

        jsonLabel = pathvisiojs.data.gpml.setColorAsJson(jsonLabel,
                      labelSelection.select('Graphics').attr('Color'),
                      defaults.Color);

        var gpmlBackgroundColor = labelSelection.select('Graphics').attr('FillColor') || defaults.FillColor;
        var jsonBackgroundColor = pathvisiojs.data.gpml.gpmlColorToCssColor(gpmlBackgroundColor, defaults.FillColor);
        if (!!jsonBackgroundColor) {
          jsonLabel.backgroundColor = jsonBackgroundColor;
        }

        //*
        pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
          pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, labelSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
            pvjsonText = updatedPvjsonText;
            var pvjsonElements = [pvjsonPath];
            if (!!pvjsonText.textContent) {
              pvjsonElements.push(pvjsonText);
            }
            /*
            console.log('pvjsonPath inside');
            console.log(pvjsonPath);
            console.log('pvjsonText inside');
            console.log(pvjsonText);
            console.log('jsonDataNode inside');
            console.log(jsonDataNode);
            //*/
            callback(pvjsonElements);
          });
        });
        //*/
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
