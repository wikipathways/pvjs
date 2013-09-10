<?php
// call this like: http://127.0.0.1/~andersriutta/pathvisio.js/src/data/xrefs.php?species=Human&database=L&id=1234
// or like: http://127.0.0.1/~andersriutta/pathvisio.js/src/data/xrefs.php?species=Homo%20sapiens&database=L&id=1234
header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
  $dataSourcesUrl = "http://test3.wikipathways.org//wpi/cache/datasources.txt";

  $dataSources = file_get_contents($dataSourcesUrl);
  echo $dataSources;
?>
