var _ = require('lodash')
  , Utils = require('./utilities.js')
  , Renderer = require('./renderer/renderer.js')
  , FormatConverter = require('./format-converter/format-converter.js')
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

    // Set container class
    Utils.addClassForD3(this.$element, 'pathvisiojs-container')

    // Set loading class
    Utils.addClassForD3(this.$element, 'loading')

    // Remove loading state after pathvisiojs is loaded
    this.on('loaded', function(){
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
    }

    this.checkAndRenderNextSource()

    // Listen for renderer errors
    this.on('renderer.error', function(){
      Renderer.destroyRender(pvjs, pvjs.sourceData)
      pvjs.checkAndRenderNextSource()
    })
  }

  Pathvisiojs.prototype.checkAndRenderNextSource = function() {
    var pvjs = this

    this.sourceData.sourceIndex += 1

    // Check if any sources left
    if (this.options.sourceData.length < this.sourceData.sourceIndex + 1) {
      this.trigger('error', {
        message: 'No more renderable sources'
      })
      return;
    }

    this.sourceData.uri = this.options.sourceData[this.sourceData.sourceIndex].uri
    this.sourceData.fileType = this.options.sourceData[this.sourceData.sourceIndex].fileType

    if (Renderer.canRender(this.sourceData)) {
      if (Renderer.needDataPreload(this.sourceData)) {
        FormatConverter.loadAndConvert(pvjs, function(error, pvjson){
          if (error) {
            pvjs.trigger('error', {message: error})
            pvjs.checkAndRenderNextSource()
          } else {
            pvjs.sourceData.pvjson = pvjson
            Renderer.render(pvjs, pvjs.sourceData)
          }
        })
      } else {
        Renderer.render(this, this.sourceData)
      }
    } else {
      // try next source
      this.checkAndRenderNextSource()
    }
  }

  /**
   * Returns an instanse for public usage
   * @return {object}
   */
  Pathvisiojs.prototype.getPublicInstance = function() {
    if(this.publicInstance === undefined) {
      // Initialise public instance
      this.publicInstance = {
        instanceId: this.instanceId
      , $element: this.$element
      , on: Utils.proxy(this.on, this)
      , off: Utils.proxy(this.off, this)
      , trigger: Utils.proxy(this.trigger, this)
      , render: Utils.proxy(this.render, this)
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
    if (!this.events.hasOwnProperty(topic)) {
      this.events[topic] = []
    }

    this.events[topic].push(callback)
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
    if (!this.events.hasOwnProperty(topic)) return false;
    var queue = this.events[topic]

    if (queue.indexOf(callback) === -1) return false;

    queue.splice(queue.indexOf(callback), 1)
    return true
  }

  /**
   * Triggers an event. Async by default.
   * Returns true if there is at least one listener
   *
   * @param  {string} topic
   * @param  {object} message
   * @param  {bool} async
   * @return {bool}
   */
  Pathvisiojs.prototype.trigger = function(topic, message, async) {
    if (!this.events.hasOwnProperty(topic)) return false;

    var queue = this.events[topic]
    if (queue.length === 0) return false;

    if (async === undefined) {
      var async = true
    }

    for (var i = 0; i < queue.length; i++) {
      if (async) {
        (function(i, message){
          setTimeout(function(){
            queue[i](message)
          }, 0)
        })(i, message)
      } else {
        queue[i](message)
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
     * @return {array || jQuery object}
     */
    $.fn.pathvisiojs = function (option) {
      var _arguments = arguments

      // Instantiate Pathvisiojs for all elements
      var $return = this.each(function () {
        var $this = $(this)
          , data = $this.data('pathvisiojs')
          , options = typeof option == 'object' && option

        if (!data) {
          $this.data('pathvisiojs', (data = new Pathvisiojs(this, options)))
        }
      })

      if (option === 'get') {
        // Return an array of Pathvisiojs instnces
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
    var $elements = d3.selectAll(selector)

    return _.map($elements[0], function(element){
      if (element.data === undefined) element.data = {};

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
})(window, jQuery)
