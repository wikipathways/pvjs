pathvisiojs.pathway.comment = function(){
  'use strict';

  function toRenderableJson() {
    try {

    }
    catch (e) {
      console.log("Error converting biopaxRefs to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();

