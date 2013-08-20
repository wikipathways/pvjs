var pathvisio = function(){

  function init(){

    var gpml = document.getElementsByTagName('pathway')[0];
    console.log('gpml1');
    console.log(gpml);

    // be sure server has set gpml mime type to application/gpml+xml
    //d3.xml("../../samples/gpml/" + String(getURLParameter("pathway")), "application/gpml+xml", function(response) {
    //d3.xml("../../samples/gpml/" + getURLParameter("pathway"), "application/gpml+xml", function(error, response) {
    //d3.json("../../samples/gpml/WP673_63184.json", function(error, json) {


    /*
    var parser = new DOMParser();
    var gpmlDoc = parser.parseFromString(gpmlStr, "application/xml");
    self.gpmlDoc = gpmlDoc;
    var gpml = gpmlDoc.documentElement;
  */

    var pathway = pathvisio.xmlGpml2jsonGpml.convert(gpml);
    //getJson(gpml, function(pathway) {

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
        d.x=d3.event.x;
        d.y=d3.event.y;
        d3.select(this)
        .attr("x", d3.event.x)
        .attr("y", d3.event.y);
    }	


    /*
    // Use this code if you want to get the SVG using d3.xml
    var svg = d3.select("#pathway-container").select(function() {
      return this.getSVGDocument().documentElement;
    });
    */

    var svg = d3.select("#pathway-image");
    console.log('svg');
    console.log(svg);
    self.svg = svg;
    svg.attr('width', pathway.boardWidth);
    svg.attr('height', pathway.boardHeight);

    // I don't know why this gives an error when it tries to find symbolsAvailable

    var symbolsAvailable = self.symbolsAvailable = svg.selectAll('symbol');

    var markersAvailable = markersAvailable = svg.selectAll('marker');

    pathvisio.groups.drawAll();

    pathvisio.edges.drawAll();

    pathvisio.labelableElements.drawAll();

    pathvisio.infoBox.draw();
  };

  return {
    init:init
  }
}();
