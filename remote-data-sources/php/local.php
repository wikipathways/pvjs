<?php

$baseUrl = "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'];
$baseUrl = preg_replace("/remote-data-sources\/php\/local\.php/", "src/", $baseUrl);

$relativeUrl = "views/pathway-template.svg";
if (isset($_GET['relativeUrl'])) {
  $relativeUrlParam = htmlspecialchars($_GET['relativeUrl']);
  if ($relativeUrlParam != "null") {
    $relativeUrl = $relativeUrlParam;
  }
}

if (isset($_GET['mimeType'])) {
  $mimeTypeParam = htmlspecialchars($_GET['mimeType']);
  if ($mimeTypeParam != "null") {
    $mimeType = $mimeTypeParam;
  }
}
elseif (substr($relativeUrl, -4) == "html" || substr($relativeUrl, -3) == "htm") {
  $mimeType = "text/plain";
}
elseif (substr($relativeUrl, -3) == "css") {
  $mimeType = "text/css";
}
elseif (substr($relativeUrl, -3) == "svg") {
  $mimeType = "image/svg+xml";
}
elseif (substr($relativeUrl, -2) == "js") {
  $mimeType = "text/javascript";
}
elseif (substr($relativeUrl, -4) == "json") {
  $mimeType = "text/plain";
}
else {
  $mimeType = "image/svg+xml";
}

header("Content-Type: " . $mimeType);
//header("Access-Control-Allow-Origin: *");

$fileUrl = $baseUrl . $relativeUrl;
$fileContents = file_get_contents($fileUrl);

if ($mimeType == "image/svg+xml") {
  $cssUrl = $baseUrl . "css/pathway-template.css";
  $fileContents = preg_replace("/\.\.\/\.\.\/css\/pathway-template\.css/", $cssUrl, $fileContents);
  $xml = simplexml_load_string($fileContents);
  echo $xml->saveXML();
}
else {
  echo $fileContents;
}
?>
