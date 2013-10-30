pathvisio.pathway.biopax = function(){

  function toRenderableJson() {
    try {

    }
    catch (e) {
      console.log("Error converting biopax to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();
