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

<div id="toggle"><button class="link" onclick="toggleVisibility()">Toggle SVG Creator</button> Current SVG Creator: <span id="svgCreator">pathvisio.js</span></div> 

<?php
  //$pathwayDefsSvgUrl = "https://raw.github.com/wikipathways/pathvisio.js/dev/app/partials/pathwaydefs.svg";
  //$pathwayDefsSvg = file_get_contents($pathwayDefsSvgUrl);
  //$imageData = base64_encode($pathwayDefsSvg);
  //echo "<object id='pathway-container' type='image/svg+xml' data='" . $imageData . "' width='100%' height='100%' onload='drawPathway()'>";

  $pathwayDefsSvgUrl = "https://raw.github.com/wikipathways/pathvisio.js/dev/app/partials/pathwaydefs.svg";
  $pathwayDefsSvg = simplexml_load_file($pathwayDefsSvgUrl);
  echo $pathwayDefsSvg->saveXML();

?>
</object>

<?php
if (isset($_GET['pwId'])) {
  echo "<script>var local = false</script>";
  $pwId = $_GET['pwId'];

  $svgUrl = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=svg&pwTitle=Pathway:" . $pwId . "&revision=0";
  $svg = simplexml_load_file($svgUrl);

  $display = $svg->addAttribute('display', 'none');
  echo $svg->saveXML();

  //imagecreatefrompng($url);
  //imagecreatefromstring(file_get_contents($url));

  //$gpmlUrl = "http://www.wikipathways.org/wpi/webservice/webservice.php/getPathway?pwId=" . $pwId . "&revision=0";
  $gpmlUrl = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:" . $pwId;
  //$gpml = simplexml_load_file($gpmlUrl);

  //$xml->registerXPathNamespace('ns1', 'http://www.wso2.org/php/xsd');
  //$xml->registerXPathNamespace('ns2', 'http://www.wikipathways.org/webservice');
  //$gpmlArr = $xml->xpath('//ns2:gpml');
  //echo $gpmlStr = $gpmlArr[0]->asSTR();

  // how do I make php parse this file? This below produces incorrect results.
  //$gpml = new SimpleXMLElement($gpmlStr);
  //echo $gpml->asXML();

  //$gpmlArr = $xml->xpath('//ns2:gpml');
  //$gpmlStr = $gpmlArr[0];
  //$gpml = $gpmlStr->asXML();
}
elseif (isset($_GET['pathway'])) {
  echo "<script>var local = true</script>";
  $pathway = $_GET['pathway'];
  $gpmlUrl = "../../test/" . $pathway;
}

//$content = file_get_contents($gpmlUrl);
//$lines = explode("\n", $content);
//echo $skipped_content = implode("\n", array_slice($lines, 1));

$gpmlStr = file_get_contents($gpmlUrl);
$doc = new DOMDocument();
$doc->loadXML($gpmlStr);

echo "<div id='gpml' style='display:none'>";

// need to do this, because it appears Chrome will incorrectly close the self-closing tags in gpml.

echo $doc->saveXML(null, LIBXML_NOEMPTYTAG);
echo "</div>";

//$gpml = simplexml_load_file($gpmlUrl);
// output the result
//echo $gpml->asXML();

?>

<!--
<object id="pathway-container" data="pathwaydefs.svg" type="image/svg+xml" width="100%" height="100%" onload="drawPathway()"></object>
-->

<script>
window.onload = drawPathway();
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

  if (local === false) {
    var batikSvg = document.getElementsByTagName('svg')[0];
    batikSvg.style.display = 'none';

    var pathVisioJsObj = document.getElementById('pathway-image');
    pathVisioJsObj.setAttribute('style','display: block');
  }
  else {
    var toggle = document.getElementById('toggle');
    toggle.style.display = 'none';
  };
</script>
</body>
