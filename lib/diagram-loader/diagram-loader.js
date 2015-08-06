var _ = require('lodash');
var baseUrl = require('base-url');
var Gpml2Pvjson = require('gpml2pvjson');
var hyperquest = require('hyperquest');
var Rx = require('rx');
var RxNode = require('rx-node');
var url = require('url');
var Utils = require('./../utils.js');

var gpml2pvjson = new Gpml2Pvjson();

module.exports = function renderer() {

  // Render engines are sorted in order of preference -
  // viewMethod with lower index will be used if more than one is returned.
  var renderersMap = {
    gpml:   ['svg'], // Could add canvas support
    pvjson:   ['svg'], // Could add canvas support
    // biopax: ['svg'], // Not supported. Could add canvas support
    // pdf:    ['pdf'], // Not supported. This would be future. we might use pdf.js
    // or we could just try using an embed or object tag.
    png:    ['img'],
    jpg:    ['img'],
    jpeg:   ['img'],
    jpe:    ['img'],
    jif:    ['img'],
    jfif:   ['img'],
    jfi:    ['img'],
    gif:    ['img'],
    ico:    ['img'],
    bmp:    ['img'],
    dib:    ['img']
  };

  // Assuming that all browsers we care about support the HTML img tag
  var supportedRenderers = ['img'];

  // Check for Modernizr support
  if (!!window.Modernizr && window.Modernizr.inlinesvg) {
    supportedRenderers.push('svg');
  }

  /**
   * Check if renderer supports rendering a given file type
   *
   * @param  {object} kaavioOptions
   * @return {boolean}
   */
  function canRender(kaavioOptions) {
    return !!getRendererEngineName(kaavioOptions.fileType);
  }

  /**
   * Returns renderer engine name
   *
   * @param  {string} fileType
   * @return {string|bool}          engine name or false
   */
  function getRendererEngineName(fileType) {
    // If fileType unknown
    if (renderersMap[fileType] === undefined) {
      return false;
    }

    var rendererEngines = renderersMap[fileType];

    // Check if there is a match between necessary and supported renderes
    for (var i = 0; i < rendererEngines.length ; i++) {
      if (supportedRenderers.indexOf(rendererEngines[i]) !== -1) {
        return rendererEngines[i];
      }
    }

    // If nothing found
    return false;
  }

  /**
   * Check if data should be preloaded and parsed
   *
   * @param  {object} kaavioOptions kaavioOptions object
   * @return {boolean}
   */
  function needDataConverted(kaavioOptions) {
    var rendererEngine = getRendererEngineName(kaavioOptions.fileType);

    if (rendererEngine === 'svg') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Ask renderer to remove everything what is rendered
   * Useful when rendering a specific type or source failed and next one will be tried
   *
   * @param  {Object} pvjs Instace Object
   * @return {boolean} success state
   */
  function destroyRender(pvjs, kaavioOptions) {
    // TODO
    return true;
  }

  /**
   * Loads data and converts to pvjson data format
   * @param {object} pvjs instance
   * @param {Function} callback
   */
  function loadAndConvert(pvjs, callback) {
    var kaavioOptions = pvjs.kaavioOptions;
    var pathwayMetadata = {};
    pathwayMetadata.version = kaavioOptions.version;

    var uri = pvjs.kaavioOptions.uri;

    // Check for uri
    if (!uri) {
      return callback('No uri specified', {});
    }

    // handle relative URIs
    if (document && ['.', '/'].indexOf(uri[0]) > -1) {
      uri = url.resolve(baseUrl(document), uri);
    }

    var resource = kaavioOptions.resource || '';
    if (!_.isEmpty(resource)) {
      pathwayMetadata['@id'] = resource;
    }
    var identifierMatch = resource.match(/http:\/\/identifiers.org\/wikipathways\/(WP\d+)/) ||
        kaavioOptions.uri.match(/(WP\d+)/);
    pathwayMetadata.identifier = identifierMatch ? identifierMatch[1] : null;
    if (!pathwayMetadata['@id'] && !!pathwayMetadata.identifier) {
      pathwayMetadata['@id'] = 'http://identifiers.org/wikipathways/' + pathwayMetadata.identifier;
    }

    pathwayMetadata.dbName = kaavioOptions.db || 'wikipathways';

    if (pvjs.kaavioOptions.fileType === 'gpml') {
      // Load xml
      var gpmlStringSource = RxNode.fromReadableStream(
        hyperquest(uri, {
          withCredentials: false
        })
      );

      return gpml2pvjson.toPvjsonSource(gpmlStringSource, pathwayMetadata)
        .subscribe(function(pvjson) {
          window.mypvjson = pvjson;
          return callback(null, pvjson);
        }, function(err) {
          return callback(err);
        });
    } else if (pvjs.kaavioOptions.fileType === 'pvjson') {
      /*
      RxNode.fromReadableStream(
        hyperquest(uri, {
          withCredentials: false
        })
        // TODO is this right for JSONStream?
        .pipe(JSONStream('*'))
      )
        .subscribe(function(pvjson) {
          window.mypvjson = pvjson;
          return callback(null, pvjson);
        }, function(err) {
          return callback(err);
        });
      //*/
      // TODO use hyperquest and JSONStream here instead of d3
      window.d3.json(pvjs.kaavioOptions.uri, function(err, pvjson) {
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

  return {
    canRender: canRender,
    loadAndConvert: loadAndConvert,
    needDataConverted: needDataConverted,
    destroyRender: destroyRender
  };
};
