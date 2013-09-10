<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>pathvisio.js renderer</title>

<!-- 
Style guides can be arbitrary, but for sake of consistency within this project, let's use these:
http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
http://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml#General_Guidelines
-->

<?php
function getUrl() {
  $url  = @( $_SERVER["HTTPS"] != 'on' ) ? 'http://'.$_SERVER["SERVER_NAME"] :  'https://'.$_SERVER["SERVER_NAME"];
  $url .= ( $_SERVER["SERVER_PORT"] !== 80 ) ? ":".$_SERVER["SERVER_PORT"] : "";
  $url .= $_SERVER["REQUEST_URI"];
  return $url;
}

$currentUrl = getUrl();
$base = str_replace("?", "/../../../?", getUrl());

//echo '<base href="' . $base . '">';

?>

<link href="../lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link rel="stylesheet" href="../lib/biojs/src/main/resources/css/biojs.detailsFrame.css">
<link rel="stylesheet" href="../lib/jquery-ui/themes/base/jquery-ui.css">
<style type="text/css">
body {
  background-color: white;
}
.navigator .highlight{
    opacity:    0.4;
    filter:     alpha(opacity=40);
    border:     2px solid #900;
    outline:    none;
    background-color: #900;
}
.highlight{
    opacity:    0.1;
    filter:     alpha(opacity=40);
    background-color: white;
}
.highlight:hover, .highlight:focus{
    filter:     alpha(opacity=70);
    opacity:    0.7;
    border:     2px solid gold;
    outline:    10px auto gold;
    background-color: transparent;
}
</style>

<!--[if lt IE 9]>
  <script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
  <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <script src="../lib/es5-shim/es5-shim.js"></script>
  <script src="../lib/Xccessors/xccessors-standard.js"></script>

  <script>

    // IE8 only allows console.log when Developer Tools is open. This will prevent errors
    // from showing up if I use console.log without DevTools being open.
    // from http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer

    /**
     * Protect window.console method calls, e.g. console is not defined on IE
     * unless dev tools are open, and IE doesn't define console.debug
     */
    (function() {
      if (!window.console) {
        window.console = {};
      }
      // union of Chrome, FF, IE, and Safari console methods
      var m = [
        "log", "info", "warn", "error", "debug", "trace", "dir", "group",
        "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
        "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
      ];
      // define undefined methods as noops to prevent errors
      for (var i = 0; i < m.length; i++) {
        if (!window.console[m[i]]) {
          window.console[m[i]] = function() {};
        }    
      } 
    })();
  </script>
<![endif]-->

</head>
<body>
<div style="position:relative; width:100%; height:90%;" id="pathwayEditor" class="pathwayEditor">
  <div style="position:relative; width:70%; height:auto; float:left;">
    <div style="width:100%; height:100%" id="pathwayViewer">
<!-- Pathvisio.js SVG viewer -->
<?php
$authorizedRepos = array("wikipathways", "AlexanderPico", "ariutta", "khanspers");
$repo = "wikipathways";

if (isset($_GET['repo'])) {
  if (in_array($_GET['repo'], $authorizedRepos)) {
    $repo = htmlspecialchars($_GET['repo']);
  }
}

if ($_GET['repo'] == "local") {
  $pathwayTemplateSvgUrl = "pathway-template.svg";
  $pathwayTemplateSvgUrlEditable = "pathway-template.svg";
}
else {
  //$pathwayTemplateSvgUrl = "https://raw.github.com/" . $repo . "/pathvisio.js/dev/src/views/pathway-template.svg";
  $pathwayTemplateSvgUrl = "./pathway-template.svg";
  $pathwayTemplateSvgUrlEditable = "https://github.com/" . $repo . "/pathvisio.js/blob/dev/src/views/pathway-template.svg";
}

echo "<div id='pathway-container' class='pathway'>";
$pathwayTemplateSvg = simplexml_load_file($pathwayTemplateSvgUrl);
echo $pathwayTemplateSvg->saveXML();
echo "</div>";

?>
    </div>
  </div>
  <div style="position:relative; min-width: 300px; width:30%; height:auto; float:right;">
    <div ng-include src="'partials/editorToolbar.html'"></div>
  </div>
</div>
<div id="viewertoolbar" style="float:right;">
  <fieldgroup id="svg-toolbar" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: relative; display: inline-block; background-position: initial initial; background-repeat: initial initial;">
    <label style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: static; background-position: initial initial; background-repeat: initial initial;">
    </label>
    <button title="Zoom in" onclick="d3.select('svg').select('#viewport').attr('transform', 'scale(1.5)')" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: relative; display: inline-block; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomin_rest.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: static; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomin_grouphover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomin_hover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomin_pressed.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
    </button>
    <button title="Zoom out" onclick="d3.select('svg').select('#viewport').attr('transform', 'scale(0.75)')" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: relative; display: inline-block; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomout_rest.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: static; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomout_grouphover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomout_hover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/zoomout_pressed.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
    </button>
    <button title="Go home" onclick="d3.select('svg').select('#viewport').attr('transform', 'scale(1)')" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: relative; display: inline-block; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/home_rest.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: static; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/home_grouphover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/home_hover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/home_pressed.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
    </button>
    <button title="Toggle full page" id="full-screen-btn" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: relative; display: inline-block; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/fullpage_rest.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: static; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/fullpage_grouphover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/fullpage_hover.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
      <img src="../lib/openseadragon/images/fullpage_pressed.png" style="background-image: none; background-color: transparent; border: none; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;">
    </button>
  </fieldgroup>
</div>
<div id="detailsFrame" style="visibility:hidden" class="protein ui-draggable">
</div>

