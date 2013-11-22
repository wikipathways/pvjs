pathvisiojs.view.annotation.xRef = function(){
  function render(organism, node) {
    //call once to display panel with node name
    var dummyData = {
          "header": node.textLabel.text,
          "description": 'testing'
    };
    pathvisiojs.view.annotation.render(dummyData);
    
    //call a second time to display panel with bridgedb data
//    var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, node, function(annotationData) {
//      pathvisiojs.view.annotation.render(annotationData);
//    });
  }

  return {
    render:render
  };
}();
