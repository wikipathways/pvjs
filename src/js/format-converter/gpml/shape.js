pathvisiojs.formatConverter.gpml.shape = function(){
  'use strict';

  function toPvjson(gpmlSelection, shapeSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "Shape";

    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


