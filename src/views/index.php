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

<script src="../js/gpml2json/gpml2json.js"></script>
<script src="../js/gpml2json/jxon.js"></script>

<script src="../js/rgbcolor.js"></script>

<script src="../js/draw-pathway/draw-pathway.js"></script>
<script src="../js/draw-pathway/clone.js"></script>
<script src="../js/draw-pathway/get-url-parameter.js"></script>
<script src="../js/draw-pathway/get-marker.js"></script>
<script src="../js/draw-pathway/edge-terminus.js"></script>
<script src="../js/draw-pathway/get-path-data.js"></script>
<script src="../js/draw-pathway/get-element-coordinates.js"></script>
<script src="../js/draw-pathway/draw-edges.js"></script>
<script src="../js/draw-pathway/draw-info-box.js"></script>
<script src="../js/draw-pathway/draw-groups.js"></script>
<script src="../js/draw-pathway/draw-labelable-elements.js"></script>


<script src="../lib/jquery/jquery.js"></script>
<script src="../lib/d3/d3.js" charset="utf-8"></script>
</head>
<body>
<!--
<script>
function getUrlParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
};
var repo = getUrlParameter('repo');
</script>
-->

<div id="choose-pathway-creator">
  <button id="javascript-svg-pathway-button" class="pathway" onclick="usePathwayImgCreator('javascript-svg')" style="background-color: yellow">pathvisio.js SVG</button>
  <button id="java-svg-pathway-button" class="pathway" onclick="usePathwayImgCreator('java-svg')" style="background-color: lightgray" title="Batik is currently used by PathVisio (Java) to create visual representations of GPML files in SVG and PDF">PathVisio (Java) SVG</button>
  <button id="java-png-pathway-button" class="pathway" onclick="usePathwayImgCreator('java-png')" style="background-color: lightgray" title="Batik is currently used by PathVisio (Java) to create visual representations of GPML files in SVG and PDF">PathVisio (Java) PNG</button>
Repo: 
<?php
  $authorizedRepos = array("wikipathways", "AlexanderPico", "ariutta", "khanspers");
  $repo = "wikipathways";

  if (isset($_GET['repo'])) {
    if (in_array($_GET['repo'], $authorizedRepos)) {
      $repo = htmlspecialchars($_GET['repo']);
    }
  }

  $pathwayTemplateSvgUrl = "https://raw.github.com/" . $repo . "/pathvisio.js/dev/src/views/pathway-template.svg";
  $pathwayTemplateSvgUrlEditable = "https://github.com/" . $repo . "/pathvisio.js/blob/dev/src/views/pathway-template.svg";

  if (isset($_GET['pwId'])) {
    echo "<script>var local = false</script>";
    $pwId = htmlspecialchars($_GET['pwId']);
    $pathwayUrlParamStr = "pwId=" . $pwId;

    $batikSvgUrl = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=svg&pwTitle=Pathway:" . $pwId . "&revision=0";
    $pngUrl = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:" . $pwId . "&revision=0";

    $pathwayUrl = "http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:" . $pwId;
  }
  elseif (isset($_GET['pathwayUrl'])) {
    echo "<script>var local = true</script>";
    $pathwayUrl = htmlspecialchars($_GET['pathwayUrl']);
    $pathwayUrlParamStr = "pathwayUrl=" . $pathwayUrl;
    $batikSvgUrl = str_replace(".gpml", ".svg", htmlspecialchars($_GET['pathwayUrl']));
    $pngUrl = str_replace(".gpml", ".png", htmlspecialchars($_GET['pathwayUrl']));
  }

  foreach($authorizedRepos as $value){
    if ($value == $repo) {
        $html .= "<option value='./?" . $pathwayUrlParamStr . "&repo=" . $value . "' selected='selected'>$value</key>";
    }
    else {
        $html .= "<option value='./?" . $pathwayUrlParamStr . "&repo=" . $value . "'>$value</key>";
    }
  }

  echo "<select name='repo' onChange='document.location = this.value' value='GO'>$html</select>";
?>
</div> 
<p>If you would like to edit the symbols (shapes), markers (arrowheads), colors or other properties of the pathvisio.js pathway template, let Anders or Alex know. When you are added as an authorized user, you can edit your 
<?php
  echo "<a href='" . $pathwayTemplateSvgUrlEditable . "'>"
?>
SVG pathway template file</a> in the <span style="font-weight: bold">DEV</span> branch of your github fork of <a href="https://github.com/wikipathways/pathvisio.js">pathvisio.js</a>, commit, and view your changes on this page. Note that your commits on Github may take a few seconds before they show up here.</p>

<!--
<div>
Repo from which to pull pathway template svg: <INPUT id="repo" type="text" SIZE="30" MAXLENGTH="30" VALUE="wikipathways">
<button class="link" onclick="insertParam('repo', repo)">Reload pathway template svg</button> 
</div>
-->

<!--<div id="javascript-svg-pathway-container" class="pathway" onload="usePathwayImgCreator('javascript-svg')">-->

<div id="javascript-svg-pathway-container" class="pathway">
  <?php
    //$pathwayTemplateSvgUrl = "https://raw.github.com/wikipathways/pathvisio.js/dev/src/views/pathway-template.svg";
    //$pathwayTemplateSvg = file_get_contents($pathwayTemplateSvgUrl);
    //$imageData = base64_encode($pathwayTemplateSvg);
    //echo "<object id='pathway-container' type='image/svg+xml' data='" . $imageData . "' width='100%' height='100%' onload='drawPathway()'>";

    //Is the code below ok wrt to security?
    //
    //if (isset($_GET['repo'])) {
    //  $repo = $_GET['repo'];
    //}

    $pathwayTemplateSvg = simplexml_load_file($pathwayTemplateSvgUrl);
    echo $pathwayTemplateSvg->saveXML();

  ?>
