"use strict";
pathvisiojs.view.pathwayDiagram.svg.node.EntityNode = function(){
  //function render(viewport, data, allSymbolNames) {
  function render(args) {
    if (!args.target) {
      throw new Error('Error: Missing viewport.');
    }
    if (!args.data) {
      throw new Error('Error: EntityNode data missing.');
    }
    if (!args.allSymbolNames) {
      throw new Error('Error: allSymbolNames missing.');
    }
    if (!args.organism && (args.data.nodeType === 'DataNode')) {
      throw new Error('Error: organism missing.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        var cssClass = 'entity-node ' + strcase.paramCase(d.nodeType) + ' ';
        if (d.nodeType === 'DataNode') {
          cssClass += strcase.paramCase(d.dataNodeType) + ' ';
          if (!!d.DatasourceReference) {
            cssClass += 'has-xref ';
          }
        }
        if (d.hasOwnProperty('CellularComponent')) {
          cssClass += strcase.paramCase(d.CellularComponent) + ' ';
        }
        return cssClass;
      })
      if (!!args.data.DatasourceReference) {
        if (!!args.data.DatasourceReference.ID) {
          nodeContainer.on("click", function(d,i) {
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
