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
<script src="../lib/jquery/jquery.js"></script>
<script src="../lib/d3/d3.js" charset="utf-8"></script>
<script>
  $(window).on('load', function () {
    $('div.pathway').each(function(i) {
      this.style.display = 'none';
    });
    $('#pathvisio-js-dev-container').show();
    var accountInput = $( "#account" );
    var branchInput = $( "#branch" );
    accountInput.change(function() {
      if (branchInput.val() != 'master') {
        branchInput.val('master');
        branchInput.attr('placeholder', 'e.g., master');
        branchInput.attr('style', 'background-color: pink');
      }
    });
    branchInput.focus(function() {
      branchInput.attr('style', '');
    });
  });

  function displayDiv(creator) {
    var chooseSourceDataForm = $('#choose-source-data');
    if (creator === 'pathvisio-js-dev') {
      chooseSourceDataForm.show();
    }
    else {
      chooseSourceDataForm.hide();
    }
    $('button.pathway').each(function(i) {
      this.style.backgroundColor = 'lightgray';
    });
    $('#' + creator + '-button')[0].style.backgroundColor = 'yellow';

    $('div.pathway').each(function(i) {
      this.style.display = 'none';
    });
    $('#' + creator + "-container")[0].style.display = 'block';
    $('#gpml-for-reading').text(sGpml);
    $('#json-for-reading').text(sJson);
  };
</script>

<div id="choose-viewer">
  <button id="pathvisio-js-dev-button" class="pathway" title="SVG viewer for all modern browsers (Dev Version)" onclick="displayDiv('pathvisio-js-dev')" style="background-color: yellow">pathvisio.js (DEV)</button>
  <button id="pathvisio-js-prod-button" class="pathway" title="SVG viewer for all modern browsers" onclick="displayDiv('pathvisio-js-prod')" style="background-color: lightgray">pathvisio.js (PROD)</button>
  <button id="pathvisio-js-prod-old-browsers-button" class="pathway" title="PNG viewer for old browsers like IE8" onclick="displayDiv('pathvisio-js-prod-old-browsers')" style="background-color: lightgray">pathvisio.js (PROD for old browsers)</button>
  <button id="current-wiki-pathways-widget-button" class="pathway" title="Pathway widget currently in use on www.wikipathways.org" onclick="displayDiv('current-wiki-pathways-widget')" style="background-color: lightgray">Current WP Viewer</button>
<!--  <button id="pathvisio-java-svg-button" class="pathway" onclick="displayDiv('pathvisio-java-svg')" style="background-color: lightgray" title="SVG representation of GPML file, as created by PathVisio (Java), using Batik">PathVisio (Java) SVG</button>-->
  <button id="pathvisio-java-png-button" class="pathway" onclick="displayDiv('pathvisio-java-png')" style="background-color: lightgray" title="PNG representation of GPML file, as created by PathVisio (Java)">PathVisio (Java) PNG</button>
<!--
  <button id="gpml-button" class="pathway" onclick="displayDiv('gpml')" style="background-color: lightgray" title="Source GPML">GPML (XML)</button>
  <button id="json-button" class="pathway" onclick="displayDiv('json')" style="background-color: lightgray" title="Formatted JSON">JSON</button>
-->
<?php
  $gpml = "WP4";
  if (isset($_GET['gpml'])) {
    $gpmlParam = htmlspecialchars($_GET['gpml']);
    if ($gpmlParam != "null") {
      $gpml = $gpmlParam;
    }
  }

  $account = "wikipathways";
  if (isset($_GET['account'])) {
    $accountParam = htmlspecialchars($_GET['account']);
    if ($accountParam != "null") {
      $account = $accountParam;
    }
  }

  if (isset($_GET['branch'])) {
    $branch = htmlspecialchars($_GET['branch']);
  }
  else {
    $branch = "dev";
  }

  $srcFolderUrl = "https://github.com/" . $account . "/pathvisio.js/tree/" . $branch . "/src/";
  $gpmlUrl = "http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:" . $gpml . "&revision=0";
  $pathvisioJsDevUrl = "pathvisio-js-dev.html?gpml=" . $_GET['gpml'] . "&account=" . $account . "&branch=" . $branch . "&svgView=1";
  $pathvisioJsProdUrl = "pathvisio-js-prod.html?gpml=" . $_GET['gpml'] . "&account=" . $account . "&branch=" . $branch . "&svgView=1";
  $pathvisioJsProdOldBrowsersUrl = "../src/views/pathvisio-js.html?gpml=" . $_GET['gpml'] . "&account=" . $account . "&branch=" . $branch . "&svgView=0";
  $currentWikiPathwaysWidgetUrl = "http://www.wikipathways.org/wpi/PathwayWidget.php?id=" . $gpml;
  $pathvisioJavaSvgUrl = "http://test3.wikipathways.org//wpi/wpi.php?action=downloadFile&type=svg&pwTitle=Pathway:" . $gpml . "&revision=0";
  $pathvisioJavaPngUrl = "http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:" . $gpml . "&revision=0";

  echo '<form id="choose-source-data" action="#" method="get">';
      echo 'GPML: <input type="text" id="gpml" name="gpml" value="' . $gpml . '" />';
      echo 'Account: <input type="text" id="account" name="account" value="' . $account . '" />';
      echo 'Branch: <input type="text" id="branch" name="branch" value="' . $branch . '" />';
  echo '<input type="submit" value="Submit" />';
  echo '</form>';
