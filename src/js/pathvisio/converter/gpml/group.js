pathvisio.pathway.group = function(){

  function toRenderableJson() {
    try {

    }
    catch (e) {
      console.log("Error converting group to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();

