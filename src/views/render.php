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


</head>
<body>
<script>
var repo = pathvisio.helpers.getUrlParam('repo');
if (!!url) {
  var url = pathvisio.helpers.getUrlParam('url');
}
else {
  if (!!pathvisio.helpers.getUrlParam('id')) {
    var url = 'http://pointer.ucsf.edu/d3/r/pathvisio.js/src/views/gpml.php?id=' + pathvisio.helpers.getUrlParam('id');
  };
};
</script>

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
    $pathwayTemplateSvgUrl = "https://raw.github.com/" . $repo . "/pathvisio.js/dev/src/views/pathway-template.svg";
    $pathwayTemplateSvgUrlEditable = "https://github.com/" . $repo . "/pathvisio.js/blob/dev/src/views/pathway-template.svg";
  }

  echo "<div id='javascript-svg-pathway-container' class='pathway'>";
    $pathwayTemplateSvg = simplexml_load_file($pathwayTemplateSvgUrl);
    echo $pathwayTemplateSvg->saveXML();
  echo "</div>";

?>

<script src="../js/pathvisio/pathvisio.js"></script>
<script src="../js/pathvisio/pathway/pathway.js"></script>
<script src="../js/pathvisio/pathway/edge/edge.js"></script>
<script src="../js/pathvisio/pathway/edge/path-data.js"></script>
<script src="../js/pathvisio/pathway/edge/marker.js"></script>
<script src="../js/pathvisio/pathway/edge/point.js"></script>

<script src="../js/pathvisio/pathway/info-box.js"></script>
<script src="../js/pathvisio/pathway/group.js"></script>
<script src="../js/pathvisio/pathway/labelable-element.js"></script>

<script src="../js/pathvisio/helpers.js"></script>
<script src="../js/rgbcolor.js"></script>

<script src="../js/case-converter.js"></script>
<script src="../js/xml2json.js"></script>
<script src="../lib/jquery/jquery.js"></script>
<script src="../lib/d3/d3.js" charset="utf-8"></script>

<script>
  window.onload = function() {
    pathvisio.pathway.load('#pathway-image', url);
  };
</script>
</body>
