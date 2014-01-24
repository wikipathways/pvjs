"use strict";

pathvisiojs.view.pathwayDiagram = function(){
  // currently just using Gecko (Firefox) list of supported image formats for the HTML img tag:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img
  // TODO decide what to do if the user specifies an SVG image as a dataSource element

  // the viewMethods are sorted in order of preference - viewMethod with lower index will be used if more than one is returned.
  var sourceDataFileTypeToViewMethodMappings = {
    gpml:[
      'svg' //in the future, could add canvas support
    ],
    biopax:[ //biopax is not currently supported
      'svg' //in the future, could add canvas support
    ],
    pdf:[
      'pdf' //not supported now. this would be future. we might use pdf.js or we could just try using an embed or object tag.
    ],
    png:[
      'img'
    ],
    jpg:[
      'img'
    ],
    jpeg:[
      'img'
    ],
    jpe:[
      'img'
    ],
    jif:[
      'img'
    ],
    jfif:[
      'img'
    ],
    jfi:[
      'img'
    ],
    gif:[
      'img'
    ],
    ico:[
      'img'
    ],
    bmp:[
      'img'
    ],
    dib:[
      'img'
    ]
  };

  function getFirstRenderableSourceDataElement(sourceData) {
    var sourceDataElement, viewMethodsForSourceDataFileType, supportedViewMethodsForSourceDataFileType,
      results = {},
      supportedViewMethods = getSupportedViewMethods();

    var i = 0;
    do {
      sourceDataElement = sourceData[i];
      viewMethodsForSourceDataFileType = sourceDataFileTypeToViewMethodMappings[sourceDataElement.fileType];
      supportedViewMethodsForSourceDataFileType = pathvisiojs.utilities.intersect(viewMethodsForSourceDataFileType, supportedViewMethods);
      i += 1;
    } while ((supportedViewMethodsForSourceDataFileType.length < 1) && (i < sourceData.length + 1));

    sourceDataElement.selectedViewMethod = supportedViewMethodsForSourceDataFileType[0];
    return sourceDataElement;
  }

  //function getImageFormatByDataSourceFileType(fileType) {
  //this is testing the browser the user is currently using 
  function getSupportedViewMethods() {
    //making an assumption that all browsers we care about support the HTML img tag

    var supportedViewMethods = ['img'];

    // TODO support svg that is not inline in the svg viewMethod
    // The IE9 detection is a temporary hack. It is used because IE9 cannot currently convert GPML to pathvisiojsJson,
    // so it cannot display the resulting SVG.
    // TODO get gpml to pathvisiojsJson conversion working with IE9
    if (Modernizr.inlinesvg && (pathvisiojs.utilities.isIE() !== 9)) {
      supportedViewMethods.push('svg');
    }
    
    return supportedViewMethods;
  }

  function loadHtmlTemplate(container, callback) {
    container.html(pathvisioNS['tmp/pathvisiojs.html']);
    callback();
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

      var container = d3.select(containerSelector);
      if (container.length !== 1) {
        throw new Error('Container selector must be matched by exactly one element.');
      }

    // waterfall means that each function completes in order, passing its result to the next
    async.waterfall([
      function(callback){ // this could be in parallel
        // ********************************************
        // Load HTML template
        // ********************************************
        var htmlTemplate = loadHtmlTemplate(container, function() {
          callback(null);
        });
      },
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

        var boundingClientRect = container[0][0].getBoundingClientRect();
        var containerWidth = boundingClientRect.width - 40; //account for space for pan/zoom controls,
        var containerHeight = boundingClientRect.height - 20; //account for space for search field;

        //add loading gif
        var posX = containerWidth/2;
        var posY = containerHeight/2;
        var img = container.append('img')
        .attr('src', "../src/img/loading.gif")
        .attr('width', 50)
        .style('position', "absolute")
        .style('top', posY + "px")
        .style('left', posX + "px");

        callback(null, container, containerWidth, containerHeight, renderableSourceDataElement);
      },
      function(container, containerWidth, containerHeight, renderableSourceDataElement, callback){
        var svg, pathway,
        loadDiagramArgs = {};
        loadDiagramArgs.container = container;
        loadDiagramArgs.renderableSourceDataElement = renderableSourceDataElement;
        loadDiagramArgs.containerWidth = containerWidth;
        loadDiagramArgs.containerHeight = containerHeight;
        loadDiagramArgs.fitToContainer = fitToContainer;

        // ********************************************
        // Check for SVG support. If false, use PNG fallback
        // ********************************************

        
        if (renderableSourceDataElement.selectedViewMethod === 'svg') { // TODO get this working in IE9
          loadDiagramArgs.cssUri = cssUri;
          loadDiagramArgs.customMarkers = customMarkers;
          //loadDiagramArgs.customSymbols = customSymbols;
          pathvisiojs.view.pathwayDiagram.svg.load(loadDiagramArgs, function() {
            callback(null, 'img loaded');
          });
        }
        else {
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

     
