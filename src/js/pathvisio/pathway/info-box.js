pathvisio.pathway.infoBox = function(){ 
    
  function draw() {

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].name});
    };

    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].license});
    };

    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].lastModified});
    };

    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].organism});
    };

    var infoBoxElements = pathvisio.data.current.svg.selectAll("text.info-box")
    .data(infoBox)
    .enter()
    .append("text")
    .attr("id", function (d,i) { return "info-box-" + i; })
    .attr("class", "info-box")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    infoBoxElements.append("tspan")
    .attr("class", "info-box-property-name")
    .text(function (d) { return d.key + ': ' });

    infoBoxElements.append("tspan")
    .text(function (d) { return d.value });
  }; 

  return { 
    draw:draw 
  } 
}();





