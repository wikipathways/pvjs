pathvisiojs.data.gpml = function(){
    
  var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'Activity',
    'TBar':'InhibitoryActivity',
    'mim-catalysis':'Catalysis',
    'mim-inhibition':'Inhibition'
  };

  function getGroupDimensions(group, groupContents, callback) {
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = 99999;
    dimensions.topLeftCorner.y = 99999;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;
    groupContents.forEach(function(groupContent) {
      if (groupContent.renderableType === 'entityNode') {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.x + groupContent.width);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.y + groupContent.height);
      }
      else {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
      }
      dimensions.x = dimensions.topLeftCorner.x - group.padding - group.borderWidth;
      dimensions.y = dimensions.topLeftCorner.y - group.padding - group.borderWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (group.padding + group.borderWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (group.padding + group.borderWidth);
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

        alert('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + gpmlNamespace + '). Please convert to the supported version of GPML (xmlns: ' + pathvisiojs.data.gpml.namespaces[0] + ').');
      }

      var pathway = {};
      async.parallel({
          '@context': function(callback){
            pathvisiojs.context = pathway['@context'] = {
              '@vocab':'http://vocabularies.wikipathways.org/gpml#',
              'gpml':'http://vocabularies.wikipathways.org/gpml#',
              'xsd': 'http://www.w3.org/2001/XMLSchema#',
              'wp':'http://vocabularies.wikipathways.org/wp#',
              'biopax': 'http://www.biopax.org/release/biopax-level3.owl#',
              'schema':'http://schema.org/',
              'hMDB':'http://www.hmdb.ca/metabolites/HMDB',
              'entrezGene':'http://www.ncbi.nlm.nih.gov/gene/',
              'ChEBI':'http://www.ebi.ac.uk/chebi/searchId.do?chebiId=',
              'media':'http://www.w3.org/TR/mediaont-10/',
              'ex':'http://www.example.com/',
              'pathwayIri':pathwayIri,
              'gpmlFolder':'file://Users/andersriutta/Sites/pathvisiojs/test/gpml/',
              'name':'http://xmlns.com/foaf/0.1/name',
              'dcterms':'http://purl.org/dc/terms/',
              'css2':'http://www.w3.org/TR/CSS2/',
              'css3Ui':'http://www.w3.org/TR/css3-ui/#',
              'cssTransform':'http://www.w3.org/TR/css-transforms-1/#',
              'svg':'http://www.w3.org/TR/SVG11/',
              'boxSizing':{
                '@id':'css3Ui:box-sizing',
                '@value':'border-box'
              },
              'rotate':'cssTransform:funcdef-rotate',
              'position':'css2:visuren.html#propdef-position',
              'text':'svg:text.html#TextElement',
              'tspan':'svg:text.html#TSpanElement',
              'color':'css2:colors.html#propdef-color', //foreground color
              'backgroundColor':'css2:colors.html#propdef-background-color',
              'backgroundImage':'css2:colors.html#propdef-background-image',
              'borderColor':'css2:box.html#propdef-border-color',
              'borderWidth':'css2:box.html#propdef-border-width',
              'x':'css2:visuren.html#propdef-left',
              'y':'css2:visuren.html#propdef-top',
              'width':'css2:visudet.html#propdef-width',
              'height':'css2:visudet.html#propdef-height',
              'padding':'css2:box.html#propdef-padding',
              'fontFamily':'css2:fonts.html#font-family-prop',
              'fontStyle':'css2:fonts.html#propdef-font-style', //italic
              'textAlign':'css2:text.html#propdef-text-align', //left | right | center
              'verticalAlign':'css2:visudet.html#propdef-vertical-align', //top | bottom | middle
              'fontSize':'css2:fonts.html#propdef-font-size',
              'fontWeight':'css2:fonts.html#propdef-font-weight', //normal | bold
              'zIndex': {
                '@id': 'css2:z-index',
                '@type': 'xsd:integer'
              },
              'DatasourceReference': 'wp:DatasourceReference',
              'Pathway': 'biopax:Pathway',
              'shapeLibrary': 'http://shapelibrary.example.org/',
              'shapeName': 'shapeLibrary:shapeName',
              'image': 'schema:image',
              'dataNodeType': 'gpml:Type',
              'author': 'schema:author',
              'organism': 'biopax:organism',
              'stroke': 'svg:painting.html#StrokeProperty',
              'strokeWidth': 'svg:painting.html#StrokeWidthProperty',
              'tspan': {
                '@id': 'svg:text.html#TSpanElement',
                '@container': '@set'
              },
              'pathwayElements': {
                '@id': 'ex:pathwayElements/',
                '@container': '@list'
              },
              'dependencies': {
                '@id': 'ex:dependencies',
                '@type': '@id'
              },
              'dependsOn': {
                '@reverse': 'ex:dependencies',
                '@type': '@id'
              },
              'hasReference': {
                '@id': 'ex:hasReference',
                '@type': '@id'
              },
              'isReferredToBy': {
                '@reverse': 'ex:hasReference',
                '@type': '@id'
              },
              'edge': {
                '@type': '@id',
                '@container':'@list',
                'InteractionGraph': {
                  '@type': '@id',
                  '@container':'@list'
                }
              },
              /*
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              /*
               * Defining this as shown below works. It ensures InteractionGraph is an array.
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              //*/
              /*
               * Defining this as shown below makes it so the members are not included. I don't know why.
              'InteractionGraph': {
                '@id': 'ex:InteractionGraph',
                '@type': '@id'
              },
              //*/
              'interactsWith': {
                '@id': 'ex:interactsWith',
                '@type': '@id',
              },
              'Interaction': {
                '@id': 'biopax:Interaction',
                '@type': '@id'
              },
              'Point': {
                '@id': 'gpml:Point',
                '@container': '@list'
              }
            };
            callback(null, pathvisiojs.context);
          },
          organism: function(callback){
            pathway.organism = gpmlPathway.attr('Organism');
            callback(null, pathway.organism);
          },
          image: function(callback){
            pathway.image = {
              '@context': {
                '@vocab': 'http://schema.org/'
              },
              'width':parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
            };
            callback(null, pathway.image);
          },
          DataNode: function(callback){
            var dataNodes = gpmlPathway.selectAll('DataNode');
            if (dataNodes[0].length > 0) {
              pathway.DataNode = [];
              gpmlPathway.selectAll('DataNode').each(function() {
                gpmlDataNode = d3.select(this);
                pathvisiojs.data.gpml.dataNode.toRenderableJson(gpmlDataNode, pathwayIri, function(jsonDataNode) {
                  pathway.DataNode.push(jsonDataNode);
                });
              })
              callback(null, 'DataNodes are all converted.');
            }
            else {
              callback(null, 'No dataNodes to convert.');
            }
          },
          Label: function(callback){
            var labels = gpmlPathway.selectAll('Label');
            if (labels[0].length > 0) {
              pathway.Label = [];
              gpmlPathway.selectAll('Label').each(function() {
                gpmlLabel = d3.select(this);
                pathvisiojs.data.gpml.label.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel) {
                  pathway.Label.push(jsonLabel);
                });
              })
              callback(null, 'Labels are all converted.');
            }
            else {
              callback(null, 'No labels to convert.');
            }
          },
          Shape: function(callback){
            var shapes = gpmlPathway.selectAll('Shape');
            if (shapes[0].length > 0) {
              pathway.Shape = [];
              gpmlPathway.selectAll('Shape').each(function() {
                gpmlShape = d3.select(this);
                pathvisiojs.data.gpml.shape.toRenderableJson(gpmlShape, pathwayIri, function(jsonShape) {
                  pathway.Shape.push(jsonShape);
                });
              })
              callback(null, 'Shapes are all converted.');
            }
            else {
              callback(null, 'No shapes to convert.');
            }
          },
          Interaction: function(callback){
            var gpmlInteraction, jsonInteraction, jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef;
            pathway.Interaction = [];
            try {
              gpmlPathway.selectAll('Interaction').each(function() {
                gpmlInteraction = d3.select(this);
                graphId = gpmlInteraction.attr('GraphId') || ('id' + uuid.v4());
                elementIri = pathwayIri + graphId;
                jsonInteraction = {};
                jsonInteraction['@id'] = elementIri;
                jsonInteraction.GraphId = graphId;

                groupRef = gpmlInteraction.attr('GroupRef');
                var parents = [];
                if (!!groupRef) {
                  jsonInteraction.GroupRef = groupRef;
                  parents.push(pathwayIri + groupRef);
                }

                jsonInteraction.zIndex = parseFloat(gpmlInteraction.select('Graphics').attr('ZOrder'));
                jsonInteraction.renderableType = 'edge';
                var edgeType = 'interaction';
                jsonInteraction.edgeType = 'Interaction';
                points = gpmlInteraction.selectAll('Point');
                jsonInteraction['@type'] = [
                  'element',
                  'SvgPath',
                  'Interaction',
                  edgeType,
                  groupRef || 'notGrouped'
                ];

                var database, ID, 
                  datasourceReference = gpmlInteraction.select('Xref');
                if (!!datasourceReference) {
                  database = datasourceReference.attr('Database')
                  ID = datasourceReference.attr('ID')
                  if (!!database && !!ID) {
                    jsonInteraction.DatasourceReference = {};
                    jsonInteraction.DatasourceReference.Database = database;
                    jsonInteraction.DatasourceReference.ID = ID;
                  }
                }

                // Arrowheads on both ends of a single graphical Interaction would represent two semantic Interactions

                function buildInteractionGraph(gpmlSource, gpmlTarget, callbackBIG) {
                  var InteractionGraphMember = {};
                  interactionType = gpmlArrowHeadToSemanticMappings[gpmlTarget.getAttribute('ArrowHead')];
                  var interactionTypeExistenceCheck;
                  if (!!interactionType) {
                    self.myInteractionGraphMember = InteractionGraphMember;
                    jsonInteraction.InteractionGraph = jsonInteraction.InteractionGraph || [];

                    InteractionGraphMember['@id'] = pathwayIri + gpmlSource.getAttribute('GraphRef');
                    targetId = gpmlTarget.getAttribute('GraphRef');
                    if (!!targetId) {
                      target = gpml.querySelector('[GraphId=' + targetId + ']');
                      if (target.tagName === 'Anchor') {
                        targetId = target.parentElement.parentElement.getAttribute('GraphId');
                      }

                      InteractionGraphMember.interactsWith = pathwayIri + targetId;
                    }
                    interactionTypeExistenceCheck = jsonInteraction['@type'].indexOf(interactionType);
                    if (interactionTypeExistenceCheck === -1) {
                      jsonInteraction['@type'].push(interactionType);
                    }
                    else {
                      //jsonInteraction['@type'][interactionTypeExistenceCheck] = 'Bidirectional-' + interactionType;
                      jsonInteraction['@type'].push('Bidirectional-' + interactionType);
                    }
                    jsonInteraction.InteractionGraph.push(InteractionGraphMember);
                    // TODO add the reaction, if it exists
                    //'ex:Anchor': pathwayIri + '#Reaction1'

                    callbackBIG(InteractionGraphMember);
                  }
                  else {
                    callbackBIG(null);
                  }
                }

                var firstPoint = points[0][0];
                var lastPoint = points[0][points[0].length - 1];

                buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember) {
                });
                buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember) {
                });

                // Graphical Only Data below, except maybe Anchors
                
                var point, pointObj;
                jsonInteraction.Point = [];
                points.each(function() {
                  point = d3.select(this);
                  pointObj = {};
                  var relX = parseFloat(point.attr('RelX'));
                  var relY = parseFloat(point.attr('RelY'));
                  if ((relX !== null && relX !== undefined) && (relY !== null && relY !== undefined)) {
                    pointObj['@type'] = 'SnappedPoint';

                    parents.push(pathwayIri + point.attr('GraphRef'));

                    pointObj.hasReference = pathwayIri + point.attr('GraphRef');
                    pointObj.RelX = relX;
                    pointObj.RelY = relY;
                    pointObj.x = parseFloat(point.attr('X'));
                    pointObj.y = parseFloat(point.attr('Y'));
                  }
                  else {
                    pointObj['@type'] = 'GraphicalPoint';
                    pointObj.x = {};
                    pointObj.x = parseFloat(point.attr('X'));
                    pointObj.y = parseFloat(point.attr('Y'));
                  }
                  jsonInteraction.Point.push(pointObj);
                })

                if (parents.length > 0) {
                  jsonInteraction.dependsOn = parents;
                }

                var connectorType = gpmlInteraction.select('Graphics').attr('ConnectorType') || 'Straight';
                jsonInteraction['ConnectorType'] = '' + connectorType;

                var stroke = gpmlInteraction.select('Graphics').attr('Color');
                if (!!stroke) {
                  jsonInteraction['stroke'] = stroke;
                }

                var strokeWidth = gpmlInteraction.select('Graphics').attr('LineThickness');
                if (!!strokeWidth) {
                  jsonInteraction['strokeWidth'] = parseFloat(strokeWidth);
                }

                gpmlInteraction.selectAll('Anchor').each(function() {
                  jsonAnchorInteraction = {};
                  anchor = d3.select(this);
                  elementIri = pathwayIri + anchor.attr('GraphId');
                  jsonAnchorInteraction['@id'] = pathwayIri + anchor.attr('GraphId');
                  jsonAnchorInteraction['@type'] = [
                    'element',
                    'Interaction',
                    'Anchor'
                  ];
                  jsonAnchorInteraction.dependsOn = jsonInteraction['@id'];
                  jsonAnchorInteraction.anchorPosition = anchor.attr('Position');

                  jsonInteraction.push(jsonAnchorInteraction);
                })
                pathway.Interaction.push(jsonInteraction);
              });
              callback(null, pathway.Interaction);
            }
            catch (e) {
              throw new Error('Error converting Interaction to renderable json: ' + e.message);
            }
          }
      },
      function(err, results) {
        var groups = gpmlPathway.selectAll('Group');
        if (groups[0].length > 0) {
          pathway.Group = [];
          gpmlPathway.selectAll('Group').each(function() {
            gpmlGroup = d3.select(this);
            pathvisiojs.data.gpml.group.toRenderableJson(gpmlGroup, pathwayIri, function(jsonGroup) {
              var dimensions = getGroupDimensions(element, jsonGroup, function(dimensions) {
                element.x = dimensions.x;
                element.y = dimensions.y;
                element.width = dimensions.width;
                element.height = dimensions.height;
              });
              pathway.Group.push(jsonGroup);
            });
          })
          self.myPathway = pathway;
          callbackOutside(pathway);
        }
        else {
          self.myPathway = pathway;
          callbackOutside(pathway);
        }
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
          console.log('No element(s) named 'comment' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting comment to json: ' + e.message);
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
          console.log('No element(s) named 'group' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting group to json: ' + e.message);
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
          console.log('No element(s) named 'graphicalLine' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting graphicalLine to json: ' + e.message);
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
          console.log('No element(s) named 'interaction' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting interaction to json: ' + e.message);
      }

      // Edges

      try {
        if (pathway.hasOwnProperty('edges')) {
          pathway.edges = pathvisiojs.pathway.edge.gpml2json(pathway.edges);
        }
        else {
          console.log('No element(s) named 'edges' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting edges to json: ' + e.message);
      }

      //*/
    }
    else {
      alert('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
      throw new Error('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
