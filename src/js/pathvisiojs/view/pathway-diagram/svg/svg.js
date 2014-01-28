"use strict";

pathvisiojs.view.pathwayDiagram.svg = function(){

  var svg, shapesAvailable, markersAvailable, contextLevelInput,
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

  function load(args, callback) {
    var diagramContainer = args.container, //a d3 selection corresponding to the containing element in the parent document
      containerWidth = args.containerWidth,
      containerHeight = args.containerHeight,
      cssUri = args.cssUri,
      renderableSourceDataElement = args.renderableSourceDataElement,
      fitToContainer = args.fitToContainer,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      pathway,
      diagramContainer,
      svg;


    async.waterfall([
      function(callback){
        async.parallel({
          preloadSvg: function(callback) {
            var preloadDiagramArgs = {};
              preloadDiagramArgs.container = diagramContainer;
              preloadDiagramArgs.customMarkers = customMarkers,
              //preloadDiagramArgs.customSymbols = customSymbols,
              preloadDiagramArgs.cssUri = cssUri;

            pathvisiojs.view.pathwayDiagram.svg.loadPartials(preloadDiagramArgs, function(svgTemplate) {
              svg = svgTemplate;

              if (!svg) {
                throw new Error("Could not load SVG template.");
              }

              callback(null);
            });
          },
          pathway: function(callback){
            pathvisiojs.data.pathvisiojsJson.get(renderableSourceDataElement, function(json) {
              pathvisiojs.context = json['@context'];

              if (!json || json === 'fail') {
                throw new Error("Could not convert input source data to pathvisioJsJson.");
              }

              //console.log('json');
              //console.log(json);
              pathway = json;
              callback(null);
            })
          }
        },
        function(err, results){
          //TODO get pathwayWidth and Height

          callback(null);
        })
      },
      function(callback){
        pathvisiojs.view.pathwayDiagram.svg.renderWithCachedData(svg, pathway, function() {
          callback(null);
        })
      },
      function(callback) {
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

        var fitToScreen = d3.select('body').select('#fit-to-screen-control');
        fitToScreen.on("click", function(d,i){
          fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
        });

        var fullscreen = d3.select('body').select('#fullscreen-control');
        fullscreen.on("click", function(d,i){
          var pvjs = document.getElementById("pathvisiojs-dev").innerHTML;
          var newwin = window.open('','','width=800,height=600');
          var doc = newwin.document;
          doc.open();
          doc.write(pvjs);
          doc.close();	
        });

        svgPanZoom.init({
          //'root': 'svg', //Alex, what is this line for? It doesn't appear to be doing anything and might be intended to be doing what the line below that I added is doing.
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
        callback(null);
      },
      function(callback){
        //* Node Highlighter

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
      }
    ],
    function(err, results) {
      callback(svg);
    });
  }

  function loadPartials(args, callbackOutside) {
    var diagramContainer = args.container,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      cssUri = args.cssUri;

    async.series([
      function(callback) {
        diagramContainer.html(pathvisioNS['tmp/pathvisiojs.svg']);

        svg = diagramContainer.select('#pathvisiojs-diagram')
        svg.attr('style', 'display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; ') // TODO this should be moved to the CSS file
        .attr('preserveAspectRatio', 'xMidYMid');

        callback(null);
      },
      function(callback) {
        if (!!args.customMarkers) {
          pathvisiojs.view.pathwayDiagram.svg.edge.marker.loadAllCustom(svg, customMarkers, function() {
            callback(null);
          })
        }
        else {
          callback(null);
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
      function(callback) {
        if (!!cssUri) {
          d3.text(cssUri, 'text/css', function(data) {
            var defs = svg.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callback(null);
          })
        }
        else {
          callback(null);
        }
      }
    ],
    function(err, results) {
      callbackOutside(svg);
    });
  }

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
      console.log('data');
      console.log(data);
      console.log('item');
      console.log(item);
      if (item.key !== 'undefined') {
        container = viewport.select('#' + strcase.paramCase(item.key));
      }
      else {
        container = viewport;
      }
      console.log(container[0][0]);

      container.selectAll('.element')
      .data(item.values)
      .enter()
      .append(function(d) {
        console.log('d');
        console.log(d);
        var childElementName = renderableTypeToSvgElementMappings[strcase.camelCase(d.renderableType)];
        var child = document.createElementNS('http://www.w3.org/2000/svg', childElementName);
        return child;
      })
      .attr("id", function (d) {
        console.log(strcase.paramCase(d['@id']));
        return strcase.paramCase(d['@id']);
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
    console.log(args);
    var svg = args.svg,
      data = args.data,
      pathway = args.pathway,
      container = args.container;

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
    data.forEach(function(dataElement) {
      renderingArgs.data = dataElement;
      renderingArgs.element = d3.select('#' + strcase.paramCase(dataElement['@id']));
      console.log('#' + strcase.paramCase(dataElement['@id']));
      console.log(renderingArgs.element);
      if (dataElement.renderableType === 'GraphicalLine') {                                                                                        
        pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);                                                          
      } 
else if (dataElement.renderableType === 'Interaction') {
        pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
      } 
      else if (dataElement.renderableType === 'GroupNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
        });
      }
      else if (dataElement.renderableType === 'EntityNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
      }
    });
    callback(null, 'Successfully rendered elements');
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
        var pathwayNestedByGrouping = d3.nest()
        .key(function(d) { return d.isContainedBy; })
        .entries(pathway.elements);
        
        renderArgs.data = pathwayNestedByGrouping;
        console.log('pathwayNestedByGrouping');
        console.log(pathwayNestedByGrouping);

        appendElementsInDomOrder(renderArgs, function() {
          callbackInside(null, svg);
        });
      },
      function(svg, callbackInside){
        //TODO for the non-cached version, this should sort the elements by dependency, so that group contents are updated before their containing group,
        //and an edge is updated before any edges that rely on it.
        renderArgs.data = pathway.elements;

        /*
        var pathwayNestedByDependencies = d3.nest()
        .key(function(d) { return d.hasDependencies; })
        .entries(pathway.elements);
        renderArgs.data = pathwayNestedByDependencies;
        //*/

        console.log('renderArgs.data');
        console.log(renderArgs.data);

        updateElementProperties(renderArgs, function() {
          callback(svg);
        });
      }
    ]);
  }


      //pathvisiojs.view.pathwayDiagram.svg.grid.render(svg);

      /*
      async.series([
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.groupData;
          appendElementsInDomOrder(args, function() {
            console.log(1);
          });
          callbackInside2(null, svg);
        },
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.notGroupedData;
          self.args = args;
          appendElementsInDomOrder(args, function() {
            console.log(2);
            callbackInside2(null, svg);
          });
        }
      ],
      function(err, results) {
        callback(svg);
      })
    })
  }
  //*/
  /*
  function render(args, callback){
    if (!args.svg) {
      throw new Error("No svg specified.");
    }
    if (!args.pathway) {
      throw new Error("No data entered to render.");
    }

    async.parallel({
      'hierarchicalData': function(callbackInside) {
        var frame = {
          '@context': pathway['@context'],
          '@type': 'element'
        };  
        jsonld.frame(args.pathway, frame, function(err, hierarchicalData) {
          callbackInside(null, hierarchicalData);
        });
      },
      'groupData': function(callbackInside) {
        var frame = {
          '@context': pathway['@context'],
          '@type': 'GroupNode'
        };  
        jsonld.frame(args.pathway, frame, function(err, groupData) {
          callbackInside(null, groupData);
        });
      },
      'grid': function(callbackInside) {
        pathvisioNS.grid = {};
        var frame = {
          '@context': pathway['@context'],
          '@type': 'EntityNode'
        };  
        jsonld.frame(args.pathway, frame, function(err, framedData) {
          pathvisiojs.view.pathwayDiagram.pathFinder.generateGridData(framedData['@graph'], args.pathway.image.width, args.pathway.image.height, function() {
            callbackInside(null);
          });
        });
      },
      'topLevelData': function(callbackInside) {
        var inputTopLevel = pathvisiojs.utilities.clone(args.pathway);
        inputTopLevel['@context'] = contextLevelInput;
        var topLevelFrame = {
          "@context": contextLevelInput,
          "@type":"element",
          "dependsOn": {}        
        };
        jsonld.frame(inputTopLevel, topLevelFrame, function(err, framedDataTopLevel) {
          var topLevelData = [];
          framedDataTopLevel['@graph'].forEach(function(element) {
            if (!element.dependsOn) {
              topLevelData.push(element['@id']);
            }
          });
          callbackInside(null, topLevelData);
        });
      }
    },
    function(err, results) {
      var resultsData = results.hierarchicalData['@graph'].filter(function(element) {
        return (results.topLevelData.indexOf(element['@id']) > -1);
      });
    })
  }
  //*/

  return {
    //render:render,
    renderWithCachedData:renderWithCachedData,
    appendElementsInDomOrder:appendElementsInDomOrder,
    load:load,
    loadPartials:loadPartials
  };
}();
