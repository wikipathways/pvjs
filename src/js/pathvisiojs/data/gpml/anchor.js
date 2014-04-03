pathvisiojs.data.gpml.anchor = function() {
  'use strict';

  // anchors
  // see jsPlumb anchor model: http://jsplumbtoolkit.com/doc/anchors
  // TODO The documention below is out-of-date. See also pathvisiojs.data.gpml.point()
  // This model is not fully formed.
  // an anchor is an attachment point at which an edge can originate or terminate.
  // It has the following elements:
  // anchor = {
  //  id: unique value for this anchor
  //  isAttachedTo: reference to the pathway element to which the anchor is bound.
  //  position: percentage of the distance along the specified side of the element or the edge to which the anchor is bound.
  //    For nodes, if the side specified is right or left, the starting point is the topmost point on the side, and
  //    if the side specified is top or bottom, the starting point is the leftmost point on the side (smallest x or y value in SVG coordinate system).
  // }


  function toPvjson(gpmlSelection, gpmlEdgeSelection, pvjsonEdge, callback) {
    var anchor, anchorSelection, pvjsonAnchor, pvjsonAnchors = [], pvjsonX, pvjsonY, parentElement, pvjsonMarker, attachedPoint, pvjsonAnchorPosition, pvjsonAnchorWidth, pvjsonAnchorHeight;
    var points = pvjsonEdge.points;
    var pointCount = points.length;
    var firstPoint = points[0];
    var lastPoint = points[pointCount - 1];

    gpmlEdgeSelection.selectAll('Anchor').each(function(d, i) {
      anchor = this;
      anchorSelection = d3.select(this);
      pvjsonAnchor = {};
      pvjsonAnchor.gpmlType = 'Anchor';
      pvjsonAnchor.isAttachedTo = pvjsonEdge.id;
      pvjsonAnchor.zIndex = pvjsonEdge.zIndex + 0.1;
      pvjsonAnchor.networkType = 'node';

      pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, anchorSelection, pvjsonAnchor, function(pvjsonAnchor) {
        pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, anchorSelection, pvjsonAnchor, function(pvjsonAnchor) {
          attachedPoint = d3.select(gpmlSelection).select('Point[GraphRef=' + pvjsonAnchor.id + ']');
          pvjsonAnchorWidth = pvjsonAnchor.width;
          pvjsonAnchorHeight = pvjsonAnchor.height;
          if (!!attachedPoint[0][0]) {
            pvjsonAnchor.x = parseFloat(attachedPoint.attr('X')) - pvjsonAnchorWidth/2;
            pvjsonAnchor.y = parseFloat(attachedPoint.attr('Y')) - pvjsonAnchorHeight/2;
          }
          else {
            pvjsonAnchorPosition = pvjsonAnchor.position;
            pvjsonAnchor.x = firstPoint.x + pvjsonAnchorPosition * (lastPoint.x - firstPoint.x) - pvjsonAnchorWidth/2;
            pvjsonAnchor.y = firstPoint.y + pvjsonAnchorPosition * (lastPoint.y - firstPoint.y) - pvjsonAnchorHeight/2;
            console.warn('No cached X and Y data available for the Anchor for the edge element below. Assuming LineType of Straight for anchor position calculation.');
            console.log(gpmlEdgeSelection[0][0]);
          }
          pvjsonAnchors.push(pvjsonAnchor);
          });
        });
    });
    callback(pvjsonAnchors);
  }

  function getAllFromNode(jsonNode, callback) {
    self.jsonNode = jsonNode;
    var jsonAnchors = [];
    var parentId, renderableType, id, position, x, y, sideOffsetX, sideOffsetY, positionOffsetX, positionOffsetY;
    /*
    var elementSides = [
      {'side': 'top', 'initialEdgeDirection': 90}, 
      {'side': 'right', 'initialEdgeDirection': 0}, 
      {'side': 'bottom', 'initialEdgeDirection': 270}, 
      {'side': 'left', 'initialEdgeDirection': 180} 
    ];
    //*/
    var elementSides = [
      {'side': 'top', 'dx': 0, 'dy': -1},
      {'side': 'right', 'dx': 1, 'dy': 0},
      {'side': 'bottom', 'dx': 0, 'dy': 1},
      {'side': 'left', 'dx': -1, 'dy': 0}
    ];
    var anchorPositions = [0.25, 0.5, 0.75];

    parentId = jsonNode.id;
    renderableType = 'anchor';

    elementSides.forEach(function(element) {
      sideOffsetX = Math.max(element.dx, 0) * jsonNode.width;
      sideOffsetY = Math.max(element.dy, 0) * jsonNode.height;
      anchorPositions.forEach(function(position) {
        id = String(jsonNode.id) + String(element.side) + String(position);
        positionOffsetX = Math.abs(element.dy) * position * jsonNode.width;
        positionOffsetY = Math.abs(element.dx) * position * jsonNode.height;
        x = jsonNode.x + sideOffsetX + positionOffsetX;
        y = jsonNode.y + sideOffsetY + positionOffsetY;
        jsonAnchors.push({
          'parentId': jsonNode.id,
          'renderableType': 'anchor',
          'side': element.side,
          'dx': element.dx,
          'dy': element.dy,
          'id': id,
          'position': position,
          'x': x,
          'y': y
        });
      });
    });
    //callback(jsonAnchors);
    return jsonAnchors;
  }

  return {
    toPvjson:toPvjson,
    getAllFromNode:getAllFromNode
  };
}();
