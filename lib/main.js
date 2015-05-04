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

/* TODO make sure this still works. We shouldn't require it,
 * because it's a polyfill.
// Make IE work with the CustomEvent interface standard
require('custom-event-polyfill');
//*/

var css = [
  fs.readFileSync(__dirname + '/pvjs.css')
];

var instanceCounter = 0;
var optionsDefault = {
  fitToContainer: true,
  sourceData: [],
  manualRender: false,
  //manualRender: true,
  //editor: 'open'
  //editor: 'closed'
  editor: 'disabled',
  version: 0
};

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

  // Clone and fill options
  this.options = _.clone(optionsDefault, true);
  this.options = _.assign(this.options, options);

  // Make this instance unique
  this.instanceId = ++instanceCounter;

  // Init events object
  this.events = {};

  this.diagramLoader = new DiagramLoader();

  // TODO make this work
  //var kaavio = new Kaavio();

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
      selector: null, // selector instance
      rendererEngine: null, // renderer engine name
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
          pvjsonOriginal = window.pvjsonOriginal = JSON.parse(JSON.stringify(pvjson));
          pvjs.kaavio = new Kaavio(pvjs.selector, pvjs.sourceData);
          return;
        });
      } else {
        pvjs.kaavio = new Kaavio(pvjs.selector, pvjs.sourceData);
        return;
      }
    } else {
      // try next source
      pvjs.loadNextSource();
    }
  };

  /**
   * Register an event listener
   *
   * @param  {string}   topic
   * @param  {Function} callback
   */
  this.on = function(topic, callback) {
    var pvjs = this;

    var namespace = null;
    var eventName = topic;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    if (!pvjs.events.hasOwnProperty(eventName)) {
      pvjs.events[eventName] = [];
    }

    pvjs.events[eventName].push({
      callback: callback,
      namespace: namespace
    });
  };

  /**
   * Removes an event listener
   * Returns true if listener was removed
   *
   * @param  {string}   topic
   * @param  {Function} callback
   * @return {bool}
   */
  this.off = function(topic, callback) {
    var pvjs = this;

    var namespace = null;
    var eventName = topic;
    var flagRemove = true;
    callback = callback || null;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    // Check if such an event is registered
    if (!pvjs.events.hasOwnProperty(eventName)) {return false;}
    var queue = pvjs.events[topic];

    for (var i = queue.length - 1; i >= 0; i--) {
      flagRemove = true;

      if (namespace && queue[i].namespace !== namespace) {flagRemove = false;}
      if (callback && queue[i].callback !== callback) {flagRemove = false;}

      if (flagRemove) {queue.splice(i, 1);}
    }

    return true;
  };

  /**
   * Triggers an event. Async by default.
   * Returns true if there is at least one listener
   *
   * @param  {string} topic
   * @param  {object} message
   * @param  {bool} async By default true
   * @return {bool}
   */
  this.trigger = function(topic, message, async) {
    var pvjs = this;

    var namespace = null;
    var eventName = topic;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    if (!pvjs.events.hasOwnProperty(eventName)) {return false;}

    var queue = pvjs.events[eventName];
    if (queue.length === 0) {return false;}

    if (async === undefined) {
      async = true;
    }

    // Use a function as i may change meanwhile
    var callAsync = function(i) {
      setTimeout(function() {
        queue[i].callback(message);
      }, 0);
    };

    for (var i = 0; i < queue.length; i++) {
      if (namespace && queue[i].namespace && namespace !== queue[i].namespace) {
        continue;
      }

      if (async) {
        // freeze i
        callAsync(i);
      } else {
        queue[i].callback(message);
      }
    }
    return true;
  };

}

if (!!window.Kaavio) {
  pvjsCustomElement.registerElement(Pvjs);
} else {
  window.addEventListener('kaavioready', function(e) {
    pvjsCustomElement.registerElement(Pvjs);
  }, false);
}
