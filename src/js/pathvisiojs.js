var _ = require('lodash')
  , fs = require('fs')
  , Utils = require('./utilities')
  , Renderer = require('./renderer/renderer')
  , FormatConverter = require('./format-converter/format-converter')
  ;

(function(window, $){
  'use strict';

  /**
   * Pathvisiojs constructor
   *
   * @param {object} element Dom element
   * @param {object} options
   */
  var Pathvisiojs = function (element, options) {
    this.init(element, options)
  }

  var instanceCounter = 0
    , optionsDefault = {
        fitToContainer: true
      , sourceData: []
      , manualRender: false
      }

  /**
   * Pathvisiojs initialisation
   *
   * @param  {object} element Dom element
   * @param  {object} options
   */
  Pathvisiojs.prototype.init = function(element, options) {
    this.$element = d3.select(element).html('') // select and empty the element

    // Clone and fill options
    this.options = _.clone(optionsDefault, true)
    this.options = _.assign(this.options, options)

    // Make this instance unique
    this.instanceId = ++instanceCounter;

    // Init events object
    this.events = {}

    this.initContainer()

    // Check if render should be called now or it will be done later manually
    if (!this.options.manualRender) {
      this.render()
    }
  }

  /**
   * Creates DOM container and parses its sizes.
   * Adds loading state to container.
   * Adds hook for loaded event to remove loading state
   */
  Pathvisiojs.prototype.initContainer = function() {
    var pvjs = this
      , containerContents = fs.readFileSync(__dirname + '/../pathvisiojs.html').toString()

    // Add default container elements
    this.$element.html(containerContents)

    // Set ID to $element if it has no ID
    this.$element.attr('id', this.$element.attr('id') || 'pathvisio-' + this.instanceId)

    // Set container class
    Utils.addClassForD3(this.$element, 'pathvisiojs-container')

    // Set loading class
    Utils.addClassForD3(this.$element, 'loading')

    // Remove loading state after pathvisiojs is loaded
    this.on('rendered', function(){
      Utils.removeClassForD3(pvjs.$element, 'loading')
    })

    // Get container sizes
    var boundingRect = this.$element[0][0].getBoundingClientRect()
    this.element_width = +boundingRect.width // TODO take in account paddings, margins and border
    this.element_height = +boundingRect.height // TODO take in account paddings, margins and border
  }

  /**
   * Init and render
   */
  Pathvisiojs.prototype.render = function() {
    var pvjs = this

    // Init sourceData object
    this.sourceData = {
      sourceIndex: -1
    , uri: null // resource uri
    , fileType: ''
    , pvjson: null // pvjson object
    , rendererEngine: null // renderer engine name
    }

    this.checkAndRenderNextSource()

    // Listen for renderer errors
    this.on('error.renderer', function(){
      Renderer.destroyRender(pvjs, pvjs.sourceData)
      pvjs.checkAndRenderNextSource()
    })
  }

  Pathvisiojs.prototype.checkAndRenderNextSource = function() {
    var pvjs = this

    this.sourceData.sourceIndex += 1

    // Check if any sources left
    if (this.options.sourceData.length < this.sourceData.sourceIndex + 1) {
      this.trigger('error.sourceData', {
        message: 'No more renderable sources'
      })
      return;
    }

    this.sourceData.uri = this.options.sourceData[this.sourceData.sourceIndex].uri
    this.sourceData.fileType = this.options.sourceData[this.sourceData.sourceIndex].fileType

    if (Renderer.canRender(this.sourceData)) {
      if (Renderer.needDataConverted(this.sourceData)) {
        FormatConverter.loadAndConvert(pvjs, function(error, pvjson){
          if (error) {
            pvjs.trigger('error.pvjson', {message: error})
            pvjs.checkAndRenderNextSource()
          } else {
            pvjs.sourceData.pvjson = pvjson
            Renderer.render(pvjs)
          }
        })
      } else {
        Renderer.render(pvjs)
      }
    } else {
      // try next source
      this.checkAndRenderNextSource()
    }
  }

  Pathvisiojs.prototype.destroy = function() {
    // Send destroy message
    this.trigger('destroy.pvjs', {message: 'User requested pvjs destroy'}, false)

    // Destroy renderer
    Renderer.destroyRender(this, this.sourceData)

    // Off all events
    for (e in this.events) {
      this.off(e)
    }

    // Clean data
    this.$element[0][0].data = undefined

    if ($) {
      $(this.$element[0][0]).removeData('pathvisiojs')
    }

    // Clean HTML
    // jQuery
    $(this.$element[0][0]).empty()

  }

  /**
   * Returns an instance for public usage
   * @return {object}
   */
  Pathvisiojs.prototype.getPublicInstance = function() {
    var that = this

    if (this.publicInstance === undefined) {
      // Initialise public instance
      this.publicInstance = {
        instanceId: this.instanceId
      , $element: this.$element
      , destroy: Utils.proxy(this.destroy, this)
      , on: Utils.proxy(this.on, this)
      , off: Utils.proxy(this.off, this)
      , trigger: Utils.proxy(this.trigger, this)
      , render: Utils.proxy(this.render, this)
      , pan: function(point) {if (that.panZoom) {that.panZoom.pan(point)}}
      , panBy: function(point) {if (that.panZoom) {that.panZoom.panBy(point)}}
      , getPan: function() {return that.panZoom.getPan()}
      , zoom: function(scale) {if (that.panZoom) {that.panZoom.zoom(scale)}}
      , zoomBy: function(scale) {if (that.panZoom) {that.panZoom.zoomBy(scale)}}
      , zoomAtPoint: function(scale, point) {if (that.panZoom) {that.panZoom.zoomAtPoint(scale, point)}}
      , zoomAtPointBy: function(scale, point) {if (that.panZoom) {that.panZoom.zoomAtPointBy(scale, point)}}
      , getZoom: function() {return that.panZoom.getZoom()}
      , getOptions: function() {return _.clone(that.options, true)}
      , getSourceData: function() {return _.clone(that.sourceData, true)}
      }
    }

    return this.publicInstance
  }

  /**
   * Register an event listener
   *
   * @param  {string}   topic
   * @param  {Function} callback
   */
  Pathvisiojs.prototype.on = function(topic, callback) {
    var namespace = null
      , eventName = topic

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.')
      eventName = pieces[0]
      namespace = pieces[1]
    }

    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = []
    }

    this.events[eventName].push({
      callback: callback
    , namespace: namespace
    })
  }

  /**
   * Removes an event listener
   * Returns true if listener was removed
   *
   * @param  {string}   topic
   * @param  {Function} callback
   * @return {bool}
   */
  Pathvisiojs.prototype.off = function(topic, callback) {
    var namespace = null
      , eventName = topic
      , flagRemove = true
    callback = callback || null

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.')
      eventName = pieces[0]
      namespace = pieces[1]
    }

    // Check if such an event is registered
    if (!this.events.hasOwnProperty(eventName)) {return false;}
    var queue = this.events[topic]

    for (var i = queue.length - 1; i >= 0; i--) {
      flagRemove = true

      if (namespace && queue[i].namespace !== namespace) {flagRemove = false}
      if (callback && queue[i].callback !== callback) {flagRemove = false}

      if (flagRemove) {queue.splice(i, 1)}
    }

    return true
  }

  /**
   * Triggers an event. Async by default.
   * Returns true if there is at least one listener
   *
   * @param  {string} topic
   * @param  {object} message
   * @param  {bool} async By default true
   * @return {bool}
   */
  Pathvisiojs.prototype.trigger = function(topic, message, async) {
    var namespace = null
      , eventName = topic

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.')
      eventName = pieces[0]
      namespace = pieces[1]
    }

    if (!this.events.hasOwnProperty(eventName)) {return false}

    var queue = this.events[eventName]
    if (queue.length === 0) {return false;}

    if (async === undefined) {
      async = true
    }

    // Use a function as i may change meanwhile
    var callAsync = function(i) {
      setTimeout(function(){
        queue[i].callback(message)
      }, 0)
    }

    for (var i = 0; i < queue.length; i++) {
      if (namespace && queue[i].namespace && namespace !== queue[i].namespace) {continue}

      if (async) {
        // freeze i
        callAsync(i)
      } else {
        queue[i].callback(message)
      }
    }
    return true;
  }

  /**
   *
   */
  if ($) {
    /**
     * jQuery plugin entry point. Only if jQuery is defined.
     * If option is 'get' then returns an array of pathvisiojs public instances.
     * Otherwise returns an jQuery object to allow chaining.
     *
     * @param  {string} option
     * @return {object} array || jQuery object
     */
    $.fn.pathvisiojs = function (option) {
      // Instantiate Pathvisiojs for all elements
      var $return = this.each(function () {
        var $this = $(this)
          , data = $this.data('pathvisiojs')
          , options = typeof option == 'object' && option

        if (!data) {
          $this.data('pathvisiojs', (new Pathvisiojs(this, options)))
        }
      })

      if (option === 'get') {
        // Return an array of Pathvisiojs instances
        return $.map(this, function(a){return $(a).data('pathvisiojs').getPublicInstance()})
      } else {
        // Return jQuery object
        return $return
      }
    }
  }

  /**
   * Globally available method
   * Returns an array of public instances
   *
   * @param  {string} selector
   * @param  {object} option
   * @return {array}
   */
  window.pathvisiojs = function (selector, option) {
    var $elements

    if (Utils.isElement(selector)) {
      $elements = [[selector]]
    } else {
      $elements = d3.selectAll(selector)
    }

    return _.map($elements[0], function(element){
      if (element.data === undefined) {element.data = {}}

      var data
        , options = typeof option == 'object' ? option : {}

      if (element.data.pathvisiojs === undefined) {
        element.data.pathvisiojs = (data = new Pathvisiojs(element, options))
      } else {
        data = element.data.pathvisiojs
      }

      return data.getPublicInstance()
    })
  }
})(window, window.jQuery || null)
