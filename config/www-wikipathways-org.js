"use strict";

pathvisiojs.config = function() {
  var gpmlSourceUriStub = function() {
    return 'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:';
  }

  var bridgedbLinkOutsUrlStub = function() {
    return '../wpi/extensions/bridgedb.php/';
  }

  var bridgedbDatasources = function() {
    // TODO this should be replaced with bridgedb webservice call, when made available
    return '../wpi/extensions/PathwayViewer/datasources.txt';
  }

  var diagramNotAvailableImageUri = function() {
    return '../wpi/extensions/PathwayViewer/img/imageNotAvailable.jpg';
  }

  var loadingGif = function() {
    return '../wpi/extensions/PathwayViewer/img/loading.gif';
  }

  var pngDiagramUriStub = function() {
    return 'http://www.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
  }

  var pathwaySearchUriStub = function() {
    return 'http://www.wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&query=';
  }

  return {
    gpmlSourceUriStub:gpmlSourceUriStub,
    bridgedbLinkOutsUrlStub:bridgedbLinkOutsUrlStub,
    bridgedbDatasources:bridgedbDatasources,
    pngDiagramUriStub:pngDiagramUriStub,
    diagramNotAvailableImageUri:diagramNotAvailableImageUri,
    loadingGif:loadingGif,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();
