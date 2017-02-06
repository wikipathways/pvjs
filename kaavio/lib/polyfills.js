// Make IE work with the CustomEvent interface standard
require('custom-event-polyfill');

var promisescript = require('promisescript');

/*********************************
 * A very simple asset loader. It checks all
 * assets that could be loaded already. If they
 * are loaded already, great. Otherwise, it
 * loads them.
 *
 * It would be nice to use an
 * open-source library for this
 * to ensure it works x-browser.
 * Why did Modernizr/yepnope deprecate this
 * type of strategy?
 * ******************************/
var assetsToLoad = [
  {
    exposed: 'document.registerElement',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/' +
        'webcomponentsjs/0.5.2/CustomElements.min.js',
    loaded: (function() {
      return !!document.registerElement;
    })()
  },
  {
    exposed: 'Modernizr.inputtypes.color',
    type: 'script',
    url: '//cdnjs.cloudflare.com/ajax/libs/' +
        'spectrum/1.6.1/spectrum.min.js',
    loaded: (function() {
      return !!window.Modernizr.inputtypes.color;
    })()
  },
  {
    exposed: 'Modernizr.inputtypes.color',
    type: 'style',
    url: '//cdnjs.cloudflare.com/ajax/libs/' +
        'spectrum/1.6.1/spectrum.min.css',
    loaded: (function() {
      return !!window.Modernizr.inputtypes.color;
    })()
  }
]
.filter(function(asset) {
  return !asset.loaded;
})
.map(function(args) {
  return promisescript(args);
});
