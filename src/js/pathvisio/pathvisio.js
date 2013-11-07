pathvisio = function(){

  var svg, pathway, args;

  function getUriFromWikiPathwaysId(wikiPathwaysId, revision) {

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return 'http://pointer.ucsf.edu/d3/r/gpml.php?id=' + wikiPathwaysId + '&rev=' + revision;
  }

  function getInputDataDetails(inputData) {

    // inputData can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.

    var results = {};
    if (!inputData.revision) {
      inputData.revision = 0;
    }

    if (pathvisio.helpers.getObjectType(inputData) === 'Object') {
      results = inputData;
      if (pathvisio.helpers.isWikiPathwaysId(inputData.wikiPathwaysId)) {
        results.uri = getUriFromWikiPathwaysId(inputData.wikiPathwaysId, inputData.revision);
        results.type = 'GPML';
      }
    }
    else {
      if (pathvisio.helpers.isUrl(inputData)) {
        results.uri = inputData;
        if (results.uri.indexOf('.gpml') > -1) {
          results.type = 'GPML';
        }
      }
      else {
        if (pathvisio.helpers.isWikiPathwaysId(inputData)) {
          results.uri = getUriFromWikiPathwaysId(inputData);
          results.type = 'GPML';
        }
        else {
          return new Error('Pathvisio.js cannot handle the data source type entered: ' + data);
        }
      }
    }

    return results;
  }

  function getJson(inputData, callback) {

    // inputData is a uri to a GPML or other pathway data file.
    // This function converts data specified by inputData to formatted JSON
    // and return the JSON to the function that called getJson()

    var inputDataDetails = getInputDataDetails(inputData);

    // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
    // GPML or has no type specified, into JSON.
    // TODO Later, this functionality can be extended to include other data types and
    // to test for data type when it is not specified.

    if (!!inputDataDetails.uri && (!inputDataDetails.type || inputDataDetails.type === 'GPML')) {

      // TODO d3.xml doesn't seem to work with IE8

      d3.xml(inputDataDetails.uri, function(gpml) {
        pathvisio.converter.gpml.toRenderableJson(gpml, function(json) {
          callback(json);
        });
      });
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

    if (!args.target) { return console.warn('Error: No target selector specified as target for pathvisio.js.'); }
    if (!args.data) { return console.warn('Error: No input data source (URL or WikiPathways ID) specified.'); }

    async.parallel({
      preload: function(callback) {
        pathvisio.renderer.preload(args, function(loadArgs) {
          callback(null, loadArgs);
        })
      },
      pathway: function(callback){
        getJson(args.data, function(json) {
          console.log('json');
          console.log(json);
          callback(null, json);
        })
      }
    },
    function(err, results){
      self.results = results;
      var rendererLoadArgs = results.preload;
      rendererLoadArgs.pathway = results.pathway;

      console.log('rendererLoadArgs');
      console.log(rendererLoadArgs);

      pathvisio.renderer.load(rendererLoadArgs, function() {
        // do something here
      })


///*

      ///* Node Highlighter

      var nodeLabels = [];
      var dataNodes = results.pathway.elements.filter(function(element) {return element.nodeType === 'data-node';});
      dataNodes.forEach(function(node) {
        if (!!node.textLabel) {
          nodeLabels.push(node.textLabel.text);
        }
      });


      // see http://twitter.github.io/typeahead.js/

      $('#highlight-by-label-input').typeahead({
        name: 'Highlight node in pathway',
        local: nodeLabels,
        limit: 10
      });
//*/

      /*
      $('.icon-eye-open').click(function(){
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.renderer.svg.node.highlightByLabel(svg, nodeLabel);
        }
      });
//*/
/*
      // see http://api.jquery.com/bind/
      // TODO get selected value better and make function to handle

      $( "#highlight-by-label-input" ).bind( "typeahead:selected", function() {
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.renderer.svg.node.highlightByLabel(svg, nodeLabel);
        }
      });
    */

    });
  }

  return {
    load:load,
    getJson:getJson
  };
}();
