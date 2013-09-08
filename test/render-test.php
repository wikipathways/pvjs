<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>pathvisio.js test renderer</title>

<!-- 
Style guides can be arbitrary, but for sake of consistency within this project, let's use these:
http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
http://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml#General_Guidelines
-->


</head>
<body>

<script src="../src/lib/jquery/jquery.js"></script>
<script src="../src/lib/d3/d3.js" charset="utf-8"></script>

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
  };

  function displayDiv(creator) {
    $('button.pathway').each(function(i) {
      this.style.backgroundColor = 'lightgray';
    });
    $('#' + creator + '-pathway-button')[0].style.backgroundColor = 'yellow';

    $('div.pathway').each(function(i) {
      this.style.display = 'none';
    });
    $('#' + creator + "-pathway-container")[0].style.display = 'block';
    $('#gpml-for-reading').text(sGpml);
    $('#json-for-reading').text(sJson);
  };
var repo = pathvisio.helpers.getUrlParam('repo');
var id = pathvisio.helpers.getUrlParam('id');
</script>

<div id="choose-pathway-creator">
  <button id="javascript-svg-pathway-button" class="pathway" onclick="displayDiv('javascript-svg')" style="background-color: yellow">pathvisio.js SVG</button>
<!--  <button id="java-svg-pathway-button" class="pathway" onclick="displayDiv('java-svg')" style="background-color: lightgray" title="SVG representation of GPML file, as created by PathVisio (Java), using Batik">PathVisio (Java) SVG</button>-->
  <button id="java-png-pathway-button" class="pathway" onclick="displayDiv('java-png')" style="background-color: lightgray" title="PNG representation of GPML file, as created by PathVisio (Java)">PathVisio (Java) PNG</button>
  <button id="gpml-pathway-button" class="pathway" onclick="displayDiv('gpml')" style="background-color: lightgray" title="Source GPML">GPML (XML)</button>
  <button id="json-pathway-button" class="pathway" onclick="displayDiv('json')" style="background-color: lightgray" title="Formatted JSON">JSON</button>
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

  if (isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);
    $batikSvgUrl = "http://test3.wikipathways.org//wpi/wpi.php?action=downloadFile&type=svg&pwTitle=Pathway:" . $id . "&revision=0";
    $pngUrl = "http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:" . $id . "&revision=0";
    $gpmlUrl = "http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:" . $id . "&revision=0";
    $pathwayUrl = "http://test3.wikipathways.org/wpi/PathwayWidget.php?id=" . $id . "&repo=" . $repo;
  }

  foreach($authorizedRepos as $value){
    if ($value == $repo) {
        $html .= "<option value='./render-test.php?id=" . $id . "&repo=" . $value . "' selected='selected'>$value</key>";
    }
    else {
        $html .= "<option value='./render-test.php?id=" . $id . "&repo=" . $value . "'>$value</key>";
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

<?php

  // pathvisio.js pathway SVG

  echo "<div id='javascript-svg-pathway-container' class='pathway''>";
    $pathwayTemplateSvg = file_get_contents($pathwayTemplateSvgUrl);
    echo $pathwayTemplateSvg;
  echo "</div>";
  
  /*
  echo "<div id='javascript-svg-pathway-container' class='pathway''>";
	echo '<iframe src="' . $pathwayUrl . '" width="100%" height="800">';
	 echo '<p>Your browser does not support iframes.</p>';
	echo '</iframe>';
  echo "</div>";
  */
 
  // PathVisio (Java) PNG

  echo "<div id='java-png-pathway-container' class='pathway' style='display: none;'>";
    echo '<img id="img" src="' . $pngUrl . '"/>';
  echo "</div>";

  // PathVisio (Java) SVG

  /*
  $batikSvg = simplexml_load_file($batikSvg);
  echo "<div id='java-svg-pathway-container' class='pathway' style='display: none;'>";
    echo $batikSvg->saveXML();
  echo "</div>";
   */

  echo "<div id='gpml-pathway-container' class='pathway' style='display:none'>";

    // need to use LIBXML_NOEMPTYTAG option, because it appears Chrome will incorrectly close the self-closing tags in gpml.

    $gpml = simplexml_load_file($gpmlUrl);
    echo "<textarea id='gpml-for-reading' rows='40' cols='180'>" . $gpml->saveXML(null, LIBXML_NOEMPTYTAG) . "</textarea>";
  echo "</div>";

  // JSON GPML 

  echo "<div id='json-pathway-container' class='pathway' style='display:none'>";
    echo "<textarea id='json-for-reading' rows='40' cols='180'>Not yet implemented.</textarea>";
  echo "</div>";

?>
  <script src="../src/lib/jquery/jquery.js"></script>
  <script src="../src/lib/d3/d3.js" charset="utf-8"></script>

  <script src="../build/js/pathvisio.js"></script>
<script>
  window.onload = function() {
<?php echo "pathvisio.pathway.load('#pathway-image', '" . $gpmlUrl . "');"; ?>
  };
</script>
</body>
