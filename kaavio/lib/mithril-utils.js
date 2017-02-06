var _ = require('lodash');
var highland = require('highland');
//var m = require('mithril');

/**
 * Convert an input into an array, if it is not already.
 *
 * @param {*} arg
 * @return {array} arrayified version on input arg
 */
function arrayify(arg) {
  return _.isArray(arg) ? arg : [arg];
}

/**
 * Convert an input into an array, if it is not already.
 * If the input is falsey but not false or 0, return an empty array.
 *
 * @param {*} arg
 * @return {array} arrayified version on input arg
 */
function arrayifyClean(arg) {
  if (!arg && arg !== false && arg !== 0) {
    return [];
  }
  return arrayify(arg);
}

/* Convert a highland stream into a mithril promise
 * @param {stream} highlandStream
 * @result {promise} mithrilPromise See
 *  http://lhorie.github.io/mithril/mithril.deferred.html#differences-from-promises-a-
 */
function promisify(highlandStream) {
  var deferred = window.m.deferred();

  highlandStream.toArray(function(results) {
    deferred.resolve(results);
    window.m.redraw();
  });

  return deferred.promise;
}

var promisifiedProp = highland.compose(window.m.prop, promisify);

/**
 * This function generically propifies the value of
 * every property on an object. The propify functions
 * in the specific component files only propify the
 * properties that are needed.
 *
 * @param {stream} highlandStream
 * @return
 */
function propify(highlandStream) {
  return highlandStream.flatMap(function(item) {
    return highland.pairs(item).reduce({}, function(accumulator, pair) {
      var key = pair[0];
      var value = pair[1];
      accumulator[key] = window.m.prop(value);
      return accumulator;
    });
  });
}

module.exports =  {
  arrayify: arrayify,
  arrayifyClean: arrayifyClean,
  promisify: promisify,
  promisifiedProp: promisifiedProp,
  propify: propify
};
