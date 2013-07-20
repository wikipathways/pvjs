// for doing this in Java, we could look at 
// https://code.google.com/p/json-io/

function getJson(gpmlUrl, callback) {
  if (!(gpmlUrl)) {
    gpmlUrl = "../../samples/gpml/error.gpml";
  };

  d3.xml(gpmlUrl, "application/gpml+xml", function(error, gpml) {
          // be sure server has set gpml mime type to application/gpml+xml

          var gpmlDoc = gpml.documentElement

          var oSerializer = new XMLSerializer();
          var sGpml = oSerializer.serializeToString(gpmlDoc);


          var pathway = convertGpml2Json(gpml);

          var sJson = self.sJson = JSON.stringify(pathway, undefined, 2);

          callback(sGpml, sJson);

  });
};

function convertToArray(object) {
  if (Object.prototype.toString.call( object ) === '[object Object]' ) {
    var array = [];
    array.push(object)
    return array;
  }
  else {
    if( Object.prototype.toString.call( object ) === '[object Array]' ) {
      return object;
    };
  };
};

function convertGpml2Json(xmlDoc){

  // GPML to jGPML mappings: { 'OldName':'new-name' }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

  // GPML to jGPML shape name mappings: { "oldName":"new-name" }

  var shapeMappings = { "Arc":"arc", "Brace":"brace",  "Rectangle":"rectangle", "RoundedRectangle":"rounded-rectangle", "Oval":"oval", "Endoplasmic Reticulum":"endoplasmic-reticulum", "Golgi Apparatus":"golgi-apparatus", "Mitochondria":"mitochondria", "Triangle":"triangle", "Pentagon":"pentagon", "Hexagon":"hexagon", "Sarcoplasmic Reticulum":"sarcoplasmic-reticulum", "mim-degradation":"mim-degradation" };

  // GPML to jGPML marker name mappings: { "oldName":"new-name" }
  // excludes mim-branching-left and mim-branching-right as per Alex Pico's request

  var markerMappings = { "Arrow":"arrow", "TBar":"t-bar", "mim-necessary-stimulation":"mim-necessary-stimulation", "mim-binding":"mim-binding", "mim-conversion":"mim-conversion", "mim-stimulation":"mim-stimulation", "mim-modification":"mim-modification", "mim-catalysis":"mim-catalysis", "mim-inhibition":"mim-inhibition", "mim-cleavage":"mim-cleavage", "mim-covalent-bond":"mim-covalent-bond", "mim-transcription-translation":"mim-transcription-translation", "mim-gap":"mim-gap" };

  var dataNodeTypeMappings = { "GeneProduct":"gene-product",  "Metabolite":"metabolite", "Pathway":"pathway", "Protein":"protein", "Rna":"rna" };

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start",  "Center":"middle", "Right":"end" };


  // We can use xml2json.js or JXON.js. Which is better?
  // JXON.js
     var parsedJson = self.parsedJson = {};
     pathway = JXON.build(xmlDoc.documentElement);
  try {
    xmlns = pathway["xmlns"]
  }
  catch (e) {
    console.log(e.message);
    return;
  }

  // test for whether file is GPML based on xmlns without reference to version

  var gpmlXmlnsSupported = "http://pathvisio.org/GPML/2013a";
  var gpmlXmlnsIdentifier = "/GPML/";

  // current and previous GPML xmlns values
  // "http://pathvisio.org/GPML/2013a"
  // "http://genmapp.org/GPML/2010a"
  // "http://genmapp.org/GPML/2008a"
  // "http://genmapp.org/GPML/2007"

  if ( xmlns.indexOf(gpmlXmlnsIdentifier) !== -1 ) {

    // test for whether the GPML file version matches the current version supported by pathvisio.js

    if (xmlns != gpmlXmlnsSupported) {

      // preferably, this would call the Java RPC updater for the file to be updated.

      alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + xmlns + "). Please convert to the supported version of GPML (xmlns: " + gpmlXmlnsSupported + ").")
    }

    // Convert output from xml2json into well-formed JSON.
    // It would be better to do this in the conversion file xml2json.js.

    pathway.boardWidth = pathway.graphics.boardwidth;
    pathway.boardHeight = pathway.graphics.boardheight;
    delete pathway.graphics;

    // infoBox

    pathway.infoBox = pathway.infobox;
    delete pathway.infobox;

    // what should these values actually be?

    pathway.infoBox.x = pathway.infoBox.centerx;
    delete pathway.infoBox.centerx;
    pathway.infoBox.y = pathway.infoBox.centery;
    delete pathway.infoBox.centery;

    // BiopaxRefs

    try {
      pathway.biopaxRefs = convertToArray( pathway.biopaxref );
      delete pathway.biopaxref;

      pathway.biopaxRefs.forEach(function(element, index, array) {
        // modify data
      });
    }
    catch (e) {
      console.log("No BiopaxRefs found or error: " + e);
    }

    // Comments 

    try {
      pathway.comments = convertToArray( pathway.comment );
      delete pathway.comment;

      pathway.comments.forEach(function(element, index, array) {

        // modify data

      });
    }
    catch (e) {
      console.log("No Comments found or error: " + e);
    }

    // LabelableElements
   
    pathway.labelableElements = [];

    function parseLabelableElement(element, index, array, elementType) {
        element.graphId = element.graphid;
        delete element.graphid;

        if (element.hasOwnProperty('comment')) {
          element.comments = convertToArray( element.comment );
          delete element.comment;
        };

        element.x = parseFloat(element.graphics.centerx) - parseFloat(element.graphics.width)/2;
        element.x = Math.round( element.x * 100 ) / 100;

        element.y = parseFloat(element.graphics.centery) - parseFloat(element.graphics.height)/2;
        element.y = Math.round( element.y * 100 ) / 100;

        element.width = parseFloat(element.graphics.width);
        element.width = Math.round( element.width * 100 ) / 100;

        element.height = parseFloat(element.graphics.height);
        element.height = Math.round( element.height * 100 ) / 100;

        // If unspecified due to being default, should we set the styles for stroke, fill and font-name here or in CSS?
        // Currently, every default value that can be specified in the CSS is not specified in the code below.

        if (element.graphics.hasOwnProperty("fillcolor")) {
          // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
          // license: Use it if you like it
          var fill = new RGBColor(element.graphics.fillcolor);
          if (fill.ok) { 
            element.fill = fill.toHex();
          }
        };

        if (element.graphics.hasOwnProperty("color")) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) { 
            element.stroke = color.toHex();
          }
        };	

        if (element.graphics.hasOwnProperty("linethickness")) {
          element.strokeWidth = element.graphics.linethickness;
        };	

        if (element.graphics.hasOwnProperty('linestyle')) {
          element.strokeStyle = element.graphics.linestyle.toLowerCase();
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

        if (element.graphics.hasOwnProperty("rotation")) {

          // get rotation in degrees because SVG rotate attribute uses degrees
          // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

          element.rotation = element.graphics.rotation * (180 / Math.PI);
          element.rotation = Math.round( element.rotation * 100 ) / 100;
        };	

        // textLabel data

        if (element.hasOwnProperty("textlabel")) {
          var text = element.textlabel.toString().replace("&#xA;","\r\n");
          delete element.textlabel;

          element.textLabel = {};

          // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.
          var splitText = text.split(/\r\n|\r|\n/g);

          if (element.graphics.hasOwnProperty("color")) {
            // element stroke and text color appear to be the same property in the Java PathVisio code
            element.textLabel.color = element.stroke;
          };	

          if (element.graphics.hasOwnProperty("fontsize")) {
            var fontSize = element.graphics.fontsize;
          }
          else {
            var fontSize = 10;
          };

          element.textLabel.fontSize = fontSize;

          // TODO there must be a better way to pass the fontSize to the tspan when it's being created.

          splitText.forEach(function(element, index, array) {
            splitText[index] = {"text":element, "fontSize":fontSize };
          });
          element.textLabel.textArray = splitText;

          if (element.graphics.hasOwnProperty("fontname")) {
            element.textLabel.fontFamily = element.graphics.fontname;
          };

          if (element.graphics.hasOwnProperty("fontweight")) {
            element.textLabel.fontWeight = element.graphics.fontweight.toLowerCase();
          };

          if (element.graphics.hasOwnProperty("fontstyle")) {
            element.textLabel.fontStyle = element.graphics.fontstyle.toLowerCase();
          };

          if (alignToAnchorMappings.hasOwnProperty(element.graphics.align)) {
            element.textLabel.textAnchor = alignToAnchorMappings[element.graphics.align];
          };
        }

        if ((!(element.graphics.hasOwnProperty("shapetype"))) || (element.graphics.shapetype === 'Rectangle')) {
          element.symbolType = "rectangle";
        }
        else {
          element.symbolType = shapeMappings[element.graphics.shapetype];
        };	

        delete element.graphics;

        element.elementType = elementType;

        if (elementType === 'data-node') {
          if (dataNodeTypeMappings.hasOwnProperty(element.type)) {
            element.dataNodeType = dataNodeTypeMappings[element.type];
          }
          else {
            element.dataNodeType = "unknown";
          };
          delete element.type;

          if (element.hasOwnProperty('xref')) {
            element.xRef = element.xref;
            delete element.xref;
          };
        };

        pathway.labelableElements.push(element);
        delete element.graphics;
    };

    // DataNodes 

    try {
      pathway.dataNodes = convertToArray( pathway.datanode );
      delete pathway.datanode;

      pathway.dataNodes.forEach(function(element, index, array) {
        parseLabelableElement(element, index, array, 'data-node');
      });

      delete pathway.dataNodes;

    }
    catch (e) {
      console.log("No DataNodes found or error: " + e);
    }

    // Groups

    try {
      pathway.groups = convertToArray( pathway.group );
      delete pathway.group;

      pathway.groups.forEach(function(element, index, array) {

        element.graphId = element.graphid;
        delete element.graphid;

        element.groupId = element.groupid;
        delete element.groupid;

      });
    }
    catch (e) {
      console.log("No Groups found or error: " + e);
    }

    // Interactions

    try {
      pathway.interactions = convertToArray( pathway.interaction );
      delete pathway.interaction;

      pathway.interactions.forEach(function(element, index, array) {

        element.graphId = element.graphid;
        delete element.graphid;

        if (element.graphics.hasOwnProperty('color')) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) { 
            element.stroke = color.toHex();
          }
        };	

        element.strokeWidth = element.graphics.linethickness;

        if (element.graphics.hasOwnProperty('linestyle')) {
          element.strokeStyle = element.graphics.linestyle.toLowerCase();
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
        delete element.graphics.zorder;

        element.xRef = element.xref;
        delete element.xref;

        var markerStart = 'none';
        var markerEnd = 'none';

        // Points

        element.points = convertToArray( element.graphics.point );
        delete element.graphics;

        element.points.forEach(function(element, index, array) {

          element.graphRef = element.graphref;
          delete element.graphref;

          // This is probably unreliable. We need to establish a way to ensure we identify start and end markers correctly, and we should not rely on the order of elements in XML.

          if ((index === 0) && (markerMappings.hasOwnProperty(element.arrowhead))) {
              markerStart = markerMappings[element.arrowhead];
              delete element.arrowhead;
          }
          else {
            if ((index === array.length - 1) && (markerMappings.hasOwnProperty(element.arrowhead))) {
              markerEnd = markerMappings[element.arrowhead];
              delete element.arrowhead;
            }
          };
        });

        // Back to interactions

        element.markerStart = markerStart;
        element.markerEnd = markerEnd;

        delete element.graphics;

      });
    }
    catch (e) {
      console.log("No Interactions found or error: " + e);
    }

    // Labels

    try {
      pathway.labels = convertToArray( pathway.label );
      delete pathway.label;

      pathway.labels.forEach(function(element, index, array) {
        parseLabelableElement(element, index, array, 'label');
      });

      delete pathway.labels;
    }
    catch (e) {
      console.log("No Labels found or error: " + e);
    }

    // Shapes

    try {
      pathway.shapes = convertToArray( pathway.shape );
      delete pathway.shape;

      pathway.shapes.forEach(function(element, index, array) {
        parseLabelableElement(element, index, array, 'shape');
      });

      delete pathway.shapes;
    }
    catch (e) {
      console.log("No Shapes found or error: " + e);
    }

    console.log('jGPML pathway');
    console.log(pathway);

    return pathway;
  }
  else {
    alert("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
    console.log("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
    return;
  }
};

function getPathData(d) {
  var pathData = "";
  d.points.forEach(function(element, index, array) {
    if (index === 0) {
      pathData = "M " + element.x + " " + element.y; 
    }
    else {
      pathData += " L " + element.x + " " + element.y; 
    };
    return pathData;
  });
  return pathData;
};

