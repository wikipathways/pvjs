//! pathvisio-js 0.0.1
//! Built on 2013-09-13
//! https://github.com/wikipathways/pathvisio.js
//! License: http://www.apache.org/licenses/LICENSE-2.0/

var pathvisio = {};
pathvisio.data = {};
pathvisio.data.pathways = [];
;

pathvisio.helpers = function(){

  function isUrl(str) {

    // from http://forums.devshed.com/javascript-development-115/regexp-to-match-url-pattern-493764.html

    var urlPattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
    return urlPattern.test(str);
  }

  function splitStringByNewLine(str) {

    // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.

    return str.split(/\r\n|\r|\n/g);
  }

  function cloneNode(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  }

  function getUrlParam(name) {

    // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
    // This will be replaced once we get the backend php to get the json

    var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    if (parameter !== null) {
      return parameter;
    }
    else {
      console.warn('Warning: URL parameter "' + name + '" is null.');
      return null;
    }
  }

  function convertToArray(object) {
    var array = null;
    if (Object.prototype.toString.call( object ) === '[object Object]' ) {
      array = [];
      array.push(object);
      return array;
    }
    else {
      if( Object.prototype.toString.call( object ) === '[object Array]' ) {
        return object;
      }
      else {
        if( Object.prototype.toString.call( object ) === '[object String]' ) {
          array = [];
          array.push(object);
          return array;
        }
      }
    }
  }

  function getWindowDimensions(object) {
    var winW = 630, winH = 460;
    if (document.body && document.body.offsetWidth) {
     winW = document.body.offsetWidth;
     winH = document.body.offsetHeight;
    }
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
     winW = document.documentElement.offsetWidth;
     winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
     winW = window.innerWidth;
     winH = window.innerHeight;
    }
    return {'width':winW, 'height':winH};
  }

  // from http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another

  function moveArrayItem(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  }

  return{
    isUrl:isUrl,
    splitStringByNewLine:splitStringByNewLine,
    getUrlParam:getUrlParam,
    cloneNode:cloneNode,
    convertToArray:convertToArray,
    getWindowDimensions:getWindowDimensions,
    moveArrayItem:moveArrayItem
  };
}();



;

