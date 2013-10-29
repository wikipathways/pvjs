pathvisio = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON
  
  var svg, pngUrl, pathway, symbolsAvailable, targetWidth, targetHeight;
  self.svg = svg;

  // get GPML (pathway XML) from WikiPathways (by ID) or a URL (could be a local file or any other accessible GPML source),
  // convert to formatted JSON and return the JSON to the function that called getJson()

  function getJson(url, callback) {
    if (!url) {
      // TODO throw a proper error here

      var error = 'Error: URL not specified.';
      console.warn(error);
      return error;
    }
    else {

      // I would prefer to use d3.xml for the http request in order to not depend on jQuery,
      // but d3.xml doesn't seem to work with IE8. TODO remove dependency on jQuery

      d3.xml(url, function(gpml) {
        pathvisio.converter.gpml.toRenderableJson(gpml, function(json) {
          callback(json);
        });
      });

      // be sure server has set gpml mime type to application/xml or application/gpml+xml

    }
  }

  function highlightByLabel(nodeLabel) {
    svg.selectAll('.highlighted-node').remove();
    var dataNodes = pathway.nodes.filter(function(element) {return element.elementType === 'data-node';});
    var dataNodesWithText = dataNodes.filter(function(element) {return (!!element.textLabel);});
    var selectedNodes = dataNodesWithText.filter(function(element) {return element.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeDomElement = svg.select('#nodes-container-' + node.graphId);
      var height = nodeDomElement[0][0].getBBox().height;
      var width = nodeDomElement[0][0].getBBox().width;
      nodeDomElement.append('rect')
      .attr('class', 'highlighted-node')
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
  }

  function appendCustomShape(customShape, callback) {
    img = document.createElement('img');
    img.src = customShape.url;
    img.onload = function() {
      def = svg.select('defs').select('#' + customShape.id);
      if (!def[0][0]) {
        def = svg.select('defs').append('symbol').attr('id', customShape.id)
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        .attr('preserveAspectRatio', 'none');
      }
      else {
        def.selectAll('*').remove();
      }
      dimensions = def.attr('viewBox').split(' ');
      def.append('image').attr('xlink:xlink:href', customShape.url).attr('x', dimensions[0]).attr('y', dimensions[1]).attr('width', dimensions[2]).attr('height', dimensions[3]);
      callback(null);
    }
  }

  function loadCustomShapes(args, callback) {
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    if (!!args.customShapes) {
      async.each(args.customShapes, appendCustomShape, function(err){
          // if any of the saves produced an error, err would equal that error
        callback(null);
      });
    }
  }

  function loadPartials(args, callback) {
    async.series([
      function(callback){
        var pathwayContainer = args.targetElement.append('div')
        .attr('id', 'pathway-container')
        .attr('style', 'width: ' + targetWidth + 'px; ' + targetHeight + 'px; ');

        var loadingPng = pathwayContainer.append('img')
        .attr('id', 'pathway-png')
        .attr('src', pngUrl)
        .on('load', function() {

          loadingPngDimensions = fitElementWithinContainer(targetWidth, targetHeight, this.width, this.height, 'xMidYMin');

          pathwayContainer.attr('class', loadingPngDimensions.yAlign);

          loadingPng.attr('class', loadingPngDimensions.xAlign)
          .attr('width', loadingPngDimensions.width + 'px')
          .attr('height', loadingPngDimensions.height + 'px');
        });


        /*
        // Update…
        var pd3 = docfragd3.selectAll("p")
            .data([3, 4, 8, 15, 16, 23, 42])
            .text(String);

        // Enter…
        pd3.enter().append("p")
            .text(String);

        // Exit…
        pd3.exit().remove();

        d3.select('document').append(docfragd3);
        //*/

        //var loadingImage = args.targetElement.select('#pathway-image');




        ///*
        //var docfrag = document.createDocumentFragment();
        //var div = d3.select(docfrag).append('div');
        var div = d3.select('#pathway-container').append('div');
        //var div = document.createElement('div');
        var template = div.html(pathvisioNS['tmp/pathvisio-js.html']);
        self.template = template;
        svg = template.select('#pathway-image');
        //args.targetElement.html(pathvisioNS['tmp/pathvisio-js.html']);
        ////*/

        callback(null);
      },
      function(callback) {
        loadCustomShapes(args, function() {
          callback(null);
        })
      },
      function(callback) {
        if (!!args.cssUrl) {
          d3.text(args.cssUrl, 'text/css', function(data) {
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
      callback(args.svg);
    });
  }

  function fitElementWithinContainer(targetWidth, targetHeight, elementWidth, elementHeight, preserveAspectRatio) {

    // following svg standards.
    // see http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute

    var align, meetOrSlice, xScale, yScale, scale, elementWidthScaled, elementHeightScaled;
    var results = {};

    if (!preserveAspectRatio.align) {
      align = preserveAspectRatio;
    }
    else {
      align = preserveAspectRatio.align;
    }

    xScale = targetWidth/elementWidth;
    yScale = targetHeight/elementHeight;

    if (align === 'none') {
      results.x = 0;
      results.y = 0;

      results.xAlign = 'x-mid';
      results.yAlign = 'y-mid';
      
      results.width = xScale * elementWidth;
      results.height = yScale * elementHeight;
    }
    else {
      meetOrSlice = 'meet';
      if (!!preserveAspectRatio.meetOrSlice) {
        meetOrSlice = preserveAspectRatio.meetOrSlice;
      }

      if (meetOrSlice === 'meet') {
        scale = xScale = yScale = Math.min(xScale, yScale);
      }
      else {
        scale = xScale = yScale = Math.max(xScale, yScale);
      }

      results.width = xScale * elementWidth;
      results.height = yScale * elementHeight;

      xMapping = [
        {'x-min': 0},
        {'x-mid': targetWidth/2 - results.width/2},
        {'x-max': targetWidth - results.width}
      ];

      yMapping = [
        {'y-min': 0},
        {'y-mid': targetHeight/2 - results.height/2},
        {'y-max': targetHeight - results.height}
      ];

      results.xAlign = 'x-' + align.substr(1, 3).toLowerCase();
      results.yAlign = 'y-' + align.substr(align.length - 3, 3).toLowerCase();

      results.x = xMapping[results.xAlign];
      results.y = yMapping[results.yAlign];

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

    // Check for minimum required parameters

    if (!args.gpml) { return console.warn('Error: No gpml (URL or WikiPathways ID) specified as data source for pathvisio.js.'); }

    if (!args.target) { return console.warn('Error: No target selector specified as target for pathvisio.js.'); }
    args.targetElement = d3.select(args.target);
    if (args.targetElement.length !== 1) { return console.warn('Error: Container selector must be matched by exactly one element.'); }
    self.targetElement = args.targetElement;

    targetWidth = targetElement[0][0].getElementWidth();
    targetHeight = targetElement[0][0].getElementHeight();

    var gpmlUrl;
    var gpmlRev = 0;

    // test for whether args.gpml is a WikiPathways ID or a URL. 
    // TODO This test cannot currently handle a webservice that delivers gpml if
    // the request url does not include the string 'gpml' or 'xml' in it.

    if (args.gpml.indexOf('.gpml') === -1 && args.gpml.indexOf('.xml') === -1) {
      if (!!args.gpmlRev) {
        gpmlRev = args.gpmlRev;
      }
      gpmlUrl = rootDirectoryUrl + 'remote-data-sources/php/wikipathways.php?data=gpml&id=' + args.gpml + '&rev=' + gpmlRev;

      pngUrl = encodeURI('http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' + urlParamList.gpml + '&revision=' + urlParamList.gpmlRev);
    }
    else {
      gpmlUrl = args.gpml;
      pngUrl = encodeURI('http://wikipathways.org//wpi/extensions/PathwayViewer/img/loading.gif');
      if (!Modernizr.svg) {
        return console.warn('Error: GPML data source specified is not a WikiPathways ID. WikiPathways does not have access to a visual representation of this GPML.');
      }
    };
    console.log(gpmlUrl);






    async.parallel({
      partials: function(callback) {
        loadPartials(args, function() {
          callback(null);
        })
      },
      pathway: function(callback){
        getJson(gpmlUrl, function(json) {
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
        async.series([
          function(callback) {
            pathvisioNS.grid = {};
            pathvisio.renderer.pathFinder.generateGridData(results.pathway, function() {
              callback(null);
            });
          },
          function(callback){
            //draw(svg, pathway, function() {
            pathvisio.renderer.svg.render(svg, results.pathway, function() {
              callback(null);
            })
          },
          function(callback) {
            d3.select('#pathway-png').remove();
            svgPanZoom.init({
              'root': 'svg',
              'enableZoom': true 
            });
            callback(null);
          }
        ],
        function(err, results) {
        });
      }
      else {
        // TODO use target selector and seadragon for this
        window.setTimeout(function() {
          $('#view').prepend('<img id="pathvisio-java-png" src="http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' +  + urlParamList.gpml + '&revision=' + urlParamList.gpmlRev + '" />')
        }, 50);
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
          pathvisio.pathway.highlightByLabel(nodeLabel);
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
          pathvisio.pathway.highlightByLabel(nodeLabel);
        }
      });
    */

    });
  }

  return {
    load:load,
    getJson:getJson,
    highlightByLabel:highlightByLabel
  };
}();
