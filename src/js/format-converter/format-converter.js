var Utils = require('./../utilities.js')
  , Gpml = require('./gpml/gpml.js')
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
        Gpml.toPvjson(pvjs, xml, function(error, pvjson) {
          callback(error, pvjson)
        })
      })
    } else {
      return callback('Cannot get pvjson from the specified input.', {})
    }
  }
}
