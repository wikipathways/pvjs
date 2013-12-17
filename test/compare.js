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
    'creator': 'pathvisio-js-dev',
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
    var script = document.createElement("script");  
    script.src = src;  
    script.onload = script.onreadystatechange = function(){  
      script.onreadystatechange = script.onload = null;  
      if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent))window.setTimeout(function(){handler();},8,this);  
      else handler();  
    }  
    var head = document.getElementsByTagName("head")[0];  
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

function loadJsCssFile(filename, filetype, callback){
  if (filetype=="js") {
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype=="css") {
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref)
  }
  callback();
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

function loadExtJsCss(callbackOutside) {
  async.parallel([
    function(callback) {
    loadJsCssFile(srcDirectoryUrl + "css/pathvisiojs.css", "css", callback);
  },
  function(callback) {
    loadJsCssFile(srcDirectoryUrl + "css/annotation.css", "css", callback);
  },
  function(callback) {
    loadJsCssFile(srcDirectoryUrl + "css/pan-zoom.css", "css", callback);
  },
  function(callback) {
    loadScripts([
      srcDirectoryUrl + "js/pathvisiojs/pathvisio.js",
      srcDirectoryUrl + "js/pathvisiojs/utilities.js",
      srcDirectoryUrl + 'js/pathvisiojs/data/data.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/bridgedb/bridgedb.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/bridgedb/data-sources.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/gpml.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/text.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/namespaces.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/entity-node.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/data-node.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/label.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/shape.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/group.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/node.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/anchor.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/edge/edge.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/edge/interaction.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/edge/graphical-line.js',
      srcDirectoryUrl + 'js/pathvisiojs/data/gpml/edge/point.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/view.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/annotation/annotation.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/annotation/citation.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/annotation/x-ref.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/pathway-diagram.js',
      srcDirectoryUrl + "js/pathvisiojs/view/pathway-diagram/path-finder.js",
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/svg.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/anchor.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/grid.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/info-box.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/symbol.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/node.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/text.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/entity-node.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/use-element.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/path-shape.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/rounded-rectangle.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/path-shape/group-complex.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/node/label.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/edge/edge.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/edge/graphical-line.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/edge/interaction.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/edge/marker.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/edge/point.js',
      srcDirectoryUrl + 'js/pathvisiojs/view/pathway-diagram/svg/edge/path-data.js'
    ],
    function(){
      callback(null);
    });
  }
  ],
  function(err, results){
    callbackOutside();
  })
}

var urlParamList = getUrlParamList();

var currentUrl = document.location.origin + document.location.pathname;
var rootDirectoryUrl = document.location.origin + document.location.pathname.split("pathvisiojs/")[0] + 'pathvisiojs/';
var srcDirectoryUrl = (rootDirectoryUrl + 'src/');

/*********************************************
  Load UI for this test/dev comparison page 
/********************************************/

