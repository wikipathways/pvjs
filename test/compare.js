var module = {};
var pvjsSources;
function getUrlParam(name) {

  // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
  // This will be replaced once we get the backend php to get the json

  var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  if (!!parameter) {
    return parameter;
  }
  else {
    return null;
  }
}

function getUrlParamList() {
  urlParamList = {
    'svg-disabled': false,
    'gpml': null,
    'gpmlRev': 0,
    'creator': 'pathvisiojs-dev',
    'account': '',
    'branch': ''
  };

  Object.keys(urlParamList).forEach(function(element) {
    if (!!getUrlParam(element)) {
      urlParamList[element] = getUrlParam(element);
    }
    window.setTimeout(function() {
      $('#' + element).val(urlParamList[element]);
    }, 50)
  });

  return urlParamList;
}

function loadScripts(array, callback){  
  var loader = function(src,handler){  
    var script = document.createElement('script');  
    script.src = src;  
    script.onload = script.onreadystatechange = function(){  
      script.onreadystatechange = script.onload = null;  
      if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent))window.setTimeout(function(){handler();},8,this);  
      else handler();  
    }  
    var head = document.getElementsByTagName('head')[0];  
    (head || document.body).appendChild( script );  
  };  
  (function(){  
    if(array.length!=0){  
      loader(array.shift(),arguments.callee);  
    }else{  
      callback && callback();  
    }  
  })();  
}

function updateParams(updatedParam) {
  var targetUrl = currentUrl + '?' + updatedParam.key + '=' + updatedParam.value;

  Object.keys(urlParamList).forEach(function(element) {
    if (element === updatedParam.key) {
      urlParamList[element] = updatedParam.value;
    }
    else {
      targetUrl += '&' + element + '=' + urlParamList[element];
    }
  });

  location.href = targetUrl;
}

function generateHtmlView(callback) {
  d3.html(srcDirectoryUrl + 'pathvisiojs.html', function(html) {
    var svg = html.querySelector('#pathway-svg');
    svg.setAttribute('style', 'display: none; ');
    svg.setAttribute('width', '500px');
    svg.setAttribute('height', '500px');

    var oSerializer = new XMLSerializer();
    pathvisioNS['tmp/pathvisiojs.html'] = oSerializer.serializeToString(html);
    callback();
  });
}

var urlParamList = getUrlParamList();

var hostname = decodeURI(window.location.hostname);

var currentUrl = document.location;
var pathvisiojsRootDirectoryUrl = document.location.pathname.split('test/compare.html')[0];
var srcDirectoryUrl = (pathvisiojsRootDirectoryUrl + 'src/');

/*********************************************
  Load UI for this test/dev comparison page 
/********************************************/

