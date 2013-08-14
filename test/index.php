<!DOCTYPE html>
<meta charset="utf-8">
<title>pathvisio.js testing home</title>

<!-- 
Style guides can be arbitrary, but for sake of consistency within this project, let's use these:
http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
http://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml#General_Guidelines
-->

<body>
  <h1>pathvisio.js testing home</h1>

  <h2>
  <a href="https://github.com/wikipathways/pathvisio.js">Code on Github</a>
  </h2>

  <h2>
  <a href="./gpml2json.html">Convert GPML to JSON</a>
  </h2>

  <h2>View sample pathways with pathvisio.js</h2>

  <h3>Pathways for testing purposes</h3>
  <ul>
    <?php
      foreach (glob("gpml/*.gpml") as $filename) {
          echo "<li><a href='../src/views/index.php?pathwayUrl=../../test/".$filename."'>".$filename."</a></li>";
      }
     ?>
  </ul>

  <h3>Pathways from WikiPathways</h3>
  <ul>
    
    <?php
      $completeurl =
        "http://www.wikipathways.org/wpi/webservice/webservice.php/listPathways";
      $xml = simplexml_load_file($completeurl);

      $xml->registerXPathNamespace('ns1', 'http://www.wso2.org/php/xsd');
      $xml->registerXPathNamespace('ns2', 'http://www.wikipathways.org/webservice');
      $listPathwaysResponse = $xml->xpath('//ns1:listPathwaysResponse');
      $pathways = $xml->xpath('//ns1:pathways');
      $ids = $xml->xpath('//ns2:id');
      $names = $xml->xpath('//ns2:name');
      $species = $xml->xpath('//ns2:species');

      $i = 0;
      foreach ($ids as $id) {
        echo "<li><a href='../src/views/index.php?pwId=" . $id . "'>" . $id . ": " . $names[$i] . ", " . $species[$i] . "</a></li>";
        $i = $i + 1;
      }
     ?>
  </ul>
</body>
