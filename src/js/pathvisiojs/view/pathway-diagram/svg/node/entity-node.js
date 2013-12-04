pathvisiojs.view.pathwayDiagram.svg.node.entityNode = function(){
  //function render(viewport, data, allSymbolNames) {
  function render(args) {
    console.log('args in entityNode.render');
    console.log(args);
    if (!args.target) {
      throw new Error('Error: Missing viewport.');
    }
    if (!args.data) {
      throw new Error('Error: entityNode data missing.');
    }
    if (!args.allSymbolNames) {
      throw new Error('Error: allSymbolNames missing.');
    }
    if (!args.organism && (args.data.nodeType === 'DataNode')) {
      throw new Error('Error: organism missing.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        return 'entity-node ' + strcase.paramCase(d.ShapeType);
      })
    });
  }
 
  return {
    render:render
  };
}();
