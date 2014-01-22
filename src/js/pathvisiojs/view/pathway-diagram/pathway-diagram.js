"use strict";

pathvisiojs.view.pathwayDiagram = function(){

  function getFirstRenderableSourceDataElement(sourceData) {
    var sourceDataElement,
      results = {};
    var i = 0;
    do {
      sourceDataElement = sourceData[i];
      var imageFormat = getImageFormatForDataSourceMimeType(sourceDataElement.mediaType);
      i += 1;
    } while ((!imageFormat) && (i < sourceData.length + 1));

    sourceDataElement.imageFormat = imageFormat;
    return sourceDataElement;
  }

  function getImageFormatForDataSourceMimeType(mediaType) {
    //IE9 currently cannot convert gpml to pathvisiojsJson
    if ((mediaType === 'application/xml+gpml') && (Modernizr.svg) && (pathvisiojs.utilities.isIE() !== 9)) {
      return 'svg';
    }
    else if ((mediaType === 'image/png') || (mediaType === 'image/jpeg') || (mediaType === 'image/gif')) { //TODO update this to use a more complete test for all supported static image formats
      return 'img';
    }
    else {
      return null;
    }
  }

  function load(args) {

    // this function gets a reference to a GPML file and draws a visual representation of the pathway
    // TODO Much of the SVG creation code should be moved to ./svg/svg.js so we just call
    // pathvisiojs.view.pathwayDiagram.svg.load() in the same way as we do for
    // pathvisiojs.view.pathwayDiagram.img.load()

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
      cssUri = args.cssUri,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
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
              preloadDiagramArgs.cssUri = cssUri;
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
              throw new Error('Detected mediaType does not match specified mediaType of "application/xml+gpml"');
            }
          })
        }
        else {
          loadDiagramArgs.sourceDataElement = renderableSourceDataElement;
          pathvisiojs.view.pathwayDiagram.img.load(loadDiagramArgs, function() {
            callback(null, 'img loaded');
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

     
