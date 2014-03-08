pathvisiojs.data.gpml.edge.graphicalLine = function(){
  'use strict';

  //*
  //var pvjsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'arrow'
  };
  //*/

  function toPvjson(gpmlSelection, graphicalLineSelection, callback) {
    var jsonAnchorGraphicalLine, anchor, jsonAnchor, points, jsonPoints, graphicalLineType, target, targetId, groupRef;
    pathvisiojs.data.gpml.edge.toPvjson(graphicalLineSelection, function(jsonGraphicalLine) {
      //console.log('jsonGraphicalLine');
      //console.log(jsonGraphicalLine);

      jsonGraphicalLine['@type'].push('GraphicalLine');
      jsonGraphicalLine.renderableType = 'GraphicalLine';

      points = graphicalLineSelection.selectAll('Point');

      var firstPoint = points[0][0];
      if (!!firstPoint.getAttribute('ArrowHead')) {
        jsonGraphicalLine.markerStart = strcase.paramCase(firstPoint.getAttribute('ArrowHead'));
      }
      else {
        jsonGraphicalLine.markerStart = 'none';
      }

      var lastPoint = points[0][points[0].length - 1];
      if (!!lastPoint.getAttribute('ArrowHead')) {
        jsonGraphicalLine.markerEnd = strcase.paramCase(lastPoint.getAttribute('ArrowHead'));
      }
      else {
        console.log('markerEnd = none');
        jsonGraphicalLine.markerEnd = 'none';
      }

      jsonGraphicalLine.ConnectorType = (graphicalLineSelection.select('Graphics').attr('ConnectorType'));
      if (!jsonGraphicalLine.ConnectorType) {
	jsonGraphicalLine.ConnectorType = 'Straight';
      }

      var pvjsonPath = {}, pvjsonText = {};
      pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
        pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
          pvjsonPath.points = jsonGraphicalLine.Point;
          callback(jsonGraphicalLine, pvjsonPath);
        });
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();
