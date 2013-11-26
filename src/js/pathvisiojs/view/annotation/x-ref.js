pathvisiojs.view.annotation.xRef = function(){
  function render(organism, id, datasource, label, desc) {
    var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
      pathvisiojs.view.annotation.render(annotationData);
    });
  }

  return {
    render:render
  };
}();
