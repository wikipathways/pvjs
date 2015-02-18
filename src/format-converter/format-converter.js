var Utils = require('./../utils.js');
var Gpml = require('gpml2json');

module.exports = {
  /**
   * Loads data and converts to pvjson data format
   * @param  {object}   pvjs     pvjs instance
   * @param  {Function} callback
   */
  loadAndConvert: function(pvjs, callback) {
    var sourceData = pvjs.sourceData;
    var pathwayMetadata = {};

    // Check for uri
    if (!pvjs.sourceData.uri) {
      return callback('No uri specified', {});
    }

    if (pvjs.sourceData.fileType === 'gpml') {
      pathwayMetadata.dbName = sourceData.db || 'wikipathways';
      pathwayMetadata.dbId = sourceData.dbId || 'WP0';
      pathwayMetadata.idVersion = sourceData.idVersion || 0;
      // Load xml
      Utils.loadXmlFromUri(pvjs.sourceData.uri, function(xml) {
        pvjs.sourceData.original = xml;
        window.myxml = xml;
        Gpml.toPvjson(xml, pathwayMetadata, function(err, pvjson) {
          return callback(err, pvjson);
        });
      });
    } else {
      return callback('Cannot get pvjson from the specified input.', {});
    }
  }
}
