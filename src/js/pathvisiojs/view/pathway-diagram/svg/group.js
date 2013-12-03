pathvisiojs.view.pathwayDiagram.svg.group = function(){
  function render(viewport, groupData, allSymbolNames) {
    console.log('groupData');
    console.log(groupData);
    if (!viewport) {
      throw new Error('Error: Missing viewport.');
    }
    if (!groupData) {
      throw new Error('Error: Group data missing.');
    }

    var groupContainer = viewport.selectAll('#node-container-' + strcase.paramCase(groupData['@id']))
    .data([groupData])
    .enter()
    .append("g")
    .attr("class", function (d) {
      return 'group ' + strcase.paramCase(d.ShapeType);
    })
    .call(pathvisiojs.view.pathwayDiagram.svg.nodeContainer.render)
    //.attr("class", function(d) { return 'group ' + d.shapeType;});

    var pathData = null;


    var groupShape = groupContainer.append("path")
    .data([groupData])
    .attr("class", function (d) {
      return 'group shape ' + strcase.paramCase(d.ShapeType);
    })
    .call(function() {
      pathvisiojs.view.pathwayDiagram.svg.node.render(this, allSymbolNames)
    })
    //.attr("id", function (d) { return 'shape-' + d.GroupId;})

    var args = {};
    args.target = groupContainer;
    args.data = groupData.contains;
    args.allSymbolNames = allSymbolNames;
    pathvisiojs.view.pathwayDiagram.svg.quickRenderMultipleElements(args, function() {
      console.log('back to draw entityNodes within group')
    });
    


    // We tried using symbols for the group shapes, but this wasn't possible because the symbols scaled uniformly, and the beveled corners of the complex group
    // are supposed to remain constant in size, regardless of changes in group size.

    /*
    .attr("d", function(d) {
      var groupDimensions = getDimensions(pathway, d.groupId);
      if (d.style === 'none' || d.style === 'Group' || d.style === 'Pathway') {
        pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
      }
      else {
        if (d.style === 'Complex') {
          pathData = 'M ' + (groupDimensions.x + 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + 20) + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x + 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + 20) + ' Z';
        }
        else {
          pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
        }
      }
      return pathData;
    });
    //.call(drag);
    //*/
  }


  function renderAll(svg, pathway) {
    if (!svg || !pathway) {
      return console.warn('Error: Missing input parameters.');
    }

    var groups = pathway.groups;
    if (!groups) { return console.warn('Error: No group data available.');}

    // only consider non-empty groups

    var validGroups = groups.filter(function(el) {
      var groupId = el.groupId;
      return (pathway.nodes.filter(function(el) {return (el.groupRef === groupId);}).length>0);
    });

    var pathData = null;
    var groupsContainer = svg.select('#viewport').selectAll("use.group")
    .data(validGroups)
    .enter()
    .append("path")
    .attr("id", function (d) { return 'group-' + d.graphId;})
    .attr("class", function(d) { return 'group group-' +  d.style;})

    // We tried using symbols for the group shapes, but this wasn't possible because the symbols scaled uniformly, and the beveled corners of the complex group
    // are supposed to remain constant in size, regardless of changes in group size.

    .attr("d", function(d) {
      var groupDimensions = getDimensions(pathway, d.groupId);
      if (d.style === 'none' || d.style === 'group' || d.style === 'pathway') {
        pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
      }
      else {
        if (d.style === 'complex') {
          pathData = 'M ' + (groupDimensions.x + 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + 20) + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x + 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + 20) + ' Z';
        }
        else {
          pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
        }
      }
      return pathData;
    });
    //.call(drag);
  }

  function getDimensions(pathway, groupId) {
    var groupMembers = pathway.nodes.filter(function(el) {return (el.groupRef === groupId);});
    var group = {};

    // I think this is margin, not padding, but I'm not sure

    var margin = 12;
    group.x = (d3.min(groupMembers, function(el) {return el.x;})) - margin;
    group.y = (d3.min(groupMembers, function(el) {return el.y;})) - margin;

    group.width = (d3.max(groupMembers, function(el) {return el.x + el.width;})) - group.x + margin;
    group.height = (d3.max(groupMembers, function(el) {return el.y + el.height;})) - group.y + margin;

    return group;
  }
 
  return {
    renderAll:renderAll,
    render:render,
    getDimensions:getDimensions
  };
}();
