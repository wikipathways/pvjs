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
        "@type":"Pathway",
        "image": {
          "@context": {
            "@vocab": "http://schema.org/"
          },
          "width":parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
          "height":parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
        },
        "author":
        [
          {"@id":"Khanspers"},
          {"@id":"Pjaiswal"},
          {"@id":"Ariutta"}
        ],
        "organism": gpmlPathway.attr('Organism')
      };

      jsonPathway['@context'] = {
        "@vocab":"http://vocabularies.wikipathways.org/gpml#",
        "gpml":"http://vocabularies.wikipathways.org/gpml#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "wp":"http://vocabularies.wikipathways.org/wp#",
        "biopax": "http://www.biopax.org/release/biopax-level3.owl#",
        "schema":"http://schema.org/",
        "hMDB":"http://www.hmdb.ca/metabolites/HMDB",
        "entrezGene":"http://www.ncbi.nlm.nih.gov/gene/",
        "ChEBI":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=",
        "media":"http://www.w3.org/TR/mediaont-10/",
        "ex":"http://www.example.com/",
        "pathwayIri":pathwayIri,
        "gpmlFolder":"file://Users/andersriutta/Sites/pathvisiojs/test/gpml/",
        "name":"http://xmlns.com/foaf/0.1/name",
        "dcterms":"http://purl.org/dc/terms/",
        "Pathway": "biopax:Pathway",
        "shapeLibrary": "http://shapelibrary.example.org/",
        "shapeName": "shapeLibrary:shapeName",
        "image": "schema:image",
        "dataNodeType": "gpml:Type",
        "author": "schema:author",
        "organism": "biopax:organism",
        "pathwayElements": {
          "@id": "ex:pathwayElements/",
          "@container": "@list"
        },
        "hasReference": {
          "@type": "ex:hasReference",
          "@type": "@id"
        },
        "ex:IsReferencedBy": { "@reverse": "ex:hasReference" },
        "InteractionGraph": {
          "@id": "ex:InteractionGraph",
          "@type": "@id"
        },
        "interactsWith": "ex:interactsWith",
        "Interaction": {
          "@id": "biopax:Interaction",
          "@type": "@id",
          "InteractsWith":"xsd:string"
        },
        "Point": {
          "@id": "gpml:Point",
          "@container": "@list"
        }
      };

      var dataNode, jsonDataNode, elementIri, linestyle, graphId, shapeType;
      jsonPathway.DataNode = [];
      gpmlPathway.selectAll('DataNode').each(function() {
        dataNode = d3.select(this);
        graphId = dataNode.attr('GraphId') || ('id' + uuid.v4());
        elementIri = pathwayIri + "#" + graphId;
        jsonDataNode = {};
        jsonDataNode["@id"] = elementIri;
        jsonDataNode["wp:DatasourceReference"] = {};
        jsonDataNode["wp:DatasourceReference"]["database"] = dataNode.select('Xref').attr('Database');
        jsonDataNode["wp:DatasourceReference"]["ID"] = dataNode.select('Xref').attr('ID')
        shapeType = dataNode.select('Graphics').attr('ShapeType') || 'rectangle';
        shapeType = strcase.paramCase(shapeType);
        jsonDataNode["ShapeType"] = shapeType;
        dataNodeType = dataNode.attr('Type');
        jsonDataNode["dataNodeType"] = 'wp:' + dataNodeType;
        jsonDataNode["@type"] = [
          "Shape",
          shapeType,
          "DataNode",
          "wp:" + dataNodeType
        ];
        jsonDataNode["TextLabel"] = dataNode.attr('TextLabel');
        jsonDataNode["CenterX"] = dataNode.select('Graphics').attr('CenterX');
        jsonDataNode["CenterY"] = dataNode.select('Graphics').attr('CenterY');
        jsonDataNode["Width"] = dataNode.select('Graphics').attr('Width');
        jsonDataNode["Height"] = dataNode.select('Graphics').attr('Height');
        linestyle = dataNode.select('Graphics').attr('LineStyle');
        if (!!linestyle) {
          linestyle = 'Solid';
        };
        jsonDataNode["LineStyle"] = linestyle;

        jsonPathway.DataNode.push(jsonDataNode);
      })

      var interaction, jsonInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId;
      jsonPathway.Interaction = [];
      gpmlPathway.selectAll('Interaction').each(function() {
        interaction = d3.select(this);
        console.log('interaction');
        console.log(this);
        graphId = interaction.attr('GraphId') || ('id' + uuid.v4());
        elementIri = pathwayIri + "#" + graphId;
        jsonInteraction = {};
        jsonInteraction["@id"] = elementIri;

        points = self.points = interaction.selectAll('Point');
        jsonInteraction["@type"] = [
          "SvgPath",
          "Interaction"
        ];
        // TODO this is very rudimentary - it needs to be much improved for checking where the arrowhead is located, etc.
        interactionType = gpmlArrowHeadToSemanticMappings[points[0][points[0].length - 1].getAttribute('ArrowHead')]
        if (!!interactionType) {
          jsonInteraction["@type"].push(interactionType);
        }
        jsonInteraction["interactionType"] = interactionType;
        
        jsonInteraction["InteractionGraph"] = {};
        jsonInteraction["InteractionGraph"]["@id"] = pathwayIri + "#" + points[0][0].getAttribute('GraphRef');

        targetId = points[0][points[0].length - 1].getAttribute('GraphRef');
        target = gpml.querySelector('[GraphId=' + targetId + ']');
        if (target.tagName === 'Anchor') {
          targetId = target.parentElement.parentElement.getAttribute('GraphId');
        }

        jsonInteraction["InteractionGraph"]["interactsWith"] = pathwayIri + "#" + targetId;
        // TODO add the reaction, if it exists
        //"ex:Anchor": pathwayIri + "#Reaction1"

        var point, pointObj;
        jsonInteraction["Point"] = [];
        points.each(function() {
          point = d3.select(this);
          pointObj = {};
          var relX = point.attr('RelX');
          var relY = point.attr('RelY');
          if (!!relX && !!relY) {
            pointObj["@type"] = 'SnappedPoint';

            pointObj["hasReference"] = pathwayIri + "#" + point.attr('GraphRef');
            pointObj["RelX"] = relX;
            pointObj["RelY"] = relY;
            pointObj["X"] = point.attr('X');
            pointObj["Y"] = point.attr('Y');
          }
          else {
            pointObj["@type"] = 'GraphicalPoint';
            pointObj["X"] = {};
            pointObj["X"] = point.attr('X');
            pointObj["Y"] = point.attr('Y');
          }
          jsonInteraction["Point"].push(pointObj);
        })

        var connectorType = interaction.select('Graphics').attr('ConnectorType') || 'Straight';
        jsonInteraction["ConnectorType"] = "" + connectorType;

        jsonPathway.Interaction.push(jsonInteraction);

        interaction.selectAll('Anchor').each(function() {
          anchor = d3.select(this);
          elementIri = pathwayIri + "#" + anchor.attr('GraphId');
          jsonInteraction = {};
          jsonInteraction["@id"] = pathwayIri + "#" + anchor.attr('GraphId');
          jsonInteraction["@type"] = [
            "Interaction",
            "Anchor"
          ];
          jsonInteraction["hasReference"] = interaction["@id"];
          jsonInteraction["anchorPosition"] = anchor.attr('Position');

          jsonPathway.Interaction.push(jsonInteraction);
        })

      })








      /*
      jsonPathway.metadata = {};
      jsonPathway.metadata.boardWidth = parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth'));
      jsonPathway.metadata.boardHeight = parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'));
      jsonPathway.metadata.name = d3.select(gpml).select('Pathway').attr('Name');
      jsonPathway.metadata.xmlns = d3.select(gpml).select('Pathway').attr('xmlns');
      jsonPathway.metadata.organism = d3.select(gpml).select('Pathway').attr('Organism');
      //*/
      

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
