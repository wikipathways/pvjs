require('ariutta-loading');
var _ = require('lodash');
//var d3 = require('d3');
var diagramComponent = require('./diagram-renderer/diagram-component.js');
//var Editor = require('../../kaavio-editor/index.js');
//var ElementResizeDetector = require('element-resize-detector');
var footer = require('./footer.js');
var footerOpenButton = require('./footer-open-button.js');
var fs = require('fs');
var insertCss = require('insert-css');
//var m = window.m = require('mithril');
var Notifications = require('./notifications/notifications.js');
var Rx = require('rx-extra');
var RxNode = Rx.RxNode;
var Spinner = require('spin.js');
var Utils = require('./utils.js');

var css = [
  fs.readFileSync(__dirname + '/stripped-bootstrap.css'),
  fs.readFileSync(__dirname + '/kaavio.css')
];

// http://pvjs.wikipathways.org/wpi/PathwayWidget.php
// ?id=WP4&label=ADP&xref=HMDB00193,HMDB&colors=green#/editor/open

css.map(insertCss);

var instanceCounter = 0;
var optionsDefault = {
  fitToContainer: true,
  highlights: [],
  manualRender: false
};

/**
 * Kaavio constructor
 *
 * @param  {object} containerElement DOM element that is already present
 *                    on the page. The user specifies this element as
 *                    the container for all the kaavio content. It can be
 *                    any container, such as a div, section or
 *                    ariutta-kaavio custom element.
 * @param {object} options
 * @param {object} [options.pvjson] Source data. If this is not specified, src must be.
 * @param {string} [options.src] IRI (URL) to the pvjson. If this is not specified,
 *                        pvjson must be.
 * @param {string} [options.editor='closed'] Initial editor state. Can be closed, open
 *                  or disabled.
 * @param {boolean} [options.manualRender=false] If you want to specify when to render,
 *                    set this to true and then run kaavio.render when you
 *                    choose.
 * @param {boolean} [options.fitToContainer=true]
 */
var Kaavio = function(containerElement, options) {
  //window.m.startComputation();

  if (!containerElement || !options || (!options.src && !options.pvjson)) {
    throw new Error('Missing required input(s)');
  }

  var privateInstance = this;

  privateInstance.containerElement = containerElement;

  // select and empty the containerElement
  privateInstance.$element = window.d3.select(containerElement).html('');

  var parsedUri = window.m.route.parseQueryString(window.location.search.substring(1));
  // NOTE: query parameter will override any previous specifications for highlights.
  if (parsedUri.hasOwnProperty('highlights')) {
    options.highlights = JSON.parse(parsedUri.highlights);
  }

  options.highlights = options.highlights || window.kaavioHighlights || [];

  // Fill empty options with defaults
  var optionsDefaultClone = _.clone(optionsDefault, true);
  privateInstance.options = _.defaults(_.omit(options, function(optionValue) {
    return typeof optionValue === 'undefined' || optionValue === null;
  }), optionsDefaultClone);

  // Make privateInstance unique
  privateInstance.instanceId = ++instanceCounter;

  var notifications = new Notifications(privateInstance, privateInstance.options);

  // Init events object
  privateInstance.events = privateInstance.events || {};

  privateInstance.init();
};

/**
 * Creates DOM container and parses its sizes.
 * Adds loading state to container.
 * Adds hook for loaded event to remove loading state.
 */
