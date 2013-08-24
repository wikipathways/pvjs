pathvisio.svg = function(){

  var pathways = [];
  var pathway = null;

  function svg(selector, remote){
    if (selector !== null) {
      pathway.svg = d3.select(selector);
      var svgCount = pathway.svg.length;
      if (svgCount === 1) {
        pathway.selector = selector;
        console.log('Successfully loaded SVG pathway template.');
      }
      else {
        return console.warn('Error: ' + svgCount + ' SVG template(s) returned with selector "' + selector + '". Please redefined selector so only 1 result is returned.');
      };
    }
    else {
      return console.warn('Error: No SVG template selector specified.');
    };

    /*
    // Use this code if you want to get the SVG using d3.xml
    var svg = d3.select("#pathway-container").select(function() {
      return this.getSVGDocument().documentElement;
    });
    */

    pathways.push(pathway);
  };

  return {
    svg:svg,
    pathways:pathways,
    pathway:pathway
  }
}();
