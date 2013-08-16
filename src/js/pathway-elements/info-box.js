pathvisio.infoBox = function(){ 
    
  function draw() {

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathway.hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':pathway.name});
    };

    if (pathway.hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':pathway.license});
    };

    if (pathway.hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathway.lastModified});
    };

    if (pathway.hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':pathway.organism});
    };

    var infoBoxElements = svg.selectAll("text.info-box")
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





