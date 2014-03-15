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
    

    var pvjsonPath = {};
    pvjsonPath.nodeType = "Shape";

    pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
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
        //*/
        callback(pvjsonElements);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