pathvisio.pathway = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON

  function gpml2json(gpml, callback){

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    self.gpml = gpml;
    console.log('GPML');
    console.log(gpml);
    
    //var pathway = pathvisio.data.pathways[url];
    var pathway = self.pathway = xml.xmlToJSON(gpml, true).pathway;
    
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

          self.interactions = interactions;
          self.edges = pathway.edges;
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
            }
            delete element.type;

            if (element.hasOwnProperty('xref')) {
              if ((!element.xref.database) && (!element.xref.id)) {
                delete element.xref;
              }
              else {
                element.xRef = element.xref;
                delete element.xref;
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
          var labels = self.labels = pathvisio.helpers.convertToArray( pathway.label );
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
      pathvisio.data.pathways.push(pathway);
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

      console.log('callback');
      console.log(callback);

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
    var svg = d3.select("#pathway-image");
    svg.selectAll('g.nodes-container')
    .attr('style', '');
    var dataNodes = self.dataNodes = pathvisio.data.pathways[0].nodes.filter(function(element) {return element.elementType === 'data-node';});
    var dataNodesWithText = self.dataNodesWithText = dataNodes.filter(function(element) {return (!!element.textLabel);});
    var selectedNodes = self.selectedNodes = dataNodesWithText.filter(function(element) {return element.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      console.log('node');
      console.log(node);

      var nodeDomElement = svg.select('#nodes-container-' + node.graphId);
      nodeDomElement.attr('style', 'fill:yellow');
      console.log('nodeDomElement');
      console.log(nodeDomElement);
      self. nodeDomElement= nodeDomElement;
    });
  }

  function draw(svg, pathway){
    console.log('svg');
    console.log(svg);
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

    var symbolsAvailable = svg.selectAll('symbol');

    var markersAvailable = svg.selectAll('marker');

    if (pathway.hasOwnProperty('groups')) {
      pathvisio.pathway.group.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('edges')) {
      pathvisio.pathway.edge.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('nodes')) {
      pathvisio.pathway.node.drawAll(svg, pathway, symbolsAvailable, markersAvailable);
    }

    if (pathway.hasOwnProperty('infoBox')) {
      pathvisio.pathway.infoBox.draw(svg, pathway);
    }
    window.setTimeout(function() {
    	window.root = document.documentElement.getElementsByTagName("svg")[0];
      root.addEventListener('click', function () {
        enableZoom = 1;
      });
      setupHandlers(root);
    }, 1000)
  }

  function getSvg(url, attemptCount, callback) {

    /*
    // from http://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text
    
    var pathwayTemplateSvgUrl = null;
    if (pathvisio.helpers.isUrl(url)) {
      pathwayTemplateSvgUrl = url;
    }
    else {
      pathwayTemplateSvgUrl = "pathway-template.svg";
    }
    //*/

    ///*
    // Use this code if you want to get the SVG using d3.xml.
    d3.text(url, 'text/plain', function(svg) {
      console.log('svg');
      console.log(svg);
      self.svg = svg;
      d3.select('#pathway-container')[0][0].innerHTML = svg;
      callback(d3.select('#pathway-image'));
    });
    //*/


    /*
    // I think this would be used if the SVG were included in the document as an embedded object instead of included directly in the DOM.

    var svg = d3.select("#pathway-object").select(function() {

      if (!this.getSVGDocument()) {
        return window.setTimeout(function() {
          if (attemptCount < 15) {
            console.log('Pathway image is loading. Status check #' + (attemptCount + 1) + ' in ' + 0.25*(attemptCount + 0) + ' seconds.');
            attemptCount += 1;
            getSvg(url, attemptCount, callback);
          }
          else {
            console.warn('Error: Pathway image appears to be unavailable.');
          }
        }, 250 * attemptCount);
      }
      callback(d3.select(this.getSVGDocument().documentElement));
    });
    //*/

    /*
     * get using jquery
    $.ajax({
      url: pathwayTemplateSvgUrl,
      dataType: "application/xml",
      success: callback 
    });
    //*/
  }

  // get JSON and draw SVG representation of pathway

  function load(targetSelector, svgUrl, gpmlUrl, highlightByLabelSelector) {
    if (!targetSelector) { return console.warn('Error: No pathway container selector specified as target.'); }
    if (d3.select(targetSelector).length !== 1) { return console.warn('pathway container selector must be unique.'); }
    //if (!pathvisio.helpers.isUrl(svgUrl)) { return console.warn('Error: No URL specified for SVG pathway template.'); }
    //if (!pathvisio.helpers.isUrl(gpmlUrl)) { return console.warn('Error: No URL specified for GPML data source.'); }

    getSvg(svgUrl, 1, function(svg) {
      console.log('svg');
      console.log(svg);
      var target = d3.select(targetSelector);
      //svgPanZoom.init();


      // this does not work
      //target.append(svg);

      getJson(gpmlUrl, function(pathway, sGpml, sJson) {
        draw(svg, pathway);

        var nodeLabels = [];
        pathvisio.data.pathways[0].nodes.forEach(function(node) {
          if (!!node.textLabel && node.elementType === 'data-node') {
            nodeLabels.push(node.textLabel.text);
          }
        });

        // see http://twitter.github.io/typeahead.js/

        $(highlightByLabelSelector).typeahead({
          name: 'Find in pathway',                                                          
          local: nodeLabels,
          //prefetch: '../data/countries.json',                                         
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
;

pathvisio.pathway.group = function(){ 
  function drawAll(svg, pathway) {
    var groups = pathway.groups;
    if (!groups) { return console.warn('Error: No group data available.');}

    // only consider non-empty groups

    var validGroups = pathway.groups.filter(function(el) {
      var groupId = el.groupId;
      return (pathway.nodes.filter(function(el) {return (el.groupRef === groupId);}).length>0);
    });

    var pathData = null;
    var groupsContainer = svg.select('#viewport').selectAll("use.group")
    .data(validGroups)
    .enter()
    .append("path")
    .attr("id", function (d) { return 'group-' + d.graphId;})
    .attr("class", function(d) { return 'group group-' +  d.style;})

    // We tried using symbols for the group shapes, but this wasn't possible because the symbols scaled uniformly, and the beveled corners of the complex group
    // are supposed to remain constant in size, regardless of changes in group size.

    .attr("d", function(d) {
      var groupDimensions = getDimensions(pathway, d.groupId);
      if (d.style === 'none' || d.style === 'group' || d.style === 'pathway') {
        pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
      }
      else {
        if (d.style === 'complex') {
          pathData = 'M ' + (groupDimensions.x + 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + 20) + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x + 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + 20) + ' Z';
        }
        else {
          pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
        }
      }
      return pathData;
    });
    //.call(drag);
  }

  function getDimensions(pathway, groupId) {
    var groupMembers = pathway.nodes.filter(function(el) {return (el.groupRef === groupId);});
    var group = {};

    // I think this is margin, not padding, but I'm not sure

    var margin = 12;
    group.x = (d3.min(groupMembers, function(el) {return el.x;})) - margin;
    group.y = (d3.min(groupMembers, function(el) {return el.y;})) - margin;

    group.width = (d3.max(groupMembers, function(el) {return el.x + el.width;})) - group.x + margin;
    group.height = (d3.max(groupMembers, function(el) {return el.y + el.height;})) - group.y + margin;

    return group;
  }
 
  return { 
    drawAll:drawAll,
    getDimensions:getDimensions
  };
}();
;

pathvisio.pathway.infoBox = function(){
    
  function draw(svg, pathway) {

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathway.hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':pathway.name});
    }

    if (pathway.hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':pathway.license});
    }

    if (pathway.hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathway.lastModified});
    }

    if (pathway.hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':pathway.organism});
    }

    var infoBoxElements = svg.select('#viewport').selectAll("text.info-box")
    .data(infoBox)
    .enter()
    .append("text")
    .attr("id", function (d,i) {return "info-box-" + i; })
    .attr("class", "info-box")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    infoBoxElements.append("tspan")
    .attr("class", "info-box-property-name")
    .text(function (d) {return d.key + ': ';});

    infoBoxElements.append("tspan")
    .text(function (d) {return d.value;});
  }

  return {
    draw:draw
  };
}();





;

// Draw nodes. Includes data nodes, shapes, labels, cellular components...

pathvisio.pathway.node = function(){

  // GPML to JSON shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

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

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

  function gpml2json(rawJsonNodes) {
    try {

      // Nodes

      rawJsonNodes.forEach(function(element, index, array) {
        if (element.hasOwnProperty('comment')) {
          element.comments = pathvisio.helpers.convertToArray( element.comment );
          delete element.comment;
        }

        if (element.hasOwnProperty('xref')) {
          if ((!element.xref.database) && (!element.xref.id)) {
            delete element.xref;
          }
          else {
            element.xref = element.xRef;
            delete element.xref;
          }
        }

        // Be warned that support for zIndex in SVG is spotty. It's best to rely on ordering in the DOM as well.

        if (element.graphics.hasOwnProperty("zorder")) {
          element.zIndex = parseFloat(element.graphics.zorder);
        }

        element.x = parseFloat(element.graphics.centerX) - parseFloat(element.graphics.width)/2;
        //element.x = Math.round( element.x * 100 ) / 100;

        element.y = parseFloat(element.graphics.centerY) - parseFloat(element.graphics.height)/2;
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
          }
        }

        if ((!(element.graphics.hasOwnProperty("shapeType")))) {
          if (element.elementType === 'data-node') {
            element.symbolType = "rectangle";
          }
          else {
            element.symbolType = "none";
          }
        }
        else {
          element.symbolType = shapeMappings[element.graphics.shapeType];
        }

        if (element.graphics.hasOwnProperty("fillColor")) {

          // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
          // license: Use it if you like it

          element.graphics.fillColor = element.graphics.fillColor.toLowerCase();

          if (element.graphics.fillColor === 'transparent') {
            element.fillOpacity = 0;
          }
          else {
            var fill = new RGBColor(element.graphics.fillColor);
            if (fill.ok) {
              element.fill = fill.toHex();
            }
            else {
              console.warn('Invalid FillColor encountered. Setting FillColor to gray.');
              element.fill = "#999999";
            }

            if (element.symbolType !== 'none') {
              element.fillOpacity = 1;
            }
          }
        }

        if (element.graphics.hasOwnProperty("lineThickness")) {
          element.strokeWidth = element.graphics.lineThickness;
        }

        if (element.graphics.hasOwnProperty('lineStyle')) {
          element.strokeStyle = element.graphics.lineStyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          }
        }

        if (element.hasOwnProperty('attribute')) {
          element.attributes = pathvisio.helpers.convertToArray( element.attribute );
          delete element.attribute;
          element.attributes.forEach(function(el, index, array) {
            if ((el.key === "org.pathvisio.DoubleLineProperty") && (el.value === "Double")) {
              console.log('double');
              console.log(el);
              element.strokeStyle = 'double';
            }
            else {
              if ((el.key === "org.pathvisio.CellularComponentProperty") && (el.value !== "None")) {
                element.cellularComponent = el.value;
              }
            }
          });
          delete element.attributes;
        }

        if (element.graphics.hasOwnProperty("rotation")) {

          // get rotation in degrees because SVG rotate attribute uses degrees
          // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

          element.rotation = element.graphics.rotation * (180 / Math.PI);
          //element.rotation = Math.round( element.rotation * 100 ) / 100;
        }

        // textLabel data

        if (element.hasOwnProperty("textLabel")) {
          if (!element.textLabel) {
            delete element.textLabel;
          }
          else {
            var text = element.textLabel.toString().replace("&#xA;","\r\n");
            delete element.textLabel;

            element.textLabel = {};

            element.textLabel.text = text;

            if (element.hasOwnProperty("stroke")) {

              // element stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

              element.textLabel.fill = element.stroke;
            }

            // default fontSize is already specified in the CSS of pathway-template.svg, but I need the font size
            // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.
            
            var fontSize = null;

            if (element.graphics.hasOwnProperty("fontSize")) {
              fontSize = element.graphics.fontSize;
            }
            else {
              fontSize = 10;
            }
            element.textLabel.fontSize = fontSize;

            if (element.graphics.hasOwnProperty("fontName")) {
              element.textLabel.fontFamily = element.graphics.fontName;
            }

            if (element.graphics.hasOwnProperty("fontWeight")) {
              element.textLabel.fontWeight = element.graphics.fontWeight.toLowerCase();
            }

            if (element.graphics.hasOwnProperty("fontStyle")) {
              element.textLabel.fontStyle = element.graphics.fontStyle.toLowerCase();
            }

            if (alignToAnchorMappings.hasOwnProperty(element.graphics.align)) {
              element.textLabel.textAnchor = alignToAnchorMappings[element.graphics.align];
            }
            else {
              element.textLabel.textAnchor = 'middle';
            }

            if (element.graphics.hasOwnProperty("valign")) {
              element.textLabel.vAlign = element.graphics.valign.toLowerCase();
            }
            else {
              element.textLabel.vAlign = 'top';
            }
          }
        }

        // BiopaxRefs 

        try {
          if (element.hasOwnProperty('biopaxRef')) {
            element.biopaxRefs = pathvisio.helpers.convertToArray( element.biopaxRef );
            delete element.biopaxRef;

            //biopaxRefs.forEach(function(element, index, array) {
            // do something
            //});
          }
          else {
            console.log("No element(s) named 'biopaxRef' found for this node in this gpml file.");
          }
        }
        catch (e) {
          console.log("Error converting node's biopaxRef to json: " + e.message);
        }

        delete element.graphics;
      });

      var validJsonNodes = rawJsonNodes.sort(function(a,b) {return a.zIndex - b.zIndex;});
      return validJsonNodes;
    }
    catch (e) {
      console.log("Error converting labelable elements to json: " + e.message);
      return e;
    }
  }

  function drawAll(svg, pathway, symbolsAvailable, markersAvailable) {
    var nodesContainer = svg.select('#viewport').selectAll("g.nodes-container")
    .data(pathway.nodes)
    .enter()
    .append("g")
    .attr("id", function (d) { return 'nodes-container-' + d.graphId;})
    .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')';})
    .attr("class", "nodes-container")
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        pathvisio.pathway.xRef.displayData(pathway.organism, d);
      }
        /*
        var xrefDiv = $('.xrefinfo');

        // (id, datasource, species, symbol)

        var xrefHtml = XrefPanel.create(d.xRef.id, d.xRef.database, 'Homo sapiens', d.textLabel.text);
        //var xrefHtml = XrefPanel.create('HMDB01397', 'HMDB', 'Mus musculus', d.textLabel.text);
        window.setTimeout(function() {
          xrefDiv.empty();
          xrefDiv.append(xrefHtml);
        }, 2000);
        //*/
  });

    var nodes = nodesContainer.each(function(d, i) {
      var node = d3.select(this).append('use')
      .attr("id", function (d) {return 'node-' + d.graphId;})
      .attr('transform', function(d) {
        var transform = 'scale(1)';
        if (d.hasOwnProperty('rotation')) {
          transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
        }
        return transform;
      })
      .attr("class", function (d) {
        var styleClass = '';
        if (d.elementType === 'data-node') {
          styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
        }
        else {
          styleClass = "node " + d.elementType;
        }
        return styleClass;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function (d) { return d.width;})
      .attr("height", function (d) { return d.height;})
      .attr("z-index", function (d) { return d.zIndex;})
      .attr("style", function (d) {
        var style = '';

        if (d.hasOwnProperty('fill')) {
          style += 'fill:' + d.fill + '; ';
        }

        if (d.hasOwnProperty('fillOpacity')) {
          style += 'fill-opacity:' + d.fillOpacity + '; ';
        }

        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; ';
        }

        var strokeWidthEffective = null;
        if (d.hasOwnProperty('strokeWidth')) {

          // Doubling strokeWidth to create strokeWidthEffective.
          // Reason: stroke is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
          // of the stroke so that the stroke does not go outside its bounding box. Because the outer half of the stroke is not displayed, we need to
          // double the stroke width so that the stroke's apparent width matches the value specified in GPML.

          strokeWidthEffective = 2 * d.strokeWidth;
        }
        else {
          strokeWidthEffective = 2;
        }

        style += 'stroke-width:' + strokeWidthEffective + '; ';

        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            style += 'stroke-dasharray: 5,3; ';
          }

          if (d.strokeStyle === 'double') {

            // draw second element

            d3.select(nodesContainer[0][i]).append("use")
            .attr("id", function (d) {return 'node-double' + d.graphId;})
            .attr("class", function (d) {
              var styleClass = '';
              if (d.elementType === 'data-node') {
                styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
              }
              else {
                styleClass = "node " + d.elementType;
              }
              return styleClass;
            })
            .attr('transform', function(d) {
              var transform = 'scale(1)';
              if (d.hasOwnProperty('rotation')) {

                // the reference to width and height here is to specify the center of rotation as the center of the second element

                transform = 'rotate(' + d.rotation + ' ' + (d.width/2) + ' ' + (d.height/2) + ')';
              }
              return transform;
            })
            .attr("x", function(d) {return strokeWidthEffective;})
            .attr("y", function(d) {return strokeWidthEffective;})
            .attr("width", function (d) { return d.width - 2*strokeWidthEffective;})
            .attr("height", function (d) { return d.height - 2*strokeWidthEffective;})
            .attr("xlink:xlink:href", function (d) {return "#" + d.symbolType;})
            //.attr("class", "drawing-board-color-stroke")
            .attr("style", function(d) { return style + 'fill-opacity:0; ';});
          }
        }

        // be careful that all additions to 'style' go above the 'double-line second element' above
        // so that they are applied to both the first and second elements.

        return style;
      });

      if (symbolsAvailable.filter(function(d, i) { return (symbolsAvailable[0][i].id === pathway.nodes[0].symbolType);}).length > 0) {
        // d3 bug strips 'xlink' so need to say 'xlink:xlink';
        node.attr("xlink:xlink:href", function (d) {return "#" + d.symbolType;});
      }
      else {
        node.attr("xlink:xlink:href", "#rectangle");
        console.log('Pathvisio.js does not have access to the requested symbol: ' + pathway.nodes[0].symbolType + '. Rectangle used as placeholder.');
      }

      // use this for tspan option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
        var nodeText = d3.select(this).append('text')
        .attr("id", function (d) { return 'node-text-' + d.graphId;})
        .attr("x", 0)
        .attr("y", 0)
        .attr('transform', function(d) {

          // tweak left, center, right horizontal alignment
            
          var dx = null;

          if (d.textLabel.hasOwnProperty('textAnchor')) {

            // giving padding of 5. maybe this should go into the CSS.

            if (d.textLabel.textAnchor === 'start') {
              dx = 5;
            }
            else {
              if (d.textLabel.textAnchor === 'end') {
                dx = d.width - 5;
              }
              else {
                dx = d.width / 2;
              }
            }
          }
          else {
            dx = d.width / 2;
          }

          // set top, middle, bottom vertical alignment

          var dy = null;

          if (d.textLabel.hasOwnProperty('vAlign')) {
            if (d.textLabel.vAlign === 'top') {
              dy = 5 + (1 * d.textLabel.fontSize);
            }
            else {
              if (d.textLabel.vAlign === 'bottom') {
                dy = d.height - (5 + (0.3 * d.textLabel.fontSize) + ((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize));
              }
              else {
                dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
              }
            }
          }
          else {
            dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
          }
          return 'translate(' + dx + ' ' + dy + ')';})
          .attr("class", function (d) {
            var styleClass = '';
            if (d.elementType === 'data-node') {
              styleClass = d.dataNodeType;
            }
            return styleClass; })
            .attr("style", function (d) {
              var style = '';
              var fontSize = d.fontSize;
              if (d.textLabel.hasOwnProperty('fill')) {
                style += 'fill:' + d.textLabel.fill + '; ';
              }
              if (d.textLabel.hasOwnProperty('fontFamily')) {
                style += 'font-family:' + d.textLabel.fontFamily + '; ';
              }
              if (d.textLabel.hasOwnProperty('fontSize')) {
                style += 'font-size:' + d.textLabel.fontSize + 'px; ';
              }
              if (d.textLabel.hasOwnProperty('fontWeight')) {
                style += 'font-weight:' + d.textLabel.fontWeight + '; ';
              }
              if (d.textLabel.hasOwnProperty('fontStyle')) {
                style += 'font-style:' + d.textLabel.fontStyle + '; ';
              }
              if (d.textLabel.hasOwnProperty('textAnchor')) {
                style += 'text-anchor:' + d.textLabel.textAnchor + '; ';
              }
              return style;
            });

            var nodeTspan = nodeText.each(function(d) {
              var fontSize = d.textLabel.fontSize;
              d3.select(this).selectAll('tspan')
              .data(function (d) {
                var textArray = pathvisio.helpers.splitStringByNewLine(d.textLabel.text);
                return textArray;
              })
              .enter()
              .append('tspan')
              .attr("x", 0)
              .attr("y", function (d, i) { return i * fontSize;})
              .text(function (d) { return d;});
            });

            if (d.hasOwnProperty('biopaxRefs')) {
              var nodePublicationXrefs = d3.select(this).selectAll(".node-publication-xref-text")
              .data(d.biopaxRefs)
              .enter()
              .append("text")
              .attr("id", function (d) { return 'node-publication-xref-text-' + d;})
              .attr("x", 0)
              .attr("y", 0)
              .attr('transform', function(d,i) { return 'translate(' + (i*12) + ' ' + (-12) + ')';})
              .attr("class", 'node-publication-xref-text')
              .attr("style", "")
              .text(function (d) {

                // d is an array of biopaxRefs

                var index = 0;
                var rdfId = null;
                do {
                  console.log('pathway.biopax');
                  console.log(pathway.biopax);
                  rdfId = pathway.biopax.bpPublicationXrefs[index].rdfId;
                  index += 1;
                } while (rdfId !== d.Text && index < pathway.biopax.bpPublicationXrefs.length);
                return index;});
            }

      }

      /*

      // use this for foreignObject object option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
      var nodeSwitch = d3.select(this).append('switch');

      var nodeForeignObject = nodeSwitch.append('foreignObject') 
      //.attr("x", 0)
      //.attr("y", 0)
      .attr("width", function (d) { return d.width + 'px';})
      .attr("height", function (d) { return d.height + 'px';});

      var nodeBody = nodeForeignObject.append('xhtml:body') 
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .attr("id", function (d) { return 'node-text-' + d.graphId;})
      .attr("style", function (d) { return 'height:' + d.height + 'px';});

      var nodeLink = nodeBody.append('link') 
      .attr("rel", "stylesheet")
      .attr("href", "pathways.css")
      .attr("type", "text/css");

      var nodeOuter = nodeBody.append('div') 
      .attr("class", "outer") 
      .attr("style", function (d) { return 'height:' + d.height + 'px';});

      var nodeP = nodeOuter.append('p') 
      .attr("style", function (d) { 
      var style = 'height:' + d.height + 'px; ';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'color:' + d.textLabel.color + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; ';
      }
      return style;
      })
      .text(function (d) {
      var text = d.textLabel.text;
      return text;
      })
      .attr("class", function (d) { 
      var styleClass = '';
      if (d.elementType === 'data-node') {
      styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
      }
      else {
      styleClass = "node " + d.elementType;
      }
      return styleClass });

      var nodeText = nodeSwitch.append('text')
      .attr("id", function (d) { return 'node-text-' + d.graphId;})
      .attr("x", function (d) { return d.width / 2;})
      .attr("y", function (d) { return d.height / 2 + 0.3 * d.textLabel.fontSize;})
      //.attr("style", function (d) { return 'stroke:' + 'red';})
      .attr("style", function (d) { 
      var style = '';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'fill:' + d.textLabel.color + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; ';
      }
      return style;
})
.text(function (d) { return d.textLabel.text;});

}
*/
});

}

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  return {
    drawAll:drawAll,
    getPortCoordinates:getPortCoordinates,
    gpml2json:gpml2json
  };
}();
;

