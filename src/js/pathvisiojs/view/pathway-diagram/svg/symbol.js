// This class is for SVG Symbols. Note that SVG Use Elements display instances SVG Symbols,
// but SVG Symbols are never visible on their own.
// See also: use-element.js

pathvisiojs.view.pathwayDiagram.svg.symbol = function(){
  function appendCustom(customShape, callback) {
    // TODO don't select svg again
    var svg = d3.select('#pathway-svg');
    if (1===1) {
      d3.xml(customShape.url, 'image/svg+xml', function(svgXml) {

        def = svg.select('defs').select('#' + customShape.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customShape.id)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }


        var shape = d3.select(svgXml.documentElement)
        var width = shape.attr('width');
        var height = shape.attr('height');

        def.attr('viewBox', '0 0 ' + width + ' ' + height);

        var parent = document.querySelector('#' + customShape.id);


        var d3Svg = shape[0][0].children;
        var i = -1;
        do {
          i += 1;
          parent.appendChild(d3Svg[i]);
        } while (i < d3Svg.length - 1);
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = customShape.url;
      img.onload = function() {
        def = svg.select('defs').select('#' + customShape.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customShape.id)
          .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }
        dimensions = def.attr('viewBox').split(' ');

        /*
        def.append('image').attr('xlink:xlink:href', customShape.url)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");
        //*/

        callback(null);
      }
    }

    /*
    def.append('object').attr('data', customShape.url)
    .attr('x', dimensions[0])
    .attr('y', dimensions[1])
    .attr('width', dimensions[2])
    .attr('height', dimensions[3])
    .attr('type', "image/svg+xml");
    //*/


  }

  function loadAllCustom(svg, customShapes, callback) {
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    async.each(customShapes, appendCustom, function(err){
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