var pathvisiojs = pathvisiojs || {};
var pathvisioNS;
var gpmlUrl;
window.onload = function() {
  if (urlParamList['svg-disabled']) {
    Modernizr.svg = false;
    $('#svg-disabled').prop('checked', true);
  }

  async.series([
    function(callback) {
      var gruntFileUrl = '../Gruntfile.js'; // just for testing/development purposes
      loadScripts([gruntFileUrl], function() {
        callback(null);
      });
    },
    function(callback) {
      pathvisioNS = [];
      generateHtmlView(function() {
        callback(null);
      });
    },
    function(callback) {
      var pvjsSourcesDev = pvjsSources.slice(1); //this file is only used in the build process

      // In dev mode, different servers will use different configs.
      // The code below sets this config file.
      // For production, we will use default.js for our default config settings and
      // optionally build other versions as needed if we need a built version that
      // doesn't use the config settings in default.js.
      var serverSpecificJsConfigFileName;
      var regDomainPattern = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i
      var regexResult = regDomainPattern.exec(hostname);
      if (!!regexResult) {
        // www is the same as a bare domain for our purposes, e.g., www.example.org === example.org
        if (!!regexResult[1]) {
          serverSpecificJsConfigFileName = regexResult[0];
        }
        else {
          serverSpecificJsConfigFileName = 'www.' + regexResult[0];
        }
      }
      else { //if it's an IP address, just use localhost
        serverSpecificJsConfigFileName = 'localhost';
      }

      serverSpecificJsConfigFileName = strcase.paramCase(serverSpecificJsConfigFileName);
      pvjsSourcesDev[1] = 'config/' + serverSpecificJsConfigFileName + '.js';

      pvjsSourcesDev = pvjsSourcesDev.map(function(source) {
        return '../' + source;
      });

      loadScripts(pvjsSourcesDev, function() {
        callback(null);
      });
    }
  ],
  function(err) {
    // Specify an image for each semantic element you would like to customize.
    // If no image is specified for a semantic element, the default will be used.
    // You can use the same image for multiple semantic elements if you choose to,
    // but every semanticName must be unique.
 /*   var customSymbols = [
      {
        'semanticName': 'rectangle',
        'url': srcDirectoryUrl + 'shape-library/symbols/rectangle.svg'
      }
    ];
//*/
        console.log('pathvisiojs.config.bridgedbLinkOutsUrlStub()');
        console.log(pathvisiojs.config.bridgedbLinkOutsUrlStub());
    var customMarkers = [
      {
        'semanticName': 'arrow',
        //'url': 'http://wikipathways.org/skins/common/images/poweredby_mediawiki_88x31.png' // can use PNG or SVG
        'url': srcDirectoryUrl + 'shape-library/markers/arrow.svg'
      },
      {
        'semanticName': 'necessary-stimulation',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-necessary-stimulation.svg'
      },
      {
        'semanticName': 'binding',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-binding.svg'
      },
      {
        'semanticName': 'conversion',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-conversion.svg'
      },
      {
        'semanticName': 'stimulation',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-stimulation.svg'
      },
      {
        'semanticName': 'modification',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-modification.svg'
      },
      {
        'semanticName': 'catalysis',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-catalysis.svg'
      },
      {
        'semanticName': 'inhibition',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-inhibition.svg'
      },
      {
        'semanticName': 'cleavage',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-cleavage.svg'
      },
      {
        'semanticName': 'covalent-bond',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-covalent-bond.svg'
      },
      {
        'semanticName': 'transcription-translation',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-transcription-translation.svg'
      },
      {
        'semanticName': 'gap',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-gap.svg'
      },
      {
        'semanticName': 'inhibitory-activity',
        'url': srcDirectoryUrl + 'shape-library/markers/t-bar.svg'
      },
      {
        'semanticName': 'unspecified',
        'url': srcDirectoryUrl + 'shape-library/markers/none.svg'
      },
      {
        'semanticName': 'activity',
        'url': srcDirectoryUrl + 'shape-library/markers/arrow.svg'
      },
      {
        'semanticName': 'mim-branching-left',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-branching-left.svg'
      },
      {
        'semanticName': 'mim-branching-right',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-branching-right.svg'
      },
      {
        'semanticName': 'mim-necessary-stimulation',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-necessary-stimulation.svg'
      },
      {
        'semanticName': 'mim-binding',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-binding.svg'
      },
      {
        'semanticName': 'mim-conversion',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-conversion.svg'
      },
      {
        'semanticName': 'mim-stimulation',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-stimulation.svg'
      },
      {
        'semanticName': 'mim-modification',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-modification.svg'
      },
      {
        'semanticName': 'mim-catalysis',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-catalysis.svg'
      },
      {
        'semanticName': 'mim-inhibition',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-inhibition.svg'
      },
      {
        'semanticName': 'mim-cleavage',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-cleavage.svg'
      },
      {
        'semanticName': 'mim-covalent-bond',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-covalent-bond.svg'
      },
      {
        'semanticName': 'mim-transcription-translation',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-transcription-translation.svg'
      },
      {
        'semanticName': 'mim-gap',
        'url': srcDirectoryUrl + 'shape-library/markers/mim-gap.svg'
      },
      {
        'semanticName': 't-bar',
        'url': srcDirectoryUrl + 'shape-library/markers/t-bar.svg'
      },
      {
        'semanticName': 'none',
        'url': srcDirectoryUrl + 'shape-library/markers/none.svg'
      }
    ];

    // for element scaling, we are using the SVG terms for all graphical representations of pathways.
    // preserveAspectRatio refers to the vertical and horizontal alignment of the image.

    pathvisiojs.load({
      container: '#pathvisiojs-dev', //as of now, this can only be a CSS selector: http://www.w3.org/TR/CSS2/selector.html
      fitToContainer:true, //A fitToContainer value of false means that the diagram should be the size specified by the diagram creator, without any scaling (full size as per GPML width and height). A value of true means that diagram should be scaled down, if required, to fit entirely within the element specified by the container selector, while preserving aspect ratio. 
      data: urlParamList.gpml,
      //gpmlRev: urlParamList.gpmlRev,
      cssUrl: srcDirectoryUrl + 'css/pathway-diagram.css',
      customMarkers: customMarkers,
      //customSymbols: customSymbols,
      highlightNodes: [
        {'parameter': 'label', 'parameterValue': 'CRH', 'color': 'red'},
        {'parameter': 'xref', 'parameterValue': '8525,Entrez%20Gene', 'color': '#FF0000'}
      ],
      hiddenElements: [
        'find',
        'wikipathways-link'
      ]
    });
  });

  // test for whether urlParamList.gpml is a WikiPathways ID
  // If it is not a WikiPathways ID, the WikiPathways widget will not be able to load the pathway.
  if (urlParamList.gpml.indexOf('.gpml') === -1 && urlParamList.gpml.indexOf('.xml') === -1) {
    window.setTimeout(function() {
        $('#current-wikipathways-viewer').prepend('<iframe id="current-wiki-pathways-widget" src="http://www.wikipathways.org/wpi/PathwayWidget.php?id=' + urlParamList.gpml + '" width="500px" height="500px" />')
        }, 50);
  }
  else {
    console.warn('GPML data source specified is not a WP ID. WP widget cannot display this GPML data as a pathway image.');
  }
}


/* *******************
/* Until we finish automating the Grunt build process, we are manually getting the html template with this function.
/* *******************/

var getPathvisiojsHtmlTemplate = function() {
  var svg = d3.select('#pathway-svg');
  svg.select('#viewport').selectAll('*').remove();
  var marker, oldMarkerId, newMarkerId;
  var markers = svg.selectAll('marker');
  markers.each(function() {
    marker = d3.select(this);
    oldMarkerId = marker.attr('id');
    newMarkerId = 'shape-library' + oldMarkerId.split('-shape-library')[1];
    marker.attr('id', newMarkerId);
  });

  var symbol, oldSymbolId, newSymbolId;
  var symbols = svg.selectAll('symbol');
  symbols.each(function() {
    symbol = d3.select(this);
    oldSymbolId = symbol.attr('id');
    newSymbolId = 'shape-library' + oldSymbolId.split('-shape-library')[1];
    symbol.attr('id', newSymbolId);
  });
  return d3.select('#pathvisiojs-container')[0][0];
}


