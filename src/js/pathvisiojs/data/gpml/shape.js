pathvisiojs.data.gpml.shape = function(){
  'use strict';

  function toPvjson(gpmlSelection, shapeSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "Shape";

    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        var pvjsonElements = [pvjsonPath];
        if (!!pvjsonText.textContent) {
          pvjsonElements.push(pvjsonText);
        }
        callback(pvjsonElements);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


