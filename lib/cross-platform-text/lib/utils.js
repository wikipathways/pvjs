var utils = {
  isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  convertToPx: function(inputString, fontSize) {
    // if current fontSize is 12pt, then 1em = 12pt = 16px = 100%
    var inputStringLowerCased;
    var px;
    if (this.isNumber(inputString)) {
      px = inputString;
    }
    else {
      inputStringLowerCased = inputString.toLowerCase();
      if (inputStringLowerCased.indexOf('em') > -1) {
        px = inputStringLowerCased.slice(
            0, inputStringLowerCased.length - 2) * fontSize;
      }
      else if (inputStringLowerCased.indexOf('px') > -1) {
        px = inputStringLowerCased.slice(0, inputStringLowerCased.length - 2);
      }
      else if (inputStringLowerCased.indexOf('pt') > -1) {
        px = inputStringLowerCased.slice(
            0, inputStringLowerCased.length - 2) * (4 / 3);
      }
      else if (inputStringLowerCased.indexOf('%') > -1) {
        px = (inputStringLowerCased.slice(
              0, inputStringLowerCased.length - 1) / 100) * fontSize;
      }
      else {
        px = inputString;
      }
    }
    return px;
  }
};

module.exports = utils;
