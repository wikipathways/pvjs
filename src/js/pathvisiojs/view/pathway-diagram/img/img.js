"use strict";

// TODO remove controls that don't work with this element
// This code is for the HTML img element. It displays the
// diagram as a PNG, JPG, GIF, etc.

pathvisiojs.view.pathwayDiagram.img = function(){

  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }

    var container = args.container,
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      imgUri = args.sourceDataElement.uri,
      img,
      imgWidth,
      imgHeight,
      fitScreenScale;

      /*
    if (!!wikiPathwaysId) {
      imgUri = encodeURI(pathvisiojs.config.imgDiagramUriStub() + wikiPathwaysId + '&revision=' + revision);
    }
    else {
      imgUri = pathvisiojs.config.diagramNotAvailableImageUri();
    }
    //*/

    window.setTimeout(function() {
      img = document.createElement('img');
      img.src = imgUri;
      img.onload = function() {
        imgWidth = parseFloat(this.width);
        imgHeight = parseFloat(this.height);
        fitScreenScale = Math.min((containerWidth/imgWidth), (containerHeight/imgHeight));
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
    }, 50);
  }

  return {
    load:load
  };
}();