<script src="../lib/d3/d3.js" charset="utf-8"></script>
<script src="../lib/jquery/jquery.js"></script>
<script src="../lib/jquery-ui/ui/jquery-ui.js"></script>

<script src="../lib/case-converter/case-converter.js"></script>
<script src="../lib/xml2json/xml2json.js"></script>
<script src="../lib/bootstrap/dist/js/bootstrap.js"></script>
<script src="../lib/openseadragon/openseadragon.js"></script>
<script src="../lib/modernizr/modernizr.js"></script>
<script src="../lib/screenfull/dist/screenfull.js"></script>
<script src="../lib/biojs/src/main/javascript/Biojs.js"></script>
<script src="../lib/biojs/src/main/javascript/Biojs.DetailsFrame.js"></script>
<script src="../lib/mr-data-converter/CSVParser.js"></script>
<script src="../lib/mr-data-converter/DataGridRenderer.js"></script>
<!--
<script src="../lib/async/lib/async.js"></script>
-->

<script src="../../build/js/pathvisio.js"></script>

<script>
enableZoom = 0;	

if (!pathvisio.helpers.getUrlParam('svgView')) {
  var svgView = 1;
}
else {
  var svgView = pathvisio.helpers.getUrlParam('svgView');
};

var repo = pathvisio.helpers.getUrlParam('repo');

if (!!pathvisio.helpers.getUrlParam('id')) {
  var id = pathvisio.helpers.getUrlParam('id');
  var url = '../data/gpml.php?id=' + id;
  //var url = 'http://pointer.ucsf.edu/d3/r/pathvisio.js/src/data/gpml.php?id=' + id;
}
else {
  if (!!pathvisio.helpers.getUrlParam('url')) {
    var url = pathvisio.helpers.getUrlParam('url');
  }
  else {
    console.log('Error: No GPML data source specified.');
  };
};


if (Modernizr.svg && svgView != 0) {

  // browser supports SVG.

  console.log('Your browser supports SVG.');

  var pathwayContainer = d3.select('#pathway-container');
  pathwayContainer.attr('style', 'width: 100%; height:500px');
  pathvisio.pathway.load('#pathway-image', url);
  ///*
  document.getElementById('pathway-image').addEventListener('click', function () {
    enableZoom = 1;
  });
 //*/
  document.getElementById('full-screen-btn').addEventListener('click', function () {
    if (screenfull.enabled) {
      screenfull.request(pathwayContainer[0][0]);
    }
  });
}
else {

  // browser does not support SVG. Fall back to PNG.

  console.log('Your browser does not support SVG. Falling back to PNG.');

  var windowDimensions = pathvisio.helpers.getWindowDimensions();
  var pathwayContainer = d3.select('#pathway-container');
  pathwayContainer.select('#pathway-image').remove();
  //pathwayContainer.attr('style', function() {return 'width: 100%; height:' + windowDimensions.height + 'px'});
  pathwayContainer.attr('style', 'width: 100%; height:1000px');
  var svgToolbar = d3.select('#svg-toolbar')[0][0].style.visibility="hidden";
  var loadingImg = $("#pathway-container").append("<img id='loadingImg' src='../img/loading.gif' width='100' height='100' />");

  function onZoomitResponse(resp) {
    self.resp = resp;
    if (resp.error) {
      // e.g. the URL is malformed or the service is down
      alert(resp.error);
      return;
    };

    var content = resp.content;

    var pathway = pathvisio.data.pathways[pathvisio.data.current.svgSelector];
    console.log('pathway');
    console.log(pathway);
    var overlays = self.overlays = [];
    var overlayItem = null;

    pathway.nodes.forEach(function(element) {
      console.log(element);
      var scalingFactor =  content.dzi.width / pathvisio.data.pathways[pathvisio.data.current.svgSelector].boardWidth;
      overlayItem = {
        'id':element.graphId,
        'px':element.x * scalingFactor,
        'py':element.y * scalingFactor,
        'width':element.width * scalingFactor,
        'height':element.height * scalingFactor,
        'className': 'highlight',
      };
      if (element.elementType === 'data-node') {
        overlays.push(overlayItem);
      };
    });

    loadingImg.empty();

    if (content.ready) {
      var viewer = self.viewer = OpenSeadragon({
        //debugMode: true,
        id: "pathway-container",
        prefixUrl: "../lib/openseadragon/images/",
        showNavigator:true,
        //minPixelRatio: 1.5,
        minZoomImageRatio: 0.8,
        maxZoomPixelRatio: 2,
        //toolbar: 'viewertoolbar',
        tileSources:   [{ 
          Image:  {
            xmlns: "http://schemas.microsoft.com/deepzoom/2009",
            Url: 'http://cache.zoom.it/content/' + content.id + '_files/',
            TileSize: "254", 
            Overlap: "1", 
            Format: "png", 
            ServerFormat: "Default",
            Size: { 
              Width: content.dzi.width,
              Height: content.dzi.height
            }
          },
          overlays:overlays 
        }],
        visibilityRatio: 1.0,
        constrainDuringPan: true
      });

      window.setTimeout(function() {
        $(".highlight").click(function() {
          var id = this.getAttribute('id');
          pathvisio.pathway.xRef.displayData(id);
        });
      }, 1000);
    }
    else {
      if (content.failed) {
        alert(content.url + " failed to convert.");
      }
      else {
        alert(content.url + " is " +
          Math.round(100 * content.progress) + "% done.");
      };
    };
  };

  function getPng() {
    $.ajax({
      url: 'http://api.zoom.it/v1/content/?url=' + encodeURIComponent('http://test3.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' + id),
      dataType: "jsonp",
      success: onZoomitResponse
    });
  };

  pathvisio.pathway.getJson(url, 'application/xml', function() {
    getPng();
  });
};
</script>
</body>
