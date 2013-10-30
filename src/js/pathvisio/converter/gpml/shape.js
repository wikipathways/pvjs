pathvisio.pathway.shape = function(){

  function toRenderableJson() {
    try {

    }
    catch (e) {
      console.log("Error converting shape to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();


