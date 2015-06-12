'use strict';

var ImageLoader =
  require('./../../node_modules/blueimp-load-image/js/load-image.js');
var Utils = require('./../utils.js');
var RendererPrototype = require('./renderer-prototype');

// TODO: add abitily to zoom and pan image

var RendererImg = Object.create(RendererPrototype);

RendererImg.init = function(pvjs) {
  this.pvjs = pvjs;

  // Element cache
  this.$element = null;
};

function render(renderer, element) {
  var pvjs = renderer.pvjs;

  ImageLoader.loadImage(
    element.uri,
    function(img) {
      if (img.type === 'error') {
        pvjs.trigger('error.renderer', {
          message: 'Was unable to load provided image'
        });
      } else {
        var $img = pvjs.$element.append(function() {
          return img;
        });
        Utils.addClassForD3($img, 'pvjs-img');

        // Set unique id
        $img.attr('id', 'pvjs-render-' + pvjs.instanceId);

        // Cache element
        renderer.$element = $img;

        pvjs.trigger('rendered.renderer');
      }
    },
    {
      maxWidth: pvjs.element_width,
      maxHeight: pvjs.element_height,
      contain: pvjs.pvjsOptions.fitToContainer
    }
  );
}

RendererImg.addElement = function(element) {
  if (this.$element === null && element && element.uri) {
    // If function will be called againg before loadImage will finish - it will do nothing
    this.$element = true;

    render(this, element);
  }
};

module.exports = {
  init: function(pvjs) {
    var renderer = Object.create(RendererImg);

    renderer.init(pvjs);

    return renderer;
  }
};
