pathvisiojs.data.gpml.edge.graphicalLine = function(){
  var markerMappings = {
    "Arrow":"arrow",
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"mim-necessary-stimulation",
    "mim-binding":"mim-binding",
    "mim-conversion":"mim-conversion",
    "mim-stimulation":"mim-stimulation",
    "mim-modification":"mim-modification",
    "mim-catalysis":"mim-catalysis",
    "mim-inhibition":"mim-inhibition",
    "mim-cleavage":"mim-cleavage",
    "mim-covalent-bond":"mim-covalent-bond",
    "mim-transcription-translation":"mim-transcription-translation",
    "mim-gap":"mim-gap",
    "None":"none",
    "TBar":"t-bar"
  };

  function toRenderableJson(gpmlGraphicalLine, jsonGraphicalLine, pathwayIri, callback) {
    var jsonAnchorGraphicalLine, anchor, jsonAnchor, points, jsonPoints, graphicalLineType, target, targetId, groupRef;
    try {
      pathvisiojs.data.gpml.edge.toRenderableJson(gpmlGraphicalLine, jsonGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
        var edgeType = 'graphicalLine';
        jsonGraphicalLine.edgeType = 'GraphicalLine';
        points = gpmlGraphicalLine.selectAll('Point');
        jsonGraphicalLine['@type'].push(edgeType);

        var database, ID, 
        datasourceReference = gpmlGraphicalLine.select('Xref');
        if (!!datasourceReference) {
          database = datasourceReference.attr('Database')
          ID = datasourceReference.attr('ID')
          if (!!database && !!ID) {
            jsonGraphicalLine.DatasourceReference = {};
            jsonGraphicalLine.DatasourceReference.Database = database;
            jsonGraphicalLine.DatasourceReference.ID = ID;
          }
        }

        // Arrowheads on both ends of a single graphical GraphicalLine would represent two semantic GraphicalLines

        function buildGraphicalLineGraph(gpmlSource, gpmlTarget, callbackBIG) {
          var GraphicalLineGraphMember = {};
          graphicalLineType = gpmlArrowHeadToSemanticMappings[gpmlTarget.getAttribute('ArrowHead')];
          var graphicalLineTypeExistenceCheck;
          if (!!graphicalLineType) {
            self.myGraphicalLineGraphMember = GraphicalLineGraphMember;
            jsonGraphicalLine.GraphicalLineGraph = jsonGraphicalLine.GraphicalLineGraph || [];

            GraphicalLineGraphMember['@id'] = pathwayIri + gpmlSource.getAttribute('GraphRef');
            targetId = gpmlTarget.getAttribute('GraphRef');
            if (!!targetId) {
              target = gpml.querySelector('[GraphId=' + targetId + ']');
              if (target.tagName === 'Anchor') {
                targetId = target.parentElement.parentElement.getAttribute('GraphId');
              }

              GraphicalLineGraphMember.interactsWith = pathwayIri + targetId;
              GraphicalLineGraphMember.graphicalLineType = graphicalLineType;
            }
            graphicalLineTypeExistenceCheck = jsonGraphicalLine['@type'].indexOf(graphicalLineType);
            if (graphicalLineTypeExistenceCheck === -1) {
              jsonGraphicalLine['@type'].push(graphicalLineType);
            }
            else {
              //jsonGraphicalLine['@type'][graphicalLineTypeExistenceCheck] = 'Bidirectional-' + graphicalLineType;
              jsonGraphicalLine['@type'].push('Bidirectional-' + graphicalLineType);
            }
            jsonGraphicalLine.GraphicalLineGraph.push(GraphicalLineGraphMember);
            // TODO add the reaction, if it exists
            //'ex:Anchor': pathwayIri + '#Reaction1'

            callbackBIG(GraphicalLineGraphMember);
          }
          else {
            callbackBIG(null);
          }
        }

        var firstPoint = points[0][0];
        var lastPoint = points[0][points[0].length - 1];

        buildGraphicalLineGraph(firstPoint, lastPoint, function(GraphicalLineGraphMember) {
        });
        buildGraphicalLineGraph(lastPoint, firstPoint, function(GraphicalLineGraphMember) {
        });

        callback(jsonGraphicalLine);
      })
    }
    catch (e) {
      throw new Error('Error converting GraphicalLine to renderable json: ' + e.message);
    }
  }
  /*
  function toRenderableJson(gpmlEdge, jsonEdge, callback) {
    try {
      jsonEdge.id = gpmlEdge.attr('GraphId');
      jsonEdge.renderableType = 'edge';
      var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
      if (!!connectorType) {
        jsonEdge.connectorType = connectorType.toLowerCase();
      }
      else {
        jsonEdge.connectorType = 'straight';
      }

      var attribute;
      var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
      if (!!strokeStyle) {
        jsonEdge.strokeStyle = strokeStyle;
      }
      else {
        attribute = gpmlEdge.select('Attribute'); 
        if (!!attribute[0][0]) {
        console.log(attribute);
          if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
            jsonEdge.strokeStyle = 'double';
          }
        }
      }

      var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
      if (!!stroke) {
        var color = new RGBColor(stroke);
        if (color.ok) {
          jsonEdge.stroke = color.toHex();
        }
      }

      jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

      jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

      var xRef = gpmlEdge.select('Xref');
      if (xRef > 0) {
        if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
          jsonEdge.xRef = xRef;
        }
      }

      var gpmlPoints = gpmlEdge.selectAll('Point');
      self.gpmlPoints = gpmlPoints;
      var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
      if (!!markerStart) {
        jsonEdge.markerStart = markerStart;
      }
      else {
        jsonEdge.markerStart = 'none';
      }
      var lastPointIndex = gpmlPoints[0].length - 1;
      var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
      if (!!markerEnd) {
        jsonEdge.markerEnd = markerEnd;
      }
      else {
        jsonEdge.markerEnd = 'none';
      }

      var jsonPoints = [];
      gpmlPoints.each(function() {
        pathvisiojs.data.gpml.edge.point.toRenderableJson(d3.select(this), function(jsonPoint) {
          jsonPoints.push(jsonPoint);
        });
      });
      jsonEdge.points = jsonPoints;
      callback(jsonEdge);
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    }
  }
  //*/

  return {
    toRenderableJson:toRenderableJson
  };
}();
