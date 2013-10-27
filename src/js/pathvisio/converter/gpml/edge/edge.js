pathvisio.converter.gpml.edge = function(){
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
    "None":"none",
    "TBar":"t-bar"
  };

  var strokeStyleMappings = {
    'Broken': 'dashed'
  };

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
          if ((attribute.attr('Key') === "org.pathvisio.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
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
        pathvisio.converter.gpml.edge.point.toRenderableJson(d3.select(this), function(jsonPoint) {
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

  return {
    toRenderableJson:toRenderableJson
  };
}();
