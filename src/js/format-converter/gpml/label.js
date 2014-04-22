var GpmlElement = require('./element.js')
  , Graphics = require('./graphics.js')
  ;

module.exports = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {};

    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'Label';

    GpmlElement.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
      Graphics.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
