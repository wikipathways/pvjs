// Edges (interactions and graphical lines)

pathvisio.xmlGpml2jsonGpml.edges = function(){

  // pathvisio.js vs PathVisio (Java) specification of anchor position
  // -----------------------------------------
  // pathvisio.js |  PathVisio  | Meaning
  //  relX | relY | relx | rely |
  // -----------------------------------------
  // 0.333   0      -0.5   -1.0   top side at left third-point 
  // 0.5     0       0.0   -1.0   top side at center 
  // 0.667   0       0.5   -1.0   top side at right third-point 
  // 1       0.333   1.0   -0.5   right side at top third-point 
  // 1       0.5     1.0    0.0   right side at middle 
  // 1       0.667   1.0    0.5   right side at bottom third-point 
  // 0.667   1       0.5    1.0   bottom side at right third-point 
  // 0.5     1       0.0    1.0   bottom side at center 
  // 0.333   1      -0.5    1.0   bottom side at left third-point 
  // 0       0.667  -1.0    0.5   left side at bottom third-point 
  // 0       0.5    -1.0    0.0   left side at middle 
  // 0       0.333  -1.0   -0.5   left side at top third-point 
  //
  // PathVisio (Java) also sometimes comes up with other values for relx and rely.
  // I don't know what those mean.

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
    "None":"none",
    "TBar":"t-bar"
  };

  function convert(rawJsonEdges) {
    try {
      rawJsonEdges.forEach(function(element, index, array) {
        element.graphId = element.graphid;
        delete element.graphid;

        if (element.hasOwnProperty('groupref')) {
          element.groupRef = element.groupref;
          delete element.groupref;
        };

        if (element.graphics.hasOwnProperty('anchor')) {
          element.anchors = pathvisio.xmlGpml2jsonGpml.convertToArray(element.graphics.anchor);
          element.anchors.forEach(function(element) {
            element.graphId = element.graphid;
            delete element.graphid;
          });
        };

        if (element.graphics.hasOwnProperty('color')) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) { 
            element.stroke = color.toHex();
          }
        };	

        element.strokeWidth = element.graphics.linethickness;

        if (element.graphics.hasOwnProperty('connectortype')) {
          element.connectorType = element.graphics.connectortype.toLowerCase();
        }	

        if (element.graphics.hasOwnProperty('linestyle')) {
          element.strokeStyle = element.graphics.linestyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          };
          delete element.graphics.linestyle;
        }	
        else {
          if (element.hasOwnProperty('attribute')) {
            if ((element.attribute.key === "org.pathvisio.DoubleLineProperty") && (element.attribute.value === "Double")) {
              element.strokeStyle = 'double';
              delete element.attribute;
            };
          };	
        };

        element.zIndex = element.graphics.zorder;

        element.xRef = element.xref;
        delete element.xref;

        // Points

        var points = pathvisio.xmlGpml2jsonGpml.convertToArray( element.graphics.point );
        var pointsData = pathvisio.xmlGpml2jsonGpml.edges.points.convert( points );
        element.points = pointsData.points;

        // Back to edges

        element.markerStart = pointsData.markerStart;
        element.markerEnd = pointsData.markerEnd;

        delete element.graphics;

      });
      var validJsonEdges = rawJsonEdges.sort(function(a,b) {return a.zIndex - b.zIndex});
      return validJsonEdges;
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    };
  };

  return {
    convert:convert
  }
}();
