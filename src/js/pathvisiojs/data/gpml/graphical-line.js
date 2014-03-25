pathvisiojs.data.gpml.graphicalLine = function(){
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
      pvjsonPath = {},
      pvjsonText = {};

    pvjsonPath.networkType = 'edge';
    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pathvisiojs.data.gpml.point.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
          pathvisiojs.data.gpml.anchor.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonAnchor) {

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
