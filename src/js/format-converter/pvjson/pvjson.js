pathvisiojs.formatConverter.pvjson = function(){
  'use strict';

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(renderableSourceDataElement, callback) {
    var uri = renderableSourceDataElement.uri;
    var object = renderableSourceDataElement.object;
    var fileType = renderableSourceDataElement.fileType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    // TODO handle if renderableSourceDataElement.object exists

    if (fileType === 'gpml') {
      pathvisiojs.formatConverter.gpml.get(renderableSourceDataElement, function(gpml) {
        pathvisiojs.formatConverter.gpml.toPvjson(gpml, uri, function(response) {
          console.log('pvjson');
          console.log(response.data);
          callback(response);
        });
      });
    }
    else {
      throw new Error('Cannot get pvjson from the specified input.');
    }

    // This is just an experiment with using mongodb for caching json,
    // but the higher priority for now would be to cache the SVG.
    // Caching the json would be part of having the API deliver results
    // in JSON format.
    /*
    d3.json(parsedInputData.cached, function(json) {
      callback(json);
    });
    //*/
  }

  return{
    get:get
  };
}();


