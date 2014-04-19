var Element = require('./element.js')
  , Graphics = require('./graphics.js')
  , Point = require('./point.js')
  , Anchor = require('./anchor.js')
  ;

module.exports = {
  // TODO do something with the linetype info to specify whether interaction is direct or indirect

  gpmlArrowHeadsToSemanticMappings: {
    'Arrow':'Activity',
    'ArrowArrow':'BidirectionalActivity',
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
  },

  getGpmlArrowHeadNameFromSemanticName: function(semanticName) {
    for (var gpmlArrowHeadName in this.gpmlArrowHeadsToSemanticMappings) {
      if (this.gpmlArrowHeadsToSemanticMappings[gpmlArrowHeadName] === semanticName) {
        return gpmlArrowHeadName;
      }
    }

    if (!gpmlArrowHeadName) {
      gpmlArrowHeadName = semanticName;
      console.warn('No GPML ArrowHead name found for semantic name "' + semanticName + '". Returning original semantic name as GPML ArrowHead name. PathVisio-Java will delete this ArrowHead from the GPML file if it edits this file.');
    }
    return gpmlArrowHeadName;
  },

  getSemanticNameFromGpmlArrowHeadName: function(gpmlArrowHeadName) {
    var semanticName;
    if (!!gpmlArrowHeadName) {
      semanticName = this.gpmlArrowHeadsToSemanticMappings[gpmlArrowHeadName];
      if (!semanticName) {
        semanticName = gpmlArrowHeadName;
        console.warn('No semantic name found for GPML ArrowHead name "' + gpmlArrowHeadName + '". Returning original GPML ArrowHead name as semantic name.');
      }
    }
    else {
      semanticName = 'Unspecified';
    }

    return semanticName;
  },

  toPvjson: function(gpmlSelection, interactionSelection, callback) {
    var model = this.model;
    var interactionInstance = this;

    var jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef, source, sourceId, pvjsonElements;
    //pathvisiojs.formatConverter.gpml.edge.toPvjson(interactionSelection, function(jsonInteraction) {
      //console.log('jsonInteraction');
      //console.log(jsonInteraction);

      /*
      jsonInteraction['@type'].push('Interaction');
      jsonInteraction.renderableType = 'Interaction';

      points = interactionSelection.selectAll('Point');

      var database, ID,
      datasourceReference = interactionSelection.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database');
        ID = datasourceReference.attr('ID');
        if (!!database && !!ID) {
          jsonInteraction.DatasourceReference = {};
          jsonInteraction.DatasourceReference.Database = database;
          jsonInteraction.DatasourceReference.ID = ID;
        }
      }
      //*/

      /*
      function buildInteractionGraph(sourceSelection, targetSelection, callbackBIG) {
        var InteractionGraphMember = {};
        jsonInteraction.InteractionGraph = jsonInteraction.InteractionGraph || [];

        sourceId = sourceSelection.getAttribute('GraphRef');
        if (!!sourceId) {
          source = gpmlSelection.querySelector('[GraphId=' + sourceId + ']');
          if (source.tagName === 'Anchor') {
            sourceId = source.parentNode.parentNode.getAttribute('GraphId');
          }
          else {
            if (source.tagName === 'Group') {
              sourceId = source.getAttribute('GroupId');
            }
          }
        }
        InteractionGraphMember.id = sourceId || 'no-source';

        targetId = targetSelection.getAttribute('GraphRef');
        if (!!targetId) {
          target = gpmlSelection.querySelector('[GraphId=' + targetId + ']');
          if (target.tagName === 'Anchor') {
            targetId = target.parentNode.parentNode.getAttribute('GraphId');
          }
          else {
            if (target.tagName === 'Group') {
              targetId = target.getAttribute('GroupId');
            }
          }
          InteractionGraphMember.interactsWith = targetId;
        }
        jsonInteraction.InteractionGraph.push(InteractionGraphMember);
        // TODO add the reaction, if it exists
        //'ex:Anchor': pathwayIri + '#Reaction1'

        callbackBIG(InteractionGraphMember);
      }
      //*/

      /*
      var firstPoint = points[0][0];
      var firstGpmlArrowHeadName = firstPoint.getAttribute('ArrowHead');

      var lastPoint = points[0][points[0].length - 1];
      var lastGpmlArrowHeadName = lastPoint.getAttribute('ArrowHead');

      if (!!firstGpmlArrowHeadName && !!lastGpmlArrowHeadName) {
        interactionType = getSemanticNameFromGpmlArrowHeadName(firstPoint.getAttribute('ArrowHead') + lastPoint.getAttribute('ArrowHead'));

        // function below has inputs lastPoint, firstPoint because it
        // corresponds to the marker type for the first point
        buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember) {
        });
        // TODO figure out the best way to handle bidirectional interactions, etc.
        // Should arrowheads on both ends of a single graphical Interaction represent two semantic Interactions?
        buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember) {
        });
      }
      else {
        if (!!firstGpmlArrowHeadName || !!lastGpmlArrowHeadName) {
          if (!!firstGpmlArrowHeadName) {
            buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember) {
            });
            interactionType = getSemanticNameFromGpmlArrowHeadName(firstPoint.getAttribute('ArrowHead'));
          }

          if (!!lastGpmlArrowHeadName) {
            interactionType = getSemanticNameFromGpmlArrowHeadName(lastPoint.getAttribute('ArrowHead'));
            buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember) {
            });
          }
        }
        else {
          lastPoint.setAttribute('ArrowHead', 'Line');
          interactionType = getSemanticNameFromGpmlArrowHeadName(lastPoint.getAttribute('ArrowHead'));
          buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember) {
          });
        }
      }

      if (!!interactionType) {
        jsonInteraction['@type'].push(interactionType);
        jsonInteraction.interactionType = strcase.paramCase(interactionType);
      }
      else {
        jsonInteraction['@type'].push('unspecified');
        jsonInteraction.interactionType = 'unspecified';
        console.warn('Interaction Type unable to be determined. Setting it to "unspecified."');
      }
      //*/

      // TODO this is a temporary solution.
      // In the future, we will want to update the view code such that we specify at render time
      // the marker(s) and line type (and possibly other attributes) based on the interactionType.
      /*
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
      //*/

      var pvjsonPath = {};
      pvjsonPath.networkType = 'edge';
      pvjsonPath.gpmlType = 'Interaction';
      Element.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath) {
        Graphics.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath) {
          Point.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath) {
            Anchor.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonAnchor) {
              pvjsonElements = [pvjsonPath].concat(pvjsonAnchor);
              callback(pvjsonElements);
            });
          });
        });
      });
    //});
  }
};
