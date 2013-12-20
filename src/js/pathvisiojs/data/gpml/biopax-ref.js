pathvisiojs.pathway.biopaxRef = function(){

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
