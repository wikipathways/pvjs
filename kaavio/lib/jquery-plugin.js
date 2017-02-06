var Kaavio = require('./main.js');
var Utils = require('./utils');

/**
 * Initialize the global constructor for JqueryKaavioPlugin
 *
 * @param {object} window
 * @param {object} [$] optional jQuery or Zepto instance
 * @return
 */
module.exports = function(window, $) {
  'use strict';

  /**
   *
   */
  if (typeof $ !== undefined) {
    /**
     * jQuery plugin entry point. Only if jQuery is defined.
     * If option is 'get' then returns an array of jqueryKaavioPlugin public instances.
     * Otherwise returns an jQuery object to allow chaining.
     *
     * @param  {string} option
     * @return {object} array || jQuery object
     */
    $.fn.kaavio = function(option) {
      // Instantiate Kaavio for all elements
      var $return = this.each(function() {
        var $this = $(this);
        var data = $this.data('kaavio');
        var options = typeof option == 'object' && option;

        if (!data) {
          $this.data('kaavio', (new Kaavio(this, options)));
        }
      });

      if (option === 'get') {
        // Return an array of Kaavio instances
        return $.map(this, function(a) {
          return $(a).data('kaavio').getPublicInstance();
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
  window.jqueryKaavioPlugin = function(selector, option) {
    var $elements;

    if (Utils.isElement(selector)) {
      $elements = [[selector]];
    } else {
      $elements = d3.selectAll(selector);
    }

    return _.map($elements[0], function(element) {
      if (element.data === undefined) {
        element.data = {};
      }

      var data;
      var options = typeof option == 'object' ? option : {};

      if (element.data.kaavio === undefined) {
        element.data.kaavio = (data = new Kaavio(element, options));
      } else {
        data = element.data.kaavio;
      }

      return data.getPublicInstance();
    });
  };
}
