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

<link href="../js/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
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

<![endif]-->

  <script>

    // IE8 only allows console.log when Developer Tools is open. This will prevent errors
    // from showing up if I use console.log without DevTools being open.

if (typeof console == "undefined") {
    this.console = {log: function() {}};
}
  </script>

</head>
<body>
<div style="position:relative; width:100%; height:90%;" id="pathwayEditor" class="pathwayEditor">
  <div style="position:relative; width:70%; height:auto; float:left;">
    <div style="width:100%; height:100%" id="pathwayViewer">
      <div id="detailsFrame" class="protein ui-draggable">
      </div>
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
  <button style="float:left;" onclick="enableZoom = 1;">Enable Zoom</button>
  <button style="float:left;" onclick="enableZoom = 0;">Disable Zoom</button>
  <button style="float:left;" onclick="svgView = 1;">SVG</button>
  <button style="float:left;" onclick="svgView = 0;">PNG</button>
  <i id="fullscreen" class="icon-fullscreen"></i>
  <!-- Button to trigger modal 
  <a href="#myModal" role="button" onclick="editable = true" ng-init="editable = false" class="btn" data-toggle="modal">Edit Pathway</a>
  -->
</div>

<script src="../lib/d3/d3.js" charset="utf-8"></script>
<script src="../lib/jquery/jquery.js"></script>
<script src="../lib/jquery-ui/ui/jquery-ui.js"></script>

<script src="../js/case-converter.js"></script>
<script src="../js/xml2json.js"></script>
<script src="../js/bootstrap/js/bootstrap.js"></script>
<script src="../lib/openseadragon/openseadragon.js"></script>
<script src="../lib/modernizr/modernizr.js"></script>
<script src="../lib/screenfull/dist/screenfull.js"></script>
<script src="../lib/biojs/src/main/javascript/Biojs.js"></script>
<script src="../lib/biojs/src/main/javascript/Biojs.DetailsFrame.js"></script>
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
  var url = './gpml.php?id=' + id;
  //var url = 'http://pointer.ucsf.edu/d3/r/pathvisio.js/src/views/gpml.php?id=' + id;
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

  document.getElementById('pathway-image').addEventListener('click', function () {
    enableZoom = 1;
  });
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

    pathway.labelableElements.forEach(function(element) {
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
    pathwayContainer.select('svg').remove();
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
var detailsFrameSet = null;
        $(".highlight").click(function() {
          var features = {
            "id": this.getAttribute('id'),
            "description":"Uncharacterized protein Rv0893c/MT0917",
            "Gene-Name":"Rv0893c",
            "%GC":" 60.63",
            "Location":" Unknown",
            "Chrom-Location":" 946",
            "Strand-Direction":" -1",
            "Cordon-Bias":" 0.07692",
            "Funct-Class":" unknown",
            "Degree":" 15",
            "Betweenness":" 784.68",
            "Closeness":" 0.24790",
            "Eigen":" 0.00003",
            "Hub":" N",
            "Sass-Infect":" 0",
            "Sass-Growth":" 0",
            "GO-Growth":" 0",
            "TDR":" 0",
            "UniProt":" 0",
            "DDTRP":" 0",
            "Gas-Nic":" 0",
            "#-Paralogs":" 11",
            "Mtb-cplx":" 11",
            "Mtb":" 7",
            "Corynebacterineae":" 0",
            "Actinomycetales":" 0",
            "Actinobacteridae":" 0",
            "Bacteria":"0",
            "Non-bacteria":"0",
            "H.sapiens":"0",
            "in_leprae":"0",
            "DN/DS":"0.48",
            "Codon-Volatility":"0.1"
          };
          if (!detailsFrameSet) {
            detailsFrameSet = true;
            Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
              target: "detailsFrame",
              features: features 
            });
          }
          else {

            // hack for making this work in IE8.
            // Biojs.detailsFrame.instance.updateFeatures() did not appear to work in IE8,
            // so I am just emptying the detailsFrame div and building a new one.

            d3.select('#detailsFrame').selectAll('*').remove();
            Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
              target: "detailsFrame",
              features: features 
            });
/*
            Biojs.DetailsFrame.instance.updateFeatures({id: this.getAttribute('id'),
              description:"new description",
              newFeature:"its value",
              otherFeature:"another value"});
*/
          };
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
