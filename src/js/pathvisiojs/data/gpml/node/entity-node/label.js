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
    pvjsonPath.nodeType = "Label";
    /*
    console.log('labelSelection');
    console.log(labelSelection[0][0]);
    console.log('pathwayIri');
    console.log(pathwayIri);
    console.log('callback');
    console.log(callback);
    //*/

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
  };

  return {
    toPvjson:toPvjson
  };
}();
