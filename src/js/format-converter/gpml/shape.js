var Element = require('./element.js')
  , Graphics = require('./graphics.js')
  ;

module.exports = function(){
  'use strict';

  function toPvjson(gpmlSelection, shapeSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "Shape";

    Element.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
      Graphics.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


