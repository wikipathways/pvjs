"use strict"

pathvisiojs.view.pathwayDiagram = function(){

  function getPreserveAspectRatioValues(preserveAspectRatio) {

    // this function uses SVG terminology, but it is intended to work with any graphical
    // file format (SVG, PNG, etc.)

    var results = {};
    if (!preserveAspectRatio.align) {
      results.align = preserveAspectRatio;
    }
    else {
      results.align = preserveAspectRatio.align;
    }

    if (results.align === 'none') {
      results.xAlign = 'x-mid';
      results.yAlign = 'y-mid';
    }
    else {
      results.meetOrSlice = 'meet';
      if (!!preserveAspectRatio.meetOrSlice) {
        results.meetOrSlice = preserveAspectRatio.meetOrSlice;
      }
      
      results.xAlign = 'x-' + results.align.substr(1, 3).toLowerCase();
      results.yAlign = 'y-' + results.align.substr(results.align.length - 3, 3).toLowerCase();
    }
    return results;
  }

  function fitElementWithinContainer(containerWidth, containerHeight, pathwayWidth, pathwayHeight, preserveAspectRatioValues) {

    // following svg standards.
    // see http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute

    var meetOrSlice, xScale, yScale, scale, pathwayWidthScaled, pathwayHeightScaled, xMapping, yMapping;
    var results = {};

    xScale = scale = containerWidth/pathwayWidth;
    yScale = containerHeight/pathwayHeight;

    if (preserveAspectRatioValues.align === 'none') {
      results.x = 0;
      results.y = 0;
      
      results.width = xScale * pathwayWidth;
      results.height = yScale * pathwayHeight;
    }
    else {
      if (preserveAspectRatioValues.meetOrSlice === 'meet') {
        scale = xScale = yScale = Math.min(xScale, yScale);
      }
      else {
        scale = xScale = yScale = Math.max(xScale, yScale);
      }

      results.width = xScale * pathwayWidth;
      results.height = yScale * pathwayHeight;

      xMapping = [
        {'x-min': 0},
        {'x-mid': containerWidth/2 - results.width/2},
        {'x-max': containerWidth - results.width}
      ];

      yMapping = [
        {'y-min': 0},
        {'y-mid': containerHeight/2 - results.height/2},
        {'y-max': containerHeight - results.height}
      ];

      results.x = xMapping[preserveAspectRatioValues.xAlign];
      results.y = yMapping[preserveAspectRatioValues.yAlign];
      results.scale = scale;
    }

    var browserPrefixArray = [
      '-webkit-transform: ',
      '-o-transform: ',
      'transform: '
    ];

    var translationMatrixCssString = 'matrix(' + xScale + ', 0, 0, ' + yScale + ', ' + results.x + ', ' + results.y + '); ';
    
    results.translationMatrixCss = ' ';
    browserPrefixArray.forEach(function(element) {
      results.translationMatrixCss += (element + translationMatrixCssString);
    });

    //var translationMatrix = matrix(a, c, b, d, tx, ty);
    //var translationMatrix = matrix(xScale, rotation, skew, yScale, x translation, y translation);

    return results;
  }

  function getFirstRenderableSourceDataElement(sourceData) {
    var sourceDataElement,
      results = {};
    var i = 0;
    do {
      sourceDataElement = sourceData[i];
      var imageFormat = getImageFormatForDataSourceMimeType(sourceDataElement.mimeType);
      i += 1;
    } while ((!imageFormat) && (i < sourceData.length + 1));

    sourceDataElement.imageFormat = imageFormat;
    return sourceDataElement;
  }

  function getImageFormatForDataSourceMimeType(mimeType) {
    if ((mimeType === 'application/xml+gpml') && (Modernizr.svg) && (pathvisiojs.utilities.isIE() !== 9)) {
      return 'svg';
    }
    else if ((mimeType === 'image/png') || (mimeType === 'image/jpeg') || (mimeType === 'image/gif')) { //TODO update this to correct mimeTypes and also use a better test for all supported static image formats
      return 'png'; //TODO change this name so it also handles jpeg, etc.
    }
    else {
      return null;
    }
  }

  function load(args) {

    // this function gets a reference to a GPML file and draws a visual representation of the pathway
    // TODO Much of the SVG creation code should be moved to ./svg/svg.js so we just call
    // pathvisiojs.view.pathwayDiagram.svg.load() in the same way as we do for
    // pathvisiojs.view.pathwayDiagram.png.load()

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified as container for pathvisiojs.');
    }

    if (!args.sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    var containerSelector = args.container,
      sourceData = args.sourceData,
      fitToContainer = args.fitToContainer,
      cssUrl = args.cssUrl,
      customMarkers = args.customMarkers,
//      customSymbols = args.customSymbols,
      highlightNodes = args.highlightNodes,
      hiddenElements = args.hiddenElements,
      container;

    // waterfall means that each function completes in order, passing its result to the next
    async.waterfall([
      function(callback){

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************

        var renderableSourceDataElement = getFirstRenderableSourceDataElement(sourceData);

        callback(null, renderableSourceDataElement);
      },
      function(renderableSourceDataElement, callback){

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************

        var container = d3.select(containerSelector);
        if (container.length !== 1) {
          throw new Error('Container selector must be matched by exactly one element.');
        }

        var boundingClientRect = container[0][0].getBoundingClientRect();
        var containerWidth = boundingClientRect.width - 40; //account for space for pan/zoom controls,
        var containerHeight = boundingClientRect.height - 20; //account for space for search field;

        callback(null, container, containerWidth, containerHeight, renderableSourceDataElement);
      },
      function(container, containerWidth, containerHeight, renderableSourceDataElement, callback){
        var svg, pathway, loadDiagramArgs = {};

        loadDiagramArgs.container = container;
        loadDiagramArgs.containerWidth = containerWidth;
        loadDiagramArgs.containerHeight = containerHeight;
        loadDiagramArgs.fitToContainer = fitToContainer;

        // ********************************************
        // Check for SVG support. If false, use PNG fallback
        // ********************************************

        // TODO get this working in IE9

        if (renderableSourceDataElement.imageFormat === 'svg') {
          async.parallel({
            preloadSvg: function(callback) {
              var preloadDiagramArgs = {};
              preloadDiagramArgs.container = container;
              preloadDiagramArgs.customMarkers = customMarkers;
//              preloadDiagramArgs.customSymbols = customSymbols;
              preloadDiagramArgs.cssUrl = cssUrl;
              pathvisiojs.view.pathwayDiagram.svg.loadPartials(preloadDiagramArgs, function(svg) {
                callback(null, svg);
              });
            },
            pathway: function(callback){
              pathvisiojs.data.pathvisiojsJson.get(renderableSourceDataElement, function(json) {
                pathvisiojs.context = json['@context'];
                console.log('json');
                console.log(json);
                callback(null, json);
              })
            }
          },
          function(err, results){
            pathway = results.pathway;

            if (pathway !== 'fail') {
              svg = results.preloadSvg,

              loadDiagramArgs.svg = svg;
              loadDiagramArgs.pathway = pathway;

              pathvisiojs.view.pathwayDiagram.svg.load(loadDiagramArgs, function(svg) {

                ///* Node Highlighter

                var nodeLabels, nodeLabel;
                if (!!pathway) {
                  nodeLabels = [];
                  if (pathway.hasOwnProperty('DataNode')) {
                    pathway.DataNode.forEach(function(node) {
                      if (!!node.text) {
                        nodeLabels.push(node.text.line[0]);
                      }
                    });

                    // see http://twitter.github.io/typeahead.js/

                    $('#highlight-by-label-input').typeahead({
                      name: 'Highlight node in pathway',
                      local: nodeLabels,
                      limit: 10
                    });
                  }

                  /*
                     $('.icon-eye-open').click(function(){
                     var nodeLabel = $("#highlight-by-label-input").val();
                     if (!nodeLabel) {
                     console.warn('Error: No data node value entered.');
                     }
                     else {
                     pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(svg, nodeLabel);
                     }
                     });
                  //*/
                  // see http://api.jquery.com/bind/
                  // TODO get selected value better and make function to handle

                  $( "#highlight-by-label-input" ).bind("typeahead:selected", function() {
                    nodeLabel = $("#highlight-by-label-input").val();
                    if (!nodeLabel) {
                      throw new Error("No data node value entered for type-ahead node highlighter.");
                    }
                    else {

                      // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
                      // a highlighter for svg, png, etc. as appropriate.

                      pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(svg, pathway, nodeLabel);
                    }
                  });
                  callback(null, 'svg loaded');
                }
                else {
                  callback(null);
                }
              })
            }
            else {
              throw new Error('Detected mimeType does not match specified mimeType of "application/xml+gpml"');
            }
          })
        }
        else {
          loadDiagramArgs.sourceDataElement = renderableSourceDataElement;
          pathvisiojs.view.pathwayDiagram.png.load(loadDiagramArgs, function() {
            callback(null, 'png loaded');
          });
        }
      }
    ],
    function(err, results) {
      // adding this as a signal that the process is done
      d3.select('body').append('span')
      .attr('id', 'pathvisiojs-is-loaded');
      console.log('Pathvisiojs done loading.');
    });
  }

  return{
    load:load
  };
}();

     
