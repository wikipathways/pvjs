"use strict";

pathvisiojs.config = function() {
  var gpmlSourceUriStub = function() {
    // TODO is this correct for test3? I don't think so.
    return 'http://test3.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:';
  }

  var bridgedbLinkOutsUriStub = function() {
    return '../wpi/extensions/bridgedb.php/';
  }

  var bridgedbDatasources = function() {
    // TODO this should be replaced with bridgedb webservice call, when made available
    return '../wpi/extensions/PathwayViewer/datasources.txt';
  }

  var diagramLoadingIconUri = function() {
    return '../src/img/loading.gif';
  }

  var diagramNotAvailableImageUri = function() {
    return '../wpi/extensions/PathwayViewer/img/imageNotAvailable.jpg';
  }

  var imgDiagramUriStub = function() {
    return 'http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
  }

  var pathwaySearchUriStub = function() {
    return 'http://test3.wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&query=';
  }

  return {
    gpmlSourceUriStub:gpmlSourceUriStub,
    bridgedbLinkOutsUriStub:bridgedbLinkOutsUriStub,
    bridgedbDatasources:bridgedbDatasources,
    imgDiagramUriStub:imgDiagramUriStub,
    diagramLoadingIconUri:diagramLoadingIconUri,
    diagramNotAvailableImageUri:diagramNotAvailableImageUri,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();
