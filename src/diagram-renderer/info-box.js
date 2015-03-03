'use strict';

module.exports = {
  render: function(viewport, data) {
    if (!viewport || !data) {
      return console.warn('Error: Missing input parameters.');
    }

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBoxData = [];
    if (data.hasOwnProperty('displayName')) {
      infoBoxData.push({'key':'Title', 'value':data.displayName});
    }

    if (data.hasOwnProperty('License')) {
      infoBoxData.push({'key':'Availability', 'value':data.License});
    }

    if (data.hasOwnProperty('LastModified')) {
      infoBoxData.push({'key':'Last modified', 'value':data.LastModified});
    }

    if (data.hasOwnProperty('organism')) {
      infoBoxData.push({'key':'Organism', 'value':data.organism});
    }

    /*
    if (data.hasOwnProperty('PublicationXref')) {
      pvjs.renderer.publicationXref.getPublicationXrefString(data, data.PublicationXref, function(publicationXrefString) {
        infoBoxData.push({'key':'Citation(s)', 'value':publicationXrefString});
      })
    }
    //*/

    // TODO do we need to check for whether info box data exists?
    var infoBoxSelection = viewport.selectAll("g.info-box")
    .data([infoBoxData])
    .enter()
    .append("g")
    .attr("id", function (d,i) {return "info-box-" + i; })
    .attr("class", "text-area info-box");

    var infoBoxItems = infoBoxSelection.selectAll("text")
    .data(function(d) {return d;})
    .enter()
    .append("text")
    .attr("id", function (d,i) {return "info-box-text" + i; })
    .attr("class", "item")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    var infoBoxPropertyName = infoBoxItems.append("tspan")
    .attr("class", "info-box-item-property-name")
    .text(function (d) {return d.key + ': ';});

    var infoBoxProperty = infoBoxItems.append("tspan")
    .attr("class", "info-box-item-property-value")
    .text(function (d) {return d.value;});
  }
}
