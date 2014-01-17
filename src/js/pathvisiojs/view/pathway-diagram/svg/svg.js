"use strict";

pathvisiojs.view.pathwayDiagram.svg = function(){

  var svg, shapesAvailable, markersAvailable, contextLevelInput;

  function setCTM(element, scale) {
    // element is a d3 selection
    var s = "matrix(" + scale + ",0,0," + scale + ",10,20)"; // + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
    element.attr("transform", s);
  }

  function load(args, callback) {
    var svg = args.svg,
      pathway = args.pathway,
      container = args.container,
      containerWidth = args.containerWidth,
      containerHeight = args.containerHeight,
      fitToContainer = args.fitToContainer,
      pathwayWidth = args.pathway.image.width,
      pathwayHeight = args.pathway.image.height;

    //add loading gif
    var container = d3.select('body').select('#pathway-container');
    var posX = containerWidth/2;
    var posY = containerHeight/2;
    var img = container.append('img');
    img.attr('src', "../src/img/loading.gif")
    .attr('width', 50)
    .style('position', "absolute")
    .style('top', posY + "px")
    .style('left', posX + "px");

    if (!svg) {
      throw new Error("Missing svg.");
    }
    if (!pathway) {
      throw new Error("Missing pathway.");
    }

    async.series([
      function(callback){
        pathvisiojs.view.pathwayDiagram.svg.renderFast(svg, pathway, function() {
          callback(null);
        })
      },
      function(callback) {
	//remove loading gif
        container.select('img').remove();

        var svgActive = false;
        svg.on("click", function(d, i){
          svgPanZoom.enableZoom();
          svgActive = true;
        })
        .on("mouseenter", function(d, i){
          if (svgActive) {
            svgPanZoom.enableZoom();
          }
        })
        .on("mouseleave", function(d, i){
          if (svgActive) {
            svgPanZoom.disableZoom();
	    svgActive = false;
          }
        });

        var viewport = svg.select('#viewport');

        /* not all containers will have a width or height style attribute. this is now done using the same logic
         * but uses boundingClientRect() instead. the code is located in pathway-diagram.js
        var container = d3.select('body').select('#pathway-container');
        var containerWidth = parseInt(container.style("width")) - 40; //account for space for pan/zoom controls
        var containerHeight = parseInt(container.style("height")) -20; //account for space for search field
        //*/
        var fitScreenScale;
        if (fitToContainer) {
          fitScreenScale = Math.min(containerWidth/args.pathway.image.width, containerHeight/args.pathway.image.height);
          setCTM(viewport, fitScreenScale);
        }

        svgPanZoom.init({
          'root': 'svg',
          'zoomEnabled': false
        });
        callback(null);
      }
    ],
    function(err, results) {
      callback();
    });
  }

  function loadPartials(args, callbackOutside) {
    var container = args.container,
      customMarkers = args.customMarkers,
//      customSymbols = args.customSymbols,
      cssUrl = args.cssUrl,
      pathvisioJsContainer,
      pathwayContainer;

    async.series([
      function(callback) {
        container.html(pathvisioNS['tmp/pathvisiojs.html']);
        pathvisioJsContainer = container.select('#pathvisio-js-container');
        pathwayContainer = pathvisioJsContainer.select('#pathway-container')

        svg = pathvisioJsContainer.select('#pathway-svg')
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
//*/      function(callback) {
        if (!!cssUrl) {
          d3.text(cssUrl, 'text/css', function(data) {
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
  function renderSelectedElementsFast(args, callbackOutside){
    console.log('render');
    console.log(new Date());
    console.log('renderSelectedElementsFast args');
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

    var contextLevelInput = pathvisiojs.utilities.clone(pathvisiojs.context);
    contextLevelInput.dependsOn = "ex:dependsOn";

    async.waterfall([
      function(callback) {
        data.sort(function(a, b) {
          return a.zIndex - b.zIndex;
        });
        callback(null, data);
      },
      function(sortedData, callback) {
        var renderingArgs = args;
        sortedData.forEach(function(element) {
          renderingArgs.data = element;
          if (element.renderableType === 'GroupNode') {
            pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(args, function(groupContainer, groupContents) {
              var groupedElementsArgs = renderingArgs;
              groupedElementsArgs.svg = svg;
              groupedElementsArgs.container = args.container; //groupContainer;
	      /* 
	      console.log('groupContainer');
	      console.log(groupContainer); //*/
              groupedElementsArgs.data = groupContents;
	      /*
	      console.log('groupContents');
	      console.log(groupContents); //*/
              groupedElementsArgs.pathway = pathway;

              // recursively calling this function to render elements within groupNode(s)
              pathvisiojs.view.pathwayDiagram.svg.renderSelectedElementsFast(groupedElementsArgs, function() {
              });


              /*
              var groupedElementsFrame = {
                '@context': pathway['@context'],
                "@type":element.GroupId
              };
              jsonld.frame(args.pathway, groupedElementsFrame, function(err, groupedElementsData) {
                var nodeEntityArgs = {};
                nodeEntityArgs.svg = args.svg;
                nodeEntityArgs.container = groupContainer;
                nodeEntityArgs.data = groupedElementsData['@graph'];
                pathvisiojs.view.pathwayDiagram.svg.renderSelectedElementsFast(nodeEntityArgs, function() {
                });
              });
              //*/
            });
          }
          else {
            if (element.renderableType === 'EntityNode') {
              pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
            }
            else {
              if (element.renderableType === 'Interaction') {
                pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
              }
              else {
                if (element.renderableType === 'GraphicalLine') {
                  pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);
                }
              }
            }
          }
        });
        callback(null, 'Successfully rendered elements');
      }
    ],
    function(err, results) {
      callbackOutside(null);
    })
  }

  function renderFast(svg, pathway, callback){
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No data entered to render.");
    }

    console.log('first');
    console.log(new Date());
    async.parallel({
      /*
      'gridData': function(callbackInside) {
        var frame = {
          '@context': pathvisiojs.context,
          '@type': 'EntityNode'
        };  
        jsonld.frame(pathway, frame, function(err, framedData) {
          pathvisiojs.view.pathwayDiagram.pathFinder.initGrid(framedData['@graph'], pathway.image.width, pathway.image.height, function(gridData) {
            svg[0][0].pathvisiojs = svg[0][0].pathvisiojs || {};
            svg[0][0].pathvisiojs.gridData = gridData;
            callbackInside(null, gridData);
          });
        });
      },
      //*/
      'firstOrderData': function(callbackInside) {
        var firstOrderFrame = {
          '@context': pathvisiojs.context,
          '@type':['notGrouped', 'GroupNode']
        };
        jsonld.frame(pathway, firstOrderFrame, function(err, firstOrderData) {
          console.log('firstOrderData');
          console.log(firstOrderData['@graph']);
          callbackInside(null, firstOrderData['@graph']);
        });
      }
    },
    function(err, results) {
      console.log('second');
      console.log(new Date());
      var viewport = svg.select('#viewport');

      pathvisiojs.view.pathwayDiagram.svg.infoBox.render(viewport, pathway);

      var renderSelectedElementsFastArgs = {};
      renderSelectedElementsFastArgs.svg = svg;
      renderSelectedElementsFastArgs.container = viewport;
      renderSelectedElementsFastArgs.pathway = pathway;
      renderSelectedElementsFastArgs.data = results.firstOrderData;
      renderSelectedElementsFast(renderSelectedElementsFastArgs, function() {
        console.log('third');
        console.log(new Date());
        callback(svg);
      });


      //pathvisiojs.view.pathwayDiagram.svg.grid.render(svg);

      /*
      async.series([
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.groupData;
          renderSelectedElementsFast(args, function() {
            console.log(1);
          });
          callbackInside2(null, svg);
        },
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.notGroupedData;
          self.args = args;
          renderSelectedElementsFast(args, function() {
            console.log(2);
            callbackInside2(null, svg);
          });
        }
      ],
      function(err, results) {
        callback(svg);
      })
      //*/
    })
  }

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
    renderFast:renderFast,
    renderSelectedElementsFast:renderSelectedElementsFast,
    load:load,
    loadPartials:loadPartials
  };
}();
