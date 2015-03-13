var Utils = require('./../utils.js');
var Gpml = require('gpml2json');

module.exports = {
  /**
   * Loads data and converts to pvjson data format
   * @param  {object}   kaavio     kaavio instance
   * @param  {Function} callback
   */
  loadAndConvert: function(kaavio, callback) {
    var sourceData = kaavio.sourceData;
    var pathwayMetadata = {};

    // Check for uri
    if (!kaavio.sourceData.uri) {
      return callback('No uri specified', {});
    }

    if (kaavio.sourceData.fileType === 'gpml') {
      pathwayMetadata.dbName = sourceData.db || 'wikipathways';
      pathwayMetadata.dbId = sourceData.dbId || 'WP0';
      pathwayMetadata.idVersion = sourceData.idVersion || 0;
      // Load xml
      Utils.loadXmlFromUri(kaavio.sourceData.uri, function(xml) {
        kaavio.sourceData.original = xml;
        window.myxml = xml;
        Gpml.toPvjson(xml, pathwayMetadata, function(err, pvjson) {
          var pvjsonString = JSON.stringify(pvjson, null, '  ');
          console.log('***************************************');
          console.log('');
          console.log('');
          console.log('');
          console.log('pvjsonString');
          console.log('');
          console.log(pvjsonString);
          console.log('');
          console.log('');
          console.log('');
          console.log('**************************************');
          return callback(err, pvjson);
        });
      });
    } else if (kaavio.sourceData.fileType === 'pvjson') {
      d3.json(kaavio.sourceData.uri, function(err, pvjson) {
        console.log('pvjson');
        console.log(pvjson);
        if (err) {
          console.warn(err);
          return callback(err);
        }
        return callback(err, pvjson);
      });
    } else {
      return callback('Cannot get pvjson from the specified input.', {});
    }
  }
};