Kaavio.prototype.init = function() {
  var privateInstance = this;

  var containerElement = privateInstance.containerElement;

  // Get container sizes
  var boundingRect = containerElement.getBoundingClientRect();

  // TODO take in account paddings, margins and border
  privateInstance.elementWidth = +boundingRect.width;

  // TODO take in account paddings, margins and border
  privateInstance.elementHeight = +boundingRect.height;

  /*********************************************
   * Mithril code for setting up container
   ********************************************/

  var kaavioComponent = privateInstance.kaavioComponent = {};

  kaavioComponent.vm = (function() {
    var vm = {};

    vm.init = function() {
      vm.state = {
        header: window.m.prop('closed'),
        leftSidebar: window.m.prop('closed'),
        rightSidebar: window.m.prop('closed'),
        body: window.m.prop('open'),
        footer: window.m.prop(privateInstance.options.footer || privateInstance.options.editor)
      };

      privateInstance.diagramComponent = diagramComponent;

      if (kaavioComponent.vm.state.footer() !== 'disabled') {
        privateInstance.footerOpenButton = footerOpenButton;
        privateInstance.footer = footer;
      }

      vm.onunload = function() {
        //privateInstance.diagramComponent.vm.onunload();
      };

      vm.onClickHandler = function(el) {
        if (!!el) {
          return;
        }
      };

      vm.reset = function() {
      };
    };

    return vm;
  })();

  kaavioComponent.controller = function() {
    kaavioComponent.vm.init();
    this.onunload = function() {
      kaavioComponent.vm.onunload();
    };
  };

  kaavioComponent.view = function(controller) {
    return m('div', {
      style: {
        width: 'inherit',
        height: 'inherit',
        /* TODO re-enable these once we have time to go through all the changes required.
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center'
        //*/
      }
    }, [
      //*
      m('div', {
        'class': 'annotation ui-draggable editor-' + kaavioComponent.vm.state.footer(),
        style: (function() {
          var footerState = kaavioComponent.vm.state.footer();
          if (footerState === 'open') {
            return 'visibility: hidden; display: none';
          } else {
            return 'visibility: hidden; ';
          }
        }())
      }, [
        m('header.annotation-header', {}, [
          m('span.annotation-header-move', {}, [
            m('i.icon-move'),
          ]),
          m('span.annotation-header-close', {}, [
            m('i.icon-remove'),
          ]),
          m('span.annotation-header-text', 'Header'),
          m('div.annotation-description', {}, [
            m('h2', {}, 'description'),
          ]),
        ]),
        m('span.annotation-items-container', {}, [
            // List items inside this ul element are generated automatically by JavaScript.
            // Each item will be composed of a title and text. The text can be set to be an href.
            // You can edit the styling of the title by editing CSS class "annotation-item-title"
            // and the styling of the text by editing CSS class "annotation-item-text.
          m('ul.annotation-items-container-list'),
        ]),
      ]),
      window.m.component(diagramComponent, privateInstance),
      (function() {
        if (kaavioComponent.vm.state.footer() !== 'disabled') {
          return window.m.component(privateInstance.footer, privateInstance);
        }
      }()),
    ]);
  };

  // Remove loading state after diagram is loaded
  // and add listeners and highlighting (optional).
  privateInstance.on('rendered.renderer', function() {
    // Remove loading state
    Utils.removeClassForD3(privateInstance.$element, 'loading');
    spinner.stop();

    /* TODO get this working with the diff-viewer
    // Add resize listeners

    var windowResizeListener = Rx.Observable.fromEvent(window, 'resize');

    var elementResizeDetectorInstance = new ElementResizeDetector();
    var containerElementResizeListener = new Rx.Subject();
    elementResizeDetectorInstance.listenTo(containerElement, function(element) {
      containerElementResizeListener.onNext(element);
    });

    // corresponds to ~60Hz
    var refreshInterval = 16;

    Rx.Observable.merge(windowResizeListener, containerElementResizeListener)
      .debounce(refreshInterval)
      .subscribe(function() {
        privateInstance.panZoom.resizeDiagram();
      }, function(err) {
        throw err;
      }, function() {
        // onComplete
      });
    //*/

    window.m.endComputation();
  });

  // Non-Mithril code for putting container
  // into loading state

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

  var spinner = privateInstance.spinner = new Spinner(spinnerOptions);
  spinner.spinDefault = _.partial(spinner.spin, containerElement);
  spinner.spinDefault();

  // Set ID to container element if it has no ID
  var containerElementId = containerElement.getAttribute('id') ||
      'kaavio-' + privateInstance.instanceId;
  containerElement.setAttribute('id', containerElementId);

  // TODO Look into allowing user to override our default styling,
  // possibly via a custom stylesheet.
  Utils.addClassForD3(privateInstance.$element, 'kaavio-container');

  // Set loading class
  Utils.addClassForD3(privateInstance.$element, 'loading');
  //*/
};

/**
 * Remove a kaavio instance on demand,
 * cleaning up any references to it and
 * undoing actions done just to support the existence of that instance.
 */
Kaavio.prototype.destroy = function() {
  var privateInstance = this;

  // Send destroy message
  privateInstance.trigger(
      'destroy.kaavio', {message: 'User requested kaavio destroy'}, false);

  // Destroy renderer
  //privateInstance.diagramComponent.vm.destroy()

  // Off all events
  for (var e in privateInstance.events) {
    privateInstance.off(e);
  }

  // Clean data
  privateInstance.containerElement.data = undefined;

  // Clean HTML
  privateInstance.containerElement.innerHTML = '';
};

/**
 * Returns an instance for public usage
 * @return {object}
 */
