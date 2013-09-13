<?php
header("Content-Type: application/xml");
header("Access-Control-Allow-Origin: *");
  if (isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);
  }
  else {
    $id = 'WP4';
  }

  if (isset($_GET['rev'])) {
    $rev = htmlspecialchars($_GET['rev']);
  }
  else {
    $rev = 0;
  }

  $pathwayUrl = "http://test3.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:" . $id . "&rev=" . $rev;

  // XML GPML (from either wikipathways.org REST API or local /test/gpml/ folder)
    $pathway = simplexml_load_file($pathwayUrl);
    echo $pathway->saveXML();
?>
