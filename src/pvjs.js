var _ = require('lodash');
var customElement = require('./custom-element');
var DiagramComponent = require('./diagram-renderer/diagram-component');
var Editor = require('./editor/editor');
var ElementResizeDetector = require('element-resize-detector');
var fs = require('fs');
var highland = require('highland');
var insertCss = require('insert-css');
var m = require('mithril');
var PvjsHighlighter = require('./highlighter/highlighter.js');
var promisescript = require('promisescript');
var Utils = require('./utils');
var DiagramRenderer = require('./diagram-renderer/diagram-renderer');
var FormatConverter = require('./format-converter/format-converter');
var Spinner = require('spin.js');

var Kaavio = require('../../kaavio/src/pvjs.js');

// Make IE work with the CustomEvent interface standard
require('custom-event-polyfill');

var css = [
  fs.readFileSync(__dirname + '/pvjs.css')
];

console.log('hey');

/**
 * Pvjs
 *
 * @param {string} selector
 * @param {object} args
 * @return
 */
function Pvjs() {
  'use strict';

  var instance = this;

  // TODO make this work
  //var kaavio = new Kaavio();

  /**
   * Init and render
   */
  instance.render = function(selector, args) {
    var pvjs = this;

    // Init sourceData object
    this.sourceData = {
      sourceIndex: -1,
      uri: null, // resource uri
      fileType: '',
      pvjson: null, // pvjson object
      selector: null, // selector instance
      rendererEngine: null // renderer engine name
    };

    return kaavio('#pvjs-container', args);

    this.checkAndRenderNextSource();

    // Listen for renderer errors
    this.on('error.renderer', function() {
      diagramRenderer.destroyRender(pvjs, pvjs.sourceData);
      pvjs.checkAndRenderNextSource();
    });
  };

  instance.checkAndRenderNextSource = function() {
    var pvjs = this;

    this.sourceData.sourceIndex += 1;

    // Check if any sources left
    if (this.options.sourceData.length < this.sourceData.sourceIndex + 1) {
      this.trigger('error.sourceData', {
        message: 'No more renderable sources'
      });
      return;
    }

    this.sourceData.uri = this.options.sourceData[
      this.sourceData.sourceIndex].uri;
    this.sourceData.fileType = this.options.sourceData[
      this.sourceData.sourceIndex].fileType;

    if (diagramRenderer.canRender(this.sourceData)) {
      if (diagramRenderer.needDataConverted(this.sourceData)) {
        FormatConverter.loadAndConvert(pvjs, function(error, pvjson) {
          if (error) {
            pvjs.trigger('error.pvjson', {message: error});
            pvjs.checkAndRenderNextSource();
          } else {
            pvjs.sourceData.pvjson = pvjson;
            diagramRenderer.render(pvjs);
          }
        });
      } else {
        diagramRenderer.render(pvjs);
      }
    } else {
      // try next source
      this.checkAndRenderNextSource();
    }
  };

}

window.Pvjs = Pvjs;

/*********************************
 * A very simple asset loader. It checks all
 * assets that could be loaded already. If they
 * are loaded already, great. Otherwise, it
 * loads them.
 *
 * It would be nice to use an
 * open-source library for this
 * to ensure it works x-browser.
 * Why did Modernizr/yepnope deprecate this
 * type of strategy?
 * ******************************/
var assetsToLoad = [
  {
    exposed: 'jQuery',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js',
    loaded: (function() {
      return !!window.jQuery;
    })()
  },
  {
    exposed: 'document.registerElement',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/' +
        'webcomponentsjs/0.5.2/CustomElements.min.js',
    loaded: (function() {
      return !!document.registerElement;
    })()
  }
];

/**
 * Streaming version of promisescript
 * https://www.npmjs.com/package/promisescript
 *
 * @param {object} args
 * @param {string} args.exposed
 * @param {string} args.type script or style
 * @param {string} args.url
 * @return {stream}
 */
function loadAssetsStreaming(args) {
  return highland(promisescript(args));
}

highland(assetsToLoad)
  .filter(function(asset) {
    return !asset.loaded;
  })
  .errors(function(err, push) {
    push(err);
  })
  .flatMap(loadAssetsStreaming)
  .collect()
  .each(function(result) {
    console.log('loaded assets y');

    setTimeout(function() {
      console.log('timeout');
      //Pvjs(window, window.jQuery || null);
      var pvjs = new Pvjs();
      customElement.registerElement();
    }, 3000);

    /*
    highland('kaavioready', $(document.body)).each(function() {
      console.log('kaavioready');
      Pvjs(window, window.jQuery || null);
      customElement.registerElement();
    });
    //*/

    console.log('loaded assets e');
  });
