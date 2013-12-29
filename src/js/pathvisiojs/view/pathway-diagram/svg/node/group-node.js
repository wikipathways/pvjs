pathvisiojs.view.pathwayDiagram.svg.node.groupNode = function(){
  function render(args, callback) {
    console.log('args');
    console.log(args);
    if (!args.target) {
      throw new Error('Error: Missing viewport.');
    }
    if (!args.data) {
      throw new Error('Error: group data missing.');
    }
    if (!args.allSymbolNames) {
      throw new Error('Error: allSymbolNames missing.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(groupContainer) {
      groupContainer.attr("class", function (d) {
        var cssClass = 'group-node ' + strcase.paramCase(d.groupType) + ' ';
        return cssClass;
      })

      var groupContents = args.data.contains;
      callback(groupContainer, groupContents);
    });
  }
 
  return {
    render:render
  };
}();
