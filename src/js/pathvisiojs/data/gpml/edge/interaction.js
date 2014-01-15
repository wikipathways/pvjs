"use strict";
pathvisiojs.data.gpml.edge.interaction = function(){

  //*
  //var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'Activity',
    'TBar':'InhibitoryActivity',
    'mim-catalysis':'Catalysis',
    'mim-inhibition':'Inhibition',
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"NecessaryStimulation",
    "mim-binding":"Binding",
    "mim-conversion":"Conversion",
    "mim-stimulation":"Stimulation",
    "mim-modification":"Modification",
    "mim-cleavage":"Cleavage",
    "mim-covalent-bond":"CovalentBond",
    "mim-transcription-translation":"TranscriptionTranslation",
    "mim-gap":"Gap",
    "Line":"Unspecified"
  };
  //*/

  function getGpmlArrowHeadNameFromSemanticName(semanticName) {
    for (gpmlArrowHeadName in gpmlArrowHeadToSemanticMappings) {
      if (gpmlArrowHeadToSemanticMappings[gpmlArrowHeadName] === semanticName) {
        return gpmlArrowHeadName;
      }
    }

    // if we get to here, there is no GPML ArrowHead name that matches the
    // semantic name. This should probably be in a try, catch, finally block.

    if (!gpmlArrowHeadName) {
      gpmlArrowHeadName = semanticName;
      console.warn('No GPML ArrowHead name found for semantic name "' + semanticName + '". Returning original semantic name as GPML ArrowHead name. PathVisio-Java will delete this ArrowHead from the GPML file if it edits this file.');
    }
    return gpmlArrowHeadName;
  }

  function getSemanticNameFromGpmlArrowHeadName(gpmlArrowHeadName) {
    var semanticName;
    if (!!gpmlArrowHeadName) {
      semanticName = gpmlArrowHeadToSemanticMappings[gpmlArrowHeadName];
      if (!semanticName) {
        semanticName = gpmlArrowHeadName;
        console.warn('No semantic name found for GPML ArrowHead name "' + gpmlArrowHeadName + '". Returning original GPML ArrowHead name as semantic name.');
      }
    }
    else {
      semanticName = 'Unspecified';
    }

    return semanticName;
  }

  function toRenderableJson(gpml, gpmlInteraction, pathwayIri, callback) {
    var jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef, source, sourceId;
    pathvisiojs.data.gpml.edge.toRenderableJson(gpmlInteraction, pathwayIri, function(jsonInteraction) {
      //console.log('jsonInteraction');
      //console.log(jsonInteraction);

      jsonInteraction['@type'].push('Interaction');
      jsonInteraction.renderableType = 'Interaction';

      points = gpmlInteraction.selectAll('Point');

      var database, ID, 
      datasourceReference = gpmlInteraction.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database')
        ID = datasourceReference.attr('ID')
        if (!!database && !!ID) {
          jsonInteraction.DatasourceReference = {};
          jsonInteraction.DatasourceReference.Database = database;
          jsonInteraction.DatasourceReference.ID = ID;
        }
      }

      // Arrowheads on both ends of a single graphical Interaction would represent two semantic Interactions

      function buildInteractionGraph(gpmlSource, gpmlTarget, callbackBIG) {
        //console.log('gpmlSource');
        //console.log(gpmlSource);
        //console.log('gpmlTarget');
        //console.log(gpmlTarget);
        var InteractionGraphMember = {};
        interactionType = getSemanticNameFromGpmlArrowHeadName(gpmlTarget.getAttribute('ArrowHead'));
        var interactionTypeExistenceCheck;
        if (!!interactionType) {
          jsonInteraction.InteractionGraph = jsonInteraction.InteractionGraph || [];

          sourceId = gpmlSource.getAttribute('GraphRef');
          if (!!sourceId) {
            source = gpml.querySelector('[GraphId=' + sourceId + ']');
            if (source.tagName === 'Anchor') {
              sourceId = source.parentNode.parentNode.getAttribute('GraphId');
            }
            else {
              if (source.tagName === 'Group') {
                sourceId = source.getAttribute('GroupId');
              }
            }
          }
          InteractionGraphMember['@id'] = pathwayIri + sourceId;

          targetId = gpmlTarget.getAttribute('GraphRef');
          if (!!targetId) {
            target = gpml.querySelector('[GraphId=' + targetId + ']');
            if (target.tagName === 'Anchor') {
              targetId = target.parentNode.parentNode.getAttribute('GraphId');
            }
            else {
              if (target.tagName === 'Group') {
                targetId = target.getAttribute('GroupId');
              }
            }

            InteractionGraphMember.interactsWith = pathwayIri + targetId;
            InteractionGraphMember.interactionType = interactionType;
          }
          interactionTypeExistenceCheck = jsonInteraction['@type'].indexOf(interactionType);
          if (interactionTypeExistenceCheck === -1) {
            jsonInteraction['@type'].push(interactionType);
          }
          else {
            //jsonInteraction['@type'][interactionTypeExistenceCheck] = 'Bidirectional-' + interactionType;
            jsonInteraction['@type'].push('Bidirectional-' + interactionType);
          }

          jsonInteraction.InteractionGraph.push(InteractionGraphMember);
          // TODO add the reaction, if it exists
          //'ex:Anchor': pathwayIri + '#Reaction1'

          callbackBIG(InteractionGraphMember, strcase.paramCase(interactionType));
        }
        else {
          callbackBIG(null, 'unspecified');
        }
      }

      var firstPoint = points[0][0];
      var firstGpmlArrowHeadName = firstPoint.getAttribute('ArrowHead');

      var lastPoint = points[0][points[0].length - 1];
      var lastGpmlArrowHeadName = lastPoint.getAttribute('ArrowHead');

      // first function below has inputs lastPoint, firstPoint because it
      // corresponds to the marker type for the first point


      if (!!firstGpmlArrowHeadName && !!lastGpmlArrowHeadName) {
        buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember, interactionType) {
        });
        buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember, interactionType) {
        });
      }
      else {
        if (!!firstGpmlArrowHeadName || !!lastGpmlArrowHeadName) {
          if (!!firstGpmlArrowHeadName) {
            buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember, interactionType) {
            });
          }

          if (!!lastGpmlArrowHeadName) {
            buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember, interactionType) {
            });
          }
        }
        else {
          lastPoint.setAttribute('ArrowHead', 'Line');
          buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember, interactionType) {
          });
        }
      }

      // TODO this is temporary solution. In the future, we will want to get
      // the marker id from the interactionType at render time.
      if (firstGpmlArrowHeadName) {
        jsonInteraction.markerStart = strcase.paramCase(firstGpmlArrowHeadName);
      }
      else {
        jsonInteraction.markerStart = 'none';
      }

      if (lastGpmlArrowHeadName) {
        jsonInteraction.markerEnd = strcase.paramCase(lastGpmlArrowHeadName);
      }
      else {
        jsonInteraction.markerEnd = 'none';
      }

      callback(jsonInteraction);
    })
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
  toRenderableJson:toRenderableJson,
  getGpmlArrowHeadNameFromSemanticName:getGpmlArrowHeadNameFromSemanticName,
  getSemanticNameFromGpmlArrowHeadName:getSemanticNameFromGpmlArrowHeadName
};
}();
