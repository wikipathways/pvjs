var Utils = require('./../utilities.js')
  , _ = require('lodash')
  ;

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
  /** @type {Number} Global counter of added ids to elements */
  , _idCounter = 0

function init(context, renderer) {
  var selector = Object.create(Selector)
  // If new selector is created without a predecessor, require renderer
  if (!renderer && (context === null || context === undefined || context.getRenderer === undefined)) {
    throw new Error('Selector need either a base selector instance either a renderer');
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
Selector.forceAnId = function(pvjsonElement) {
  if (pvjsonElement.id === null || pvjsonElement.id === void 0) {
    // Set a new id to pvjsonElement
    _idCounter += 1
    pvjsonElement.id = '_selector-id-' + _idCounter
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
    this[this.length] = this.forceAnId(pvjsonElement)

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
 * Clean selector's cache
 *
 * @param  {object} selector
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
  for (var i = this.length - 1; i >= 0; i--) {
    // Ask renderer to remove element
    this.renderer.removeElement(this[i])
  }

  unregisterAllElements(this)
  this.length = 0

  return this
}

/**
 * Alias to remove elements
 *
 * @return {Object} selector
 */
Selector.remove = function() {
  return this.removeElements()
}

/**
 * Clone first element and return its selector
 *
 * @return {Object} selector
 */
Selector.cloneElement = function() {
  var selector = init([], this.getRenderer())

  if (this.length > 0) {
    var pvjsonElement = _.clone(this[0], true)
    delete pvjsonElement.id

    selector.addElement(pvjsonElement)

    // TODO later refactor this to use markers clones
    // https://github.com/wikipathways/pathvisiojs/blob/2bd230a8241374e12086524d9fd39f48e6cef71d/dist/plugins/pathvisiojs-highlighter/pathvisiojs-highlighter.js#L441
    selector.removeMarkers()
  }

  return selector
}

/**
 * Create a clone of given selector
 *
 * @return {object}           selector
 */
Selector.getClone = function() {
  return init(this)
}

/**
 * Create a new selector by merging it with another selector
 *
 * @param  {object} selector2 selector
 * @return {object}           selector
 */
Selector.getMerge = function(selector2) {
  // TODO
  return this
}

/**
 * Return a new selector with all elements having given ID
 *
 * @param  {string} selectorString
 * @return {object}                selector
 */
Selector.filteredById = function(selectorString) {
  var matchingElements = []

  for (var i = 0; i < this.length; i++) {
    // If element matches the selector
    if (this[i].id == selectorString) {
      matchingElements.push(this[i])
    }
  }

  return init(matchingElements, this.getRenderer())
}

Selector.xrefTypes = ['PublicationXref', 'RelationshipXref', 'UnificationXref', 'Xref', 'DnaReference'
  , 'DnaRegionReference', 'EntityReference', 'EntityReferenceTypeVocabulary', 'ProteinReference'
  , 'RnaReference', 'RnaRegionReference', 'SmallMoleculeReference']

/**
 * Return a new selector with xref elements
 *
 * @param  {string|regexp} selectorString
 * @return {object}                selector
 */
Selector.filteredByXRef = function(selectorString) {
  var matchingElements = []
    , selectById = selectorString.indexOf('id:') === 0 ? true : false
    , selectAttribute = null

  if (selectById) {
    selectorString = selectorString.slice(3)
  }

  for (var i = 0; i < this.length; i++) {
    // If element is xref
    if (this[i].hasOwnProperty('type') && this.xrefTypes.indexOf(this[i].type) !== -1) {
      selectAttribute = null

      // Search by attribute
      if (selectById) {
        selectAttribute = 'id'
      } else if (this[i].hasOwnProperty('title')) {
        selectAttribute = 'title'
      } else if (this[i].hasOwnProperty('displayName')) {
        selectAttribute = 'displayName'
      }

      if (selectAttribute) {
        // Test for regex
        if (_.isRegExp(selectorString) && selectorString.test(this[i][selectAttribute])) {
          matchingElements.push(this[i])
        }

        // Test for string match
        if (_.isString(selectorString) && selectorString === this[i][selectAttribute]) {
          matchingElements.push(this[i])
        }
      }
    }
  }

  return init(matchingElements, this.getRenderer())
}

/**
 * Return a new selector with elements having given xref
 *
 * @param  {string|regexp} selectorString
 * @return {object}                selector
 */
Selector.filteredByHavingXRef = function(selectorString) {
  var matchingElements = []
    , xrefSelector = this.filteredByXRef(selectorString)
    , xrefsIds = {}
    , i
    ;

  // Fullfill xrefsIds hash object
  for (i = xrefSelector.length - 1; i >= 0; i--) {
    xrefsIds[xrefSelector[i].id] = true
  }

  for (i = 0; i < this.length; i++) {
    // If element has matching entityReference
    if (this[i].hasOwnProperty('entityReference') && xrefsIds[this[i].entityReference] !== void 0) {
      matchingElements.push(this[i])
    }
  }

  return init(matchingElements, this.getRenderer())
}

/**
 * Return a new selector with elements text content matching given string
 * Original new lines are replaced by space
 *
 * @param  {string|regexp} selectorString
 * @return {object}                selector
 */
Selector.filteredByText = function(selectorString) {
  var matchingElements = []

  for (var i = 0; i < this.length; i++) {
    if (this[i].hasOwnProperty('textContent')) {
      // Test for regex
      if (_.isRegExp(selectorString) && selectorString.test(this[i].textContent.replace(/\n/g, ' '))) {
        matchingElements.push(this[i])
      }

      // Test for string match
      if (_.isString(selectorString) && selectorString === this[i].textContent.replace(/\n/g, ' ')) {
        matchingElements.push(this[i])
      }
    }
  }

  return init(matchingElements, this.getRenderer())
}

/**
 * Get style of first element
 *
 * @param  {string} name attribute name
 * @return {string}      attribute value
 */
Selector.getStyle = function(name) {
  // TODO
  return ''
}

/**
 * Set style to all contained elements
 * If change is visual ask renderer to render element
 *
 * @param {string} name  attribute name
 * @param {string|number} value attribute value
 * @return {object} selector
 */
Selector.setStyle = function(name, value) {
  // TODO
  return this
}

/**
 * Set a set of styles to all contained elements
 *
 * @param {object} styles key-value pairs of name-value styles
 * @return {object} selector
 */
Selector.setStyles = function(styles) {
  for (var i = this.length - 1; i >= 0; i--) {
    this.renderer.updateElement(this[i], styles)
  }

  return this
}

Selector.removeMarkers = function() {
  for (var i = this.length - 1; i >= 0; i--) {
    this.renderer.removeElementMarkers(this[i])
  }

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

Selector.getNth = function(n) {
  if (n < this.length) {
    return init([this[n]], this.getRenderer())
  } else {
    return init([], this.getRenderer())
  }
}

Selector.forEach = function(cb) {
  for (var i = 0; i < this.length; i++) {
    cb(this.getNth(i))
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
  var BBox = {
        width: 0
      , height: 0
      , top: null
      , bottom: null
      , left: null
      , right: null
      }
    , _BBox = null

  if (this.length > 0) {
    _BBox = this.renderer.getElementBBox(this[0])
    BBox = _.assign(BBox, _BBox)

    // Traverse all except first
    for (var i = this.length - 1; i >= 1; i--) {
      // Ask renderer of element BBox
      _BBox = this.renderer.getElementBBox(this[i])

      BBox.top = Math.min(BBox.top, _BBox.top)
      BBox.bottom = Math.max(BBox.bottom, _BBox.bottom)
      BBox.left = Math.min(BBox.left, _BBox.left)
      BBox.right = Math.max(BBox.right, _BBox.right)
    }
  }

  // Calculate width and height
  BBox.width = BBox.right - BBox.left
  BBox.height = BBox.bottom - BBox.top

  return BBox
}

/**
 * Return id of first element
 *
 * @return {string} id
 */
Selector.getId = function() {
  if (this.length) {
    return this[0].id
  } else {
    return null
  }
}

module.exports = {
  init: function(context, renderer) {
    return init(context, renderer)
  }
}
