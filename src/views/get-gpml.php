<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>pathvisio.js GPML getter</title>

<!-- 
Style guides can be arbitrary, but for sake of consistency within this project, let's use these:
http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
http://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml#General_Guidelines
-->


</head>
<body>
<script type="text/javascript">
  var iframe = window.getElementsByTagName( "iframe" )[ 0 ];
  alert( "Frame title: " + iframe.contentWindow.title );
</script>


<?php
  $id = $_GET['id'];
  echo '<iframe src="http://test3.wikipathways.org/index.php/Pathway:' . $id . '" width="300" height="300">';
    echo '<p>Your browser does not support iframes.</p>';
  echo '</iframe>';
?>
</body>
