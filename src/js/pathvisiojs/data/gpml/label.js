pathvisiojs.data.gpml.label = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {},
      pvjsonText = {};

    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'Label';

    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, labelSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        var pvjsonElements = [pvjsonPath];
        if (!!pvjsonText.textContent) {
          pvjsonElements.push(pvjsonText);
        }
        callback(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
