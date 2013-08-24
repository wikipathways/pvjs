pathway.edges.endPoints = function(){ 
  function getGraphRef(point) {
    self.point=point;
    if (point.hasOwnProperty('graphRef')) {
      if (pathway.data.hasOwnProperty('labelableElements')) {
        var labelableElement = pathway.data.labelableElements.filter(function(element) {return element.graphId === point.graphRef})[0]
        if (labelableElement !== undefined) {
          return {'type':'labelableElement', 'element':labelableElement};
        };
      };

      if (pathway.data.hasOwnProperty('groups')) {
        var group = pathway.data.groups.filter(function(element) {return element.graphId === point.graphRef})[0]
        if (group !== undefined) {
          return {'type':'group', 'groupId':group.groupId};
        };
      };

      var edgesWithAnchors = pathway.data.edges.filter(function(element) {return element.hasOwnProperty('anchors')})
      self.edgesWithAnchors = edgesWithAnchors;
      var i = -1;
      do {
        i += 1;
        var anchor = edgesWithAnchors[i].anchors.filter(function(element) {return element.graphId === point.graphRef})[0]
      } while (anchor === undefined && i < edgesWithAnchors.length);

      return {'type':'anchor', 'element':anchor, 'edge':edgesWithAnchors[i]};

    }
    else {
      return {'type':'unconnected'};
    };
  };

  function getCoordinates(point) {

    // var point = pathway.data.edges.filter(function(element) {return element.graphId === "b9d61" })[0].points[2]
    // pathway.data.edges.endPoints.getCoordinates(point)

    var coordinates = {};
    var edgeTerminusRef = self.edgeTerminusRef = getGraphRef(point);
    if (edgeTerminusRef.type !== 'anchor') {
      if (edgeTerminusRef.type === 'unconnected') {
        coordinates.x = point.x;
        coordinates.y = point.y;

      }
      else {
        if (edgeTerminusRef.type === 'labelableElement') {
          var coordinates = pathway.labelableElements.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathway.groups.getDimensions(edgeTerminusRef.groupId);
            var coordinates = pathway.labelableElements.getPortCoordinates(groupDimensions, point.relX, point.relY);
          }
          else {
            return 'error';
          };
        };
      };
    }
    else {
      var path = d3.select("#interaction-" + edgeTerminusRef.edge.graphId)[0][0];
      var coordinates = path.getPointAtLength(edgeTerminusRef.element.position * path.getTotalLength());
    };

    return coordinates;
  };

  function isTwoPointElbow(source, target) {
    var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) ); 
    var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
    var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
    return ( isRightAngle && sourcePasses && targetPasses );
  }; 

  return { 
    getGraphRef:getGraphRef, 
    getCoordinates:getCoordinates, 
    isTwoPointElbow:isTwoPointElbow
  } 
}();
