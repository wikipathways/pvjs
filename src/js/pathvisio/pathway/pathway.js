pathway = function(){

  var url = null;

  function get(url, mimeType, callback) {
    if (url === undefined || !(url) || url === "") {
      return console.warn('Error: URL not specified.');

      //var url = "../../samples/gpml/error.gpml";
      //d3.xml(url, "application/gpml+xml", function(error, gpml) {

    }
    else {
      if (1!==1) {
      }
      else {
        d3.xml(url, "application/gpml+xml", function(gpmlDoc) {
          // be sure server has set gpml mime type to application/gpml+xml

          var oSerializer = new XMLSerializer();
          var sGpml = oSerializer.serializeToString(gpmlDoc);

          var gpml = gpmlDoc.documentElement;
          console.log('gpml');
          console.log(gpml);

          pathway.data = pathvisio.gpml2json.convert(gpml);
          var sJson = self.sJson = JSON.stringify(pathway.data, undefined, 2);

          callback(pathway, sGpml, sJson);
        });
      };
    };
  };

  function getSvg(svgSelector){
    if (svgSelector !== null) {
      var svg = d3.select(svgSelector);
      var svgCount = svg.length;
      if (svgCount === 1) {
        pathway.svgSelector = svgSelector;
        console.log('Successfully loaded SVG pathway template.');
        return svg;
      }
      else {
        return console.warn('Error: ' + svgCount + ' SVG template(s) returned with selector "' + svgSelector + '". Please redefined selector so only 1 result is returned.');
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
  };

  function draw(svgSelector, data){
    data.svg = getSvg(svgSelector);

    /*
    // Use this code if you want to get the SVG using d3.xml
    var svg = d3.select("#pathway-container").select(function() {
      return this.getSVGDocument().documentElement;
    });
    */

    if (data === null) {
      return console.warn('Error: No url specified for GPML or JSON data.');
    };

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
        d.x=d3.event.x;
        d.y=d3.event.y;
        d3.select(this)
        .attr("x", d3.event.x)
        .attr("y", d3.event.y);
    };	

    data.svg.attr('width', data.boardWidth);
    data.svg.attr('height', data.boardHeight);

    var symbolsAvailable = self.symbolsAvailable = data.svg.selectAll('symbol');

    var markersAvailable = markersAvailable = data.svg.selectAll('marker');

    pathvisio.pathways.push(pathway);

    pathway.groups.drawAll();

    pathway.edges.drawAll();

    pathway.labelableElements.drawAll();

    pathway.infoBox.draw();

    pathvisio.pathways.push(pathway);
  };

  function load(svgSelector, url, mimeType){

    if (url === null) {
      return console.warn('Error: No url specified for GPML or JSON data.');
    };

    var sGpml = get(url, mimeType, function(pathway, sGpml, sJson) {
    console.log('pathway js');
    console.log(pathway);
    draw(svgSelector, pathway.data);
      return sGpml;
    });

    //var gpml = document.getElementsByTagName('pathway')[0];
    //console.log('XML GPML:');
    //console.log(gpml);

    // be sure server has set gpml mime type to application/gpml+xml

    //pathvisio.gpml2json.convert(gpml);
  };

  return {
    draw:draw,
    load:load,
    get:get
  }
}();
