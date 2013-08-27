pathvisio.pathway.group = function(){ 
  function drawAll() {
    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('groups')) {

      // only consider non-empty groups

      var validGroups = pathvisio.data.pathways[pathvisio.data.current.svgSelector].groups.filter(function(el) {
        var groupId = el.groupId
        return (pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements.filter(function(el) {return (el.groupRef === groupId)}).length>0)
      });
console.log('validGroups');
console.log(validGroups);
console.log('hi');
console.log(pathvisio.data.current.svg);
console.log(pathvisio.data.current.svg.selectAll("use.group"));
console.log('bye');
      var groupsContainer = pathvisio.data.current.svg.selectAll("use.group")	
      .data(validGroups)
      .enter()
      .append("use")
      .attr("id", function (d) { return 'group-' + d.graphId })
      .attr('transform', function(d) { 

        // TODO refactor the code below to call function getDimensions() one time instead of three times

console.log('hmm');
        var groupDimensions = getDimensions(d.groupId);
        return 'translate(' + groupDimensions.x + ' ' + groupDimensions.y + ')'; 
      })
      .attr("width", function (d) {
        var groupDimensions = getDimensions(d.groupId);
        return groupDimensions.width; 
      })
      .attr("height", function (d) { 
        var groupDimensions = getDimensions(d.groupId);
        return groupDimensions.height; 
      })
      .attr("class", function(d) { return 'group group-' +  d.style; })
      .attr("xlink:xlink:href", function(d) { return '#group-' +  d.style; });
      //.call(drag);
    };
  };

  function getDimensions(groupId) {
    var groupMembers = pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements.filter(function(el) {return (el.groupRef === groupId)});
    var group = {};

    // I think this is margin, not padding, but I'm not sure

    var margin = 12;
    group.x = (d3.min(groupMembers, function(el) {return el.x})) - margin;
    group.y = (d3.min(groupMembers, function(el) {return el.y})) - margin;

    group.width = (d3.max(groupMembers, function(el) {return el.x + el.width})) - group.x + margin;
    group.height = (d3.max(groupMembers, function(el) {return el.y + el.height})) - group.y + margin;

    return group;
  };
 
  return { 
    drawAll:drawAll,
    getDimensions:getDimensions 
  } 
}();


