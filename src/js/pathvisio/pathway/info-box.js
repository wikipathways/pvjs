pathway.infoBox = function(){ 
    
  function draw() {

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathway.data.hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':pathway.data.name});
    };

    if (pathway.data.hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':pathway.data.license});
    };

    if (pathway.data.hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathway.data.lastModified});
    };

    if (pathway.data.hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':pathway.data.organism});
    };

    var infoBoxElements = pathway.data.svg.selectAll("text.info-box")
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





