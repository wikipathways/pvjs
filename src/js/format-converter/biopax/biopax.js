pathvisiojs.formatConverter.biopax = function(){
  'use strict';

  // TODO get ontology terms and other data

  function toPvjson(xmlBiopax, callback) {
    try {
      d3.ns.prefix.bp = 'http://www.biopax.org/owldoc/Level3/';
      d3.ns.prefix.rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
      d3.ns.qualify('bp:PublicationXref');
      var xmlBiopaxPubs = xmlBiopax.selectAll('PublicationXref');
      var jsonBiopax = {};
      jsonBiopax.PublicationXref = [];
      var publicationXref;
      xmlBiopaxPubs.each(function() {
        publicationXref = {};
        publicationXref.rdfId = d3.select(this).attr('rdf:id').toString();
        jsonBiopax.PublicationXref.push(publicationXref);
      });
      callback(jsonBiopax);
    }
    catch (e) {
      throw new Error("Error converting biopax to json: " + e.message);
    }
  }

  return {
    toPvjson:toPvjson
  };
}();

