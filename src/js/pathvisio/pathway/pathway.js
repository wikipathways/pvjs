pathvisio.pathway = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON

  function gpml2json(gpml){

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    self.gpml = gpml;
    console.log('GPML')
    console.log(gpml)

    var pathway = pathvisio.data.pathways[pathvisio.data.current.svgSelector];
    pathway = self.pathway = xml.xmlToJSON(gpml, true).pathway;
    
    console.log('raw json from xml2json');
    console.log(xml.xmlToJSON(gpml, true).pathway);

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

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisio.js). As of this writing, the latest version is 2013a.

      if (xmlns != gpmlXmlnsSupported) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + xmlns + "). Please convert to the supported version of GPML (xmlns: " + gpmlXmlnsSupported + ").")
      };

      pathway.boardWidth = pathway.graphics.boardWidth;
      pathway.boardHeight = pathway.graphics.boardHeight;

      // infoBox
      // These values are a legacy from GenMAPP. They are always forced to be equal to 0 in PathVisio (Java) so as to place the infobox in the upper lefthand corner.

      pathway.infoBox.x = 0;
      delete pathway.infoBox.centerX;
      pathway.infoBox.y = 0;
      delete pathway.infoBox.centerY;

      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = pathvisio.helpers.convertToArray( pathway.comment );
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
      };

      // Groups

      try {
        if (pathway.hasOwnProperty('group')) {
          pathway.groups = pathvisio.helpers.convertToArray( pathway.group );
          delete pathway.group;

          pathway.groups.forEach(function(element, index, array) {
            if (element.hasOwnProperty('style')) {
              element.style = element.style.toLowerCase();
            }
            else {
              element.style = 'none';
            };

          });
        }
        else {
          console.log("No element(s) named 'group' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting group to json: " + e.message);
      };

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalLine')) {
          graphicalLines = pathvisio.helpers.convertToArray( pathway.graphicalLine );
          delete pathway.graphicalLine;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          };

          graphicalLines.forEach(function(element, index, array) {
            element.edgeType = 'graphical-line';
            pathway.edges.push(element);
          });
        }
        else {
          console.log("No element(s) named 'graphicalLine' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting graphicalLine to json: " + e.message);
      };

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = pathvisio.helpers.convertToArray( pathway.interaction );
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
      };

      // Edges

      try {
        if (pathway.hasOwnProperty('edges')) {
          pathway.edges = pathvisio.pathway.edge.gpml2json(pathway.edges);
        }
        else {
          console.log("No element(s) named 'edges' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting edges to json: " + e.message);
      };

      // DataNodes 

      // GPML to JSON shape name mappings: { "OldName":"new-name" }
      // replace spaces with dashes
      // Add dashes before every capital letter except any capital letters at the beginning of the string
      // Replace double dashes with single dashes
      // replace capitals letters with lowercase. 
      // TODO use caseConverter.paramCase() instead of this mapping. Eventually, implement and enforce conventions for GPML data node type names

      var dataNodeTypeMappings = {
        "GeneProduct":"gene-product",
        "Metabolite":"metabolite",
        "Pathway":"pathway",
        "Protein":"protein",
        "Rna":"rna"
      };

      try {
        if (pathway.hasOwnProperty('dataNode')) {
          var dataNodes = pathvisio.helpers.convertToArray( pathway.dataNode );
          delete pathway.dataNode;

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
              if ((!element.xref.database) && (!element.xref.id)) {
                delete element.xref;
              }
              else {
                element.xref = element.xRef;
                delete element.xref;
              };
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
          console.log("No element(s) named 'dataNode' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting dataNode to json: " + e.message);
      };

      // Labels

      try {
        if (pathway.hasOwnProperty('label')) {
          var labels = self.labels = pathvisio.helpers.convertToArray( pathway.label );
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
      };

      // Shapes

      try {
        if (pathway.hasOwnProperty('shape')) {
          var shapes = pathvisio.helpers.convertToArray( pathway.shape );
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
      };

      // LabelableElements

      try {
        if (pathway.hasOwnProperty('labelableElements')) {
          pathway.labelableElements = pathvisio.pathway.labelableElement.gpml2json(pathway.labelableElements);
        }
        else {
          console.log("No element(s) named 'labelableElements' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting labelableElements to json: " + e.message);
      };

      // BiopaxRefs 

      try {
        if (pathway.hasOwnProperty('biopaxRef')) {
          pathway.biopaxRefs = pathvisio.helpers.convertToArray( pathway.biopaxRef );
          delete pathway.biopaxRef;

          //biopaxRefs.forEach(function(element, index, array) {
            // do something
          //});
        }
        else {
          console.log("No element(s) named 'biopaxRef' for the element 'pathway' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting biopaxRef to json: " + e.message);
      };

      // Biopax 

      try {
        if (pathway.hasOwnProperty('biopax')) {
          pathway.biopax.bpPublicationXrefs = pathvisio.helpers.convertToArray( pathway.biopax.bpPublicationXref );
          delete pathway.biopax.bpPublicationXref;
        }
        else {
          console.log("No element(s) named 'biopax' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting biopax to json: " + e.message);
      };

      console.log('JSON:');
      console.log(pathway);
      console.log('pathvisio.data.pathways[pathvisio.data.current.svgSelector]');
      console.log(pathvisio.data.pathways[pathvisio.data.current.svgSelector]);

      delete pathway.graphics;
      return pathvisio.data.pathways[pathvisio.data.current.svgSelector] = pathway;
    }
    else {
      alert("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
      console.log("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
      return;
    }
  };

  // get GPML (pathway XML) from WikiPathways (by ID) or a URL (could be a local file or any other accessible GPML source),
  // convert to formatted JSON and return the JSON to the function that called getJson()

  function getJson(url, mimeType, callback) {
    if (!url) {

      // TODO throw a proper error here

      var error = 'Error: URL not specified.';
      return console.warn(error);
    }
    else {

      // be sure server has set gpml mime type to application/xml or application/gpml+xml

      if (!mimeType) {
        mimeType = 'application/xml';
      };

      // I would prefer to use d3.xml for the http request in order to not depend on jQuery,
      // but d3.xml doesn't seem to work with IE8. TODO remove dependency on jQuery

      $.get(url, function(data) {
        callback(pathvisio.pathway.gpml2json(data));
      });
    };
  };

  function draw(data){
    if (!data) {
      return console.warn('Error: No data entered as input.');
    };

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
      d.x=d3.event.x;
      d.y=d3.event.y;
      d3.select(this)
      .attr("x", d3.event.x)
      .attr("y", d3.event.y);
    };	

    pathvisio.data.current.svg.attr('width', data.boardWidth);
    pathvisio.data.current.svg.attr('height', data.boardHeight);

    if (!!pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopaxRefs) {
      var pathwayPublicationXrefs = pathvisio.data.current.svg.selectAll(".pathway-publication-xref-text")	
      .data(pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopaxRefs)
      .enter()
      .append("text")
      .attr("id", function (d) { return 'pathway-publication-xref-text-' + d; })
      .attr("x", 0)
      .attr("y", 0)
      .attr('transform', function(d,i) { return 'translate(' + (200 + i*12) + ' ' + 12 + ')'; })
      .attr("class", 'pathway-publication-xref-text')
      .attr("style", "")
      .text(function (d) {

        // d is an array of biopaxRefs. There are several IDs for biopaxRefs, but rdfId (rdf:id) is the one used for
        // GPML to link pathway elements with biopaxRefs.
        // TODO I set rdfId to null here because I think not doing so could result in errors if the rdfId value for
        // a previous instance of biopaxRefs had a value that was used when evaluating a later instance

        var index = 0;
        var rdfId = null;
        do {
          rdfId = pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.bpPublicationXrefs[index].rdfId;
          index += 1;
        } while (rdfId !== d.Text && index < pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.bpPublicationXrefs.length);
        return index});
    };

    var symbolsAvailable = self.symbolsAvailable = pathvisio.data.current.svg.selectAll('symbol');

    var markersAvailable = markersAvailable = pathvisio.data.current.svg.selectAll('marker');

    pathvisio.pathway.group.drawAll();

    pathvisio.pathway.edge.drawAll();

    pathvisio.pathway.labelableElement.drawAll();

    pathvisio.pathway.infoBox.draw();
  };

  // get JSON and draw SVG representation of pathway

  function load(svgSelector, url, mimeType){
    if (!!svgSelector) {
      pathvisio.data.current.svgSelector = svgSelector;
      pathvisio.data.current.svg = d3.select(svgSelector);
      var svgCount = pathvisio.data.current.svg.length;
      if (svgCount === 1) {
        console.log('Successfully loaded SVG pathway template.');
      }
      else {
        return console.warn('Error: ' + svgCount + ' SVG template(s) returned with selector "' + svgSelector + '". Please redefined selector so only 1 result is returned.');
      };
    }
    else {
      return console.warn('Error: No SVG template selector specified.');
    };

    /*
    // Use this code if you want to get the SVG using d3.xml.
    // I think this would be used if the SVG were included in the document as an embedded object instead of included directly in the DOM.
    pathvisio.data.current.svg = d3.select("#pathway-container").select(function() {
      return this.getSVGDocument().documentElement;
    });
    */

    if (!url) {
      return console.warn('Error: No url specified for GPML or JSON data.');
    };

    getJson(url, null, function(data, sGpml, sJson) {
      draw(data);
    });
  };

  return {
    draw:draw,
    load:load,
    getJson:getJson,
    gpml2json:gpml2json
  }
}();
