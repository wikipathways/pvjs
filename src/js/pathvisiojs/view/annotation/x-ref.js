pathvisiojs.view.annotation.xRef = function(){
  function render(organism, node) {
    //call once to display panel with node name
    var annotationData = {
          "header": node.textLabel.text
    }
    pathvisiojs.view.annotation.render(annotationData);
    
    //call a second time to display panel with bridgedb data
    var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, node, function(annotationData) {
      pathvisiojs.view.annotation.render(annotationData);
    });
  }

  return {
    render:render
  };
}();
