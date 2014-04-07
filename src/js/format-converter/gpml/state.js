pathvisiojs.formatConverter.gpml.state = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, stateSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'State';
    /*
    console.log('stateSelection');
    console.log(stateSelection[0][0]);
    console.log('pathwayIri');
    console.log(pathwayIri);
    console.log('callback');
    console.log(callback);
    //*/

        //*
        pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath) {
          pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath) {
            var pvjsonElements = [pvjsonPath];
            /*
            console.log('pvjsonPath inside');
            console.log(pvjsonPath);
            console.log('pvjsonText inside');
            console.log(pvjsonText);
            console.log('jsonDataNode inside');
            console.log(jsonDataNode);
            //*/
            callback(pvjsonElements);
          });
        });
        //*/
  };

  return {
    toPvjson:toPvjson
  };
}();
