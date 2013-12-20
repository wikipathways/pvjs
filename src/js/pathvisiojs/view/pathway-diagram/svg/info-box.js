pathvisiojs.view.pathwayDiagram.svg.infoBox = function(){
    
  function render(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing input parameters.');
    }

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathway.hasOwnProperty('Name')) {
      infoBox.push({'key':'Title', 'value':pathway.Name});
    }

    if (pathway.hasOwnProperty('License')) {
      infoBox.push({'key':'Availability', 'value':pathway.License});
    }

    if (pathway.hasOwnProperty('LastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathway.LastModified});
    }

    if (pathway.hasOwnProperty('Organism')) {
      infoBox.push({'key':'Organism', 'value':pathway.Organism});
    }

    var infoBoxElements = viewport.selectAll("text.info-box")
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
    render:render
  };
}();
