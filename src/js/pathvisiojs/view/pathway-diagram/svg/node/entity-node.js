pathvisiojs.view.pathwayDiagram.svg.node.entityNode = function(){
  //function render(viewport, data, allSymbolNames) {
  function render(args) {
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
        var styleClass = 'entity-node ' + strcase.paramCase(d.ShapeType) + ' ';
        if (d.nodeType === 'DataNode') {
          if (!!d.DatasourceReference) {
            styleClass += 'annotated-data-node ';
            styleClass += 'annotated-' + strcase.paramCase(d.dataNodeType) + ' ';
          }
          else {
            styleClass += 'data-node ' + strcase.paramCase(d.dataNodeType) + ' ';
          }
        }
        else {
          styleClass += strcase.paramCase(d.nodeType) + ' ';
        }
        return styleClass;
      })
      if (!!args.data.DatasourceReference) {
        if (!!args.data.DatasourceReference.ID) {
          console.log('can click');
          nodeContainer.on("click", function(d,i) {
            console.log('clicked a data node-container');
            console.log(d);
            pathvisiojs.view.annotation.xRef.render(args.organism, d['DatasourceReference'].ID, d['DatasourceReference'].Database, d.text.tspan.join(' '), d.dataNodeType);
          })
        }
      }
    });
  }
 
  return {
    render:render
  };
}();
