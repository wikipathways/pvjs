pathvisiojs.formatConverter.gpml.graphicalLine = function(){
  'use strict';

  //*
  //var pvjsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'arrow'
  };
  //*/

  function toPvjson(gpmlSelection, graphicalLineSelection, callback) {
    var jsonAnchorGraphicalLine,
      anchor,
      jsonAnchor,
      points,
      jsonPoints,
      graphicalLineType,
      target,
      targetId,
      groupRef,
      source,
      sourceId,
      pvjsonElements,
      pvjsonPath = {};

    pvjsonPath.networkType = 'edge';
    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
        pathvisiojs.formatConverter.gpml.point.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
          pathvisiojs.formatConverter.gpml.anchor.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonAnchor) {
            pvjsonElements = [pvjsonPath].concat(pvjsonAnchor);
            callback(pvjsonElements);
          });
        });
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();
