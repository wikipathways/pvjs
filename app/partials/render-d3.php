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

<script src="../js/jxon.js"></script>
<script src="../js/jquery-1.9.1.js"></script>
<script src="../js/rgbcolor.js"></script>
<script src="../js/d3.v3/d3.v3.js" charset="utf-8"></script>
<script src="../js/gpml2json.js"></script>
<script src="../js/rgbcolor.js"></script>
<script src="../js/draw-pathway.js"></script>
</head>
<body>

<div><button class="link" onclick="toggleVisibility()">Toggle SVG Creator</button> Current SVG Creator: <span id="svgCreator">pathvisio.js</span></div> 

<?php
$pwId = $_GET['pwId'];

$url = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=svg&pwTitle=Pathway:" . $pwId . "&revision=0";
echo file_get_contents($url);

//imagecreatefrompng($url);
//imagecreatefromstring(file_get_contents($url));

$completeurl = "http://www.wikipathways.org/wpi/webservice/webservice.php/getPathway?pwId=" . $pwId . "&revision=0";
$xml = simplexml_load_file($completeurl);

$xml->registerXPathNamespace('ns1', 'http://www.wso2.org/php/xsd');
$xml->registerXPathNamespace('ns2', 'http://www.wikipathways.org/webservice');
$gpml = $xml->xpath('//ns2:gpml');

$sGpml = (String)$xml->AsXML();
echo "<div id='gpml'>".$sGpml."</div>";

?>

<script>
var gpmlDiv = document.getElementById('gpml');
gpmlDiv.style.display = 'none';
</script>

<object id="pathway-container" data="pathwaydefs.svg" type="image/svg+xml" width="100%" height="100%" onload="drawPathway()"></object>

<script>
var batikSvg = document.getElementsByTagName('svg')[0];
batikSvg.style.display = 'none';

var pathVisioJsObj = document.getElementById('pathway-container');
pathVisioJsObj.setAttribute('style','display: block');

function toggleVisibility() {
  if(pathVisioJsObj.style.display === 'block') {
    pathVisioJsObj.setAttribute('style','display: none');
    batikSvg.style.display = 'block';
    document.getElementById('svgCreator').textContent = 'Batik';
  }
  else {
    pathVisioJsObj.setAttribute('style','display: block');
    batikSvg.style.display = 'none';
    document.getElementById('svgCreator').textContent = 'pathvisio.js';
  };
  console.log('toggled');
};
</script>
</body>
