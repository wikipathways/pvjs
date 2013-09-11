<?php
header("Content-Type: application/xml");
//header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
  if (isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);
    $pathwayUrl = "http://test3.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:" . $id;
  }

  // XML GPML (from either wikipathways.org REST API or local /test/gpml/ folder)
    $pathway = simplexml_load_file($pathwayUrl);
    echo $pathway->saveXML();
?>
