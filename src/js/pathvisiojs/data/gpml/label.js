pathvisiojs.pathway.label = function(){

  function toRenderableJson() {
    try {

    }
    catch (e) {
      console.log("Error converting label to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();


