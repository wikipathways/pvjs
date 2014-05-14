'use strict';

var ImageLoader = require('./../../../lib/blueimp-load-image/js/load-image.js')
  , Utils = require('./../utilities.js')

// TODO: add abitily to zoom and move image

module.exports = {
  render: function(pvjs, sourceData) {
    ImageLoader.loadImage(
      sourceData.uri
    , function(img){
        if (img.type === 'error') {
          pvjs.trigger('error.renderer', {
            message: 'Was unable to load provided image'
          })
          // Try to init next renderer
          pvjs.initNextRenderer()
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
}
