pathvisiojs.view.pathwayDiagram.svg.node.groupNode = function(){
  'use strict';
  function render(args, callback) {
    if (!args.container) {
      throw new Error('Error: container element not specified for rendering groupNode.');
    }
    if (!args.data) {
      throw new Error('Error: group data missing for rendering groupNode.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(groupContainer) {
      groupContainer.attr("class", function (d) {
        var cssClass = 'node group-node ' + strcase.paramCase(d.groupType) + ' ';
        return cssClass;
      })

      var groupContents = args.data.contains;
      console.log('groupContainer');
      console.log(groupContainer);
      callback(groupContainer, groupContents);
    });
  }
 
  return {
    render:render
  };
}();
