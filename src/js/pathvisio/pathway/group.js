pathvisio.pathway.group = function(){ 
  function drawAll() {
    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('groups')) {

      // only consider non-empty groups

      var validGroups = pathvisio.data.pathways[pathvisio.data.current.svgSelector].groups.filter(function(el) {
        var groupId = el.groupId
        return (pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements.filter(function(el) {return (el.groupRef === groupId)}).length>0)
      });
      var groupsContainer = pathvisio.data.current.svg.selectAll("use.group")	
      .data(validGroups)
      .enter()
      .append("path")
      .attr("id", function (d) { return 'group-' + d.graphId })
      .attr("class", function(d) { return 'group group-' +  d.style; })

      // We tried using symbols for the group shapes, but this wasn't possible because the symbols scaled uniformly, and the beveled corners of the complex group
      // are supposed to remain constant in size, regardless of changes in group size.

      .attr("d", function(d) {
        var groupDimensions = getDimensions(d.groupId);
        if (d.style === 'none' || d.style === 'group' || d.style === 'pathway') {
          var pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
        }
        else {
          if (d.style === 'complex') {
            var pathData = 'M ' + (groupDimensions.x + 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + 20) + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x + 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + 20) + ' Z';
          }
          else {
            var pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
          };
        };
        return pathData;
      });
      //.call(drag);
    };
  };

  function getDimensions(groupId) {
    var groupMembers = pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements.filter(function(el) {return (el.groupRef === groupId)});
    console.log('groupMembers');
    console.log(groupMembers);
    var group = {};

    // I think this is margin, not padding, but I'm not sure

    var margin = 12;
    group.x = (d3.min(groupMembers, function(el) {return el.x})) - margin;
    group.y = (d3.min(groupMembers, function(el) {return el.y})) - margin;

    group.width = (d3.max(groupMembers, function(el) {return el.x + el.width})) - group.x + margin;
    group.height = (d3.max(groupMembers, function(el) {return el.y + el.height})) - group.y + margin;

    console.log('group');
    console.log(group);

    return group;
  };
 
  return { 
    drawAll:drawAll,
    getDimensions:getDimensions 
  } 
}();


