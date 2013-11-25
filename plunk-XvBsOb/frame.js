var frame = {
  "@context": {
    "gpml": "http://vocabularies.wikipathways.org/gpml/",
    "wp": "http://vocabularies.wikipathways.org/wp/",
    "dc": "http://purl.org/dc/elements/1.1/",
    "ex": "http://example.org/vocab#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "ex:contains": {
      "@type": "@id"
    }
  },
  "@embed": false,
  "gpml:Name": {}
};

/*
"DataNode": {}
and
"@id":"gpml:DataNode"
Both return a graph with
an array containing a first object
having these sub-objects:
@id:"",
"gpml:DataNode":{"@list":[]},
"gpml:Name": "

plus an object representing every DataNode


"gpml:Name": {}
The above returns a graph with
an array containing one object.
The object has these sub-objects:
@id:"",
"gpml:DataNode":{"@list":[]},
"gpml:Name": "

"gpml:DataNode": {}
Returns nothing

//*/
