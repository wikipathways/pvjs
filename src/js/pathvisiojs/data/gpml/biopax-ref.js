pathvisiojs.data.gpml.biopaxRef = function(){

  function getAllAsRenderableJson(gpmlElement, callback) {
    try {
      var tagName = gpmlElement[0][0].tagName;
      var biopaxRefs = gpmlElement.selectAll(tagName + ' > BiopaxRef');
      if (biopaxRefs[0].length > 0) {
        publicationXrefs = [];
        biopaxRefs.each(function() {
          jsonPublicationXref = d3.select(this)[0][0].textContent;
          publicationXrefs.push(jsonPublicationXref);
        })
        callback(publicationXrefs);
      }
      else {
        callback(null);
      }
    }
    catch (e) {
      throw new Error("Error converting biopaxRef to json: " + e.message);
    }
  }

  return {
    getAllAsRenderableJson:getAllAsRenderableJson
  };
}();
