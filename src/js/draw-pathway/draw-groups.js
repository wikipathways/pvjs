function drawGroups() {
  // Draw Groups 

  if (pathway.hasOwnProperty('groups')) {

    var groupsContainer = svg.selectAll("use.group")	
    .data(pathway.groups)
    .enter()
    .append("use")
    .attr("id", function (d) { return 'group-' + d.graphId })
    .attr('transform', function(d) { 

      // TODO refactor the code below to call function getGroupDimensions() one time instead of three times

      var groupDimensions = getGroupDimensions(d.groupId);
      return 'translate(' + groupDimensions.x + ' ' + groupDimensions.y + ')'; 
    })
    .attr("width", function (d) {
      var groupDimensions = getGroupDimensions(d.groupId);
      return groupDimensions.width; 
    })
    .attr("height", function (d) { 
      var groupDimensions = getGroupDimensions(d.groupId);
      return groupDimensions.height; 
    })
    .attr("class", function(d) { return 'group group-' +  d.style; })
    .attr("xlink:xlink:href", function(d) { return '#group-' +  d.style; });
    //.call(drag);
  };

};
