pathvisiojs.data.gpml = function(){
  'use strict';

  var defaults = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  };

  // Removes confusion of GroupId vs. GraphId by just using GraphId to identify containing elements
  var addIsContainedByAttribute = function(gpmlSelection) {
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
  };

  var selectByMultipleTagNames = function(args){
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
  };

  // Fills in implicit values
  var makeExplicit = function(gpmlSelection) {
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
    var graphicalElementsSelection = selectByMultipleTagNames(selectAllGraphicalElementsArgs);
    // graphIdStub is whatever follows 'id' at the beginning of the GraphId string
    if (!!graphicalElementsSelection) {
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

      var groupsSelection = gpmlSelection.selectAll('Group').each(function(){
        groupSelection = d3.select(this);
        groupGraphicsSelection = groupSelection.append('Graphics')
        .attr('Align', 'Center')
        .attr('Valign', 'Middle')
        .attr('FontSize', '32')
        .attr('FontWeight', 'Bold')
        .attr('LineThickness', 1);
      });
      var groupGroupsSelection = gpmlSelection.selectAll('Group[Style=Group]').each(function(){
        groupGroupSelection = d3.select(this);
        groupGroupGraphicsSelection = groupGroupSelection.select('Graphics')
        .attr('Padding', '8')
        .attr('ShapeType', 'None')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', 'Transparent');
      });
      var groupNonesSelection = gpmlSelection.selectAll('Group[Style=None]').each(function(){
        groupNoneSelection = d3.select(this);
        groupNoneGraphicsSelection = groupNoneSelection.select('Graphics')
        .attr('Padding', '8')
        .attr('ShapeType', 'Rectangle')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', 'B4B464');
      });

      if (!!groupsSelection) {
        groupsSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ShapeType'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ShapeType', 'None');
          groupNoneSelection = d3.select(this);
          groupNoneGraphicsSelection = groupNoneSelection.select('Graphics')
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
        .attr('Padding', '11')
        .attr('ShapeType', 'Complex')
        .attr('Color', '808080')
        .attr('FillColor', 'B4B464');
      });
      var groupPathwaysSelection = gpmlSelection.selectAll('Group[Style=Pathway]').each(function(){
        groupPathwaySelection = d3.select(this);
        groupPathwayGraphicsSelection = groupPathwaySelection.select('Graphics')
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
      var nodesSelection = selectByMultipleTagNames(selectAllNodesArgs);
      if (!!nodesSelection) {
        var labelsSelection = gpmlSelection.selectAll('Label');
        if (!!labelsSelection) {
          labelsSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('ShapeType'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('ShapeType', 'None');
          });
          labelsSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'Transparent');
          });
        }

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

        var shapesSelection = gpmlSelection.selectAll('Shape');
        if (!!shapesSelection) {
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
            d3.select(this.parentElement).attr('CellularComponent', cellularComponentValue);
          });
        }

        // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
        // Below we correct the GPML so that the display in pathvisiojs will match the display in PathVisio-Java.
        var gpmlWidth, correctedGpmlWidth, gpmlHeight, gpmlCenterX, gpmlCenterY, xScaleFactor;
        var triangleSelection,
          triangleDxAsPercentageOfWidth = 0.307584375,
          triangleDxPlusWidthAsPercentageOfWidth = 1.24596225,
          triangleYScaleFactor = 0.868;
        var trianglesSelection = shapesSelection.selectAll('[ShapeType="Triangle"]').each(function(){
          triangleSelection = d3.select(this);
          console.log('triangleSelection');
          console.log(triangleSelection);
          gpmlCenterX = parseFloat(triangleSelection.attr('CenterX'));
          gpmlCenterY = parseFloat(triangleSelection.attr('CenterY'));
          gpmlWidth = parseFloat(triangleSelection.attr('Width'));
          gpmlHeight = parseFloat(triangleSelection.attr('Height'));

          console.log('gpmlWidth');
          console.log(gpmlWidth);
          console.log('gpmlCenterX');
          console.log(gpmlCenterX);
          var uncorrectedX = gpmlCenterX - gpmlWidth/2;
          console.log('uncorrectedX');
          console.log(uncorrectedX);
          var correctedX = uncorrectedX + gpmlWidth * triangleDxAsPercentageOfWidth;
          console.log('correctedX');
          console.log(correctedX);
          var correctedWidth = (uncorrectedX + gpmlWidth * triangleDxPlusWidthAsPercentageOfWidth) - correctedX;
          console.log('correctedWidth');
          console.log(correctedWidth);
          triangleSelection.attr('CenterX', correctedX + correctedWidth / 2)
          .attr('Height', gpmlHeight * triangleYScaleFactor)
          .attr('Width', correctedWidth);
        });
        var arcSelection;
        var arcsSelection = shapesSelection.selectAll('[ShapeType="Arc"]').each(function(){
          arcSelection = d3.select(this);
          gpmlHeight = parseFloat(arcSelection.attr('Height'));
          gpmlCenterY = parseFloat(arcSelection.attr('CenterY'));
          arcSelection.attr('CenterY', gpmlCenterY + gpmlHeight / 2);
        });
        var pentagonSelection,
          pentagonXScaleFactor = 452/500;
        var pentagonsSelection = shapesSelection.selectAll('[ShapeType="Pentagon"]').each(function(){
          pentagonSelection = d3.select(this);
          gpmlWidth = parseFloat(pentagonSelection.attr('Width'));
          gpmlCenterX = parseFloat(pentagonSelection.attr('CenterX'));
          pentagonSelection.attr('CenterX', gpmlCenterX + gpmlWidth * (1 - pentagonXScaleFactor) / 2)
          .attr('Width', gpmlWidth * pentagonXScaleFactor);
        });

        var dataNodeSelection, dataNodeType;
        var dataNodesSelection = gpmlSelection.selectAll('DataNode');
        if (!!dataNodesSelection) {
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
        d3.select(this.parentElement).select('Graphics').attr('LineStyle', 'Double');
      });

      var selectAllEdgesArgs = {};
      selectAllEdgesArgs.gpmlSelection = gpmlSelection;
      selectAllEdgesArgs.elementTags = [
        'Interaction',
        'GraphicalLine'
      ];
      var edgesSelection = selectByMultipleTagNames(selectAllEdgesArgs);
      if (!!edgesSelection) {
        edgesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ConnectorType'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ConnectorType', 'Straight');
        });
        edgesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Color'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Color', '000000');
        });
      }
    }

    return gpmlSelection;
  };

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
          self.myGpml = gpml;
          callback(gpml);
        });
      }
      else {
        async.waterfall([
          function(callbackInside) {
            if (!$) {
              // TODO should we use requirejs for loading scripts instead?
              // This URI should get moved into config.js.
              pathvisiojs.utilities.loadScripts(['http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'], function() {
                callbackInside(null);
              });
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

  function gpmlColorAndShapeTypeToCss(gpmlColor, gpmlShapeType) {
    var result = {
      label:{
        color:null
      },
      shape:{
        stroke:null,
        fill:null
      }
    };
    if (gpmlShapeType.toLowerCase() !== 'none') {
      result.label.color = gpmlColorToCssColorNew(gpmlColor);
    }
    else {
      result.color = gpmlColorToCssColorNew(gpmlColor); // color just means text-color in this case
      result.stroke = 'transparent';
    }
    return result;
  }

  function gpmlColorToCssColorNew(gpmlColor) {
    var color;
    if (gpmlColor.toLowerCase() === 'transparent') {
      return 'transparent';
    }
    else {
      color = new RGBColor(gpmlColor);
      if (color.ok) {
        return color.toHex();
      }
      else {
        console.warn('Could not convert GPML Color value of "' + gpmlColor + '" to a valid CSS color. Using "#c0c0c0" as a fallback.');
        return '#c0c0c0';
      }
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

  function setColorAsJsonNew(jsonElement, currentGpmlColorValue) {
    var jsonColor = gpmlColorToCssColorNew(currentGpmlColorValue);
    jsonElement.color = jsonColor;
    jsonElement.borderColor = jsonColor;
    if (jsonElement.hasOwnProperty('text')) {
      jsonElement.text.color = jsonColor;
    }
    return jsonElement;
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

  function getBorderStyleNew(gpmlLineStyle) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
    if (!!borderStyle) {
      return borderStyle;
    }
    else {
      console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
      return 'solid';
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

  function setBorderStyleAsJsonNew(jsonElement, currentGpmlLineStyleValue) {
    var borderStyle = getBorderStyleNew(currentGpmlLineStyleValue);
    jsonElement.borderStyle = borderStyle;
    return jsonElement;
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

  function toPvjson(gpml, pathwayIri, callbackOutside){
    var gpmlSelection = addIsContainedByAttribute(makeExplicit(d3.select(gpml)));
    //var gpmlSelection = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var pathway = {};
    pathway.xmlns = gpmlSelection.attr('xmlns');
    //pathway.nodes = [];
    //pathway.edges = [];
    //pathway.elements = [];
    pathway.elementsNew = [];

    // test for whether file is GPML

    if ( pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== 0) {

        // TODO call the Java RPC updater or in some other way call for the file to be updated.

        console.warn('GPML namespace is not one pathvisiojs can handle.');
        callbackOutside('fail');
        //alert('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + pathway.xmlns + '). Please convert to the supported version of GPML (xmlns: ' + pathvisiojs.data.gpml.namespaces[0] + ').');
      }
      else {

      async.parallel({
          '@context': function(callback){
            pathway['@context'] = {
              '@vocab':'http://vocabularies.wikipathways.org/gpml#',
              '@base': pathwayIri,
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
            callback(null, pathway['@context']);
          },
          PublicationXref: function(callback){
            pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(gpmlSelection, function(publicationXrefs) {
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
            var jsonDataSource = gpmlSelection.attr('Data-Source');
            if (!!jsonDataSource) {
              pathway.DataSource = jsonDataSource;
              callback(null, 'DataSource converted.');
            }
            else {
              callback(null, 'No DataSource to convert.');
            }
          },
          Version: function(callback){
            var jsonVersion = gpmlSelection.attr('Version');
            if (!!jsonVersion) {
              pathway.Version = jsonVersion;
              callback(null, 'Version converted.');
            }
            else {
              callback(null, 'No Version to convert.');
            }
          },
          Author: function(callback){
            var jsonAuthor = gpmlSelection.attr('Author');
            if (!!jsonAuthor) {
              pathway.Author = jsonAuthor;
              callback(null, 'Author converted.');
            }
            else {
              callback(null, 'No Author to convert.');
            }
          },
          Maintainer: function(callback){
            var jsonMaintainer = gpmlSelection.attr('Maintainer');
            if (!!jsonMaintainer) {
              pathway.Maintainer = jsonMaintainer;
              callback(null, 'Maintainer converted.');
            }
            else {
              callback(null, 'No Maintainer to convert.');
            }
          },
          Email: function(callback){
            var jsonEmail = gpmlSelection.attr('Email');
            if (!!jsonEmail) {
              pathway.Email = jsonEmail;
              callback(null, 'Email converted.');
            }
            else {
              callback(null, 'No Email to convert.');
            }
          },
          LastModified: function(callback){
            var jsonLastModified = gpmlSelection.attr('Last-Modified');
            if (!!jsonLastModified) {
              pathway.LastModified = jsonLastModified;
              callback(null, 'LastModified converted.');
            }
            else {
              callback(null, 'No LastModified to convert.');
            }
          },
          License: function(callback){
            var jsonLicense = gpmlSelection.attr('License');
            if (!!jsonLicense) {
              pathway.License = jsonLicense;
              callback(null, 'License converted.');
            }
            else {
              callback(null, 'No License to convert.');
            }
          },
          Name: function(callback){
            var jsonName = gpmlSelection.attr('Name');
            if (!!jsonName) {
              pathway.Name = jsonName;
              callback(null, 'Name converted.');
            }
            else {
              callback(null, 'No Name to convert.');
            }
          },
          Organism: function(callback){
            var jsonOrganism = gpmlSelection.attr('Organism');
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
              'width':parseFloat(gpmlSelection.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlSelection.select('Graphics').attr('BoardHeight'))
            };
            callback(null, pathway.image);
          },
          Biopax: function(callback){
            var xmlBiopax = gpmlSelection.selectAll('Biopax');
            if (xmlBiopax[0].length > 0) {
              pathvisiojs.data.biopax.toPvjson(xmlBiopax, function(jsonBiopax) {
                pathway.Biopax = jsonBiopax;
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
              //pathway.DataNode = [];
              dataNodesSelection.each(function() {
                dataNodeSelection = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.dataNode.toPvjson(gpmlSelection, dataNodeSelection, function(pvjsonElements) {
                  /*
                  console.log('jsonDataNode');
                  console.log(jsonDataNode);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  console.log('pvjsonText');
                  console.log(pvjsonText);
                  //*/
                  //pathway.DataNode.push(jsonDataNode);
                  //pathway.nodes = pathway.nodes.concat(jsonDataNode);
                  //pathway.elements = pathway.elements.concat(jsonDataNode);
                  pathway.elementsNew = pathway.elementsNew.concat(pvjsonElements);
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
              //pathway.Label = [];
              gpmlSelection.selectAll('Label').each(function() {
                labelSelection = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.label.toPvjson(gpmlSelection, labelSelection, function(pvjsonElements) {
                  /*
                  console.log('jsonLabel');
                  console.log(jsonLabel);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  console.log('pvjsonText');
                  console.log(pvjsonText);
                  //*/
                  //pathway.Label.push(jsonLabel);
                  //pathway.nodes = pathway.nodes.concat(jsonLabel);
                  //pathway.elements = pathway.elements.concat(jsonLabel);
                  pathway.elementsNew = pathway.elementsNew.concat(pvjsonElements);
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
              //pathway.Shape = [];
              gpmlSelection.selectAll('Shape').each(function() {
                shapeSelection = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.shape.toPvjson(gpmlSelection, shapeSelection, function(pvjsonElements) {
                  //pathway.Shape.push(jsonShape);
                  //pathway.nodes = pathway.nodes.concat(jsonShape);
                  //pathway.elements = pathway.elements.concat(jsonShape);
                  pathway.elementsNew = pathway.elementsNew.concat(pvjsonElements);
                  /*
                  console.log('jsonShape');
                  console.log(jsonShape);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  console.log('pvjsonText');
                  console.log(pvjsonText);
                  //*/
                });
              });
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
            var groupSelection, groupsSelection = gpmlSelection.selectAll('Group');
            if (groupsSelection[0].length > 0) {
              //pathway.Group = [];
              var groups = [];
              gpmlSelection.selectAll('Group').each(function() {
                groupSelection = d3.select(this);
                pathvisiojs.data.gpml.element.node.groupNode.toPvjson(gpmlSelection, groupSelection, function(pvjsonElements) {
                  //pathway.Group.push(jsonGroup);
                  //groups.push(pvjsonElements);
                  //pathway.nodes = pathway.nodes.concat(jsonGroup);
                  pathway.elementsNew = pathway.elementsNew.concat(pvjsonElements);
                  //*
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  console.log(pvjsonElements.id);
                  //*/
                });
              });
              callback(null, groups);
            }
            else {
              callback(null, null);
            }
          },
          //*
          GraphicalLine: function(callback){
            var graphicalLineSelection, graphicalLinesSelection = gpmlSelection.selectAll('GraphicalLine');
            if (graphicalLinesSelection[0].length > 0) {
              //pathway.GraphicalLine = [];
              gpmlSelection.selectAll('GraphicalLine').each(function() {
                graphicalLineSelection = d3.select(this);
                pathvisiojs.data.gpml.edge.graphicalLine.toPvjson(gpml, graphicalLineSelection, function(pvjsonElements) {
                  //pathway.GraphicalLine.push(jsonGraphicalLine);
                  //pathway.edges = pathway.edges.concat(jsonGraphicalLine);
                  //pathway.elements = pathway.elements.concat(jsonGraphicalLine);
                  pathway.elementsNew = pathway.elementsNew.concat(pvjsonElements);
                  /*
                  console.log('jsonGraphicalLine');
                  console.log(jsonGraphicalLine);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  //*/
                });
              });
              callback(null, 'GraphicalLines are all converted.');
            }
            else {
              callback(null, 'No graphicalLines to convert.');
            }
          },
          //*/
          Interaction: function(callback){
            var interactionSelection, interactionsSelection = gpmlSelection.selectAll('Interaction');
            if (interactionsSelection[0].length > 0) {
              //pathway.Interaction = [];
              gpmlSelection.selectAll('Interaction').each(function() {
                interactionSelection = d3.select(this);
                pathvisiojs.data.gpml.edge.interaction.toPvjson(gpml, interactionSelection, function(pvjsonElements) {
                  //pathway.Interaction.push(jsonInteraction);
                  //pathway.edges = pathway.edges.concat(jsonInteraction);
                  //pathway.elements = pathway.elements.concat(jsonInteraction);
                  pathway.elementsNew = pathway.elementsNew.concat(pvjsonElements);
                  //*
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  //*/
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
        var contents, groupsFrame, jsonGroups = [];
        var groupContentsCandidates = pathway.elementsNew.filter(function(candidate){
          return (candidate.nodeType !== 'GroupNode');
        });
        pathway.elementsNew.filter(function(element){
          return element.nodeType === 'GroupNode';
        }).forEach(function(group) {
          contents = groupContentsCandidates.filter(function(element){
            return element.isContainedBy === group.id;
          });
          group.contains = contents;
          pathvisiojs.data.gpml.element.node.groupNode.getGroupDimensions(group, function(dimensions){
            console.log('dimensions');
            console.log(dimensions);
            group.x = dimensions.x;
            group.y = dimensions.y;
            group.width = dimensions.width;
            group.height = dimensions.height;
            group.zIndex = dimensions.zIndex;
          });
        });
        pathway.elementsNew.sort(function(a, b) {
          return a.zIndex - b.zIndex;
        });
        pathway.elementsNew.sort(function(a, b) {
          return a.zIndex - b.zIndex;
        });

        /*
        pathway.pathwayNestedByGrouping = d3.nest()
        .key(function(d) { return d.isContainedBy; })
        .entries(pathway.elements);
        //*/

        //self.myPathway = pathway;
        callbackOutside(pathway);
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
    toPvjson:toPvjson,
    getLineStyle:getLineStyle,
    getBorderStyleNew:getBorderStyleNew,
    setBorderStyleAsJsonNew:setBorderStyleAsJsonNew,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson,
    gpmlColorToCssColor:gpmlColorToCssColor,
    gpmlColorToCssColorNew:gpmlColorToCssColorNew,
    setColorAsJsonNew:setColorAsJsonNew,
    setColorAsJson:setColorAsJson,
    makeExplicit:makeExplicit
  };
}();

// TODO hack required because we call ...node.anchors.toPvjson() before we
// call the other ...node.toPvjson() methods
pathvisiojs.data.gpml.node = pathvisiojs.data.gpml.node || {};
