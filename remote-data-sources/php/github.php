<?php

$approvedRepos = array(
  'wikipathways',
  'AlexanderPico',
  'andrawaag',
  'ariutta',
  'khanspers',
  'mkutmon'
);

$repo = "wikipathways";
if (isset($_GET['repo'])) {
  $repoParam = htmlspecialchars($_GET['repo']);
  if (($repoParam != "null") && (in_array($repoParam, $approvedRepos))) {
    $repo = $repoParam;
  }
}

$branch = "dev";
if (isset($_GET['branch'])) {
  $branchParam = htmlspecialchars($_GET['branch']);
  if ($branchParam != "null") {
    $branch = $branchParam;
  }
}


$relativeUrl = "/src/views/pathway-template.svg";
if (isset($_GET['relativeUrl'])) {
  $relativeUrlParam = htmlspecialchars($_GET['relativeUrl']);
  if ($relativeUrlParam != "null") {
    $relativeUrl = $relativeUrlParam;
  }
}

$mimeType = "image/svg+xml";
if (isset($_GET['mimeType'])) {
  $mimeTypeParam = htmlspecialchars($_GET['mimeType']);
  if ($mimeTypeParam != "null") {
    $mimeType = $mimeTypeParam;
  }
}

//header("Access-Control-Allow-Origin: *");
$fileUrl = "https://raw.github.com/" . $repo . "/pathvisio.js/" . $branch . $relativeUrl;
$fileContents = file_get_contents($fileUrl);

header("Content-Type: " . $mimeType);
echo $fileContents;

?>
