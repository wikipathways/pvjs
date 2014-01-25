"use strict"

var pathvisiojs = function(){

  var svg, pathway, args;

  function load(args) {
    console.log(args);

    // for now, load will just load a visual representation of a pathway, but
    // this could change in the future

    // ********************************************
    // Check that required parameters are present
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified as container.');
    }
    if (!args.sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    if (args.hasOwnProperty('bridgedbLinkOutsUriStub')) {
      pathvisiojs.config.bridgedbLinkOutsUriStub = args.bridgedbLinkOutsUriStub;
    }

    if (args.hasOwnProperty('bridgedbDatasources')) {
      pathvisiojs.config.bridgedbDatasources =  args.bridgedbDatasources;
    }

    if (args.hasOwnProperty('diagramNotAvailableIconUri')) {
      pathvisiojs.config.diagramNotAvailableIconUri = args.diagramNotAvailableIconUri;
    }

    if (args.hasOwnProperty('diagramLoadingIconUri')) {
      pathvisiojs.config.diagramLoadingIconUri = args.diagramLoadingIconUri;
    }

    if (args.hasOwnProperty('pathwaySearchUriStub')) {
      pathvisiojs.config.pathwaySearchUriStub = args.pathwaySearchUriStub;
    }

    pathvisiojs.view.pathwayDiagram.load(args);
  }

  return {
    load:load
  };
}();
