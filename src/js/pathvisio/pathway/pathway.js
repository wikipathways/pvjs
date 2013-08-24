pathvisio.pathway = function(){

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
          console.log('GPML');
          console.log(gpml);

          pathvisio.pathways[pathvisio.current.svgSelector] = pathvisio.gpml2json.convert(gpml, pathvisio.current.svgSelector);
          var sJson = self.sJson = JSON.stringify(pathvisio.pathways[pathvisio.current.svgSelector], undefined, 2);

          callback(pathvisio.pathways[pathvisio.current.svgSelector], sGpml, sJson);
        });
      };
    };
  };

  function draw(data){
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

    pathvisio.current.svg.attr('width', data.boardWidth);
    pathvisio.current.svg.attr('height', data.boardHeight);

    var symbolsAvailable = self.symbolsAvailable = pathvisio.current.svg.selectAll('symbol');

    var markersAvailable = markersAvailable = pathvisio.current.svg.selectAll('marker');

    pathvisio.pathway.group.drawAll();

    pathvisio.pathway.edge.drawAll();

    pathvisio.pathway.labelableElement.drawAll();

    pathvisio.pathway.infoBox.draw();
  };

  function load(svgSelector, url, mimeType){
    if (svgSelector !== null) {
      pathvisio.current = {};
      pathvisio.current.svgSelector = svgSelector;
      pathvisio.current.svg = d3.select(svgSelector);
      var svgCount = pathvisio.current.svg.length;
      if (svgCount === 1) {
        console.log('Successfully loaded SVG pathway template.');
        //return pathvisio.current.svg;
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

    if (url === null) {
      return console.warn('Error: No url specified for GPML or JSON data.');
    };

    get(url, mimeType, function(data, sGpml, sJson) {
      draw(data);
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
