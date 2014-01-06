"use strict";
pathvisiojs.data.gpml.edge = function(){

  var strokeStyleMappings = {
    'Broken': 'dashed'
  };

  function toRenderableJson(gpmlEdge, pathwayIri, callback) {
    var jsonAnchorEdge, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef;
    var jsonEdge = {};
    var graphId = gpmlEdge.attr('GraphId') || ('id' + uuid.v4());
    var elementIri = pathwayIri + graphId;
    jsonEdge['@id'] = elementIri;
    jsonEdge.GraphId = graphId;

    var isContainedBy = gpmlEdge.attr('GroupRef');
    var dependsOn = [];
    if (!!isContainedBy) {
      jsonEdge.isContainedBy = isContainedBy;
      dependsOn.push(pathwayIri + isContainedBy);
    }

    jsonEdge.zIndex = parseFloat(gpmlEdge.select('Graphics').attr('ZOrder'));
    var points = gpmlEdge.selectAll('Point');
    jsonEdge['@type'] = [
      'element',
      'SvgPath',
      'Edge',
      isContainedBy || 'notGrouped'
    ];

    // Graphical Only Data below, except maybe Anchors

    var point, pointObj;
    jsonEdge.Point = [];
    points.each(function() {
      point = d3.select(this);
      pointObj = {};
      var relX = parseFloat(point.attr('RelX'));
      var relY = parseFloat(point.attr('RelY'));
      if ((relX !== null && relX !== undefined) && (relY !== null && relY !== undefined)) {
        pointObj['@type'] = 'SnappedPoint';

        dependsOn.push(pathwayIri + point.attr('GraphRef'));

        pointObj.hasReference = pathwayIri + point.attr('GraphRef');
        pointObj.RelX = relX;
        pointObj.RelY = relY;
        pointObj.x = parseFloat(point.attr('X'));
        pointObj.y = parseFloat(point.attr('Y'));
      }
      else {
        pointObj['@type'] = 'GraphicalPoint';
        pointObj.x = {};
        pointObj.x = parseFloat(point.attr('X'));
        pointObj.y = parseFloat(point.attr('Y'));
      }

      jsonEdge.Point.push(pointObj);
    })

    var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType') || 'Straight';
    jsonEdge.ConnectorType = '' + connectorType;

    var stroke = gpmlEdge.select('Graphics').attr('Color');
    if (!!stroke) {
      jsonEdge['stroke'] = stroke;
    }

    var strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');
    if (!!strokeWidth) {
      jsonEdge['strokeWidth'] = parseFloat(strokeWidth);
    }

    var jsonAnchorEdges = gpmlEdge.selectAll('Anchor');
    if (jsonAnchorEdges[0].length > 0) {
      jsonEdge.Anchor = [];
      jsonAnchorEdges.each(function() {
        jsonAnchorEdge = {};
        anchor = d3.select(this);
        elementIri = pathwayIri + anchor.attr('GraphId');
        jsonAnchorEdge['@id'] = pathwayIri + anchor.attr('GraphId');
        jsonAnchorEdge['@type'] = [
          'element',
          'Edge',
          'Anchor'
        ];
        jsonAnchorEdge.dependsOn = jsonEdge['@id'];
        jsonAnchorEdge.anchorPosition = anchor.attr('Position');
        jsonEdge.Anchor.push(jsonAnchorEdge);
      })
    }
    pathvisiojs.data.gpml.element.toRenderableJson(gpmlEdge, jsonEdge, function(jsonEdge) {
      callback(jsonEdge);
    });
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
toRenderableJson:toRenderableJson
};
}();
