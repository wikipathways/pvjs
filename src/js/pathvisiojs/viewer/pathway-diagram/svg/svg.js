pathvisiojs.view.pathwayDiagram.svg = {
    renderableTypeToSvgElementMappings: {
      entityNode: 'g',
      groupNode: 'g',
      interaction: 'path',
      graphicalLine: 'path'
    },

  //calculates the proper scaling and translations to fit content (i.e., diagram) to screen (i.e., viewport)
  fitAndCenterDiagramWithinViewport: function(viewport, viewportWidth, viewportHeight, diagramWidth, diagramHeight) {
    // viewport is a d3 selection

    var fitScreenScale = Math.min(viewportWidth/diagramWidth, viewportHeight/diagramHeight);
    var diagramWidthScaled = fitScreenScale * diagramWidth;
    var diagramHeightScaled = fitScreenScale * diagramHeight;

    var xTranslation = viewportWidth/2 - diagramWidthScaled/2 + 10; //plus margin-left
    var yTranslation = viewportHeight/2 - diagramHeightScaled/2 + 20; //plus margin-top

    var translationMatrixString = 'matrix(' + fitScreenScale + ', 0, 0, ' + fitScreenScale + ', ' + xTranslation + ', ' + yTranslation + ') ';
    
    viewport.attr("transform", translationMatrixString);
  },

  load: function(args, callbackOutside) {
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
    var svgRenderer = this;

    async.waterfall([
      function(callback){
        async.parallel({
          preloadSvg: function(callback) {
            var preloadDiagramArgs = {};
            preloadDiagramArgs.container = diagramContainer;
            preloadDiagramArgs.customMarkers = customMarkers;
            preloadDiagramArgs.cssUri = cssUri;
            //preloadDiagramArgs.customSymbols = customSymbols;

            svgRenderer.loadPartials(preloadDiagramArgs, function(svgSelection) {
              if (!svgSelection) {
                throw new Error("Could not load SVG template.");
              }

              var results = {};
              results.svgSelection = svgSelection;
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

          callback(null, results.preloadSvg.svgSelection, results.pathway);
        });
      },
      function(svgSelection, pathway, callback){
        svgRenderer.renderWithCachedData(svgSelection, pathway, function() {
          svgSelection.attr('style', 'display:inline');
          callback(null, svgSelection);
        });
      },
      function(svgSelection, callback) {
        if (!!highlights) {
          highlights.forEach(function(highlight) {
            svgRenderer.node.highlight(highlight);
          });
        }

        var viewport = svgSelection.select('#viewport');

        /* not all containers will have a width or height style attribute. this is now done using the same logic
         * but uses boundingClientRect() instead. the code is located in pathway-diagram.js
        var container = d3.select('body').select('#diagram-container');
        var containerWidth = parseInt(container.style("width")) - 40; //account for space for pan/zoom controls
        var containerHeight = parseInt(container.style("height")) -20; //account for space for search field
        //*/
        var fitScreenScale;
        if (fitToContainer) {
          svgRenderer.fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
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
          svgRenderer.fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
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
        svgSelection.on("click", function(d, i){
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
        callback(null, svgSelection);
      },
      function(svgSelection, callback){
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
             svgRenderer.node.highlightByLabel(svg, nodeLabel);
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

              svgRenderer.node.highlightByLabel(svgSelection, pathway, nodeLabel);
            }
          });

          d3.select('#clear-highlights-from-typeahead').on('click', function() {
            svgRenderer.node.clearHighlightsFromTypeahead();
          });
          callback(null, svgSelection);
        }
      }
    ],
    function(err, svgSelection) {
      callbackOutside(svgSelection);
    });
  },

  generateSvgTemplate: function (callback) {
    var docFragment = document.createDocumentFragment();
    var svgSelection = d3.select(docFragment).append('svg').
    attr('id', 'pathvisiojs-diagram').
    attr('version', '1.1').
    attr('baseProfile', 'full').
    attr('xmlns', 'http://www.w3.org/2000/svg').
    attr('xmlns:xmlns:xlink', 'http://www.w3.org/1999/xlink').
    attr('xmlns:xmlns:ev', 'http://www.w3.org/2001/xml-events').
    attr('width', '100%').
    attr('height', '100%').
    attr('style', 'display: none; ');

    var g = svgSelection.append('g');

    var title = svgSelection.append('title').
    text('pathvisiojs diagram');

    var desc = g.append('desc').
    text('This SVG file contains all the graphical elements (markers and symbols in defs as well as\nstyle data) used by the program pathvisiojs, which has two components:\n1) a viewer for transforming GPML biological pathway data into an SVG visual representation and\n2) an editor for creating both views and models for biological pathways.');

    var defs = svgSelection.append('defs');

    // TODO can we delete this filter?
    var filter = svgSelection.append('filter').
    attr('id', 'highlight').
    attr('width', '150%').
    attr('height', '150%');

    filter.append('feOffset').
    attr('result', 'offOut').
    attr('in', 'SourceGraphic').
    attr('dx', '30').
    attr('dy', '30');

    filter.append('feGaussianBlur').
    attr('result', 'blurOut').
    attr('in', 'offOut').
    attr('stdDeviation', '10');

    filter.append('feBlend').
    attr('in', 'SourceGraphic').
    attr('in2', 'blurOut').
    attr('mode', 'normal');

    var viewport = svgSelection.append('g').
    attr('id', 'viewport');
    callback(docFragment);
  },

  loadPartials: function(args, callbackOutside) {
    var svgRenderer = this;
    var svgTemplateGenerator = this.generateSvgTemplate;
    var diagramContainer = args.container,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      cssUri = args.cssUri;

    async.waterfall([
      function(callback) {
        var svgSelection = diagramContainer.append('div').html(pathvisioNS['tmp/pathvisiojs.svg']).select('#pathvisiojs-diagram')
        .attr('preserveAspectRatio', 'xMidYMid');

        svgTemplateGenerator(function(svgTemplate) {
          console.log('svgTemplate');
          console.log(svgTemplate);
          console.log('svgSelection');
          console.log(svgSelection);
          callback(null, svgSelection);
        });
      },
      function(svgSelection, callback) {
        if (!!args.customMarkers) {
          svgRenderer.marker.loadAllCustom(svgSelection, customMarkers, function() {
            callback(null, svgSelection);
          });
        }
        else {
          callback(null, svgSelection);
        }
      },
      /*
      function(callback) {
        if (!!args.customSymbols) {
          svgRenderer.symbol.loadAllCustom(svg, customSymbols, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      //*/
      function(svgSelection, callback) {
        if (!!cssUri) {
          d3.text(cssUri, 'text/css', function(data) {
            var defs = svgSelection.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callback(null, svgSelection);
          });
        }
        else {
          callback(null, svgSelection);
        }
      }
    ],
    function(err, svgSelection) {
      callbackOutside(svgSelection);
    });
  },

  convertToId: function(inputString) {
    var id = strcase.paramCase(inputString);
    //var id = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid id per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(id)) {
      id = 'id-' + id;
    }
    return id;
  },

  convertToCssClassName: function(inputString) {
    var cssClassName = strcase.paramCase(inputString);
    //var cssClassName = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid cssClassName per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(cssClassName)) {
      cssClassName = 'class-' + cssClassName;
    }
    return cssClassName;
  },

  renderWithCachedData: function(svgSelection, pathway, callback){
    var svgRenderer = this;
    if (!svgSelection) {
      throw new Error("No svgSelection specified.");
    }
    if (!pathway) {
      throw new Error("No data entered to render.");
    }

    var viewport = svgSelection.select('#viewport');


    var crossPlatformShapesInstance1 = Object.create(crossPlatformShapes);
    crossPlatformShapesInstance1.init({
      targetImageSelector:'svg',
      backgroundColor: 'gray',
      customShapes: { // optional
        arc: {
          href: 'http://upload.wikimedia.org/wikipedia/commons/5/5c/Triangular_arch.svg'
        },
        brace:{
          href: 'http://farm2.staticflickr.com/1175/1331501691_931c8a09d1_z.jpg'
        },
        mitochondria:{
          href: 'http://farm1.staticflickr.com/128/393913249_f0a61946dc_n.jpg'
        }
      }
    });

    svgRenderer.infoBox.render(viewport, pathway);

    var renderArgs = {};
    renderArgs.svgSelection = svgSelection;
    renderArgs.container = viewport;
    renderArgs.pathway = pathway;

/*
var docFrag = document.createDocumentFragment();
d3.select(docFrag).append('svg').append('path').attr('d', 'M0,0 L10,10');
var myPath = d3.select(docFrag).select('path')[0][0];
myPath.getTotalLength();
myPath.getBBox();
//*/


    async.waterfall([
      function(callbackInside){
        var renderingArgs = {};
        var elementRenderingData;
        async.each(pathway.elements, function(dataElement, callbackEach) {
          if (dataElement.graphicalType === 'path') {
            svgRenderer.path.render(viewport, dataElement);

          if (dataElement.gpmlType === 'Interaction') {
            elementRenderingData = crossPlatformShapesInstance1[strcase.camelCase(dataElement.shape)](dataElement);
            var element = viewport.append(elementRenderingData.elementName);
            elementRenderingData.attributes.forEach(function(attribute) {
              element.attr(attribute.name, attribute.value);
            });
          }

          }
          else if (dataElement.graphicalType === 'text') {
            svgRenderer.text.render(viewport, dataElement);
          }
          else if (dataElement.graphicalType === 'image') {
            /*
            svgRenderer.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
              // TODO this used to render the group contents, but now the callback does nothing
            });
            //*/
          }
          callbackEach(null);
        },
        function(err){
          callbackInside(null, svgSelection);
        });
      },
      function(svgSelection, callbackInside){
        var elementsWithPublicationXrefs = pathway.elements.filter(function(element){return !!element.publicationXrefs;});
        if (elementsWithPublicationXrefs.length > 0) {
          elementsWithPublicationXrefs.forEach(function(elementWithPublicationXrefs) {
            console.log('elementWithPublicationXrefs');
            console.log(elementWithPublicationXrefs);
            svgRenderer.publicationXref.render(viewport, elementWithPublicationXrefs);
          });
        }
        callbackInside(null, svgSelection);
      },
      function(svgSelection, callbackInside){
        callback(svgSelection);
      }
    ]);
  }
};