// Edges (interactions and graphical lines)

pathvisio.pathway.edge = function(){

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

  // GPML to JSON shape name mappings: { "OldName":"new-name" }
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

  function gpml2json(rawJsonEdges) {
    try {
      rawJsonEdges.forEach(function(element, index, array) {
        if (element.graphics.hasOwnProperty('anchor')) {
          element.anchors = pathvisio.helpers.convertToArray(element.graphics.anchor);
        }

        if (element.graphics.hasOwnProperty('color')) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) {
            element.stroke = color.toHex();
          }
        }

        element.strokeWidth = element.graphics.lineThickness;

        if (element.graphics.hasOwnProperty('connectorType')) {
          element.connectorType = element.graphics.connectorType.toLowerCase();
        }

        if (element.graphics.hasOwnProperty('lineStyle')) {
          element.strokeStyle = element.graphics.lineStyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          }
        }
        else {
          if (element.hasOwnProperty('attribute')) {
            if ((element.attribute.key === "org.pathvisio.DoubleLineProperty") && (element.attribute.value === "Double")) {
              element.strokeStyle = 'double';
              delete element.attribute;
            }
          }
        }

        element.zIndex = element.graphics.zorder;

        if (element.hasOwnProperty('xref')) {
          if ((!element.xref.database) && (!element.xref.id)) {
            delete element.xref;
          }
          else {
            element.xref = element.xRef;
            delete element.xref;
          }
        }

        // Points

        var points = pathvisio.helpers.convertToArray( element.graphics.point );
        var pointsData = pathvisio.pathway.edge.point.gpml2json(points);
        element.points = pointsData.points;

        // Back to edges

        element.markerStart = pointsData.markerStart;
        element.markerEnd = pointsData.markerEnd;

        delete element.graphics;
      });

      // TODO this could be refactored to be more efficient
      // When being drawn, edges with anchors use the SVG path method path.getPointAtLength() to find endpoints. That means
      // a given path (edge) having an endpoint attached to an anchor requires that the path (edge) having that anchor be drawn
      // before the given path can be drawn. This means that sometimes the ordering of the edges in the DOM may not match the
      // z-index values specified in PathVisio. We could resort the edges after they are all drawn, but DOM operations are
      // expensive, so I will not do that unless it is required.

      rawJsonEdges.sort(function(a,b) {return a.zIndex - b.zIndex;});

      // edges with anchors will come before edges without anchors

      var edgesWithAnchors = [];
      var edgesWithoutAnchors = [];
      rawJsonEdges.forEach(function(element) {
        if (!element.hasOwnProperty('anchors')) {
          edgesWithoutAnchors.push(element);
        }
        else {
          edgesWithAnchors.push(element);
        }
      });

      // edges with many anchors will probably come before edges few anchors
      // TODO Does this really help to speed things up? Need to research it.
      // I assume it does, because I think a sort like this is less expensive
      // than the processes below, but I could be wrong, because I didn't spend
      // much time on this item.

      //edgesWithAnchors.sort(function(a,b) {return b.anchors.length - a.anchors.length;});

      // edges with endpoints not attached to anchors will come before edges with endpoints attached to anchors 

      function attachedToAnchor(point, edges) {
        var anchor = null;
        var i = -1;
        do {
          i += 1;
          anchor = edges[i].anchors.filter(function(element) {return element.graphId === point.graphRef;})[0];
        } while (!anchor && i < edges.length - 1);

        return (anchor !== undefined);
      }

      var validJsonEdges = [];
      var unsortedJsonEdges = edgesWithAnchors;

      unsortedJsonEdges.forEach(function(element, index, array) {
        if (!attachedToAnchor(element.points[0], edgesWithAnchors) && !attachedToAnchor(element.points[element.points.length - 1], edgesWithAnchors)) {
          validJsonEdges.push(element);
          array.splice(index, 1);
        }
      });

      // Recursively iterate through the list of unsorted json edges and check for whether each edge's endpoints are defined (either not attached to an anchor
      // or attached to an anchor on an edge that has already been defined in validJsonEdges. If true, add edge to validJsonEdges and remove it from unsortedJsonEdges.
      // Repeat until all edges are sorted.

      do {
        unsortedJsonEdges.forEach(function(element, index, array) {

          // TODO This is hard to read. It should be refactored.

          if (((!attachedToAnchor(element.points[0], edgesWithAnchors)) || attachedToAnchor(element.points[0], validJsonEdges)) && (attachedToAnchor(element.points[element.points.length - 1], validJsonEdges) || (!attachedToAnchor(element.points[element.points.length - 1], edgesWithAnchors)))) {
            validJsonEdges.push(element);
            array.splice(index, 1);
          }
        });
      } while (unsortedJsonEdges.length > 0);

      // add back in the edges having no anchors 
      
      validJsonEdges = validJsonEdges.concat(edgesWithoutAnchors);
      return validJsonEdges;
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    }
  }

  function drawAll(svg, pathway) {
    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = svg.select('#viewport').selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (d) { return d.edgeType + '-' + d.graphId; })
      .attr("class", function (d) {
        var styleClass = 'edge ' + d.edgeType + ' ';
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke";
          }
        }
        return styleClass;
      })
      .attr("d", function (d) {
        pathData = pathvisio.pathway.edge.pathData.get(svg, pathway, d);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            svg.select('#viewport').append("path")
            .attr("class", d.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "drawing-board-color-stroke")
            .attr("style", "stroke-width:" + d.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisio.pathway.edge.marker.draw(svg, d.markerStart, 'start', d.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisio.pathway.edge.marker.draw(svg, d.markerEnd, 'end', d.stroke) + ')');
          }
        }
        return pathData;
      })
      .attr("style", function (d) {
        var style = 'stroke-width:' + d.strokeWidth + '; ';
        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; ';
        }
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * d.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (d) {
        var markerStart = pathvisio.pathway.edge.marker.draw(d.markerStart, 'start', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (d) {
        var markerEnd = pathvisio.pathway.edge.marker.draw(d.markerEnd, 'end', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none');
    }
  }

  return {
    gpml2json:gpml2json,
    drawAll:drawAll
  };
}();
  
;

pathvisio.pathway.edge.marker = function(){
  function draw(svg, name, position, color) {
    var markerName = '';
    if (name === 'none') {
      markerName = name;
    }
    else {

      // if it's black, use the default

      if ( (color === '#000') || (color === '#000000') || (!(color)) ) {
        markerName = name + '-' + position + '-black';
      }

      // else create a new marker with the desired color

      else {
        /*
        var pathway.svg = d3.select("#pathway-container").select(function() {
          return this.contentDocument.documentElement;
        });
        */

        var markerElementBlack = svg.select('marker#' + name + '-' + position + '-black');
        var markerElement = pathvisio.helpers.cloneNode(markerElementBlack[0][0]);

        // define style of marker element

        var markerElementStyle = '';

        if (markerElement[0][0].getAttribute('stroke') === 'black') {
          markerElementStyle += 'stroke:' + color + '; ';
        }

        if (markerElement[0][0].getAttribute('fill') === 'black') {
          markerElementStyle += 'fill:' + color + '; ';
        }

        markerElement[0][0].setAttribute('id', name + '-' + position + '-' + color );
        markerElement[0][0].setAttribute('style', markerElementStyle);

        markerName = name + '-' + position + '-' + color;
      }
    }
    return markerName;
  }
 
  return {
    draw:draw
  };
}();
;

pathvisio.pathway.edge.point = function(){

  // pathvisio.js vs PathVisio (Java) specification of anchor position
  // -----------------------------------------
  // pathvisio.js |  PathVisio  | Meaning
  //  relX | relY | relX | relY |
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
  // PathVisio (Java) also sometimes comes up with other values for relX and relY.
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
    "none":"none",
    "TBar":"t-bar"
  };

  function gpml2json(rawJsonPoints) {
    try {
      var markerStart = 'none';
      var markerEnd = 'none';

      rawJsonPoints.forEach(function(element, index, array) {

        // for anchor points, the data model for a point is
        // relX, relY, [dx], [dy]
        // with dx and dy only being used for the first and last point
        //
        // "relX, relY" indicates where on the shape the anchor is located.
        //
        // Table of meanings for "relX, relY"
        // ----------------------------------
        //  relX   |   relY   | meaning
        // ----------------------------------
        // 0.333   0       top side at left third-point 
        // 0.5     0       top side at center 
        // 0.667   0       top side at right third-point 
        // 1       0.333   right side at top third-point 
        // 1       0.5     right side at middle 
        // 1       0.667   right side at bottom third-point 
        // 0.667   1       bottom side at right third-point 
        // 0.5     1       bottom side at center 
        // 0.333   1       bottom side at left third-point 
        // 0       0.667   left side at bottom third-point 
        // 0       0.5     left side at middle 
        // 0       0.333   left side at top third-point 
        //
        // "dx, dy" indicates the direction of the line relative to the shape
        //
        // Table of meanings for "dx, dy"
        // ------------------------------
        //  dx | dy | meaning
        // ------------------------------
        //   0   -1   line emanates upward from anchor 
        //   1    0   line emanates rightward from anchor 
        //   0    1   line emanates downward from anchor 
        //  -1    0   line emanates leftward from anchor 
        //
        //  adapted from jsPlumb implementation:
        //  https://github.com/sporritt/jsPlumb/wiki/anchors

        if (element.graphRef !== undefined) {
          delete element.x;
          delete element.y;

          var relX = (Math.round(element.relX * 2)/2).toString();
          element.relX = parseFloat(anchorPositionMappings[relX]);

          var relY = (Math.round(element.relY * 2)/2).toString();
          element.relY = parseFloat(anchorPositionMappings[relY]);

          if (element.relX === 0) {
            element.dx = -1;
          }
          else {
            if (element.relX === 1) {
              element.dx = 1;
            }
            else {
              if (element.relY === 0) {
                element.dy = -1;
              }
              else {
                if (element.relY === 1) {
                  element.dy = 1;
                }
              }
            }
          }
        }

        // This is probably unreliable. We need to establish a way to ensure we identify start and end markers correctly, and we should not relY on the order of elements in XML.

        if ((index === 0) && (markerMappings.hasOwnProperty(element.arrowHead))) {
          markerStart = markerMappings[element.arrowHead];
          delete element.arrowHead;
        }
        else {
          if ((index === array.length - 1) && (markerMappings.hasOwnProperty(element.arrowHead))) {
            markerEnd = markerMappings[element.arrowHead];
            delete element.arrowHead;
          }
        }
      });

      // This seems clumsy. I added it so it's clear that we are returning the points array after it has been processed.

      var validJsonPoints = rawJsonPoints;
      return { "points": validJsonPoints, "markerStart":markerStart, "markerEnd":markerEnd };
    }
    catch (e) {
      console.log("Error converting point to json: " + e.message);
      return e;
    }
  }



  function getGraphRef(pathway, point) {
    self.point=point;
    if (point.hasOwnProperty('graphRef')) {
      if (pathway.hasOwnProperty('nodes')) {
        var node = pathway.nodes.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (node !== undefined) {
          return {'type':'node', 'element':node};
        }
      }

      if (pathway.hasOwnProperty('groups')) {
        var group = pathway.groups.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (group !== undefined) {
          return {'type':'group', 'groupId':group.groupId};
        }
      }

      var edgesWithAnchors = pathway.edges.filter(function(element) {return element.hasOwnProperty('anchors');});
      self.edgesWithAnchors = edgesWithAnchors;
      var anchor = null;
      var i = -1;
      do {
        i += 1;
        anchor = edgesWithAnchors[i].anchors.filter(function(element) {

            // jshint doesn't like this. how can I refactor?

            return element.graphId === point.graphRef;
          }
        )[0];
      } while (!anchor && i < edgesWithAnchors.length );

      return {'type':'anchor', 'element':anchor, 'edge':edgesWithAnchors[i]};

    }
    else {
      return {'type':'unconnected'};
    }
  }

  function getCoordinates(svg, pathway, point) {
    var coordinates = {};
    var edgeTerminusRef = self.edgeTerminusRef = getGraphRef(pathway, point);
    if (edgeTerminusRef.type !== 'anchor') {
      if (edgeTerminusRef.type === 'unconnected') {
        coordinates.x = point.x;
        coordinates.y = point.y;

      }
      else {
        if (edgeTerminusRef.type === 'node') {
          coordinates = pathvisio.pathway.node.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathvisio.pathway.group.getDimensions(pathway, edgeTerminusRef.groupId);
            coordinates = pathvisio.pathway.node.getPortCoordinates(groupDimensions, point.relX, point.relY);
          }
          else {
            return 'error';
          }
        }
      }
    }
    else {
      var path = svg.select("#interaction-" + edgeTerminusRef.edge.graphId)[0][0];
      coordinates = path.getPointAtLength(edgeTerminusRef.element.position * path.getTotalLength());
    }

    return coordinates;
  }

  function isTwoPointElbow(source, target) {
    var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) );
    var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
    var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
    return ( isRightAngle && sourcePasses && targetPasses );
  }

  return {
    getGraphRef:getGraphRef,
    getCoordinates:getCoordinates,
    isTwoPointElbow:isTwoPointElbow,
    gpml2json:gpml2json
  };
}();
;

