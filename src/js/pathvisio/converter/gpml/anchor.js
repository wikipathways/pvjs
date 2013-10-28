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
      jsonAnchor.parentId = gpmlAnchor[0][0].parentNode.parentNode.attributes['GraphId'].textContent;
      jsonAnchor.position = gpmlAnchor.attr('Position');
      jsonAnchor.renderableType = 'anchor';
      callback(jsonAnchor);

    }
    catch (e) {
      console.log("Error converting anchor to renderable json: " + e.message);
    }
  }

  function getAllFromNode(jsonNode, callback) {
    var jsonAnchor = {};
    var elementSides = [
      {'side': 'top', 'initialEdgeDirection': 90}, 
      {'side': 'right', 'initialEdgeDirection': 0}, 
      {'side': 'bottom', 'initialEdgeDirection': 270}, 
      {'side': 'left', 'initialEdgeDirection': 180} 
    ];
    var anchorPositions = [0.25, 0.5, 0.75];

    try {
      var jsonAnchors = [];
      var jsonAnchor = {};

      jsonAnchor.parentId = jsonNode.id;
      jsonAnchor.renderableType = 'anchor';

      elementSides.forEach(function(element) {
        jsonAnchor.side = element.side;
        jsonAnchor.initialEdgeDirection = element.initialEdgeDirection;

        anchorPositions.forEach(function(position) {
          jsonAnchor.id = String(jsonNode.id) + String(element.side) + String(position);
          jsonAnchor.position = position;
          jsonAnchor.x = jsonNode.x + position * jsonNode.width;
          jsonAnchor.y = jsonNode.y + position * jsonNode.height;
          jsonAnchors.push(jsonAnchor);
        });

      });
      //callback(jsonAnchors);
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
