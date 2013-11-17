pathvisiojs.data.gpml = function(){
    
  var jsonPathway = {};

  function toRenderableJson(gpml, callback){
    self.gpml = gpml;
    
    var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var gpmlNamespace = null;
    try {
      gpmlNamespace = self.gpmlNamespace = gpmlPathway.attr('xmlns');
    }
    catch (e) {
      console.log(e.message);
      return;
    }

    // test for whether file is GPML

    if ( pathvisiojs.data.gpml.namespaces.indexOf(gpmlNamespace) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(gpmlNamespace) !== 0) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + gpmlNamespace + "). Please convert to the supported version of GPML (xmlns: " + pathvisiojs.data.gpml.namespaces[0] + ").");
      }

      jsonPathway.metadata = {};
      jsonPathway.metadata.boardWidth = parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth'));
      jsonPathway.metadata.boardHeight = parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'));
      jsonPathway.metadata.name = d3.select(gpml).select('Pathway').attr('Name');
      jsonPathway.metadata.xmlns = d3.select(gpml).select('Pathway').attr('xmlns');
      jsonPathway.metadata.organism = d3.select(gpml).select('Pathway').attr('Organism');
      

      /*

      // infoBox
      // These values are a legacy from GenMAPP. They are always forced to be equal to 0 in PathVisio (Java) so as to place the infobox in the upper lefthand corner.

      pathway.infoBox.x = 0;
      delete pathway.infoBox.centerX;
      pathway.infoBox.y = 0;
      delete pathway.infoBox.centerY;
//*/



    async.parallel({
      jsonAnchorsFromEdges: function(callback) {
        var gpmlAnchors = gpmlPathway.selectAll('Anchor');
        var jsonAnchors;
        if (gpmlAnchors.length > 0) {
          jsonAnchors = [];
          gpmlAnchors.each(function() {
            pathvisiojs.data.gpml.anchor.getFromEdge(d3.select(this), function(renderableElement) {
              jsonAnchors.push(renderableElement);
            });
          });
          callback(null,jsonAnchors);
        }
        else {
          callback(null);
        }
      },
      elementsFromDataNodes: function(callback) {
        var gpmlDataNodes = gpmlPathway.selectAll('DataNode');
        var results = {};
        var elements = [];
        if (gpmlDataNodes.length > 0) {
          jsonDataNodes = [];
          jsonAnchors = [];
          gpmlDataNodes.each(function() {
            pathvisiojs.data.gpml.dataNode.toRenderableJson(d3.select(this), function(jsonDataNode, jsonAnchorsFromLastDataNode) {
              jsonDataNodes.push(jsonDataNode);
              jsonAnchors = jsonAnchors.concat(jsonAnchorsFromLastDataNode);
            });
          });
          elements = jsonAnchors.concat(jsonDataNodes);
          callback(null, elements);
        }
        else {
          callback(null);
        }
      },
      next: function(callback){
        callback(null);
      }
    },
    function(err, results){
      self.results = results;
      jsonPathway.elements = results.jsonAnchorsFromEdges.concat(results.elementsFromDataNodes);

      var gpmlGraphicalLines = gpmlPathway.selectAll('GraphicalLine');
      var jsonGraphicalLines = [];
      if (gpmlGraphicalLines.length > 0) {
        gpmlGraphicalLines.each(function() {
          pathvisiojs.data.gpml.graphicalLine.toRenderableJson(d3.select(this), function(jsonGraphicalLine) {
            jsonGraphicalLines.push(jsonGraphicalLine);
          });
        });
        jsonPathway.elements = jsonPathway.elements.concat(jsonGraphicalLines);
      }

      var gpmlInteractions = gpmlPathway.selectAll('Interaction');
      var jsonInteractions = [];
      if (gpmlInteractions.length > 0) {
        gpmlInteractions.each(function() {
          pathvisiojs.data.gpml.interaction.toRenderableJson(d3.select(this), function(jsonInteraction) {
            jsonInteractions.push(jsonInteraction);
          });
        });
        jsonPathway.elements = jsonPathway.elements.concat(jsonInteractions);
      }

      self.pathway = jsonPathway;
      callback(jsonPathway);
    })

/*
      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = pathvisiojs.utilities.convertToArray( pathway.comment );
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
          pathway.groups = pathvisiojs.utilities.convertToArray( pathway.group );
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
          var graphicalLines = pathvisiojs.utilities.convertToArray( pathway.graphicalLine );
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
          var interactions = pathvisiojs.utilities.convertToArray( pathway.interaction );
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
          pathway.edges = pathvisiojs.pathway.edge.gpml2json(pathway.edges);
        }
        else {
          console.log("No element(s) named 'edges' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting edges to json: " + e.message);
      }

      //*/
    }
    else {
      alert("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.");
      console.log("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.");
      return;
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
