var GpmlElement = require('./element.js');
var Graphics = require('./graphics.js');

module.exports = function(){
  'use strict';

  var toPvjson = function(pvjson, gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {};

    GpmlElement.toPvjson(pvjson, gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
      Graphics.toPvjson(pvjson, gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElement = pvjsonPath;
        return callback(pvjsonElement);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
