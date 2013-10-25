pathvisio.converter.gpml.anchor = function() {

  // anchors
  // an anchor is an attachment point at which an edge can originate or terminate.
  // It has the following elements:
  // anchor = {
  //  id: unique value for this anchor
  //  graphRef: reference to the pathway element to which the anchor is bound.
  //  side: [top, right, bottom, left] (choose a side. only for anchors attached to nodes, not edges.)
  //  position: percentage of the distance along the specified side of the element or the edge to which the anchor is bound.
  //    For nodes, if the side specified is right or left, the starting point is the topmost point on the side, and
  //    if the side specified is top or bottom, the starting point is the leftmost point on the side (smallest x or y value in SVG coordinate system).
  //  initialEdgeDirection: direction (in degrees) by which the edge emanates from the anchor (only for anchors attached to nodes, not edges)
  // }

  function getFromEdge(gpmlAnchor, callback) {
    self.gpmlAnchor = gpmlAnchor;
    var jsonAnchor = {};

    try {
      jsonAnchor.id = gpmlAnchor.attr('GraphId');
      jsonAnchor.graphRef = gpmlAnchor[0][0].parentNode.parentNode.attributes['GraphId'].textContent;
      jsonAnchor.position = gpmlAnchor.attr('Position');
      callback(jsonAnchor);

    }
    catch (e) {
      console.log("Error converting anchor to renderable json: " + e.message);
    }
  }

  function getAllFromNode(gpmlNode, callback) {
    self.gpmlAnchor = gpmlAnchor;
    var jsonAnchor = {};

    try {
      var jsonAnchors = [
        { 'x': 12,
          'y': 12,
          'position': 0.4,
          'side': 'top',
          'initialEdgeDirection': 90,
          'graphRef': gpmlNode.attr('GraphId'),
          'id': 'guid'
        },
        { 'x': 12,
          'y': 12,
          'position': 0.4,
          'side': 'top',
          'initialEdgeDirection': 90,
          'graphRef': gpmlNode.attr('GraphId'),
          'id': 'guid'
        }
      ];
      //callback(jsonAnchors);
      console.log('jsonAnchors');
      console.log(jsonAnchors);
      return jsonAnchors;
    }
    catch (e) {
      console.log("Error converting anchor to renderable json: " + e.message);
    }
  }



  return {
    getFromEdge:getFromEdge,
    getAllFromNode:getAllFromNode
  };
}();
