var _ = require('lodash');

/**
 * @private
 *
 * Normalize text for comparison purposes
 *
 * @param {undefined|null|string|number|object|boolean|date} inputText
 * @return {string} normalizedText
 */
function normalizeText(inputText) {
  var stringifiedInput = inputText;
  if (!_.isString(inputText)) {
    if (_.isNumber(inputText) || _.isRegExp(inputText) ||
        _.isDate(inputText) || _.isBoolean(inputText)) {
      stringifiedInput = inputText.toString();
    } else if (_.isPlainObject(inputText)) {
      stringifiedInput = JSON.stringify(inputText);
    } else if (_.isUndefined(inputText)) {
      stringifiedInput = 'undefined';
    } else if (_.isNull(inputText)) {
      stringifiedInput = 'null';
    } else {
      console.warn('Cannot normalize provided value "' +
        JSON.stringify(inputText) + '".');
      console.warn('Using toString on input.');
      stringifiedInput = inputText.toString();
    }
  }
  // not using \w because we don't want to include the underscore
  var identifierPattern = /[^A-Za-z0-9]/gi;
  var alphanumericText = stringifiedInput.replace(identifierPattern, '');
  var normalizedText = alphanumericText;
  // This could be null if the inputText were something like '-..-'
  if (!_.isNull(alphanumericText)) {
    normalizedText = alphanumericText.toUpperCase();
  }
  return normalizedText;
}

module.exports = {
  normalizeText: normalizeText
};