// TODO Rewrite the code for getting elbow and curve edge points. For reference, see these links:
//
// Elbows:
// [PathVisio Java code for elbows](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/ElbowConnectorShape.java)
// [jsPlumb JavaScript implemention of elbows](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-flowchart.js)
// [W3C documention on vertical and horizontal path movement - "lineto" commands - for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
//
// Bezier Curves:
// [PathVisio Java code for cubic bezier curve](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/CurvedConnectorShape.java)
// [jsPlumb JavaScript implemention of bezier curves](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-bezier.js)
// [W3C documention on cubic bezier curves for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
// There are other types of SVG curves, but I understand the Java code to use bezier curves.

pathvisio.pathway.edge.pathData = function(){

  var currentDirection = null;

  function switchDirection(currentDirection) {
    if (currentDirection === 'H') {
      return 'V';
    }
    else {
      return 'H';
    }
  }

  function get(svg, pathway, edges) {
    var sourcePoint = edges.points[0];
    var source = pathvisio.pathway.edge.point.getCoordinates(svg, pathway, sourcePoint);

    if (sourcePoint.dx === undefined) {
      source.dx = 0;
    }
    else {
      source.dx = sourcePoint.dx;
    }

    if (sourcePoint.dy === undefined) {
      source.dy = 0;
    }
    else {
      source.dy = sourcePoint.dy;
    }

    var targetPoint = edges.points[edges.points.length - 1];
    var target = pathvisio.pathway.edge.point.getCoordinates(svg, pathway, targetPoint);

    if (targetPoint.dx === undefined) {
      target.dx = 0;
    }
    else {
      target.dx = targetPoint.dx;
    }

    if (targetPoint.dy === undefined) {
      target.dy = 0;
    }
    else {
      target.dy = targetPoint.dy;
    }

    var pathData = 'M ' + source.x + ' ' + source.y;

    if ((!edges.connectorType) || (edges.connectorType === undefined) || (edges.connectorType === 'straight')) {
      pathData += " L " + target.x + " " + target.y;
    }
    else {

      // just a start for the elbow connector type. still need to consider several other potential configurations.
      // It doesn't make sense for an unconnected interaction or graphical line to be an elbow, so any that are
      // so specified will be drawn as segmented lines.

      if (edges.connectorType === 'elbow' && edges.points[0].hasOwnProperty('graphRef') && edges.points[edges.points.length - 1].hasOwnProperty('graphRef')) {

        // distance to move away from node when we can't go directly to the next node

        var step = 15;

        if (Math.abs(source.dx) === 1) {
          currentDirection = 'H';
        }
        else {
          currentDirection = 'V';
        }

        //if (edges.points.length === 2) {
        //doesn't quite work yet, so this works for most cases

        if (( edges.points.length === 2 && pathvisio.pathway.edge.point.isTwoPointElbow(source, target)) ) {
        }
        else {
          if ( edges.points.length > 2 ) {
            edges.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                if (currentDirection === 'H') {
                  pathData += ' ' + currentDirection + ' ' + element.x;
                }
                else {
                  pathData += ' ' + currentDirection + ' ' + element.y;
                }
                currentDirection = switchDirection(currentDirection);
              }
            });
          }
          else {
            //if (source.dx === ((source.x - target.x) / Math.abs(source.x - target.x)) || source.dx === target.dy || source.dy === target.dx) {
            if (Math.abs(source.dx) === 1) {
              pathData += " H " + (source.x + source.dx * 15);
            }
            else {
              //if (source.dy === ((source.y - target.y) / Math.abs(source.y - target.y)) || source.dx === target.dy || source.dy === target.dx) {
              if (Math.abs(source.dy) === 1) {
                pathData += " V " + (source.y + source.dy * 15);
                currentDirection = switchDirection(currentDirection);
              }
            }

            if (target.dx === ((target.x - source.x) / Math.abs(target.x - source.x)) || source.dx === target.dy || source.dy === target.dx) {
              //if (Math.abs(target.dx) === 1) {
              pathData += " H " + (target.x + target.dx * 15) + ' V ' + target.y + ' H ' + target.x;
              currentDirection = switchDirection(currentDirection);
            }
            else {
              if (target.dy === ((target.y - source.y) / Math.abs(target.y - source.y)) || source.dx === target.dy || source.dy === target.dx) {
                //if (Math.abs(target.dy) === 1) {
                pathData += " V " + (target.y + target.dy * 15) + ' H ' + target.x + ' V ' + target.y;
                currentDirection = switchDirection(currentDirection);
              }
            }
          }
        }

        if (currentDirection === 'H') {
          pathData += ' ' + currentDirection + ' ' + target.x;
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.y;
          currentDirection = switchDirection(currentDirection);
        }
        else {
          pathData += ' ' + currentDirection + ' ' + target.y;
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.x;
          currentDirection = switchDirection(currentDirection);
        }

        /*
           if (Math.abs(target.dx) === 1) {
           pathData += " V " + target.y + " H " + target.x;
           console.log('pathData');
           console.log(pathData);
           }
           else {
           pathData += " H " + target.x + " V " + target.y;
           console.log('pathData');
           console.log(pathData);
           }
           */
      }
      else {
        if (edges.connectorType === 'segmented') {
          edges.points.forEach(function(element, index, array) {
            if ((index > 0) && (index < (array.length -1))) {
              pathData += " L " + element.x + " " + element.y;
            }
          });
          pathData += " L " + target.x + " " + target.y;
        }
        else {
          if (edges.connectorType === 'curved') {
            if (edges.points.length === 3) {

              // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

              var pointControl = edges.points[1];

              pathData += " S" + pointControl.x + "," + pointControl.y + " " + target.x + "," + target.y;
              return pathData;
            }
            else {

              // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

              pathData += " T" + target.x + "," + target.y;
              return pathData;
            }
          }
          else {
            console.log('Warning: pathvisio.js does not support connector type: ' + edges.connectorType);
            edges.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length -1))) {
                pathData += " L " + element.x + " " + element.y;
              }
            });
            pathData += " L " + target.x + " " + target.y;
          }
        }
      }
    }
    return pathData;
  }
 
  return {
    get:get
  };
}();
;

