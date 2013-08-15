function getEdgeTerminusRef(point) {
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

function getEdgeTerminusCoordinatesNonAnchor(point) {
  var coordinates = {};
  var edgeTerminusRef = getEdgeTerminusRef(point);
  if (edgeTerminusRef.type === 'unconnected') {
    coordinates.x = point.x;
    coordinates.y = point.y;
    return coordinates;
  }
  else {
    if (edgeTerminusRef.type === 'labelableElement') {
      var coordinates = getBBoxPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
      return coordinates;
    }
    else {
      if (edgeTerminusRef.type === 'group') {
        var groupDimensions = getGroupDimensions(edgeTerminusRef.groupId);
        var coordinates = getBBoxPortCoordinates(groupDimensions, point.relX, point.relY);
        return coordinates;
      }
      else {
        return 'error';
      };
    };
  };
};

function getEdgeTerminusCoordinates(point) {
  var coordinates = {};
  var edgeTerminusRef = getEdgeTerminusRef(point);
  if (edgeTerminusRef.type !== 'anchor') {
    return getEdgeTerminusCoordinatesNonAnchor(point);
  }
  else {

    // this needs work to do more than one level deep of anchors

    secondarySourcePoint = edgeTerminusRef.edge.points[0];
    secondaryTargetPoint = edgeTerminusRef.edge.points[edgeTerminusRef.edge.points.length - 1];

    if (getEdgeTerminusRef(secondarySourcePoint).type !== 'anchor' && getEdgeTerminusRef(secondaryTargetPoint).type !== 'anchor') {
      secondarySourcePointCoordinates = getEdgeTerminusCoordinatesNonAnchor(secondarySourcePoint);
      secondaryTargetPointCoordinates = getEdgeTerminusCoordinatesNonAnchor(secondaryTargetPoint);

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
