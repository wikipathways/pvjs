"use strict";

var pathvisiojs = pathvisiojs || {};
pathvisiojs.config = function() {
  var gpmlSourceUriStub = function() {
    if(typeof console !== "undefined") {
      console.warn('WikiPathways does not yet support CORS, so until we get CORS support, we are using Pointer as a proxy to enable CORS for getting GPML.');
    }
    return 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=';
  }

  var bridgedbLinkOutsUriStub = function() {
    return 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb/bridgedb.php/';
  }

  var bridgedbDatasources = function() {
    return '../external-data/bridgedb/datasources.txt';
  }

  var diagramNotAvailableImageUri = function() {
    return '../src/img/imageNotAvailable.jpg';
  }

  var loadingGif = function() {
    return '../src/img/loading.gif';
  }

  var imgDiagramUriStub = function() {
    return 'http://www.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
  }

  var pathwaySearchUriStub = function() {
    return 'http://wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&query=';
  }

  return {
    gpmlSourceUriStub:gpmlSourceUriStub,
    bridgedbLinkOutsUriStub:bridgedbLinkOutsUriStub,
    bridgedbDatasources:bridgedbDatasources,
    imgDiagramUriStub:imgDiagramUriStub,
    loadingGif:loadingGif,
    diagramNotAvailableImageUri:diagramNotAvailableImageUri,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();
