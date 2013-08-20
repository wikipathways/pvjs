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

      // Convert output from jxon.js into jsonGpml (well-formed JSON with all implied elements from xmlGpml explicitly filled in).

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

      // These values are a legacy from GenMAPP. They are always forced to be equal to 0 in PathVisio (Java) so as to place the infobox in the upper lefthand corner.

      pathway.infoBox.x = 0;
      delete pathway.infoBox.centerx;
      pathway.infoBox.y = 0;
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

      // Groups

      try {
        if (pathway.hasOwnProperty('group')) {
          pathway.groups = convertToArray( pathway.group );
          delete pathway.group;

          pathway.groups.forEach(function(element, index, array) {

            element.graphId = element.graphid;
            delete element.graphid;

            element.groupId = element.groupid;
            delete element.groupid;

            if (element.hasOwnProperty('style')) {
              element.style = element.style.toLowerCase();
            }
            else {
              element.style = 'none';
            };

          });
        }
        else {
          console.log("No element(s) named 'datanode' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting group to json: " + e.message);
        delete pathway.groups;
      };

      // DataNodes 

      // GPML to jGPML shape name mappings: { "OldName":"new-name" }
      // replace spaces with dashes
      // Add dashes before every capital letter except any capital letters at the beginning of the string
      // Replace spaces with dashes
      // Replace double dashes with single dashes
      // replace capitals letters with lowercase. 

      var dataNodeTypeMappings = {
        "GeneProduct":"gene-product",
        "Metabolite":"metabolite",
        "Pathway":"pathway",
        "Protein":"protein",
        "Rna":"rna"
      };

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

      try {
        if (pathway.hasOwnProperty('labelableElements')) {
          pathway.labelableElements = pathvisio.xmlGpml2jsonGpml.labelableElements.convert(pathway.labelableElements);
        }
        else {
          console.log("No element(s) named 'labelableElements' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting labelableElements to json: " + e.message);
        delete pathway.labelableElements;
      };

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














