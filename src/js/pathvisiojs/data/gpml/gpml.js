pathvisiojs.data.gpml = function(){
  'use strict';

  var pathvisioDefaultStyleValues = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  }

  function get(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var fileType = sourceData.fileType;

    if ((!uri) && (!object)) {
      return new Error('No sourceData specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    if (fileType === 'gpml') {
      if (pathvisiojs.utilities.isIE() !== 9) {
        // d3.xml does not work with IE9 (and probably earlier), so we're using d3.xhr instead of d3.xml for IE9
        // TODO file a bug report on d3 issue tracker
        d3.xml(uri, function(gpmlDoc) {
          var gpml = gpmlDoc.documentElement;
          callback(gpml);
        });
      }
      else {
        async.waterfall([
          function(callbackInside) {
            if (!$) {
              // TODO should we use requirejs for loading scripts instead?
              pathvisiojs.utilities.loadScripts(['http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'], function() {
                callbackInside(null);
              })
            }
            else {
              callbackInside(null);
            }
          },
          function(callbackInside) {
            d3.xhr(uri, 'application/xml', function(error, data) {
              var gpmlString = data.responseText;
              callbackInside(null, gpmlString);
            });
          },
          function(gpmlString, callbackInside) {
            var gpmlDoc = $.parseXML(gpmlString);
            var gpml = gpmlDoc.documentElement;
            callback(gpml);
          }
        ]);
      }
    }
    else {
      throw new Error('Cannot get GPML from the specified input.');
    }
  }

  function gpmlColorToCssColor(gpmlColor, pathvisioDefault) {
    var color;
    if (gpmlColor !== pathvisioDefault) {
      if (!!gpmlColor) {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          return pathvisioDefault;
        }
      }
      else {
        return pathvisioDefault;
      }
    }
    else {
      return pathvisioDefault;
    }
  }

  function setColorAsJson(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
    var jsonColor;
    if (currentGpmlColorValue !== defaultGpmlColorValue) {
      jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
      jsonElement.color = jsonColor;
      jsonElement.borderColor = jsonColor;
      if (jsonElement.hasOwnProperty('text')) {
        jsonElement.text.color = jsonColor;
      }
    }
    return jsonElement;
  }

  // TODO can we delete this function?

  function getLineStyle(gpmlElement) {
    var LineStyle, attributes; 
    var graphics = gpmlElement.select('Graphics');
    if (!!graphics) {
      LineStyle = graphics.attr('LineStyle'); 
      if (!!LineStyle) {
        return LineStyle;
      }
      else {

        // As currently specified, a given element can only have one LineStyle.
        // This one LineStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has LineStyle of double.

        attributes = gpmlElement.selectAll('Attribute');
        if (attributes.length > 0) {
          LineStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (LineStyle[0].length > 0) {
            return 'double';
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      }
    }
  }

  function getBorderStyle(gpmlLineStyle, pathvisioDefault) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle;
    if (gpmlLineStyle !== pathvisioDefault) {
      if (!!gpmlLineStyle) {
        borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
        if (borderStyle) {
          return borderStyle;
        }
        else {
          console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
          return 'solid';
        }
      }
      else {
        return 'solid';
      }
    }
    else {

      // TODO use code to actually get the default
      
      return 'whatever the default value is';
    }
  }

  function setBorderStyleAsJson(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
    var borderStyle;

    // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
    // whether it has returned the default value, and we need to know whether we are using the
    // default here.

    if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
      borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
      jsonElement.borderStyle = borderStyle;
    }
    return jsonElement;
  }

  function toRenderableJson(gpml, pathwayIri, callbackOutside){
    var gpmlPathway = d3.select(gpml);
    //var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var pathway = {};
    pathway.xmlns = gpmlPathway.attr('xmlns');
    pathway.nodes = [];
    pathway.edges = [];
    pathway.elements = [];

    // test for whether file is GPML

    if ( pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== 0) {

        // TODO call the Java RPC updater or in some other way call for the file to be updated.

        callbackOutside('fail');
        //alert('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + pathway.xmlns + '). Please convert to the supported version of GPML (xmlns: ' + pathvisiojs.data.gpml.namespaces[0] + ').');
      }
      else {

      async.parallel({
          '@context': function(callback){
            pathway['@context'] = {
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
              'PublicationXref':'biopax:PublicationXref',
              'gpmlFolder':'file://Users/andersriutta/Sites/pathvisiojs/test/gpml/',
              'name':'http://xmlns.com/foaf/0.1/name',
              'dcterms':'http://puri.org/dc/terms/',
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
              'color':'css2:colors.html#propdef-color', //foreground color
              'backgroundColor':'css2:colors.html#propdef-background-color',
              'backgroundImage':'css2:colors.html#propdef-background-image',
              'borderColor':'css2:box.html#propdef-border-color',
              'borderWidth':'css2:box.html#propdef-border-width',
              'borderStyle':'css2:box.html#propdef-border-style',
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
              'DataSource': 'gpml:Data-Source',
              'LastModified': 'gpml:Last-Modified',
              'Pathway': 'biopax:Pathway',
              'shapeLibrary': 'http://shapelibrary.example.org/',
              'shapeName': 'shapeLibrary:shapeName',
              'image': 'schema:image',
              'dataNodeType': 'gpml:Type',
              'author': 'schema:author',
              'organism': 'biopax:organism',
              'stroke': 'svg:painting.html#StrokeProperty',
              'strokeWidth': 'svg:painting.html#StrokeWidthProperty',
              /*
              'text': {
                '@id': 'svg:text.html#TextElement',
                '@type': '@id'
              },
              //*/
              'line': {
                '@id': 'svg:text.html#TSpanElement',
                '@container': '@set'
              },
              'Group': {
                '@id': 'gpml:Group',
                '@container': '@list'
              },
              'pathwayElements': {
                '@id': 'ex:pathwayElements/',
                '@container': '@list'
              },
              'contains': {
                '@id': 'ex:contains',
                '@type': '@id'
                //'@container': '@list'
              },
              'isContainedBy': {
                '@reverse': 'ex:contains',
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
              //*
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
            callback(null, pathway['@context']);
          },
          PublicationXref: function(callback){
            pathvisiojs.data.gpml.biopaxRef.getAllAsRenderableJson(gpmlPathway, function(publicationXrefs) {
              if (!!publicationXrefs) {
                pathway.PublicationXref = publicationXrefs;
                callback(null, 'BiopaxRefs are all converted.');
              }
              else {
                callback(null, 'No biopaxRefs to convert.');
              }
            });
          },
          DataSource: function(callback){
            var jsonDataSource = gpmlPathway.attr('Data-Source');
            if (!!jsonDataSource) {
              pathway.DataSource = jsonDataSource;
              callback(null, 'DataSource converted.');
            }
            else {
              callback(null, 'No DataSource to convert.');
            }
          },
          Version: function(callback){
            var jsonVersion = gpmlPathway.attr('Version');
            if (!!jsonVersion) {
              pathway.Version = jsonVersion;
              callback(null, 'Version converted.');
            }
            else {
              callback(null, 'No Version to convert.');
            }
          },
          Author: function(callback){
            var jsonAuthor = gpmlPathway.attr('Author');
            if (!!jsonAuthor) {
              pathway.Author = jsonAuthor;
              callback(null, 'Author converted.');
            }
            else {
              callback(null, 'No Author to convert.');
            }
          },
          Maintainer: function(callback){
            var jsonMaintainer = gpmlPathway.attr('Maintainer');
            if (!!jsonMaintainer) {
              pathway.Maintainer = jsonMaintainer;
              callback(null, 'Maintainer converted.');
            }
            else {
              callback(null, 'No Maintainer to convert.');
            }
          },
          Email: function(callback){
            var jsonEmail = gpmlPathway.attr('Email');
            if (!!jsonEmail) {
              pathway.Email = jsonEmail;
              callback(null, 'Email converted.');
            }
            else {
              callback(null, 'No Email to convert.');
            }
          },
          LastModified: function(callback){
            var jsonLastModified = gpmlPathway.attr('Last-Modified');
            if (!!jsonLastModified) {
              pathway.LastModified = jsonLastModified;
              callback(null, 'LastModified converted.');
            }
            else {
              callback(null, 'No LastModified to convert.');
            }
          },
          License: function(callback){
            var jsonLicense = gpmlPathway.attr('License');
            if (!!jsonLicense) {
              pathway.License = jsonLicense;
              callback(null, 'License converted.');
            }
            else {
              callback(null, 'No License to convert.');
            }
          },
          Name: function(callback){
            var jsonName = gpmlPathway.attr('Name');
            if (!!jsonName) {
              pathway.Name = jsonName;
              callback(null, 'Name converted.');
            }
            else {
              callback(null, 'No Name to convert.');
            }
          },
          Organism: function(callback){
            var jsonOrganism = gpmlPathway.attr('Organism');
            if (!!jsonOrganism) {
              pathway.Organism = jsonOrganism;
              callback(null, 'Organism converted.');
            }
            else {
              callback(null, 'No Organism to convert.');
            }
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
          Biopax: function(callback){
            var xmlBiopax = gpmlPathway.selectAll('Biopax');
            if (xmlBiopax[0].length > 0) {
              pathvisiojs.data.biopax.toRenderableJson(xmlBiopax, function(jsonBiopax) {
                pathway.Biopax = jsonBiopax;
              });
              callback(null, 'Biopax all converted.');
            }
            else {
              callback(null, 'No Biopax to convert.');
            }
          },
          DataNode: function(callback){
            var gpmlDataNode, dataNodes = gpmlPathway.selectAll('DataNode');
            if (dataNodes[0].length > 0) {
              pathway.DataNode = [];
              dataNodes.each(function() {
                gpmlDataNode = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.dataNode.toRenderableJson(gpmlDataNode, pathwayIri, function(jsonDataNode) {
                  pathway.DataNode.push(jsonDataNode);
                  pathway.nodes = pathway.nodes.concat(jsonDataNode);
                  pathway.elements = pathway.elements.concat(jsonDataNode);
                });
              })
              callback(null, 'DataNodes are all converted.');
            }
            else {
              callback(null, 'No dataNodes to convert.');
            }
          },
          Label: function(callback){
            var gpmlLabel, labels = gpmlPathway.selectAll('Label');
            if (labels[0].length > 0) {
              pathway.Label = [];
              gpmlPathway.selectAll('Label').each(function() {
                gpmlLabel = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.label.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel) {
                  pathway.Label.push(jsonLabel);
                  pathway.nodes = pathway.nodes.concat(jsonLabel);
                  pathway.elements = pathway.elements.concat(jsonLabel);
                });
              })
              callback(null, 'Labels are all converted.');
            }
            else {
              callback(null, 'No labels to convert.');
            }
          },
          Shape: function(callback){
            var gpmlShape, shapes = gpmlPathway.selectAll('Shape');
            if (shapes[0].length > 0) {
              pathway.Shape = [];
              gpmlPathway.selectAll('Shape').each(function() {
                gpmlShape = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.shape.toRenderableJson(gpmlShape, pathwayIri, function(jsonShape) {
                  pathway.Shape.push(jsonShape);
                  pathway.nodes = pathway.nodes.concat(jsonShape);
                  pathway.elements = pathway.elements.concat(jsonShape);
                });
              })
              callback(null, 'Shapes are all converted.');
            }
            else {
              callback(null, 'No shapes to convert.');
            }
          },
          Group: function(callback){
            // Note: this calculates all the data for each group-node, except for its dimensions.
            // The dimenensions can only be calculated once all the rest of the elements have been
            // converted from GPML to JSON.
            var gpmlGroup, groups = gpmlPathway.selectAll('Group');
            if (groups[0].length > 0) {
              pathway.Group = [];
              gpmlPathway.selectAll('Group').each(function() {
                gpmlGroup = d3.select(this);
                pathvisiojs.data.gpml.element.node.groupNode.toRenderableJson(gpml, gpmlGroup, pathwayIri, function(jsonGroup) {
                  pathway.Group.push(jsonGroup);
                  pathway.nodes = pathway.nodes.concat(jsonGroup);
                });
              })
              callback(null, 'Groups are all converted.');
            }
            else {
              callback(null, 'No groups to convert.');
            }
          },
          //*
          GraphicalLine: function(callback){
            var gpmlGraphicalLine, graphicalLines = gpmlPathway.selectAll('GraphicalLine');
            if (graphicalLines[0].length > 0) {
              pathway.GraphicalLine = [];
              gpmlPathway.selectAll('GraphicalLine').each(function() {
                gpmlGraphicalLine = d3.select(this);
                pathvisiojs.data.gpml.edge.graphicalLine.toRenderableJson(gpml, gpmlGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
                  pathway.GraphicalLine.push(jsonGraphicalLine);
                  pathway.edges = pathway.edges.concat(jsonGraphicalLine);
                  pathway.elements = pathway.elements.concat(jsonGraphicalLine);
                });
              })
              callback(null, 'GraphicalLines are all converted.');
            }
            else {
              callback(null, 'No graphicalLines to convert.');
            }
          },
          //*/
          Interaction: function(callback){
            var gpmlInteraction, interactions = gpmlPathway.selectAll('Interaction');
            if (interactions[0].length > 0) {
              pathway.Interaction = [];
              gpmlPathway.selectAll('Interaction').each(function() {
                gpmlInteraction = d3.select(this);
                pathvisiojs.data.gpml.edge.interaction.toRenderableJson(gpml, gpmlInteraction, pathwayIri, function(jsonInteraction) {
                  pathway.Interaction.push(jsonInteraction);
                  pathway.edges = pathway.edges.concat(jsonInteraction);
                  pathway.elements = pathway.elements.concat(jsonInteraction);
                });
              })
              callback(null, 'Interactions are all converted.');
            }
            else {
              callback(null, 'No interactions to convert.');
            }
          }
      },
      function(err, results) {
        var groupsFrame, jsonGroups = [];
        if (!!pathway.Group) {
          groupsFrame = {
            '@context': pathway['@context'],
            '@type': 'GroupNode',
            'contains': {}
          };  
          jsonld.frame(pathway, groupsFrame, function(err, framedGroups) {
            async.waterfall([
              function(callbackInside){
                framedGroups['@graph'].forEach(function(jsonGroup) {
                  // Some GPML files contain empty groups due to a PathVisio-Java bug. They are deleted
                  // here because only groups that pass the test (!!jsonGroup.contains) are added to
                  // the jsonGroups array, and the jsonGroups array overwrites pathway.Group.
                  if (!!jsonGroup.contains) {
                    pathvisiojs.data.gpml.element.node.groupNode.getGroupDimensions(jsonGroup, function(dimensions) {
                      jsonGroup.x = dimensions.x;
                      jsonGroup.y = dimensions.y;
                      jsonGroup.width = dimensions.width;
                      jsonGroup.height = dimensions.height;
                      jsonGroup.zIndex = dimensions.zIndex;
                      pathvisiojs.data.gpml.element.node.getPorts(jsonGroup, function(ports) {
                        jsonGroup.Port = ports;
                        if (jsonGroups.indexOf(jsonGroup) === -1) {
                          jsonGroups.push(jsonGroup);
                        }
                      });
                    });
                  }
                });
                callbackInside(null, jsonGroups);
              },
              function(jsonGroups, callbackInside){
                pathway.Group = jsonGroups;
                pathway.elements = pathway.elements.concat(pathway.Group);

                var relativeZIndexByRenderableType = {
                  'GroupNode': 0,
                  'Interaction': 1,
                  'GraphicalLine': 2,
                  'Anchor': 3,
                  'EntityNode': 4
                }

                // sort by explicitly set z-index for all elements except GroupNodes, which use the lowest z-index
                // of their contained elements, and anchors, which use their parent element's z-index
                //TODO check whether anchors have been set to have a z-index
                pathway.elements.sort(function(a, b) {
                  var aPriority, bPriority;
                  if (a.zIndex !== b.zIndex) {
                    // if two elements have the same z-index,
                    // they will be sub-sorted by renderableElementType priority,
                    // as indicated in relativeZIndexByRenderableType
                    aPriority = a.zIndex + relativeZIndexByRenderableType[a.renderableType];
                    bPriority = b.zIndex + relativeZIndexByRenderableType[b.renderableType];
                  }
                  else {
                    aPriority = a.zIndex;
                    bPriority = b.zIndex;
                  }
                  return aPriority - bPriority;
                });
                callbackInside(null, pathway);
              },
              function(pathway, callbackInside){
                /*
                 * we don't need this until we start rendering without cached data
                pathway.pathwayNestedByDependencies = d3.nest()
                .key(function(d) { return d.hasDependencies; })
                .entries(pathway.elements);
                //*/

                pathway.pathwayNestedByGrouping = d3.nest()
                .key(function(d) { return d.isContainedBy; })
                .entries(pathway.elements);

                var firstOrderElement = pathway.pathwayNestedByGrouping.filter(function(group) {
                  return group.key === 'undefined';
                })[0];
                pathway.pathwayNestedByGrouping = pathvisiojs.utilities.moveArrayItem(pathway.pathwayNestedByGrouping, pathway.pathwayNestedByGrouping.indexOf(firstOrderElement), 0);
                callbackInside(null, pathway);
              },
              function(pathway, callbackInside){
                self.myPathway = pathway;
                callbackOutside(pathway);
              }
            ]);
          });
        }
        else {
          pathway.elements.sort(function(a, b) {
            return a.zIndex - b.zIndex;
          });

          pathway.pathwayNestedByGrouping = d3.nest()
          .key(function(d) { return d.isContainedBy; })
          .entries(pathway.elements);

          //self.myPathway = pathway;
          callbackOutside(pathway);
        }
      });
      }
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

      //*/
    }
    else {
      alert('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
      throw new Error('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
    }
  }

  return {
    get:get,
    toRenderableJson:toRenderableJson,
    getLineStyle:getLineStyle,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson,
    gpmlColorToCssColor:gpmlColorToCssColor,
    setColorAsJson:setColorAsJson
  };
}();

// hack required because we call ...node.anchors.toRenderableJson() before we
// call the other ...node.toRenderableJson() methods
pathvisiojs.data.gpml.node = pathvisiojs.data.gpml.node || {};
