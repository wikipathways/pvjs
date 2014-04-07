// TODO remove controls that don't work with this element
// This code is for the HTML img element. It displays the
// diagram as a PNG, JPG, GIF, etc.

pathvisiojs.renderer.img = function(){
  'use strict';

  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }
    var container = args.container, //a d3 selection corresponding to the containing element in the parent document
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      fitToContainer = args.fitToContainer,
      imgUri = args.renderableSourceDataElement.uri;

    if (!imgUri) {
      console.warn('No uri specified for sourceData element.'); //TODO decide whether this should warn or throw an error.
      imgUri = args.renderableSourceDataElement.uri || pathvisiojs.config.diagramNotAvailableIconUri;
    }

    loadImage(
      imgUri,
      function (img) {
        if (img.type === "error") {
          console.warn("Error loading image " + imgUri); //TODO decide whether this should warn or throw an error.
          loadImage(
            pathvisiojs.config.diagramNotAvailableIconUri,
            function (img) {
              //changing from d3 selection to html element
              container[0][0].appendChild(img);
              callback(null, img);
            },
            {
              maxWidth: containerWidth,
              maxHeight: containerHeight
            }
          );
        }
        else {
          //changing from d3 selection to html element
          container[0][0].appendChild(img);
          //TODO this should go into the CSS file somehow, but be careful not to mess up the SVG version
          img.setAttribute('style', 'margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;')
          callback(null, img);
        }
      },
      {
        maxWidth: containerWidth,
        maxHeight: containerHeight,
        //canvas: true,
        contain: fitToContainer
        //crossOrigin:'Anonymous' // I thought this would allow CORS images, but it actually does not.
      }
    );
  }

  /*
  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }

    var container = args.container,
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      imgUri = args.renderableSourceDataElement.uri || pathvisiojs.config.diagramNotAvailableIconUri,
      img,
      fitScreenScale;
      
      console.log(imgUri);

      img = document.createElement('img');
      img.src = imgUri;
      img.onload = function() {
        console.log(this);
        insertImage(container, containerWidth, containerHeight, img, imgUri, callback);
      }
      img.onerror = function() {
        img.src = pathvisiojs.config.diagramNotAvailableIconUri;
        img.onload = function() {
          console.log(this);
          insertImage(container, containerWidth, containerHeight, img, imgUri, callback);
          callback(null);
        }
      };
  }

  function insertImage(container, containerWidth, containerHeight, img, imgUri, callback) {
        var imgWidth = parseFloat(img.width);
        var imgHeight = parseFloat(img.height);
        var fitScreenScale = Math.min((containerWidth/imgWidth), (containerHeight/imgHeight));
        container.append('img')
        .attr('id', 'pathvisiojs-pathway-img')
        .attr('src', imgUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('style', 'position:relative; left:'
              + (containerWidth - imgWidth * fitScreenScale)/2 + 'px; '
              + 'top:' + (containerHeight - imgHeight * fitScreenScale)/2 + 'px; ')
        .attr('width', imgWidth * fitScreenScale)
        .attr('height', imgHeight * fitScreenScale);
        callback(null);
  }
  //*/

  return {
    load:load
  };
}();
