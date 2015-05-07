var _ = require('lodash');
var pvjsCustomElement = require('./custom-element');
var DiagramLoader = require('./diagram-loader/diagram-loader');
var Editor = require('./editor/editor.js');
var fs = require('fs');
var highland = require('highland');
var insertCss = require('insert-css');
var jsonld = require('jsonld');
// TODO use the one at github
var Kaavio = require('../../kaavio/index.js');
//var Kaavio = require('kaavio');
var m = require('mithril');
var promisescript = require('promisescript');

var Pvjs = (function() {

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
  function Pvjs(selector, options) {
    var that = this;
    this.selector = selector;
    this.editor = new Editor(this);

    var optionsDefault = {
      fitToContainer: true,
      sourceData: [],
      manualRender: false,
      displayErrors: true,
      displayWarnings: true,
      //manualRender: true,
      //editor: 'open'
      //editor: 'closed'
      editor: 'disabled',
      version: 0
    };

    // Clone and fill options
    this.options = _.clone(optionsDefault, true);
    this.options = _.assign(this.options, options);

    // Make this instance unique
    this.instanceId = ++instanceCounter;

    // Init events object
    this.events = {};

    this.diagramLoader = new DiagramLoader();

    /**
     * Init and render
     */
    this.render = function() {
      var pvjs = this;

      // Init sourceData object
      pvjs.sourceData = {
        sourceIndex: -1,
        uri: null, // resource uri
        fileType: '',
        pvjson: null, // pvjson object
        rendererEngine: null, // renderer engine name
        selector: that.selector,
        highlights: pvjs.options.highlights, // preset highlighting of element(s)
        displayErrors: pvjs.options.displayErrors,
        displayWarnings: pvjs.options.displayWarnings,
        manualRender: pvjs.options.manualRender,
        editor: pvjs.options.editor, // initial editor state
        resource: pvjs.options.resource, // IRI like http://identifiers.org/wikipathways/WP4
        version: pvjs.options.version // WikiPathways pathway version #
      };

      that.loadNextSource();

      // Listen for renderer errors
      pvjs.on('error.renderer', function() {
        pvjs.diagramLoader.destroyRender(pvjs, pvjs.sourceData);
        pvjs.loadNextSource();
      });
    };

    this.loadNextSource = function() {
      var pvjs = this;

      var pvjsonOriginal;

      pvjs.sourceData.sourceIndex += 1;

      // Check if any sources left
      if (pvjs.options.sourceData.length < pvjs.sourceData.sourceIndex + 1) {
        pvjs.trigger('error.sourceData', {
          message: 'No more renderable sources'
        });
        return;
      }

      // TODO why is this event happening twice when it should happen once?
      selector.addEventListener('kaaviodatachange', function(e) {
        console.log('kaaviodatachange event received in pvjs.js');
        pvjs.editor.save({
          pvjson: e.detail.pvjson,
          pvjsonOriginal: pvjsonOriginal
        });
      }, false);

      pvjs.sourceData.uri = pvjs.options.sourceData[
        pvjs.sourceData.sourceIndex].uri;
      pvjs.sourceData.fileType = pvjs.options.sourceData[
        pvjs.sourceData.sourceIndex].fileType;

      if (pvjs.diagramLoader.canRender(pvjs.sourceData)) {
        if (pvjs.diagramLoader.needDataConverted(pvjs.sourceData)) {
          pvjs.diagramLoader.loadAndConvert(pvjs, function(error, pvjson) {
            if (!!error) {
              pvjs.trigger('error.pvjson', {message: error});
              pvjs.loadNextSource();
              return;
            }

            pvjs.sourceData.pvjson = pvjson;
            pvjsonOriginal = JSON.parse(JSON.stringify(pvjson));

            // TODO don't repeat the code below. DRY it up.
            Kaavio.call(pvjs, pvjs.selector, pvjs.sourceData);
            return;
          });
        } else {
          Kaavio.call(pvjs, pvjs.selector, pvjs.sourceData);
          return;
        }
      } else {
        // try next source
        pvjs.loadNextSource();
      }
    };

  }

  Pvjs.prototype = Object.create(Kaavio.prototype);
  Pvjs.prototype.constructor = Pvjs;

  return Pvjs;
})();

if (!!window.Kaavio) {
  pvjsCustomElement.registerElement(Pvjs);
} else {
  window.addEventListener('kaavioready', function(e) {
    pvjsCustomElement.registerElement(Pvjs);
  }, false);
}

window.Pvjs = Pvjs;
module.exports = Pvjs;
