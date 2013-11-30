pathvisiojs.data.gpml = function(){
    
  var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'Activity',
    'TBar':'InhibitoryActivity',
    'mim-catalysis':'Catalysis',
    'mim-inhibition':'Inhibition'
  };

  function toRenderableJson(gpml, pathwayIri, callbackOutside){
    var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var gpmlNamespace = null;
    try {
      gpmlNamespace = gpmlPathway.attr('xmlns');
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

      async.parallel({
          '@context': function(callback){
            callback(null, {
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
              "DatasourceReference": "wp:DatasourceReference",
              "Pathway": "biopax:Pathway",
              "shapeLibrary": "http://shapelibrary.example.org/",
              "shapeName": "shapeLibrary:shapeName",
              "image": "schema:image",
              "dataNodeType": "gpml:Type",
              "author": "schema:author",
              "organism": "biopax:organism",
              "tspan": {
                "@id": "http://www.w3.org/TR/SVG/text.html#TSpanElement",
                "@container": "@set"
              },
              "pathwayElements": {
                "@id": "ex:pathwayElements/",
                "@container": "@list"
              },
              "dependencies": {
                "@id": "ex:dependencies",
                "@type": "@id"
              },
              "dependsOn": {
                "@reverse": "ex:dependencies",
                "@type": "@id"
              },
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
            });
          },
          organism: function(callback){
            callback(null, gpmlPathway.attr('Organism'));
          },
          image: function(callback){
            callback(null, {
              '@context': {
                '@vocab': 'http://schema.org/'
              },
              'width':parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
            });
          },
          Group: function(callback){
            var jsonGroups = [];
            gpmlPathway.selectAll('Group').each(function() {
              gpmlGroup = d3.select(this);
              pathvisiojs.data.gpml.group.toRenderableJson(gpmlGroup, pathwayIri, function(jsonGroup) {
                jsonGroups.push(jsonGroup);
              });
            })
            callback(null, jsonGroups);
          },
          DataNode: function(callback){
            var jsonDataNodes = [];
            gpmlPathway.selectAll('DataNode').each(function() {
              gpmlDataNode = d3.select(this);
              pathvisiojs.data.gpml.dataNode.toRenderableJson(gpmlDataNode, pathwayIri, function(jsonDataNode) {
                jsonDataNodes.push(jsonDataNode);
              });
            })
            callback(null, jsonDataNodes);
          },
          Interaction: function(callback){
            var interactions, gpmlInteraction, jsonInteraction, jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef;
            interactions = [];
            gpmlPathway.selectAll('Interaction').each(function() {
              try {
                gpmlInteraction = d3.select(this);
                graphId = gpmlInteraction.attr('GraphId') || ('id' + uuid.v4());
                elementIri = pathwayIri + "#" + graphId;
                jsonInteraction = {};
                jsonInteraction["@id"] = elementIri;

                groupRef = gpmlInteraction.attr('GroupRef');
                var parents = [];
                if (!!groupRef) {
                  jsonInteraction["GroupRef"] = groupRef;
                  parents.push(pathwayIri + "#" + groupRef);
                }

                points = gpmlInteraction.selectAll('Point');
                jsonInteraction["@type"] = [
                  "element",
                  "SvgPath",
                  "Interaction",
                  groupRef || 'notGrouped'
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

                    parents.push(pathwayIri + "#" + point.attr('GraphRef'));

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

                if (parents.length > 0) {
                  jsonInteraction["dependsOn"] = parents;
                }

                var connectorType = gpmlInteraction.select('Graphics').attr('ConnectorType') || 'Straight';
                jsonInteraction["ConnectorType"] = "" + connectorType;

                interactions.push(jsonInteraction);

                gpmlInteraction.selectAll('Anchor').each(function() {
                  jsonAnchorInteraction = {};
                  anchor = d3.select(this);
                  elementIri = pathwayIri + "#" + anchor.attr('GraphId');
                  jsonAnchorInteraction["@id"] = pathwayIri + "#" + anchor.attr('GraphId');
                  jsonAnchorInteraction["@type"] = [
                    "element",
                    "Interaction",
                    "Anchor"
                  ];
                  jsonAnchorInteraction["dependsOn"] = jsonInteraction["@id"];
                  jsonAnchorInteraction["anchorPosition"] = anchor.attr('Position');

                  interactions.push(jsonAnchorInteraction);
                })
              }
              catch (e) {
                throw new Error("Error converting Interaction to renderable json: " + e.message);
              }
            })
            callback(null, interactions);
          }
      },
      function(err, results) {
        callbackOutside(results);
      });




















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
      throw new Error("Pathvisiojs does not support the data format provided. Please convert to GPML and retry.");
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
