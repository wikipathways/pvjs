pathvisiojs.view.annotation.xRef = function(){
  var cachedAnnotationData = {};

  function render(organism, id, datasource, label, desc) {
    var data = getCachedAnnotationData(organism, id, datasource);
    if (data){
      //if cache, then use it
      pathvisiojs.view.annotation.render(data);
    }
    else {
      //else render immediate data and loading gif
      var data = {
          "header": label,
          "description": desc,
	  "listItems":[pathvisiojs.config.loadingGif()] 
        };
      pathvisiojs.view.annotation.render(data);
      //then retrieve the bridgedb data
      var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
        setCachedAnnotationData(organism, id, datasource, annotationData);
	pathvisiojs.view.annotation.render(annotationData);
      });
    }
  }

  function getCachedAnnotationData(organism, id, datasource){
    return cachedAnnotationData[organism+id+datasource];
  }

  function setCachedAnnotationData(organism, id, datasource, data){
    cachedAnnotationData[organism+id+datasource] = data;
  }

  return {
    render:render
  };
}();
