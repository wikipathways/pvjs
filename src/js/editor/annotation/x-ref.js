pathvisiojs.renderer.annotation.xRef = function(){
  'use strict';
  var cachedAnnotationData = {};

  function render(organism, id, datasource, label, desc) {
    var data = getCachedAnnotationData(organism, label, id, datasource);
    if (data){
      //if cache, then use it
      pathvisiojs.renderer.annotation.render(data);
    }
    else {
      //else render immediate data and loading gif
      var data = {
        "header": label,
        "description": desc,
        "listItems":[pathvisiojs.config.diagramLoadingIconUri] 
      };
      pathvisiojs.renderer.annotation.render(data);

      //console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      //then retrieve the bridgedb data
      var xRefData = pathvisiojs.formatConverter.bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
        setCachedAnnotationData(organism, label, id, datasource, annotationData);
        pathvisiojs.renderer.annotation.render(annotationData);
      });
    }
  }

  function getCachedAnnotationData(organism, label, id, datasource){
    return cachedAnnotationData[organism+label+id+datasource];
  }

  function setCachedAnnotationData(organism, label, id, datasource, data){
    cachedAnnotationData[organism+label+id+datasource] = data;
  }

  return {
    render:render
  };
}();