//*
Kaavio.prototype.getPublicInstance = function() {
  var privateInstance = this;

  if (privateInstance.publicInstance === undefined) {
    // Initialise public instance
    privateInstance.publicInstance = {
      attenuate: function(selector, group, styles) {
        if (!!privateInstance.highlighter && !!privateInstance.highlighter.attenuate) {
          privateInstance.highlighter.attenuate(selector, group, styles);
        }
      },
      instanceId: privateInstance.instanceId,
      getContainerElement: function() {
        return privateInstance.containerElement;
      },
      destroy: Utils.proxy(privateInstance.destroy, privateInstance),
      on: Utils.proxy(privateInstance.on, privateInstance),
      off: Utils.proxy(privateInstance.off, privateInstance),
      trigger: Utils.proxy(privateInstance.trigger, privateInstance),
      //render: _.bind(privateInstance.init, privateInstance),
      render: Utils.proxy(privateInstance.render, privateInstance),
      /*
      render: Utils.proxy((function() {
        if (!!privateInstance.kaavioComponent) {
          return privateInstance.render;
        } else {
          return privateInstance.init;
        }
      })(), privateInstance),
      //*/
      /*
      render: function() {
        if (!!privateInstance.kaavioComponent) {
          return privateInstance.render.call(privateInstance);
        } else {
          return privateInstance.init.call(privateInstance);
        }
      },
      //*/
      highlight: function(selector, group, styles) {
        if (!!privateInstance.highlighter && !!privateInstance.highlighter.highlight) {
          privateInstance.highlighter.highlight(selector, group, styles);
        }
      },
      pan: function(point) {
        if (privateInstance.panZoom) {
          privateInstance.panZoom.pan(point);
        }
      },
      panBy: function(point) {
        if (privateInstance.panZoom) {
          privateInstance.panZoom.panBy(point);
        }
      },
      getPan: function() {return privateInstance.panZoom.getPan();},
      resizeDiagram: function() {return privateInstance.panZoom.resizeDiagram();},
      zoom: function(scale) {if (privateInstance.panZoom) {privateInstance.panZoom.zoom(scale);}},
      zoomBy: function(scale) {
        if (privateInstance.panZoom) {
          privateInstance.panZoom.zoomBy(scale);
        }
      },
      zoomAtPoint: function(scale, point) {
        if (privateInstance.panZoom) {
          privateInstance.panZoom.zoomAtPoint(scale, point);
        }
      },
      zoomAtPointBy: function(scale, point) {
        if (privateInstance.panZoom) {
          privateInstance.panZoom.zoomAtPointBy(scale, point);
        }
      },
      getZoom: function() {return privateInstance.panZoom.getZoom();},
      getOptions: function() {return _.clone(privateInstance.options, true);},
      getSourceData: function() {
        // return _.clone(privateInstance.options.pvjson, true);
        return {
          pvjson: _.clone(privateInstance.sourceData.pvjson, true),
          // TODO delete once pvjson -> gpml converter complete
          original: _.clone(privateInstance.options.original, true),
          selector: privateInstance.sourceData.selector.getClone()
        };
      }
    };
  }

  return privateInstance.publicInstance;
};
//*/

/**
 * Register an event listener
 *
 * @param  {string}   topic
 * @param  {Function} callback
 */
Kaavio.prototype.on = function(topic, callback) {
  var privateInstance = this;

  var namespace = null;
  var eventName = topic;

  if (!topic || !topic.indexOf) {
    return;
  }

  if (topic.indexOf('.') !== -1) {
    var pieces = topic.split('.');
    eventName = pieces[0];
    namespace = pieces[1];
  }

  privateInstance.events = privateInstance.events || {};

  if (!privateInstance.events.hasOwnProperty(eventName)) {
    privateInstance.events[eventName] = [];
  }

  privateInstance.events[eventName].push({
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
Kaavio.prototype.off = function(topic, callback) {
  var privateInstance = this;

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
  if (!privateInstance.events.hasOwnProperty(eventName)) {return false;}
  var queue = privateInstance.events[topic];

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
Kaavio.prototype.trigger = function(topic, message, async) {
  var privateInstance = this;

  var namespace = null;
  var eventName = topic;

  if (topic.indexOf('.') !== -1) {
    var pieces = topic.split('.');
    eventName = pieces[0];
    namespace = pieces[1];
  }

  if (!privateInstance.events.hasOwnProperty(eventName)) {return false;}

  var queue = privateInstance.events[eventName];
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

Kaavio.prototype.getOptions = function() {
  return _.clone(this.options, true);
};

Kaavio.prototype.getSourceData = function() {
  // return _.clone(privateInstance.options, true);
  return {
    pvjson: _.clone(this.sourceData.pvjson, true),
    // TODO delete once pvjson -> gpml converter complete
    original: _.clone(this.options.original, true),
    selector: this.sourceData.selector.getClone()
  };
};

var kaavioreadyEvent = new CustomEvent('kaavioready');
window.dispatchEvent(kaavioreadyEvent);

window.Kaavio = Kaavio;
module.exports = Kaavio;
