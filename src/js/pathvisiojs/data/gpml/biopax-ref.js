"use strict";
pathvisiojs.data.gpml.biopaxRef = function(){

  function getAllAsRenderableJson(gpmlElement, callback) {
    var publicationXrefs, jsonPublicationXref, tagName = gpmlElement[0][0].tagName;
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

  return {
    getAllAsRenderableJson:getAllAsRenderableJson
  };
}();
