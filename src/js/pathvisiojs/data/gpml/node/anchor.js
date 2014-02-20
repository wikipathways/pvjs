pathvisiojs.data.gpml.node.anchor = function() {
  'use strict';

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

  function toPvjson(gpmlParentElement, jsonParentElement, elementType, callback) {
    var gpmlAnchors, gpmlAnchor, jsonAnchor, elementIri, graphId;
    if (elementType === 'edge') {
      gpmlAnchors = gpmlParentElement.selectAll('Anchor');
      if (gpmlAnchors[0].length > 0) {
        jsonParentElement.Anchor = [];
        gpmlAnchors.each(function() {
          jsonAnchor = {};
          gpmlAnchor = d3.select(this);
          graphId = gpmlAnchor.attr('GraphId') || ('id' + uuid.v4());
          elementIri = '' + graphId;
          jsonAnchor['id'] = elementIri;
          jsonAnchor['@type'] = [
            'node',
            'element',
            'Element',
            'Anchor'
          ];
          jsonAnchor.dependsOn = jsonParentElement['id'];
          jsonAnchor.anchorPosition = gpmlAnchor.attr('Position');
          if (!!jsonParentElement.stroke) {
            jsonAnchor.backgroundColor = jsonParentElement.stroke;
          }
          jsonAnchor.ShapeType = gpmlAnchor.attr('Shape');
          if (!!jsonAnchor.ShapeType) {
            if (jsonAnchor.ShapeType === 'Circle') {
              jsonAnchor.ShapeType = 'oval';
            }
          }
          else {
            jsonAnchor.ShapeType = 'none';
          }
          jsonParentElement.Anchor.push(jsonAnchor);
        })
        callback(jsonParentElement);
      }
      else {
        callback(jsonParentElement);
      }
    }
    else {
      throw new Error('anchor.toPvjson doesnt know how to handle anything other than edges as parent elements right now. handling other elements needs to be implemented.');
    }
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
