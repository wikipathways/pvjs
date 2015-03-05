var _ = require('lodash');
var customElement = require('./custom-element');
var Editor = require('./editor/editor');
var ElementResizeDetector = require('element-resize-detector');
var fs = require('fs');
var highland = require('highland');
var insertCss = require('insert-css');
var PvjsHighlighter = require('./highlighter/highlighter.js');
var promisescript = require('promisescript');
var Utils = require('./utils');
var DiagramRenderer = require('./diagram-renderer/diagram-renderer');
var FormatConverter = require('./format-converter/format-converter');
var Spinner = require('spin.js');

// Make IE work with the CustomEvent interface standard
require('custom-event-polyfill');

var css = [
  fs.readFileSync(__dirname + '/pvjs.css')
];

/**
 * initPvjs
 *
 * @param {object} window
 * @param {object} $
 * @return
 */
function initPvjs(window, $) {
  'use strict';

  // TODO should we check for whether the user requested the highlighter
  // before loading it?
  if (window.hasOwnProperty('initPvjsHighlighter')) {
    window.initPvjsHighlighter(window, $);
  }

  var diagramRenderer = new DiagramRenderer();
  css.map(insertCss);

  /**
   * Pvjs constructor
   *
   * @param {object} element Dom element
   * @param {object} options
   */
  var Pvjs = function(element, options) {
    this.init(element, options);
  };

  var instanceCounter = 0;
  var optionsDefault = {
    fitToContainer: true,
    sourceData: [],
    manualRender: false,
    //editor: 'open'
    editor: 'closed'
  };

  /**
   * Pvjs initialisation
   *
   * @param  {object} element Dom element
   * @param  {object} options
   */
  Pvjs.prototype.init = function(element, options) {
    this.$element = d3.select(element).html(''); // select and empty the element

    var spinnerOptions = {
      lines: 13, // The number of lines to draw
      length: 20, // The length of each line
      width: 10, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    };

    var spinner = new Spinner(spinnerOptions).spin(element);

    // Clone and fill options
    this.options = _.clone(optionsDefault, true);
    this.options = _.assign(this.options, options);

    // Make this instance unique
    this.instanceId = ++instanceCounter;

    // Init events object
    this.events = {};

    this.initContainer();
    if (this.options.editor !== 'disabled') {
      this.editor = new Editor(this);
      if (this.options.editor === 'open') {
        this.editor.open();
      }
    }

    // Check if render should be called now or it will be done later manually
    if (!this.options.manualRender) {
      this.render(this);
    }
  };

  /**
   * Creates DOM container and parses its sizes.
   * Adds loading state to container.
   * Adds hook for loaded event to remove loading state
   */
  Pvjs.prototype.initContainer = function() {
    var pvjs = this;
    var containerContents = fs.readFileSync(
        __dirname + '/pvjs.html').toString();

    // Add default container elements
    this.$element.html(containerContents);

    // Set ID to $element if it has no ID
    this.$element.attr('id', this.$element.attr('id') ||
        'pvjs-' + this.instanceId);

    // TODO Look into allowing user to override our default styling,
    // possibly via a custom stylesheet.
    Utils.addClassForD3(this.$element, 'pvjs-container');

    // Set loading class
    Utils.addClassForD3(this.$element, 'loading');

    // Remove loading state after pvjs is loaded
    this.on('rendered', function() {
      Utils.removeClassForD3(pvjs.$element, 'loading');

      // Initialize Highlighter plugin
      pvjs.publicInstance.highlighter = new PvjsHighlighter(pvjs.publicInstance);

      var vm = pvjs.$element[0][0];
      var diagramContainerElement = vm.querySelector(
          '.diagram-container');

      /*
      // TODO set this correctly the first time
      var testingHeight = diagramContainerElement.clientHeight;
      diagramContainerElement.setAttribute('style',
        'padding: 3px 6px 30px 3px; ' +
        'height: ' + (testingHeight - 200) + 'px; ');
      pvjs.publicInstance.resizeDiagram();
      //*/

      var svgElement = diagramContainerElement.querySelector(
        '#pvjs-diagram-' + pvjs.publicInstance.instanceId);

      var createEventListenerStream = function(type, eventTarget) {
        var addEventListenerCurried =
            highland.ncurry(2, eventTarget.addEventListener, type);

        var addEventListenerFlipped = highland.flip(addEventListenerCurried);

        var createStream = highland.wrapCallback(addEventListenerFlipped);

        var stream = createStream(type)
        .errors(function(err, push) {
          // The callback is not a Node.js-style callback
          // with err as the first argument, so we need
          // to push it along if it's an event, not an error.
          // TODO is this a cross-browser compatible
          // for detecting an event?
          if (err.hasOwnProperty('bubbles')) {
            return push(null, err);
          }

          throw err;
        });

        return stream;
      }

      // corresponds to ~60Hz
      var refreshInterval = 16;

      // TODO look at using wrapCallbackUnending here
      // to avoid the issue with forking and recursion.
      var createWindowResizeListener = function() {
        var windowResizeListener = createEventListenerStream('resize', window);
        windowResizeListener.fork()
        .debounce(refreshInterval)
        .each(function() {
          pvjs.publicInstance.resizeDiagram();
        });

        // TODO This seems kludgey.
        windowResizeListener.fork()
        .last()
        .each(function() {
          createWindowResizeListener();
        });
      };
      createWindowResizeListener();

      function wrapCallbackUnending(fn) {
        return highland(function(push, next) {
          fn(function(data) {
            // TODO figure out why lodash throws the error below
            // when I try to use _.isError()
            // "Uncaught TypeError: undefined is not a function"
            // It's probably becase I'm using an old version of lodash
            // that doesn't yet have the isError method.
            //if (_.isError(data)) {
            // Using the following as error detector, until I update the
            // lodash version.
            if (!!data.message && !!data.name &&
                data.name.toLowerCase().indexOf('error') > -1) {
              var err = data;
              push(err);
              return next();
            }

            push(null, data);
            return next();
          });
        });
      }

      // TODO avoid multiple resize event listeners. One should work fine.
      // But right now, it doesn't.
      var elementResizeDetectorInstance = new ElementResizeDetector({
        allowMultipleListeners: true
      });
      var createElementResizeListener = function(element) {
        var curried = highland.curry(
            elementResizeDetectorInstance.listenTo, element);
        return wrapCallbackUnending(curried);
      };

      createElementResizeListener(vm)
        .debounce(refreshInterval)
        .each(function(element) {
          console.log('element resized');
          /* We probably can get rid of the code commented out here
          if (_.isElement(element)) {
            diagramContainerElement.setAttribute('style',
              'width: ' + element.clientWidth + 'px; ' +
              'height: ' + element.clientHeight + 'px; ')
            diagramContainerElement.setAttribute('style',
              'width: ' + element.clientWidth + 'px; ' +
              'height: ' + element.clientHeight + 'px; ')
            svgElement.setAttribute('width', '100%')
            svgElement.setAttribute('height', '100%')
          }
          //*/
          pvjs.publicInstance.resizeDiagram();
        });

      /*// TODO read the URL query parameters and also the
        // highlight="[{}, {}]" attribute to get these values

      // Initialize Highlighter plugin
      var hi = pvjsHighlighter(pvjs.publicInstance);
      // TODO don't use hi in global namespace
      window.hi = hi

      // TODO don't hard-code these
      // Highlight by ID
      hi.highlight('#eb5')
      hi.highlight('id:d25e1')

      // Highlight by Text
      hi.highlight('Mitochondrion', null, {backgroundColor: 'gray'})

      // Highlight by xref
      hi.highlight('xref:id:http://identifiers.org/wormbase/ZK1193.5', null, {
        backgroundColor: 'magenta', borderColor: 'black'})
      hi.highlight('xref:GCN-2', null, {
        backgroundColor: 'blue',
        backgroundOpacity: 0.5,
        borderColor: 'red',
        borderWidth: 1,
        borderOpacity: 0.7
      });
      //*/
    });

    // Get container sizes
    var boundingRect = this.$element[0][0].getBoundingClientRect();

    // TODO take in account paddings, margins and border
    this.elementWidth = +boundingRect.width;

    // TODO take in account paddings, margins and border
    this.elementHeight = +boundingRect.height;
  };

  /**
   * Init and render
   */
  Pvjs.prototype.render = function() {
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

    this.checkAndRenderNextSource();

    // Listen for renderer errors
    this.on('error.renderer', function() {
      diagramRenderer.destroyRender(pvjs, pvjs.sourceData);
      pvjs.checkAndRenderNextSource();
    });
  };

  Pvjs.prototype.checkAndRenderNextSource = function() {
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

  Pvjs.prototype.destroy = function() {
    // Send destroy message
    this.trigger(
        'destroy.pvjs', {message: 'User requested pvjs destroy'}, false)

    // Destroy renderer
    diagramRenderer.destroyRender(this, this.sourceData)

    // Off all events
    for (var e in this.events) {
      this.off(e)
    }

    // Clean data
    this.$element[0][0].data = undefined

    if ($) {
      $(this.$element[0][0]).removeData('pvjs')
    }

    // Clean HTML
    // jQuery
    $(this.$element[0][0]).empty()

  }

  /**
   * Returns an instance for public usage
   * @return {object}
   */
  Pvjs.prototype.getPublicInstance = function() {
    var that = this;

    if (this.publicInstance === undefined) {
      // Initialise public instance
      this.publicInstance = {
        instanceId: this.instanceId,
        $element: this.$element,
        destroy: Utils.proxy(this.destroy, this),
        on: Utils.proxy(this.on, this),
        off: Utils.proxy(this.off, this),
        trigger: Utils.proxy(this.trigger, this),
        render: Utils.proxy(this.render, this),
        pan: function(point) {if (that.panZoom) {that.panZoom.pan(point);}},
        panBy: function(point) {if (that.panZoom) {that.panZoom.panBy(point);}},
        getPan: function() {return that.panZoom.getPan();},
        resizeDiagram: function() {return that.panZoom.resizeDiagram();},
        zoom: function(scale) {if (that.panZoom) {that.panZoom.zoom(scale);}},
        zoomBy: function(scale) {
          if (that.panZoom) {
            that.panZoom.zoomBy(scale);
          }
        },
        zoomAtPoint: function(scale, point) {
          if (that.panZoom) {
            that.panZoom.zoomAtPoint(scale, point);
          }
        },
        zoomAtPointBy: function(scale, point) {
          if (that.panZoom) {
            that.panZoom.zoomAtPointBy(scale, point);
          }
        },
        getZoom: function() {return that.panZoom.getZoom();},
        getOptions: function() {return _.clone(that.options, true);},
        getSourceData: function() {
          // return _.clone(that.sourceData, true);
          return {
            sourceIndex: that.sourceData.sourceIndex,
            uri: that.sourceData.uri,
            fileType: that.sourceData.fileType,
            pvjson: _.clone(that.sourceData.pvjson, true),
            selector: that.sourceData.selector.getClone(),
            rendererEngine: that.sourceData.rendererEngine
          };
        }
      };
    }

    return this.publicInstance;
  };

  /**
   * Register an event listener
   *
   * @param  {string}   topic
   * @param  {Function} callback
   */
  Pvjs.prototype.on = function(topic, callback) {
    var namespace = null;
    var eventName = topic;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
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
  Pvjs.prototype.off = function(topic, callback) {
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
    if (!this.events.hasOwnProperty(eventName)) {return false;}
    var queue = this.events[topic];

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
  Pvjs.prototype.trigger = function(topic, message, async) {
    var namespace = null;
    var eventName = topic;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    if (!this.events.hasOwnProperty(eventName)) {return false;}

    var queue = this.events[eventName];
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

  /**
   *
   */
  if ($) {
    /**
     * jQuery plugin entry point. Only if jQuery is defined.
     * If option is 'get' then returns an array of pvjs public instances.
     * Otherwise returns an jQuery object to allow chaining.
     *
     * @param  {string} option
     * @return {object} array || jQuery object
     */
    $.fn.pvjs = function(option) {
      // Instantiate Pvjs for all elements
      var $return = this.each(function() {
        var $this = $(this);
        var data = $this.data('pvjs');
        var options = typeof option == 'object' && option;

        if (!data) {
          $this.data('pvjs', (new Pvjs(this, options)));
        }
      });

      if (option === 'get') {
        // Return an array of Pvjs instances
        return $.map(this, function(a) {
          return $(a).data('pvjs').getPublicInstance();
        });
      } else {
        // Return jQuery object
        return $return;
      }
    };
  }

  /**
   * Globally available method
   * Returns an array of public instances
   *
   * @param  {string} selector
   * @param  {object} option
   * @return {array}
   */
  window.pvjs = function(selector, option) {
    var $elements;

    if (Utils.isElement(selector)) {
      $elements = [[selector]];
    } else {
      $elements = d3.selectAll(selector);
    }

    return _.map($elements[0], function(element) {
      if (element.data === undefined) {element.data = {};}

      var data;
      var options = typeof option == 'object' ? option : {};

      if (element.data.pvjs === undefined) {
        element.data.pvjs = (data = new Pvjs(element, options));
      } else {
        data = element.data.pvjs;
      }

      return data.getPublicInstance();
    });
  };

  if (!!$) {
    $(window).trigger('pvjsReady');
  }
}

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
    exposed: 'd3',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.6/d3.min.js',
    loaded: (function() {
      return !!window.d3;
    })()
  },
  {
    exposed: 'jQuery',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js',
    loaded: (function() {
      return !!window.jQuery;
    })()
  },
  {
    // TODO figure out the path for the jQuery typeahead.js
    // plugin, starting from window or document. We need it
    // to ensure the plugin has loaded.
    //exposed: '',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.2/' +
      'typeahead.bundle.min.js',
    loaded: (function() {
      return !!window.jQuery && !!window.jQuery('body').typeahead;
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
  },
  {
    exposed: 'Modernizr.inputtypes.color',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/' +
        'spectrum/1.6.1/spectrum.min.js',
    loaded: (function() {
      return !!window.Modernizr.inputtypes.color;
    })()
  },
  {
    exposed: 'Modernizr.inputtypes.color',
    type: 'style',
    url: '//cdnjs.cloudflare.com/ajax/libs/' +
        'spectrum/1.6.1/spectrum.min.css',
    loaded: (function() {
      return !!window.Modernizr.inputtypes.color;
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
function loadAssetStreaming(args) {
  return highland(promisescript(args));
}

highland(assetsToLoad)
  .filter(function(asset) {
    return !asset.loaded;
  })
  .errors(function(err, push) {
    push(err);
  })
  .flatMap(loadAssetStreaming)
  .collect()
  .each(function(result) {
    console.log('result');
    console.log(result);
    initPvjs(window, window.jQuery || null);
    customElement.registerElement();
  });
