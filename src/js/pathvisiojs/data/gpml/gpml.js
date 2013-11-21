pathvisiojs.data.gpml = function(){
    
  var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'Activity',
    'TBar':'InhibitoryActivity',
    'mim-catalysis':'Catalysis',
    'mim-inhibition':'Inhibition'
  };

  function toRenderableJson(gpml, pathwayIri, callback){
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

        alert("Pathvisiojs may not fully support the version of GPML provided (xmlns: " + gpmlNamespace + "). Please convert to the supported version of GPML (xmlns: " + pathvisiojs.data.gpml.namespaces[0] + ").");
      }

      jsonPathway = {
        "@id":pathwayIri,
        "wp:Author":
        [
          {"@id":"Khanspers"},
          {"@id":"Pjaiswal"},
          {"@id":"Ariutta"}
        ],
        "media:frameSize":{
          "media:width":parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
          "media:height":parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
        }
      };

      jsonPathway['@context'] = {
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "wp":"http://vocabularies.wikipathways.org/wp#",
        // TODO not taking into account revision, but it should be included in the IRI
        "wpId":"http://wikipathways.org/index.php/Pathway:WP",
        "gpmlFolder":"file://Users/andersriutta/Sites/pathvisiojs/test/gpml/",
        "gpml":"http://vocabularies.wikipathways.org/gpml#",
        "name":"http://xmlns.com/foaf/0.1/name",
        "dcterms":"http://purl.org/dc/terms/",
        "hMDB":"http://www.hmdb.ca/metabolites/HMDB",
        "entrezGene":"http://www.ncbi.nlm.nih.gov/gene/",
        "ChEBI":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=",
        "media":"http://www.w3.org/TR/mediaont-10/",
        "ex":"http://www.example.com/",
        "pathwayElements": {
          "@id": "ex:pathwayElements/",
          "@container": "@list"
        },
        "gpml:GraphRef": {
          "@type": "@id"
        },
        "ex:IsRefedBy": { "@reverse": "gpml:GraphRef" },
        "wp:InteractionGraph": {
          "@type": "@id"
        },
        "wp:Interaction": {
          "@id": "xsd:string",
          "@type": "@id",
          "ex:InteractsWith":"xsd:string"
        },
        "gpml:Point": {
          "@id": "gpml:Point",
          "@container": "@list"
        },
        "gpml:SnappedPoint": {
          "gpml:GraphRef": "@id",
          "gpml:relX": "xsd:integer",
          "gpml:relY": "xsd:integer"
        },
        "gpml:GraphicalPoint": {
          "gpml:x": "xsd:integer",
          "gpml:y": "xsd:integer"
        }
      };

      var dataNode, elementIri, linestyle, graphId;
      jsonPathway.pathwayElements = {};
      gpmlPathway.selectAll('DataNode').each(function() {
        dataNode = d3.select(this);
        graphId = dataNode.attr('GraphId') || ('id' + uuid.v4());
        elementIri = pathwayIri + "#" + graphId;
        jsonPathway.pathwayElements[elementIri] = {};
        jsonPathway.pathwayElements[elementIri]["@id"] = elementIri;
        jsonPathway.pathwayElements[elementIri]["wp:DatasourceReference"] = {};
        jsonPathway.pathwayElements[elementIri]["wp:DatasourceReference"]["gpml:database"] = dataNode.select('Xref').attr('Database');
        jsonPathway.pathwayElements[elementIri]["wp:DatasourceReference"]["@id"] = dataNode.select('Xref').attr('ID')
        jsonPathway.pathwayElements[elementIri]["@type"] = "gpml:DataNode";
        jsonPathway.pathwayElements[elementIri]["gpml:DataNode"] = "wp:" + dataNode.attr('Type');
        jsonPathway.pathwayElements[elementIri]["gpml:textlabel"] = dataNode.attr('TextLabel');
        jsonPathway.pathwayElements[elementIri]["gpml:centerx"] = dataNode.select('Graphics').attr('CenterX');
        jsonPathway.pathwayElements[elementIri]["gpml:centery"] = dataNode.select('Graphics').attr('CenterY');
        jsonPathway.pathwayElements[elementIri]["gpml:width"] = dataNode.select('Graphics').attr('Width');
        jsonPathway.pathwayElements[elementIri]["gpml:height"] = dataNode.select('Graphics').attr('Height');
        linestyle = dataNode.select('Graphics').attr('LineStyle');
        if (!!linestyle) {
          linestyle = 'Solid';
        };
        jsonPathway.pathwayElements[elementIri]["gpml:linestyle"] = 'gpml:' + linestyle;
      })

      var interaction, anchor, points, interactionType, target, targetId;
      gpmlPathway.selectAll('Interaction').each(function() {
        interaction = d3.select(this);
        console.log('interaction');
        console.log(this);
        graphId = interaction.attr('GraphId') || ('id' + uuid.v4());
        elementIri = pathwayIri + "#" + graphId;
        jsonPathway.pathwayElements[elementIri] = {};
        jsonPathway.pathwayElements[elementIri]["@id"] = elementIri;
        jsonPathway.pathwayElements[elementIri]["@type"] = "wp:Interaction";
        points = self.points = interaction.selectAll('Point');
        interactionType = 'wp:' + gpmlArrowHeadToSemanticMappings[points[0][points[0].length - 1].getAttribute('ArrowHead')];
        jsonPathway.pathwayElements[elementIri]["wp:InteractionGraph"] = {};
        jsonPathway.pathwayElements[elementIri]["wp:InteractionGraph"]["@id"] = pathwayIri + "#" + points[0][0].getAttribute('GraphRef');
        // TODO this is very rudimentary - it needs to be much improved for checking where the arrowhead is located, etc.
        jsonPathway.pathwayElements[elementIri]["ex:InteractionType"] = interactionType;

        targetId = points[0][points[0].length - 1].getAttribute('GraphRef');
        target = gpml.querySelector('[GraphId=' + targetId + ']');
        if (target.tagName === 'Anchor') {
          targetId = target.parentElement.parentElement.getAttribute('GraphId');
        }

        jsonPathway.pathwayElements[elementIri]["wp:InteractionGraph"]["wp:interactsWith"] = pathwayIri + "#" + targetId;
        // TODO add the reaction, if it exists
        //"ex:reaction": pathwayIri + "#Reaction1"

        var point, pointObj;
        jsonPathway.pathwayElements[elementIri]["gpml:Point"] = [];
        points.each(function() {
          point = d3.select(this);
          pointObj = {};
          var relX = point.attr('RelX');
          var relY = point.attr('RelY');
          if (!!relX && !!relY) {
            pointObj["@type"] = 'gpml:SnappedPoint';

            pointObj['gpml:SnappedPoint'] = {};
            pointObj['gpml:SnappedPoint']["gpml:GraphRef"] = pathwayIri + "#" + point.attr('GraphRef');
            pointObj['gpml:SnappedPoint']["gpml:RelX"] = relX;
            pointObj['gpml:SnappedPoint']["gpml:RelY"] = relY;
          }
          else {
            pointObj["@type"] = 'gpml:GraphicalPoint';
            pointObj['gpml:GraphicalPoint']["gpml:X"] = {};
            pointObj['gpml:GraphicalPoint']["gpml:X"] = point.attr('X');
            pointObj['gpml:GraphicalPoint']["gpml:Y"] = point.attr('Y');
          }
          jsonPathway.pathwayElements[elementIri]["gpml:Point"].push(pointObj);
        })

        var connectorType = interaction.select('Graphics').attr('ConnectorType') || 'Straight';
        jsonPathway.pathwayElements[elementIri]["gpml:connectorType"] = "gpml:" + connectorType;

        interaction.selectAll('Anchor').each(function() {
          anchor = d3.select(this);
          elementIri = pathwayIri + "#" + anchor.attr('GraphId');
          jsonPathway.pathwayElements[elementIri] = {};
          jsonPathway.pathwayElements[elementIri]["@id"] = pathwayIri + "#" + anchor.attr('GraphId');
          jsonPathway.pathwayElements[elementIri]["@type"] = "wp:Reaction";
          jsonPathway.pathwayElements[elementIri]["gpml:GraphRef"] = interaction["@id"];
          jsonPathway.pathwayElements[elementIri]["gpml:anchorPosition"] = anchor.attr('Position');
        })




















      })








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
      alert("Pathvisiojs does not support the data format provided. Please convert to GPML and retry.");
      console.log("Pathvisiojs does not support the data format provided. Please convert to GPML and retry.");
      return;
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
