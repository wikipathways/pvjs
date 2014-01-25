<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>pathvisio.view.pathwayDiagram</title>

<!-- 
Style guides can be arbitrary, but for sake of consistency within this project, let's use these:
http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
http://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml#General_Guidelines
-->


</head>
<body>
<script>
function getUriParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
};
var repo = getUriParameter('repo');
var uri = getUriParameter('pathwayUri');
var pwId = getUriParameter('pwId');
</script>

<div id="choose-pathway-creator">
  <button id="javascript-svg-pathway-button" class="pathway" onclick="displayDiv('javascript-svg')" style="background-color: yellow">pathvisio SVG</button>
  <button id="java-svg-pathway-button" class="pathway" onclick="displayDiv('java-svg')" style="background-color: lightgray" title="SVG representation of GPML file, as created by PathVisio (Java), using Batik">PathVisio (Java) SVG</button>
  <button id="java-png-pathway-button" class="pathway" onclick="displayDiv('java-png')" style="background-color: lightgray" title="PNG representation of GPML file, as created by PathVisio (Java)">PathVisio (Java) PNG</button>
  <button id="xml-gpml-pathway-button" class="pathway" onclick="displayDiv('xml-gpml')" style="background-color: lightgray" title="XML version of source GPML file">GPML (XML)</button>
  <button id="json-gpml-pathway-button" class="pathway" onclick="displayDiv('json-gpml')" style="background-color: lightgray" title="JSON version of source GPML file">JSON</button>
Repo: 
<?php
  $authorizedRepos = array("wikipathways", "AlexanderPico", "ariutta", "khanspers");
  $repo = "wikipathways";

  if (isset($_GET['repo'])) {
    if (in_array($_GET['repo'], $authorizedRepos)) {
      $repo = htmlspecialchars($_GET['repo']);
    }
  }

  if ($_GET['repo'] == "local") {
    $pathwayTemplateSvgUri = "pathway-template.svg";
    $pathwayTemplateSvgUriEditable = "pathway-template.svg";
  }
  else {
    $pathwayTemplateSvgUri = "https://raw.github.com/" . $repo . "/pathvisio/dev/src/views/pathway-template.svg";
    $pathwayTemplateSvgUriEditable = "https://github.com/" . $repo . "/pathvisio/blob/dev/src/views/pathway-template.svg";
  }

  if (isset($_GET['pwId'])) {
    echo "<script>var local = false</script>";
    $pwId = htmlspecialchars($_GET['pwId']);
    $pathwayUriParamStr = "pwId=" . $pwId;

    $batikSvgUri = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=svg&pwTitle=Pathway:" . $pwId . "&revision=0";
    $pngUri = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:" . $pwId . "&revision=0";

    $pathwayUri = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:" . $pwId;
  }
  elseif (isset($_GET['pathwayUri'])) {
    echo "<script>var local = true</script>";
    $pathwayUri = htmlspecialchars($_GET['pathwayUri']);
    $pathwayUriParamStr = "pathwayUri=" . $pathwayUri;
    $batikSvgUri = str_replace(".gpml", ".svg", htmlspecialchars($_GET['pathwayUri']));
    $pngUri = str_replace(".gpml", ".png", htmlspecialchars($_GET['pathwayUri']));
  }

  foreach($authorizedRepos as $value){
    if ($value == $repo) {
        $html .= "<option value='./?" . $pathwayUriParamStr . "&repo=" . $value . "' selected='selected'>$value</key>";
    }
    else {
        $html .= "<option value='./?" . $pathwayUriParamStr . "&repo=" . $value . "'>$value</key>";
    }
  }

  echo "<select name='repo' onChange='document.location = this.value' value='GO'>$html</select>";
?>
</div> 
<p>If you would like to edit the symbols (shapes), markers (arrowheads), colors or other properties of the pathvisio pathway template, let Anders or Alex know. When you are added as an authorized user, you can edit your 
<?php
  echo "<a href='" . $pathwayTemplateSvgUriEditable . "'>"
?>
SVG pathway template file</a> in the <span style="font-weight: bold">DEV</span> branch of your github fork of <a href="https://github.com/wikipathways/pathvisio">pathvisio</a>, commit, and view your changes on this page. Note that your commits on Github may take a few seconds before they show up here.</p>

