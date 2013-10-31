pathvisio = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON
  
  var svg, pngUrl, pathway, shapesAvailable, args;
  self.svg = svg;

  function getUriFromWikiPathwaysId(wikiPathwaysId, revision) {

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return 'http://pointer.ucsf.edu/d3/r/gpml.php?id=' + wikiPathwaysId + '&rev=' + revision;
  }

  function getInputDataDetails(inputData) {

    // inputData can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.

    var results = {};
    if (!inputData.revision) {
      inputData.revision = 0;
    }

    if (pathvisio.helpers.getObjectType(inputData) === 'Object') {
      results = inputData;
      if (pathvisio.helpers.isWikiPathwaysId(inputData.wikiPathwaysId)) {
        results.uri = getUriFromWikiPathwaysId(inputData.wikiPathwaysId, inputData.revision);
        results.type = 'GPML';
      }
    }
    else {
      if (pathvisio.helpers.isUrl(inputData)) {
        results.uri = inputData;
        if (results.uri.indexOf('.gpml') > -1) {
          results.type = 'GPML';
        }
      }
      else {
        if (pathvisio.helpers.isWikiPathwaysId(inputData)) {
          results.uri = getUriFromWikiPathwaysId(inputData);
          results.type = 'GPML';
        }
        else {
          return new Error('Pathvisio.js cannot handle the data source type entered: ' + data);
        }
      }
    }

    return results;
  }

  function getJson(inputData, callback) {

    // get GPML (pathway XML) from WikiPathways (by ID) or a URL (could be a local file or any other accessible GPML source),
    // convert to formatted JSON and return the JSON to the function that called getJson()

    var inputDataDetails = getInputDataDetails(inputData);

    // For now, pathvisio.js will attempt to convert any input data, with a type of
    // GPML or with no type specified, into JSON.
    // TODO Later, this functionality can be extended to include other data types and
    // to test for data type when it is not specified.

    if (!!inputDataDetails.uri && (!inputDataDetails.type || inputDataDetails.type === 'GPML')) {

      // I would prefer to use d3.xml for the http request in order to not depend on jQuery,
      // but d3.xml doesn't seem to work with IE8. TODO remove dependency on jQuery

      d3.xml(inputDataDetails.uri, function(gpml) {
        pathvisio.converter.gpml.toRenderableJson(gpml, function(json) {
          callback(json);
        });
      });
    }
    else {
      return new Error('No data source specified or pathvisio.js cannot handle the data source specified.');

    }
  }

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

  function fitElementWithinContainer(target, elementWidth, elementHeight, preserveAspectRatioValues) {

    // following svg standards.
    // see http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute

    var meetOrSlice, xScale, yScale, scale, elementWidthScaled, elementHeightScaled;
    var results = {};

    xScale = scale = target.width/elementWidth;
    yScale = target.height/elementHeight;

    if (preserveAspectRatioValues.align === 'none') {
      results.x = 0;
      results.y = 0;
      
      results.width = xScale * elementWidth;
      results.height = yScale * elementHeight;
    }
    else {
      if (preserveAspectRatioValues.meetOrSlice === 'meet') {
        scale = xScale = yScale = Math.min(xScale, yScale);
      }
      else {
        scale = xScale = yScale = Math.max(xScale, yScale);
      }

      results.width = xScale * elementWidth;
      results.height = yScale * elementHeight;

      xMapping = [
        {'x-min': 0},
        {'x-mid': target.width/2 - results.width/2},
        {'x-max': target.width - results.width}
      ];

      yMapping = [
        {'y-min': 0},
        {'y-mid': target.height/2 - results.height/2},
        {'y-max': target.height - results.height}
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

  // get JSON and draw SVG representation of pathway

  function load(args) {

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.target) { return console.warn('Error: No target selector specified as target for pathvisio.js.'); }
    if (!args.data) { return console.warn('Error: No input data source (URL or WikiPathways ID) specified.'); }

    // ********************************************
    // Get and define required data 
    // ********************************************

    if (!args.preserveAspectRatio) { args.preserveAspectRatio = 'xMidYMid'; }
    preserveAspectRatioValues = getPreserveAspectRatioValues(args.preserveAspectRatio);
    args.targetElement = d3.select(args.target);
    if (args.targetElement.length !== 1) { return console.warn('Error: Container selector must be matched by exactly one element.'); }
    var target = {};
    target.element = args.targetElement;
    self.targetElement = args.targetElement;

    target.width = targetElement[0][0].getElementWidth();
    target.height = targetElement[0][0].getElementHeight();

    async.parallel({
      partials: function(callback) {
        if (Modernizr.svg) {
          pathvisio.renderer.svg.loadPartials(target, preserveAspectRatioValues, args.customMarkers, args.customShapes, args.cssUrl, function(svg) {
            console.log(svg);
            callback(null);
          })
        }
        else {
          // TODO use target selector and seadragon for this
          window.setTimeout(function() {
            $('#view').prepend('<img id="pathvisio-java-png" src="http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' +  + urlParamList.gpml + '&revision=' + urlParamList.gpmlRev + '" />')
          }, 50);
        }
      },
      pathway: function(callback){
        getJson(args.data, function(json) {
          console.log('json');
          console.log(json);
          callback(null, json);
        })
      }
    },
    function(err, results){
      self.results = results;

///*
      if (Modernizr.svg) {
        pathvisio.renderer.svg.load(args, preserveAspectRatioValues, target, function() {
          console.log('svg loaded');
        });
      }
      else {
        // TODO add highlighter to seadragon
      }

      /* Node Highlighter

      var nodeLabels = [];
      pathway.nodes.forEach(function(node) {
        if (!!node.textLabel && node.elementType === 'data-node') {
          nodeLabels.push(node.textLabel.text);
        }
      });


      // see http://twitter.github.io/typeahead.js/

      $('#highlight-by-label-input').typeahead({
        name: 'Highlight node in pathway',
        local: nodeLabels,
        limit: 10
      });
//*/

      /*
      $('.icon-eye-open').click(function(){
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.renderer.svg.node.highlightByLabel(svg, nodeLabel);
        }
      });
//*/
/*
      // see http://api.jquery.com/bind/
      // TODO get selected value better and make function to handle

      $( "#highlight-by-label-input" ).bind( "typeahead:selected", function() {
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.renderer.svg.node.highlightByLabel(svg, nodeLabel);
        }
      });
    */

    });
  }

  return {
    load:load,
    getJson:getJson,
    fitElementWithinContainer:fitElementWithinContainer
  };
}();
