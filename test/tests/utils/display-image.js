var _ = require('lodash');
var launcher = require('browser-launcher');
var path = require('path');

module.exports = function displayImage(filePath) {
  launcher(function(err, launch) {
    if (err) {
      return console.error(err);
    }

    var availableBrowsers = launch.browsers.local.map(function(browser) {
      return browser.name;
    });

    // Chrome does not open images from the local file system via launcher.
    var localFileCapableBrowsers = [
      'firefox',
      'safari',
      'ie' // have not tested this one
    ];

    var selectedBrowser = _.intersection(availableBrowsers, localFileCapableBrowsers)[0];
    var opts = {
      headless : false,
      browser : selectedBrowser
    };
    launch('file://' + filePath, opts, function(err, ps) {
      if (err) {
        return console.error(err);
      }
    });
  });
};
