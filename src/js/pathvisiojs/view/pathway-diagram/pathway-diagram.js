"use strict"

pathvisiojs.view.pathwayDiagram = function(){

  function getPreserveAspectRatioValues(preserveAspectRatio) {
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

  function load(args) {

    // this function gets a reference to a GPML file and draws a visual representation of the pathway

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.target) {
      throw new Error('No target selector specified as target for pathvisiojs.');
    }

    if (!args.data) {
      throw new Error('No input data source (URL or WikiPathways ID) specified.');
    }

    var targetSelector = args.target,
      parsedInputData = args.data,
      width = args.width || null,
      height = args.width || null,
      preserveAspectRatio = args.preserveAspectRatio || 'xMidYMid',
      cssUrl = args.cssUrl,
      customMarkers = args.customMarkers,
      customSymbols = args.customSymbols,
      highlightNodes = args.highlightNodes,
      hiddenElements = args.hiddenElements,
      target;

    // waterfall means that each function completes in order, passing its result to the next
    async.waterfall([
      function(callback){

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************

        var target = d3.select(targetSelector);
        if (target.length !== 1) {
          throw new Error('Container selector must be matched by exactly one element.');
        }

        var preserveAspectRatioValues = getPreserveAspectRatioValues(preserveAspectRatio);
        if (!width) {
          width = target[0][0].getElementWidth();
        }

        if (!height) {
          height = target[0][0].getElementHeight();
        }

        callback(null, target, width, height, preserveAspectRatioValues);
      },
      function(target, width, height, preserveAspectRatioValues, callback){

        // ********************************************
        // Check for SVG support. If false, use PNG fallback
        // ********************************************

        if (Modernizr.svg) {
          async.parallel({
            preloadSvg: function(callback) {
              var preloadSvgArgs = {};
              preloadSvgArgs.target = target;
              preloadSvgArgs.width = width;
              preloadSvgArgs.height = height;
              preloadSvgArgs.preserveAspectRatioValues = preserveAspectRatioValues;
              preloadSvgArgs.customMarkers = customMarkers;
              preloadSvgArgs.customSymbols = customSymbols;
              preloadSvgArgs.cssUrl = cssUrl;
              pathvisiojs.view.pathwayDiagram.svg.loadPartials(preloadSvgArgs, function(svg) {
                callback(null, svg);
              });
            },
            pathway: function(callback){
              pathvisiojs.getJson(parsedInputData, function(json) {
                pathvisiojs.context = json['@context'];
                console.log('json');
                console.log(json);
                callback(null, json);
              })
            }
          },
          function(err, results){
            console.log('pvjs results');
            console.log(results);
            var svg = results.preloadSvg,
              pathway = results.pathway,
              loadSvgArgs = {};

            loadSvgArgs.svg = svg;
            loadSvgArgs.pathway = pathway;
            loadSvgArgs.width = width;
            loadSvgArgs.height = height;
            loadSvgArgs.preserveAspectRatioValues = preserveAspectRatioValues;

            pathvisiojs.view.pathwayDiagram.svg.load(loadSvgArgs, function(svg) {

              ///* Node Highlighter

              var nodeLabels, nodeLabel;
              if (!!pathway) {
                nodeLabels = [];
                if (pathway.hasOwnProperty('DataNode')) {
                  pathway.DataNode.forEach(function(node) {
                    if (!!node.text) {
                      nodeLabels.push(node.text.tspan[0]);
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

                $( "#highlight-by-label-input" ).bind( "typeahead:selected", function() {
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

                callback(null, 'success');
              }
              else {
                callback(null);
              }
            })
          })
        }
        else {

          // TODO use target selector and seadragon for this

          /*
             var pngUrl;
             var inputDataDetails = getInputDataDetails(args.data);
             if (!!inputDataDetails.wikiPathwaysId) {
             pngUrl = encodeURI('http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' + inputDataDetails.wikiPathwaysId + '&revision=' + inputDataDetails.revision);
             }
             else {

          // TODO update this link to a URL we control

          pngUrl = 'http://upload.wikimedia.org/wikipedia/commons/3/3b/Picture_Not_Yet_Available.png';
          }
          //*/

          /*
             window.setTimeout(function() {
             args.targetElement.append('img')
             .attr('id', 'pathvisiojs-pathway-png')
             .attr('src', 'http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' + inputDataDetails.wikiPathwaysId + '&revision=' + inputDataDetails.revision);
          /*
          $('#view').prepend('<img id="pathvisio-java-png" src="http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' +  + urlParamList.gpml + '&revision=' + urlParamList.gpmlRev + '" />')
          }, 50);
          //*/
          //*/
          callback(null);
        }
      }
    ],
    function(err, results) {
      // adding this as a signal that the process is done
      d3.select('body').append('span')
      .attr('id', 'pathvisiojs-is-loaded');
    });
  }

  return{
    load:load,
    fitElementWithinContainer:fitElementWithinContainer
  };
}();

     
