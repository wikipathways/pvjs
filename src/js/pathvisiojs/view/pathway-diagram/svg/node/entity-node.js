"use strict";
pathvisiojs.view.pathwayDiagram.svg.node.EntityNode = function(){
  function render(args) {
    if (!args.container) {
      throw new Error('Container element not specified for this EntityNode.');
    }
    if (!args.data) {
      throw new Error('EntityNode data missing.');
    }
    if (!args.pathway) {
      throw new Error('Pathway not specified for this EntityNode. Pathway is needed for items like setting the Organism for DataNode annotations.');
    }
    console.log('data');
    console.log(args.data);

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        var cssClass = 'node entity-node ' + strcase.paramCase(d.nodeType) + ' ';
        if (d.nodeType === 'DataNode') {
          cssClass += strcase.paramCase(d.dataNodeType) + ' ';
          if (!!d.DatasourceReference) {
            cssClass += 'has-xref ';
          }
        }
        if (d.hasOwnProperty('CellularComponent')) {
          cssClass += 'cellular-component ' + strcase.paramCase(d.CellularComponent) + ' ';
        }
        return cssClass;
      })
      if (!!args.data.DatasourceReference) {
        console.log('args.data.DatasourceReference');
        console.log(args.data.DatasourceReference);
        if (!!args.data.DatasourceReference.ID) {
          nodeContainer.on("click", function(d,i) {
            console.log(d);
            pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, d['DatasourceReference'].ID, d['DatasourceReference'].Database, d.text.line.join(' '), d.dataNodeType); //that's capital 'O' Organism from GPML vocab
          })
        }
      }
    });
  }
 
  return {
    render:render
  };
}();
