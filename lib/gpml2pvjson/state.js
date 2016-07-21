var GpmlElement = require('./element.js');
var Graphics = require('./graphics.js');

module.exports = (function() {
  'use strict';

  var toPvjson = function(pvjs, gpmlSelection, stateSelection, callback) {
    var pvjsonPath = {};
    GpmlElement.toPvjson(pvjs, gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath) {
      Graphics.toPvjson(pvjs, gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElement = pvjsonPath;
        return callback(pvjsonElement);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}());
