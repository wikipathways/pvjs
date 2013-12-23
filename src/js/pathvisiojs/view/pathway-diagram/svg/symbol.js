// This class is for SVG Symbols. Note that SVG Use Elements display instances SVG Symbols,
// but SVG Symbols are never visible on their own.
// See also: ./node/use-element.js

// a hack because I don't know how to pass the svg variable to the function appendCustom() when it's part of async.each().
var svg;

pathvisiojs.view.pathwayDiagram.svg.symbol = function(){
  function appendCustom(customSymbol, callback) {
    var defsSection = svg.select('defs');
    var symbol = defsSection.select('#' + customSymbol.id);
    if (!symbol[0][0]) {
      symbol = defsSection.append('symbol')
      .attr('id', customSymbol.id)
      .attr('preserveAspectRatio', 'none');
    }
    else {
      symbol.selectAll('*').remove();
    }

    // ignoring non-svg symbols for now
    //if (symbolType === 'svg') {
    if (1===1) {
      d3.xml(customSymbol.url, "image/svg+xml", function(svgXml) {
        var shape = d3.select(svgXml.documentElement)
        var width = shape.attr('width');
        var height = shape.attr('height');
        //var shapeClass = shape.attr('class');

        symbol.attr('viewBox', '0 0 ' + width + ' ' + height);

          self.mySvgXml = svgXml;
          var shapeSvg = d3.select(svgXml).select('svg');
          var width = shapeSvg.attr('width');
          var height = shapeSvg.attr('height');
          symbol.attr('viewBox', '0 0 ' + width + ' ' + height);
          var shapeChildren = shapeSvg[0][0].children;
          d3.xml(customSymbol.url, "image/svg+xml", function(svgXml) {
            self.mySvgXml = svgXml;
            shapeSvg = d3.select(svgXml).select('svg');
            var width = shapeSvg.attr('width');
            var height = shapeSvg.attr('height');
            symbol.attr('viewBox', '0 0 ' + width + ' ' + height);
            //symbol.attr('class', shapeClass);
            shapeChildren = shapeSvg[0][0].children;
            do {
              symbol[0][0].appendChild(shapeChildren[0]);
            } while (shapeChildren.length > 0);
          });
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = customSymbol.url;
      img.onload = function() {
        symbol.attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        dimensions = symbol.attr('viewBox').split(' ');
        symbol.append('image').attr('xlink:xlink:href', customSymbol.url)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");
        callback(null);
      }
    }

    /*
    symbol.append('object').attr('data', customSymbol.url)
    .attr('x', dimensions[0])
    .attr('y', dimensions[1])
    .attr('width', dimensions[2])
    .attr('height', dimensions[3])
    .attr('type', "image/svg+xml");
    //*/


  }

  function loadAllCustom(thisSvg, customSymbols, callback) {
    svg = thisSvg;
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    async.each(customSymbols, appendCustom, function(err){
      // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function getAllSymbolNames(svg, callback) {
    var allSymbolNames = svg.selectAll('symbol')[0].map(function(symbol) {
      return strcase.paramCase(symbol.id);
    })
    callback(allSymbolNames);
  }

  return {
    loadAllCustom:loadAllCustom,
    getAllSymbolNames:getAllSymbolNames
  };
}();