<?php

  // pathvisio SVG. This is the svg template file from the dev branch of wikipathways (or whichever repo is chosen)/pathvisio on github.

  // Is the code below ok wrt to security? I am using the other code block below with only approved repos, but it's more hassle to add new repos
  // instead of them always working automatically.
    
  // if (isset($_GET['repo'])) {
  //   $repo = $_GET['repo'];
  // }

  echo "<div id='javascript-svg-diagram-container' class='pathway'>";
    $pathwayTemplateSvg = simplexml_load_file($pathwayTemplateSvgUri);
    echo $pathwayTemplateSvg->saveXML();
  echo "</div>";

  // PathVisio (Java) SVG

  $batikSvg = simplexml_load_file($batikSvgUri);

  echo "<div id='java-svg-diagram-container' class='pathway' style='display: none;'>";
    echo $batikSvg->saveXML();
  echo "</div>";
 
  echo "<div id='java-png-diagram-container' class='pathway' style='display: none;'>";
    echo '<img id="img" src="' . $pngUri . '"/>';
  echo "</div>";

  // XML GPML (from either wikipathways.org REST API or local /test/gpml/ folder)

  $gpmlStr = file_get_contents($pathwayUri);
  $doc = new DOMDocument();
  $doc->loadXML($gpmlStr);

  echo "<div id='xml-gpml-diagram-container' class='pathway' style='display:none'>";

    // need to use LIBXML_NOEMPTYTAG option, because it appears Chrome will incorrectly close the self-closing tags in gpml.

    echo "<textarea name='gpml-for-reading' id='gpml-for-reading' rows='40' cols='180'>" . $doc->saveXML(null, LIBXML_NOEMPTYTAG) . "</textarea>";
    echo "<div id='xml-gpml-in-dom' style='display:none'>";
      echo $doc->saveXML(null, LIBXML_NOEMPTYTAG);
    echo "</div>";
  echo "</div>";

  // JSON GPML 

  echo "<div id='json-gpml-diagram-container' class='pathway' style='display:none'>";
    echo "<textarea name='json-gpml-for-reading' id='json-gpml-for-reading' rows='40' cols='180'>Not yet implemented.</textarea>";
  echo "</div>";

?>

<script src="../js/pathvisio/pathvisio"></script>
<script src="../js/pathvisio/pathway/pathway.js"></script>
<script src="../js/pathvisio/pathway/edge/edge.js"></script>
<script src="../js/pathvisio/pathway/edge/path-data.js"></script>
<script src="../js/pathvisio/pathway/edge/marker.js"></script>
<script src="../js/pathvisio/pathway/edge/point.js"></script>

<script src="../js/pathvisio/pathway/info-box.js"></script>
<script src="../js/pathvisio/pathway/group.js"></script>
<script src="../js/pathvisio/pathway/node.js"></script>

<script src="../js/pathvisio/utilities.js"></script>
<script src="../lib/rgb-color/rgb-color.js"></script>

<script src="../js/jxon.js"></script>
<script src="../lib/jquery/jquery.js"></script>
<script src="../lib/d3/d3.js" charset="utf-8"></script>

