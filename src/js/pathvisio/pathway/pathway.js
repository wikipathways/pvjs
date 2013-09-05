pathvisio.pathway = function(){
  function gpml2json(gpml){

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    self.gpml = gpml;
    console.log('GPML')
    console.log(gpml)

    // We can use xml2json.js or JXON.js. Which is better?
    // JXON.js
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

      // test for whether the GPML file version matches the current version supported by pathvisio.js

      if (xmlns != gpmlXmlnsSupported) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + xmlns + "). Please convert to the supported version of GPML (xmlns: " + gpmlXmlnsSupported + ").")
      };

      // Convert output from xml2json.js into jsonGpml (well-formed JSON with all implied elements from gpml explicitly filled in).

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
        if (pathway.hasOwnProperty('biopaxref')) {
          pathway.biopaxRefs = pathvisio.helpers.convertToArray( pathway.biopaxRef );
          delete pathway.biopaxRef;

          //biopaxRefs.forEach(function(element, index, array) {
            // do something
          //});
        }
        else {
          console.log("No element(s) named 'biopaxref' for the element 'pathway' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting biopaxRef to json: " + e.message);
      };

      // Biopax 

      try {
        if (pathway.hasOwnProperty('biopax')) {
          //do something
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

  function get(url, mimeType, callback) {
    if (!url || !mimeType) {

      // TODO throw a proper error here

      var error = null;
      if (!url) {
        error += 'Error: URL not specified.';
      };
      if (!mimeType) {
        error += 'Error: URL not specified.';
      };
      return console.warn(error);
    }
    else {
      // be sure server has set gpml mime type to application/gpml+xml or application/gpml+xml

      d3.xml(url, "application/xml", function(gpmlDoc) {

        /* if from webservice, we would have used this code, but now, we've decided that the proper format
         * for the response (gpmlDoc) is GPML as an XML document. If the response would be anything else,
         * such as the XML document that the webservice gives as a response, the parsing and manipulation must
         * happen before calling get().

         var sGpml = gpmlDoc.getElementsByTagNameNS("http://www.wikipathways.org/webservice", "gpml")[0].textContent;
         var oParser = new DOMParser();
         var oDOM = oParser.parseFromString(sGpml, "text/xml");
         var gpml = oDOM.documentElement;

        */

        // if the response is a valid GPML document (ie, not from webservice)

        var oSerializer = new XMLSerializer();
        var sGpml = self.sGpml = oSerializer.serializeToString(gpmlDoc);
        var gpml = gpmlDoc.documentElement;
        console.log('GPML');
        console.log(gpml);

        pathvisio.pathway.gpml2json(gpml);
        var sJson = self.sJson = JSON.stringify(pathvisio.data.pathways[pathvisio.data.current.svgSelector], undefined, 2);

        callback(pathvisio.data.pathways[pathvisio.data.current.svgSelector], sGpml, sJson);
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
        var index = 0;
        var gpmlId = null;
        do {
          gpmlId = pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs[index].gpmlId;
          index += 1;
        } while (gpmlId !== d && index < pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs.length);
        return index});
    };

    var symbolsAvailable = self.symbolsAvailable = pathvisio.data.current.svg.selectAll('symbol');

    var markersAvailable = markersAvailable = pathvisio.data.current.svg.selectAll('marker');

    pathvisio.pathway.group.drawAll();

    pathvisio.pathway.edge.drawAll();

    pathvisio.pathway.labelableElement.drawAll();

    pathvisio.pathway.infoBox.draw();
  };

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
    // Use this code if you want to get the SVG using d3.xml
    pathvisio.data.current.svg = d3.select("#pathway-container").select(function() {
    return this.getSVGDocument().documentElement;
    });
    */

    if (!url) {
      return console.warn('Error: No url specified for GPML or JSON data.');
    };

    if (!mimeType) {
      mimeType = 'application/xml';
    };

    get(url, mimeType, function(data, sGpml, sJson) {
      draw(data);
    });
  };

  return {
    draw:draw,
    load:load,
    get:get,
    gpml2json:gpml2json
  }
}();
