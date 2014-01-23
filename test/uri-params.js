var uriParams = function() {
  var uriParamList = getUriParamList();

  /* *******************
  /* Get the desired GPML file URL or WikiPathways ID from the URL parameters.
  /* *******************/

  // If you want to the GPML file URL or WikiPathways ID you want to display, you can
  // hard code it as the data parameter in the pathvisiojs.load() function below

  function getUriParam(name) {

    // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-uri-parameters-with-javascript
    // This will be replaced once we get the backend php to get the GPML

    var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    if (!!parameter) {
      return parameter;
    }
    else {
      return null;
    }
  }

  function getUriParamList() {
    uriParamList = {
      'svg-disabled': false,
      'gpml': null,
      'gpmlRev': 0,
      'creator': 'pathvisiojs-dev',
      'account': '',
      'branch': ''
    };
    Object.keys(uriParamList).forEach(function(element) {
      if (!!getUriParam(element)) {
        uriParamList[element] = getUriParam(element);
      }
      window.setTimeout(function() {
        $('#' + element).val(uriParamList[element]);
      }, 50)
    });
    return uriParamList;
  }

  function updateParams(updatedParam) {
    var targetUri = currentUri + '?' + updatedParam.key + '=' + updatedParam.value;

    Object.keys(uriParamList).forEach(function(element) {
      if (element === updatedParam.key) {
        uriParamList[element] = updatedParam.value;
      }
      else {
        targetUri += '&' + element + '=' + uriParamList[element];
      }
    });

    location.href = targetUri;
  }

  function parse() {
    // uriParams can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.
    var uriParams = getUriParamList();
    console.log(uriParams);
    if (!uriParams) {
      throw new Error('No URI params to parse.');
    }

    // object we will return
    var parsedInputData = {};
    parsedInputData.sourceData = [];

    var svgDisabled = parsedInputData.svgDisabled = uriParams['svg-disabled'] || false;
    var gpmlParam = uriParams.gpml; // this might be equal to the value of uriParams.gpml, but it might not.



    var wpId, wpRevision, uri;

    if (pathvisiojs.utilities.isUri(gpmlParam)) {
      if (uri.indexOf('.gpml') > -1) {
        parsedInputData.sourceData.push({
          uri:gpmlParam,
          mediaType:'application/xml+gpml'
        });
        return parsedInputData;
      }
      else {
        throw new Error('Pathvisiojs cannot handle the data source type entered.');
      }
    }
    else {
    console.log(gpmlParam);
      if (pathvisiojs.utilities.isWikiPathwaysId(gpmlParam)) {
        wpRevision = uriParams.rev || 0;
        // TODO this is messy if we later want to use a data format that is not GPML
        uri = getGpmlUri(gpmlParam, wpRevision); //get uri
        parsedInputData.sourceData.push({
          uri:uri,
          mediaType:'application/xml+gpml'
        });
        parsedInputData.wpId = gpmlParam;
        parsedInputData.revision = wpRevision;
        return parsedInputData;
      }
      else {
        throw new Error('Pathvisiojs cannot handle the data source type entered.');
      }
    }
  }

  // TODO getGpmlUri() and getJson() should move under pathvisiojs.data...
  // if the input is a WP ID, we can get the uri for GPML.
  function getGpmlUri(wpId, revision) {
    var results = {};

    // test whether the server serving this file is on a wikipathways.org domain (wikipathways.org, test3.wikipathways.org, etc.)
    var re = /wikipathways\.org/; 
    var isOnWikiPathwaysDomain = re.test(document.location.origin);

    // I don't know what this is doing. It might be a start at handling display of multiple pathways on a page.
    var PathwayViewer_viewers = PathwayViewer_viewers || [];

    if (pathvisiojs.utilities.isWikiPathwaysId(wpId)) { // if the input is a WP ID
      if (PathwayViewer_viewers.length > 0 && isOnWikiPathwaysDomain) { // if we are also on a *.wikipathways.org domain
        results.uri = PathwayViewer_viewers[0].gpml.gpmlUri; // TODO we are not handling multiple pathways on one page here
      }
      else {
        results.uri = pathvisiojs.config.gpmlSourceUriStub() + wpId + '&rev=' + revision;
      }
      //results.cached = 'https://pathways.firebaseio.com/' + wpId + '.json';
      results.type = 'GPML';
      results.pathwayIri = 'wpId:' + wpId + '#';
    }
    else {
      throw new Error('Pathvisiojs cannot handle the data source type entered.');
    }

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return results;
  } 
  return{
    parse:parse
  };
}();
