// requires the library
var macros = require('jsonld_macros');

macros.registerAPI({

  // URI template for a remote service (Github Users' API)
  "https://api.github.com/users/*": 

  {"$": // selects the root node / list of root nodes of the JSON document

    { // a JSON-LD context that will be added to all the slected nodes
      "@context": {"data":"http://socialrdf.org/github/datafeed"}, 
      // removes the meta property and associated value from the selected nodes
      "@remove":"meta"}, 

    "$.data": // selects the root node/data objects

     {// by default, all properties in the selected nodes will have the 'gh' prefix
      "@ns": {"ns:default": "gh"}, 
      // a JSON-LD context declaration that will be added to all the selecte nodes
      "@context": {"gh":"http://socialrdf.org/github/"}, 
      // a JSON-LD type declaration that will be added to all the selecte nodes
      "@type": "http://socialrdf.org/github/User"}}
});

// We retrieve the data using whatever transport layer is
// available: AJAX, TCP sockets...
var resourceURI = "https://api.github.com/users/1";
retrieveRemoteData(resourceURI, function(data){

   // we can apply the transformation to the retrieved data
   // passing the URI used to retrieve the data
   // as a selector for the transformation
   var jsonld = macros.resolve(resourceURI, data);
  var textContent = JSON.stringify(jsonld, null, 2);
  editor.setValue(textContent);
});