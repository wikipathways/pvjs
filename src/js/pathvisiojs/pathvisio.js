pathvisiojs = function(){

  var svg, pathway, args;

  function getUrisForWikiPathwaysId(wikiPathwaysId, revision) {
    var results = {};
    var re = /wikipathways\.org/; 
    var isOnWikiPathwaysDomain = re.test(document.location.origin);
    var PathwayViewer_viewers = PathwayViewer_viewers || [];

    if (pathvisiojs.utilities.isWikiPathwaysId(wikiPathwaysId)) {
      if (PathwayViewer_viewers.length > 0 && isOnWikiPathwaysDomain) {
        results.uri = PathwayViewer_viewers[0].gpml.gpmlUrl;
      }
      else {
        console.warn('WikiPathways does not yet support CORS, so until we get CORS support, we are using Pointer as a proxy to enable CORS for getting GPML from http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:' + wikiPathwaysId + '&rev=' + revision);
        results.uri = 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=' + wikiPathwaysId + '&rev=' + revision;
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

  function parseInputData(inputData) {
    // TODO get urls elsewhere:
    // gpml in pathvisiojs.data.gpml...
    // png in pathvisio.view.pathwayDiagram.png...
    var parsedInputData = {};

    // inputData can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.

    if (pathvisiojs.utilities.getObjectType(inputData) === 'Object') {
      inputData.revision = inputData.revision || 0;
      parsedInputData = getUrisForWikiPathwaysId(inputData.wikiPathwaysId, 0);
      parsedInputData.wikiPathwaysId = inputData.wikiPathwaysId;
      parsedInputData.revision = inputData.revision;
    }
    else {
      if (pathvisiojs.utilities.isUrl(inputData)) {
        parsedInputData.uri = inputData;
        if (parsedInputData.uri.indexOf('.gpml') > -1) {
          parsedInputData.type = 'GPML';
          parsedInputData.pathwayIri = inputData + '#';
          return parsedInputData;
        }
        else {
          throw new Error('Pathvisiojs cannot handle the data source type entered.');
        }
      }
      else {
        parsedInputData = getUrisForWikiPathwaysId(inputData, 0);
        parsedInputData.wikiPathwaysId = inputData;
        parsedInputData.revision = 0;
      }
    }
    return parsedInputData;
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

    if (!args.target) {
      throw new Error('No target selector specified as target for pathvisiojs.');
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
