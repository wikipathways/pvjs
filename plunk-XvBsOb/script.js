// Code goes here

function transform(input, callback) {
  var transformationData = self.transformationData = {
    "http://wikipathways.org/index.php/Pathway:*": {
      "$": {
        "@context": {
          "gpml": "http://vocabularies.wikipathways.org/gpml#",
          "@vocab": "http://vocabularies.wikipathways.org/gpml#"
        },
        "@type": "gpml:Pathway"
      },
      "$.DataNode[*]": 
        {"@type": "gpml:DataNode"}
    }
  };


  originalData = self.originalData = input;
  //transformationData = JSON.parse(transformationData);
  macro = jsonld_macros;
  macro.clearAPIs();
  macro.registerAPI(transformationData);

  callback(macro.resolve("http://wikipathways.org/index.php/Pathway:"+"WP100", originalData));
}

var x2js = new X2JS();
d3.xml('http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=WP100', function(xmlDoc) {
  var xml = xmlDoc.documentElement;
  var pathway = x2js.xml2json(xml);

  var json = self.json = {};
  //json['@context'] = context;
  //json.Pathway = pathway;

  transform(pathway, function(transformed) {



    console.log('transformed');
    console.log(transformed);
    self.transformed = transformed;



    //*
       var textContent = JSON.stringify(transformed, null, 2);
       editor.setValue(textContent);
    //*/

    //var result = jsonld.compact(transformed, context, function(err, processedJson) {
      var result = jsonld.flatten(transformed, function(err, processedJson) {
      console.log('processedJson');
      console.log(processedJson);

      /*
      var textContent = JSON.stringify(processedJson, null, 2);
      editor.setValue(textContent);
      //*/

      jsonld.frame(processedJson, frame, function(err, framed) {
        console.log('framed');
        console.log(framed);

        /*
           var textContent = JSON.stringify(framed, null, 2);
           editor.setValue(textContent);
        //*/

      });
    });

  });
});

