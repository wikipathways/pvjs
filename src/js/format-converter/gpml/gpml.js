var GpmlUtils = require('./utilities.js')
  , Async = require('async')
  , Biopax = require('./../biopax/biopax.js')
  // , Anchor = require('./anchor.js')
  , BiopaxRef = require('./biopax-ref.js')
  // , Comment = require('./comment.js')
  , DataNode = require('./data-node.js')
  // , Element = require('./element.js')
  , GraphicalLine = require('./graphical-line.js')
  // , Graphics = require('./graphics.js')
  , Group = require('./group.js')
  , Interaction = require('./interaction.js')
  , Label = require('./label.js')
  // , Point = require('./point.js')
  , Shape = require('./shape.js')
  , State = require('./state.js')
  // , Text = require('./text.js')
  ;

module.exports = {
  toPvjson: function(pvjs, xml, callbackOutside){
    var gpmlSelection = this.addIsContainedByAttribute(this.makeExplicit(d3.select(xml)))
      , pvjson = {
          elements: []
        , xmlns: gpmlSelection.attr('xmlns')
      }

    // test for whether file is GPML
    if (GpmlUtils.supportedNamespaces.indexOf(pvjson.xmlns) === -1) {
      callbackOutside('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.', {})
    } else {
      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).
      if (GpmlUtils.supportedNamespaces.indexOf(pvjson.xmlns) !== 0) {
        // TODO call the Java RPC updater or in some other way call for the file to be updated.
        callbackOutside('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + pvjson.xmlns + '). Please convert to the supported version of GPML (xmlns: ' + GpmlUtils.supportedNamespaces[0] + ').', {})
      } else {
        Async.parallel({
          '@context': function(callback){
            pvjson['@context'] = {
              '@vocab':'http://vocabularies.wikipathways.org/gpml#',
              '@base': pvjs.sourceData.uri,
              'gpml':'http://vocabularies.wikipathways.org/gpml#',
              'id':'@id',
              /*
              'id': {
                '@id': 'http://purl.org/dc/terms/identifier',
                '@type': '@id'
              },
              //*/
              'xsd': 'http://www.w3.org/2001/XMLSchema#',
              'wp':'http://vocabularies.wikipathways.org/wp#',
              'biopax': 'http://www.biopax.org/release/biopax-level3.owl#',
              'schema':'http://schema.org/',
              'hMDB':'http://www.hmdb.ca/metabolites/HMDB',
              'entrezGene':'http://www.ncbi.nlm.nih.gov/gene/',
              'ChEBI':'http://www.ebi.ac.uk/chebi/searchId.do?chebiId=',
              'media':'http://www.w3.org/TR/mediaont-10/',
              'ex':'http://www.example.com/',
              'pathwayIri':pvjs.sourceData.uri,
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
              'x': {
                '@id': 'css2:visuren.html#propdef-left',
                '@type': 'xsd:integer'
              },
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
            callback(null, pvjson['@context']);
          },
          PublicationXref: function(callback){
            BiopaxRef.getAllAsPvjson(gpmlSelection, function(publicationXrefs) {
              if (!!publicationXrefs) {
                pvjson.PublicationXref = publicationXrefs;
                callback(null, 'BiopaxRefs are all converted.');
              }
              else {
                callback(null, 'No biopaxRefs to convert.');
              }
            });
          },
          DataSource: function(callback){
            var jsonDataSource = gpmlSelection.attr('Data-Source');
            if (!!jsonDataSource) {
              pvjson.DataSource = jsonDataSource;
              callback(null, 'DataSource converted.');
            }
            else {
              callback(null, 'No DataSource to convert.');
            }
          },
          Version: function(callback){
            var jsonVersion = gpmlSelection.attr('Version');
            if (!!jsonVersion) {
              pvjson.Version = jsonVersion;
              callback(null, 'Version converted.');
            }
            else {
              callback(null, 'No Version to convert.');
            }
          },
          Author: function(callback){
            var jsonAuthor = gpmlSelection.attr('Author');
            if (!!jsonAuthor) {
              pvjson.Author = jsonAuthor;
              callback(null, 'Author converted.');
            }
            else {
              callback(null, 'No Author to convert.');
            }
          },
          Maintainer: function(callback){
            var jsonMaintainer = gpmlSelection.attr('Maintainer');
            if (!!jsonMaintainer) {
              pvjson.Maintainer = jsonMaintainer;
              callback(null, 'Maintainer converted.');
            }
            else {
              callback(null, 'No Maintainer to convert.');
            }
          },
          Email: function(callback){
            var jsonEmail = gpmlSelection.attr('Email');
            if (!!jsonEmail) {
              pvjson.Email = jsonEmail;
              callback(null, 'Email converted.');
            }
            else {
              callback(null, 'No Email to convert.');
            }
          },
          LastModified: function(callback){
            var jsonLastModified = gpmlSelection.attr('Last-Modified');
            if (!!jsonLastModified) {
              pvjson.LastModified = jsonLastModified;
              callback(null, 'LastModified converted.');
            }
            else {
              callback(null, 'No LastModified to convert.');
            }
          },
          License: function(callback){
            var jsonLicense = gpmlSelection.attr('License');
            if (!!jsonLicense) {
              pvjson.License = jsonLicense;
              callback(null, 'License converted.');
            }
            else {
              callback(null, 'No License to convert.');
            }
          },
          Name: function(callback){
            var jsonName = gpmlSelection.attr('Name');
            if (!!jsonName) {
              pvjson.Name = jsonName;
              callback(null, 'Name converted.');
            }
            else {
              callback(null, 'No Name to convert.');
            }
          },
          Organism: function(callback){
            var jsonOrganism = gpmlSelection.attr('Organism');
            if (!!jsonOrganism) {
              pvjson.Organism = jsonOrganism;
              callback(null, 'Organism converted.');
            }
            else {
              callback(null, 'No Organism to convert.');
            }
          },
          image: function(callback){
            pvjson.image = {
              '@context': {
                '@vocab': 'http://schema.org/'
              },
              'width':parseFloat(gpmlSelection.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlSelection.select('Graphics').attr('BoardHeight'))
            };
            callback(null, pvjson.image);
          },
          Biopax: function(callback){
            var xmlBiopax = gpmlSelection.selectAll('Biopax');
            if (xmlBiopax[0].length > 0) {
              Biopax.toPvjson(pvjs, xmlBiopax, function(jsonBiopax) {
                pvjson.Biopax = jsonBiopax;
              });
              callback(null, 'Biopax all converted.');
            }
            else {
              callback(null, 'No Biopax to convert.');
            }
          },
          DataNode: function(callback){
            var dataNodeSelection, dataNodesSelection = gpmlSelection.selectAll('DataNode');
            if (dataNodesSelection[0].length > 0) {
              dataNodesSelection.each(function() {
                dataNodeSelection = d3.select(this);
                DataNode.toPvjson(pvjs, pvjson, gpmlSelection, dataNodeSelection, function(pvjsonElements) {
                  pvjson.elements = pvjson.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'DataNodes are all converted.');
            }
            else {
              callback(null, 'No dataNodes to convert.');
            }
          },
          Label: function(callback){
            var labelSelection, labelsSelection = gpmlSelection.selectAll('Label');
            if (labelsSelection[0].length > 0) {
              gpmlSelection.selectAll('Label').each(function() {
                labelSelection = d3.select(this);
                Label.toPvjson(pvjs, gpmlSelection, labelSelection, function(pvjsonElements) {
                  pvjson.elements = pvjson.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'Labels are all converted.');
            }
            else {
              callback(null, 'No labels to convert.');
            }
          },
          Shape: function(callback){
            var shapeSelection, shapesSelection = gpmlSelection.selectAll('Shape');
            if (shapesSelection[0].length > 0) {
              gpmlSelection.selectAll('Shape').each(function() {
                shapeSelection = d3.select(this);
                Shape.toPvjson(pvjs, gpmlSelection, shapeSelection, function(pvjsonElements) {
                  pvjson.elements = pvjson.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'Shapes are all converted.');
            }
            else {
              callback(null, 'No shapes to convert.');
            }
          },
          /*
          Anchor: function(callback){
            var anchorSelection, anchorsSelection = gpmlSelection.selectAll('Anchor');
            if (anchorsSelection[0].length > 0) {
              pvjson.anchors = [];
              anchorsSelection.each(function() {
                anchorSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.anchor.toPvjson(gpmlSelection, anchorSelection, function(pvjsonElements) {
                  pvjson.anchors = pvjsonElements;
                  pvjson.elements = pvjson.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'Anchors are all converted.');
            }
            else {
              callback(null, 'No anchors to convert.');
            }
          },
          //*/
          State: function(callback){
            var stateSelection, statesSelection = gpmlSelection.selectAll('State');
            if (statesSelection[0].length > 0) {
              statesSelection.each(function() {
                stateSelection = d3.select(this);
                State.toPvjson(pvjs, gpmlSelection, stateSelection, function(pvjsonElements) {
                  pvjson.elements = pvjson.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'States are all converted.');
            }
            else {
              callback(null, 'No states to convert.');
            }
          },
          GraphicalLine: function(callback){
            var graphicalLineSelection, graphicalLinesSelection = gpmlSelection.selectAll('GraphicalLine');
            if (graphicalLinesSelection[0].length > 0) {
              gpmlSelection.selectAll('GraphicalLine').each(function() {
                graphicalLineSelection = d3.select(this);
                GraphicalLine.toPvjson(pvjs, xml, graphicalLineSelection, function(pvjsonElements) {
                  pvjson.elements = pvjson.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'GraphicalLines are all converted.');
            }
            else {
              callback(null, 'No graphicalLines to convert.');
            }
          },
          Interaction: function(callback){
            var interactionSelection, interactionsSelection = gpmlSelection.selectAll('Interaction');
            if (interactionsSelection[0].length > 0) {
              gpmlSelection.selectAll('Interaction').each(function() {
                interactionSelection = d3.select(this);
                Interaction.toPvjson(pvjs, xml, interactionSelection, function(pvjsonElements) {
                  pvjson.elements = pvjson.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'Interactions are all converted.');
            }
            else {
              callback(null, 'No interactions to convert.');
            }
          }
        },
        function(err, results) {
          var contents,
            index,
            elementsBefore,
            elementsAfter,
            textElementsDescribingGroup,
            text;


          // Note: this calculates all the data for each group-node, except for its dimensions.
          // The dimenensions can only be calculated once all the rest of the elements have been
          // converted from GPML to JSON.
          var groupSelection, groupsSelection = gpmlSelection.selectAll('Group');
          if (groupsSelection[0].length > 0) {
            var groups = [];
            gpmlSelection.selectAll('Group').each(function() {
              groupSelection = d3.select(this);
              Group.toPvjson(pvjs, pvjson.elements, gpmlSelection, groupSelection, function(pvjsonElements) {
                pvjson.elements = pvjson.elements.concat(pvjsonElements);
              });
            });
          }
          pvjson.elements.sort(function(a, b) {
            return a.zIndex - b.zIndex;
          });

          callbackOutside(null, pvjson);
        });
      }
    }
  },

  // Removes confusion of GroupId vs. GraphId by just using GraphId to identify containing elements
  addIsContainedByAttribute: function(gpmlSelection) {
    gpmlSelection.selectAll('Group').each(function() {
      var groupSelection = d3.select(this);
      var groupId = groupSelection.attr('GroupId');
      groupSelection.attr('GroupId', null);
      var graphId = groupSelection.attr('GraphId');
      var groupedElementsSelection = gpmlSelection.selectAll('[GroupRef=' + groupId + ']').each(function(){
        var groupedElementSelection = d3.select(this)
        .attr('IsContainedBy', graphId)
        .attr('GroupRef', null);
      });
    });
    return gpmlSelection;
  },

  selectByMultipleTagNames: function(args){
    var gpmlSelection = args.gpmlSelection;
    var elementTags = args.elementTags;
    var elementsSelection;
    var newElementsSelection;
    elementTags.forEach(function(elementTag){
      newElementsSelection = gpmlSelection.selectAll(elementTag);
      if (!!newElementsSelection[0][0]) {
        if (!!elementsSelection) {
          elementsSelection[0] = elementsSelection[0].concat(newElementsSelection[0]);
        }
        else {
          elementsSelection = newElementsSelection;
        }
      }
    });
    return elementsSelection;
  },

  // Fills in implicit values
  makeExplicit: function(gpmlSelection) {
    var groupSelection, groupGroupSelection, groupNoneSelection, groupPathwaySelection, groupComplexSelection, cellularComponentValue,
      groupGraphicsSelection, groupGroupGraphicsSelection, groupNoneGraphicsSelection, groupPathwayGraphicsSelection, groupComplexGraphicsSelection,
      graphId, graphIdStub, graphIdStubs = [];

    var selectAllGraphicalElementsArgs = {};
    selectAllGraphicalElementsArgs.gpmlSelection = gpmlSelection;
    selectAllGraphicalElementsArgs.elementTags = [
      'DataNode',
      'Label',
      'Shape',
      'State',
      'Anchor',
      'Interaction',
      'GraphicalLine',
      'Group'
    ];
    var graphicalElementsSelection = this.selectByMultipleTagNames(selectAllGraphicalElementsArgs);
    // graphIdStub is whatever follows 'id' at the beginning of the GraphId string
    if (!!graphicalElementsSelection[0][0]) {
      graphicalElementsSelection.filter(function(){
        return (!!d3.select(this).attr('GraphId'));
      }).each(function(){
        graphId = d3.select(this).attr('GraphId');
        if (graphId.slice(0,2) === 'id') {
          graphIdStub = graphId.slice(2, graphId.length);
          graphIdStubs.push(graphIdStub);
        }
      });
      graphIdStubs.sort(function(a,b){
        return parseInt(a, 32) - parseInt(b, 32);
      });
      var largestGraphIdStub = graphIdStubs[graphIdStubs.length - 1] || 0;

      // Add a GraphId to every element missing a GraphId by converting the largest graphIdStub to int, incrementing,
      // converting back to base32 and appending it to the string 'id'.
      graphicalElementsSelection.filter(function(){
        return (!d3.select(this).attr('GraphId'));
      }).each(function(){
        largestGraphIdStub = (parseInt(largestGraphIdStub, 32) + 1).toString(32);
        d3.select(this).attr('GraphId', 'id' + largestGraphIdStub);
      });

      var groupsSelection = gpmlSelection.selectAll('Group');
      groupsSelection.each(function(){
        groupSelection = d3.select(this);
        groupGraphicsSelection = groupSelection.append('Graphics')
        .attr('Align', 'Center')
        .attr('Valign', 'Middle')
        .attr('FontWeight', 'Bold')
        .attr('LineThickness', 1)
        .attr('FillOpacity', 0.1);
      });
      var groupGroupsSelection = gpmlSelection.selectAll('Group[Style=Group]').each(function(){
        groupGroupSelection = d3.select(this);
        groupGroupGraphicsSelection = groupGroupSelection.select('Graphics')
        .attr('FontSize', '1')
        .attr('Padding', '8')
        .attr('ShapeType', 'None')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', 'Transparent');
      });
      var groupNonesSelection = gpmlSelection.selectAll('Group[Style=None]').each(function(){
        groupNoneSelection = d3.select(this);
        groupNoneGraphicsSelection = groupNoneSelection.select('Graphics')
        .attr('FontSize', '1')
        .attr('Padding', '8')
        .attr('ShapeType', 'Rectangle')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', 'B4B464');
      });

      if (!!groupsSelection[0][0]) {
        groupsSelection.filter(function(){
          var graphicsSelection = d3.select(this).select('Graphics');
          return (!graphicsSelection.attr('ShapeType'));
        }).each(function(d, i){
          d3.select(this).select('Graphics').attr('ShapeType', 'None');
          groupNoneSelection = d3.select(this);
          groupNoneGraphicsSelection = groupNoneSelection.select('Graphics')
          .attr('FontSize', '1')
          .attr('Padding', '8')
          .attr('ShapeType', 'Rectangle')
          .attr('LineStyle', 'Broken')
          .attr('Color', '808080')
          .attr('FillColor', 'B4B464');
        });
      }

      var groupComplexesSelection = gpmlSelection.selectAll('Group[Style=Complex]').each(function(){
        groupComplexSelection = d3.select(this);
        groupComplexGraphicsSelection = groupComplexSelection.select('Graphics')
        .attr('FontSize', '1')
        .attr('Padding', '11')
        .attr('ShapeType', 'Complex')
        .attr('Color', '808080')
        .attr('FillColor', 'B4B464')
        .attr('LineStyle', 'Solid');
      });
      var groupPathwaysSelection = gpmlSelection.selectAll('Group[Style=Pathway]').each(function(){
        groupPathwaySelection = d3.select(this);
        groupPathwayGraphicsSelection = groupPathwaySelection.select('Graphics')
        .attr('FontSize', '1')
        //.attr('FontSize', '32')
        .attr('Padding', '8')
        .attr('ShapeType', 'Rectangle')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', '00FF00');
      });

      // nodesSelection does not include Groups
      var selectAllNodesArgs = {};
      selectAllNodesArgs.gpmlSelection = gpmlSelection;
      selectAllNodesArgs.elementTags = [
        'DataNode',
        'Label',
        'Shape',
        'State'
      ];
      var nodesSelection = this.selectByMultipleTagNames(selectAllNodesArgs);
      if (!!nodesSelection[0][0]) {
        var labelsSelection = gpmlSelection.selectAll('Label');
        if (!!labelsSelection[0][0]) {
          labelsSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('ShapeType'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('ShapeType', 'None');
          });
          labelsSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(d, i){
            d3.select(this).select('Graphics').attr('FillColor', 'Transparent');
          });
        }

        var statesSelection = gpmlSelection.selectAll('State');
        if (!!statesSelection[0][0]) {
          statesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'ffffff');
          });

          statesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FontSize'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FontSize', 10);
          });

          statesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('Valign'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('Valign', 'Middle');
          });
        }

        var shapesSelection = gpmlSelection.selectAll('Shape');
        if (!!shapesSelection[0][0]) {
          shapesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'Transparent');
          });

          shapesSelection.filter(function(){
            return (d3.select(this).select('Graphics').attr('Rotation') === '0.0');
          }).each(function(){
            d3.select(this).select('Graphics').attr('Rotation', null);
          });

          var cellularComponentsSelection = shapesSelection.selectAll('[Key="org.pathvisio.CellularComponentProperty"]').each(function(){
            cellularComponentValue = d3.select(this).attr('Value');
            // IE11 doesn't like parentNode, but I think some other browsers don't support parentElement
            var parent = this.parentElement || this.parentNode;
            d3.select(parent).attr('CellularComponent', cellularComponentValue);
          });
        }

        // "Ellipse" is the word that other graphics libraries seem to have standardized on.
        nodesSelection.filter(function(){
          return (d3.select(this).select('Graphics').attr('ShapeType') === 'Oval');
        }).each(function(){
          d3.select(this).select('Graphics').attr('ShapeType', 'Ellipse');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Padding'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Padding', '0.5em');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ShapeType'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ShapeType', 'Rectangle');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Color'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Color', '000000');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('LineThickness'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('LineThickness', 1);
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ZOrder'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ZOrder', 0);
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Align'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Align', 'Center');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Valign'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Valign', 'Top');
        });

        // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
        // Below we correct the GPML so that the display in pathvisiojs will match the display in PathVisio-Java.
        var gpmlWidth, correctedGpmlWidth, gpmlHeight, gpmlCenterX, gpmlCenterY, xScaleFactor;
        var triangleSelection,
          triangleXCorrectionFactor = 0.311,
          triangleYCorrectionFactor = 0.07,
          triangleWidthCorrectionFactor = 0.938,
          triangleHeightCorrectionFactor = 0.868;
        var trianglesSelection = shapesSelection.selectAll('[ShapeType="Triangle"]');
        trianglesSelection.each(function(){
          triangleSelection = d3.select(this);

          gpmlCenterX = parseFloat(triangleSelection.attr('CenterX'));
          gpmlCenterY = parseFloat(triangleSelection.attr('CenterY'));
          gpmlWidth = parseFloat(triangleSelection.attr('Width'));
          gpmlHeight = parseFloat(triangleSelection.attr('Height'));

          var correctedWidth = gpmlWidth * triangleWidthCorrectionFactor;
          var uncorrectedX = gpmlCenterX - gpmlWidth/2;

          var uncorrectedY = gpmlCenterY - gpmlHeight/2;
          var correctedHeight = gpmlHeight * triangleHeightCorrectionFactor;

          var gpmlRotation = triangleSelection.attr('Rotation') || 0;
          // Remember that GPML saves rotation in radians, even though PathVisio-Java displays rotation in degrees.
          // This conversion changes the rotation to reflect the angle between the green rotation control dot in PathVisio-Java and the X-axis.
          var angleToControlPoint = 2 * Math.PI - gpmlRotation;
          var triangleXCorrectionAccountingForRotation = triangleXCorrectionFactor * Math.cos(angleToControlPoint) * gpmlWidth + triangleYCorrectionFactor * Math.sin(angleToControlPoint) * gpmlHeight;

          var distanceTriangleTipExtendsBeyondBBox = ((gpmlCenterX + triangleXCorrectionFactor * gpmlWidth - gpmlWidth/2) + correctedWidth) - (gpmlCenterX + gpmlWidth/2);
          var triangleYCorrection = (-1) * distanceTriangleTipExtendsBeyondBBox * Math.sin(angleToControlPoint) + triangleYCorrectionFactor * Math.cos(angleToControlPoint) * gpmlHeight;

          var correctedX = uncorrectedX + triangleXCorrectionAccountingForRotation;
          var correctedY = uncorrectedY + triangleYCorrection;

          triangleSelection.attr('CenterX', correctedX + correctedWidth / 2)
          .attr('CenterY', correctedY + correctedHeight / 2)
          .attr('Height', correctedHeight)
          .attr('Width', correctedWidth);
        });
        var arcSelection;
        var arcsSelection = shapesSelection.selectAll('[ShapeType="Arc"]').each(function(){
          arcSelection = d3.select(this);

          var gpmlHeight = parseFloat(arcSelection.attr('Height'));
          var gpmlWidth = parseFloat(arcSelection.attr('Width'));
          var correctedHeight = gpmlHeight / 2;

          // TODO refactor this code to be DRY (repeated above)
          var gpmlRotation = arcSelection.attr('Rotation') || 0;
          // Remember that GPML saves rotation in radians, even though PathVisio-Java displays rotation in degrees.
          // This conversion changes the rotation to reflect the angle between the green rotation control dot in PathVisio-Java and the X-axis.
          var angleToControlPoint = 2 * Math.PI - gpmlRotation;

          gpmlCenterX = parseFloat(arcSelection.attr('CenterX'));
          gpmlCenterY = parseFloat(arcSelection.attr('CenterY'));
          var x = gpmlCenterX - gpmlWidth / 2;
          var y = gpmlCenterY - gpmlHeight / 2;

          var correctedX = x + correctedHeight * Math.sin(angleToControlPoint);
          var correctedY = y + correctedHeight * Math.cos(angleToControlPoint);

          var correctedCenterX = correctedX + gpmlWidth / 2;
          var correctedCenterY = correctedY + correctedHeight;
          arcSelection.attr('CenterX', correctedCenterX)
          .attr('CenterY', correctedCenterY);
        });
        var pentagonSelection,
          pentagonXScaleFactor = 0.904,
          pentagonYScaleFactor = 0.95;
        var pentagonsSelection = shapesSelection.selectAll('[ShapeType="Pentagon"]').each(function(){
          pentagonSelection = d3.select(this);
          gpmlWidth = parseFloat(pentagonSelection.attr('Width'));
          gpmlHeight = parseFloat(pentagonSelection.attr('Height'));
          gpmlCenterX = parseFloat(pentagonSelection.attr('CenterX'));
          pentagonSelection.attr('CenterX', gpmlCenterX + gpmlWidth * (1 - pentagonXScaleFactor) / 2)
          .attr('Width', gpmlWidth * pentagonXScaleFactor)
          .attr('Height', gpmlHeight * pentagonYScaleFactor);
        });
        var hexagonSelection,
          hexagonYScaleFactor = 0.88;
        var hexagonsSelection = shapesSelection.selectAll('[ShapeType="Hexagon"]').each(function(){
          hexagonSelection = d3.select(this);
          gpmlHeight = parseFloat(hexagonSelection.attr('Height'));
          hexagonSelection.attr('Height', gpmlHeight * hexagonYScaleFactor);
        });

        var dataNodeSelection, dataNodeType;
        var dataNodesSelection = gpmlSelection.selectAll('DataNode');
        if (!!dataNodesSelection[0][0]) {
          /*
          dataNodesSelection.each(function(){
            dataNodeSelection = d3.select(this);
            dataNodeType = dataNodeSelection.attr('Type');
            dataNodeSelection.attr('BiologicalType', dataNodeType)
            .attr('Type', null);
          });
          //*/

          dataNodesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'ffffff');
          });
        }

      }

      // This applies to both nodes and edges
      var doubleLinesSelection = gpmlSelection.selectAll('[Key="org.pathvisio.DoubleLineProperty"]').each(function(){
        // IE11 doesn't like parentNode, but I think some other browsers don't support parentElement
        var parent = this.parentElement || this.parentNode;
        d3.select(parent).select('Graphics').attr('LineStyle', 'Double');
      });

      var selectAllEdgesArgs = {};
      selectAllEdgesArgs.gpmlSelection = gpmlSelection;
      selectAllEdgesArgs.elementTags = [
        'Interaction',
        'GraphicalLine'
      ];
      var edgesSelection = this.selectByMultipleTagNames(selectAllEdgesArgs);

      if (!!edgesSelection) {
        edgesSelection.each(function(){
          d3.select(this).select('Graphics').attr('FillColor', 'Transparent');
        });
        edgesSelection.filter(function(){
          var graphicsSelection = d3.select(this).select('Graphics');
          return (!graphicsSelection.attr('ConnectorType'));
        }).each(function(d, i){
          d3.select(this).select('Graphics').attr('ConnectorType', 'Straight');
        });
        edgesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Color'));
        }).each(function(d, i){
          d3.select(this).select('Graphics').attr('Color', '000000');
        });

        var anchorsSelection = gpmlSelection.selectAll('Anchor');
        anchorsSelection.each(function(d, i){
          // IE11 doesn't like parentNode, but I think some other browsers don't support parentElement
          var parent = this.parentElement || this.parentNode;
          var parentGraphicsSelection = d3.select(parent);
          var anchorSelection = d3.select(this);
          var graphics = anchorSelection.append('Graphics');

          var shapeTypeValue = anchorSelection.attr('Shape') || 'None';
          graphics.attr('ShapeType', shapeTypeValue);
          anchorSelection.attr('Shape', null);

          var positionValue = anchorSelection.attr('Position');
          graphics.attr('Position', positionValue);
          anchorSelection.attr('Position', null);

          graphics.attr('LineThickness', 0);
          graphics.attr('FillColor', parentGraphicsSelection.attr('Color'));
          // In a future version of GPML, we could improve rendering speed if we included the cached X and Y values for Anchors, just like we currently do for Points.
        });
        if (!!anchorsSelection[0][0]) {
          anchorsSelection.filter(function(){
            var graphicsSelection = d3.select(this).select('Graphics');
            var result = false;
            if (!!graphicsSelection[0][0]) {
              result = graphicsSelection.attr('ShapeType') === 'Circle';
            }
            return result;
          }).each(function(d, i){
            d3.select(this).select('Graphics').attr('ShapeType', 'Ellipse');
            d3.select(this).select('Graphics').attr('Width', 8);
            d3.select(this).select('Graphics').attr('Height', 8);
          });
          anchorsSelection.filter(function(){
            var graphicsSelection = d3.select(this).select('Graphics');
            var result = false;
            if (!!graphicsSelection[0][0]) {
              result = graphicsSelection.attr('ShapeType') === 'None';
            }
            return result;
          }).each(function(d, i){
            d3.select(this).select('Graphics').attr('Width', 4);
            d3.select(this).select('Graphics').attr('Height', 4);
          });
        }
      }
    }

    return gpmlSelection;
  },
}
