pathvisiojs.formatConverter.gpml.biopaxRef = function(){
  'use strict';

  function getAllAsPvjson(gpmlElement, callback) {
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
    getAllAsPvjson:getAllAsPvjson
  };
}();
