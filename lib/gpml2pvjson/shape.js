var GpmlElement = require('./element.js');
var Graphics = require('./graphics.js');

module.exports = (function() {
  'use strict';

  function toPvjson(pvjson, gpmlSelection, shapeSelection, callback) {
    var pvjsonPath = {};

    GpmlElement.toPvjson(pvjson, gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
      Graphics.toPvjson(pvjson, gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElement = pvjsonPath;
        return callback(pvjsonElement);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}());
