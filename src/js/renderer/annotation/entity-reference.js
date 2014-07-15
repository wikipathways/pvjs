var Annotation = require('./annotation.js')
  , Bridgedb = require('bridgedbjs')
  ;

module.exports = function(){
  'use strict';

  function render(pvjs, args) {
    // TODO bumbu hardcoded
    var diagramLoadingIconUri = 'http://www.wikipathways.org/wpi/extensions/PathwayViewer/img/loading.gif'
    var preloadedData = {
      "header": args.label,
      "description": args.description,
      "listItems":[diagramLoadingIconUri]
    };
    Annotation.render(pvjs, preloadedData);

    //then retrieve the bridgedb data
    var xRefData = Bridgedb.getXrefsNestedForDisplay(args, function(err, bridgedbData) {
      Annotation.render(pvjs, bridgedbData);
    });
  }

  return {
    render:render
  };
}();
