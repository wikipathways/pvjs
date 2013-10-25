pathvisio.converter.gpml = function(){
    
  var jsonPathway = {};
  jsonPathway.nodes = [];
  jsonPathway.edges = [];

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

    if ( pathvisio.converter.gpml.namespaces.indexOf(gpmlNamespace) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisio.js).

      if (pathvisio.converter.gpml.namespaces.indexOf(gpmlNamespace) !== 0) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + gpmlNamespace + "). Please convert to the supported version of GPML (xmlns: " + pathvisio.converter.gpml.namespaces[0] + ").");
      }

      jsonPathway.boardWidth = parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth'));
      jsonPathway.boardHeight = parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'));

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
            pathvisio.converter.gpml.anchor.getFromEdge(d3.select(this), function(renderableElement) {
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
            pathvisio.converter.gpml.dataNode.toRenderableJson(d3.select(this), function(jsonDataNode, jsonAnchorsFromLastDataNode) {
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
      var pathway = {};
      pathway.metadata = {};
      pathway.elements = results.jsonAnchorsFromEdges.concat(results.elementsFromDataNodes);

      var gpmlGraphicalLines = gpmlPathway.selectAll('GraphicalLine');
      var jsonGraphicalLines = [];
      if (gpmlGraphicalLines.length > 0) {
        gpmlGraphicalLines.each(function() {
          pathvisio.converter.gpml.graphicalLine.toRenderableJson(d3.select(this), function(jsonGraphicalLine) {
            jsonGraphicalLines.push(jsonGraphicalLine);
          });
        });
        pathway.elements = pathway.elements.concat(jsonGraphicalLines);
      }

      var gpmlInteractions = gpmlPathway.selectAll('Interaction');
      var jsonInteractions = [];
      if (gpmlInteractions.length > 0) {
        gpmlInteractions.each(function() {
          pathvisio.converter.gpml.interaction.toRenderableJson(d3.select(this), function(jsonInteraction) {
            jsonInteractions.push(jsonInteraction);
          });
        });
        pathway.elements = pathway.elements.concat(jsonInteractions);
      }

      self.p = pathway;
      callback(pathway);
    })
      // Data Nodes

/*
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
