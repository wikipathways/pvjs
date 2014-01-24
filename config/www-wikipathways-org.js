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

  var imgDiagramUriStub = function() {
    return 'http://www.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
  }

  var pathwaySearchUriStub = function() {
    return 'http://www.wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&query=';
  }

  return {
    gpmlSourceUriStub:gpmlSourceUriStub,
    bridgedbLinkOutsUrlStub:bridgedbLinkOutsUrlStub,
    bridgedbDatasources:bridgedbDatasources,
    imgDiagramUriStub:imgDiagramUriStub,
    diagramNotAvailableImageUri:diagramNotAvailableImageUri,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();