?>
</div> 

<p>This pathvisio.js test and development site allows you to edit the pathvisio.js code online at Github and view the results right here in the <b>pathvisio.js (DEV)</b> frame below. To get started, fork the <a href="https://github.com/wikipathways/pathvisio.js">pathvisio.js repo</a> and ask Anders or Alex to add you as an authorized user (authorized users array is in <a href="https://github.com/wikipathways/pathvisio.js/blob/master/remote-data-sources/php/github.php">github.php</a>). If you've already forked the pathvisio.js repo, be sure to pull the latest changes from the master branch of the wikipathways pathvisio.js repo (yourAccount::yourBranch ... wikipathways::master). Then edit the code in any of the files in the <a href="
<?php
 echo $srcFolderUrl;
?>
">"src" folder</a> of your Github fork of pathvisio.js and commit your changes on Github. (You may need to wait a second after committing for Github to apply your changes.) To see the result, return to this page, enter your Account and Branch above and click "Submit." When you're done editing, you can create a pull request on Github (wikipathways::master ... yourAccount::yourBranch) to merge your changes into the master branch of the wikipathways pathvisio.js repo.</p>

<?php

  // pathvisio.js pathway SVG

  /*
  echo "<div id='pathvisio-js-prod-container' class='pathway''>";
    $pathwayTemplateSvg = file_get_contents($pathwayTemplateSvgUrl);
    echo $pathwayTemplateSvg;
  echo "</div>";
  //*/
  
  ///*
  echo "<div id='pathvisio-js-dev-container' class='pathway'>";
	echo '<iframe src="' . $pathvisioJsDevUrl . '" width="70%" height="1000">';
	 echo '<p>Your browser does not support iframes.</p>';
	echo '</iframe>';
  echo "</div>";
  //*/

   ///*
  echo "<div id='pathvisio-js-prod-container' class='pathway'>";
	echo '<iframe src="' . $pathvisioJsProdUrl . '" width="70%" height="1000">';
	 echo '<p>Your browser does not support iframes.</p>';
	echo '</iframe>';
  echo "</div>";
  //*/
 
  ///*
  echo "<div id='pathvisio-js-prod-old-browsers-container' class='pathway'>";
	echo '<iframe src="' . $pathvisioJsProdOldBrowsersUrl . '" width="70%" height="1000">';
	 echo '<p>Your browser does not support iframes.</p>';
	echo '</iframe>';
  echo "</div>";
  //*/
 
  // PathVisio (Java) PNG

  echo "<div id='pathvisio-java-png-container' class='pathway'>";
    echo '<img id="img" src="' . $pathvisioJavaPngUrl . '"/>';
  echo "</div>";

  // PathVisio (Java) SVG

  /*
  $pathvisioJavaSvg = simplexml_load_file($pathvisioJavaSvg);
  echo "<div id='pathvisio-java-svg-container' class='pathway' style='display: none;'>";
    echo $pathvisioJavaSvg->saveXML();
  echo "</div>";
   */
  
  ///*
  echo "<div id='current-wiki-pathways-widget-container' class='pathway'>";
	echo '<iframe src="' . $currentWikiPathwaysWidgetUrl . '" width="70%" height="1000" style="overflow:hidden;">';
	 echo '<p>Your browser does not support iframes.</p>';
	echo '</iframe>';
  echo "</div>";
  //*/

  echo "<div id='gpml-container' class='pathway'>";

    // need to use LIBXML_NOEMPTYTAG option, because it appears Chrome will incorrectly close the self-closing tags in gpml.

    $gpml = simplexml_load_file($gpmlUrl);
    echo "<textarea id='gpml-for-reading' rows='40' cols='180'>" . $gpml->saveXML(null, LIBXML_NOEMPTYTAG) . "</textarea>";
  echo "</div>";

  // JSON GPML 

  echo "<div id='json-container' class='pathway'>";
    echo "<textarea id='json-for-reading' rows='40' cols='180'>Not yet implemented.</textarea>";
  echo "</div>";

?>
<script src="../lib/rgb-color/rgb-color.min.js"></script>
<script src="../lib/case-converter/case-converter.min.js"></script>
<script src="../lib/xml2json/xml2json.min.js"></script>

<script src="../build/js/pathvisio.min.js"></script>

<script src="../lib/d3/d3.min.js" charset="utf-8"></script>
<script>
/*
  pathvisio.pathway.getJson(gpmlUrl, function(pathway) {
    //getPng(pathway);
  });
//*/
</script>
</body>
