var _ = require('lodash');
var DiagramLoader = require('./diagram-loader/diagram-loader');
var fs = require('fs');
var highland = require('highland');
var insertCss = require('insert-css');
var jsonld = require('jsonld');
// TODO use the one at github
var Kaavio = require('../../kaavio/index.js');
//var Kaavio = require('kaavio');
var m = require('mithril');

/*
_.assign(Kaavio.Editor.prototype, Object.create(Editor.prototype));
Kaavio.Editor.prototype.constructor = Kaavio.Editor;
//*/

var css = [
  fs.readFileSync(__dirname + '/pvjs.css')
];

var instanceCounter = 0;
/**
 * Pvjs
 *
 * @param {string} selector
 * @param {object} args
 * @return
 */
function Pvjs(selector, pvjsOptions) {
  var pvjs = this;

  // NOTE pvjsOptions can have multiple sources of data, such as pvjson, GPML and a PNG.
  // kaavioOptions can only have one source of data, which is always pvjson.
  var pvjsOptionsDefault = {
    fitToContainer: true,
    sourceData: [],
    manualRender: false,
    editor: 'disabled',
    version: 0
  };

  // Fill empty pvjsOptions with defaults
  var pvjsOptionsDefaultClone = _.clone(pvjsOptionsDefault, true);
  pvjs.pvjsOptions = _.defaults(_.omit(pvjsOptions, function(optionValue) {
    return typeof optionValue === 'undefined' || optionValue === null;
  }), pvjsOptionsDefaultClone);

  // Make this instance unique
  pvjs.instanceId = ++instanceCounter;

  // Init events object
  pvjs.events = {};

  pvjs.selector = selector;
  pvjs.diagramLoader = new DiagramLoader();

  /**
   * Init and render
   */
  pvjs.render = function() {

    // Init kaavioOptions object
    pvjs.kaavioOptions = {
      sourceIndex: -1,
      uri: null, // resource uri
      fileType: '',
      pvjson: null, // pvjson object
      rendererEngine: null, // renderer engine name
      selector: pvjs.selector,
      highlights: pvjs.pvjsOptions.highlights, // preset highlighting of element(s)
      displayErrors: pvjs.pvjsOptions.displayErrors,
      displaySuccess: pvjs.pvjsOptions.displaySuccess,
      displayWarnings: pvjs.pvjsOptions.displayWarnings,
      manualRender: pvjs.pvjsOptions.manualRender,
      editor: pvjs.pvjsOptions.editor, // initial editor state
      resource: pvjs.pvjsOptions.resource, // IRI like http://identifiers.org/wikipathways/WP4
      version: pvjs.pvjsOptions.version // WikiPathways pathway version number
    };

    pvjs.loadNextSource();

    // Listen for renderer errors
    pvjs.on('error.renderer', function() {
      pvjs.diagramLoader.destroyRender(pvjs, pvjs.kaavioOptions);
      pvjs.loadNextSource();
    });
  };

  pvjs.loadNextSource = function() {

    function initKaavio() {
      if (pvjs.pvjsOptions.editor && pvjs.pvjsOptions.editor !== 'disabled') {
        var Editor = require('./editor/editor.js').bind(pvjs);
        pvjs.editor = new Editor(pvjs);
      }
      Kaavio.call(pvjs, pvjs.selector, pvjs.kaavioOptions);
    }

    pvjs.kaavioOptions.sourceIndex += 1;

    // Check if any sources left
    if (pvjs.pvjsOptions.sourceData.length < pvjs.kaavioOptions.sourceIndex + 1) {
      pvjs.trigger('error.sourceData', {
        message: 'No more renderable sources'
      });
      return;
    }

    pvjs.kaavioOptions.uri = pvjs.pvjsOptions.sourceData[
      pvjs.kaavioOptions.sourceIndex].uri;
    pvjs.kaavioOptions.fileType = pvjs.pvjsOptions.sourceData[
      pvjs.kaavioOptions.sourceIndex].fileType;
    // TODO remove this when possible, as mentioned above
    pvjs.kaavioOptions.original = pvjs.pvjsOptions.sourceData[
      pvjs.kaavioOptions.sourceIndex].original;

    if (pvjs.diagramLoader.canRender(pvjs.kaavioOptions)) {
      if (pvjs.diagramLoader.needDataConverted(pvjs.kaavioOptions)) {
        pvjs.diagramLoader.loadAndConvert(pvjs, function(err, pvjson) {
          if (!!err) {
            pvjs.trigger('error.pvjson', {message: err});
            pvjs.loadNextSource();
            return;
          }

          pvjs.kaavioOptions.pvjson = pvjson;
          pvjs.pvjsonOriginal = JSON.parse(JSON.stringify(pvjson));

          return initKaavio();
        });
      } else {
        pvjs.kaavioOptions.pvjson = pvjs.pvjsOptions.sourceData[0];
        return initKaavio();
      }
    } else {
      // try next source
      pvjs.loadNextSource();
    }
  };

  if (!pvjs.pvjsOptions.manualRender) {
    pvjs.render();
  }
}

Pvjs.prototype = Object.create(Kaavio.prototype);
Pvjs.prototype.constructor = Pvjs;

window.Pvjs = Pvjs;
module.exports = Pvjs;