</div>

<?php

  $batikSvg = simplexml_load_file($batikSvgUrl);

  echo "<div id='java-svg-pathway-container' class='pathway' style='display: none;'>";
    echo $batikSvg->saveXML();
  echo "</div>";

  //$im = imagecreatefrompng($pngUrl);
  //header('Content-Type: image/png');
  

  echo "<div id='java-png-pathway-container' class='pathway' style='display: none;'>";
  //echo "<div id='java-png-pathway-container' class='pathway'>";
    echo '<img id="img" src="' . $pngUrl . '"/>';
    //$server_response = base64_encode(file_get_contents($pngUrl));
    //echo '<img id="img" src="data:image/png;base64,' . $server_response . '"/>';
  echo "</div>";

  $gpmlStr = file_get_contents($pathwayUrl);
  $doc = new DOMDocument();
  $doc->loadXML($gpmlStr);

  echo "<div id='gpml' style='display:none'>";

  // need to do this, because it appears Chrome will incorrectly close the self-closing tags in gpml.

  echo $doc->saveXML(null, LIBXML_NOEMPTYTAG);
  echo "</div>";

  //$gpml = simplexml_load_file($pathwayUrl);
  // output the result
  //echo $gpml->asXML();

?>

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
    drawPathway();

    var javaScriptSvgWidth = self.javaScriptSvgWidth = $('#javascript-svg-pathway-container svg')[0].getAttribute('width');
    console.log('javaScriptSvgWidth');
    console.log(javaScriptSvgWidth);
    var javaScriptSvgHeight = self.javaScriptSvgHeight = $('#javascript-svg-pathway-container svg')[0].getAttribute('height');
    //console.log('javaScriptSvgHeight');
    //console.log(javaScriptSvgHeight);

    var javaScriptSvgBBoxWidth = self.javaScriptSvgBBoxWidth = $('#javascript-svg-pathway-container svg')[0].getBBox().width;
    console.log('javaScriptSvgBBoxWidth');
    console.log(javaScriptSvgBBoxWidth);
    var javaScriptSvgBBoxHeight = self.javaScriptSvgBBoxHeight = $('#javascript-svg-pathway-container svg')[0].getBBox().height;
    //console.log('javaScriptSvgBBoxHeight');
    //console.log(javaScriptSvgBBoxHeight);

    var javaPngWidth = self.javaPngWidth =  $('#java-png-pathway-container img')[0].getAttribute('width');
    var javaPngHeight = self.javaPngHeight =  $('#java-png-pathway-container img')[0].getAttribute('height');

    var javaPngBBoxWidth = self.javaPngBBoxWidth = $('#java-png-pathway-container img')[0].getBoundingClientRect().width;
    console.log('javaPngBBoxWidth');
    console.log(javaPngBBoxWidth);
    var javaPngBBoxHeight = self.javaPngBBoxHeight = $('#java-png-pathway-container img')[0].getBoundingClientRect().height;
    var correctionFactor =  javaScriptSvgBBoxHeight / javaPngBBoxHeight;

    if (local === true) {
      //$('#java-png-pathway-container img')[0].setAttribute('width', (javaScriptSvgBBoxWidth) + "px");
      //$('#java-png-pathway-container img')[0].setAttribute('height', (javaScriptSvgBBoxHeight) + "px");
    }
    else {
      //$('#java-png-pathway-container img')[0].setAttribute('width', (javaScriptSvgWidth) + "px");
      //$('#java-png-pathway-container img')[0].setAttribute('height', (javaScriptSvgHeight) + "px");
      //$('#java-png-pathway-container img')[0].setAttribute('width', (2 * javaScriptSvgBBoxWidth) + "px");
      //$('#java-png-pathway-container img')[0].setAttribute('height', (2 * javaScriptSvgBBoxHeight) + "px");
      //$('#java-png-pathway-container img')[0].setAttribute('width', (javaPngBBoxWidth * (javaScriptSvgWidth / javaPngBBoxWidth)) + "px");
      //$('#java-png-pathway-container img')[0].setAttribute('height', (javaPngBBoxHeight * (javaScriptSvgHeight / javaPngBBoxHeight)) + "px");
    };

    /*
    $('#java-png-pathway-container img')[0].setAttribute('width', (javaPngWidth * correctionFactor) + "px");
    $('#java-png-pathway-container img')[0].setAttribute('height', (javaPngHeight * correctionFactor) + "px");
     */

    /*
    $('#java-png-pathway-container img')[0].setAttribute('width', (javaScriptSvgBBoxWidth) + "px");
    $('#java-png-pathway-container img')[0].setAttribute('height', (javaScriptSvgBBoxHeight) + "px");

    var javaScriptSvgWidth = $('#javascript-svg-pathway-container svg')[0].getAttribute('width');
    var javaScriptSvgHeight = $('#javascript-svg-pathway-container svg')[0].getAttribute('height');
    $('#java-png-pathway-container img')[0].setAttribute('width', 0.985*width + "px");
    $('#java-png-pathway-container img')[0].setAttribute('height', 0.985*height + "px");
     */
  };

  function usePathwayImgCreator(creator) {
    $('button.pathway').each(function(i) {
      this.style.backgroundColor = 'lightgray';
    });
    $('#' + creator + '-pathway-button')[0].style.backgroundColor = 'yellow';

    $('div.pathway').each(function(i) {
      this.style.display = 'none';
    });
    $('#' + creator + "-pathway-container")[0].style.display = 'block';
  };
</script>
</body>