pathvisio.pathway.dataSources = [
   {
      "database":"Affy",
      "id":"X",
      "homePage":"http://www.affymetrix.com/",
      "linkOut":"https://www.affymetrix.com/LinkServlet?probeset=$id",
      "example":"1851_s_at",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:affy.probeset",
      "regex":"\d{4,}((_[asx])?_at)?",
      "fullName":"Affymetrix Probeset"
   },
   {
      "database":"Agilent",
      "id":"Ag",
      "homePage":"http://agilent.com",
      "linkOut":"",
      "example":"A_24_P98555",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Ag",
      "regex":"A_\d+_.+",
      "fullName":"Agilent"
   },
   {
      "database":"BIND",
      "id":"Bi",
      "homePage":"http://www.bind.ca/",
      "linkOut":"http://www.bind.ca/Action?identifier=bindid&idsearch=$id",
      "example":"",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:bind",
      "regex":"^\d+$",
      "fullName":"BIND"
   },
   {
      "database":"BioCyc",
      "id":"Bc",
      "homePage":"http://biocyc.org",
      "linkOut":"http://biocyc.org/getid?id=$id",
      "example":"ECOLI:CYT-D-UBIOX-CPLX",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biocyc",
      "regex":"^\w+\:[A-Za-z0-9-]+$",
      "fullName":"BioCyc"
   },
   {
      "database":"BioGrid",
      "id":"Bg",
      "homePage":"http://thebiogrid.org/",
      "linkOut":"http://thebiogrid.org/$id",
      "example":"31623",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biogrid",
      "regex":"^\d+$",
      "fullName":"BioGRID"
   },
   {
      "database":"BioModels Database",
      "id":"Bm",
      "homePage":"http://www.ebi.ac.uk/biomodels/",
      "linkOut":"http://www.ebi.ac.uk/biomodels-main/$id",
      "example":"BIOMD0000000048",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biomodels.db",
      "regex":"^((BIOMD|MODEL)\d{10})|(BMID\d{12})$",
      "fullName":"BioModels Database"
   },
   {
      "database":"BioSystems",
      "id":"Bs",
      "homePage":"http://www.ncbi.nlm.nih.gov/biosystems/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/biosystems/$id",
      "example":"1",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biosystems",
      "regex":"^\d+$",
      "fullName":"BioSystems"
   },
   {
      "database":"BRENDA",
      "id":"Br",
      "homePage":"http://www.brenda-enzymes.org/",
      "linkOut":"http://www.brenda-enzymes.org/php/result_flat.php4?ecno=$id",
      "example":"1.1.1.1",
      "dataNodeType":"",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:brenda",
      "regex":"^((\d+\.-\.-\.-)|(\d+\.\d+\.-\.-)|(\d+\.\d+\.\d+\.-)|(\d+\.\d+\.\d+\.\d+))$",
      "fullName":"BRENDA"
   },
   {
      "database":"CAS",
      "id":"Ca",
      "homePage":"http://commonchemistry.org",
      "linkOut":"http://commonchemistry.org/ChemicalDetail.aspx?ref=$id",
      "example":"50-00-0",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:cas",
      "regex":"^\d{1,7}\-\d{2}\-\d$",
      "fullName":"CAS"
   },
   {
      "database":"CCDS",
      "id":"Cc",
      "homePage":"http://identifiers.org/ccds/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=ALLFIELDS&DATA=$id",
      "example":"CCDS33337",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"",
      "regex":"^CCDS\d+\.\d+$",
      "fullName":"Consensus CDS"
   },
   {
      "database":"ChEBI",
      "id":"Ce",
      "homePage":"http://www.ebi.ac.uk/chebi/",
      "linkOut":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=$id",
      "example":"CHEBI:36927",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:obo.chebi",
      "regex":"^CHEBI:\d+$",
      "fullName":"ChEBI"
   },
   {
      "database":"Chemspider",
      "id":"Cs",
      "homePage":"http://www.chemspider.com/",
      "linkOut":"http://www.chemspider.com/Chemical-Structure.$id.html",
      "example":"56586",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:chemspider",
      "regex":"^\d+$",
      "fullName":"ChemSpider"
   },
   {
      "database":"CodeLink",
      "id":"Ge",
      "homePage":"http://www.appliedmicroarrays.com/",
      "linkOut":"",
      "example":"GE86325",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Ge",
      "regex":"",
      "fullName":"CodeLink"
   },
   {
      "database":"Database of Interacting Proteins",
      "id":"Dip",
      "homePage":"http://dip.doe-mbi.ucla.edu/",
      "linkOut":"http://dip.doe-mbi.ucla.edu/dip/DIPview.cgi?ID=$id",
      "example":"DIP-743N",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:dip",
      "regex":"^DIP[\:\-]\d{3}[EN]$",
      "fullName":"Database of Interacting Proteins"
   },
   {
      "database":"dbSNP",
      "id":"Sn",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=snp",
      "linkOut":"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=$id",
      "example":"121909098",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"",
      "regex":"^\d+$",
      "fullName":"dbSNP"
   },
   {
      "database":"DrugBank",
      "id":"Dr",
      "homePage":"http://www.drugbank.ca/",
      "linkOut":"http://www.drugbank.ca/drugs/$id",
      "example":"DB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:drugbank",
      "regex":"^DB\d{5}$",
      "fullName":"DrugBank"
   },
   {
      "database":"EcoCyc",
      "id":"Eco",
      "homePage":"http://ecocyc.org/",
      "linkOut":"http://ecocyc.org/ECOLI/NEW-IMAGE?type=NIL&object=$id",
      "example":"325-BISPHOSPHATE-NUCLEOTIDASE-RXN",
      "dataNodeType":"interaction",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"Eco",
      "regex":"",
      "fullName":"EcoCyc"
   },
   {
      "database":"EcoGene",
      "id":"Ec",
      "homePage":"http://ecogene.org/",
      "linkOut":"http://ecogene.org/geneInfo.php?eg_id=$id",
      "example":"EG10173",
      "dataNodeType":"gene",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"urn:miriam:ecogene",
      "regex":"^EG\d+$",
      "fullName":"EcoGene"
   },
   {
      "database":"EMBL",
      "id":"Em",
      "homePage":"http://www.ebi.ac.uk/embl/",
      "linkOut":"http://www.ebi.ac.uk/ena/data/view/$id",
      "example":"X58356",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ena.embl",
      "regex":"^[A-Z]+[0-9]+$",
      "fullName":"European Nucleotide Archive"
   },
   {
      "database":"Ensembl",
      "id":"En",
      "homePage":"http://www.ensembl.org/",
      "linkOut":"http://www.ensembl.org/id/$id",
      "example":"ENSG00000139618",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ensembl",
      "regex":"^ENS[A-Z]*[FPTG]\d{11}$",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl B. subtilis",
      "id":"EnBs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Bacillus/B_subtilis/Gene/Summary?g=$id",
      "example":"EBBACG00000000013",
      "dataNodeType":"gene",
      "species":"Bacillus subtilis",
      "priority":1,
      "unknown":"EnBs",
      "regex":"EBBACG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl C. elegans",
      "id":"EnCe",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Caenorhabditis_elegans/Gene/Summary?g=$id",
      "example":"Y42H9B.1",
      "dataNodeType":"gene",
      "species":"Caenorhabditis elegans",
      "priority":1,
      "unknown":"EnCe",
      "regex":"",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Chicken",
      "id":"EnGg",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Gallus_gallus/Gene/Summary?g=$id",
      "example":"ENSGALG00000021736",
      "dataNodeType":"gene",
      "species":"Gallus gallus",
      "priority":1,
      "unknown":"EnGg",
      "regex":"ENSGALG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Chimp",
      "id":"EnPt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Pan_troglodytes/Gene/Summary?g=$id",
      "example":"ENSPTRG00000036034",
      "dataNodeType":"gene",
      "species":"Pan troglodytes",
      "priority":1,
      "unknown":"EnPt",
      "regex":"ENSPTRG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Cow",
      "id":"EnBt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Bos_taurus/Gene/Summary?g=$id",
      "example":"ENSBTAG00000043548",
      "dataNodeType":"gene",
      "species":"Bos taurus",
      "priority":1,
      "unknown":"EnBt",
      "regex":"ENSBTAG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Dog",
      "id":"EnCf",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Canis_familiaris/Gene/Summary?g=$id",
      "example":"ENSCAFG00000025860",
      "dataNodeType":"gene",
      "species":"Canis familiaris",
      "priority":1,
      "unknown":"EnCf",
      "regex":"ENSCAFG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl E. coli",
      "id":"EnEc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Escherichia_Shigella/E_coli_K12/Gene/Summary?g=$id",
      "example":"EBESCG00000000010",
      "dataNodeType":"gene",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"EnEc",
      "regex":"EBESCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Fruitfly",
      "id":"EnDm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Drosophila_melanogaster/Gene/Summary?g=$id",
      "example":"FBgn0032956",
      "dataNodeType":"gene",
      "species":"Drosophila melanogaster",
      "priority":1,
      "unknown":"EnDm",
      "regex":"FBgn\d{7}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Horse",
      "id":"EnQc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Equus_caballus/Gene/Summary?g=$id",
      "example":"ENSECAG00000026160",
      "dataNodeType":"gene",
      "species":"Equus caballus",
      "priority":1,
      "unknown":"EnQc",
      "regex":"ENSECAG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Human",
      "id":"EnHs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=$id",
      "example":"ENSG00000139618",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"EnHs",
      "regex":"ENSG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl M. tuberculosis",
      "id":"EnMx",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Mycobacterium/M_tuberculosis_H37Rv/Gene/Summary?g=$id",
      "example":"EBMYCG00000003122",
      "dataNodeType":"gene",
      "species":"Mycobacterium tuberculosis",
      "priority":1,
      "unknown":"EnMx",
      "regex":"EBMYCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Mosquito",
      "id":"EnAg",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Anopheles_gambiae/Gene/Summary?_q=$id",
      "example":"AGAP006864",
      "dataNodeType":"gene",
      "species":"Anopheles gambiae",
      "priority":1,
      "unknown":"EnAg",
      "regex":"AGAP\d{6}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Mouse",
      "id":"EnMm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Mus_musculus/Gene/Summary?g=$id",
      "example":"ENSMUSG00000017167",
      "dataNodeType":"gene",
      "species":"Mus musculus",
      "priority":1,
      "unknown":"EnMm",
      "regex":"ENSMUSG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Pig",
      "id":"EnSs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Sus_scrofa/Gene/Summary?g=$id",
      "example":"ENSSSCG00000004244",
      "dataNodeType":"gene",
      "species":"Sus scrofa",
      "priority":1,
      "unknown":"EnSs",
      "regex":"ENSSSCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Plants",
      "id":"EP",
      "homePage":"http://plants.ensembl.org/",
      "linkOut":"http://plants.ensembl.org/id/$id",
      "example":"AT1G73965",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ensembl.plant",
      "regex":"^\w+$",
      "fullName":"Ensembl Plants"
   },
   {
      "database":"Ensembl Rat",
      "id":"EnRn",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Rattus_norvegicus/Gene/Summary?g=$id",
      "example":"ENSRNOG00000016648",
      "dataNodeType":"gene",
      "species":"Rattus norvegicus",
      "priority":1,
      "unknown":"EnRn",
      "regex":"ENSRNOG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Xenopus",
      "id":"EnXt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Xenopus_tropicalis/Gene/Summary?g=$id",
      "example":"ENSXETG00000029448",
      "dataNodeType":"gene",
      "species":"Xenopus tropicalis",
      "priority":1,
      "unknown":"EnXt",
      "regex":"ENSXETG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Yeast",
      "id":"EnSc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Saccharomyces_cerevisiae/Gene/Summary?g=$id",
      "example":"YGR147C",
      "dataNodeType":"gene",
      "species":"Saccharomyces cerevisiae",
      "priority":1,
      "unknown":"EnSc",
      "regex":"Y[A-Z][RL]\d{3}[WC](?:\-[A-Z])?",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Zebrafish",
      "id":"EnDr",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Danio_rerio/Gene/Summary?g=$id",
      "example":"ENSDARG00000024771",
      "dataNodeType":"gene",
      "species":"Danio rerio",
      "priority":1,
      "unknown":"EnDr",
      "regex":"ENSDARG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Entrez Gene",
      "id":"L",
      "homePage":"http://www.ncbi.nlm.nih.gov/gene",
      "linkOut":"http://www.ncbi.nlm.nih.gov/gene/$id",
      "example":"100010",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ncbigene",
      "regex":"^\d+$",
      "fullName":"Entrez Gene"
   },
   {
      "database":"Enzyme Nomenclature",
      "id":"E",
      "homePage":"http://www.ebi.ac.uk/intenz/",
      "linkOut":"http://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=$id",
      "example":"1.1.1.1",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ec-code",
      "regex":"^\d+\.-\.-\.-|\d+\.\d+\.-\.-|\d+\.\d+\.\d+\.-|\d+\.\d+\.\d+\.(n)?\d+$",
      "fullName":"Enzyme Nomenclature"
   },
   {
      "database":"FlyBase",
      "id":"F",
      "homePage":"http://flybase.org/",
      "linkOut":"http://flybase.org/reports/$id.html",
      "example":"FBgn0011293",
      "dataNodeType":"gene",
      "species":"Drosophila melanogaster",
      "priority":1,
      "unknown":"urn:miriam:flybase",
      "regex":"^FB\w{2}\d{7}$",
      "fullName":"FlyBase"
   },
   {
      "database":"GenBank",
      "id":"G",
      "homePage":"http://www.ncbi.nlm.nih.gov/genbank/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/nuccore/$id",
      "example":"NW_004190323",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"G",
      "regex":"(\w\d{5})|(\w{2}\d{6})|(\w{3}\d{5})",
      "fullName":"GenBank"
   },
   {
      "database":"Gene Wiki",
      "id":"Gw",
      "homePage":"http://en.wikipedia.org/wiki/Portal:Gene_Wiki",
      "linkOut":"http://plugins.biogps.org/cgi-bin/wp.cgi?id=$id",
      "example":"1017",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Gw",
      "regex":"\d+",
      "fullName":"Gene Wiki"
   },
   {
      "database":"GeneOntology",
      "id":"T",
      "homePage":"http://www.ebi.ac.uk/QuickGO/",
      "linkOut":"http://www.ebi.ac.uk/QuickGO/GTerm?id=$id",
      "example":"GO:0006915",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:obo.go",
      "regex":"^GO:\d{7}$",
      "fullName":"Gene Ontology"
   },
   {
      "database":"Gramene Arabidopsis",
      "id":"EnAt",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/Arabidopsis_thaliana/Gene/Summary?g=$id",
      "example":"ATMG01360-TAIR-G",
      "dataNodeType":"gene",
      "species":"Arabidopsis thaliana",
      "priority":1,
      "unknown":"EnAt",
      "regex":"AT[\dCM]G\d{5}\-TAIR\-G",
      "fullName":"Grameen Arabidopsis"
   },
   {
      "database":"Gramene Genes DB",
      "id":"Gg",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/db/genes/search_gene?acc=$id",
      "example":"GR:0060184",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Gg",
      "regex":"GR:\d+",
      "fullName":"Gramene Genes"
   },
   {
      "database":"Gramene Literature",
      "id":"Gl",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/db/literature/pub_search?ref_id=$id",
      "example":"6200",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Gl",
      "regex":"",
      "fullName":"Gramene Literature"
   },
   {
      "database":"Gramene Maize",
      "id":"EnZm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.maizesequence.org/Zea_mays/Gene/Summary?g=$id",
      "example":"GRMZM2G174107",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"EnZm",
      "regex":"",
      "fullName":"Gramene Maize"
   },
   {
      "database":"Gramene Pathway",
      "id":"Gp",
      "homePage":"http://www.gramene.org/pathway",
      "linkOut":"",
      "example":"AAH72400",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"Gp",
      "regex":"",
      "fullName":"Gramene Pathway"
   },
   {
      "database":"Gramene Rice",
      "id":"EnOj",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/Oryza_sativa/Gene/Summary?db=core;g=$id",
      "example":"osa-MIR171a",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"EnOj",
      "regex":"",
      "fullName":"Gramene Rice"
   },
   {
      "database":"HGNC",
      "id":"H",
      "homePage":"http://www.genenames.org",
      "linkOut":"http://www.genenames.org/data/hgnc_data.php?match=$id",
      "example":"DAPK1",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hgnc.symbol",
      "regex":"^[A-Za-z0-9]+",
      "fullName":"HGNC Symbol"
   },
   {
      "database":"HGNC Accession number",
      "id":"Hac",
      "homePage":"http://www.genenames.org",
      "linkOut":"http://www.genenames.org/data/hgnc_data.php?hgnc_id=$id",
      "example":"HGNC:2674",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hgnc",
      "regex":"^(HGNC:)?\d{1,5}$",
      "fullName":"HGNC"
   },
   {
      "database":"HMDB",
      "id":"Ch",
      "homePage":"http://www.hmdb.ca/",
      "linkOut":"http://www.hmdb.ca/metabolites/$id",
      "example":"HMDB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:hmdb",
      "regex":"^HMDB\d{5}$",
      "fullName":"HMDB"
   },
   {
      "database":"HomoloGene",
      "id":"Hg",
      "homePage":"http://www.ncbi.nlm.nih.gov/homologene/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/homologene/$id",
      "example":"1000",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:homologene",
      "regex":"^\d+$",
      "fullName":"HomoloGene"
   },
   {
      "database":"HPRD",
      "id":"Hp",
      "homePage":"http://www.hprd.org/",
      "linkOut":"",
      "example":"",
      "dataNodeType":"interaction",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hprd",
      "regex":"",
      "fullName":"HPRD"
   },
   {
      "database":"Illumina",
      "id":"Il",
      "homePage":"http://www.illumina.com/",
      "linkOut":"",
      "example":"ILMN_5668",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Il",
      "regex":"ILMN_\d+",
      "fullName":"Illumina"
   },
   {
      "database":"IntAct",
      "id":"Ia",
      "homePage":"http://www.ebi.ac.uk/intact/",
      "linkOut":"http://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=$id",
      "example":"EBI-2307691",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:intact",
      "regex":"^EBI\-[0-9]+$",
      "fullName":"IntAct"
   },
   {
      "database":"InterPro",
      "id":"I",
      "homePage":"http://www.ebi.ac.uk/interpro/",
      "linkOut":"http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=$id",
      "example":"IPR000100",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:interpro",
      "regex":"^IPR\d{6}$",
      "fullName":"InterPro"
   },
   {
      "database":"IPI",
      "id":"Ip",
      "homePage":"http://www.ebi.ac.uk/IPI",
      "linkOut":"http://www.ebi.ac.uk/cgi-bin/dbfetch?db=IPI&id=$id&format=default",
      "example":"IPI00000001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ipi",
      "regex":"^IPI\d{8}$",
      "fullName":"IPI"
   },
   {
      "database":"IRGSP Gene",
      "id":"Ir",
      "homePage":"http://rgp.dna.affrc.go.jp/IRGSP/",
      "linkOut":"",
      "example":"Os12g0561000",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Ir",
      "regex":"Os\d{2}g\d+",
      "fullName":"IRGSP Gene"
   },
   {
      "database":"Kegg Compound",
      "id":"Ck",
      "homePage":"http://www.genome.jp/kegg/ligand.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?cpd:$id",
      "example":"C12345",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.compound",
      "regex":"^C\d+$",
      "fullName":"KEGG Compound"
   },
   {
      "database":"KEGG Drug",
      "id":"Kd",
      "homePage":"http://www.genome.jp/kegg/drug/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?dr:$id",
      "example":"D00123",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.drug",
      "regex":"^D\d+$",
      "fullName":"KEGG Drug"
   },
   {
      "database":"KEGG Genes",
      "id":"Kg",
      "homePage":"http://www.genome.jp/kegg/genes.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?$id",
      "example":"syn:ssr3451",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.genes",
      "regex":"^\w+:[\w\d\.-]*$",
      "fullName":"KEGG Genes"
   },
   {
      "database":"KEGG Glycan",
      "id":"Kgl",
      "homePage":"http://www.genome.jp/kegg/glycan/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?gl:$id",
      "example":"G00123",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.glycan",
      "regex":"^G\d+$",
      "fullName":"KEGG Glycan"
   },
   {
      "database":"KEGG Pathway",
      "id":"Kp",
      "homePage":"http://www.genome.jp/kegg/pathway.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?pathway+$id",
      "example":"hsa00620",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.pathway",
      "regex":"^\w{2,4}\d{5}$",
      "fullName":"KEGG Pathway"
   },
   {
      "database":"KEGG Reaction",
      "id":"Kr",
      "homePage":"http://www.genome.jp/kegg/reaction/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?rn:$id",
      "example":"R00100",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.reaction",
      "regex":"^R\d+$",
      "fullName":"KEGG Reaction"
   },
   {
      "database":"LIPID MAPS",
      "id":"Lm",
      "homePage":"http://www.lipidmaps.org",
      "linkOut":"http://www.lipidmaps.org/data/get_lm_lipids_dbgif.php?LM_ID=$id",
      "example":"LMPR0102010012",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:lipidmaps",
      "regex":"^LM(FA|GL|GP|SP|ST|PR|SL|PK)[0-9]{4}([0-9a-zA-Z]{4,6})?$",
      "fullName":"LIPID MAPS"
   },
   {
      "database":"LipidBank",
      "id":"Lb",
      "homePage":"http://lipidbank.jp/index.html",
      "linkOut":"http://lipidbank.jp/cgi-bin/detail.cgi?id=$id",
      "example":"BBA0001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:lipidbank",
      "regex":"^\w+\d+$",
      "fullName":"LipidBank"
   },
   {
      "database":"MACiE",
      "id":"Ma",
      "homePage":"http://www.ebi.ac.uk/thornton-srv/databases/MACiE/index.html",
      "linkOut":"http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/MACiE/entry/getPage.pl?id=$id",
      "example":"M0001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:macie",
      "regex":"^M\d{4}$",
      "fullName":"MACiE"
   },
   {
      "database":"MaizeGDB",
      "id":"Mg",
      "homePage":"",
      "linkOut":"http://www.maizegdb.org/cgi-bin/displaylocusresults.cgi?term=$id",
      "example":"acc1",
      "dataNodeType":"gene",
      "species":"Zea mays",
      "priority":1,
      "unknown":"Mg",
      "regex":"",
      "fullName":"MaizeGDB"
   },
   {
      "database":"MatrixDB",
      "id":"Md",
      "homePage":"http://matrixdb.ibcp.fr/",
      "linkOut":"http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=$id&class=Association",
      "example":"P00747_P07355",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:matrixdb.association",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])_.*|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9]_.*)|(GAG_.*)|(MULT_.*)|(PFRAG_.*)|(LIP_.*)|(CAT_.*)$",
      "fullName":"MatrixDB"
   },
   {
      "database":"MetaCyc",
      "id":"Mc",
      "homePage":"http://www.metacyc.org/",
      "linkOut":"http://www.metacyc.org/META/NEW-IMAGE?type=NIL&object=$id",
      "example":"D-GLUTAMATE-OXIDASE-RXN",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"Mc",
      "regex":"",
      "fullName":"MetaCyc"
   },
   {
      "database":"MGI",
      "id":"M",
      "homePage":"http://www.informatics.jax.org/",
      "linkOut":"http://www.informatics.jax.org/marker/$id",
      "example":"MGI:2442292",
      "dataNodeType":"gene",
      "species":"Mus musculus",
      "priority":1,
      "unknown":"urn:miriam:mgd",
      "regex":"^MGI:\d+$",
      "fullName":"Mouse Genome Database"
   },
   {
      "database":"MINT",
      "id":"Mi",
      "homePage":"http://mint.bio.uniroma2.it/mint/",
      "linkOut":"http://mint.bio.uniroma2.it/mint/search/inFrameInteraction.do?interactionAc=$id",
      "example":"MINT-10000",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mint",
      "regex":"^MINT\-\d{1,5}$",
      "fullName":"MINT"
   },
   {
      "database":"miRBase mature sequence",
      "id":"Mbm",
      "homePage":"http://www.mirbase.org/",
      "linkOut":"http://www.mirbase.org/cgi-bin/mature.pl?mature_acc=$id",
      "example":"MIMAT0000001",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mirbase.mature",
      "regex":"MIMAT\d{7}",
      "fullName":"miRBase mature sequence"
   },
   {
      "database":"miRBase Sequence",
      "id":"Mb",
      "homePage":"http://microrna.sanger.ac.uk/",
      "linkOut":"http://microrna.sanger.ac.uk/cgi-bin/sequences/mirna_entry.pl?acc=$id",
      "example":"MI0000001",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mirbase",
      "regex":"MI\d{7}",
      "fullName":"miRBase Sequence"
   },
   {
      "database":"NASC Gene",
      "id":"N",
      "homePage":"http://arabidopsis.info/",
      "linkOut":"",
      "example":"ATMG00960-TAIR-G",
      "dataNodeType":"gene",
      "species":"Arabidopsis thaliana",
      "priority":1,
      "unknown":"N",
      "regex":"AT[\dCM]G\d{5}\-TAIR\-G",
      "fullName":"NASC Gene"
   },
   {
      "database":"NCBI Protein",
      "id":"Np",
      "homePage":"http://www.ncbi.nlm.nih.gov/protein",
      "linkOut":"http://www.ncbi.nlm.nih.gov/protein/$id",
      "example":"CAA71118.1",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ncbiprotein",
      "regex":"^\w+\d+(\.\d+)?$",
      "fullName":"NCBI Protein"
   },
   {
      "database":"NCI Pathway Interaction Database",
      "id":"Pid",
      "homePage":"http://pid.nci.nih.gov/",
      "linkOut":"http://pid.nci.nih.gov/search/pathway_landing.shtml?what=graphic&jpg=on&pathway_id=$id",
      "example":"pi3kcipathway",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pid.pathway",
      "regex":"^\w+$",
      "fullName":"NCI Pathway Interaction Database"
   },
   {
      "database":"NuGO wiki",
      "id":"Nw",
      "homePage":"http://wiki.nugo.org",
      "linkOut":"http://wiki.nugo.org/index.php/$id",
      "example":"HMDB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":0,
      "unknown":"Nw",
      "regex":"",
      "fullName":"NuGO wiki"
   },
   {
      "database":"OMIM",
      "id":"Om",
      "homePage":"http://omim.org/",
      "linkOut":"http://omim.org/entry/$id",
      "example":"603903",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:omim",
      "regex":"^[*#+%^]?\d{6}$",
      "fullName":"OMIM"
   },
   {
      "database":"Oryzabase",
      "id":"Ob",
      "homePage":"http://www.shigen.nig.ac.jp/rice/oryzabase",
      "linkOut":"http://www.shigen.nig.ac.jp/rice/oryzabase/gateway/gatewayAction.do?target=symbol&id=$id",
      "example":"468",
      "dataNodeType":"gene",
      "species":"Oryza sativa",
      "priority":1,
      "unknown":"Ob",
      "regex":"",
      "fullName":"Oryzabase"
   },
   {
      "database":"Other",
      "id":"O",
      "homePage":"",
      "linkOut":"",
      "example":"",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"O",
      "regex":"",
      "fullName":"Other"
   },
   {
      "database":"Pathway Commons",
      "id":"Pc",
      "homePage":"http://www.pathwaycommons.org/pc/",
      "linkOut":"http://www.pathwaycommons.org/pc/record2.do?id=$id",
      "example":"485991",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pathwaycommons",
      "regex":"^\d+$",
      "fullName":"Pathway Commons"
   },
   {
      "database":"PDB",
      "id":"Pd",
      "homePage":"http://www.pdb.org/",
      "linkOut":"http://www.rcsb.org/pdb/explore/explore.do?structureId=$id",
      "example":"2gc4",
      "dataNodeType":"protein",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:pdb",
      "regex":"^[0-9][A-Za-z0-9]{3}$",
      "fullName":"Protein Data Bank"
   },
   {
      "database":"Pfam",
      "id":"Pf",
      "homePage":"http://pfam.sanger.ac.uk/",
      "linkOut":"http://pfam.sanger.ac.uk/family/$id/",
      "example":"PF01234",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pfam",
      "regex":"^PF\d{5}$",
      "fullName":"Pfam"
   },
   {
      "database":"PharmGKB Drug",
      "id":"Pgd",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/drug/$id",
      "example":"PA448710",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.drug",
      "regex":"^PA\d+$",
      "fullName":"PharmGKB Drug"
   },
   {
      "database":"PharmGKB Gene",
      "id":"Pgg",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/gene/$id",
      "example":"PA131",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.gene",
      "regex":"^PA\w+$",
      "fullName":"PharmGKB Gene"
   },
   {
      "database":"PharmGKB Pathways",
      "id":"Pgp",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/pathway/$id",
      "example":"PA146123006",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.pathways",
      "regex":"^PA\d+$",
      "fullName":"PharmGKB Pathways"
   },
   {
      "database":"PhosphoSite Protein",
      "id":"Pp",
      "homePage":"http://www.phosphosite.org/homeAction.do",
      "linkOut":"http://www.phosphosite.org/proteinAction.do?id=$id",
      "example":"12300",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:phosphosite.protein",
      "regex":"^\d{5}$",
      "fullName":"PhosphoSite Protein"
   },
   {
      "database":"PINA",
      "id":"Pi",
      "homePage":"http://cbg.garvan.unsw.edu.au/pina/",
      "linkOut":"http://cbg.garvan.unsw.edu.au/pina/interactome.oneP.do?ac=$id&showExtend=null",
      "example":"Q13485",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pina",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])$",
      "fullName":"PINA"
   },
   {
      "database":"PlantGDB",
      "id":"Pl",
      "homePage":"http://www.plantgdb.org/",
      "linkOut":"",
      "example":"PUT-157a-Vitis_vinifera-37378",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Pl",
      "regex":"PUT-[\w\d-]+",
      "fullName":"PlantGDB"
   },
   {
      "database":"PubChem-bioassay",
      "id":"Cpb",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=pcassay ",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/assay/assay.cgi?aid=$id",
      "example":"1018",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.bioassay",
      "regex":"^\d+$",
      "fullName":"PubChem-bioassay"
   },
   {
      "database":"PubChem-compound",
      "id":"Cpc",
      "homePage":"http://pubchem.ncbi.nlm.nih.gov/",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?cid=$id",
      "example":"100101",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.compound",
      "regex":"^\d+$",
      "fullName":"PubChem-compound"
   },
   {
      "database":"PubChem-substance",
      "id":"Cps",
      "homePage":"http://pubchem.ncbi.nlm.nih.gov/",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?sid=$id",
      "example":"100101",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.substance",
      "regex":"^\d+$",
      "fullName":"PubChem-substance"
   },
   {
      "database":"Reactome",
      "id":"Re",
      "homePage":"http://www.reactome.org/",
      "linkOut":"http://www.reactome.org/cgi-bin/eventbrowser_st_id?FROM_REACTOME=1&ST_ID=$id",
      "example":"REACT_1590",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:reactome",
      "regex":"^REACT_\d+(\.\d+)?$",
      "fullName":"Reactome"
   },
   {
      "database":"RefSeq",
      "id":"Q",
      "homePage":"http://www.ncbi.nlm.nih.gov/projects/RefSeq/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/entrez/viewer.fcgi?val=$id",
      "example":"NP_012345",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:refseq",
      "regex":"^(NC|AC|NG|NT|NW|NZ|NM|NR|XM|XR|NP|AP|XP|ZP)_\d+$",
      "fullName":"RefSeq"
   },
   {
      "database":"RESID",
      "id":"Res",
      "homePage":"http://www.ebi.ac.uk/RESID/",
      "linkOut":"http://srs.ebi.ac.uk/srsbin/cgi-bin/wgetz?-id+6JSUg1NA6u4+-e+[RESID:'$id']",
      "example":"AA0001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:resid",
      "regex":"^AA\d{4}$",
      "fullName":"RESID"
   },
   {
      "database":"Rfam",
      "id":"Rf",
      "homePage":"",
      "linkOut":"http://www.sanger.ac.uk/cgi-bin/Rfam/getacc?$id",
      "example":"RF00066",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Rf",
      "regex":"RF\d+",
      "fullName":"RFAM"
   },
   {
      "database":"RGD",
      "id":"R",
      "homePage":"http://rgd.mcw.edu/",
      "linkOut":"http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=$id",
      "example":"2018",
      "dataNodeType":"gene",
      "species":"Rattus norvegicus",
      "priority":1,
      "unknown":"urn:miriam:rgd",
      "regex":"^\d{4,7}$",
      "fullName":"Rat Genome Database"
   },
   {
      "database":"Rhea",
      "id":"Rh",
      "homePage":"http://www.ebi.ac.uk/rhea/",
      "linkOut":"http://www.ebi.ac.uk/rhea/reaction.xhtml?id=$id",
      "example":"12345",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:rhea",
      "regex":"^\d{5}$",
      "fullName":"Rhea"
   },
   {
      "database":"Rice Ensembl Gene",
      "id":"Os",
      "homePage":"http://www.gramene.org/Oryza_sativa",
      "linkOut":"http://www.gramene.org/Oryza_sativa/geneview?gene=$id",
      "example":"LOC_Os04g54800",
      "dataNodeType":"gene",
      "species":"Oryza sativa",
      "priority":1,
      "unknown":"Os",
      "regex":"",
      "fullName":"Rice Ensembl Gene"
   },
   {
      "database":"SGD",
      "id":"D",
      "homePage":"http://www.yeastgenome.org/",
      "linkOut":"http://www.yeastgenome.org/cgi-bin/locus.fpl?dbid=$id",
      "example":"S000028457",
      "dataNodeType":"gene",
      "species":"Saccharomyces cerevisiae",
      "priority":1,
      "unknown":"urn:miriam:sgd",
      "regex":"^S\d+$",
      "fullName":"SGD"
   },
   {
      "database":"Small Molecule Pathway Database",
      "id":"Sm",
      "homePage":"http://www.smpdb.ca/pathways",
      "linkOut":"http://pathman.smpdb.ca/pathways/$id/pathway",
      "example":"SMP00001",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:smpdb",
      "regex":"^SMP\d{5}$",
      "fullName":"Small Molecule Pathway Database"
   },
   {
      "database":"SMART",
      "id":"Sma",
      "homePage":"http://smart.embl-heidelberg.de/",
      "linkOut":"http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=$id",
      "example":"SM00015",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:smart",
      "regex":"^SM\d{5}$",
      "fullName":"SMART"
   },
   {
      "database":"SPIKE",
      "id":"Sk",
      "homePage":"http://www.cs.tau.ac.il/~spike/",
      "linkOut":"http://www.cs.tau.ac.il/~spike/maps/$id.html",
      "example":"spike00001",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:spike.map",
      "regex":"^spike\d{5}$",
      "fullName":"SPIKE Map"
   },
   {
      "database":"SPRINT",
      "id":"Spr",
      "homePage":"http://www.bioinf.manchester.ac.uk/dbbrowser/sprint/",
      "linkOut":"http://www.bioinf.manchester.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?prints_accn=$id&display_opts=Prints&category=None&queryform=false&regexpr=off",
      "example":"PR00001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:sprint",
      "regex":"^PR\d{5}$",
      "fullName":"SPRINT"
   },
   {
      "database":"STRING",
      "id":"Str",
      "homePage":"http://string.embl.de/",
      "linkOut":"http://string.embl.de/interactions/$id",
      "example":"P53350",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:string",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])|([0-9][A-Za-z0-9]{3})$",
      "fullName":"STRING"
   },
   {
      "database":"SubstrateDB",
      "id":"Sdb",
      "homePage":"http://substrate.burnham.org/",
      "linkOut":"http://substrate.burnham.org/protein/annotation/$id/html",
      "example":"1915",
      "dataNodeType":"protein",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:pmap.substratedb",
      "regex":"^\d+$",
      "fullName":"SubstrateDB"
   },
   {
      "database":"SubtiWiki",
      "id":"Sw",
      "homePage":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/Main_Page",
      "linkOut":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/$id",
      "example":"BSU29180",
      "dataNodeType":"gene",
      "species":"Bacillus subtilis",
      "priority":1,
      "unknown":"urn:miriam:subtiwiki",
      "regex":"^BSU\d{5}$",
      "fullName":"SubtiWiki"
   },
   {
      "database":"SUPFAM",
      "id":"Sf",
      "homePage":"http://supfam.org/SUPERFAMILY/",
      "linkOut":"http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=$id",
      "example":"SSF57615",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:supfam",
      "regex":"^\w+$",
      "fullName":"SUPFAM"
   },
   {
      "database":"SWISS-MODEL",
      "id":"Sw",
      "homePage":"http://swissmodel.expasy.org/",
      "linkOut":"http://swissmodel.expasy.org/repository/smr.php?sptr_ac=$id",
      "example":"P23298",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:swiss-model",
      "regex":"^\w+$",
      "fullName":"SWISS-MODEL"
   },
   {
      "database":"Systems Biology Ontology",
      "id":"Sbo",
      "homePage":"http://www.ebi.ac.uk/sbo/",
      "linkOut":"http://www.ebi.ac.uk/sbo/main/$id",
      "example":"SBO:0000262",
      "dataNodeType":"ontology",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biomodels.sbo",
      "regex":"^SBO:\d{7}$",
      "fullName":"Systems Biology Ontology"
   },
   {
      "database":"TAIR",
      "id":"A",
      "homePage":"http://arabidopsis.org/index.jsp",
      "linkOut":"http://arabidopsis.org/servlets/TairObject?type=locus&name=$id",
      "example":"AT1G01030",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:tair.locus",
      "regex":"^AT[1-5]G\d{5}$",
      "fullName":"TAIR Locus"
   },
   {
      "database":"TIGR",
      "id":"Ti",
      "homePage":"http://www.jcvi.org/",
      "linkOut":"",
      "example":"12012.t00308",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Ti",
      "regex":"",
      "fullName":"TIGR"
   },
   {
      "database":"TTD Drug",
      "id":"Td",
      "homePage":"http://bidd.nus.edu.sg/group/cjttd/TTD_HOME.asp",
      "linkOut":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDRUG.asp?ID=$id",
      "example":"DAP000773",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ttd.drug",
      "regex":"^DAP\d+$",
      "fullName":"TTD Drug"
   },
   {
      "database":"TTD Target",
      "id":"Tt",
      "homePage":"http://bidd.nus.edu.sg/group/cjttd/TTD_HOME.asp",
      "linkOut":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDetail.asp?ID=$id",
      "example":"TTDS00056",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ttd.target",
      "regex":"^TTDS\d+$",
      "fullName":"TTD Target"
   },
   {
      "database":"TubercuList",
      "id":"Tb",
      "homePage":"http://tuberculist.epfl.ch",
      "linkOut":"http://tuberculist.epfl.ch/quicksearch.php?gene+name=$id",
      "example":"Rv0064",
      "dataNodeType":"gene",
      "species":"Mycobacterium tuberculosis",
      "priority":1,
      "unknown":"Tb",
      "regex":"Rv\d{4}(A|B|c|\.\d)?",
      "fullName":"TubercuList"
   },
   {
      "database":"UCSC Genome Browser",
      "id":"Uc",
      "homePage":"http://genome.ucsc.edu/",
      "linkOut":"http://genome.ucsc.edu/cgi-bin/hgTracks?position=$id",
      "example":"uc001tyh.1",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Uc",
      "regex":"uc\d{3}[a-z]{3}\.\d",
      "fullName":"UCSC Genome Browser"
   },
   {
      "database":"UniGene",
      "id":"U",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=unigene",
      "linkOut":"http://www.ncbi.nlm.nih.gov/UniGene/clust.cgi?UGID=1548618&SEARCH=$id",
      "example":"Hs.553708",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"U",
      "regex":"[A-Z][a-z][a-z]?\.\d+",
      "fullName":"UniGene"
   },
   {
      "database":"Unipathway",
      "id":"Up",
      "homePage":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway",
      "linkOut":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway/upa?upid=$id",
      "example":"UPA00206",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:unipathway",
      "regex":"^UPA\d{5}$",
      "fullName":"Unipathway"
   },
   {
      "database":"Uniprot-TrEMBL",
      "id":"S",
      "homePage":"http://www.uniprot.org/",
      "linkOut":"http://www.uniprot.org/uniprot/$id",
      "example":"P62158",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:uniprot",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])|($",
      "fullName":"UniProtKB/TrEMBL"
   },
   {
      "database":"Uniprot-SwissProt",
      "id":"Sp",
      "homePage":"http://www.uniprot.org/",
      "linkOut":"http://www.uniprot.org/uniprot/$id",
      "example":"CALM_HUMAN",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"Sp",
      "regex":"^[A-Z0-9]+_[A-Z]+$",
      "fullName":"UniProtKB/Swiss-Prot"
   },
   {
      "database":"Wheat gene names",
      "id":"Wn",
      "homePage":"http://wheat.pw.usda.gov/",
      "linkOut":"http://wheat.pw.usda.gov/report?class=gene;name=$id",
      "example":"5S-Rrna-D1_(Triticum)",
      "dataNodeType":"gene",
      "species":"Triticum aestivum",
      "priority":1,
      "unknown":"Wn",
      "regex":"",
      "fullName":"Wheat gene names"
   },
   {
      "database":"Wheat gene refs",
      "id":"Wr",
      "homePage":"http://wheat.pw.usda.gov/",
      "linkOut":"http://wheat.pw.usda.gov/cgi-bin/graingenes/report.cgi?class=reference&name=$id",
      "example":"WGS-95-1333",
      "dataNodeType":"probe",
      "species":"Triticum aestivum",
      "priority":0,
      "unknown":"Wr",
      "regex":"",
      "fullName":"Wheat gene refs"
   },
   {
      "database":"WikiGenes",
      "id":"Wg",
      "homePage":"http://www.wikigenes.org/",
      "linkOut":"http://www.wikigenes.org/e/gene/e/$id.html",
      "example":"7157",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Wg",
      "regex":"",
      "fullName":"WikiGenes"
   },
   {
      "database":"WikiPathways",
      "id":"Wp",
      "homePage":"http://www.wikipathways.org/",
      "linkOut":"http://www.wikipathways.org/index.php/Pathway:$id",
      "example":"WP100",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:wikipathways",
      "regex":"WP\d{1,5}",
      "fullName":"WikiPathways"
   },
   {
      "database":"Wikipedia",
      "id":"Wi",
      "homePage":"http://www.wikipedia.org",
      "linkOut":"http://en.wikipedia.org/wiki/$id",
      "example":"Acetate",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":0,
      "unknown":"Wi",
      "regex":"",
      "fullName":"Wikipedia"
   },
   {
      "database":"WormBase",
      "id":"W",
      "homePage":"http://www.wormbase.org/",
      "linkOut":"http://www.wormbase.org/db/gene/gene?name=$id;class=Gene",
      "example":"WBGene00000001",
      "dataNodeType":"gene",
      "species":"Caenorhabditis elegans",
      "priority":1,
      "unknown":"urn:miriam:wormbase",
      "regex":"^WBGene\d{8}$",
      "fullName":"WormBase"
   },
   {
      "database":"ZFIN",
      "id":"Z",
      "homePage":"http://zfin.org",
      "linkOut":"http://zfin.org/action/marker/view/$id",
      "example":"ZDB-GENE-041118-11",
      "dataNodeType":"gene",
      "species":"Danio rerio",
      "priority":1,
      "unknown":"urn:miriam:zfin",
      "regex":"ZDB\-GENE\-\d+\-\d+",
      "fullName":"ZFIN Gene"
   }
];
;

