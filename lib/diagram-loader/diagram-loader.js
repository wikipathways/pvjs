var _ = require('lodash');
var AnnotationPanel = require('./annotation-panel-entity-reference-plugin.js');
var baseUrl = require('base-url');
var BridgeDb = require('bridgedb');
var bridgeDbIntegration = require('./bridgedb-integration.js');
var Gpml2Pvjson = require('gpml2pvjson');
var hyperquest = require('hyperquest');
var JSONStream = require('JSONStream');
var Rx = require('rx-extra');
var RxNode = Rx.RxNode;
var url = require('url');
var Utils = require('./../utils.js');

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
    var that = this;
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

    var pvjsonSource;

    if (pvjs.kaavioOptions.fileType === 'gpml') {
      // Load xml
      // TODO this actually is pausable
      var gpmlStringSource = RxNode.fromUnpausableStream(
        hyperquest(uri, {
          withCredentials: false
        })
      );

      var gpml2pvjson = new Gpml2Pvjson();

      pvjsonSource = gpml2pvjson.getGpmlAndConvertToPvjsonSource(gpmlStringSource, pathwayMetadata)
      .doOnNext(function(result) {
        // TODO get rid of this when the pvjson to GPML converter is done
        var gpml = result.gpml;
        window.mygpml = gpml;
        pvjs.kaavioOptions.original = gpml;
      })
      .map(function(result) {
        return result.pvjson;
      })
      .shareReplay();
    } else if (pvjs.kaavioOptions.fileType === 'pvjson') {
      pvjsonSource = RxNode.fromUnpausableStream(
        hyperquest(uri, {
          withCredentials: false
        })
      )
      .streamThrough(JSONStream());
    } else {
      //throw new Error('Cannot get pvjson from the specified input.');
      pvjsonSource = Rx.Observable.return(new Error('Cannot get pvjson from the specified input.'));
    }

    return pvjsonSource
    .doOnNext(function(pvjson) {
      var bridgeDb = pvjs.kaavioOptions.bridgeDb = new BridgeDb({
        organism: pvjson.organism
      });

      pvjs.kaavioOptions.entityReferenceSource = pvjsonSource
      .flatMap(function(pvjson) {
        return Rx.Observable.from(pvjson.elements)
        .filter(function(pvjsElement) {
          // jscs: disable
          return pvjsElement.data_source && pvjsElement.identifier;
          // jscs: enable
        })
        .map(function(pvjsElement) {
          return bridgeDbIntegration.addGetSetEntityReferenceMethodToDataNode(
              bridgeDb, pvjson, pvjsElement);
        })
        .flatMap(function(pvjsElement) {
          return Rx.Observable.fromPromise(pvjsElement.getSetEntityReference())
          .filter(function(entityReference) {
            return entityReference;
          })
          .doOnNext(function(entityReference) {
            pvjsElement.getAllAnnotationPanelData =
                new AnnotationPanel(
                    bridgeDb, pvjs.kaavioOptions.jsonldRx, pvjson, pvjs.kaavioOptions.selector
                )
                .getAllAnnotationPanelData.bind(
                    undefined, pvjsElement, entityReference
                );
          });
        });
      });
    })
    .doOnNext(function(pvjson) {
      // TODO remove this. It's just for dev/testing.
      window.mypvjson = pvjson;
    })
    .subscribe(function(pvjson) {
      callback(null, pvjson);
    }, callback);
  }

  return {
    canRender: canRender,
    loadAndConvert: loadAndConvert,
    needDataConverted: needDataConverted,
    destroyRender: destroyRender
  };
};
