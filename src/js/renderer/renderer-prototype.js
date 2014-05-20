/**
 * Function used as prototype for all renderers implementations
 */
var RendererPrototype = {
  /**
   * Init method
   * Should return renderer instance
   *
   * @return {object} Renderer instance
   */
  init: function() {return this}
, addElement: function() {}
, updateElement: function() {}
, removeElement: function() {}
, getElementBBox: function() {}
}

module.exports = RendererPrototype
