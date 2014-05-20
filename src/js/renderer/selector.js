var Utils = require('./../utilities.js')

/**
 * Elements are stored as indexed attributes
 * This allows doing selector.length
 * and accessing elements directly as selector[0]
 *
 * If context is not Selector than renderer is required.
 * Duck typing used to check if context is Selector
 *
 * Naming:
 * * starts with get - returns a new selector or some value
 * * starts with has - returns boolean
 * * starts with set - returns same selector (alters object)
 * * starts with add - returns same selector (alters object)
 * * starts with addAndGet - returns new selector
 * * starts with filter - returns same selector (alters object)
 * * starts with filtered - returns new selector
 * * starts with remove - returns same selector (alters object)
 *
 * @param {object} context Selector || array
 * @param {object} renderer         Renderer
 */
var Selector = {}

function init(context, renderer) {
  var selector = Object.create(Selector)
  // If new selector is created without a predecessor, require renderer
  if (!renderer && (context === null || context === undefined || context.getRenderer === undefined)) {
    throw new Error('Selector need either a base selector instance either a renderer')
    return null
  }

  if (renderer) {
    selector.setRenderer(renderer)
  } else {
    selector.setRenderer(context.getRenderer())
  }

  // No elements at the beginning
  selector.length = 0
  /** @type {Object} ids of available data elements. Use object instead of array for faster lookup */
  selector._elementsHash = {}
  /** @type {Number} counter of added id to elements */
  selector._idCounter = 0

  // Copy elements
  if (context && context.length) {
    for (var i = 0; i < context.length; i++) {
      selector.addElement(context[i])
    }
  }

  return selector
}

/**
 * Return renderer instance
 *
 * @return {object} renderer
 */
Selector.getRenderer = function() {
  return this.renderer
}

Selector.setRenderer = function(renderer) {
  this.renderer = renderer
  return this
}

/**
 * Checks if given selector has given pvjsonElement
 *
 * @param  {object}  pvjsonElement
 * @return {Boolean}         True if element is contained, otherwise false
 */
Selector.hasElement = function(pvjsonElement) {
  if (pvjsonElement && pvjsonElement.id !== undefined &&
      this._elementsHash[pvjsonElement.id] !== undefined && this._elementsHash[pvjsonElement.id]) {
    return true
  } else {
    return false
  }
}

/**
 * Set an unique id to pvjsonElement if it doesn't have one
 *
 * @param  {object} pvjsonElement
 * @return {object}               pvjsonElement
 */
function forceAnId(pvjsonElement) {
  if (pvjsonElement.id === undefined) {
    // Set a new id to pvjsonElement
    this._idCounter += 1
    pvjsonElement.id = '_selector-id-' + this._idCounter
  }

  return pvjsonElement
}

/**
 * Register element's id selector cache
 *
 * @param  {object} selector
 * @param  {object} pvjsonElement
 */
function registerElement(selector, pvjsonElement) {
  if (pvjsonElement && pvjsonElement.id !== undefined) {
    selector._elementsHash[pvjsonElement.id] = true
  }
}

/**
 * Add element to selector and ask renderer to render it
 *
 * @param {object} pvjsonElement
 * @return {object} original selector
 */
Selector.addElement = function(pvjsonElement) {
  if (!this.hasElement(pvjsonElement)) {
    this[this.length] = forceAnId(pvjsonElement)

    registerElement(this, pvjsonElement)

    // Ask renderer to render element (last added)
    this.renderer.addElement(this[this.length])

    this.length += 1
  }

  return this
}

/**
 * Add element to selector and ask renderer to render it
 *
 * @param {object} pvjsonElement
 * @return {object} new selector with just this element
 */
Selector.addAndGetElement = function(pvjsonElement) {
  // Return selector that contain just last element to allow chaining
  return this.addElement().last()
}

/**
 * Register element's id selector cache
 *
 * @param  {object} selector
 * @param  {object} pvjsonElement
 */
function unregisterAllElements(selector) {
  selector._elementsHash = {}
}

/**
 * Removes all elements from selector and asks renderer to remove them
 *
 * @return {object} selector
 */
Selector.removeElements = function() {
  for (var i = this.length; i >= 0; i--) {
    // Ask renderer to remove element
    this.renderer.removeElement(this[i])
  }

  unregisterAllElements(this)
  this.length = 0

  return this
}

/**
 * Create a new selector by merging this with another selector
 *
 * @param  {object} selector2 selector
 * @return {object}           selector
 */
Selector.getMerge = function(selector2) {
  // TODO
  return this
}

/**
 * Return a new selector with elements with labels that match  selectorString
 * @param  {string|regexp} selectorString
 * @return {object}                selector
 */
Selector.filteredByLabel = function(selectorString) {
  var matchingElements = []

  for (var i = 0; i < this.length; i++) {
    // If element do matches selector
    // matchingElements.push(this[i])
  }
  // TODO update length

  return init(matchingElements, this.getRenderer())
}

/**
 * Get attribute of first element
 *
 * @param  {string} name attribute name
 * @return {string}      attribute value
 */
Selector.getAttribute = function(name) {
  // TODO
  return ''
}

/**
 * Set attribute to all contained elements
 * If change is visual ask renderer to render element
 *
 * @param {string} name  attribute name
 * @param {string|number} value attribute value
 * @return {object} selector
 */
Selector.setAttribute = function(name, value) {
  // TODO
  return this
}

/**
 * Set a set of attributes to all contained elements
 *
 * @param {object} obj key-value pairs of name-value attributes
 * @return {object} selector
 */
Selector.setAttributes = function(obj) {
  // TODO
  return this
}

/**
 * Return a selector that contains just first element
 *
 * @return {object} selector
 */
Selector.getFirst = function() {
  if (this.length > 0) {
    return init([this[0]], this.getRenderer())
  } else {
    return init([], this.getRenderer())
  }
}

/**
 * Return a selector that contains just last element
 *
 * @return {object} selector
 */
Selector.getLast = function() {
  if (this.length > 0) {
    return init([this[this.length - 1]], this.getRenderer())
  } else {
    return init([], this.getRenderer())
  }
}

/**
 * Returns the width of the box that contains all elements
 * @return {number}
 */
Selector.getWidth = function() {
  // TODO
  return 0
}

/**
 * Returns the height of the box that contains all elements
 * @return {number}
 */
Selector.getHeight = function() {
  // TODO
  return 0
}

/**
 * Returns a bounding box (height, width, left, right, top, bottom) of the box that contains all elements
 * @return {[type]} [description]
 */
Selector.getBBox = function() {
  // TODO
  return {}
}

module.exports = {
  init: function(context, renderer) {
    return init(context, renderer)
  }
}
