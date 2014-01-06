"use strict";
pathvisiojs.view.pathwayDiagram.svg.node.EntityNode = function(){
  //function render(viewport, data) {
  function render(args) {
    if (!args.target) {
      throw new Error('Target element not specified for this EntityNode.');
    }
    if (!args.data) {
      throw new Error('EntityNode data missing.');
    }
    if (!args.pathway) {
      throw new Error('Pathway not specified for this EntityNode. Pathway is needed for items like setting the Organism for DataNode annotations.');
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
            pathvisiojs.view.annotation.xRef.render(args.pathway.organism, d['DatasourceReference'].ID, d['DatasourceReference'].Database, d.text.tspan.join(' '), d.dataNodeType);
          })
        }
      }
    });
  }
 
  return {
    render:render
  };
}();
