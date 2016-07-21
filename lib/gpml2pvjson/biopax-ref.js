'use strict';

module.exports = {
  getAllAsPvjson: function(gpmlElement, callback) {
    var publicationXrefs, jsonPublicationXref, tagName = gpmlElement.name;

    var biopaxRefs = gpmlElement.find(tagName + ' > BiopaxRef');
    if (biopaxRefs.length > 0) {
      publicationXrefs = [];
      biopaxRefs.each(function() {
        jsonPublicationXref = $(this).text();
        publicationXrefs.push(jsonPublicationXref);
      });
      callback(publicationXrefs);
    }
    else {
      callback(null);
    }
  }
};
