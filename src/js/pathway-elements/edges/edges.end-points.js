pathvisio.edges.endPoints = function(){ 
  function getGraphRef(point) {
    self.point=point;
    if (point.hasOwnProperty('graphRef')) {
      if (pathway.hasOwnProperty('labelableElements')) {
        var labelableElement = pathway.labelableElements.filter(function(element) {return element.graphId === point.graphRef})[0]
        if (labelableElement !== undefined) {
          return {'type':'labelableElement', 'element':labelableElement};
        };
      };

      if (pathway.hasOwnProperty('groups')) {
        var group = pathway.groups.filter(function(element) {return element.graphId === point.graphRef})[0]
        if (group !== undefined) {
          return {'type':'group', 'groupId':group.groupId};
        };
      };

      var edgesWithAnchors = pathway.edges.filter(function(element) {return element.hasOwnProperty('anchors')})
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

  // This might be confusing and should be refactored. The reason for such an odd function is that I need to be able to get
  // endpoint coordinates for endpoints with GraphRefs that do not refer to anchors. Anchors are special ports that are
  // added to interactions and graphical lines.

  function getCoordinatesNonAnchor(point) {
    var coordinates = {};
    var edgeTerminusRef = getGraphRef(point);
    if (edgeTerminusRef.type === 'unconnected') {
      coordinates.x = point.x;
      coordinates.y = point.y;
      return coordinates;
    }
    else {
      if (edgeTerminusRef.type === 'labelableElement') {
        var coordinates = pathvisio.labelableElements.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        return coordinates;
      }
      else {
        if (edgeTerminusRef.type === 'group') {
          var groupDimensions = pathvisio.groups.getDimensions(edgeTerminusRef.groupId);
          var coordinates = pathvisio.labelableElements.getPortCoordinates(groupDimensions, point.relX, point.relY);
          return coordinates;
        }
        else {
          return 'error';
        };
      };
    };
  };

  function getCoordinates(point) {
    var coordinates = {};
    var edgeTerminusRef = getGraphRef(point);
    if (edgeTerminusRef.type !== 'anchor') {
      return getCoordinatesNonAnchor(point);
    }
    else {

      // this needs work to do more than one level deep of anchors

      secondarySourcePoint = edgeTerminusRef.edge.points[0];
      secondaryTargetPoint = edgeTerminusRef.edge.points[edgeTerminusRef.edge.points.length - 1];

      if (getGraphRef(secondarySourcePoint).type !== 'anchor' && getGraphRef(secondaryTargetPoint).type !== 'anchor') {
        secondarySourcePointCoordinates = getCoordinatesNonAnchor(secondarySourcePoint);
        secondaryTargetPointCoordinates = getCoordinatesNonAnchor(secondaryTargetPoint);

        coordinates.x = secondarySourcePointCoordinates.x + edgeTerminusRef.element.position * ( secondaryTargetPointCoordinates.x - secondarySourcePointCoordinates.x );
        coordinates.y = secondarySourcePointCoordinates.y + edgeTerminusRef.element.position * ( secondaryTargetPointCoordinates.y - secondarySourcePointCoordinates.y );

        return coordinates;
      };
    };
  };

  function isTwoPointElbow(source, target) {
    var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) ); 
    var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
    var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
    return ( isRightAngle && sourcePasses && targetPasses );
  }; 

  return { 
    getGraphRef:getGraphRef, 
    getCoordinatesNonAnchor:getCoordinatesNonAnchor, 
    getCoordinates:getCoordinates, 
    isTwoPointElbow:isTwoPointElbow
  } 
}();