var pathvisioNS;
var gpmlUrl;
window.onload = function() {
  if (urlParamList['svg-disabled']) {
    Modernizr.svg = false;
    $('#svg-disabled').prop('checked', true);
  }

  async.parallel([
    function(callback) {
    pathvisioNS = [];
    generateHtmlView(function() {
      callback(null);
    });
  },
  function(callback) {
    loadExtJsCss(function() {
      callback(null);
    });
  }],
  function(err) {
    var customSymbols = [
      {'id': 'arc', 'url': srcDirectoryUrl + 'shape-library/symbols/arc.svg'},
      {'id': 'brace', 'url': srcDirectoryUrl + 'shape-library/symbols/brace.svg'},
      {'id': 'endoplasmic-reticulum', 'url': srcDirectoryUrl + 'shape-library/symbols/endoplasmic-reticulum.svg'},
      {'id': 'golgi-apparatus', 'url': srcDirectoryUrl + 'shape-library/symbols/golgi-apparatus.svg'},
      {'id': 'hexagon', 'url': srcDirectoryUrl + 'shape-library/symbols/hexagon.svg'},
      {'id': 'mim-degradation', 'url': srcDirectoryUrl + 'shape-library/symbols/mim-degradation.svg'},
      {'id': 'mitochondria', 'url': srcDirectoryUrl + 'shape-library/symbols/mitochondria.svg'},
      {'id': 'oval', 'url': srcDirectoryUrl + 'shape-library/symbols/oval.svg'},
      {'id': 'pentagon', 'url': srcDirectoryUrl + 'shape-library/symbols/pentagon.svg'},
      {'id': 'rectangle', 'url': srcDirectoryUrl + 'shape-library/symbols/rectangle.svg'},
      {'id': 'group-none', 'url': srcDirectoryUrl + 'shape-library/symbols/group-none.svg'},
      {'id': 'group-pathway', 'url': srcDirectoryUrl + 'shape-library/symbols/group-pathway.svg'},
      {'id': 'group-group', 'url': srcDirectoryUrl + 'shape-library/symbols/group-group.svg'},
      //{'id': 'rounded-rectangle', 'url': srcDirectoryUrl + 'shape-library/symbols/rounded-rectangle.svg'},
      {'id': 'sarcoplasmic-reticulum','url': srcDirectoryUrl + 'shape-library/symbols/sarcoplasmic-reticulum.svg'},
      {'id': 'triangle', 'url': srcDirectoryUrl + 'shape-library/symbols/triangle.svg'},
      {'id': 'grid-square', 'url': srcDirectoryUrl + 'shape-library/symbols/grid-square.svg'},
      {'id': 'none', 'url': srcDirectoryUrl + 'shape-library/symbols/none.svg'}
    ];

    //*
    var customMarkers = self.customMarkers = [
      {'id': 'arrow', 'url': srcDirectoryUrl + 'shape-library/markers/arrow.svg'},
      {'id': 'activity', 'url': srcDirectoryUrl + 'shape-library/markers/arrow.svg'},
      {'id': 'mim-branching-left', 'url': srcDirectoryUrl + 'shape-library/markers/mim-branching-left.svg'},
      {'id': 'mim-branching-right', 'url': srcDirectoryUrl + 'shape-library/markers/mim-branching-right.svg'},
      {'id': 'necessary-stimulation', 'url': srcDirectoryUrl + 'shape-library/markers/mim-necessary-stimulation.svg'},
      {'id': 'binding', 'url': srcDirectoryUrl + 'shape-library/markers/mim-binding.svg'},
      {'id': 'conversion', 'url': srcDirectoryUrl + 'shape-library/markers/mim-conversion.svg'},
      {'id': 'stimulation', 'url': srcDirectoryUrl + 'shape-library/markers/mim-stimulation.svg'},
      {'id': 'modification', 'url': srcDirectoryUrl + 'shape-library/markers/mim-modification.svg'},
      {'id': 'catalysis', 'url': srcDirectoryUrl + 'shape-library/markers/mim-catalysis.svg'},
      {'id': 'inhibition', 'url': srcDirectoryUrl + 'shape-library/markers/mim-inhibition.svg'},
      {'id': 'cleavage', 'url': srcDirectoryUrl + 'shape-library/markers/mim-cleavage.svg'},
      {'id': 'covalent-bond', 'url': srcDirectoryUrl + 'shape-library/markers/mim-covalent-bond.svg'},
      {'id': 'transcription-translation', 'url': srcDirectoryUrl + 'shape-library/markers/mim-transcription-translation.svg'},
      {'id': 'gap', 'url': srcDirectoryUrl + 'shape-library/markers/mim-gap.svg'},
      {'id': 'inhibitory-activity', 'url': srcDirectoryUrl + 'shape-library/markers/t-bar.svg'}
    ];
    //*/

   /*
    var customMarkers = self.customMarkers = [
      {'id': 'arrow', 'url': srcDirectoryUrl + 'shape-library/markers/arrow.svg'},
      {'id': 'mim-branching-left', 'url': srcDirectoryUrl + 'shape-library/markers/mim-branching-left.svg'},
      {'id': 'mim-branching-right', 'url': srcDirectoryUrl + 'shape-library/markers/mim-branching-right.svg'},
      {'id': 'necessary-stimulation', 'url': srcDirectoryUrl + 'shape-library/markers/mim-necessary-stimulation.svg'},
      {'id': 'mim-binding', 'url': srcDirectoryUrl + 'shape-library/markers/mim-binding.svg'},
      {'id': 'mim-conversion', 'url': srcDirectoryUrl + 'shape-library/markers/mim-conversion.svg'},
      {'id': 'mim-stimulation', 'url': srcDirectoryUrl + 'shape-library/markers/mim-stimulation.svg'},
      {'id': 'mim-modification', 'url': srcDirectoryUrl + 'shape-library/markers/mim-modification.svg'},
      {'id': 'mim-catalysis', 'url': srcDirectoryUrl + 'shape-library/markers/mim-catalysis.svg'},
      {'id': 'mim-inhibition', 'url': srcDirectoryUrl + 'shape-library/markers/mim-inhibition.svg'},
      {'id': 'mim-cleavage', 'url': srcDirectoryUrl + 'shape-library/markers/mim-cleavage.svg'},
      {'id': 'mim-covalent-bond', 'url': srcDirectoryUrl + 'shape-library/markers/mim-covalent-bond.svg'},
      {'id': 'mim-transcription-translation', 'url': srcDirectoryUrl + 'shape-library/markers/mim-transcription-translation.svg'},
      {'id': 'mim-gap', 'url': srcDirectoryUrl + 'shape-library/markers/mim-gap.svg'},
      {'id': 't-bar', 'url': srcDirectoryUrl + 'shape-library/markers/t-bar.svg'}
    ];
    //*/

    pathvisiojs.load({
      target: '#pathvisio-js-dev',
      width: 1000,
      height: 500,
      preserveAspectRatio: 'xMidYMid',
      data: urlParamList.gpml,
      //gpmlRev: urlParamList.gpmlRev,
      cssUrl: srcDirectoryUrl + 'css/pathway-diagram.css',
      customMarkers: customMarkers,
      customSymbols: customSymbols,
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

if (urlParamList.gpml.indexOf('.gpml') === -1 && urlParamList.gpml.indexOf('.xml') === -1) {
  window.setTimeout(function() {
      $('#current-wikipathways-viewer').prepend('<iframe id="current-wiki-pathways-widget" src="http://www.wikipathways.org/wpi/PathwayWidget.php?id=' + urlParamList.gpml + '" width="500px" height="500px" />')
      }, 50);
}
else {
  console.warn('GPML data source specified is not a WP ID. WP widget cannot display this GPML data as a pathway image.');
}
}

