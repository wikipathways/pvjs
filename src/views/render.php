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

<link href="../lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link rel="stylesheet" href="../lib/biojs/src/main/resources/css/biojs.detailsFrame.css">
<link rel="stylesheet" href="../lib/jquery-ui/themes/base/jquery-ui.css">
<style type="text/css">
body {
  background-color: red;
}
.navigator .highlight{
  opacity:    0.4;
  filter:     alpha(opacity=40);
  border:     2px solid #900;
  outline:    none;
  background-color: #900;
}
.highlight{
  filter:     alpha(opacity=40);
  border:     4px solid transparent;
  outline:    10px auto transparent;
  background-color: white;
}
.highlight:hover, .highlight:focus{
  border:     4px solid gold;
  outline:    10px auto gold;
  background-color: white;
}
</style>

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
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
<div style="position:relative">
  <!-- from http://xme.im/display-fullscreen-website-using-javascript -->
  <button id="enable-zoom" style="float:left;" onclick="enableZoom = 1;">Enable Zoom</button>
  <button style="float:left;" onclick="enableZoom = 0;">Disable Zoom</button>
  <button style="float:left;" onclick="svgView = 1;">SVG</button>
  <button style="float:left;" onclick="svgView = 0;">PNG</button>
  <i id="fullscreen" class="icon-fullscreen"></i>
  <!-- Button to trigger modal 
  <a href="#myModal" role="button" onclick="editable = true" ng-init="editable = false" class="btn" data-toggle="modal">Edit Pathway</a>
  -->
</div>
<div id="detailsFrame" class="protein ui-draggable">
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
  document.getElementById('fullscreen').addEventListener('click', function () {
    if (screenfull.enabled) {
      screenfull.request(pathwayContainer[0][0]);
    }
  });
}
else {

  // browser does not support SVG. Fall back to PNG.

  console.log('Your browser does not support SVG. Falling back to PNG.');

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

    var pathwayContainer = d3.select('#pathway-container');
    pathwayContainer.select('#pathway-image').remove();
    pathwayContainer.attr('style', 'width: 100%; height:500px');
    //pathwayContainer.attr('style', 'width:1000px; height:693px');

    if (content.ready) {
      var viewer = self.viewer = OpenSeadragon({
        //debugMode: true,
        id: "pathway-container",
        prefixUrl: "../lib/openseadragon/images/",
        showNavigator:true,
        //minPixelRatio: 1.5,
        minZoomImageRatio: 0.8,
        maxZoomPixelRatio: 2,
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
