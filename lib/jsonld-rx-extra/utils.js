var _ = require('lodash');

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

var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
  return _.merge(value, other, deep);
});

module.exports = {
  arrayify: arrayify,
  arrayifyClean: arrayifyClean,
  defaultsDeep: defaultsDeep
};
