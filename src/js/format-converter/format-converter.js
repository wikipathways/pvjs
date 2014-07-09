var Utils = require('./../utilities.js')
  , Gpml2Json = require('gpml2json')
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
          var pathwayMetadata = {};
          pathwayMetadata.idVersion = 0;
          pathwayMetadata.dbName = 'wikipathways';
          pathwayMetadata.dbId = 'WP1234';

          Gpml2Json.toPvjson(xml, pathwayMetadata, function(err, pvjson) {
            callback(err, pvjson)
          });
      })
    } else {
      return callback('Cannot get pvjson from the specified input.', {})
    }
  }
}
