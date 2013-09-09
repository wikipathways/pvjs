<?php
// call this like: http://127.0.0.1/~andersriutta/pathvisio.js/src/views/xrefs.php?species=Human&database=L&id=1234
// or like: http://127.0.0.1/~andersriutta/pathvisio.js/src/views/xrefs.php?species=Homo%20sapiens&database=L&id=1234
header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
  if (isset($_GET['id'])) {
    $species = urlencode(htmlspecialchars($_GET['species']));
    $database = urlencode(htmlspecialchars($_GET['database']));
    $id = urlencode(htmlspecialchars($_GET['id']));
    $xrefsUrl = "http://webservice.bridgedb.org/" . $species . "/xrefs/" . $database . "/" . $id;
  }

  echo "id\tdatabase\n";
  $xrefs = file_get_contents($xrefsUrl);
  echo $xrefs;
?>
