var _ = require('lodash');
var DiagramLoader = require('./diagram-loader/diagram-loader');
var fs = require('fs');
var highland = require('highland');
var insertCss = require('insert-css');
var Kaavio = require('kaavio');
//var m = require('mithril');

var css = [
  fs.readFileSync(__dirname + '/pvjs.css')
];

var instanceCounter = 0;
/**
 * Pvjs
 *
 * @param {string} selector can be either a CSS selector specifying
 *                 the container element.
 *                 TODO also allow for
 *                 it to be an actual DOM element.
 * @param {object} pvjsOptions
 * @param {string[]|Object[]} sourceData source of data to display,
 *                            such as pvjson, GPML or a PNG, or a
 *                            link to same.
 *                            TODO verify both link
 *                            and actual data are OK as inputs.
 * @param {boolean} [pvjsOptions.fitToContainer=true]
 * @param {boolean} [pvjsOptions.manualRender=false] don't render until
 *                  pvjs.render() is called.
 * @param {string} [pvjsOptions.pvjsOptions='disabled'] initial state of
 *                 the editor. Can be 'open', 'closed' or 'disabled'.
 * @param {number} [pvjsOptions.version=0] version of the pathway as
 *                 provided in the source data.
 * @return
 */
function Pvjs(selector, pvjsOptions) {
  var pvjs = this;
  window.m.startComputation();

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
      Kaavio.call(pvjs, pvjs.selector, pvjs.kaavioOptions);
      if (pvjs.pvjsOptions.editor && pvjs.pvjsOptions.editor !== 'disabled') {
        // TODO this doesn't work correctly with browserify. browserify will go through
        // all the requires, even if they're inside an "if"
        pvjs.editor = require('./editor/editor.js').call(pvjs, pvjs);
      }

      window.m.mount(selector, pvjs.kaavioComponent);
      window.m.endComputation();
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

    if (pvjs.diagramLoader.canRender(pvjs.kaavioOptions)) {
      if (pvjs.diagramLoader.needDataConverted(pvjs.kaavioOptions)) {
        pvjs.diagramLoader.loadAndConvert(pvjs, function(err, pvjson) {
          if (!!err) {
            pvjs.trigger('error.pvjson', {message: err});
            pvjs.loadNextSource();
            return;
          }

          pvjs.kaavioOptions.pvjson = pvjson;

          initKaavio();
          return;

        });
      } else {
        pvjs.kaavioOptions.pvjson = pvjs.pvjsOptions.sourceData[0];
        initKaavio();
        return;
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
