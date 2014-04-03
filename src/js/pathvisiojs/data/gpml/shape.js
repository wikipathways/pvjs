pathvisiojs.data.gpml.shape = function(){
  'use strict';

  function toPvjson(gpmlSelection, shapeSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "Shape";

    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


