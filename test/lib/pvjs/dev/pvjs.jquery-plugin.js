function load(doc, src, fn) {  if (typeof doc === 'string') {    fn = src;    src = doc;    doc = document;  }  var script = doc.createElement('script');  script.type = 'text/javascript';  script.src = src;  if (fn) onLoad(script, fn);  script.onLoad = function(fn) {    return onLoad(script, fn);  };  doc.body.appendChild(script);  return script;} function polyfillLoader(polyfillServiceIri, polyfillServiceCallbackName, callback) {    window[polyfillServiceCallbackName] = function() {      return callback(null);    };    if (!!document.body) {      load(polyfillServiceIri);    } else {      var existingonreadystatechange = document.onreadystatechange;      document.onreadystatechange = function() {        if (document.readyState === 'interactive') {          if (typeof existingonreadystatechange === 'function') {            existingonreadystatechange();          }          load(polyfillServiceIri);        }      };    }  } polyfillLoader("//cdn.polyfill.io/v1/polyfill.min.js?features=Array.prototype.map&callback=polyfillServiceCallbackpvjsjqueryplugin", "polyfillServiceCallbackpvjsjqueryplugin", function(err) {require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/jquery-plugin.js":[function(require,module,exports){
var _ = require('lodash');
var Pvjs = require('./main.js');
var Utils = require('./utils');

/**
 * Initialize the global constructor for JqueryPvjsPlugin
 *
 * @param {object} window
 * @param {object} [$] optional jQuery or Zepto instance
 * @return
 */
module.exports = (function(window, $) {
  'use strict';

  /**
   *
   */
  if (typeof $ !== undefined) {
    /**
     * jQuery plugin entry point. Only if jQuery is defined.
     * If option is 'get' then returns an array of jqueryPvjsPlugin public instances.
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
        var options = typeof option === 'object' && option;

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
  window.jqueryPvjsPlugin = function(selector, option) {
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
      var options = typeof option === 'object' ? option : {};

      if (element.data.pvjs === undefined) {
        element.data.pvjs = (data = new Pvjs(element, options));
      } else {
        data = element.data.pvjs;
      }

      return data;
    });
  };
})(window, jQuery);

},{"./main.js":"/Users/andersriutta/Sites/pvjs/lib/main.js","./utils":"/Users/andersriutta/Sites/pvjs/lib/utils.js","lodash":"/Users/andersriutta/Sites/pvjs/node_modules/lodash/index.js"}]},{},["./lib/jquery-plugin.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvanF1ZXJ5LXBsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbnZhciBQdmpzID0gcmVxdWlyZSgnLi9tYWluLmpzJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgZ2xvYmFsIGNvbnN0cnVjdG9yIGZvciBKcXVlcnlQdmpzUGx1Z2luXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHdpbmRvd1xuICogQHBhcmFtIHtvYmplY3R9IFskXSBvcHRpb25hbCBqUXVlcnkgb3IgWmVwdG8gaW5zdGFuY2VcbiAqIEByZXR1cm5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24od2luZG93LCAkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICpcbiAgICovXG4gIGlmICh0eXBlb2YgJCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiBlbnRyeSBwb2ludC4gT25seSBpZiBqUXVlcnkgaXMgZGVmaW5lZC5cbiAgICAgKiBJZiBvcHRpb24gaXMgJ2dldCcgdGhlbiByZXR1cm5zIGFuIGFycmF5IG9mIGpxdWVyeVB2anNQbHVnaW4gcHVibGljIGluc3RhbmNlcy5cbiAgICAgKiBPdGhlcndpc2UgcmV0dXJucyBhbiBqUXVlcnkgb2JqZWN0IHRvIGFsbG93IGNoYWluaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBvcHRpb25cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGFycmF5IHx8IGpRdWVyeSBvYmplY3RcbiAgICAgKi9cbiAgICAkLmZuLnB2anMgPSBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgIC8vIEluc3RhbnRpYXRlIFB2anMgZm9yIGFsbCBlbGVtZW50c1xuICAgICAgdmFyICRyZXR1cm4gPSB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YSgncHZqcycpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT09ICdvYmplY3QnICYmIG9wdGlvbjtcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAkdGhpcy5kYXRhKCdwdmpzJywgKG5ldyBQdmpzKHRoaXMsIG9wdGlvbnMpKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAob3B0aW9uID09PSAnZ2V0Jykge1xuICAgICAgICAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgUHZqcyBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuICQubWFwKHRoaXMsIGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICByZXR1cm4gJChhKS5kYXRhKCdwdmpzJykuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4galF1ZXJ5IG9iamVjdFxuICAgICAgICByZXR1cm4gJHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdsb2JhbGx5IGF2YWlsYWJsZSBtZXRob2RcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBwdWJsaWMgaW5zdGFuY2VzXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc2VsZWN0b3JcbiAgICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25cbiAgICogQHJldHVybiB7YXJyYXl9XG4gICAqL1xuICB3aW5kb3cuanF1ZXJ5UHZqc1BsdWdpbiA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBvcHRpb24pIHtcbiAgICB2YXIgJGVsZW1lbnRzO1xuXG4gICAgaWYgKFV0aWxzLmlzRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICAgICRlbGVtZW50cyA9IFtbc2VsZWN0b3JdXTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGVsZW1lbnRzID0gZDMuc2VsZWN0QWxsKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXy5tYXAoJGVsZW1lbnRzWzBdLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbWVudC5kYXRhID0ge307XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRhO1xuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09PSAnb2JqZWN0JyA/IG9wdGlvbiA6IHt9O1xuXG4gICAgICBpZiAoZWxlbWVudC5kYXRhLnB2anMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbGVtZW50LmRhdGEucHZqcyA9IChkYXRhID0gbmV3IFB2anMoZWxlbWVudCwgb3B0aW9ucykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YSA9IGVsZW1lbnQuZGF0YS5wdmpzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KTtcbiAgfTtcbn0pKHdpbmRvdywgalF1ZXJ5KTtcbiJdfQ==
});