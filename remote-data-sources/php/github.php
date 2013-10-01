<?php
$repo = "wikipathways";
if (isset($_GET['repo'])) {
  if ($_GET['repo'] != "null") {
    $repo = htmlspecialchars($_GET['repo']);
  }
}

$branch = "dev";
if (isset($_GET['branch'])) {
  if ($_GET['branch'] != "null") {
    $branch = htmlspecialchars($_GET['branch']);
  }
}

// SVG pathway template

if ($_GET['data']=='svg') {
  //header("Access-Control-Allow-Origin: *");
  $pathwayTemplateSvgUrl = "https://raw.github.com/" . $repo . "/pathvisio.js/" . $branch . "/src/views/pathway-template.svg";
  $pathwayTemplateSvg = simplexml_load_file($pathwayTemplateSvgUrl);

  header("Content-Type: image/svg+xml");
  echo $pathwayTemplateSvg->saveXML();
}
else {
  echo "Please specify a 'data' parameter, such as '?data=svg'.";
}

?>
