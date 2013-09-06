<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>pathvisio.js renderer</title>

<!-- 
Style guides can be arbitrary, but for sake of consistency within this project, let's use these:
http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
http://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml#General_Guidelines
-->
    <style type="text/css">
      .openseadragon1 {
          width: 668.3333333333335px;
          height: 678.0px;
      }
      .navigator .highlight{
          opacity:    0.4;
          filter:     alpha(opacity=40);
          border:     2px solid #900;
          outline:    none;
          background-color: #900;
      }
      .highlight{
          filter:     alpha(opacity=40);
          border:     4px solid transparent;
          outline:    10px auto transparent;
          background-color: white;
      }
      .highlight:hover, .highlight:focus{
          border:     4px solid gold;
          outline:    10px auto gold;
          background-color: white;
      }
    </style>

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <script src="../src/lib/es5-shim/es5-shim.js"></script>
      <script src="../src/lib/Xccessors/xccessors-standard.js"></script>
      <script>

        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener

        (function() {
          if (!Event.prototype.preventDefault) {
            Event.prototype.preventDefault=function() {
              this.returnValue=false;
            };
          }
          if (!Event.prototype.stopPropagation) {
            Event.prototype.stopPropagation=function() {
              this.cancelBubble=true;
            };
          }
          if (!Element.prototype.addEventListener) {
            var eventListeners=[];
            
            var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
              var self=this;
              var wrapper=function(e) {
                e.target=e.srcElement;
                e.currentTarget=self;
                if (listener.handleEvent) {
                  listener.handleEvent(e);
                } else {
                  listener.call(self,e);
                }
              };
              if (type=="DOMContentLoaded") {
                var wrapper2=function(e) {
                  if (document.readyState=="complete") {
                    wrapper(e);
                  }
                };
                document.attachEvent("onreadystatechange",wrapper2);
                eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
                
                if (document.readyState=="complete") {
                  var e=new Event();
                  e.srcElement=window;
                  wrapper2(e);
                }
              } else {
                this.attachEvent("on"+type,wrapper);
                eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
              }
            };
            var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
              var counter=0;
              while (counter<eventListeners.length) {
                var eventListener=eventListeners[counter];
                if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
                  if (type=="DOMContentLoaded") {
                    this.detachEvent("onreadystatechange",eventListener.wrapper);
                  } else {
                    this.detachEvent("on"+type,eventListener.wrapper);
                  }
                  break;
                }
                ++counter;
              }
            };
            Element.prototype.addEventListener=addEventListener;
            Element.prototype.removeEventListener=removeEventListener;
            if (HTMLDocument) {
              HTMLDocument.prototype.addEventListener=addEventListener;
              HTMLDocument.prototype.removeEventListener=removeEventListener;
            }
            if (Window) {
              Window.prototype.addEventListener=addEventListener;
              Window.prototype.removeEventListener=removeEventListener;
            }
          }
        })();
      </script>
    <![endif]-->

</head>
<body>
<img id="details-frame" src="../img/sample-details-frame.png" style="width:175px; height:250px; position: absolute; top: 20px; left: 155px; visibility:hidden;" alt="image alternative text" />
    <div>
        Pathvisio.js SVG viewer.
    </div>
<script>
function getUrlParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
};
var repo = getUrlParameter('repo');
if (!!url) {
  var url = getUrlParameter('url');
}
else {
  if (!!getUrlParameter('id')) {
    var url = 'http://pointer.ucsf.edu/d3/r/pathvisio.js/src/views/gpml.php?id=' + getUrlParameter('id');
  };
};
</script>

<?php
  $authorizedRepos = array("wikipathways", "AlexanderPico", "ariutta", "khanspers");
  $repo = "wikipathways";

  if (isset($_GET['repo'])) {
    if (in_array($_GET['repo'], $authorizedRepos)) {
      $repo = htmlspecialchars($_GET['repo']);
    }
  }

  if ($_GET['repo'] == "local") {
    $pathwayTemplateSvgUrl = "pathway-template.svg";
    $pathwayTemplateSvgUrlEditable = "pathway-template.svg";
  }
  else {
    $pathwayTemplateSvgUrl = "https://raw.github.com/" . $repo . "/pathvisio.js/dev/src/views/pathway-template.svg";
    $pathwayTemplateSvgUrlEditable = "https://github.com/" . $repo . "/pathvisio.js/blob/dev/src/views/pathway-template.svg";
  }

  echo "<div id='javascript-svg-pathway-container' class='pathway'>";
    $pathwayTemplateSvg = simplexml_load_file($pathwayTemplateSvgUrl);
    echo $pathwayTemplateSvg->saveXML();
  echo "</div>";

?>

<script src="../js/pathvisio/pathvisio.js"></script>
<script src="../js/pathvisio/pathway/pathway.js"></script>
<script src="../js/pathvisio/pathway/edge/edge.js"></script>
<script src="../js/pathvisio/pathway/edge/path-data.js"></script>
<script src="../js/pathvisio/pathway/edge/marker.js"></script>
<script src="../js/pathvisio/pathway/edge/point.js"></script>

<script src="../js/pathvisio/pathway/info-box.js"></script>
<script src="../js/pathvisio/pathway/group.js"></script>
<script src="../js/pathvisio/pathway/labelable-element.js"></script>

<script src="../js/pathvisio/helpers.js"></script>
<script src="../js/rgbcolor.js"></script>

<script src="../js/case-converter.js"></script>
<script src="../js/xml2json.js"></script>
<script src="../lib/openseadragon/openseadragon.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js"></script>
<script src="../lib/d3/d3.js" charset="utf-8"></script>

<script>
  window.onload = function() {
    pathvisio.pathway.load('#pathway-image', url);
  };
</script>
    <div>
        Dynamic PNG viewer.
    </div>
    <div id="container" class="openseadragon1"></div>
    <script type="text/javascript">
      function onZoomitResponse(resp) {
          if (resp.error) {
              // e.g. the URL is malformed or the service is down
              alert(resp.error);
              return;
          }
           
          var content = resp.content;
           
          if (content.ready) {
              var viewer = self.viewer = OpenSeadragon({
                  // debugMode: true,
                  id: "container",
                  prefixUrl: "../lib/openseadragon/images/",
                  showNavigator:true,
                  tileSources:   [{ 
                      Image:  {
                          xmlns: "http://schemas.microsoft.com/deepzoom/2009",
                          Url: "http://cache.zoom.it/content/LrQA_files/",
                          TileSize: "254", 
                          Overlap: "1", 
                          Format: "png", 
                          ServerFormat: "Default",
                          Size: { 
                              Width: "1000",
                              Height: "1121"
                          }
                      },
                      overlays: [{
                        id: 'example-overlay',
                        x: 0.046, 
                        y: 0.337, 
                        width: 0.098, 
                        height: 0.029,
                        className: 'highlight'
                    }]
                  }]
              });
              console.log('viewer');

              window.setTimeout(function() {
                $("#example-overlay").click(function() {
                  $("#details-frame")[0].style.visibility = 'visible';
                  console.log('click');
                });
                console.log('clicker');
                }, 1000);
          } else if (content.failed) {
              alert(content.url + " failed to convert.");
          } else {
              alert(content.url + " is " +
                  Math.round(100 * content.progress) + "% done.");
          }
      }
       
      $.ajax({
          url: "http://api.zoom.it/v1/content/LrQA",
          dataType: "jsonp",
          success: onZoomitResponse
      });
   </script>
</body>
