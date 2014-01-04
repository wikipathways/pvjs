// This class is for SVG Symbols. Note that SVG Use Elements display instances SVG Symbols,
// but SVG Symbols are never visible on their own.
// See also: ./node/use-element.js

// a hack because I don't know how to pass the svg variable to the function appendCustom() when it's part of async.each().
var svg;

pathvisiojs.view.pathwayDiagram.svg.symbol = function(){

  var semanticNameToIdMapping = { 
    'arc':'shape-library-symbols-arc-svg',
    'brace':'shape-library-symbols-brace-svg',
    'endoplasmic-reticulum':'shape-library-symbols-endoplasmic-reticulum-svg',
    'golgi-apparatus':'shape-library-symbols-golgi-apparatus-svg',
    'hexagon':'shape-library-symbols-hexagon-svg',
    'mim-degradation':'shape-library-symbols-mim-degradation-svg',
    'mitochondria':'shape-library-symbols-mitochondria-svg',
    'oval':'shape-library-symbols-oval-svg',
    'pentagon':'shape-library-symbols-pentagon-svg',
    'rectangle':'shape-library-symbols-rectangle-svg',
    'sarcoplasmic-reticulum':'shape-library-symbols-sarcoplasmic-reticulum-svg',
    'triangle':'shape-library-symbols-triangle-svg',
    'none':'shape-library-symbols-none-svg'
  };

  function appendCustom(uniqueSymbolShapeUrl, callback) {
    var img, width, height, imgChildren;
    var dimensions = null;

    var symbolId = strcase.paramCase(uniqueSymbolShapeUrl)
    var defsSection = svg.select('defs');
    var symbol = defsSection.select('#' + symbolId);
    if (!symbol[0][0]) {
      symbol = defsSection.append('symbol')
      .attr('id', symbolId)
      .attr('preserveAspectRatio', 'none');
    }
    else {
      symbol.selectAll('*').remove();
    }

    // ignoring non-svg symbols for now
    if (1===1) {
    //if (symbolType === 'svg') {
      d3.xml(uniqueSymbolShapeUrl, "image/svg+xml", function(svgXml) {
        img = d3.select(svgXml.documentElement)
        width = img.attr('width');
        height = img.attr('height');
        symbol.attr('viewBox', '0 0 ' + width + ' ' + height);
        imgChildren = img[0][0].children;
        do {
          symbol[0][0].appendChild(imgChildren[0]);
        } while (imgChildren.length > 0);
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = uniqueSymbolShapeUrl;
      img.onload = function() {
        symbol.attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        dimensions = symbol.attr('viewBox').split(' ');
        symbol.append('image').attr('xlink:xlink:href', uniqueSymbolShapeUrl)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");
        callback(null);
      }
    }
  }

  function loadAllCustom(thisSvg, customSymbols, callback) {
    svg = thisSvg;

    var uniqueSymbolShapeUrls = [];
    customSymbols.forEach(function(customSymbol){
      semanticNameToIdMapping[customSymbol.semanticName] = strcase.paramCase(customSymbol.url);
      if (uniqueSymbolShapeUrls.indexOf(customSymbol.url) === -1) {
        uniqueSymbolShapeUrls.push(customSymbol.url);
      }
    });

    async.each(uniqueSymbolShapeUrls, appendCustom, function(err){
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
    semanticNameToIdMapping:semanticNameToIdMapping,
    getAllSymbolNames:getAllSymbolNames
  };
}();
