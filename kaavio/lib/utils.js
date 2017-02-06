'use strict';

// TODO Some of this code can be removed now that we are using lodash
// and jquery (in browser environment / Cheerio if in Node.js environment).

var _ = require('lodash');
var Async = require('async');
var Strcase = require('tower-strcase');

var Utils = {
  clone: function(src) {
    function mixin(dest, source, copyFunc) {
      var name;
      var s;
      var empty = {};
      for (name in source) {
        // the (!(name in empty) || empty[name] !== s) condition avoids
        // copying properties in "source"
        // inherited from Object.prototype.  For example, if dest has a custom
        // toString() method,
        // don't overwrite it with the toString() method that source inherited
        // from Object.prototype
        s = source[name];
        if (!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))) {
          dest[name] = copyFunc ? copyFunc(s) : s;
        }
      }
      return dest;
    }

    if (!src || typeof src != 'object' ||
        Object.prototype.toString.call(src) === '[object Function]') {
      // null, undefined, any non-object, or function
      return src; // anything
    }
    if (src.nodeType && 'cloneNode' in src) {
      // DOM Node
      return src.cloneNode(true); // Node
    }
    if (src instanceof Date) {
      // Date
      return new Date(src.getTime()); // Date
    }
    if (src instanceof RegExp) {
      // RegExp
      return new RegExp(src);   // RegExp
    }

    var r;
    var i;
    var l;
    if (src instanceof Array) {
      // array
      r = [];
      for (i = 0, l = src.length; i < l; ++i) {
        if (i in src) {
          r.push(Utils.clone(src[i]));
        }
      }
      // we don't clone functions for performance reasons
      //    }else if (d.isFunction(src)) {
      //      // function
      //      r = function() { return src.apply(this, arguments); };
    } else {
      // generic objects
      r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src, Utils.clone);

  },

  // this both clones a node and inserts it at the same level of the DOM
  // as the element it was cloned from.
  // it returns a d3 selection of the cloned element
  cloneNode: function(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  },

  convertToArray: function(object) {
    var array = null;
    if (Utils.getObjectType(object) === 'Object') {
      array = [];
      array.push(object);
      return array;
    } else {
      if (Utils.getObjectType(object) === 'Array') {
        return object;
      } else {
        if (Utils.getObjectType(object) === 'String') {
          array = [];
          array.push(object);
          return array;
        }
      }
    }
  },

  getObjectType: function(object) {
    var result;
    if (Object.prototype.toString.call(object) === '[object Object]') {
      result = 'Object';
    } else {
      if (Object.prototype.toString.call(object) === '[object Array]') {
        result = 'Array';
      } else {
        if (Object.prototype.toString.call(object) === '[object String]') {
          result = 'String';
        }
      }
    }
    return result;
  },

  getTextDirection: function(text) {
    /**
     * From http://stackoverflow.com/questions/7770235/
     *      change-text-direction-of-textbox-automatically
     * What about Chinese characters that go top to bottom?
     */
    var x =  new RegExp('[\x00-\x80]+'); // is ascii

    var isAscii = x.test(text);

    var direction;
    if (isAscii) {
      direction = 'ltr';
    } else {
      direction = 'rtl';
    }

    return direction;
  },

  // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
  isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  addClassForD3: function($element, className) {
    var elementClass = $element.attr('class') || '';

    // There are not classes at all
    if (elementClass.match(/[^\s]+/g) === null) {
      $element.attr('class', className);
    // Element has no such class
    } else if (elementClass.match(/[^\s]+/g).indexOf(className) === -1) {
      $element.attr('class', elementClass + ' ' + className);
    }
  },

  removeClassForD3: function($element, className) {
    var elementClass = $element.attr('class') || '';
    var classes = elementClass.match(/[^\s]+/g);

    // Remove that class from list and join class name back
    if (classes !== null  && classes.indexOf(className) !== -1) {
      classes = _.filter(classes, function(_class) {return _class !== className;});
      $element.attr('class', classes.join(' '));
    }
  },

  proxy: function(fn, context) {
    return function() {
      fn.apply(context, arguments);
    };
  },

  /**
   * Checks if an object is a DOM element
   *
   * @param  {object}  o HTML element or String
   * @return {Boolean}   returns true if object is a DOM element
   */
  isElement: function(o) {
    return (
      typeof HTMLElement === 'object' ? (o instanceof HTMLElement ||
        o instanceof SVGElement || o instanceof SVGSVGElement) : //DOM2
      o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
    );
  }
};

module.exports = Utils;
