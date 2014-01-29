"use strict"

var pathvisiojs = function(){

  var svg, pathway, args;

  function load(args) {
    console.log(args);

    // for now, load will just load a visual representation of a pathway, but
    // this could change in the future if we add capabilities for analytics or data conversion.

    // ********************************************
    // Check that required parameters are present
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified to indicate where to insert the diagram.');
    }
    if (!args.sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    var configArray = d3.map(pathvisiojs.config).entries();
    var updateConfigsAsNeeded = function(configElement, callback) {
      if (args.hasOwnProperty(configElement.key)) {
        pathvisiojs.config[configElement.key] = args[configElement.key];
      }
      callback(null);
    };

    async.each(configArray, updateConfigsAsNeeded, function(err){
      console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      pathvisiojs.view.pathwayDiagram.load(args);
    });
  }

  return {
    load:load
  };
}();
