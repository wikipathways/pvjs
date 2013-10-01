pathvisio.pathway.infoBox = function(){
    
  function draw(svg) {

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (svg.datum().hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':svg.datum().name});
    }

    if (svg.datum().hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':svg.datum().license});
    }

    if (svg.datum().hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':svg.datum().lastModified});
    }

    if (svg.datum().hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':svg.datum().organism});
    }

    var infoBoxElements = svg.select('#viewport').selectAll("text.info-box")
    .data(infoBox)
    .enter()
    .append("text")
    .attr("id", function (d,i) {return "info-box-" + i; })
    .attr("class", "info-box")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    infoBoxElements.append("tspan")
    .attr("class", "info-box-property-name")
    .text(function (d) {return d.key + ': ';});

    infoBoxElements.append("tspan")
    .text(function (d) {return d.value;});
  }

  return {
    draw:draw
  };
}();





