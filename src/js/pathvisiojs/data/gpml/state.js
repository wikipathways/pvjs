pathvisiojs.data.gpml.state = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, stateSelection, callback) {
    var pvjsonPath = {},
      pvjsonText = {};
    pvjsonPath.nodeType = "State";
    /*
    console.log('stateSelection');
    console.log(stateSelection[0][0]);
    console.log('pathwayIri');
    console.log(pathwayIri);
    console.log('callback');
    console.log(callback);
    //*/

        //*
        pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
          pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, stateSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
            pvjsonText = updatedPvjsonText;
            var pvjsonElements = [pvjsonPath];
            if (!!pvjsonText.textContent) {
              pvjsonElements.push(pvjsonText);
            }
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
