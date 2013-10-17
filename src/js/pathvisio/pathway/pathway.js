pathvisio.pathway = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON
  
  var svg = null;
  var pathway = null;
  var symbolsAvailable = null;

  function gpml2json(gpml, callback){

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);
    
    //var pathway = pathvisio.data.pathways[url];
    pathway = xml.xmlToJSON(gpml, true).pathway;
    
    console.log('raw json from xml2json');
    console.log(xml.xmlToJSON(gpml, true).pathway);

    var xmlns = null;
    try {
      xmlns = pathway.xmlns;
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

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisio.js). As of this writing, the latest version is 2013a.

      if (xmlns != gpmlXmlnsSupported) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + xmlns + "). Please convert to the supported version of GPML (xmlns: " + gpmlXmlnsSupported + ").");
      }

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
      }

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
            }

          });
        }
        else {
          console.log("No element(s) named 'group' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting group to json: " + e.message);
      }

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalLine')) {
          var graphicalLines = pathvisio.helpers.convertToArray( pathway.graphicalLine );
          delete pathway.graphicalLine;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          graphicalLines.forEach(function(element, index, array) {
            element.edgeType = 'graphical-line';
            pathway.edges.push(element);
          });
        }
        else {
          console.log("No element(s) named 'graphicalLine' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting graphicalLine to json: " + e.message);
      }

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = pathvisio.helpers.convertToArray( pathway.interaction );
          delete pathway.interaction;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          interactions.forEach(function(element, index, array) {
            element.edgeType = 'interaction';
            pathway.edges.push(element);
          });

          interactions;
          pathway.edges;
        }
        else {
          console.log("No element(s) named 'interaction' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting interaction to json: " + e.message);
      }

      // Edges

      try {
        if (pathway.hasOwnProperty('edges')) {
          pathway.edges = pathvisio.pathway.edge.gpml2json(pathway.edges);
        }
        else {
          console.log("No element(s) named 'edges' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting edges to json: " + e.message);
      }

      // DataNodes 

      try {
        if (pathway.hasOwnProperty('dataNode')) {
          var dataNodes = pathvisio.helpers.convertToArray( pathway.dataNode );
          delete pathway.dataNode;

          dataNodes.forEach(function(element, index, array) {

            element.elementType = 'data-node';

            element.dataNodeType = caseConverter.paramCase(element.type);
            delete element.type;

            if (element.hasOwnProperty('xref')) {
              if ((!element.xref.database) && (!element.xref.iD)) {
                delete element.xref;
              }
              else {
                element.xRef = element.xref;
                delete element.xref;

                element.xRef.id = element.xRef.iD;
                delete element.xRef.iD;
              }
            }
          });

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(dataNodes);
          }
          else {
            pathway.nodes = dataNodes;
          }

        }
        else {
          console.log("No element(s) named 'dataNode' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting dataNode to json: " + e.message);
      }

      // Labels

      try {
        if (pathway.hasOwnProperty('label')) {
          var labels = pathvisio.helpers.convertToArray( pathway.label );
          delete pathway.label;

          labels.forEach(function(element, index, array) {
            element.elementType = 'label';
          });

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(labels);
          }
          else {
            pathway.nodes = labels;
          }
        }
        else {
          console.log("No element(s) named 'label' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting label to json: " + e.message);
      }

      // Shapes

      try {
        if (pathway.hasOwnProperty('shape')) {
          var shapes = pathvisio.helpers.convertToArray( pathway.shape );
          delete pathway.shape;

          shapes.forEach(function(element, index, array) {
            element.elementType = 'shape';
          });

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(shapes);
          }
          else {
            pathway.nodes = shapes;
          }
        }
        else {
          console.log("No element(s) named 'shape' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting shape to json: " + e.message);
      }

      // Nodes

      try {
        if (pathway.hasOwnProperty('nodes')) {
          pathway.nodes = pathvisio.pathway.node.gpml2json(pathway.nodes);
        }
        else {
          console.log("No element(s) named 'nodes' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting nodes to json: " + e.message);
      }

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
        }
      }
      catch (e) {
        console.log("Error converting biopaxRef to json: " + e.message);
      }

      // Biopax 

      try {
        if (pathway.hasOwnProperty('biopax')) {
          pathway.biopax.bpPublicationXrefs = pathvisio.helpers.convertToArray( pathway.biopax.bpPublicationXref );
          delete pathway.biopax.bpPublicationXref;
        }
        else {
          console.log("No element(s) named 'biopax' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting biopax to json: " + e.message);
      }

      console.log('JSON:');
      console.log(pathway);
      console.log('pathway');
      console.log(pathway);

      delete pathway.graphics;
      //pathvisio.data.pathways.push(pathway);
      callback(pathway);
    }
    else {
      alert("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.");
      console.log("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.");
      return;
    }
  }

  // get GPML (pathway XML) from WikiPathways (by ID) or a URL (could be a local file or any other accessible GPML source),
  // convert to formatted JSON and return the JSON to the function that called getJson()

  function getJson(url, callback) {
    if (!url) {

      // TODO throw a proper error here

      var error = 'Error: URL not specified.';
      console.warn(error);
      return error;
    }
    else {

      // I would prefer to use d3.xml for the http request in order to not depend on jQuery,
      // but d3.xml doesn't seem to work with IE8. TODO remove dependency on jQuery

      // be sure server has set gpml mime type to application/xml or application/gpml+xml

      $.get(url, 'application/xml', function(gpml) {
        pathvisio.pathway.gpml2json(gpml, function(json) {
          callback(json);
        });
      });
    }
  }

  function highlightByLabel(nodeLabel) {
    console.log('nodeLabel');
    console.log(nodeLabel);
    svg.selectAll('g.nodes-container')
    .attr('style', '');
    var dataNodes = pathway.nodes.filter(function(element) {return element.elementType === 'data-node';});
    var dataNodesWithText = dataNodes.filter(function(element) {return (!!element.textLabel);});
    var selectedNodes = dataNodesWithText.filter(function(element) {return element.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      console.log('node');
      console.log(node);

      var nodeDomElement = svg.select('#nodes-container-' + node.graphId);
      nodeDomElement.attr('style', 'fill:yellow');
      console.log('nodeDomElement');
      console.log(nodeDomElement);
    });
  }

  function draw(svg, pathway, callback){
    if (!pathway) {
      console.warn('Error: No data entered as input.');
      return 'Error';
    }

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
      d.x=d3.event.x;
      d.y=d3.event.y;
      d3.select(this)
      .attr("x", d3.event.x)
      .attr("y", d3.event.y);
    }

    svg.attr('width', pathway.boardWidth);
    svg.attr('height', pathway.boardHeight);

    if (!!pathway.biopaxRefs) {
      var pathwayPublicationXrefs = svg.select('#viewport').selectAll(".pathway-publication-xref-text")
      .data(pathway.biopaxRefs)
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
          rdfId = pathway.biopax.bpPublicationXrefs[index].rdfId;
          index += 1;
        } while (rdfId !== d.Text && index < pathway.biopax.bpPublicationXrefs.length);
        return index;});
    }

    if (pathway.hasOwnProperty('groups')) {
      pathvisio.pathway.group.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('edges')) {
      pathvisio.pathway.edge.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('nodes')) {
      pathvisio.pathway.node.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('infoBox')) {
      pathvisio.pathway.infoBox.draw(svg, pathway);
    }

    callback();

    /*
    window.setTimeout(function() {
      window.root = document.documentElement.getElementsByTagName("svg")[0];
      root.addEventListener('click', function () {
        enableZoom = 1;
      });
      setupHandlers(root);
    }, 1000);
    //*/
  }

  function appendCustomShape(customShape, callback) {
    img = document.createElement('img');
    img.src = customShape.url;
    img.onload = function() {
      def = svg.select('defs').select('#' + customShape.id);
      if (!def[0][0]) {
        def = d3.select('svg').select('defs').append('symbol').attr('id', customShape.id)
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        .attr('preserveAspectRatio', 'none');
      }
      else {
        def.selectAll('*').remove();
      }
      dimensions = def.attr('viewBox').split(' ');
      def.append('image').attr('xlink:xlink:href', customShape.url).attr('x', dimensions[0]).attr('y', dimensions[1]).attr('width', dimensions[2]).attr('height', dimensions[3]);
      callback(null);
    }
  }

  function loadCustomShapes(args, callback) {
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    if (!!args.customShapes) {
      async.each(args.customShapes, appendCustomShape, function(err){
          // if any of the saves produced an error, err would equal that error
        callback(null);
      });
    }
  }

  function loadPartials(args, callback) {
    async.series([
      function(callbackInside){
        console.log('2');
        args.containerElement.html(pathvisioNS['tmp/pathvisio-js.html']);
        svg = args.containerElement.select('#pathway-image');
        callbackInside(null);
      },
      function(callbackInside) {
        console.log('3');
        loadCustomShapes(args, function() {
          callbackInside(null);
        })
      },
      function(callbackInside) {
        console.log('4');
        if (!!args.cssUrl) {
          d3.text(args.cssUrl, 'text/css', function(data) {
            var defs = svg.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callbackInside(null);
          })
        }
        else {
          callbackInside(null);
        }
      }
    ],
    function(err, results) {
      console.log(err);
      callback();
    });
  }


  // get JSON and draw SVG representation of pathway

  function load(args) {

    // Check for minimum required parameters

    if (!args.gpmlUrl) { return console.warn('Error: No gpml URL specified as data source for pathvisio.js.'); }

    if (!args.container) { return console.warn('Error: No container selector specified as target for pathvisio.js.'); }
    args.containerElement = d3.select(args.container);
    if (args.containerElement.length !== 1) { return console.warn('Error: Container selector must be matched by exactly one element.'); }

    async.parallel([
      function(callback) {
        console.log('1a');
        loadPartials(args, callback);
      },
      function(callback){
        console.log('1b');
        getJson(args.gpmlUrl, callback);
      }
    ],
    function(err, results){
      console.log('5');
      console.log(err);

      async.series([
        function(callbackInside){
          draw(svg, pathway, function() {
            callbackInside(null);
          })
        },
        function(callbackInside) {
          svgPanZoom.init();
          callbackInside(null);
        }
      ],
      function(err, results) {
        console.log(err);
      });

      var nodeLabels = [];
      pathway.nodes.forEach(function(node) {
        if (!!node.textLabel && node.elementType === 'data-node') {
          nodeLabels.push(node.textLabel.text);
        }
      });

      // see http://twitter.github.io/typeahead.js/

      $('#highlight-by-label').typeahead({
        name: 'Find in pathway',
        local: nodeLabels,
        limit: 10
      });
      $('.icon-eye-open').click(function(){
        var nodeLabel = $("#highlight-by-label").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.pathway.highlightByLabel(nodeLabel);
        }
      });

      // see http://api.jquery.com/bind/
      // TODO get selected value better and make function to handle

      $( "#highlight-by-label" ).bind( "typeahead:selected", function() {
        var nodeLabel = $("#highlight-by-label").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.pathway.highlightByLabel(nodeLabel);
        }
      });

    });
  }

  return {
    draw:draw,
    load:load,
    getJson:getJson,
    gpml2json:gpml2json,
    highlightByLabel:highlightByLabel
  };
}();