<script>
  function insertParam(key, value)
  {
      key = encodeURI(key); value = encodeURI(value);

      var kvp = document.location.search.substr(1).split('&');

      var i=kvp.length; var x; while(i--) 
      {
          x = kvp[i].split('=');

          if (x[0]==key)
          {
              x[1] = value;
              kvp[i] = x.join('=');
              break;
          }
      }

      if(i<0) {kvp[kvp.length] = [key,value].join('=');}

      //this will reload the page, it's likely better to store this until finished
      document.location.search = kvp.join('&'); 
      //document.location.search = kvp.join('&'); 
  }

  window.onload = function() {
    //pathway.load('#pathway-image', '../../test/gpml/fill-and-stroke-colors.gpml');
    //pathway.load('#pathway-image', '../../test/gpml/shapes.gpml');
    pathvisio.pathway.load('#pathway-image', uri);

    //pathvisio.drawFromUri('#pathway-image', uri, 'gpml+xml');
    //var sJson = JSON.stringify(pathway, undefined, 2);
    //$('#json-gpml-for-reading').text(sJson);

    /*

    // I wanted to make the pathvisio SVG, the PathVisio (Java) SVG and the PathVisio (Java) PNG all the same size.
    // But the code below does not work.

    var javaScriptSvgWidth = self.javaScriptSvgWidth = $('#javascript-svg-diagram-container svg')[0].getAttribute('width');
    //console.log('javaScriptSvgWidth');
    //console.log(javaScriptSvgWidth);
    var javaScriptSvgHeight = self.javaScriptSvgHeight = $('#javascript-svg-diagram-container svg')[0].getAttribute('height');
    //console.log('javaScriptSvgHeight');
    //console.log(javaScriptSvgHeight);

    var javaScriptSvgBBoxWidth = self.javaScriptSvgBBoxWidth = $('#javascript-svg-diagram-container svg')[0].getBBox().width;
    //console.log('javaScriptSvgBBoxWidth');
    //console.log(javaScriptSvgBBoxWidth);
    var javaScriptSvgBBoxHeight = self.javaScriptSvgBBoxHeight = $('#javascript-svg-diagram-container svg')[0].getBBox().height;
    //console.log('javaScriptSvgBBoxHeight');
    //console.log(javaScriptSvgBBoxHeight);

    var javaPngWidth = self.javaPngWidth =  $('#java-png-diagram-container img')[0].getAttribute('width');
    var javaPngHeight = self.javaPngHeight =  $('#java-png-diagram-container img')[0].getAttribute('height');

    var javaPngBBoxWidth = self.javaPngBBoxWidth = $('#java-png-diagram-container img')[0].getBoundingClientRect().width;
    //console.log('javaPngBBoxWidth');
    //console.log(javaPngBBoxWidth);
    var javaPngBBoxHeight = self.javaPngBBoxHeight = $('#java-png-diagram-container img')[0].getBoundingClientRect().height;
    var correctionFactor =  javaScriptSvgBBoxHeight / javaPngBBoxHeight;

    if (local === true) {
      //$('#java-png-diagram-container img')[0].setAttribute('width', (javaScriptSvgBBoxWidth) + "px");
      //$('#java-png-diagram-container img')[0].setAttribute('height', (javaScriptSvgBBoxHeight) + "px");
    }
    else {
      //$('#java-png-diagram-container img')[0].setAttribute('width', (javaScriptSvgWidth) + "px");
      //$('#java-png-diagram-container img')[0].setAttribute('height', (javaScriptSvgHeight) + "px");
      //$('#java-png-diagram-container img')[0].setAttribute('width', (2 * javaScriptSvgBBoxWidth) + "px");
      //$('#java-png-diagram-container img')[0].setAttribute('height', (2 * javaScriptSvgBBoxHeight) + "px");
      //$('#java-png-diagram-container img')[0].setAttribute('width', (javaPngBBoxWidth * (javaScriptSvgWidth / javaPngBBoxWidth)) + "px");
      //$('#java-png-diagram-container img')[0].setAttribute('height', (javaPngBBoxHeight * (javaScriptSvgHeight / javaPngBBoxHeight)) + "px");
    };

    /*
    $('#java-png-diagram-container img')[0].setAttribute('width', (javaPngWidth * correctionFactor) + "px");
    $('#java-png-diagram-container img')[0].setAttribute('height', (javaPngHeight * correctionFactor) + "px");
     */

    /*
    $('#java-png-diagram-container img')[0].setAttribute('width', (javaScriptSvgBBoxWidth) + "px");
    $('#java-png-diagram-container img')[0].setAttribute('height', (javaScriptSvgBBoxHeight) + "px");

    var javaScriptSvgWidth = $('#javascript-svg-diagram-container svg')[0].getAttribute('width');
    var javaScriptSvgHeight = $('#javascript-svg-diagram-container svg')[0].getAttribute('height');
    $('#java-png-diagram-container img')[0].setAttribute('width', 0.985*width + "px");
    $('#java-png-diagram-container img')[0].setAttribute('height', 0.985*height + "px");

    //*/

  };

  function displayDiv(creator) {
    $('button.pathway').each(function(i) {
      this.style.backgroundColor = 'lightgray';
    });
    $('#' + creator + '-pathway-button')[0].style.backgroundColor = 'yellow';

    $('div.pathway').each(function(i) {
      this.style.display = 'none';
    });
    $('#' + creator + "-diagram-container")[0].style.display = 'block';
    $('#json-gpml-for-reading').text(sJson);
  };
</script>
</body>
