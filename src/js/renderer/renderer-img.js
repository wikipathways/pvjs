'use strict';

var ImageLoader = require('./../../../lib/blueimp-load-image/js/load-image.js')
  , Utils = require('./../utilities.js')
  , RendererPrototype = require('./renderer-prototype')

// TODO: add abitily to zoom and pan image

var RendererImg = Object.create(RendererPrototype)

RendererImg.init = function(pvjs) {
  this.pvjs = pvjs
}

function render(renderer, element) {
  var pvjs = renderer.pvjs

  ImageLoader.loadImage(
    element.uri
  , function(img){
      if (img.type === 'error') {
        pvjs.trigger('error.renderer', {
          message: 'Was unable to load provided image'
        })
      } else {
        var $img = pvjs.$element.append(function(){return img})
        Utils.addClassForD3($img, 'pathvisiojs-img')

        // Set unique id
        $img.attr('id', 'pathvisiojs-render-' + pvjs.instanceId)

        pvjs.trigger('rendered.renderer')
      }
    }
  , {
      maxWidth: pvjs.element_width
    , maxHeight: pvjs.element_height
    , contain: pvjs.options.fitToContainer
    }
  )
}

RendererImg.addElement = function(element) {
  if (element && element.uri) {
    render(this, element)
  }
}

module.exports = {
  init: function(pvjs){
    var renderer = Object.create(RendererImg)

    renderer.init(pvjs)

    return renderer
  }
}
