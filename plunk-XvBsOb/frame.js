var frame = {
  "http://vocabularies.wikipathways.org/gpml#DataNode": {}
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
