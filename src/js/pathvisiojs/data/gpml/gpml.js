pathvisiojs.data.gpml = function(){
    
  var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'Activity',
    'TBar':'InhibitoryActivity',
    'mim-catalysis':'Catalysis',
    'mim-inhibition':'Inhibition'
  };

  function getGroupDimensions(groupElements, callback) {
    var dimensions = {};
    dimensions.topLeftCorner = {
      "x": 99999,
      "y": 99999
    };
    dimensions.bottomRightCorner = {
      "x": 0,
      "y": 0
    };
    groupElements.forEach(function(groupElement) {
      if (groupElement.renderableType === 'entityNode') {
        entityNode = {};
        entityNode.topLeftCorner = {};
        entityNode.topLeftCorner.x = (groupElement['CenterX'] - groupElement['offsetWidth']/2);
        entityNode.topLeftCorner.y = (groupElement['CenterY'] - groupElement['offsetHeight']/2);
        entityNode.bottomRightCorner = {};
        entityNode.bottomRightCorner.x = (groupElement['CenterX'] + groupElement['offsetWidth']/2);
        entityNode.bottomRightCorner.y = (groupElement['CenterY'] + groupElement['offsetHeight']/2);
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, entityNode.topLeftCorner.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, entityNode.topLeftCorner.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, entityNode.bottomRightCorner.x);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, entityNode.bottomRightCorner.y);
      }
      else {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupElement.Point[0].X, groupElement.Point[groupElement.Point.length - 1].X);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupElement.Point[0].Y, groupElement.Point[groupElement.Point.length - 1].Y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupElement.Point[0].X, groupElement.Point[groupElement.Point.length - 1].X);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupElement.Point[0].Y, groupElement.Point[groupElement.Point.length - 1].Y);
      }
      dimensions.x = dimensions.topLeftCorner.x;
      dimensions.y = dimensions.topLeftCorner.y;
      dimensions.CenterX = (dimensions.topLeftCorner.x + dimensions.bottomRightCorner.x)/2;
      dimensions.CenterY = (dimensions.topLeftCorner.y + dimensions.bottomRightCorner.y)/2;
      dimensions.offsetWidth = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x);
      dimensions.offsetHeight = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y);
      callback(dimensions);
    });
  }

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
            pathvisiojs.context = {
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
              "offsetWidth":"http://www.w3.org/TR/cssom-view/#dom-htmlelement-offsetwidth",
              "offsetHeight":"http://www.w3.org/TR/cssom-view/#dom-htmlelement-offsetheight",
              "css":"http://www.w3.org/TR/CSS21/",
              "svg":"http://www.w3.org/TR/SVG11/",
              "text":"svg:text.html#TextElement",
              "tspan":"svg:text.html#TSpanElement",
              "color":"css:colors.html#propdef-color", //foreground color
              "backgroundColor":"css:colors.html#propdef-background-color",
              "backgroundImage":"css:colors.html#propdef-background-image",
              "borderColor":"css:box.html#propdef-border-color",
              "borderWidth":"css:box.html#propdef-border-width",
              "padding":"css:box.html#propdef-padding",
              "fontFamily":"css:fonts.html#font-family-prop",
              "fontStyle":"css:fonts.html#propdef-font-style", //italic
              "textAlign":"css:text.html#propdef-text-align", //left | right | center
              "verticalAlign":"css:visudet.html#propdef-vertical-align", //top | bottom | middle
              "fontSize":"css:fonts.html#propdef-font-size",
              "fontWeight":"css:fonts.html#propdef-font-weight", //normal | bold
              "zIndex": {
                "@id": "css:z-index",
                "@type": "xsd:integer"
              },
              "DatasourceReference": "wp:DatasourceReference",
              "Pathway": "biopax:Pathway",
              "shapeLibrary": "http://shapelibrary.example.org/",
              "shapeName": "shapeLibrary:shapeName",
              "image": "schema:image",
              "dataNodeType": "gpml:Type",
              "author": "schema:author",
              "organism": "biopax:organism",
              "stroke": "svg:painting.html#StrokeProperty",
              "strokeWidth": "svg:painting.html#StrokeWidthProperty",
              "tspan": {
                "@id": "svg:text.html#TSpanElement",
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
            };
            callback(null, pathvisiojs.context);
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
          Label: function(callback){
            var jsonLabels = [];
            gpmlPathway.selectAll('Label').each(function() {
              gpmlLabel = d3.select(this);
              pathvisiojs.data.gpml.label.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel) {
                jsonLabels.push(jsonLabel);
              });
            })
            callback(null, jsonLabels);
          },
          Shape: function(callback){
            var jsonShapes = [];
            gpmlPathway.selectAll('Shape').each(function() {
              gpmlShape = d3.select(this);
              pathvisiojs.data.gpml.shape.toRenderableJson(gpmlShape, pathwayIri, function(jsonShape) {
                jsonShapes.push(jsonShape);
              });
            })
            callback(null, jsonShapes);
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

                jsonInteraction["zIndex"] = parseFloat(gpmlInteraction.select('Graphics').attr('ZOrder'));
                jsonInteraction["renderableType"] = 'edge';
                points = gpmlInteraction.selectAll('Point');
                jsonInteraction["@type"] = [
                  "element",
                  "SvgPath",
                  "Interaction",
                  groupRef || 'notGrouped'
                ];
                // TODO this is very rudimentary - it needs to be much improved for checking where the arrowhead is located, etc.
                interactionType = gpmlArrowHeadToSemanticMappings[points[0][points[0].length - 1].getAttribute('ArrowHead')]
                if (!interactionType) {
                  interactionType = points[0][points[0].length - 1].getAttribute('ArrowHead');
                  if (!interactionType) {
                    interactionType = 'none';
                  }
                }
                jsonInteraction["@type"].push(interactionType);
                jsonInteraction["interactionType"] = interactionType;

                jsonInteraction["InteractionGraph"] = {};
                jsonInteraction["InteractionGraph"]["@id"] = pathwayIri + "#" + points[0][0].getAttribute('GraphRef');

                targetId = points[0][points[0].length - 1].getAttribute('GraphRef');
                if (!!targetId) {
                  target = gpml.querySelector('[GraphId=' + targetId + ']');
                  if (target.tagName === 'Anchor') {
                    targetId = target.parentElement.parentElement.getAttribute('GraphId');
                  }

                  jsonInteraction["InteractionGraph"]["interactsWith"] = pathwayIri + "#" + targetId;
                }
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
                    pointObj["X"] = parseFloat(point.attr('X'));
                    pointObj["Y"] = parseFloat(point.attr('Y'));
                  }
                  jsonInteraction["Point"].push(pointObj);
                })

                if (parents.length > 0) {
                  jsonInteraction["dependsOn"] = parents;
                }

                var connectorType = gpmlInteraction.select('Graphics').attr('ConnectorType') || 'Straight';
                jsonInteraction["ConnectorType"] = "" + connectorType;

                var stroke = gpmlInteraction.select('Graphics').attr('Color');
                if (!!stroke) {
                  jsonInteraction["stroke"] = stroke;
                }

                var strokeWidth = gpmlInteraction.select('Graphics').attr('LineThickness');
                if (!!strokeWidth) {
                  jsonInteraction["strokeWidth"] = parseFloat(strokeWidth);
                }

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
        self.myrealresults = results;
        var updateGroupsFrame = {};
        results.Group.forEach(function(element) {
          updateGroupsFrame = {
            '@context': results['@context'],
            "@type":element.GroupId
          };
          jsonld.frame(results, updateGroupsFrame, function(err, updateGroupsData) {
            console.log('err');
            console.log(err);
            var dimensions = getGroupDimensions(updateGroupsData['@graph'], function(dimensions) {
              element.x = dimensions.x;
              element.y = dimensions.y;
              element.CenterX = dimensions.CenterX;
              element.CenterY = dimensions.CenterY;
              element.offsetWidth = dimensions.offsetWidth;
              element.offsetHeight = dimensions.offsetHeight;
            });
          });
        });
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
