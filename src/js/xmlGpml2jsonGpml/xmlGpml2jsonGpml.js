// for doing this in Java, we could look at 
// https://code.google.com/p/json-io/

pathvisio.xmlGpml2jsonGpml = function(){

  var xml_special_to_escaped_one_map = {
    '&': '&amp;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;'
  };

  var escaped_one_to_xml_special_map = {
    '&amp;': '&',
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>'
  };

  function encodeXml(string) {
    return string.replace(/([\&"<>])/g, function(str, item) {
      return xml_special_to_escaped_one_map[item];
    });
  };

  function decodeXml(string) {
    return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g, function(str, item) {
      return escaped_one_to_xml_special_map[item];
    });
  };

  function getJsonGpml(xmlGpmlUrl, callback) {
    if (xmlGpmlUrl === undefined || !(xmlGpmlUrl) || xmlGpmlUrl === "") {

      //var xmlGpmlUrl = "../../samples/gpml/error.gpml";
      //d3.xml(xmlGpmlUrl, "application/gpml+xml", function(error, gpml) {

    }
    else {
      d3.xml(xmlGpmlUrl, "application/gpml+xml", function(xmlGpmlDoc) {
        // be sure server has set gpml mime type to application/gpml+xml

        var oSerializer = new XMLSerializer();
        var sGpml = oSerializer.serializeToString(xmlGpmlDoc);

        var xmlGpml = xmlGpmlDoc.documentElement;

        var pathway = convert(xmlGpml);

        var sJson = self.sJson = JSON.stringify(pathway, undefined, 2);

        callback(sGpml, sJson);
      });
    };
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

  function convert(xmlGpml){
    self.xmlGpml = xmlGpml;

    // GPML to jGPML mappings: { 'OldName':'new-name' }
    // replace spaces with dashes
    // Add dashes before every capital letter except any capital letters at the beginning of the string
    // Replace spaces with dashes
    // Replace double dashes with single dashes
    // replace capitals letters with lowercase. 

    // GPML to jGPML shape name mappings: { "OldName":"new-name" }

    var shapeMappings = {
      "Arc" : "arc",
      "Brace" : "brace",
      "Cell" : "cell",
      "Endoplasmic Reticulum" : "endoplasmic-reticulum",
      "Extracellular region" : "extracellular-region",
      "Golgi Apparatus" : "golgi-apparatus",
      "Hexagon" : "hexagon",
      "mim-degradation" : "mim-degradation",
      "Mitochondria" : "mitochondria",
      "Nucleus" : "nucleus",
      "Organelle" : "organelle",
      "Oval" : "oval",
      "Pentagon" : "pentagon",
      "Rectangle" : "rectangle",
      "RoundedRectangle" : "rounded-rectangle",
      "Sarcoplasmic Reticulum" : "sarcoplasmic-reticulum",
      "Triangle" : "triangle",
      "Vesicle" : "vesicle"
    }; 

    var dataNodeTypeMappings = {
      "GeneProduct":"gene-product",
      "Metabolite":"metabolite",
      "Pathway":"pathway",
      "Protein":"protein",
      "Rna":"rna"
    };

    // TODO What happens if we have right to left flowing text?

    var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

    // We can use xml2json.js or JXON.js. Which is better?
    // JXON.js

    pathway = JXON.build(xmlGpml);
    try {
      xmlns = pathway["xmlns"]
    }
    catch (e) {
      console.log(e.message);
      return;
    };

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
      };

      // Convert output from xml2json into well-formed JSON.
      // It would be better to do this in the conversion file xml2json.js.

      pathway.boardWidth = pathway.graphics.boardwidth;
      pathway.boardHeight = pathway.graphics.boardheight;
      delete pathway.graphics;

      if (pathway.hasOwnProperty('last-modified')) {
        pathway.lastModified = pathway['last-modified'];
        delete pathway['last-modified'];
      };

      // infoBox

      pathway.infoBox = pathway.infobox;
      delete pathway.infobox;

      // what should these values actually be?

      pathway.infoBox.x = pathway.infoBox.centerx;
      delete pathway.infoBox.centerx;
      pathway.infoBox.y = pathway.infoBox.centery;
      delete pathway.infoBox.centery;

      // Biopax

      // For now, we don't need the biopax in json format for displaying a pathway.
      // This will require further research if we decide to add it. It doesn't work
      // right now.
      // We should look at available standardized implementations of json Biopax.

      try {
        delete pathway.biopax;
      }
      catch (e) {
        console.log("Biopax error: " + e.message);
      };

      // BiopaxRefs

      // We should look at available standardized implementations of json Biopax.

      try {
        if (pathway.hasOwnProperty('biopaxref')) {
          pathway.biopaxRefs = convertToArray( pathway.biopaxref );
          delete pathway.biopaxref;
        }
        else {
          console.log("No element(s) named 'biopaxref' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting biopaxref to json: " + e.message);
        delete pathway.biopaxRefs;
      };

      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = convertToArray( pathway.comment );
          delete pathway.comment;

          pathway.comments.forEach(function(element, index, array) {
            // modify data
          });
        }
        else {
          console.log("No element(s) named 'comment' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting comment to json: " + e.message);
        delete pathway.comments;
      };

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalline')) {
          graphicalLines = convertToArray( pathway.graphicalline );
          delete pathway.graphicalline;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          };

          graphicalLines.forEach(function(element, index, array) {
            element.edgeType = 'graphical-line';
            pathway.edges.push(element);
          });
        }
        else {
          console.log("No element(s) named 'graphicalline' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting graphicalline to json: " + e.message);
        delete pathway.graphicalline;
      };

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = convertToArray( pathway.interaction );
          delete pathway.interaction;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          };

          interactions.forEach(function(element, index, array) {
            element.edgeType = 'interaction';
            pathway.edges.push(element);
          });

          self.interactions = interactions;
          self.edges = pathway.edges;
        }
        else {
          console.log("No element(s) named 'interaction' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting interaction to json: " + e.message);
        delete pathway.interaction;
      };

      // Edges

      try {
        if (pathway.hasOwnProperty('edges')) {
          pathway.edges = pathvisio.xmlGpml2jsonGpml.edges.convert(pathway.edges);
        }
        else {
          console.log("No element(s) named 'edges' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting edges to json: " + e.message);
        delete pathway.edges;
      };

      // DataNodes 

      try {
        if (pathway.hasOwnProperty('datanode')) {
          var dataNodes = convertToArray( pathway.datanode );
          delete pathway.datanode;

          dataNodes.forEach(function(element, index, array) {

            element.elementType = 'data-node';

            if (dataNodeTypeMappings.hasOwnProperty(element.type)) {
              element.dataNodeType = dataNodeTypeMappings[element.type];
            }
            else {
              element.dataNodeType = 'unknown';
            };
            delete element.type;

            if (element.hasOwnProperty('xref')) {
              element.xRef = element.xref;
              delete element.xref;
            };
          });

          if (pathway.hasOwnProperty('labelableElements')) {
            pathway.labelableElements = pathway.labelableElements.concat(dataNodes);
          }
          else {
            pathway.labelableElements = dataNodes;
          };

        }
        else {
          console.log("No element(s) named 'datanode' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting datanode to json: " + e.message);
        delete pathway.datanode;
      };

      // Labels

      try {
        if (pathway.hasOwnProperty('label')) {
          var labels = self.labels = convertToArray( pathway.label );
          delete pathway.label;

          labels.forEach(function(element, index, array) {
            element.elementType = 'label';
          });

          if (pathway.hasOwnProperty('labelableElements')) {
            pathway.labelableElements = pathway.labelableElements.concat(labels);
          }
          else {
            pathway.labelableElements = labels;
          };
        }
        else {
          console.log("No element(s) named 'label' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting label to json: " + e.message);
        delete pathway.label;
      };

      // Shapes

      try {
        if (pathway.hasOwnProperty('shape')) {
          var shapes = convertToArray( pathway.shape );
          delete pathway.shape;

          shapes.forEach(function(element, index, array) {
            element.elementType = 'shape';
          });

          if (pathway.hasOwnProperty('labelableElements')) {
            pathway.labelableElements = pathway.labelableElements.concat(shapes);
          }
          else {
            pathway.labelableElements = shapes;
          };
        }
        else {
          console.log("No element(s) named 'shape' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting shape to json: " + e.message);
        delete pathway.shape;
      };

      // LabelableElements

      pathway.labelableElements.forEach(function(element, index, array) {
        element.graphId = element.graphid;
        delete element.graphid;

        if (element.hasOwnProperty('groupref')) {
          element.groupRef = element.groupref;
          delete element.groupref;
        };

        if (element.hasOwnProperty('comment')) {
          element.comments = convertToArray( element.comment );
          delete element.comment;
        };

        if (element.hasOwnProperty('xref')) {
          if ((element.xref.database === null) && (element.xref.id === null)) {
            delete element.xref;
          };
        };

        // Be warned that support for zIndex in SVG is spotty. It's best to rely on ordering in the DOM as well.

        if (element.graphics.hasOwnProperty("zorder")) {
          element.zIndex = parseFloat(element.graphics.zorder);
        };

        element.x = parseFloat(element.graphics.centerx) - parseFloat(element.graphics.width)/2;
        //element.x = Math.round( element.x * 100 ) / 100;

        element.y = parseFloat(element.graphics.centery) - parseFloat(element.graphics.height)/2;
        //element.y = Math.round( element.y * 100 ) / 100;

        element.width = parseFloat(element.graphics.width);
        //element.width = Math.round( element.width * 100 ) / 100;

        element.height = parseFloat(element.graphics.height);
        //element.height = Math.round( element.height * 100 ) / 100;

        if (element.graphics.hasOwnProperty("color")) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) { 
            element.stroke = color.toHex();
          }
          else {
            console.warn('Invalid Color encountered. Setting Color to black.');
            element.fill = "#000000";
          };
        };

        if ((!(element.graphics.hasOwnProperty("shapetype")))) {
          if (element.elementType === 'data-node') {
            element.symbolType = "rectangle";
          }
          else {
            element.symbolType = "none";
          };
        }
        else {
          element.symbolType = shapeMappings[element.graphics.shapetype];
        };	

        if (element.graphics.hasOwnProperty("fillcolor")) {

          // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
          // license: Use it if you like it

          element.graphics.fillcolor = element.graphics.fillcolor.toLowerCase();

          if (element.graphics.fillcolor === 'transparent') {
            element.fillOpacity = 0;
          }
          else {
            var fill = new RGBColor(element.graphics.fillcolor);
            if (fill.ok) { 
              element.fill = fill.toHex();
            }
            else {
              console.warn('Invalid FillColor encountered. Setting FillColor to gray.');
              element.fill = "#999999";
            };

            if (element.symbolType !== 'none') {
              element.fillOpacity = 1;
            };
          };
        };

        if (element.graphics.hasOwnProperty("linethickness")) {
          element.strokeWidth = element.graphics.linethickness;
        };	

        if (element.graphics.hasOwnProperty('linestyle')) {
          element.strokeStyle = element.graphics.linestyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          };
          delete element.graphics.linestyle;
        };	

        if (element.hasOwnProperty('attribute')) {
          element.attributes = convertToArray( element.attribute );
          delete element.attribute;
          element.attributes.forEach(function(el, index, array) {
            if ((el.key === "org.pathvisio.DoubleLineProperty") && (el.value === "Double")) {
              el.strokeStyle = 'double';
            }
            else {
              if ((el.key === "org.pathvisio.CellularComponentProperty") && (el.value !== "None")) {
                element.cellularComponent = el.value;
              };
            };
          });
          delete element.attributes;
        };	

        if (element.graphics.hasOwnProperty("rotation")) {

          // get rotation in degrees because SVG rotate attribute uses degrees
          // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

          element.rotation = element.graphics.rotation * (180 / Math.PI);
          //element.rotation = Math.round( element.rotation * 100 ) / 100;
        };	

        // textLabel data

        if (element.hasOwnProperty("textlabel")) {
          if (element.textlabel === null) {
            delete element.textlabel;
          }
          else {
            var text = element.textlabel.toString().replace("&#xA;","\r\n");
            delete element.textlabel;

            element.textLabel = {};

            element.textLabel.text = text;

            if (element.hasOwnProperty('groupref')) {
              element.groupRef = element.groupref;
              delete element.groupref;
            };

            if (element.hasOwnProperty("stroke")) {

              // element stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

              element.textLabel.fill = element.stroke;
            };	

            // default fontsize is already specified in the CSS of pathway-template.svg, but I need the font size
            // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.

            if (element.graphics.hasOwnProperty("fontsize")) {
              var fontSize = element.graphics.fontsize;
            }
            else {
              var fontSize = 10;
            };
            element.textLabel.fontSize = fontSize;

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
            }
            else {
              element.textLabel.textAnchor = 'middle';
            };

            if (element.graphics.hasOwnProperty("valign")) {
              element.textLabel.vAlign = element.graphics.valign.toLowerCase();
            }
            else {
              element.textLabel.vAlign = 'top';
            };
          };
        };

        delete element.graphics;
      });

      pathway.labelableElements.sort(function(a,b) {return a.zIndex - b.zIndex});

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

  return {
    convert:convert,
    convertToArray:convertToArray,
    getJsonGpml:getJsonGpml
  }
}();














