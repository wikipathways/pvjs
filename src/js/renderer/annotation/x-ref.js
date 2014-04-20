var Annotation = require('./annotation.js')
  , Bridgedb = require('./../../format-converter/bridgedb/bridgedb.js')
  ;

module.exports = function(){
  'use strict';
  var cachedAnnotationData = {};

  function render(pvjs, organism, id, datasource, label, desc) {
    var data = getCachedAnnotationData(organism, label, id, datasource);
    if (!!data){
      //if cache, then use it
      Annotation.render(pvjs, data);
    }
    else {
      //else render immediate data and loading gif
      // TODO bumbu hardcoded
      var diagramLoadingIconUri = 'http://www.wikipathways.org/wpi/extensions/PathwayViewer/img/loading.gif'
      data = {
        "header": label,
        "description": desc,
        "listItems":[diagramLoadingIconUri]
      };
      Annotation.render(pvjs, data);

      //console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      //then retrieve the bridgedb data
      var xRefData = Bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
        setCachedAnnotationData(organism, label, id, datasource, annotationData);
        Annotation.render(pvjs, annotationData);
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
