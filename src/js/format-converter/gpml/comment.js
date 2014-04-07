pathvisiojs.pathway.comment = function(){
  'use strict';

  function toPvjson() {
    try {

    }
    catch (e) {
      console.log("Error converting biopaxRefs to json: " + e.message);
      return e;
    }
  }


  return {
    toPvjson:toPvjson
  };
}();

