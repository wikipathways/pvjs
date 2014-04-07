pathvisiojs.formatConverter.gpml.label = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {};

    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'Label';

    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
