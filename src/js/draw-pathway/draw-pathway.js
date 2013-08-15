function splitTextByLines(text) {

  // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.

  return text.split(/\r\n|\r|\n/g);
};

function drawPathway() {
  // be sure server has set gpml mime type to application/gpml+xml
  //d3.xml("../../samples/gpml/" + String(getURLParameter("pathway")), "application/gpml+xml", function(response) {
  //d3.xml("../../samples/gpml/" + getURLParameter("pathway"), "application/gpml+xml", function(error, response) {
  //d3.json("../../samples/gpml/WP673_63184.json", function(error, json) {

  var gpml = document.getElementsByTagName('pathway')[0];
  console.log('gpml1');
  console.log(gpml);

  /*
  var parser = new DOMParser();
  var gpmlDoc = parser.parseFromString(gpmlStr, "application/xml");
  self.gpmlDoc = gpmlDoc;
  var gpml = gpmlDoc.documentElement;
*/

  var pathway = convertGpml2Json(gpml);
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
  /*
  svg.setAttribute('width', pathway.boardWidth);
  svg.setAttribute('height', pathway.boardHeight);
  */

  // I don't know why this gives an error when it tries to find symbolsAvailable

  var symbolsAvailable = self.symbolsAvailable = svg.selectAll('symbol');

  var markersAvailable = markersAvailable = svg.selectAll('marker');

  drawEdges();
  drawInfoBox();
  drawGroups();
  drawLabelableElements();

};
