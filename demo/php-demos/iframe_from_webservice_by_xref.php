<html style="margin: 0; width: 100%; height: 100%; ">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">

    <title>Pvjs Demos</title>

    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" media="screen">
  </head>

  <body style="margin: 0; width: 100%; height: 100%; ">
<?php
$xref_id = '181706';
$xref_ds= 'Entrez Gene';
$xref_code= 'L';
$wp_rest_url = 'http://www.wikipathways.org/wpi/webservice/webservice.php/findPathwaysByXref?ids='.$xref_id.'&codes='.$xref_code; 
$wp_obj = simplexml_load_file($wp_rest_url); 

$pathway_ids = $wp_obj->xpath('ns1:result/ns2:id');

echo '<iframe src="http://www.wikipathways.org/wpi/PathwayWidget.php?id='.$pathway_ids[0].'&xref='.$xref_id.','.$xref_ds.'&colors=red" width="850" height="600" />';

?>
</body>
</html>
