pathvisiojs.view.pathwayDiagram.svg = function(){
  'use strict';

  var shapesAvailable, markersAvailable, contextLevelInput,
    renderableTypeToSvgElementMappings = {
      entityNode: 'g',
      groupNode: 'g',
      interaction: 'path',
      graphicalLine: 'path'
    };

  //calculates the proper scaling and translations to fit content (i.e., diagram) to screen (i.e., viewport)
  function fitAndCenterDiagramWithinViewport(viewport, viewportWidth, viewportHeight, diagramWidth, diagramHeight) {
    // viewport is a d3 selection

    var fitScreenScale = Math.min(viewportWidth/diagramWidth, viewportHeight/diagramHeight);
    var diagramWidthScaled = fitScreenScale * diagramWidth;
    var diagramHeightScaled = fitScreenScale * diagramHeight;

    var xTranslation = viewportWidth/2 - diagramWidthScaled/2 + 10; //plus margin-left
    var yTranslation = viewportHeight/2 - diagramHeightScaled/2 + 20; //plus margin-top

    var translationMatrixString = 'matrix(' + fitScreenScale + ', 0, 0, ' + fitScreenScale + ', ' + xTranslation + ', ' + yTranslation + ') ';
    
    viewport.attr("transform", translationMatrixString);
  }

  function load(args, callbackOutside) {
    var diagramContainer = args.container, //a d3 selection corresponding to the containing element in the parent document
      containerWidth = args.containerWidth,
      containerHeight = args.containerHeight,
      cssUri = args.cssUri,
      renderableSourceDataElement = args.renderableSourceDataElement,
      fitToContainer = args.fitToContainer,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      highlights = args.highlights,
      pathway;


    async.waterfall([
      function(callback){
        async.parallel({
          preloadSvg: function(callback) {
            var preloadDiagramArgs = {};
            preloadDiagramArgs.container = diagramContainer;
            preloadDiagramArgs.customMarkers = customMarkers;
            preloadDiagramArgs.cssUri = cssUri;
            //preloadDiagramArgs.customSymbols = customSymbols;

            pathvisiojs.view.pathwayDiagram.svg.loadPartials(preloadDiagramArgs, function(svg) {
              if (!svg) {
                throw new Error("Could not load SVG template.");
              }

              var results = {};
              results.svg = svg;
              callback(null, results);
            });
          },
          pathway: function(callback){
            pathvisiojs.data.pvjson.get(renderableSourceDataElement, function(json) {
              pathvisiojs.context = json['@context'];

              if (!json || json === 'fail') {
                callbackOutside(null);
                throw new Error("Could not convert input source data to pathvisioJsJson.");
              }

              //console.log('json');
              //console.log(json);
              pathway = json;
              self.myPathway = json;
              callback(null, json);
            });
          }
        },
        function(err, results){
          //TODO get pathwayWidth and Height

          callback(null, results.preloadSvg.svg, results.pathway);
        });
      },
      function(svg, pathway, callback){
        pathvisiojs.view.pathwayDiagram.svg.renderWithCachedData(svg, pathway, function() {
          console.log('finallysvg');
          console.log(svg);
          svg.attr('style', 'display:inline');
          callback(null, svg);
        });
      },
      function(svg, callback) {
        console.log('highlightssvg');
        console.log(svg);
        if (!!highlights) {
          highlights.forEach(function(highlight) {
            pathvisiojs.view.pathwayDiagram.svg.node.highlight(highlight);
          });
        }

        var viewport = svg.select('#viewport');

        /* not all containers will have a width or height style attribute. this is now done using the same logic
         * but uses boundingClientRect() instead. the code is located in pathway-diagram.js
        var container = d3.select('body').select('#diagram-container');
        var containerWidth = parseInt(container.style("width")) - 40; //account for space for pan/zoom controls
        var containerHeight = parseInt(container.style("height")) -20; //account for space for search field
        //*/
        var fitScreenScale;
        if (fitToContainer) {
          fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
        }

        /*
        //TODO get large screen view working
        var zoomInControl = d3.select('#zoom-in')
        .on("click", function(d,i){
          svgPanZoom.zoomIn();
        });
        //*/

        var resetPanZoomControl = d3.select('#reset-pan-zoom')
        .on("click", function(d,i){
          //svgPanZoom.resetZoom();
          fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
        });

        /*
        //TODO get large screen view working
        var zoomOutControl = d3.select('#zoom-out')
        .on("click", function(d,i){
          svgPanZoom.zoomOut();
        });
        //*/

        /*
        //TODO get large screen view working
        var fullscreen = d3.select('#full-screen-control')
        .on("click", function(d,i){
          var pvjs = document.getElementById("pathvisiojs-dev").innerHTML;
          var newwin = window.open('','','width=800,height=600');
          var doc = newwin.document;
          doc.open();
          doc.write(pvjs);
          doc.close();	
        });
        //*/

        svgPanZoom.init({
          'selector': 'svg',
          'zoomEnabled': false,
          'minZoom': '0.1',
          'maxZoom': '8.0',
        });

        var svgInFocus = false;
        svg.on("click", function(d, i){
          svgPanZoom.enableZoom();
          svgInFocus = true;
        })
        .on("mouseenter", function(d, i){
          if (svgInFocus) {
            svgPanZoom.enableZoom();
          }
        })
        .on("mouseleave", function(d, i){
          if (svgInFocus) {
            svgPanZoom.disableZoom();
            svgInFocus = false;
          }
        });
        callback(null, svg);
      },
      function(svg, callback){
        //* Node Highlighter

        var nodeLabels, nodeLabel;
        if (!!pathway) {
          nodeLabels = [];
          if (pathway.hasOwnProperty('DataNode')) {
            pathway.DataNode.forEach(function(node) {
              if (node.hasOwnProperty('text')) {
                nodeLabel = node.text.line[0];
                if (nodeLabels.indexOf(nodeLabel) === -1) {
                  nodeLabels.push(node.text.line[0]);
                }
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

          d3.select('#clear-highlights-from-typeahead').on('click', function() {
            pathvisiojs.view.pathwayDiagram.svg.node.clearHighlightsFromTypeahead();
          });
          callback(null, svg);
        }
      }
    ],
    function(err, svg) {
      callbackOutside(svg);
    });
  }

  function loadPartials(args, callbackOutside) {
    var diagramContainer = args.container,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      cssUri = args.cssUri;

    async.waterfall([
      function(callback) {
        var svg = diagramContainer.append('div').html(pathvisioNS['tmp/pathvisiojs.svg']).select('#pathvisiojs-diagram')
        .attr('preserveAspectRatio', 'xMidYMid');
        
        console.log('svg');
        console.log(svg);

        callback(null, svg);
      },
      function(svg, callback) {
        if (!!args.customMarkers) {
          pathvisiojs.view.pathwayDiagram.svg.marker.loadAllCustom(svg, customMarkers, function() {
            callback(null, svg);
          });
        }
        else {
          callback(null, svg);
        }
      },
      /*
      function(callback) {
        if (!!args.customSymbols) {
          pathvisiojs.view.pathwayDiagram.svg.symbol.loadAllCustom(svg, customSymbols, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      //*/
      function(svg, callback) {
        console.log('svgtext');
        console.log(svg);
        if (!!cssUri) {
          d3.text(cssUri, 'text/css', function(data) {
            var defs = svg.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callback(null, svg);
          });
        }
        else {
          callback(null, svg);
        }
      }
    ],
    function(err, svg) {
      callbackOutside(svg);
    });
  }

  var convertToId = function(inputString) {
    var id = strcase.paramCase(inputString);
    //var id = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid id per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(id)) {
      id = 'id-' + id;
    }
    return id;
  };

  var convertToCssClassName = function(inputString) {
    var cssClassName = strcase.paramCase(inputString);
    //var cssClassName = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid cssClassName per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(cssClassName)) {
      cssClassName = 'class-' + cssClassName;
    }
    return cssClassName;
  };

  // this function does not render all elements. Rather, it renders
  // one or more selected elements that are given as inputs.
  // If one or more of these elements are a groupNode that contains
  // other elements, this function will call itself back to render
  // the elements within the groupNode.
  function appendElementsInDomOrder(args, callback){
    var svg = args.svg,
      data = args.data,
      pathway = args.pathway,
      viewport = args.container,
      container;

    if (!viewport) {
      throw new Error("No viewport specified.");
    }
    if (!data) {
      throw new Error("No data entered to render.");
    }
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No pathway specified.");
    }
    data = pathvisiojs.utilities.convertToArray(data);

    var i = 0;
    async.each(data, function(item, callbackInside) {
      if (item.key !== 'undefined') {
        container = viewport.select('#' + convertToId(item.key));
      }
      else {
        container = viewport;
      }

      container.selectAll('.element')
      .data(item.values)
      .enter()
      .append(function(d) {
        var childElementName = renderableTypeToSvgElementMappings[strcase.camelCase(d.renderableType)];
        var child = document.createElementNS('http://www.w3.org/2000/svg', childElementName);
        return child;
      })
      .attr("id", function (d) {
        return convertToId(d.id);
      })
      .attr('class', 'element');
      i += 1;

      callbackInside(null);
    },
    function(err){
      callback(null, 'Successfully rendered elements');
    });
  }

  // this function does not render all elements. Rather, it renders
  // one or more selected elements that are given as inputs.
  // If one or more of these elements are a groupNode that contains
  // other elements, this function will call itself back to render
  // the elements within the groupNode.
  function updateElementProperties(args, callback){
    var svg = args.svg,
      data = args.data,
      pathway = args.pathway,
      container = args.container;

        console.log('before update svg');
        console.log(svg[0][0]);
    if (!container) {
      throw new Error("No container specified.");
    }
    if (!data) {
      throw new Error("No data entered to render.");
    }
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No pathway specified.");
    }
    data = pathvisiojs.utilities.convertToArray(data);
    var renderingArgs = args;

    async.each(data, function(dataElement, callbackInside) {
      renderingArgs.data = dataElement;
      renderingArgs.element = d3.select('#' + convertToId(dataElement.id));
      if (dataElement.renderableType === 'GraphicalLine') {
        pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);
      }
else if (dataElement.renderableType === 'Interaction') {
        pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
      }
      else if (dataElement.renderableType === 'GroupNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
          // TODO this used to render the group contents, but now the callback does nothing
        });
      }
      else if (dataElement.renderableType === 'EntityNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
      }

      callbackInside(null);
    },
    function(err){
      callback(svg);
    });




    /*
    data.forEach(function(dataElement) {
      renderingArgs.data = dataElement;
      renderingArgs.element = d3.select('#' + convertToId(dataElement.id));
      if (dataElement.renderableType === 'GraphicalLine') {
        pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);
      }
else if (dataElement.renderableType === 'Interaction') {
        pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
      }
      else if (dataElement.renderableType === 'GroupNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
          // TODO this used to render the group contents, but now the callback does nothing
        });
      }
      else if (dataElement.renderableType === 'EntityNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
      }
    });
    callback(null, 'Successfully rendered elements');
    //*/
  }

  function renderWithCachedData(svg, pathway, callback){
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No data entered to render.");
    }

    var viewport = svg.select('#viewport');

    pathvisiojs.view.pathwayDiagram.svg.infoBox.render(viewport, pathway);

    var renderArgs = {};
    renderArgs.svg = svg;
    renderArgs.container = viewport;
    renderArgs.pathway = pathway;

    async.waterfall([
      function(callbackInside){
        // create the required elements and their ids in DOM order,
        // without specifying width, height, etc.
        renderArgs.data = pathway.pathwayNestedByGrouping;
        appendElementsInDomOrder(renderArgs, function() {
          callbackInside(null, svg);
        });
      },
      function(svg, callbackInside){
        //TODO for the non-cached version, this should sort the elements by dependency, so that group contents are updated before their containing group,
        //and an edge is updated before any edges that rely on it.
        // this would be using something like pathway.pathwayElementsNestedByDependency
        renderArgs.data = pathway.elements;
        updateElementProperties(renderArgs, function(svg) {
        console.log('after update svg');
        console.log(svg[0][0]);
          callback(svg);
        });
      }
    ]);
  }

  return {
    convertToId:convertToId,
    convertToCssClassName:convertToCssClassName,
    renderWithCachedData:renderWithCachedData,
    appendElementsInDomOrder:appendElementsInDomOrder,
    load:load,
    loadPartials:loadPartials
  };
}();
