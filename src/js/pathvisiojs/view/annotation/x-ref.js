pathvisiojs.view.annotation.xRef = function(){
  function render(organism, node) {
    var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, node, function(annotationData) {
      pathvisiojs.view.annotation.render(annotationData);
    });
  }

  return {
    render:render
  };
}();
