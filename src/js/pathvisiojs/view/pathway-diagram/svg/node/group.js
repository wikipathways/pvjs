pathvisiojs.view.pathwayDiagram.svg.node.group = function(){
  //function render(viewport, data, allSymbolNames) {
  function render(args, callback) {
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
        var cssClass = 'group ' + strcase.paramCase(d.groupType) + ' ';
        return cssClass;
      })

      callback(groupContainer);
    });
  }
 
  return {
    render:render
  };
}();
