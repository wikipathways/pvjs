<?php

// it would be nice to automate this so we don't have to remember to update it.

$cssRelativeUrls = array(
  'pathvisio-js-css'=>'src/css/pathvisio-js.css',
  'details-frame-css'=>'src/css/details-frame.css',
  'pan-zoom-css'=>'src/css/pan-zoom.css'
);

$jsRelativeUrls = array(
  '/src/js/pathvisio/pathvisio.js',
  '/src/js/pathvisio/helpers.js',
  '/src/js/pathvisio/pathway/pathway.js',
  '/src/js/pathvisio/pathway/group.js',
  '/src/js/pathvisio/pathway/info-box.js',
  '/src/js/pathvisio/pathway/node.js',
  '/src/js/pathvisio/pathway/edge/edge.js',
  '/src/js/pathvisio/pathway/edge/marker.js',
  '/src/js/pathvisio/pathway/edge/point.js',
  '/src/js/pathvisio/pathway/edge/path-data.js',
  '/src/js/pathvisio/pathway/data-sources.js',
  '/src/js/pathvisio/pathway/x-ref.js'
);

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

$doc = new DOMDocument();
$doc->loadHTMLFile("https://raw.github.com/" . $repo . "/pathvisio.js/" . $branch . "/src/views/pathvisio-js.html");

foreach ($cssRelativeUrls as $key => $value) {
  $element = $doc->getElementById($key);
  $element->removeAttribute("href");
  $element->setAttribute("href", "../../remote-data-sources/php/github.php?repo=" . $repo . "&branch=" . $branch . "&relativeUrl=" . $value . "&mimeType=text/css");
}

$pathvisioJsScriptElement = $doc->getElementById('pathvisio-js');

foreach ($jsRelativeUrls as &$jsRelativeUrl) {
  $element = $doc->createElement('script');
  $element->setAttribute("src", "../../remote-data-sources/php/github.php?repo=" . $repo . "&branch=" . $branch . "&relativeUrl=" . $jsRelativeUrl . "&mimeType=application/javascript");
  $pathvisioJsScriptElement->parentNode->insertBefore($element, $pathvisioJsScriptElement);
}

$pathvisioJsScriptElement->parentNode->removeChild($pathvisioJsScriptElement);

echo $doc->saveHTML();

/*
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
 */
?>
