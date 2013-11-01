pathvisio.renderer = function(){

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

  function preload(args, callback) {

    // ********************************************
    // Get and define required data 
    // ********************************************

    if (!args.preserveAspectRatio) { args.preserveAspectRatio = 'xMidYMid'; }
    args.preserveAspectRatioValues = getPreserveAspectRatioValues(args.preserveAspectRatio);
    args.targetElement = d3.select(args.target);
    if (args.targetElement.length !== 1) { return console.warn('Error: Container selector must be matched by exactly one element.'); }
    args.target = {};
    args.target.element = args.targetElement;

    args.target.width = args.targetElement[0][0].getElementWidth();
    args.target.height = args.targetElement[0][0].getElementHeight();

    if (Modernizr.svg) {
      pathvisio.renderer.svg.loadPartials(args, function(svg) {
        console.log(svg);
        args.svg = svg;
        callback(args);
      })
    }
    else {

      // TODO use target selector and seadragon for this

      var pngUrl;
      var inputDataDetails = getInputDataDetails(args.data);
      if (!!inputDataDetails.wikiPathwaysId) {
        pngUrl = encodeURI('http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' + inputDataDetails.wikiPathwaysId + '&revision=' + inputDataDetails.revision);
      }
      else {

        // TODO update this link to a URL we control

        pngUrl = 'http://upload.wikimedia.org/wikipedia/commons/3/3b/Picture_Not_Yet_Available.png';
      }

      window.setTimeout(function() {
        $('#view').prepend('<img id="pathvisio-java-png" src="http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' +  + urlParamList.gpml + '&revision=' + urlParamList.gpmlRev + '" />')
      }, 50);
      callback(null);
    }
  }

  function load(args, pathway, callback) {
    if (Modernizr.svg) {
      pathvisio.renderer.svg.load(args, function(svg) {
        console.log(svg);
        callback(svg);
      })
    }
    else {
      // might not need to do anything here
    }
  }

  return{
    preload:preload,
    load:load,
    fitElementWithinContainer:fitElementWithinContainer
  };
}();

     
