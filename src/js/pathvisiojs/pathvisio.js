"use strict"

var pathvisiojs = function(){

  var svg, pathway, args;

  function parseInputData(inputData) {
    // inputData can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.
    var wikiPathwaysId; // this might be equal to the value of inputData, but it might not.
    var revision = inputData.revision || 0;
    var uri; // this might be equal to the value of inputData, but it might not.

    // object we will return
    var parsedInputData = {};

    if (pathvisiojs.utilities.getObjectType(inputData) === 'Object') {
      wikiPathwaysId = inputData.wikiPathwaysId;
      // TODO this is messy if we later want to use a data format that is not GPML
      parsedInputData = getGpmlUri(wikiPathwaysId, revision); //get uri
      parsedInputData.wikiPathwaysId = wikiPathwaysId;
      parsedInputData.revision = revision;
    }
    else {
      if (pathvisiojs.utilities.isUrl(inputData)) {
        uri = inputData;
        if (uri.indexOf('.gpml') > -1) {
          parsedInputData.type = 'GPML';
          parsedInputData.pathwayIri = inputData + '#';
          parsedInputData.uri = uri;
          return parsedInputData;
        }
        else {
          throw new Error('Pathvisiojs cannot handle the data source type entered.');
        }
      }
      else {
        wikiPathwaysId = inputData;
        // TODO this is messy if we later want to use a data format that is not GPML
        parsedInputData = getGpmlUri(inputData, revision); //get uri
        parsedInputData.wikiPathwaysId = wikiPathwaysId;
        parsedInputData.revision = revision;
      }
    }
    return parsedInputData;
  }

  // TODO getGpmlUri() and getJson() should move under pathvisiojs.data...
  // if the input is a WP ID, we can get the uri for GPML.
  function getGpmlUri(wikiPathwaysId, revision) {
    var results = {};

    // test whether the server serving this file is on a wikipathways.org domain (wikipathways.org, test3.wikipathways.org, etc.)
    var re = /wikipathways\.org/; 
    var isOnWikiPathwaysDomain = re.test(document.location.origin);

    // I don't know what this is doing. It might be a start at handling display of multiple pathways on a page.
    var PathwayViewer_viewers = PathwayViewer_viewers || [];

    if (pathvisiojs.utilities.isWikiPathwaysId(wikiPathwaysId)) { // if the input is a WP ID
      if (PathwayViewer_viewers.length > 0 && isOnWikiPathwaysDomain) { // if we are also on a *.wikipathways.org domain
        results.uri = PathwayViewer_viewers[0].gpml.gpmlUrl; // TODO we are not handling multiple pathways on one page here
      }
      else {
        results.uri = pathvisiojs.config.gpmlSourceUriStub() + wikiPathwaysId + '&rev=' + revision;
      }
      //results.cached = 'https://pathways.firebaseio.com/' + wikiPathwaysId + '.json';
      results.type = 'GPML';
      results.pathwayIri = 'wpId:' + wikiPathwaysId + '#';
    }
    else {
      throw new Error('Pathvisiojs cannot handle the data source type entered.');
    }

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return results;
  }

  function getJson(parsedInputData, callback) {

    // This function converts data specified by parsedInputData to formatted JSON
    // and return the JSON to the function that called getJson()


    // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
    // GPML or has no type specified, into JSON.
    // TODO Later, this functionality can be extended to include other data types and
    // to test for data type when it is not specified.

    if (!!parsedInputData.uri && (!parsedInputData.type || parsedInputData.type === 'GPML')) {

      // This is just an experiment with using mongodb for caching json,
      // but the higher priority for now would be to cache the SVG.
      // Caching the json would be part of having the API deliver results
      // in JSON format.
      /*
      d3.json(parsedInputData.cached, function(json) {
        callback(json);
      });
      //*/

      // TODO d3.xml doesn't seem to work with IE8

      //*
      d3.xml(parsedInputData.uri, function(gpml) {
        pathvisiojs.data.gpml.toRenderableJson(gpml, parsedInputData.pathwayIri, function(json) {
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

    // for now, load will just load a visual representation of a pathway, but
    // this could change in the future

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified as container for pathvisiojs.');
    }

    // args.data can be either of the following:
    // 1) a uri to a GPML file
    //    (in the future, we may add the ability to handle other file types.
    //    we could also consider handling json data objects so that pvjs
    //    could work with other JS libraries.)
    // 2) a WikiPathways pathway ID, like "WP1"
    if (!args.data) {
      throw new Error('No input data source (URL or WikiPathways ID) specified.');
    }

    var parsedInputData = parseInputData(args.data);
    console.log('parsedInputData');
    console.log(parsedInputData);
    args.data = parsedInputData;
    pathvisiojs.view.pathwayDiagram.load(args);
  }

  return {
    load:load,
    getJson:getJson
  };
}();
