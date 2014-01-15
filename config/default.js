"use strict";

pathvisiojs.config = function() {
  var gpmlSourceUriStub = function() {
    if(typeof console !== "undefined") {
      console.warn('WikiPathways does not yet support CORS, so until we get CORS support, we are using Pointer as a proxy to enable CORS for getting GPML.');
    }
    return 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=';
  }

  var bridgedbLinkOutsUrlStub = function() {
    return '../external-data/bridgedb/bridgedb.php/';
  }

  var bridgedbDatasources = function() {
    return '../external-data/bridgedb/datasources.txt';
  }

  var diagramNotAvailableImageUri = function() {
    // TODO update this link to a URL we control
    return 'http://upload.wikimedia.org/wikipedia/commons/3/3b/Picture_Not_Yet_Available.png';
  }

  var pngDiagramUriStub = function() {
    return 'http://www.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
  }

  var pathwaySearchUriStub = function() {
    return 'http://wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&query=';
  }

  return {
    gpmlSourceUriStub:gpmlSourceUriStub,
    bridgedbLinkOutsUrlStub:bridgedbLinkOutsUrlStub,
    bridgedbDatasources:bridgedbDatasources,
    pngDiagramUriStub:pngDiagramUriStub,
    diagramNotAvailableImageUri:diagramNotAvailableImageUri,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();
