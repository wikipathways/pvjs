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
      "$.DataNode[*]": {"@type": "gpml:DataNode"},
      "$.Interaction[*]": {"@type": "gpml:Interaction"},
      "$.Interaction[*]": {"@type": "gpml:Interaction"},
      "$.Interaction[*]": {"@type": "gpml:Interaction"},
      "$.Interaction[*]": {"@type": "gpml:Interaction"},
    }
  };


  originalData = self.originalData = input;
  //transformationData = JSON.parse(transformationData);
  macro = jsonld_macros;
  macro.clearAPIs();
  macro.registerAPI(transformationData);

  callback(macro.resolve("http://wikipathways.org/index.php/Pathway:"+"WP2545", originalData));
}

var x2js = new X2JS();
d3.xml('http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=WP2545', function(xmlDoc) {
  var xml = xmlDoc.documentElement;
  var pathway = self.pathway = x2js.xml2json(xml);

  var json = self.json = {};
  json["@graph"] = [];

  var pushedObj = {};
  d3.map(pathway).forEach(function(key, value) {
    console.log('this');
    console.log(this);
    console.log('key');
    console.log(key);
    console.log('value');
    console.log(value);
    pushedObj = {};
    pushedObj[key] = value;
    json["@graph"].push(pushedObj);
  })

  json['@context'] = context;
  console.log('json');
  console.log(json);

  /*
    transform(pathway, function(transformed) {
    console.log('transformed');
    console.log(transformed);
    self.transformed = transformed;
    //*/





    /*
       var textContent = JSON.stringify(json, null, 2);
       editor.setValue(textContent);
    //*/

    var result = jsonld.compact(json, context, function(err, processedJson) {
      //var result = jsonld.flatten(json, function(err, processedJson) {
      console.log('processedJson');
      console.log(processedJson);
      self.processedJson = processedJson;

      /*
      var textContent = JSON.stringify(processedJson, null, 2);
      editor.setValue(textContent);
      //*/

      jsonld.frame(processedJson, frame, function(err, framed) {
        console.log('framed');
        console.log(framed);

        //*
           var textContent = JSON.stringify(framed, null, 2);
           editor.setValue(textContent);
        //*/

      });
    });

  //});
});

