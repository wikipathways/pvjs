(function(window) {

  var crossPlatformText = require('./lib/cross-platform-text');

  if (!!module && !!module.exports) {
    module.exports = crossPlatformText;
  }

  if (!!window) {
    window.crossPlatformText = crossPlatformText;
  }

}(window));
