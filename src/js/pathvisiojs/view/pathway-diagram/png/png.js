"use strict";

// TODO remove controls that don't work with PNG 

pathvisiojs.view.pathwayDiagram.png = function(){

  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }

    var container = args.container,
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      pngUrl = args.sourceDataElement.uri,
      png,
      pngWidth,
      pngHeight,
      fitScreenScale;

      /*
    if (!!wikiPathwaysId) {
      pngUrl = encodeURI(pathvisiojs.config.pngDiagramUriStub() + wikiPathwaysId + '&revision=' + revision);
    }
    else {
      pngUrl = pathvisiojs.config.diagramNotAvailableImageUri();
    }
    //*/

    window.setTimeout(function() {
      png = document.createElement('img');
      png.src = pngUrl;
      png.onload = function() {
        pngWidth = parseFloat(this.width);
        pngHeight = parseFloat(this.height);
        fitScreenScale = Math.min((containerWidth/pngWidth), (containerHeight/pngHeight));
        container.append('img')
        .attr('id', 'pathvisiojs-pathway-png')
        .attr('src', pngUrl)
        .attr('x', 0)
        .attr('y', 0)
        .attr('style', 'position:relative; left:'
              + (containerWidth - pngWidth * fitScreenScale)/2 + 'px; '
              + 'top:' + (containerHeight - pngHeight * fitScreenScale)/2 + 'px; ')
        .attr('width', pngWidth * fitScreenScale)
        .attr('height', pngHeight * fitScreenScale);
        callback(null);
      }
    }, 50);
  }

  return {
    load:load
  };
}();
