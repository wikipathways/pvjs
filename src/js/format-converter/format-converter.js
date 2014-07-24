var Utils = require('./../utilities.js')
  , Gpml = require('gpml2json')
  ;

module.exports = {
  /**
   * Loads data and converts to pvjson data format
   * @param  {object}   pvjs     pvjs instance
   * @param  {Function} callback
   */
  loadAndConvert: function(pvjs, callback) {
    var sourceData = pvjs.sourceData

    // Check for uri
    if (!pvjs.sourceData.uri) {
      return callback('No uri specified', {})
    }

    if (pvjs.sourceData.fileType === 'gpml') {
      // Load xml
      Utils.loadXmlFromUri(pvjs.sourceData.uri, function(xml) {
          // TODO get the correct metadata (possibly from input arguments). Below is just placeholder text.
          var pathwayMetadata = {};
          pathwayMetadata.idVersion = 0;
          pathwayMetadata.dbName = 'wikipathways';
          pathwayMetadata.dbId = 'WP1';

          Gpml.toPvjson(xml, pathwayMetadata, function(err, pvjson) {
            callback(err, pvjson)
          });
      })
    } else {
      return callback('Cannot get pvjson from the specified input.', {})
    }
  }
}