pathvisio.pathway.xRef = function(){

    function getData(species, database, id, callback) {
      var databaseId = pathvisio.pathway.dataSources.filter(function(element) {return element.database === database;})[0].id;
      var url = '../../remote-data-sources/php/bridgedb.php?species=' + encodeURIComponent(species) + '&database=' + encodeURIComponent(databaseId) + '&id=' + encodeURIComponent(id);
      $.ajax({
        url: url,
        dataType: "text",
        success: function(data) {callback(data);}
      });
    }

    function displayData(organism, node) {
      self.node = node;
      var xRefData = getData(organism, node.xRef.database, node.xRef.id, function(data) {
        var parser = CSVParser.parse(data, true, ' ', false, false, '.');
        var parsed = DataGridRenderer.json(parser.dataGrid, parser.headerNames, parser.headerTypes,'\t','\n');
        var xRefDataParsed = self.xRefDataParsed = JSON.parse(parsed);

        var idsByDatabase = xRefDataParsed;
        var feature = {};
        idsByDatabase.ids = [];
        var features = [];
        xRefDataParsed.forEach(function(xRefForEach, index, array) {
          feature.database = xRefForEach.database;
          feature.ids = [];
          if (features.filter(function(featureFilter) {return featureFilter.database === xRefForEach.database;}).length === 0) {
            array.filter(function(xRefFilter) {
              return xRefFilter.database === xRefForEach.database;}).forEach(function(element) {
                feature.ids.push(element.id);
              });
            features.push({'database':xRefForEach.database, 'ids': feature.ids});
          }
        });

        features.forEach(function(feature) {
          try {
            var dataSource = pathvisio.pathway.dataSources.filter(function(dataSource) {return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == feature.database.replace(/[^a-z0-9]/gi,'').toLowerCase(); })[0];
            feature.dataSourceId = dataSource.id;
            feature.linkOut = dataSource.linkOut;
            feature.priority = dataSource.priority;
          }
          catch (e) {
            console.warn(e);
            console.warn('Error: No database found for external reference database "' + feature.database + '".');
          }
        });

        features.sort(function(a, b) {
            if (a.priority === b.priority)
            {
                var x = a.database.toLowerCase(), y = b.database.toLowerCase();
                
                return x < y ? -1 : x > y ? 1 : 0;
            }
            return b.priority - a.priority;
        });

        var specifiedFeature = features.filter(function(element) {return (element.database == node.xRef.database);})[0];
        var currentFeatureIndex = features.indexOf(specifiedFeature);

        var specifiedXRefId = specifiedFeature.ids.filter(function(element) {return (element == node.xRef.id);})[0];
        var currentXRefIdIndex = specifiedFeature.ids.indexOf(specifiedXRefId);

        features = pathvisio.helpers.moveArrayItem(features, currentFeatureIndex, 0);
        specifiedFeature.ids = pathvisio.helpers.moveArrayItem(specifiedFeature.ids, currentXRefIdIndex, 0);

        var detailsFrame = d3.select('#details-frame');
        //.attr('style', 'visibility:visible');
        
        detailsFrame.selectAll('*').remove();

        var detailsHeader = detailsFrame.append('header')
        .attr('class', 'data-node-label');

        var detailsPullLeftSpan = detailsHeader.append('span')
        .attr('class', 'pull-left');
        var detailsMoveSpan = detailsPullLeftSpan.append('span')
        .attr('class', 'header-move');
        var detailsMoveIcon = detailsMoveSpan.append('i')
        .attr('class', 'icon-move')
        .attr('style', 'color:#aaa');

        var detailsHeaderLabelSpan = detailsHeader.append('span')
        .attr('style', 'font-size: 120%;')
        .text(function(d) {return node.textLabel.text + ' ';});
        
        var detailsSearchSpan = detailsHeaderLabelSpan.append('span')
        .attr('class', 'header-search')
        .attr('title', function(d) {return 'Search for pathways containing ' + node.textLabel.text; });
        var detailsSearchLink = detailsSearchSpan.append('a')
        .attr('href', function(d) {
          return 'http://wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&ids=' + node.xRef.id + '&codes=' + pathvisio.pathway.dataSources.filter(function(dataSource) {
            return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == node.xRef.database.replace(/[^a-z0-9]/gi,'').toLowerCase();
          })[0].id + '&type=xref';
        });
        var detailsSearchIcon = detailsSearchLink.append('i')
        .attr('class', 'icon-search')
        .attr('style', 'color:blue; font-size:50%');
        
        var detailsPullRightSpan = detailsHeader.append('span')
        .attr('class', 'pull-right');
        var detailsCloseSpan = detailsPullRightSpan.append('span')
        .attr('class', 'header-close')
        .on("click", function(d, i){
          detailsFrame.selectAll('*').remove();
          detailsFrame[0][0].style.visibility = 'hidden';
        });
        var detailsCloseIcon = detailsCloseSpan.append('i')
        .attr('class', 'icon-remove')
        .attr('style', 'color:#aaa; font-size:120%');

        var dataNodeTypeDiv = detailsHeader.append('div')
        .attr('class', 'data-node-description');
        var dataNodeType = dataNodeTypeDiv.append('h2')
        .text(node.dataNodeType);
        
        var detailsList = detailsFrame.append('ul')
        .attr('class', 'data-node');

        var detailsListItems = detailsList.selectAll('li')
        .data(features)
        .enter()
        .append('li');

        /*
        [{'database':'a','ids':[1,2,3]},{'database':'b','ids':[1,2,3]}]
        <li><span class='feature-title'></span><span class='feature-item'></span></li>
        features[element.database] = [element.id];
        */

        detailsListItems[0].forEach(function(detailsListItem) {
          var featureTitle = d3.select(detailsListItem).append('span')
          .attr('class', 'feature-title')
          .text(function(d) {return d.database + ': ';});
          
          var linkOuts = d3.select(detailsListItem).selectAll('a')
          .data(function(d) {
            var featuresFilled = [];
            d.ids.forEach(function(id) {
              var linkOut = d.linkOut.replace('$id', id);
              featuresFilled.push({'id':id, 'linkOut':linkOut});
            });
            return featuresFilled;
          })
          .enter()
          .append('a')
          .attr('href', function(d) {return d.linkOut;});
          
          var featureText = linkOuts.append('span')
          .attr('class', 'feature-text')
          .attr('style', function(d) {
            if (!!d.linkOut) {
              return '';
            }
            else {
              return 'color: #696969;';
            }
          })
          .text(function(d) {return ' ' + d.id;});
        });

        detailsFrame[0][0].style.visibility = 'visible';

      });
    }

    return {
      getData:getData,
      displayData:displayData,
    };
}();
