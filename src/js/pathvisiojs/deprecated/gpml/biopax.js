pathvisiojs.pathway.biopax = function(){

  function toRenderableJson(xmlBiopax, callback) {
    try {
      d3.ns.prefix.bp = 'http://www.biopax.org/owldoc/Level3/';
      d3.ns.prefix.rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
      d3.ns.qualify('bp:PublicationXref');      
      var xmlBiopaxPubs = xmlBiopax.selectAll('PublicationXref');
      var jsonBiopax = {};
      jsonBiopax.PublicationXref = [];
      xmlBiopaxPubs.each(function() {
        id = d3.select(this).attr('rdf:id');
        jsonBiopax.PublicationXref.push(id);
      });
      callback(jsonBiopax.PublicationXref);
    }
    catch (e) {
      throw new Error("Error converting biopax to json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
