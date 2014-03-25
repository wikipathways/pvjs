pathvisiojs.data = {
  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  get: function(sourceData, callback) {
    console.log('model in data');
    console.log(this.model);

    var uri = sourceData.uri;
    var object = sourceData.object;
    var fileType = sourceData.fileType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    // TODO handle if sourceData.object

    if (fileType === 'gpml') {
      this.data.gpml.get(sourceData, function(gpml) {
        this.data.gpml.toPvjson(gpml, uri, function(json) {
          callback(json);
        });
      });
    }
    else {
      throw new Error('Cannot get jGpml from the specified input.');
    }
  }
};
