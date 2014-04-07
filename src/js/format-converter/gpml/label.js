pathvisiojs.data.gpml.label = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {};

    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'Label';

    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
