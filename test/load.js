var module = {};
var srcDirectoryUri, currentUri, uriParams;
var pvjsSources;
var pathvisioNS = pathvisioNS || {};

function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
}

function serializeXmlToString(xmlDoc) {
  var oSerializer;
  if (!(isIE()) || (isIE() > 8)) {
    oSerializer = new XMLSerializer();
    return oSerializer.serializeToString(xmlDoc);
  }
  else {
    throw new Error('IE8 and older do not support XMLSerializer');
  }
}

// this both clones a node and inserts it at the same level of the DOM
// as the element it was cloned from.
// it returns a d3 selection of the cloned element
function cloneNode(selector) {
  var node = d3.select(selector).node();
  return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
}

// see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isOdd(num) {
  return num % 2;
}

function isWikiPathwaysId(data) {
  data = data.trim();
  if (data.substr(0,2).toUpperCase() === 'WP' && this.isNumber(data.substr(data.length - 1))) {
    return true;
  }
  else {
    return false;
  }
}

function isUri(str) {
  // from https://gist.github.com/samuelcole/920312
  var uriPattern = /(?:(?=[\s`!()\[\]{};:'".,<>?«»“”‘’])|\b)((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/|[a-z0-9.\-]+[.](?:com|org|net))(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))*(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]|\b))/gi;
  return uriPattern.test(str);
}

var developmentLoader = function() {

  /* *******************
  /* Get the desired GPML file URL or WikiPathways ID from the URL parameters.
  /* *******************/

  // If you want to the GPML file URL or WikiPathways ID you want to display, you can
  // hard code it as the data parameter in the pathvisiojs.load() function below

  function getUriParamByName(name) {

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

  function convertUriParamsToJson() {
    // this includes both explicit and implicit URI params, e.g.,
    // if svg-disabled is not specified as a URI param, it will still be included in this object with its default value of false.
    uriParams = {
      'svg-disabled': false,
      'gpml': null,
      'rev': 0,
      'creator': 'pathvisiojs-dev',
      'account': '',
      'branch': ''
    };
    Object.keys(uriParams).forEach(function(element) {
      if (!!getUriParamByName(element)) {
        uriParams[element] = getUriParamByName(element);
      }
      window.setTimeout(function() {
        $('#' + element).val(uriParams[element]);
      }, 50);
    });

    var locationSearch = location.search;
    var colors = getUriParamByName('colors');
    if (!!colors) {
      colors = colors.split(',');
    }

    var findElementsByStrings = locationSearch.match(/(xref=|label=|selector=)(.*?)&/gi);
    var highlights;
    if (!!findElementsByStrings) {
      highlights = findElementsByStrings.map(function(findElementsByString, index) {
        var highlight = {};
        var findElementsBy = findElementsByString.match(/xref|label|selector/)[0];
        var findElementsByValue = findElementsByString.match(/=(.*?)&/)[0].slice(1, -1);
        highlight[findElementsBy] = findElementsByValue;
        highlight.style = {};
        highlight.style.fill = colors[index];
        highlight.style.stroke = colors[index];
        return highlight;
      });

      if (highlights.length > 0) {
        uriParams.highlights = highlights;
      }
    }

    console.log('uriParams');
    console.log(uriParams);
    return uriParams;
  }

  function updateParams(updatedParam) {
    var targetUri = currentUri + '?' + updatedParam.key + '=' + updatedParam.value;

    Object.keys(uriParams).forEach(function(element) {
      if (element === updatedParam.key) {
        uriParams[element] = updatedParam.value;
      }
      else {
        targetUri += '&' + element + '=' + uriParams[element];
      }
    });

    location.href = targetUri;
  }

  function parseUriParams(callback) {
    // uriParams can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.
    var uriParams = convertUriParamsToJson();
    if (!uriParams) {
      throw new Error('No URI params to parse.');
    }

    // object we will return
    var parsedInputData = {};
    parsedInputData.sourceData = [];
    console.log('uriParams.highlights');
    console.log(JSON.stringify(uriParams.highlights));

    if (!!uriParams.highlights) {
      parsedInputData.highlights = uriParams.highlights;
    }

    var uri;
    var svgDisabled = parsedInputData.svgDisabled = uriParams['svg-disabled'] || false;
    var gpmlParam = uriParams.gpml; // this might be equal to the value of uriParams.gpml, but it might not.

    var wpId, wpRevision, gpmlUri, pngUri;

    if (isUri(gpmlParam)) {
      uri = gpmlParam;
      if (uri.indexOf('.gpml') > -1) {
        parsedInputData.sourceData.push({
          uri:gpmlParam,
          fileType:'gpml',
          db: 'local',
          dbId: 'unspecified',
          idVersion: 'unspecified'
        });

        console.log(parsedInputData);
        return callback(parsedInputData);
      } else {
        throw new Error('Pathvisiojs cannot handle the data source type entered.');
      }
    } else {
      if (isWikiPathwaysId(gpmlParam)) {
        wpRevision = uriParams.rev || 0;
        // TODO this is messy if we later want to use a data format that is not GPML
        gpmlUri = getGpmlUri(gpmlParam, wpRevision); //get uri
        parsedInputData.sourceData.push({
          uri:gpmlUri,
          fileType:'gpml',
          db: 'wikipathways',
          dbId: gpmlParam,
          idVersion: wpRevision
        });

        pngUri = encodeURI('http://www.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' + gpmlParam + '&revision=' + wpRevision);
        parsedInputData.sourceData.push({
          uri:pngUri,
          fileType:'png',
          db: 'wikipathways',
          dbId: gpmlParam,
          idVersion: wpRevision
        });

        parsedInputData.wpId = gpmlParam;
        parsedInputData.revision = wpRevision;
        console.log('parsedInputData');
        console.log(parsedInputData);
        return callback(parsedInputData);
      } else {
        throw new Error('Pathvisiojs cannot handle the data source type entered.');
      }
    }
  }

  // TODO getGpmlUri() and getJson() should move under pathvisiojs.data...
  // if the input is a WP ID, we can get the uri for GPML.
  function getGpmlUri(wpId, revision) {
    var gpmlUri;

    // test whether the server serving this file is on a wikipathways.org domain (wikipathways.org, test3.wikipathways.org, etc.)
    var re = /wikipathways\.org/;
    var isOnWikiPathwaysDomain = re.test(document.location.origin);

    // I don't know what this is doing. It might be a start at handling display of multiple pathways on a page.
    var PathwayViewer_viewers = PathwayViewer_viewers || [];

    if (isWikiPathwaysId(wpId)) { // if the input is a WP ID
      if (PathwayViewer_viewers.length > 0 && isOnWikiPathwaysDomain) { // if we are also on a *.wikipathways.org domain
        gpmlUri = PathwayViewer_viewers[0].gpml.gpmlUri; // TODO we are not handling multiple pathways on one page here
      } else {
        gpmlUri = 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=' + wpId + '&rev=' + revision;
      }
    } else {
      throw new Error('Pathvisiojs cannot handle the data source type entered.');
    }

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return gpmlUri;
  }

  function loadScripts(array, callback){
    var loader = function(src,handler){
      var script = document.createElement('script');
      script.src = src;
      script.onload = script.onreadystatechange = function(){
        script.onreadystatechange = script.onload = null;
        if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent)) {
          window.setTimeout(function(){handler();},8,this);
        } else {
          handler();
        }
      };
      var head = document.getElementsByTagName('head')[0];
      (head || document.body).appendChild( script );
    };
    (function(){
      if(array.length!==0){
        loader(array.shift(),arguments.callee);
      } else{
        callback();
      }
    })();
  }

  function generateSvgTemplate(callback) {
    var docFragment = document.createDocumentFragment();
    var svg = d3.select(docFragment).append('svg').
    attr('id', 'pathvisiojs-diagram').
    attr('version', '1.1').
    attr('baseProfile', 'full').
    attr('xmlns', 'http://www.w3.org/2000/svg').
    attr('xmlns:xmlns:xlink', 'http://www.w3.org/1999/xlink').
    attr('xmlns:xmlns:ev', 'http://www.w3.org/2001/xml-events').
    attr('width', '100%').
    attr('height', '100%').
    attr('style', 'display: none; ');

    var g = svg.append('g');

    var title = svg.append('title').
    text('pathvisiojs diagram');

    var desc = g.append('desc').
    text('This SVG file contains all the graphical elements (markers and symbols in defs as well as\nstyle data) used by the program pathvisiojs, which has two components:\n1) a viewer for transforming GPML biological pathway data into an SVG visual representation and\n2) an editor for creating both views and models for biological pathways.');

    var defs = svg.append('defs');

    // TODO can we delete this filter?
    var filter = svg.append('filter').
    attr('id', 'highlight').
    attr('width', '150%').
    attr('height', '150%');

    filter.append('feOffset').
    attr('result', 'offOut').
    attr('in', 'SourceGraphic').
    attr('dx', '30').
    attr('dy', '30');

    filter.append('feGaussianBlur').
    attr('result', 'blurOut').
    attr('in', 'offOut').
    attr('stdDeviation', '10');

    filter.append('feBlend').
    attr('in', 'SourceGraphic').
    attr('in2', 'blurOut').
    attr('mode', 'normal');

    var viewport = svg.append('g').
    attr('id', 'viewport');

    pathvisioNS['tmp/pathvisiojs.svg'] = serializeXmlToString(svg[0][0]);
    callback();
  }

  function generateHtmlTemplate(callback) {
    d3.html(srcDirectoryUri + 'pathvisiojs.html', function(docfrag) {
      var html = docfrag.firstChild;
      pathvisioNS['src/pathvisiojs.html'] = serializeXmlToString(html);
      callback();
    });
  }

  function preload(outsideCallback) {
    var hostname = decodeURI(window.location.hostname);

    currentUri = document.location;
    var pathname = document.location.pathname;
    var pathvisiojsRootDirectoryUri = pathname.split('test/one-diagram.html')[0];
    srcDirectoryUri = (pathvisiojsRootDirectoryUri + 'src/');

    parseUriParams(function (parsedInputData) {
      if (parsedInputData.svgDisabled) {
        Modernizr.svg = Modernizr.inlinesvg = false;
        $('#svg-disabled').prop('checked', true);
      }
      if (pathname.indexOf('one-diagram.html') > -1) { //if this is the development version
        generateHtmlTemplate(function() {
          generateSvgTemplate(function() {
            console.log(pathvisioNS);
            outsideCallback(parsedInputData);
          });
        });
      } else { //if this is the production version
        outsideCallback(parsedInputData);
      }
    });
  }

  function loadFrames(inputData, callback) {
    console.log(inputData);
    window.setTimeout(function() {
      inputData.forEach(function(inputDataElement) {
        $('#' + inputDataElement.containerId).prepend('<iframe id="' + inputDataElement.containerId + '-frame" src="' + inputDataElement.frameSrc + '" style="width:inherit; height:inherit; margin:0; " />');
      });
      callback();
    }, 50);

    //*
    //*/
  }

  return{
    preload:preload,
    loadFrames:loadFrames,
    parseUriParams:parseUriParams
  };
}();
