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
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function forEach(callback, thisArg) {
    'use strict';
    var T, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    var kValue,
        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        O = Object(this),

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ({}.toString.call(callback) !== "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length >= 2) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}
      </script>

      <script>
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };      
}
      </script>

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
<img id="details-frame" src="../img/sample-details-frame.png" style="width:175px; height:250px; position: absolute; top: 20px; left: 155px; visibility:hidden; z-index: 289;" alt="image alternative text" />
    <div>
        Pathvisio.js SVG viewer.
    </div>
<script>
function getUrlParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
};

var repo = getUrlParameter('repo');
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

<script src="../lib/d3/d3.js" charset="utf-8"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js"></script>

<script src="../js/case-converter.js"></script>
<script src="../js/xml2json.js"></script>
<script src="../lib/openseadragon/openseadragon.js"></script>

<script src="../../build/js/pathvisio.js"></script>

<script>
  window.onload = function() {
    if (!!getUrlParameter('id')) {
      var url = 'http://pointer.ucsf.edu/d3/r/pathvisio.js/src/views/gpml.php?id=' + getUrlParameter('id');
    }
    else {
      if (!!getUrlParameter('url')) {
        var url = getUrlParameter('url');
      }
      else {
        console.log('Error: No GPML data source specified.');
      };
    };
    pathvisio.pathway.load('#pathway-image', url);
    console.log('url');
    console.log(url);
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
                  //$("#details-frame")[0].style.z-index = 289;
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
