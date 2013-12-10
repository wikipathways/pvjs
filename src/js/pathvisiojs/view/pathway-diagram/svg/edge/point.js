pathvisiojs.view.pathwayDiagram.svg.edge.point = function(){

  var anchorPositionMappings = { "-1":0, "-0.5":0.333, "0":0.5, "0.5":0.667, "1":1 };

  // GPML to jGPML shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

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
    "none":"none",
    "TBar":"t-bar"
  };

  function getGraphRef(pathway, point) {
    if (point.hasOwnProperty('graphRef')) {
      if (pathway.hasOwnProperty('nodes')) {
        var node = pathway.nodes.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (node !== undefined) {
          return {'type':'node', 'element':node};
        }
      }

      if (pathway.hasOwnProperty('groups')) {
        var group = pathway.groups.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (group !== undefined) {
          return {'type':'group', 'groupId':group.groupId};
        }
      }

      var edgesWithAnchors = pathway.edges.filter(function(element) {return element.hasOwnProperty('anchors');});
      var anchor = null;
      var i = -1;
      do {
        i += 1;
        anchor = edgesWithAnchors[i].anchors.filter(function(element) {

            // js hint linter doesn't like this. how can I refactor?

            return element.graphId === point.graphRef;
          }
        )[0];
      } while (!anchor && i < edgesWithAnchors.length );

      return {'type':'anchor', 'element':anchor, 'edge':edgesWithAnchors[i]};

    }
    else {
      return {'type':'unconnected'};
    }
  }

  function getCoordinates(pathway, point) {
    if (!pathway || !point) {
      return console.warn('Error: Missing input parameters.');
    }

    var coordinates = {};
    var edgeTerminusRef = getGraphRef(pathway, point);
    if (edgeTerminusRef.type !== 'anchor') {
      if (edgeTerminusRef.type === 'unconnected') {
        coordinates.x = point.x;
        coordinates.y = point.y;

      }
      else {
        if (edgeTerminusRef.type === 'node') {
          coordinates = pathvisiojs.view.pathwayDiagram.svg.node.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathvisiojs.view.pathwayDiagram.svg.node.group.getDimensions(pathway, edgeTerminusRef.groupId);
            coordinates = pathvisiojs.view.pathwayDiagram.svg.node.getPortCoordinates(groupDimensions, point.relX, point.relY);
          }
          else {
            return 'error';
          }
        }
      }
    }
    else {
      var path = document.select("#interaction-" + edgeTerminusRef.edge.graphId)[0][0];
      coordinates = path.getPointAtLength(edgeTerminusRef.element.position * path.getTotalLength());
    }

    return coordinates;
  }

  function isTwoPointElbow(source, target) {
    var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) );
    var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
    var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
    return ( isRightAngle && sourcePasses && targetPasses );
  }

  return {
    getGraphRef:getGraphRef,
    getCoordinates:getCoordinates,
    isTwoPointElbow:isTwoPointElbow
  };
}();
