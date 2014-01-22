pathvisiojs.data.pathvisiojsJson = function(){

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var mediaType = sourceData.mediaType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!mediaType) {
      return new Error('No mediaType specified.');
    }

    // TODO handle if sourceData.object

    if (mediaType === 'application/xml+gpml') {
      pathvisiojs.data.gpml.get(sourceData, function(gpml) {
        pathvisiojs.data.gpml.toRenderableJson(gpml, uri, function(json) {
          callback(json);
        });
      });
    }
    else {
      throw new Error('Cannot get jGpml from the specified input.');
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


