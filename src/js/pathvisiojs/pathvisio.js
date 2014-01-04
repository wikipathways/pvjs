pathvisiojs = function(){

  var svg, pathway, args;

  function getUrisForWikiPathwaysId(wikiPathwaysId, revision) {
    var results = {};
    if (pathvisiojs.utilities.isWikiPathwaysId(wikiPathwaysId)) {
      results.uri = 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=' + wikiPathwaysId + '&rev=' + revision;
      results.cached = 'https://pathways.firebaseio.com/' + wikiPathwaysId + '.json';
      results.type = 'GPML';
      results.pathwayIri = 'wpId:' + wikiPathwaysId + '#';
    }
    else {
      throw new Error('Pathvisiojs cannot handle the data source type entered.');
    }

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return results;
  }

  function getInputDataDetails(inputData) {
    var results = {};

    // inputData can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.

    if (pathvisiojs.utilities.getObjectType(inputData) === 'Object') {
      inputData.revision = inputData.revision || 0;
      results = getUrisForWikiPathwaysId(inputData.wikiPathwaysId, 0);
    }
    else {
      if (pathvisiojs.utilities.isUrl(inputData)) {
        results.uri = inputData;
        if (results.uri.indexOf('.gpml') > -1) {
          results.type = 'GPML';
          results.pathwayIri = inputData + '#';
          return results;
        }
        else {
          throw new Error('Pathvisiojs cannot handle the data source type entered.');
        }
      }
      else {
        results = getUrisForWikiPathwaysId(inputData, 0);
      }
    }
    return results;
  }

  function getJson(inputData, callback) {

    // inputData can be either of the following:
    // 1) a uri to a GPML or other pathway data file
    // 2) a WikiPathways pathway ID, like "WP1"
    // This function converts data specified by inputData to formatted JSON
    // and return the JSON to the function that called getJson()

    var inputDataDetails = getInputDataDetails(inputData);
    console.log('inputDataDetails');
    console.log(inputDataDetails);

    // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
    // GPML or has no type specified, into JSON.
    // TODO Later, this functionality can be extended to include other data types and
    // to test for data type when it is not specified.

    if (!!inputDataDetails.uri && (!inputDataDetails.type || inputDataDetails.type === 'GPML')) {

      //*
      d3.json(inputDataDetails.cached, function(json) {
        callback(json);
      });
      //*/

      // TODO d3.xml doesn't seem to work with IE8

      /*
      d3.xml(inputDataDetails.uri, function(gpml) {
        pathvisiojs.data.gpml.toRenderableJson(gpml, inputDataDetails.pathwayIri, function(json) {
          callback(json);
        });
      });
      //*/
    }
    else {
      return new Error('No data source specified or pathvisio.js cannot handle the data source specified.');

    }
  }

  function load(args) {

    // this function gets JSON and draws SVG representation of pathway

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.target) { return console.warn('Error: No target selector specified as target for pathvisiojs.'); }
    if (!args.data) { return console.warn('Error: No input data source (URL or WikiPathways ID) specified.'); }

    async.parallel({
      preload: function(callback) {
        pathvisiojs.view.pathwayDiagram.preload(args, function(loadArgs) {
          callback(null, loadArgs);
        })
      },
      pathway: function(callback){
        getJson(args.data, function(json) {
          pathvisiojs.context = json['@context'];
          console.log('json');
          console.log(json);
          callback(null, json);
        })
      }
    },
    function(err, results){
      console.log('pvjs results');
      console.log(results);
      var viewLoadArgs = results.preload;
      viewLoadArgs.pathway = results.pathway;

      //console.log(allSymbolNames);
      pathvisiojs.view.pathwayDiagram.load(viewLoadArgs, function() {
        // do something here
      })


///*

      ///* Node Highlighter

      var nodeLabels = [];
      if (results.pathway.hasOwnProperty('DataNode')) {
        results.pathway.DataNode.forEach(function(node) {
          if (!!node.text) {
            nodeLabels.push(node.text.tspan[0]);
          }
        });

        // see http://twitter.github.io/typeahead.js/

        $('#highlight-by-label-input').typeahead({
          name: 'Highlight node in pathway',
          local: nodeLabels,
          limit: 10
        });
      }


//*/

      /*
      $('.icon-eye-open').click(function(){
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(svg, nodeLabel);
        }
      });
//*/
      // see http://api.jquery.com/bind/
      // TODO get selected value better and make function to handle

      $( "#highlight-by-label-input" ).bind( "typeahead:selected", function() {
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          throw new Error("No data node value entered for type-ahead node highlighter.");
        }
        else {

          // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
          // a highlighter for svg, png, etc. as appropriate.

          pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(results.preload.svg, results.pathway, nodeLabel);
        }
      });

    });
  }

  return {
    load:load,
    getJson:getJson
  };
}();
