pathvisiojs.pathway.infoBox = function(){

  function toRenderableJson() {
    try {

    }
    catch (e) {
      console.log("Error converting infoBox to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();

