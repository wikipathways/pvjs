!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.strcase=e():"undefined"!=typeof global?global.strcase=e():"undefined"!=typeof self&&(self.strcase=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * "dot.case"
 */

exports.dotCase = function(string) {
  return exports.separatorCase(string, '.');
}

/**
 * "ClassCase"
 */

exports.classCase = function(string) {
  return exports.separatorCase(string, '_').replace(/(?:^|_|\-|\/)(.)/g, function(match, c) {
    return c.toUpperCase();
  });
}

/**
 * "Namespace.Case"
 */

exports.namespaceCase = function(string) {
  return exports.separatorCase(string, '.').replace(/(^|_|\.|\-|\/)(.)/g, function(match, p, c) {
    return p + c.toUpperCase();
  });
}

/**
 * "CONSTANT_CASE"
 */

exports.constantCase = function(string) {
  return exports.separatorCase(string, '_').replace(/[a-z]/g, function(c) {
    return c.toUpperCase();
  });
}

/**
 * "camelCase"
 */

exports.camelCase = function(string) {
  return exports.separatorCase(string, '_').replace(/[-_\.\/\s]+(.)?/g, function(match, c) {
    return c.toUpperCase();
  });
}

/**
 * "Title Case"
 */

exports.titleCase = function(string) {
  return exports.separatorCase(string, ' ').replace(/(?:^|\s)\S/g, function(c) {
    return c.toUpperCase();
  });
}

/**
 * "snake_case"
 */

exports.snakeCase = function(string) {
  return exports.separatorCase(string, '_');
}

/**
 * "path/case"
 */

exports.pathCase = function(string) {
  return this.separatorCase(string, '/');
}

/**
 * "param-case"
 */

exports.paramCase = function(string) {
  return this.separatorCase(string, '-');
}

/**
 * Generic string transform.
 */

exports.separatorCase = function(string, separator) {
  //return exports.clean(exports.trim(string), separator).replace(/([a-z\d])([A-Z]+)/g, '$1' + separator + '$2').replace(/[-\.\/\_\s]+/g, separator).toLowerCase();
  //return exports.clean(exports.trim(string), separator).replace(/([a-z\d])([A-Z]+)/g, '$1' + separator + '$2').replace(/([A-Z](?=[A-Z]))/g, '$1' + separator).replace(/[-\.\/\_\s]+/g, separator).toLowerCase();
  return exports.clean(exports.trim(string), separator).replace(/([a-z\d])([A-Z]+)/g, '$1' + separator + '$2').replace(/(([A-Z])(?=[A-Z][a-z]))/g, '$1' + separator).replace(/(([a-z])(?=[A-Z][a-z]))/g, '$1' + separator).replace(/[-\.\/\_\s]+/g, separator).toLowerCase();
}

/**
 * Remove non-word characters.
 */

exports.clean = function(string, separator) {
  return string.replace(/\W+/g, separator || ' ');
}

/**
 * Remove non-word from the start/end of the string only.
 */

exports.trim = function(string) {
  return string.replace(/^\W+|\W+$/g, '');
}

},{}]},{},[1])
(1)
});
;