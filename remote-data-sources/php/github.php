<?php

$approvedAccounts = array(
  'wikipathways',
  'AlexanderPico',
  'andrawaag',
  'ariutta',
  'khanspers',
  'mkutmon'
);

$account = "wikipathways";
if (isset($_GET['account'])) {
  $accountParam = htmlspecialchars($_GET['account']);
  if (($accountParam != "null") && (in_array($accountParam, $approvedAccounts))) {
    $account = $accountParam;
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
$fileUrl = "https://raw.github.com/" . $account . "/pathvisio.js/" . $branch . $relativeUrl;
$fileContents = file_get_contents($fileUrl);

header("Content-Type: " . $mimeType);
echo $fileContents;

?>
