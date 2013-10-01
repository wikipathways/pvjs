//! pathvisio-js 0.0.1
//! Built on 2013-09-30
//! https://github.com/wikipathways/pathvisio.js
//! License: http://www.apache.org/licenses/LICENSE-2.0/

var pathvisio = {};
;

var pathvisioNS = pathvisioNS || {};
pathvisioNS["src/views/viewer.html"] = '<!DOCTYPE html>\n<head>\n<meta charset="utf-8">\n<title>pathvisio.js renderer</title>\n\n<!-- \nStyle guides can be arbitrary, but for sake of consistency within this project, let\'s use these:\nhttp://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml\nhttp://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml\nhttp://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml#General_Guidelines\n-->\n\n<link href="http://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet" media="screen">\n<link rel="stylesheet" href="../css/details-frame.css">\n<link rel="stylesheet" href="http://bumbu.github.io/cytoscape.js/src/plugins/jquery.cytoscape-panzoom.css">\n<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css">\n\n<style type="text/css">\nbody {\n  background-color: white;\n}\n.navigator .highlight{\n    opacity:    0.4;\n    filter:     alpha(opacity=40);\n    border:     2px solid #900;\n    outline:    none;\n    background-color: #900;\n}\n.highlight{\n    opacity:    0.1;\n    filter:     alpha(opacity=40);\n    background-color: white;\n}\n.highlight:hover, .highlight:focus{\n    filter:     alpha(opacity=70);\n    opacity:    0.7;\n    border:     2px solid gold;\n    outline:    10px auto gold;\n    background-color: transparent;\n}\n</style>\n\n<!--[if lt IE 9]>\n<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>\n<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>\n<script src="../lib/es5-shim/es5-shim.js"></script>\n<script src="../lib/Xccessors/xccessors-standard.js"></script>\n\n<script>\n\n// IE8 only allows console.log when Developer Tools is open. This will prevent errors\n// from showing up if I use console.log without DevTools being open.\n// from http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer\n\n/**\n * Protect window.console method calls, e.g. console is not defined on IE\n * unless dev tools are open, and IE doesn\'t define console.debug\n */\n(function() {\n  if (!window.console) {\n    window.console = {};\n      }\n      // union of Chrome, FF, IE, and Safari console methods\n      var m = [\n        "log", "info", "warn", "error", "debug", "trace", "dir", "group",\n        "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",\n        "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"\n        ];\n      // define undefined methods as noops to prevent errors\n      for (var i = 0; i < m.length; i++) {\n        if (!window.console[m[i]]) {\n          window.console[m[i]] = function() {};\n        }    \n      } \n    })();\n  </script>\n<![endif]-->\n\n<script src="../lib/rgb-color/rgb-color.min.js"></script>\n<script src="../lib/case-converter/case-converter.min.js"></script>\n<script src="../lib/xml2json/xml2json.min.js"></script>\n\n<script src="../../build/js/pathvisio.min.js"></script>\n\n<script src="../lib/d3/d3.min.js" charset="utf-8"></script>\n<script>\nvar currentUrlWithoutQueryString = window.location.href.split("?")[0].split("#")[0];\n\nif (!pathvisio.helpers.getUrlParam(\'svgView\')) {\n  var svgView = 1;\n}\nelse {\n  var svgView = pathvisio.helpers.getUrlParam(\'svgView\');\n};\n\nvar svgUrl = null;\nvar repo = \'wikipathways\';\nconsole.log(pathvisio.helpers.getUrlParam(\'svg\'));\nif (!!pathvisio.helpers.getUrlParam(\'repo\')) {\n  repo = pathvisio.helpers.getUrlParam(\'repo\');\n  var branch = \'master\';\n  if (!!pathvisio.helpers.getUrlParam(\'repo\')) {\n    branch = pathvisio.helpers.getUrlParam(\'branch\');\n  }\n  svgUrl = \'../../remote-data-sources/php/github.php?data=svg&repo=\' + repo + \'&branch=\' + branch;\n}\nelse {\n  if (!!pathvisio.helpers.getUrlParam(\'svg\')) {\n    var svgSource = pathvisio.helpers.getUrlParam(\'svg\');\n    console.log(\'SVG Source\');\n    console.log(svgSource);\n    svgUrl = svgSource;\n  }\n  else {\n    svgUrl = "./pathway-template.svg";\n    console.log(\'Error: No URL or repo specified as SVG template source.\');\n    console.log(\'Using local pathway-template.svg as last resort.\');\n  }\n}\n\nif (!!pathvisio.helpers.getUrlParam(\'gpml\')) {\n  var rev = 0;\n  if (!!pathvisio.helpers.getUrlParam(\'rev\')) {\n    rev = pathvisio.helpers.getUrlParam(\'rev\');\n  }\n\n  var gpmlSource = pathvisio.helpers.getUrlParam(\'gpml\');\n  ///*\n  // gpmlSource is a WikiPathways ID\n  if (gpmlSource.indexOf(\'.gpml\') === -1 && gpmlSource.indexOf(\'.xml\') === -1) { // if gpmlSource is a WikiPathways ID\n    var gpmlUrl = currentUrlWithoutQueryString + \'/../../../remote-data-sources/php/wikipathways.php?data=gpml&id=\' + gpmlSource + \'&rev=\' + rev;\n  }\n  \n  else { // if gpmlSource is a url to a gpml file\n    var gpmlUrl = gpmlSource;\n  };\n  //*/\n\n  /*\n  if (pathvisio.helpers.isUrl(gpmlSource)) {\n    var gpmlUrl = gpmlSource;\n  }\n  else {\n    var gpmlUrl = currentUrlWithoutQueryString + \'/../../../remote-data-sources/php/wikipathways.php?data=gpml&id=\' + gpmlSource;\n  };\n  //*/\n}\nelse {\n  console.warn(\'Error: No GPML data source specified.\');\n};\n\nvar pngUrl = encodeURIComponent(\'http://test3.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:\' + gpmlSource);\n\nd3.select(\'#fallback-image\').attr(\'src\', pngUrl);\n</script>\n\n</head>\n<body>\n<div style="position:relative; width:70%; height:auto; float:left;">\n  <div style="width:100%; height:100%; float:right; clear:both;" id="pathway-viewer">\n    <div style="width:80%; height:500px" id="pathway-container">\n    </div>\n    <div id="viewertoolbar" style="position:absolute; right: 0px; top: 20px;">\n      <div class="ui-widget ui-corner-all" style="position: absolute; right: 5px; top: 5px; z-index: 1001; background-color: rgb(221, 221, 221); border: 1px solid rgb(170, 170, 170); width:130px">\n        <span class="icon icon-eye-open"></span>\n        <input id="highlight-by-label" placeholder="Find in pathway" class="ui-autocomplete-input ui-corner-all" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true" style="float:right; width: 100px;">\n        <div class="ui-corner-all" style="position: absolute; font-size: 75%; background-color: white; display: none;">\n        </div>\n      </div>\n      <!-- see http://bumbu.github.io/cytoscape.js/debug/ for example of cytoscape.js -->\n      <div class="ui-cytoscape-panzoom">\n          <div class="ui-cytoscape-panzoom-zoom-in ui-cytoscape-panzoom-zoom-button">\n            <span class="icon icon-plus"></span>\n          </div>\n          <div class="ui-cytoscape-panzoom-zoom-out ui-cytoscape-panzoom-zoom-button">\n            <span class="icon icon-minus"></span>\n          </div>\n          <div class="ui-cytoscape-panzoom-reset ui-cytoscape-panzoom-zoom-button">\n            <span class="icon icon-resize-full"></span>\n          </div>\n          <div class="ui-cytoscape-panzoom-slider">\n              <div class="ui-cytoscape-panzoom-slider-background">\n              </div>\n              <div class="ui-cytoscape-panzoom-slider-handle" style="top: 42.80000001192093px;">\n                <span class="icon icon-minus"></span>\n              </div>\n              <div class="ui-cytoscape-panzoom-no-zoom-tick" style="top: 42.80000001192093px;">\n              </div>\n          </div>\n          <div class="ui-cytoscape-panzoom-panner">\n              <div class="ui-cytoscape-panzoom-panner-handle">\n              </div>\n              <div class="ui-cytoscape-panzoom-pan-up ui-cytoscape-panzoom-pan-button">\n              </div>\n              <div class="ui-cytoscape-panzoom-pan-down ui-cytoscape-panzoom-pan-button">\n              </div>\n              <div class="ui-cytoscape-panzoom-pan-left ui-cytoscape-panzoom-pan-button">\n              </div>\n              <div class="ui-cytoscape-panzoom-pan-right ui-cytoscape-panzoom-pan-button">\n              </div>\n              <div class="ui-cytoscape-panzoom-pan-indicator" style="display: none; left: 22.424611085682006px; top: 0.12287108520014556px; background-color: rgb(127, 127, 127); background-position: initial initial; background-repeat: initial initial;">\n              </div>\n          </div>\n      </div>\n    </div>\n    <div id="details-frame" style="visibility: hidden; position:absolute; right: 75px; top: 100px;" class="data-node ui-draggable">\n    </div>\n  </div>\n</div>\n\n<script src="../lib/jquery/jquery.min.js"></script>\n<script src="../lib/jquery-ui/ui/minified/jquery-ui.min.js"></script>\n<script src="../lib/typeahead.js/dist/typeahead.min.js"></script>\n\n<script src="../lib/openseadragon/openseadragon.min.js"></script>\n<script src="../lib/modernizr/modernizr.min.js"></script>\n<script src="../lib/screenfull/dist/screenfull.min.js"></script>\n<script src="../lib/mr-data-converter/CSVParser.min.js"></script>\n<script src="../lib/mr-data-converter/DataGridRenderer.min.js"></script>\n<script src="../lib/svg-pan/svg-pan1.js"></script>\n<!--\n<script src="../lib/async/lib/async.js"></script>\n-->\n\n\n<script>\nfunction getPng(pathway, attemptCount) {\n  if (!attemptCount) {\n    attemptCount = 1;\n  }\n  else {\n    attemptCount += 1;\n  }\n  \n  $.ajax({\n    url: \'http://api.zoom.it/v1/content/?url=\' + pngUrl,\n      dataType: "jsonp",\n      success: function(resp) { onZoomitResponse(resp, pathway, attemptCount); }\n  });\n};\n\nif (Modernizr.svg && svgView != 0) {\n\n  // browser supports SVG.\n\n  console.log(\'Your browser supports SVG.\');\n\n  d3.select(\'#pathway-object\')\n  //.attr(\'style\', \'width: 100%; height:500px\')\n  //.attr(\'src\', svgUrl);\n\n  pathvisio.pathway.load(\'#pathway-container\', svgUrl, gpmlUrl, \'#highlight-by-label\');\n\n  $( ".icon-resize-full" )[0].click(function() {\n    if (screenfull.enabled) {\n      screenfull.request(pathwayContainer[0][0]);\n    }\n  });\n}\nelse {\n\n  // browser does not support SVG. Fall back to PNG.\n\n  console.log(\'Your browser does not support SVG. Falling back to PNG.\');\n\n  var windowDimensions = pathvisio.helpers.getWindowDimensions();\n  var pathwayContainer = d3.select(\'#pathway-container\');\n  //pathwayContainer.select(\'#pathway-image\').remove();\n  //pathwayContainer.attr(\'style\', function() {return \'width: 100%; height:\' + windowDimensions.height + \'px\'});\n  pathwayContainer.attr(\'style\', \'width: 100%; height:1000px\');\n  var svgToolbar = d3.select(\'#viewertoolbar\')[0][0].style.visibility="hidden";\n  var loadingImg = $("#pathway-container").append("<img id=\'loadingImg\' src=\'../img/loading.gif\' width=\'100\' height=\'100\' />");\n\n  function onZoomitResponse(resp, pathway, attemptCount) {\n    self.resp = resp;\n    if (resp.error) {\n      // e.g. the URL is malformed or the service is down\n      alert(resp.error);\n      return;\n    };\n\n    if (resp.content.progress < 1) {\n      return window.setTimeout(function() {\n        if (attemptCount < 5) {\n          console.log(\'Pathway image is \' + (100*resp.content.progress) + \'% complete. Status check #\' + (attemptCount + 1) + \' in \' + 3*(attemptCount + 0) + \' seconds.\');\n          getPng(pathway, attemptCount);\n        }\n        else {\n          console.warn(\'Error: Pathway image server appears to be unavailable.\');\n        }\n      }, 3000 * attemptCount);\n    }\n\n    var content = resp.content;\n\n    var overlays = self.overlays = [];\n    var overlayItem = null;\n\n    pathway.nodes.forEach(function(element) {\n      var scalingFactor =  content.dzi.width / pathway.boardWidth;\n      overlayItem = {\n        \'id\':element.graphId,\n          \'px\':element.x * scalingFactor,\n          \'py\':element.y * scalingFactor,\n          \'width\':element.width * scalingFactor,\n          \'height\':element.height * scalingFactor,\n          \'className\': \'highlight\',\n      };\n      if (element.elementType === \'data-node\') {\n        overlays.push(overlayItem);\n      };\n    });\n\n    loadingImg.empty();\n\n    if (content.ready) {\n      var viewer = self.viewer = OpenSeadragon({\n        //debugMode: true,\n        id: "pathway-container",\n          prefixUrl: "../lib/openseadragon/images/",\n          showNavigator:true,\n          //minPixelRatio: 1.5,\n          minZoomImageRatio: 0.8,\n          maxZoomPixelRatio: 2,\n          showNavigator:  false,\n          //toolbar: \'viewertoolbar\',\n          tileSources:   [{ \n            Image:  {\n              xmlns: "http://schemas.microsoft.com/deepzoom/2009",\n                Url: \'http://cache.zoom.it/content/\' + content.id + \'_files/\',\n                TileSize: "254", \n                Overlap: "1", \n                Format: "png", \n                ServerFormat: "Default",\n                Size: { \n                  Width: content.dzi.width,\n                    Height: content.dzi.height\n                }\n            },\n              overlays:overlays \n          }],\n          visibilityRatio: 1.0,\n          constrainDuringPan: true\n      });\n\n      window.setTimeout(function() {\n        $(".highlight").click(function() {\n          var id = this.getAttribute(\'id\');\n          var node = pathway.nodes.filter(function(element) {return element.graphId == id })[0];\n          pathvisio.pathway.xRef.displayData(pathway.organism, node);\n        });\n      }, 1000);\n    }\n    else {\n      if (content.failed) {\n        alert(content.url + " failed to convert.");\n      }\n      else {\n        alert(content.url + " is " +\n          Math.round(100 * content.progress) + "% done.");\n      };\n    };\n  };\n\n  pathvisio.pathway.getJson(gpmlUrl, function(pathway) {\n    getPng(pathway);\n  });\n};\n</script>\n</body>\n';
pathvisioNS["src/views/error.html"] = '<p>Error displaying pathway.</p>\n';
pathvisioNS["src/views/pathway-template.svg"] = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n\n<!-- \nThis file serves as our template for standardized GPML pathway visual representations.\nThis file can be used for many purposes outside of pathvisio.js, including allowingar\nother projects to work better with GPML. For purposes of pathvisio.js, this file will\nbe the starting point for our JavaScript rendering of pathways. Every time we want to\nrender a GPML file on the browser, we will read a copy of this file into D3.js and\nmodify the copy by adding "use" statements, cloning markers, etc. in order to create\nthe desired pathway illustration in SVG.\n\nThe XML declaration above is taken from an example from the W3C \n<http://www.w3.org/TR/SVG/images/struct/use04.svg>,\nexcept I added:\nencoding="UTF-8" \nWe will want to change standalone to yes if we keep the CSS and\nJS all inside this document.\n\nDoctypes are not needed for SVG, and jwatt discourages their use:\nhttps://jwatt.org/svg/authoring/.\n\nStyle guides can be arbitrary, but for consistency of SVG markup for the pathvisio.js project,\n	I suggest using JS Watt\'s SVG authoring advice and Google\'s HTML and JavaScript Guides:\n	https://jwatt.org/svg/authoring/\n	http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml\n	http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml\n\nJS Watt\'s advice is referenced from MDN:\nhttps://developer.mozilla.org/en-US/docs/Web/SVG\n\nFor testing, we will ensure this SVG file renders correctly with the following browsers and graphics programs:\nChrome (latest release)\n	Uses Skia graphics library\nFirefox (latest release)\n	Uses Azure graphics library\n	Safari (latest release)\n	Android Browser (latest release)\n	iOS Browser (latest release)\n	Internet Explorer (IE9 and subsequent versions)\nSquiggle SVG browser (latest release)\n	Uses Batik \n	Available for download at http://xmlgraphics.apache.org/batik/download.html\nSVG-Edit (latest release)\n	Version 2.6 (latest release as of 2013-07-08) available for download at \n	http://svg-edit.googlecode.com/svn/branches/2.6/editor/svg-editor.html\n	Inkscape\n	Uses livarot rendering engine but is in process of transitioning to Cairo\n	Available for download at http://inkscape.org/\n\n	Optional additional tests:\n	SvgWeb\n	Adobe Illustrator (CS6)\n		Either convert SVG to PDF and import PDF into Illustrator or convert SVG to .ai (Illustrator format)\n		with a converter like Uniconverter, available for download at\n		http://sk1project.org/modules.php?name=Products&product=uniconvertor\n		Opening this SVG directly with Illustrator does not work well.\n		In the future, we could use Uniconverter on the server to make it possible to download pathway images in\n		.ai (Illustrator) and .cdr (CorelDraw) formats.\n\n	For more information on SVG, these references are helpful:\n	[W3 Spec](http://www.w3.org/TR/SVG/expanded-toc.html)\n	[MDN on SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)\n	-->\n\n	<svg id="pathway-image"\n	version="1.1"\n	baseProfile="full"\n	xmlns="http://www.w3.org/2000/svg"\n	xmlns:xlink="http://www.w3.org/1999/xlink"\n	xmlns:ev="http://www.w3.org/2001/xml-events"\n	width="100%"\n	height="100%">\n	<g>\n	<title>pathway defs for pathvisio.js</title>\n	<desc>\n	This SVG file contains all the graphical elements (markers and symbols in defs as well as\n	style data) used by the program pathvisio.js, which has two components: \n	1) a viewer for transforming GPML biological pathway data into an SVG visual representation and \n	2) an editor for creating both views and models for biological pathways.\n	</desc>\n	</g>\n<!-- ECMAScript to change the radius with each click -->\n				<script type="application/ecmascript"> <![CDATA[\nfunction init() {\n	/// CONFIGURATION \n	/// ====>\n\n	var enablePan = 1; // 1 or 0: enable or disable panning (default enabled)\n	var enableZoom = 1; // 1 or 0: enable or disable zooming (default enabled)\n	var enableDrag = 0; // 1 or 0: enable or disable dragging (default disabled)\n	var zoomScale = 0.2; // Zoom sensitivity\n\n\n	/// <====\n	/// END OF CONFIGURATION \n\n	var root = document.documentElement.getElementsByTagName("svg")[0];\n\n	root.addEventListener(\'click\', function () {\n	  enableZoom = 1;\n	});\n\n	var state = \'none\', svgRoot = null, stateTarget, stateOrigin, stateTf;\n\n	setupHandlers(root);\n}\n\n/**\n * Register handlers\n */\nfunction setupHandlers(root){\n	setAttributes(root, {\n		"onmouseup" : "handleMouseUp(evt)",\n		"onmousedown" : "handleMouseDown(evt)",\n		"onmousemove" : "handleMouseMove(evt)",\n		//"onmouseout" : "handleMouseUp(evt)", // Decomment this to stop the pan functionality when dragging out of the SVG element\n	});\n\n	if(navigator.userAgent.toLowerCase().indexOf(\'webkit\') >= 0)\n		window.addEventListener(\'mousewheel\', handleMouseWheel, false); // Chrome/Safari\n	else\n		window.addEventListener(\'DOMMouseScroll\', handleMouseWheel, false); // Others\n}\n\n/**\n * Retrieves the root element for SVG manipulation. The element is then cached into the svgRoot global variable.\n */\nfunction getRoot(root) {\n	if(svgRoot == null) {\n		var r = root.getElementById("viewport") ? root.getElementById("viewport") : root.documentElement, t = r;\n\n		while(t != root) {\n			if(t.getAttribute("viewBox")) {\n				setCTM(r, t.getCTM());\n\n				t.removeAttribute("viewBox");\n			}\n\n			t = t.parentNode;\n		}\n\n		svgRoot = r;\n	}\n\n	return svgRoot;\n}\n\n/**\n * Instance an SVGPoint object with given event coordinates.\n */\nfunction getEventPoint(evt) {\n	var p = root.createSVGPoint();\n	console.log("p");\n	console.log(p);\n\n	p.x = evt.clientX;\n	p.y = evt.clientY;\n\n	return p;\n}\n\n/**\n * Sets the current transform matrix of an element.\n */\nfunction setCTM(element, matrix) {\n	var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";\n\n	element.setAttribute("transform", s);\n}\n\n/**\n * Dumps a matrix to a string (useful for debug).\n */\nfunction dumpMatrix(matrix) {\n	var s = "[ " + matrix.a + ", " + matrix.c + ", " + matrix.e + "\n  " + matrix.b + ", " + matrix.d + ", " + matrix.f + "\n  0, 0, 1 ]";\n\n	return s;\n}\n\n/**\n * Sets attributes of an element.\n */\nfunction setAttributes(element, attributes){\n	for (var i in attributes)\n		element.setAttributeNS(null, i, attributes[i]);\n}\n\n/**\n * Handle mouse wheel event.\n */\nfunction handleMouseWheel(evt) {\n	if(!enableZoom)\n		return;\n\n	if(evt.preventDefault)\n		evt.preventDefault();\n\n	evt.returnValue = false;\n\n	var svgDoc = evt.target.ownerDocument;\n\n	var delta;\n\n	if(evt.wheelDelta)\n		delta = evt.wheelDelta / 360; // Chrome/Safari\n	else\n		delta = evt.detail / -9; // Mozilla\n\n	var z = Math.pow(1 + zoomScale, delta);\n\n	var g = getRoot(svgDoc);\n\n	var p = getEventPoint(evt);\n\n	p = p.matrixTransform(g.getCTM().inverse());\n\n	// Compute new scale matrix in current mouse position\n	var k = root.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);\n\n	setCTM(g, g.getCTM().multiply(k));\n\n	if(typeof(stateTf) == "undefined")\n		stateTf = g.getCTM().inverse();\n\n	stateTf = stateTf.multiply(k.inverse());\n}\n\n/**\n * Handle mouse move event.\n */\nfunction handleMouseMove(evt) {\n	if(evt.preventDefault)\n		evt.preventDefault();\n\n	evt.returnValue = false;\n\n	var svgDoc = evt.target.ownerDocument;\n\n	var g = getRoot(svgDoc);\n\n	if(state == \'pan\' && enablePan) {\n		// Pan mode\n		var p = getEventPoint(evt).matrixTransform(stateTf);\n\n		setCTM(g, stateTf.inverse().translate(p.x - stateOrigin.x, p.y - stateOrigin.y));\n	} else if(state == \'drag\' && enableDrag) {\n		// Drag mode\n		var p = getEventPoint(evt).matrixTransform(g.getCTM().inverse());\n\n		setCTM(stateTarget, root.createSVGMatrix().translate(p.x - stateOrigin.x, p.y - stateOrigin.y).multiply(g.getCTM().inverse()).multiply(stateTarget.getCTM()));\n\n		stateOrigin = p;\n	}\n}\n\n/**\n * Handle click event.\n */\nfunction handleMouseDown(evt) {\n	if(evt.preventDefault)\n		evt.preventDefault();\n\n	evt.returnValue = false;\n\n	var svgDoc = evt.target.ownerDocument;\n\n	var g = getRoot(svgDoc);\n\n	if(\n		evt.target.tagName == "svg" \n		|| !enableDrag // Pan anyway when drag is disabled and the user clicked on an element \n	) {\n		// Pan mode\n		state = \'pan\';\n\n		stateTf = g.getCTM().inverse();\n\n		stateOrigin = getEventPoint(evt).matrixTransform(stateTf);\n	} else {\n		// Drag mode\n		state = \'drag\';\n\n		stateTarget = evt.target;\n\n		stateTf = g.getCTM().inverse();\n\n		stateOrigin = getEventPoint(evt).matrixTransform(stateTf);\n	}\n}\n\n/**\n * Handle mouse button release event.\n */\nfunction handleMouseUp(evt) {\n	if(evt.preventDefault)\n		evt.preventDefault();\n\n	evt.returnValue = false;\n\n	var svgDoc = evt.target.ownerDocument;\n\n	if(state == \'pan\' || state == \'drag\') {\n		// Quit pan mode\n		state = \'\';\n	}\n}\n  ]]> </script>\n\n	<defs>\n\n	<!-- ***************************\n	CSS Style Sheet\n	***************************\n\n	Note: pathvisio.js assumes the default element color is black.\n	-->\n\n	<style type="text/css"><![CDATA[\n\n	svg {\n		color-interpolation: auto;\n		image-rendering: auto;\n		shape-rendering: auto;\n		vector-effect: non-scaling-stroke;\n		fill: white;\n	}\n\n	.drawing-board-color-fill {\n		fill: white;\n	}\n\n	.drawing-board-color-stroke {\n		stroke: white;\n	}\n\n	text {\n		font-family: Sans-Serif, Helvetica, Arial;\n		font-size: 10px;\n		fill: black;\n		fill-opacity: 1;\n		stroke: none;\n		text-anchor: middle;\n		font-size: 10px;\n		stroke: none;\n	}\n\n	.info-box {\n		font-family: Sans-Serif;\n		font-size: 10px;\n		fill: black;\n		stroke: none;\n		text-anchor: start;\n	}\n\n	.info-box-property-name {\n		font-weight: bold;\n	}\n\n	path.group {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n	}\n\n	path.group:hover {\n		fill-opacity: 0.2;\n		stroke-width: 1px;\n	}\n\n	path.group-none {\n		fill: rgb(180,180,100);\n		stroke-dasharray: 5,3;\n	}\n\n	path.group-group {\n		fill-opacity: 0;\n		stroke-width: 0;\n	}\n\n	path.group-complex {\n		fill: rgb(180,180,100);\n	}\n\n	path.group-pathway {\n		fill: lightgreen;\n		stroke-dasharray: 5,3;\n	}\n\n	use.data-node {\n		fill-opacity: 1;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	use.gene-product {\n	}\n\n	use.metabolite {\n		stroke: blue;\n	}\n\n	text.metabolite {\n		fill: blue;\n	}\n\n	use.pathway {\n		stroke: rgb(20,150,30);\n		fill-opacity: 0;\n	}\n\n	text.pathway {\n		fill: rgb(20,150,30);\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	use.protein {\n	}\n\n	use.rna {\n	}\n\n	use.unknown {\n	}\n\n	use.label {\n		stroke: black;\n		stroke-width: 0;\n		fill-opacity: 0;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	use.shape {\n		fill-opacity: 0;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	use.shape-none {\n		fill: none;\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	use.cellular-component {\n		fill-opacity: 0;\n		stroke: "#C0C0C0";\n	}\n\n	.graphical-line {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	.interaction {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n	.dashed-stroke {\n		stroke-dasharray: 5,3;\n	}\n]]></style>\n\n    <filter id = "highlight" width = "150%" height = "150%">\n        <feOffset result = "offOut" in = "SourceGraphic" dx = "30" dy = "30"/>\n        <feGaussianBlur result = "blurOut" in = "offOut" stdDeviation = "10"/>\n        <feBlend in = "SourceGraphic" in2 = "blurOut" mode = "normal"/>\n    </filter>\n\n	<!-- ***************************\n	Markers (Arrowheads) \n	*************************** -->\n\n	<!-- Here we generate a set of interaction markers for the default color (black). If we need other colors,\n	we need to clone the black marker and set the color for the clone to the desired color using d3.js.\n	I wish fill="currentColor" worked for markers, but that does not appear to be the case. -->\n\n	<!-- Each marker includes a small rectangle with a drawing-board-color-fill color to obscure the\n	ends of lines that might otherwise show up beneath the marker. Double lines require their own special\n	obscuring rects and are included as a double-line-hack-start/end marker, defined here and added in\n	gpml2json.js -->\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<marker id="arrow-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="12,5 0,0 12,-5"/>\n	</marker>\n\n	<marker id="arrow-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-12,5 0,0 -12,-5"/>\n	</marker>\n\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<marker id="mim-conversion-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="11,5 0,0 11,-5"/>\n	</marker>\n\n	<marker id="mim-conversion-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-11,5 0,0 -11,-5"/>\n	</marker>\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, black stroke -->\n\n	<marker id="mim-stimulation-start-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerWidth="12" markerHeight="12"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="1" points="11,5 0,0 11,-5"/>\n	</marker>\n\n	<marker id="mim-stimulation-end-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="1" points="-11,5 0,0 -11,-5"/>\n	</marker>\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, black stroke; and vertical line -->\n\n	<marker id="mim-necessary-stimulation-start-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerWidth="12" markerHeight="12"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 15 12">\n	<rect stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<line fill="none" stroke-width="1" x1="14" y1="-6" x2="14" y2="6"/>\n	<polygon stroke-width="1" points="9,5 0,0 9,-5"/>\n	</marker>\n\n	<marker id="mim-necessary-stimulation-end-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-15 -6 15 12">\n	<rect stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<line fill="none" stroke-width="1" x1="-14" y1="-6" x2="-14" y2="6"/>\n	<polygon stroke-width="1" points="-9,5 0,0 -9,-5"/>\n	</marker>\n\n	<!-- t-bar markers: vertical line; and extended drawing-board rect -->\n\n	<marker id="t-bar-start-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerWidth="16" \n	markerHeight="16"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="5" y1="-6" x2="5" y2="6"/>\n	</marker>\n\n	<marker id="t-bar-end-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="16" \n	markerHeight="16"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-5" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="-5" y1="-6" x2="-5" y2="6"/>\n	</marker>\n	\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n\n	<marker id="mim-inhibition-start-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerWidth="16" \n	markerHeight="16"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="5" y1="-6" x2="5" y2="6"/>\n	</marker>\n\n	<marker id="mim-inhibition-end-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="16" \n	markerHeight="16"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-5" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="-5" y1="-6" x2="-5" y2="6"/>\n	</marker>\n	\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<marker id="mim-binding-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="12,6 0,0 12,-6 5,0 "/>\n	</marker>\n\n	<marker id="mim-binding-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-12,6 0,0 -12,-6 -5,0 "/>\n	</marker>\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<marker id="mim-modification-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="12,6 0,0 12,-6 5,0 "/>\n	</marker>\n\n	<marker id="mim-modification-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-12,6 0,0 -12,-6 -5,0 "/>\n	</marker>\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and black stroke -->\n\n	<marker id="mim-catalysis-start-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerHeight="12"\n	markerWidth="12"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<circle cx="5.3" cy="0" r="5.3px" stroke-width="1px"/>\n	</marker>\n\n	<marker id="mim-catalysis-end-black"\n	class="drawing-board-color-fill"\n	stroke="black"\n	markerHeight="12"\n	markerUnits="strokeWidth"\n	markerWidth="12"\n	orient="auto"\n	refX="5" refY="0"\n	viewBox="-6.5 -6 12 12">\n	<circle cx="-0.3" cy="0" r="5.3px" stroke-width="1px"/>\n	</marker>\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<marker id="mim-cleavage-start-black" \n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-8 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="3.7" y1="0" x2="3.7" y2="6"/>	\n	<line fill="none" stroke-width=".4" x1="3.7" y1="6" x2="-8" y2="-6"/>	\n	</marker>\n\n	<marker id="mim-cleavage-end-black"\n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-4 -6 12 12">\n	<rect stroke="none" x="-3.5" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="0" x2="-3.7" y2="-6"/>	\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="-6" x2="8" y2="6"/>	\n	</marker>\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<marker id="mim-branching-left-start-black" \n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="3.7" y1="0" x2="0" y2="-6"/>	\n	</marker>\n\n	<marker id="mim-branching-left-end-black"\n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-3.5" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="0" x2="0" y2="6"/>	\n	</marker>\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<marker id="mim-branching-right-start-black" \n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="3.7" y1="0" x2="0" y2="6"/>\n	</marker>\n\n	<marker id="mim-branching-right-end-black"\n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-3.5" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="0" x2="0" y2="-6"/>	\n	</marker>\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<marker id="mim-transcription-translation-start-black"\n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="6" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="9" y1="0" x2="9" y2="-4"/>\n	<line fill="none" stroke-width=".4" x1="9" y1="-4" x2="5" y2="-4"/>\n	<polygon stroke-width=".4" points="5,-6 0,-4 5,-2"/>\n	</marker>\n\n	<marker id="mim-transcription-translation-end-black"\n	class="drawing-board-color-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-6" y="-0.6" width="6" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-9" y1="0" x2="-9" y2="4"/>\n	<line fill="none" stroke-width=".4" x1="-9" y1="4" x2="-5" y2="4"/>\n	<polygon stroke-width=".4" points="-5,6 0,4 -5,2"/>	\n	</marker>\n	\n	<!-- mim-covalent-bond markers: not much to see here! -->\n\n	<marker id="mim-covalent-bond-start-black"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	</marker>\n\n	<marker id="mim-covalent-bond-end-black"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	</marker>\n\n\n	<!-- double-line-hack markers are used in double line handling; they include their own \n	special blank rect to obscure the ends -->\n\n	<marker id="double-line-hack-start"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="0" y="-1.5" width="2.3" height="3" />\n	</marker>\n\n	<marker id="double-line-hack-end"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="drawing-board-color-fill" stroke="none" x="-2.3" y="-1.5" width="2.3" height="3" />\n	</marker>\n\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<marker id="mim-gap-start-black"\n	class="drawing-board-color-fill"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="-2" y="-0.7" width="8" height="1.4" />\n	</marker>\n\n	<marker id="mim-gap-end-black"\n	class="drawing-board-color-fill"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-6" y="-0.7" width="8" height="1.4" />\n	</marker>\n\n	<!-- ***************************\n	Symbols (shapes) \n	*************************** -->\n\n	<symbol id="none" class="shape-none" viewBox="0 0 100 50" preserveAspectRatio="none">\n	<desc>none</desc>\n	</symbol>\n\n	<!-- arc -->\n\n	<symbol id="arc" viewBox="0 0 100 100" preserveAspectRatio="none">\n	<desc>arc</desc>\n	<path d="m1.5,50.5c0,-16.16667 8.16667,-24.25 24.5,-24.25s24.5,-8.08334 24.5,-24.25c0,16.16666 8.16666,24.25 24.49999,24.25s24.50001,8.08333 24.50001,24.25" vector-effect="non-scaling-stroke"/>	\n	</symbol> \n\n	<!-- brace -->\n\n	<clipPath id="brace-clip-path">\n	<path d="m1.5,49.499996c0,-16.166668 8.166666,-24.249996 24.499998,-24.249996s24.499998,-8.083336 24.499998,-24.250002c0,16.166666 8.166664,24.250002 24.499996,24.250002s24.5,8.083328 24.5,24.249996" vector-effect="non-scaling-stroke"/>\n        </clipPath>\n\n	<symbol id="brace" viewBox="0 0 100 50" preserveAspectRatio="none">\n	<desc>brace</desc>\n	<path d="m1.5,49.499996c0,-16.166668 8.166666,-24.249996 24.499998,-24.249996s24.499998,-8.083336 24.499998,-24.250002c0,16.166666 8.166664,24.250002 24.499996,24.250002s24.5,8.083328 24.5,24.249996" style="clip-path: url(#brace-clip-path); " vector-effect="non-scaling-stroke"/>\n  	</symbol>\n	\n	<!-- group of style "none" -->\n	<!-- see group.js for symbol definition. Note that the style definition is still in this SVG template file. -->\n\n	<!-- group of style "group" -->\n	<!-- see group.js for symbol definition. Note that the style definition is still in this SVG template file. -->\n\n	<!-- group of style "complex" -->\n	<!-- see group.js for symbol definition. Note that the style definition is still in this SVG template file. -->\n\n	<!-- group of style "pathway" -->\n	<!-- see group.js for symbol definition. Note that the style definition is still in this SVG template file. -->\n\n	<!-- Endoplasmic reticulum -->\n	<clipPath id="endoplasmic-reticulum-clip-path">\n	<path d="m73.52756,56.60967c-5.62457,-18.60675 23.51463,-32.43358 23.40173,-45.06604c-0.34426,-4.86102 -10.48934,-8.89743 -18.28974,-5.33395c-17.04119,7.87556 -15.64949,29.30503 -21.20533,42.23387c-0.35661,3.60951 -7.36274,2.46926 -7.74964,-0.48694c-5.8512,-11.38871 17.13534,-24.48692 5.96075,-29.42586c-19.63467,-8.16979 -28.75184,21.15346 -22.0682,28.81784c7.4956,14.17602 -2.17949,24.40679 -6.74689,15.49637c-2.44209,-5.30613 6.06605,-11.08445 -0.80351,-16.17689c-4.31991,-2.79993 -11.75555,-0.64618 -16.15468,3.0943c-12.89117,10.73799 4.72957,40.98145 20.96467,36.14635c4.69833,-1.95989 -3.23603,-8.70151 3.90717,-9.59951c7.29767,-0.81255 5.17628,6.18889 7.68745,9.22691c2.3071,4.0509 4.83232,8.35538 10.7626,11.6237c4.78642,2.53724 15.29437,2.11225 16.77148,-1.95795c2.0318,-9.26291 -26.11129,-28.35848 -10.68903,-31.2815c18.55524,-2.71473 4.74866,23.84573 24.31006,29.69419c9.50188,2.02824 15.63902,-0.62194 14.81255,-4.03272c-2.74586,-11.26327 -25.13557,-22.6802 -24.96441,-33.14968" vector-effect="non-scaling-stroke"/>\n	</clipPath>\n	\n	<symbol id="endoplasmic-reticulum" viewBox="0 0 100 100" preserveAspectRatio="none">\n	<desc>endoplasmic-reticulum</desc>\n	<path d="m73.52756,56.60967c-5.62457,-18.60675 23.51463,-32.43358 23.40173,-45.06604c-0.34426,-4.86102 -10.48934,-8.89743 -18.28974,-5.33395c-17.04119,7.87556 -15.64949,29.30503 -21.20533,42.23387c-0.35661,3.60951 -7.36274,2.46926 -7.74964,-0.48694c-5.8512,-11.38871 17.13534,-24.48692 5.96075,-29.42586c-19.63467,-8.16979 -28.75184,21.15346 -22.0682,28.81784c7.4956,14.17602 -2.17949,24.40679 -6.74689,15.49637c-2.44209,-5.30613 6.06605,-11.08445 -0.80351,-16.17689c-4.31991,-2.79993 -11.75555,-0.64618 -16.15468,3.0943c-12.89117,10.73799 4.72957,40.98145 20.96467,36.14635c4.69833,-1.95989 -3.23603,-8.70151 3.90717,-9.59951c7.29767,-0.81255 5.17628,6.18889 7.68745,9.22691c2.3071,4.0509 4.83232,8.35538 10.7626,11.6237c4.78642,2.53724 15.29437,2.11225 16.77148,-1.95795c2.0318,-9.26291 -26.11129,-28.35848 -10.68903,-31.2815c18.55524,-2.71473 4.74866,23.84573 24.31006,29.69419c9.50188,2.02824 15.63902,-0.62194 14.81255,-4.03272c-2.74586,-11.26327 -25.13557,-22.6802 -24.96441,-33.14968" style="clip-path: url(#endoplasmic-reticulum-clip-path); " vector-effect="non-scaling-stroke"/>\n	</symbol>\n\n	<!-- Golgi apparatus -->\n	<clipPath id="golgi-apparatus-clip-path1">\n	<path d="m58.46714,27.713327c-22.205345,-29.90079 37.310066,-30.258356 25.567245,-4.823446c-8.807655,18.581238 -17.066429,58.135235 -0.941673,99.22044c13.31469,27.066696 -41.748463,27.760925 -27.755554,-1.469849c11.345825,-29.420242 10.286858,-80.336422 3.129982,-92.927145z" vector-effect="non-scaling-stroke"/>\n   	</clipPath> \n	\n	<clipPath id="golgi-apparatus-clip-path2">\n   	<path d="m31.214371,36.214363c-10.791712,-21.427903 29.897598,-19.848164 18.407501,0.670895c-4.066933,7.422386 -5.782803,61.572803 1.160713,75.028805c8.52943,18.597427 -32.852985,19.355408 -20.500162,-2.250633c6.952761,-17.358604 10.473742,-52.291187 0.931948,-73.449066z" vector-effect="non-scaling-stroke"/>\n	</clipPath> \n	\n	<clipPath id="golgi-apparatus-clip-path3">\n   	<path d="m29.803959,52.160912c1.584177,11.474716 2.723461,16.737267 -1.482977,38.361366c-3.731956,12.989006 -3.600399,16.340691 -11.732334,19.412781c-6.683298,1.658531 -11.864832,-9.789436 -4.793299,-16.11377c4.855728,-5.623222 6.141087,-10.882362 6.658888,-22.954659c-0.239212,-9.521427 0.814508,-15.823826 -5.36692,-19.958626c-7.624315,-2.195171 -6.088041,-16.534611 4.824059,-13.863804c5.849354,1.027065 10.282408,8.561516 11.892582,15.116711z" vector-effect="non-scaling-stroke"/>\n	</clipPath> \n	\n	<symbol id="golgi-apparatus" viewBox="0 0 90 150" preserveAspectRatio="none">\n	<desc>golgi-apparatus</desc>\n	<path d="m58.46714,27.713327c-22.205345,-29.90079 37.310066,-30.258356 25.567245,-4.823446c-8.807655,18.581238 -17.066429,58.135235 -0.941673,99.22044c13.31469,27.066696 -41.748463,27.760925 -27.755554,-1.469849c11.345825,-29.420242 10.286858,-80.336422 3.129982,-92.927145z" style="clip-path: url(#golgi-apparatus-clip-path1); " vector-effect="non-scaling-stroke"/>\n   	<path d="m31.214371,36.214363c-10.791712,-21.427903 29.897598,-19.848164 18.407501,0.670895c-4.066933,7.422386 -5.782803,61.572803 1.160713,75.028805c8.52943,18.597427 -32.852985,19.355408 -20.500162,-2.250633c6.952761,-17.358604 10.473742,-52.291187 0.931948,-73.449066z" style="clip-path: url(#golgi-apparatus-clip-path2); " vector-effect="non-scaling-stroke"/>\n   	<path d="m29.803959,52.160912c1.584177,11.474716 2.723461,16.737267 -1.482977,38.361366c-3.731956,12.989006 -3.600399,16.340691 -11.732334,19.412781c-6.683298,1.658531 -11.864832,-9.789436 -4.793299,-16.11377c4.855728,-5.623222 6.141087,-10.882362 6.658888,-22.954659c-0.239212,-9.521427 0.814508,-15.823826 -5.36692,-19.958626c-7.624315,-2.195171 -6.088041,-16.534611 4.824059,-13.863804c5.849354,1.027065 10.282408,8.561516 11.892582,15.116711z" style="clip-path: url(#golgi-apparatus-clip-path3); " vector-effect="non-scaling-stroke"/>\n	</symbol>\n\n	<!-- this is the dragbox shape for any set of elements that have been grouped. this only shows up in edit mode. -->\n\n	<symbol id="group-drag-box" viewBox="0 0 120 180" preserveAspectRatio="none">\n	<desc>Group</desc>\n	<rect x="0" y="0" width="120" height="180" vector-effect="non-scaling-stroke"></rect>\n	</symbol>\n\n	<!-- Shape is placeholder until it can be replaced with correct shape. -->\n	<clipPath id="hexagon-clip-path">\n	<path d="m1.42004,50.99635l21.07262,-42.13943l56.19152,0l21.0667,42.13943l-21.0667,42.14507l-56.19152,0l-21.07262,-42.14507z" vector-effect="non-scaling-stroke"/>\n        </clipPath>\n      \n	<symbol id="hexagon" viewBox="0 0 100 100" preserveAspectRatio="none">\n	<desc>hexagon</desc>\n	<path d="m1.42004,50.99635l21.07262,-42.13943l56.19152,0l21.0667,42.13943l-21.0667,42.14507l-56.19152,0l-21.07262,-42.14507z" style="clip-path: url(#hexagon-clip-path); " vector-effect="non-scaling-stroke"/>\n	</symbol>\n\n	<!-- Shape is placeholder until it can be replaced with correct shape. -->\n	<!-- The line part of this shape has a stroke width set to 1, to make it the same as the circle after clip path is applied -->\n	<clipPath id="mim-degradation-circle-clip-path" >\n	<circle cx="50" cy="50" r="49" vector-effect="non-scaling-stroke"/>\n  	</clipPath>\n  	\n	<symbol id="mim-degradation" viewBox="0 0 100 100" preserveAspectRatio="none">\n	<desc>mim-degradation</desc>\n	<circle cx="50" cy="50" r="49" style="clip-path: url(#mim-degradation-circle-clip-path); " vector-effect="non-scaling-stroke"/>\n  	<line  x1="1" y1="1" x2="100" y2="100" stroke-width="1" vector-effect="non-scaling-stroke"/>\n  	</symbol>\n	\n	<!-- mitochondria -->\n	<clipPath id="mitochondria-clip-path">\n	<path\n	d="m14.894899,26.347357c4.363817,-0.741571 3.827518,17.036169 8.182638,16.183825c8.27347,0.030762 2.982006,-28.148991 9.899754,-28.336687c6.967995,-0.187704 2.246651,29.947527 9.204983,29.43981c7.632813,-0.560024 0.507309,-32.935357 8.136253,-33.623082c7.698521,-0.689259 2.919197,32.039941 10.628349,32.224557c6.546684,0.160011 3.026451,-27.642808 9.56057,-26.921232c7.192177,0.79388 0.664818,29.842905 7.781624,31.667604c4.748405,1.215439 4.420822,-18.257757 9.204018,-17.440804c11.128883,7.577278 8.628105,37.698658 -2.179977,44.645138c-3.138542,0.698479 -3.965698,-10.502029 -7.112938,-9.905075c-5.59005,1.058502 -3.982124,22.284088 -9.603096,21.799461c-5.239281,-0.456947 -2.226364,-21.636383 -7.47047,-21.730232c-6.961235,-0.116928 -3.357895,28.924408 -10.316231,28.495148c-6.140846,-0.375397 -1.73064,-24.950363 -7.825104,-26.191963c-5.681847,-1.156982 -5.378429,22.170242 -11.027426,20.680939c-6.249069,-1.644684 -0.469624,-26.673519 -6.759275,-27.865887c-3.728954,-0.706188 -2.647665,14.400654 -6.403677,14.545292c-14.016198,-5.938736 -15.748776,-39.707981 -3.899994,-47.666811z" vector-effect="non-scaling-stroke"/>\n	</clipPath> \n	\n	<symbol id="mitochondria" viewBox="0 0 100 100" preserveAspectRatio="none">\n	<desc>Mitochondria</desc>\n	<use x="0" y="0" width="100" height="100" xlink:href="#oval"></use>\n	<path\n	d="m14.894899,26.347357c4.363817,-0.741571 3.827518,17.036169 8.182638,16.183825c8.27347,0.030762 2.982006,-28.148991 9.899754,-28.336687c6.967995,-0.187704 2.246651,29.947527 9.204983,29.43981c7.632813,-0.560024 0.507309,-32.935357 8.136253,-33.623082c7.698521,-0.689259 2.919197,32.039941 10.628349,32.224557c6.546684,0.160011 3.026451,-27.642808 9.56057,-26.921232c7.192177,0.79388 0.664818,29.842905 7.781624,31.667604c4.748405,1.215439 4.420822,-18.257757 9.204018,-17.440804c11.128883,7.577278 8.628105,37.698658 -2.179977,44.645138c-3.138542,0.698479 -3.965698,-10.502029 -7.112938,-9.905075c-5.59005,1.058502 -3.982124,22.284088 -9.603096,21.799461c-5.239281,-0.456947 -2.226364,-21.636383 -7.47047,-21.730232c-6.961235,-0.116928 -3.357895,28.924408 -10.316231,28.495148c-6.140846,-0.375397 -1.73064,-24.950363 -7.825104,-26.191963c-5.681847,-1.156982 -5.378429,22.170242 -11.027426,20.680939c-6.249069,-1.644684 -0.469624,-26.673519 -6.759275,-27.865887c-3.728954,-0.706188 -2.647665,14.400654 -6.403677,14.545292c-14.016198,-5.938736 -15.748776,-39.707981 -3.899994,-47.666811z" style="clip-path: url(#mitochondria-clip-path); " vector-effect="non-scaling-stroke"/>\n	</symbol>\n\n	<!-- oval -->\n        <clipPath id="oval-clip-path">\n      	<ellipse cx="50" cy="25" rx="50" ry="25" vector-effect="non-scaling-stroke"></ellipse>\n        </clipPath>\n\n	<symbol id="oval" viewBox="0 0 100 50" preserveAspectRatio="none">\n	<desc>Ellipse</desc>\n	<ellipse cx="50" cy="25" rx="50" ry="25" style="clip-path: url(#oval-clip-path); " vector-effect="non-scaling-stroke"></ellipse>\n	</symbol>\n\n	<!-- pentagon -->\n        <clipPath id="pentagon-clip-path">\n	<polygon points="59.159732818603516,99.61322021484375 95,50.28331756591797 59.159732818603516,0.9534196853637695 1.168962001800537,19.795764923095703 1.168962001800537,80.7708740234375 " vector-effect="non-scaling-stroke"/>\n	</clipPath>\n	\n	<symbol id="pentagon" viewBox="0 0 100 100" preserveAspectRatio="none">\n	<desc>pentagon</desc>\n	<polygon points="59.159732818603516,99.61322021484375 95,50.28331756591797 59.159732818603516,0.9534196853637695 1.168962001800537,19.795764923095703 1.168962001800537,80.7708740234375 " style="clip-path: url(#pentagon-clip-path); " vector-effect="non-scaling-stroke"/>\n	</symbol>\n\n	<!-- rectangle -->\n      	<clipPath id="rectangle-clip-path">\n	<rect x="0" y="0" width="100" height="50" vector-effect="non-scaling-stroke"></rect>\n      	</clipPath>\n      \n	<symbol id="rectangle" viewBox="0 0 100 50" preserveAspectRatio="none">\n	<desc>Rectangle</desc>\n	<rect x="0" y="0" width="100" height="50" style="clip-path: url(#rectangle-clip-path); " vector-effect="non-scaling-stroke"></rect>\n	</symbol>\n\n	<!-- rounded-rectangle -->\n	<!-- TODO the rounded corners need to be constant in size, meaning they will probably have to be defined in JavaScript. -->\n      	<clipPath id="rounded-rectangle-clip-path">\n	<rect x="0" y="0" rx="2.5" ry="2.5"  width="100" height="50" vector-effect="non-scaling-stroke"></rect>\n      	</clipPath>\n      \n	<symbol id="rounded-rectangle" viewBox="0 0 100 50" preserveAspectRatio="none">\n	<desc>Rounded Rectangle</desc>\n	<rect x="0" y="0" rx="2.5" ry="2.5" width="100" height="50" style="clip-path: url(#rounded-rectangle-clip-path); " vector-effect="non-scaling-stroke"></rect>\n	</symbol>\n\n	<!-- Sarcoplasmic reticulum -->\n	<clipPath id="sarcoplasmic-reticulum-clip-path">\n	<path d="m46.60182,1.40724c-32.37224,1.34138 -36.32004,22.77011 -26.50318,38.12777c9.31826,18.3425 -18.7656,30.15016 2.56955,49.37807c16.82126,13.11594 46.33175,6.10508 52.12638,-8.56826c5.89916,-15.24847 -10.95099,-26.0272 -3.29316,-40.96135c10.85342,-19.88432 -0.77615,-38.13043 -24.89959,-37.97624z" vector-effect="non-scaling-stroke"/>	\n	</clipPath>\n	\n	<symbol id="sarcoplasmic-reticulum" viewBox="0 0 80 100" preserveAspectRatio="none">\n	<desc>sarcoplasmic-reticulum</desc>\n	<path d="m46.60182,1.40724c-32.37224,1.34138 -36.32004,22.77011 -26.50318,38.12777c9.31826,18.3425 -18.7656,30.15016 2.56955,49.37807c16.82126,13.11594 46.33175,6.10508 52.12638,-8.56826c5.89916,-15.24847 -10.95099,-26.0272 -3.29316,-40.96135c10.85342,-19.88432 -0.77615,-38.13043 -24.89959,-37.97624z" style="clip-path: url(#sarcoplasmic-reticulum-clip-path); " vector-effect="non-scaling-stroke"/>	\n	</symbol>\n\n	<!-- triangle -->\n\n	<clipPath id="triangle-clip-path">\n	<polygon points="1,49 49,24 1,1" vector-effect="non-scaling-stroke"/>\n        </clipPath>\n\n	<symbol id="triangle" viewBox="0 0 50 50" preserveAspectRatio="none">\n	<desc>triangle</desc>\n	<polygon points="1,49 49,24 1,1" style="clip-path: url(#triangle-clip-path);" vector-effect="non-scaling-stroke"/>\n	</symbol>\n\n	<!-- TODO Update placeholders for SVG definitions of shapes.\n\n	For current symbols in GIF and/or BMP format, see\n	http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/resources/\n\n	Should we add SBGN? Available as SVG here: http://www.sbgn.org/Documents/Templates \n	Not sure about adding lines. Should they be only defined in CSS?\n	-->\n\n	</defs>\n		<g id="viewport">\n		</g>\n\n	</svg>\n';
;

pathvisio.helpers = function(){

  function isUrl(str) {

    // from http://forums.devshed.com/javascript-development-115/regexp-to-match-url-pattern-493764.html

    var urlPattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
    return urlPattern.test(str);
  }

  function splitStringByNewLine(str) {

    // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.

    return str.split(/\r\n|\r|\n/g);
  }

  function cloneNode(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  }

  function getUrlParam(name) {

    // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
    // This will be replaced once we get the backend php to get the json

    var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    if (!!parameter) {
      return parameter;
    }
    else {
      console.warn('Warning: URL parameter "' + name + '" is null.');
      return null;
    }
  }

  function convertToArray(object) {
    var array = null;
    if (Object.prototype.toString.call( object ) === '[object Object]' ) {
      array = [];
      array.push(object);
      return array;
    }
    else {
      if( Object.prototype.toString.call( object ) === '[object Array]' ) {
        return object;
      }
      else {
        if( Object.prototype.toString.call( object ) === '[object String]' ) {
          array = [];
          array.push(object);
          return array;
        }
      }
    }
  }

  function getWindowDimensions(object) {
    var winW = 630, winH = 460;
    if (document.body && document.body.offsetWidth) {
     winW = document.body.offsetWidth;
     winH = document.body.offsetHeight;
    }
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
     winW = document.documentElement.offsetWidth;
     winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
     winW = window.innerWidth;
     winH = window.innerHeight;
    }
    return {'width':winW, 'height':winH};
  }

  // from http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another

  function moveArrayItem(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  }

  return{
    isUrl:isUrl,
    splitStringByNewLine:splitStringByNewLine,
    getUrlParam:getUrlParam,
    cloneNode:cloneNode,
    convertToArray:convertToArray,
    getWindowDimensions:getWindowDimensions,
    moveArrayItem:moveArrayItem
  };
}();



;

pathvisio.pathway = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON

  function gpml2json(gpml, callback){

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    self.gpml = gpml;
    console.log('GPML');
    console.log(gpml);
    
    //var pathway = pathvisio.data.pathways[url];
    var pathway = self.pathway = xml.xmlToJSON(gpml, true).pathway;
    
    console.log('raw json from xml2json');
    console.log(xml.xmlToJSON(gpml, true).pathway);

    var xmlns = null;
    try {
      xmlns = pathway.xmlns;
    }
    catch (e) {
      console.log(e.message);
      return;
    }

    // test for whether file is GPML based on xmlns without reference to version

    var gpmlXmlnsSupported = "http://pathvisio.org/GPML/2013a";
    var gpmlXmlnsIdentifier = "/GPML/";

    // current and previous GPML xmlns values
    // "http://pathvisio.org/GPML/2013a"
    // "http://genmapp.org/GPML/2010a"
    // "http://genmapp.org/GPML/2008a"
    // "http://genmapp.org/GPML/2007"

    if ( xmlns.indexOf(gpmlXmlnsIdentifier) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisio.js). As of this writing, the latest version is 2013a.

      if (xmlns != gpmlXmlnsSupported) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + xmlns + "). Please convert to the supported version of GPML (xmlns: " + gpmlXmlnsSupported + ").");
      }

      pathway.boardWidth = pathway.graphics.boardWidth;
      pathway.boardHeight = pathway.graphics.boardHeight;

      // infoBox
      // These values are a legacy from GenMAPP. They are always forced to be equal to 0 in PathVisio (Java) so as to place the infobox in the upper lefthand corner.

      pathway.infoBox.x = 0;
      delete pathway.infoBox.centerX;
      pathway.infoBox.y = 0;
      delete pathway.infoBox.centerY;

      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = pathvisio.helpers.convertToArray( pathway.comment );
          delete pathway.comment;

          pathway.comments.forEach(function(element, index, array) {
            // modify data
          });
        }
        else {
          console.log("No element(s) named 'comment' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting comment to json: " + e.message);
      }

      // Groups

      try {
        if (pathway.hasOwnProperty('group')) {
          pathway.groups = pathvisio.helpers.convertToArray( pathway.group );
          delete pathway.group;

          pathway.groups.forEach(function(element, index, array) {
            if (element.hasOwnProperty('style')) {
              element.style = element.style.toLowerCase();
            }
            else {
              element.style = 'none';
            }

          });
        }
        else {
          console.log("No element(s) named 'group' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting group to json: " + e.message);
      }

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalLine')) {
          var graphicalLines = pathvisio.helpers.convertToArray( pathway.graphicalLine );
          delete pathway.graphicalLine;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          graphicalLines.forEach(function(element, index, array) {
            element.edgeType = 'graphical-line';
            pathway.edges.push(element);
          });
        }
        else {
          console.log("No element(s) named 'graphicalLine' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting graphicalLine to json: " + e.message);
      }

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = pathvisio.helpers.convertToArray( pathway.interaction );
          delete pathway.interaction;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          interactions.forEach(function(element, index, array) {
            element.edgeType = 'interaction';
            pathway.edges.push(element);
          });

          self.interactions = interactions;
          self.edges = pathway.edges;
        }
        else {
          console.log("No element(s) named 'interaction' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting interaction to json: " + e.message);
      }

      // Edges

      try {
        if (pathway.hasOwnProperty('edges')) {
          pathway.edges = pathvisio.pathway.edge.gpml2json(pathway.edges);
        }
        else {
          console.log("No element(s) named 'edges' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting edges to json: " + e.message);
      }

      // DataNodes 

      try {
        if (pathway.hasOwnProperty('dataNode')) {
          var dataNodes = pathvisio.helpers.convertToArray( pathway.dataNode );
          delete pathway.dataNode;

          dataNodes.forEach(function(element, index, array) {

            element.elementType = 'data-node';

            element.dataNodeType = caseConverter.paramCase(element.type);
            delete element.type;

            if (element.hasOwnProperty('xref')) {
              if ((!element.xref.database) && (!element.xref.iD)) {
                delete element.xref;
              }
              else {
                element.xRef = element.xref;
                delete element.xref;

                element.xRef.id = element.xRef.iD;
                delete element.xRef.iD;
              }
            }
          });

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(dataNodes);
          }
          else {
            pathway.nodes = dataNodes;
          }

        }
        else {
          console.log("No element(s) named 'dataNode' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting dataNode to json: " + e.message);
      }

      // Labels

      try {
        if (pathway.hasOwnProperty('label')) {
          var labels = self.labels = pathvisio.helpers.convertToArray( pathway.label );
          delete pathway.label;

          labels.forEach(function(element, index, array) {
            element.elementType = 'label';
          });

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(labels);
          }
          else {
            pathway.nodes = labels;
          }
        }
        else {
          console.log("No element(s) named 'label' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting label to json: " + e.message);
      }

      // Shapes

      try {
        if (pathway.hasOwnProperty('shape')) {
          var shapes = pathvisio.helpers.convertToArray( pathway.shape );
          delete pathway.shape;

          shapes.forEach(function(element, index, array) {
            element.elementType = 'shape';
          });

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(shapes);
          }
          else {
            pathway.nodes = shapes;
          }
        }
        else {
          console.log("No element(s) named 'shape' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting shape to json: " + e.message);
      }

      // Nodes

      try {
        if (pathway.hasOwnProperty('nodes')) {
          pathway.nodes = pathvisio.pathway.node.gpml2json(pathway.nodes);
        }
        else {
          console.log("No element(s) named 'nodes' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting nodes to json: " + e.message);
      }

      // BiopaxRefs 

      try {
        if (pathway.hasOwnProperty('biopaxRef')) {
          pathway.biopaxRefs = pathvisio.helpers.convertToArray( pathway.biopaxRef );
          delete pathway.biopaxRef;

          //biopaxRefs.forEach(function(element, index, array) {
            // do something
          //});
        }
        else {
          console.log("No element(s) named 'biopaxRef' for the element 'pathway' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting biopaxRef to json: " + e.message);
      }

      // Biopax 

      try {
        if (pathway.hasOwnProperty('biopax')) {
          pathway.biopax.bpPublicationXrefs = pathvisio.helpers.convertToArray( pathway.biopax.bpPublicationXref );
          delete pathway.biopax.bpPublicationXref;
        }
        else {
          console.log("No element(s) named 'biopax' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting biopax to json: " + e.message);
      }

      console.log('JSON:');
      console.log(pathway);
      console.log('pathway');
      console.log(pathway);

      delete pathway.graphics;
      //pathvisio.data.pathways.push(pathway);
      callback(pathway);
    }
    else {
      alert("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.");
      console.log("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.");
      return;
    }
  }

  // get GPML (pathway XML) from WikiPathways (by ID) or a URL (could be a local file or any other accessible GPML source),
  // convert to formatted JSON and return the JSON to the function that called getJson()

  function getJson(url, callback) {
    if (!url) {

      // TODO throw a proper error here

      var error = 'Error: URL not specified.';
      console.warn(error);
      return error;
    }
    else {

      // I would prefer to use d3.xml for the http request in order to not depend on jQuery,
      // but d3.xml doesn't seem to work with IE8. TODO remove dependency on jQuery

      // be sure server has set gpml mime type to application/xml or application/gpml+xml

      $.get(url, 'application/xml', function(gpml) {
        pathvisio.pathway.gpml2json(gpml, function(json) {
          callback(json);
        });
      });
    }
  }

  function highlightByLabel(nodeLabel) {
    console.log('nodeLabel');
    console.log(nodeLabel);
    var svg = d3.select("#pathway-image");
    svg.selectAll('g.nodes-container')
    .attr('style', '');
    var dataNodes = self.dataNodes = svg.datum().nodes.filter(function(element) {return element.elementType === 'data-node';});
    var dataNodesWithText = self.dataNodesWithText = dataNodes.filter(function(element) {return (!!element.textLabel);});
    var selectedNodes = self.selectedNodes = dataNodesWithText.filter(function(element) {return element.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      console.log('node');
      console.log(node);

      var nodeDomElement = svg.select('#nodes-container-' + node.graphId);
      nodeDomElement.attr('style', 'fill:yellow');
      console.log('nodeDomElement');
      console.log(nodeDomElement);
      self. nodeDomElement= nodeDomElement;
    });
  }

  function draw(svg){
    var pathway = null;
    if (!svg.datum()) {
      console.warn('Error: No data entered as input.');
      return 'Error';
    }
    else {
      pathway = svg.datum();
    }

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
      d.x=d3.event.x;
      d.y=d3.event.y;
      d3.select(this)
      .attr("x", d3.event.x)
      .attr("y", d3.event.y);
    }

    svg.attr('width', pathway.boardWidth);
    svg.attr('height', pathway.boardHeight);

    if (!!pathway.biopaxRefs) {
      var pathwayPublicationXrefs = svg.select('#viewport').selectAll(".pathway-publication-xref-text")
      .data(pathway.biopaxRefs)
      .enter()
      .append("text")
      .attr("id", function (d) { return 'pathway-publication-xref-text-' + d; })
      .attr("x", 0)
      .attr("y", 0)
      .attr('transform', function(d,i) { return 'translate(' + (200 + i*12) + ' ' + 12 + ')'; })
      .attr("class", 'pathway-publication-xref-text')
      .attr("style", "")
      .text(function (d) {

        // d is an array of biopaxRefs. There are several IDs for biopaxRefs, but rdfId (rdf:id) is the one used for
        // GPML to link pathway elements with biopaxRefs.
        // TODO I set rdfId to null here because I think not doing so could result in errors if the rdfId value for
        // a previous instance of biopaxRefs had a value that was used when evaluating a later instance

        var index = 0;
        var rdfId = null;
        do {
          rdfId = pathway.biopax.bpPublicationXrefs[index].rdfId;
          index += 1;
        } while (rdfId !== d.Text && index < pathway.biopax.bpPublicationXrefs.length);
        return index;});
    }

    svg.datum().symbolsAvailable = svg.selectAll('symbol');

    svg.datum().markersAvailable = svg.selectAll('marker');

    if (pathway.hasOwnProperty('groups')) {
      pathvisio.pathway.group.drawAll(svg);
    }

    if (pathway.hasOwnProperty('edges')) {
      pathvisio.pathway.edge.drawAll(svg);
    }

    if (pathway.hasOwnProperty('nodes')) {
      pathvisio.pathway.node.drawAll(svg);
    }

    if (pathway.hasOwnProperty('infoBox')) {
      pathvisio.pathway.infoBox.draw(svg);
    }
    window.setTimeout(function() {
      window.root = document.documentElement.getElementsByTagName("svg")[0];
      root.addEventListener('click', function () {
        enableZoom = 1;
      });
      setupHandlers(root);
    }, 1000);
  }

  function getSvg(url, attemptCount, callback) {

    /*
    // from http://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text
    
    var pathwayTemplateSvgUrl = null;
    if (pathvisio.helpers.isUrl(url)) {
      pathwayTemplateSvgUrl = url;
    }
    else {
      pathwayTemplateSvgUrl = "pathway-template.svg";
    }
    //*/

    ///*
    // Use this code if you want to get the SVG using d3.xml.
    d3.text(url, 'text/plain', function(svg) {
      d3.select('#pathway-container')[0][0].innerHTML = svg;
      callback(d3.select('#pathway-image'));
    });
    //*/


    /*
    // I think this would be used if the SVG were included in the document as an embedded object instead of included directly in the DOM.

    var svg = d3.select("#pathway-object").select(function() {

      if (!this.getSVGDocument()) {
        return window.setTimeout(function() {
          if (attemptCount < 15) {
            console.log('Pathway image is loading. Status check #' + (attemptCount + 1) + ' in ' + 0.25*(attemptCount + 0) + ' seconds.');
            attemptCount += 1;
            getSvg(url, attemptCount, callback);
          }
          else {
            console.warn('Error: Pathway image appears to be unavailable.');
          }
        }, 250 * attemptCount);
      }
      callback(d3.select(this.getSVGDocument().documentElement));
    });
    //*/

    /*
     * get using jquery
    $.ajax({
      url: pathwayTemplateSvgUrl,
      dataType: "application/xml",
      success: callback 
    });
    //*/
  }

  // get JSON and draw SVG representation of pathway

  function load(targetSelector, svgUrl, gpmlUrl, highlightByLabelSelector) {
    if (!targetSelector) { return console.warn('Error: No pathway container selector specified as target.'); }
    if (d3.select(targetSelector).length !== 1) { return console.warn('pathway container selector must be unique.'); }
    //if (!pathvisio.helpers.isUrl(svgUrl)) { return console.warn('Error: No URL specified for SVG pathway template.'); }
    //if (!pathvisio.helpers.isUrl(gpmlUrl)) { return console.warn('Error: No URL specified for GPML data source.'); }

    getSvg(svgUrl, 1, function(svg) {
      var target = d3.select(targetSelector);
      //svgPanZoom.init();


      // this does not work
      //target.append(svg);

      getJson(gpmlUrl, function(pathway) {
        svg.datum(pathway);
        draw(svg);

        var nodeLabels = [];
        pathway.nodes.forEach(function(node) {
          if (!!node.textLabel && node.elementType === 'data-node') {
            nodeLabels.push(node.textLabel.text);
          }
        });

        // see http://twitter.github.io/typeahead.js/

        $(highlightByLabelSelector).typeahead({
          name: 'Find in pathway',
          local: nodeLabels,
          limit: 10
        });
        $('.icon-eye-open').click(function(){
          var nodeLabel = $("#highlight-by-label").val();
          if (!nodeLabel) {
            console.warn('Error: No data node value entered.');
          }
          else {
            pathvisio.pathway.highlightByLabel(nodeLabel);
          }
        });
      });
    });
  }

  return {
    draw:draw,
    load:load,
    getJson:getJson,
    gpml2json:gpml2json,
    highlightByLabel:highlightByLabel
  };
}();
;

pathvisio.pathway.group = function(){
  function drawAll(svg) {
    var groups = svg.datum().groups;
    if (!groups) { return console.warn('Error: No group data available.');}

    // only consider non-empty groups

    var validGroups = groups.filter(function(el) {
      var groupId = el.groupId;
      return (svg.datum().nodes.filter(function(el) {return (el.groupRef === groupId);}).length>0);
    });

    var pathData = null;
    var groupsContainer = svg.select('#viewport').selectAll("use.group")
    .data(validGroups)
    .enter()
    .append("path")
    .attr("id", function (d) { return 'group-' + d.graphId;})
    .attr("class", function(d) { return 'group group-' +  d.style;})

    // We tried using symbols for the group shapes, but this wasn't possible because the symbols scaled uniformly, and the beveled corners of the complex group
    // are supposed to remain constant in size, regardless of changes in group size.

    .attr("d", function(d) {
      var groupDimensions = getDimensions(svg.datum(), d.groupId);
      if (d.style === 'none' || d.style === 'group' || d.style === 'pathway') {
        pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
      }
      else {
        if (d.style === 'complex') {
          pathData = 'M ' + (groupDimensions.x + 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + 20) + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x + 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + 20) + ' Z';
        }
        else {
          pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
        }
      }
      return pathData;
    });
    //.call(drag);
  }

  function getDimensions(pathway, groupId) {
    var groupMembers = pathway.nodes.filter(function(el) {return (el.groupRef === groupId);});
    var group = {};

    // I think this is margin, not padding, but I'm not sure

    var margin = 12;
    group.x = (d3.min(groupMembers, function(el) {return el.x;})) - margin;
    group.y = (d3.min(groupMembers, function(el) {return el.y;})) - margin;

    group.width = (d3.max(groupMembers, function(el) {return el.x + el.width;})) - group.x + margin;
    group.height = (d3.max(groupMembers, function(el) {return el.y + el.height;})) - group.y + margin;

    return group;
  }
 
  return {
    drawAll:drawAll,
    getDimensions:getDimensions
  };
}();
;

pathvisio.pathway.infoBox = function(){
    
  function draw(svg) {

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (svg.datum().hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':svg.datum().name});
    }

    if (svg.datum().hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':svg.datum().license});
    }

    if (svg.datum().hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':svg.datum().lastModified});
    }

    if (svg.datum().hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':svg.datum().organism});
    }

    var infoBoxElements = svg.select('#viewport').selectAll("text.info-box")
    .data(infoBox)
    .enter()
    .append("text")
    .attr("id", function (d,i) {return "info-box-" + i; })
    .attr("class", "info-box")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    infoBoxElements.append("tspan")
    .attr("class", "info-box-property-name")
    .text(function (d) {return d.key + ': ';});

    infoBoxElements.append("tspan")
    .text(function (d) {return d.value;});
  }

  return {
    draw:draw
  };
}();





;

// Draw nodes. Includes data nodes, shapes, labels, cellular components...

pathvisio.pathway.node = function(){

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

  function gpml2json(rawJsonNodes) {
    try {

      // Nodes

      rawJsonNodes.forEach(function(element, index, array) {
        if (element.hasOwnProperty('comment')) {
          element.comments = pathvisio.helpers.convertToArray( element.comment );
          delete element.comment;
        }

        // Be warned that support for zIndex in SVG is spotty. It's best to rely on ordering in the DOM as well.

        if (element.graphics.hasOwnProperty("zorder")) {
          element.zIndex = parseFloat(element.graphics.zorder);
        }

        element.x = parseFloat(element.graphics.centerX) - parseFloat(element.graphics.width)/2;
        //element.x = Math.round( element.x * 100 ) / 100;

        element.y = parseFloat(element.graphics.centerY) - parseFloat(element.graphics.height)/2;
        //element.y = Math.round( element.y * 100 ) / 100;

        element.width = parseFloat(element.graphics.width);
        //element.width = Math.round( element.width * 100 ) / 100;

        element.height = parseFloat(element.graphics.height);
        //element.height = Math.round( element.height * 100 ) / 100;

        if (element.graphics.hasOwnProperty("color")) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) {
            element.stroke = color.toHex();
          }
          else {
            console.warn('Invalid Color encountered. Setting Color to black.');
            element.fill = "#000000";
          }
        }

        if ((!(element.graphics.hasOwnProperty("shapeType")))) {
          if (element.elementType === 'data-node') {
            element.symbolType = "rectangle";
          }
          else {
            element.symbolType = "none";
          }
        }
        else {
          element.symbolType = caseConverter.paramCase(element.graphics.shapeType);
        }

        if (element.graphics.hasOwnProperty("fillColor")) {

          // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
          // license: Use it if you like it

          element.graphics.fillColor = element.graphics.fillColor.toLowerCase();

          if (element.graphics.fillColor === 'transparent') {
            element.fillOpacity = 0;
          }
          else {
            var fill = new RGBColor(element.graphics.fillColor);
            if (fill.ok) {
              element.fill = fill.toHex();
            }
            else {
              console.warn('Invalid FillColor encountered. Setting FillColor to gray.');
              element.fill = "#999999";
            }

            if (element.symbolType !== 'none') {
              element.fillOpacity = 1;
            }
          }
        }

        if (element.graphics.hasOwnProperty("lineThickness")) {
          element.strokeWidth = element.graphics.lineThickness;
        }

        if (element.graphics.hasOwnProperty('lineStyle')) {
          element.strokeStyle = element.graphics.lineStyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          }
        }

        if (element.hasOwnProperty('attribute')) {
          element.attributes = pathvisio.helpers.convertToArray( element.attribute );
          delete element.attribute;
          element.attributes.forEach(function(el, index, array) {
            if ((el.key === "org.pathvisio.DoubleLineProperty") && (el.value === "Double")) {
              console.log('double');
              console.log(el);
              element.strokeStyle = 'double';
            }
            else {
              if ((el.key === "org.pathvisio.CellularComponentProperty") && (el.value !== "None")) {
                element.cellularComponent = el.value;
              }
            }
          });
          delete element.attributes;
        }

        if (element.graphics.hasOwnProperty("rotation")) {

          // get rotation in degrees because SVG rotate attribute uses degrees
          // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

          element.rotation = element.graphics.rotation * (180 / Math.PI);
          //element.rotation = Math.round( element.rotation * 100 ) / 100;
        }

        // textLabel data

        if (element.hasOwnProperty("textLabel")) {
          if (!element.textLabel) {
            delete element.textLabel;
          }
          else {
            var text = element.textLabel.toString().replace("&#xA;","\r\n");
            delete element.textLabel;

            element.textLabel = {};

            element.textLabel.text = text;

            if (element.hasOwnProperty("stroke")) {

              // element stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

              element.textLabel.fill = element.stroke;
            }

            // default fontSize is already specified in the CSS of pathway-template.svg, but I need the font size
            // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.
            
            var fontSize = null;

            if (element.graphics.hasOwnProperty("fontSize")) {
              fontSize = element.graphics.fontSize;
            }
            else {
              fontSize = 10;
            }
            element.textLabel.fontSize = fontSize;

            if (element.graphics.hasOwnProperty("fontName")) {
              element.textLabel.fontFamily = element.graphics.fontName;
            }

            if (element.graphics.hasOwnProperty("fontWeight")) {
              element.textLabel.fontWeight = element.graphics.fontWeight.toLowerCase();
            }

            if (element.graphics.hasOwnProperty("fontStyle")) {
              element.textLabel.fontStyle = element.graphics.fontStyle.toLowerCase();
            }

            if (alignToAnchorMappings.hasOwnProperty(element.graphics.align)) {
              element.textLabel.textAnchor = alignToAnchorMappings[element.graphics.align];
            }
            else {
              element.textLabel.textAnchor = 'middle';
            }

            if (element.graphics.hasOwnProperty("valign")) {
              element.textLabel.vAlign = element.graphics.valign.toLowerCase();
            }
            else {
              element.textLabel.vAlign = 'top';
            }
          }
        }

        // BiopaxRefs 

        try {
          if (element.hasOwnProperty('biopaxRef')) {
            element.biopaxRefs = pathvisio.helpers.convertToArray( element.biopaxRef );
            delete element.biopaxRef;

            //biopaxRefs.forEach(function(element, index, array) {
            // do something
            //});
          }
          else {
            console.log("No element(s) named 'biopaxRef' found for this node in this gpml file.");
          }
        }
        catch (e) {
          console.log("Error converting node's biopaxRef to json: " + e.message);
        }

        delete element.graphics;
      });

      var validJsonNodes = rawJsonNodes.sort(function(a,b) {return a.zIndex - b.zIndex;});
      return validJsonNodes;
    }
    catch (e) {
      console.log("Error converting labelable elements to json: " + e.message);
      return e;
    }
  }

  function drawAll(svg) {
    var nodesContainer = svg.select('#viewport').selectAll("g.nodes-container")
    .data(svg.datum().nodes)
    .enter()
    .append("g")
    .attr("id", function (d) { return 'nodes-container-' + d.graphId;})
    .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')';})
    .attr("class", "nodes-container")
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        pathvisio.pathway.xRef.displayData(svg.datum().organism, d);
      }
        /*
        var xrefDiv = $('.xrefinfo');

        // (id, datasource, species, symbol)

        var xrefHtml = XrefPanel.create(d.xRef.id, d.xRef.database, 'Homo sapiens', d.textLabel.text);
        //var xrefHtml = XrefPanel.create('HMDB01397', 'HMDB', 'Mus musculus', d.textLabel.text);
        window.setTimeout(function() {
          xrefDiv.empty();
          xrefDiv.append(xrefHtml);
        }, 2000);
        //*/
  });

    var nodes = nodesContainer.each(function(d, i) {
      var node = d3.select(this).append('use')
      .attr("id", function (d) {return 'node-' + d.graphId;})
      .attr('transform', function(d) {
        var transform = 'scale(1)';
        if (d.hasOwnProperty('rotation')) {
          transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
        }
        return transform;
      })
      .attr("class", function (d) {
        var styleClass = '';
        if (d.elementType === 'data-node') {
          styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
        }
        else {
          styleClass = "node " + d.elementType;
        }
        return styleClass;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function (d) { return d.width;})
      .attr("height", function (d) { return d.height;})
      .attr("z-index", function (d) { return d.zIndex;})
      .attr("style", function (d) {
        var style = '';

        if (d.hasOwnProperty('fill')) {
          style += 'fill:' + d.fill + '; ';
        }

        if (d.hasOwnProperty('fillOpacity')) {
          style += 'fill-opacity:' + d.fillOpacity + '; ';
        }

        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; ';
        }

        var strokeWidthEffective = null;
        if (d.hasOwnProperty('strokeWidth')) {

          // Doubling strokeWidth to create strokeWidthEffective.
          // Reason: stroke is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
          // of the stroke so that the stroke does not go outside its bounding box. Because the outer half of the stroke is not displayed, we need to
          // double the stroke width so that the stroke's apparent width matches the value specified in GPML.

          strokeWidthEffective = 2 * d.strokeWidth;
        }
        else {
          strokeWidthEffective = 2;
        }

        style += 'stroke-width:' + strokeWidthEffective + '; ';

        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            style += 'stroke-dasharray: 5,3; ';
          }

          if (d.strokeStyle === 'double') {

            // draw second element

            d3.select(nodesContainer[0][i]).append("use")
            .attr("id", function (d) {return 'node-double' + d.graphId;})
            .attr("class", function (d) {
              var styleClass = '';
              if (d.elementType === 'data-node') {
                styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
              }
              else {
                styleClass = "node " + d.elementType;
              }
              return styleClass;
            })
            .attr('transform', function(d) {
              var transform = 'scale(1)';
              if (d.hasOwnProperty('rotation')) {

                // the reference to width and height here is to specify the center of rotation as the center of the second element

                transform = 'rotate(' + d.rotation + ' ' + (d.width/2) + ' ' + (d.height/2) + ')';
              }
              return transform;
            })
            .attr("x", function(d) {return strokeWidthEffective;})
            .attr("y", function(d) {return strokeWidthEffective;})
            .attr("width", function (d) { return d.width - 2*strokeWidthEffective;})
            .attr("height", function (d) { return d.height - 2*strokeWidthEffective;})
            .attr("xlink:xlink:href", function (d) {return "#" + d.symbolType;})
            //.attr("class", "drawing-board-color-stroke")
            .attr("style", function(d) { return style + 'fill-opacity:0; ';});
          }
        }

        // be careful that all additions to 'style' go above the 'double-line second element' above
        // so that they are applied to both the first and second elements.

        return style;
      });

      if (svg.datum().symbolsAvailable[0].filter(function(element) { return (element.id === d.symbolType);}).length === 1) {

        // d3 bug strips 'xlink' so need to say 'xlink:xlink';
        
        node.attr("xlink:xlink:href", function (d) {return "#" + d.symbolType;});
      }
      else {
        node.attr("xlink:xlink:href", "#rectangle");
        console.warn('Pathvisio.js does not have access to the requested symbol: ' + svg.datum().nodes[0].symbolType + '. Rectangle used as placeholder.');
      }

      // use this for tspan option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
        var nodeText = d3.select(this).append('text')
        .attr("id", function (d) { return 'node-text-' + d.graphId;})
        .attr("x", 0)
        .attr("y", 0)
        .attr('transform', function(d) {

          // tweak left, center, right horizontal alignment
            
          var dx = null;

          if (d.textLabel.hasOwnProperty('textAnchor')) {

            // giving padding of 5. maybe this should go into the CSS.

            if (d.textLabel.textAnchor === 'start') {
              dx = 5;
            }
            else {
              if (d.textLabel.textAnchor === 'end') {
                dx = d.width - 5;
              }
              else {
                dx = d.width / 2;
              }
            }
          }
          else {
            dx = d.width / 2;
          }

          // set top, middle, bottom vertical alignment

          var dy = null;

          if (d.textLabel.hasOwnProperty('vAlign')) {
            if (d.textLabel.vAlign === 'top') {
              dy = 5 + (1 * d.textLabel.fontSize);
            }
            else {
              if (d.textLabel.vAlign === 'bottom') {
                dy = d.height - (5 + (0.3 * d.textLabel.fontSize) + ((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize));
              }
              else {
                dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
              }
            }
          }
          else {
            dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
          }
          return 'translate(' + dx + ' ' + dy + ')';})
          .attr("class", function (d) {
            var styleClass = '';
            if (d.elementType === 'data-node') {
              styleClass = d.dataNodeType;
            }
            return styleClass; })
            .attr("style", function (d) {
              var style = '';
              var fontSize = d.fontSize;
              if (d.textLabel.hasOwnProperty('fill')) {
                style += 'fill:' + d.textLabel.fill + '; ';
              }
              if (d.textLabel.hasOwnProperty('fontFamily')) {
                style += 'font-family:' + d.textLabel.fontFamily + '; ';
              }
              if (d.textLabel.hasOwnProperty('fontSize')) {
                style += 'font-size:' + d.textLabel.fontSize + 'px; ';
              }
              if (d.textLabel.hasOwnProperty('fontWeight')) {
                style += 'font-weight:' + d.textLabel.fontWeight + '; ';
              }
              if (d.textLabel.hasOwnProperty('fontStyle')) {
                style += 'font-style:' + d.textLabel.fontStyle + '; ';
              }
              if (d.textLabel.hasOwnProperty('textAnchor')) {
                style += 'text-anchor:' + d.textLabel.textAnchor + '; ';
              }
              return style;
            });

            var nodeTspan = nodeText.each(function(d) {
              var fontSize = d.textLabel.fontSize;
              d3.select(this).selectAll('tspan')
              .data(function (d) {
                var textArray = pathvisio.helpers.splitStringByNewLine(d.textLabel.text);
                return textArray;
              })
              .enter()
              .append('tspan')
              .attr("x", 0)
              .attr("y", function (d, i) { return i * fontSize;})
              .text(function (d) { return d;});
            });

            if (d.hasOwnProperty('biopaxRefs')) {
              var nodePublicationXrefs = d3.select(this).selectAll(".node-publication-xref-text")
              .data(d.biopaxRefs)
              .enter()
              .append("text")
              .attr("id", function (d) { return 'node-publication-xref-text-' + d;})
              .attr("x", 0)
              .attr("y", 0)
              .attr('transform', function(d,i) { return 'translate(' + (i*12) + ' ' + (-12) + ')';})
              .attr("class", 'node-publication-xref-text')
              .attr("style", "")
              .text(function (d) {

                // d is an array of biopaxRefs

                var index = 0;
                var rdfId = null;
                do {
                  console.log('svg.datum().biopax');
                  console.log(svg.datum().biopax);
                  rdfId = svg.datum().biopax.bpPublicationXrefs[index].rdfId;
                  index += 1;
                } while (rdfId !== d.Text && index < svg.datum().biopax.bpPublicationXrefs.length);
                return index;});
            }

      }

      /*

      // use this for foreignObject object option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
      var nodeSwitch = d3.select(this).append('switch');

      var nodeForeignObject = nodeSwitch.append('foreignObject') 
      //.attr("x", 0)
      //.attr("y", 0)
      .attr("width", function (d) { return d.width + 'px';})
      .attr("height", function (d) { return d.height + 'px';});

      var nodeBody = nodeForeignObject.append('xhtml:body') 
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .attr("id", function (d) { return 'node-text-' + d.graphId;})
      .attr("style", function (d) { return 'height:' + d.height + 'px';});

      var nodeLink = nodeBody.append('link') 
      .attr("rel", "stylesheet")
      .attr("href", "pathways.css")
      .attr("type", "text/css");

      var nodeOuter = nodeBody.append('div') 
      .attr("class", "outer") 
      .attr("style", function (d) { return 'height:' + d.height + 'px';});

      var nodeP = nodeOuter.append('p') 
      .attr("style", function (d) { 
      var style = 'height:' + d.height + 'px; ';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'color:' + d.textLabel.color + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; ';
      }
      return style;
      })
      .text(function (d) {
      var text = d.textLabel.text;
      return text;
      })
      .attr("class", function (d) { 
      var styleClass = '';
      if (d.elementType === 'data-node') {
      styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
      }
      else {
      styleClass = "node " + d.elementType;
      }
      return styleClass });

      var nodeText = nodeSwitch.append('text')
      .attr("id", function (d) { return 'node-text-' + d.graphId;})
      .attr("x", function (d) { return d.width / 2;})
      .attr("y", function (d) { return d.height / 2 + 0.3 * d.textLabel.fontSize;})
      //.attr("style", function (d) { return 'stroke:' + 'red';})
      .attr("style", function (d) { 
      var style = '';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'fill:' + d.textLabel.color + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; ';
      }
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; ';
      }
      return style;
})
.text(function (d) { return d.textLabel.text;});

}
*/
});

}

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  return {
    drawAll:drawAll,
    getPortCoordinates:getPortCoordinates,
    gpml2json:gpml2json
  };
}();
;

// Edges (interactions and graphical lines)

pathvisio.pathway.edge = function(){

  // pathvisio.js vs PathVisio (Java) specification of anchor position
  // -----------------------------------------
  // pathvisio.js |  PathVisio  | Meaning
  //  relX | relY | relx | rely |
  // -----------------------------------------
  // 0.333   0      -0.5   -1.0   top side at left third-point 
  // 0.5     0       0.0   -1.0   top side at center 
  // 0.667   0       0.5   -1.0   top side at right third-point 
  // 1       0.333   1.0   -0.5   right side at top third-point 
  // 1       0.5     1.0    0.0   right side at middle 
  // 1       0.667   1.0    0.5   right side at bottom third-point 
  // 0.667   1       0.5    1.0   bottom side at right third-point 
  // 0.5     1       0.0    1.0   bottom side at center 
  // 0.333   1      -0.5    1.0   bottom side at left third-point 
  // 0       0.667  -1.0    0.5   left side at bottom third-point 
  // 0       0.5    -1.0    0.0   left side at middle 
  // 0       0.333  -1.0   -0.5   left side at top third-point 
  //
  // PathVisio (Java) also sometimes comes up with other values for relx and rely.
  // I don't know what those mean.

  var anchorPositionMappings = { "-1":0, "-0.5":0.333, "0":0.5, "0.5":0.667, "1":1 };

  // GPML to JSON shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

  var markerMappings = {
    "Arrow":"arrow",
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"mim-necessary-stimulation",
    "mim-binding":"mim-binding",
    "mim-conversion":"mim-conversion",
    "mim-stimulation":"mim-stimulation",
    "mim-modification":"mim-modification",
    "mim-catalysis":"mim-catalysis",
    "mim-inhibition":"mim-inhibition",
    "mim-cleavage":"mim-cleavage",
    "mim-covalent-bond":"mim-covalent-bond",
    "mim-transcription-translation":"mim-transcription-translation",
    "mim-gap":"mim-gap",
    "None":"none",
    "TBar":"t-bar"
  };

  function gpml2json(rawJsonEdges) {
    try {
      rawJsonEdges.forEach(function(element, index, array) {
        if (element.graphics.hasOwnProperty('anchor')) {
          element.anchors = pathvisio.helpers.convertToArray(element.graphics.anchor);
        }

        if (element.graphics.hasOwnProperty('color')) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) {
            element.stroke = color.toHex();
          }
        }

        element.strokeWidth = element.graphics.lineThickness;

        if (element.graphics.hasOwnProperty('connectorType')) {
          element.connectorType = element.graphics.connectorType.toLowerCase();
        }

        if (element.graphics.hasOwnProperty('lineStyle')) {
          element.strokeStyle = element.graphics.lineStyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          }
        }
        else {
          if (element.hasOwnProperty('attribute')) {
            if ((element.attribute.key === "org.pathvisio.DoubleLineProperty") && (element.attribute.value === "Double")) {
              element.strokeStyle = 'double';
              delete element.attribute;
            }
          }
        }

        element.zIndex = element.graphics.zorder;

        if (element.hasOwnProperty('xref')) {
          if ((!element.xref.database) && (!element.xref.id)) {
            delete element.xref;
          }
          else {
            element.xref = element.xRef;
            delete element.xref;
          }
        }

        // Points

        var points = pathvisio.helpers.convertToArray( element.graphics.point );
        var pointsData = pathvisio.pathway.edge.point.gpml2json(points);
        element.points = pointsData.points;

        // Back to edges

        element.markerStart = pointsData.markerStart;
        element.markerEnd = pointsData.markerEnd;

        delete element.graphics;
      });

      // TODO this could be refactored to be more efficient
      // When being drawn, edges with anchors use the SVG path method path.getPointAtLength() to find endpoints. That means
      // a given path (edge) having an endpoint attached to an anchor requires that the path (edge) having that anchor be drawn
      // before the given path can be drawn. This means that sometimes the ordering of the edges in the DOM may not match the
      // z-index values specified in PathVisio. We could resort the edges after they are all drawn, but DOM operations are
      // expensive, so I will not do that unless it is required.

      rawJsonEdges.sort(function(a,b) {return a.zIndex - b.zIndex;});

      // edges with anchors will come before edges without anchors

      var edgesWithAnchors = [];
      var edgesWithoutAnchors = [];
      rawJsonEdges.forEach(function(element) {
        if (!element.hasOwnProperty('anchors')) {
          edgesWithoutAnchors.push(element);
        }
        else {
          edgesWithAnchors.push(element);
        }
      });

      // edges with many anchors will probably come before edges few anchors
      // TODO Does this really help to speed things up? Need to research it.
      // I assume it does, because I think a sort like this is less expensive
      // than the processes below, but I could be wrong, because I didn't spend
      // much time on this item.

      //edgesWithAnchors.sort(function(a,b) {return b.anchors.length - a.anchors.length;});

      // edges with endpoints not attached to anchors will come before edges with endpoints attached to anchors 

      function attachedToAnchor(point, edges) {
        var anchor = null;
        var i = -1;
        do {
          i += 1;
          anchor = edges[i].anchors.filter(function(element) {return element.graphId === point.graphRef;})[0];
        } while (!anchor && i < edges.length - 1);

        return (anchor !== undefined);
      }

      var validJsonEdges = [];
      var unsortedJsonEdges = edgesWithAnchors;

      unsortedJsonEdges.forEach(function(element, index, array) {
        if (!attachedToAnchor(element.points[0], edgesWithAnchors) && !attachedToAnchor(element.points[element.points.length - 1], edgesWithAnchors)) {
          validJsonEdges.push(element);
          array.splice(index, 1);
        }
      });

      // Recursively iterate through the list of unsorted json edges and check for whether each edge's endpoints are defined (either not attached to an anchor
      // or attached to an anchor on an edge that has already been defined in validJsonEdges. If true, add edge to validJsonEdges and remove it from unsortedJsonEdges.
      // Repeat until all edges are sorted.

      do {
        unsortedJsonEdges.forEach(function(element, index, array) {

          // TODO This is hard to read. It should be refactored.

          if (((!attachedToAnchor(element.points[0], edgesWithAnchors)) || attachedToAnchor(element.points[0], validJsonEdges)) && (attachedToAnchor(element.points[element.points.length - 1], validJsonEdges) || (!attachedToAnchor(element.points[element.points.length - 1], edgesWithAnchors)))) {
            validJsonEdges.push(element);
            array.splice(index, 1);
          }
        });
      } while (unsortedJsonEdges.length > 0);

      // add back in the edges having no anchors 
      
      validJsonEdges = validJsonEdges.concat(edgesWithoutAnchors);
      return validJsonEdges;
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    }
  }

  function drawAll(svg) {
    if (svg.datum().hasOwnProperty('edges')) {
      var pathData = null;

      var edges = svg.select('#viewport').selectAll("pathway.edge")
      .data(svg.datum().edges)
      .enter()
      .append("path")
      .attr("id", function (d) { return d.edgeType + '-' + d.graphId; })
      .attr("class", function (d) {
        var styleClass = 'edge ' + d.edgeType + ' ';
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke";
          }
        }
        return styleClass;
      })
      .attr("d", function (d) {
        pathData = pathvisio.pathway.edge.pathData.get(svg, d);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            svg.select('#viewport').append("path")
            .attr("class", d.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "drawing-board-color-stroke")
            .attr("style", "stroke-width:" + d.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisio.pathway.edge.marker.draw(svg, d.markerStart, 'start', d.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisio.pathway.edge.marker.draw(svg, d.markerEnd, 'end', d.stroke) + ')');
          }
        }
        return pathData;
      })
      .attr("style", function (d) {
        var style = 'stroke-width:' + d.strokeWidth + '; ';
        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; ';
        }
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * d.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (d) {
        var markerStart = pathvisio.pathway.edge.marker.draw(svg, d.markerStart, 'start', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (d) {
        var markerEnd = pathvisio.pathway.edge.marker.draw(svg, d.markerEnd, 'end', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none');
    }
  }

  return {
    gpml2json:gpml2json,
    drawAll:drawAll
  };
}();
  
;

pathvisio.pathway.edge.marker = function(){

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  function draw(svg, name, position, color) {
    var markerUrl = '';

    // if no marker is to be used, JSON data will specify 'none'.

    if (name === 'none') {
      markerUrl = name;
    }
    else {

      // check for whether the desired marker is defined once in the pathway template svg.

      if (svg.datum().markersAvailable[0].filter(function(element) { return (element.id === name + '-' + position + '-black');}).length === 1) {

        // if the desired stroke color is black, use the marker specified in the pathway template svg.

        if ( (color === '#000') || (color === '#000000') || (!(color)) ) {
          markerUrl = name + '-' + position + '-black';
        }

        // else create a new marker with the desired color

        else {
          /*
          var pathway.svg = d3.select("#pathway-container").select(function() {
            return this.contentDocument.documentElement;
          });
          */

          var markerElementBlack = svg.select('marker#' + name + '-' + position + '-black');
          var markerElement = pathvisio.helpers.cloneNode(markerElementBlack[0][0]);

          // define style of marker element

          var markerElementStyle = '';

          if (markerElement[0][0].getAttribute('stroke') === 'black') {
            markerElementStyle += 'stroke:' + color + '; ';
          }

          if (markerElement[0][0].getAttribute('fill') === 'black') {
            markerElementStyle += 'fill:' + color + '; ';
          }

          markerElement[0][0].setAttribute('id', name + '-' + position + '-' + color );
          markerElement[0][0].setAttribute('style', markerElementStyle);

          markerUrl = name + '-' + position + '-' + color;
        }
      }
      else {
        markerUrl = 'none';
        console.warn('Pathvisio.js does not have access to the requested marker: ' + name);
      }
    }
    return markerUrl;
  }
 
  return {
    draw:draw
  };
}();
;

pathvisio.pathway.edge.point = function(){

  // pathvisio.js vs PathVisio (Java) specification of anchor position
  // -----------------------------------------
  // pathvisio.js |  PathVisio  | Meaning
  //  relX | relY | relX | relY |
  // -----------------------------------------
  // 0.333   0      -0.5   -1.0   top side at left third-point 
  // 0.5     0       0.0   -1.0   top side at center 
  // 0.667   0       0.5   -1.0   top side at right third-point 
  // 1       0.333   1.0   -0.5   right side at top third-point 
  // 1       0.5     1.0    0.0   right side at middle 
  // 1       0.667   1.0    0.5   right side at bottom third-point 
  // 0.667   1       0.5    1.0   bottom side at right third-point 
  // 0.5     1       0.0    1.0   bottom side at center 
  // 0.333   1      -0.5    1.0   bottom side at left third-point 
  // 0       0.667  -1.0    0.5   left side at bottom third-point 
  // 0       0.5    -1.0    0.0   left side at middle 
  // 0       0.333  -1.0   -0.5   left side at top third-point 
  //
  // PathVisio (Java) also sometimes comes up with other values for relX and relY.
  // I don't know what those mean.

  var anchorPositionMappings = { "-1":0, "-0.5":0.333, "0":0.5, "0.5":0.667, "1":1 };

  // GPML to jGPML shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

  var markerMappings = {
    "Arrow":"arrow",
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"mim-necessary-stimulation",
    "mim-binding":"mim-binding",
    "mim-conversion":"mim-conversion",
    "mim-stimulation":"mim-stimulation",
    "mim-modification":"mim-modification",
    "mim-catalysis":"mim-catalysis",
    "mim-inhibition":"mim-inhibition",
    "mim-cleavage":"mim-cleavage",
    "mim-covalent-bond":"mim-covalent-bond",
    "mim-transcription-translation":"mim-transcription-translation",
    "mim-gap":"mim-gap",
    "none":"none",
    "TBar":"t-bar"
  };

  function gpml2json(rawJsonPoints) {
    try {
      var markerStart = 'none';
      var markerEnd = 'none';

      rawJsonPoints.forEach(function(element, index, array) {

        // for anchor points, the data model for a point is
        // relX, relY, [dx], [dy]
        // with dx and dy only being used for the first and last point
        //
        // "relX, relY" indicates where on the shape the anchor is located.
        //
        // Table of meanings for "relX, relY"
        // ----------------------------------
        //  relX   |   relY   | meaning
        // ----------------------------------
        // 0.333   0       top side at left third-point 
        // 0.5     0       top side at center 
        // 0.667   0       top side at right third-point 
        // 1       0.333   right side at top third-point 
        // 1       0.5     right side at middle 
        // 1       0.667   right side at bottom third-point 
        // 0.667   1       bottom side at right third-point 
        // 0.5     1       bottom side at center 
        // 0.333   1       bottom side at left third-point 
        // 0       0.667   left side at bottom third-point 
        // 0       0.5     left side at middle 
        // 0       0.333   left side at top third-point 
        //
        // "dx, dy" indicates the direction of the line relative to the shape
        //
        // Table of meanings for "dx, dy"
        // ------------------------------
        //  dx | dy | meaning
        // ------------------------------
        //   0   -1   line emanates upward from anchor 
        //   1    0   line emanates rightward from anchor 
        //   0    1   line emanates downward from anchor 
        //  -1    0   line emanates leftward from anchor 
        //
        //  adapted from jsPlumb implementation:
        //  https://github.com/sporritt/jsPlumb/wiki/anchors

        if (element.graphRef !== undefined) {
          delete element.x;
          delete element.y;

          var relX = (Math.round(element.relX * 2)/2).toString();
          element.relX = parseFloat(anchorPositionMappings[relX]);

          var relY = (Math.round(element.relY * 2)/2).toString();
          element.relY = parseFloat(anchorPositionMappings[relY]);

          if (element.relX === 0) {
            element.dx = -1;
          }
          else {
            if (element.relX === 1) {
              element.dx = 1;
            }
            else {
              if (element.relY === 0) {
                element.dy = -1;
              }
              else {
                if (element.relY === 1) {
                  element.dy = 1;
                }
              }
            }
          }
        }

        // This is probably unreliable. We need to establish a way to ensure we identify start and end markers correctly, and we should not relY on the order of elements in XML.

        if ((index === 0) && (markerMappings.hasOwnProperty(element.arrowHead))) {
          markerStart = markerMappings[element.arrowHead];
          delete element.arrowHead;
        }
        else {
          if ((index === array.length - 1) && (markerMappings.hasOwnProperty(element.arrowHead))) {
            markerEnd = markerMappings[element.arrowHead];
            delete element.arrowHead;
          }
        }
      });

      // This seems clumsy. I added it so it's clear that we are returning the points array after it has been processed.

      var validJsonPoints = rawJsonPoints;
      return { "points": validJsonPoints, "markerStart":markerStart, "markerEnd":markerEnd };
    }
    catch (e) {
      console.log("Error converting point to json: " + e.message);
      return e;
    }
  }



  function getGraphRef(pathway, point) {
    self.point=point;
    if (point.hasOwnProperty('graphRef')) {
      if (pathway.hasOwnProperty('nodes')) {
        var node = pathway.nodes.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (node !== undefined) {
          return {'type':'node', 'element':node};
        }
      }

      if (pathway.hasOwnProperty('groups')) {
        var group = pathway.groups.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (group !== undefined) {
          return {'type':'group', 'groupId':group.groupId};
        }
      }

      var edgesWithAnchors = pathway.edges.filter(function(element) {return element.hasOwnProperty('anchors');});
      self.edgesWithAnchors = edgesWithAnchors;
      var anchor = null;
      var i = -1;
      do {
        i += 1;
        anchor = edgesWithAnchors[i].anchors.filter(function(element) {

            // js hint linter doesn't like this. how can I refactor?

            return element.graphId === point.graphRef;
          }
        )[0];
      } while (!anchor && i < edgesWithAnchors.length );

      return {'type':'anchor', 'element':anchor, 'edge':edgesWithAnchors[i]};

    }
    else {
      return {'type':'unconnected'};
    }
  }

  function getCoordinates(svg, point) {
    var coordinates = {};
    var edgeTerminusRef = self.edgeTerminusRef = getGraphRef(svg.datum(), point);
    if (edgeTerminusRef.type !== 'anchor') {
      if (edgeTerminusRef.type === 'unconnected') {
        coordinates.x = point.x;
        coordinates.y = point.y;

      }
      else {
        if (edgeTerminusRef.type === 'node') {
          coordinates = pathvisio.pathway.node.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathvisio.pathway.group.getDimensions(svg.datum(), edgeTerminusRef.groupId);
            coordinates = pathvisio.pathway.node.getPortCoordinates(groupDimensions, point.relX, point.relY);
          }
          else {
            return 'error';
          }
        }
      }
    }
    else {
      var path = svg.select("#interaction-" + edgeTerminusRef.edge.graphId)[0][0];
      coordinates = path.getPointAtLength(edgeTerminusRef.element.position * path.getTotalLength());
    }

    return coordinates;
  }

  function isTwoPointElbow(source, target) {
    var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) );
    var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
    var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
    return ( isRightAngle && sourcePasses && targetPasses );
  }

  return {
    getGraphRef:getGraphRef,
    getCoordinates:getCoordinates,
    isTwoPointElbow:isTwoPointElbow,
    gpml2json:gpml2json
  };
}();
;

// TODO Rewrite the code for getting elbow and curve edge points. For reference, see these links:
//
// Elbows:
// [PathVisio Java code for elbows](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/ElbowConnectorShape.java)
// [jsPlumb JavaScript implemention of elbows](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-flowchart.js)
// [W3C documention on vertical and horizontal path movement - "lineto" commands - for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
//
// Bezier Curves:
// [PathVisio Java code for cubic bezier curve](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/CurvedConnectorShape.java)
// [jsPlumb JavaScript implemention of bezier curves](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-bezier.js)
// [W3C documention on cubic bezier curves for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
// There are other types of SVG curves, but I understand the Java code to use bezier curves.

pathvisio.pathway.edge.pathData = function(){

  var currentDirection = null;

  function switchDirection(currentDirection) {
    if (currentDirection === 'H') {
      return 'V';
    }
    else {
      return 'H';
    }
  }

  function get(svg, edge) {
    var sourcePoint = edge.points[0];
    var source = pathvisio.pathway.edge.point.getCoordinates(svg, sourcePoint);

    if (sourcePoint.dx === undefined) {
      source.dx = 0;
    }
    else {
      source.dx = sourcePoint.dx;
    }

    if (sourcePoint.dy === undefined) {
      source.dy = 0;
    }
    else {
      source.dy = sourcePoint.dy;
    }

    var targetPoint = edge.points[edge.points.length - 1];
    var target = pathvisio.pathway.edge.point.getCoordinates(svg, targetPoint);

    if (targetPoint.dx === undefined) {
      target.dx = 0;
    }
    else {
      target.dx = targetPoint.dx;
    }

    if (targetPoint.dy === undefined) {
      target.dy = 0;
    }
    else {
      target.dy = targetPoint.dy;
    }

    var pathData = 'M ' + source.x + ' ' + source.y;

    if ((!edge.connectorType) || (edge.connectorType === undefined) || (edge.connectorType === 'straight')) {
      pathData += " L " + target.x + " " + target.y;
    }
    else {

      // just a start for the elbow connector type. still need to consider several other potential configurations.
      // It doesn't make sense for an unconnected interaction or graphical line to be an elbow, so any that are
      // so specified will be drawn as segmented lines.

      if (edge.connectorType === 'elbow' && edge.points[0].hasOwnProperty('graphRef') && edge.points[edge.points.length - 1].hasOwnProperty('graphRef')) {

        // distance to move away from node when we can't go directly to the next node

        var step = 15;

        if (Math.abs(source.dx) === 1) {
          currentDirection = 'H';
        }
        else {
          currentDirection = 'V';
        }

        //if (edge.points.length === 2) {
        //doesn't quite work yet, so this works for most cases

        if (( edge.points.length === 2 && pathvisio.pathway.edge.point.isTwoPointElbow(source, target)) ) {
        }
        else {
          if ( edge.points.length > 2 ) {
            edge.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                if (currentDirection === 'H') {
                  pathData += ' ' + currentDirection + ' ' + element.x;
                }
                else {
                  pathData += ' ' + currentDirection + ' ' + element.y;
                }
                currentDirection = switchDirection(currentDirection);
              }
            });
          }
          else {
            //if (source.dx === ((source.x - target.x) / Math.abs(source.x - target.x)) || source.dx === target.dy || source.dy === target.dx) {
            if (Math.abs(source.dx) === 1) {
              pathData += " H " + (source.x + source.dx * 15);
            }
            else {
              //if (source.dy === ((source.y - target.y) / Math.abs(source.y - target.y)) || source.dx === target.dy || source.dy === target.dx) {
              if (Math.abs(source.dy) === 1) {
                pathData += " V " + (source.y + source.dy * 15);
                currentDirection = switchDirection(currentDirection);
              }
            }

            if (target.dx === ((target.x - source.x) / Math.abs(target.x - source.x)) || source.dx === target.dy || source.dy === target.dx) {
              //if (Math.abs(target.dx) === 1) {
              pathData += " H " + (target.x + target.dx * 15) + ' V ' + target.y + ' H ' + target.x;
              currentDirection = switchDirection(currentDirection);
            }
            else {
              if (target.dy === ((target.y - source.y) / Math.abs(target.y - source.y)) || source.dx === target.dy || source.dy === target.dx) {
                //if (Math.abs(target.dy) === 1) {
                pathData += " V " + (target.y + target.dy * 15) + ' H ' + target.x + ' V ' + target.y;
                currentDirection = switchDirection(currentDirection);
              }
            }
          }
        }

        if (currentDirection === 'H') {
          pathData += ' ' + currentDirection + ' ' + target.x;
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.y;
          currentDirection = switchDirection(currentDirection);
        }
        else {
          pathData += ' ' + currentDirection + ' ' + target.y;
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.x;
          currentDirection = switchDirection(currentDirection);
        }

        /*
           if (Math.abs(target.dx) === 1) {
           pathData += " V " + target.y + " H " + target.x;
           console.log('pathData');
           console.log(pathData);
           }
           else {
           pathData += " H " + target.x + " V " + target.y;
           console.log('pathData');
           console.log(pathData);
           }
           */
      }
      else {
        if (edge.connectorType === 'segmented') {
          edge.points.forEach(function(element, index, array) {
            if ((index > 0) && (index < (array.length -1))) {
              pathData += " L " + element.x + " " + element.y;
            }
          });
          pathData += " L " + target.x + " " + target.y;
        }
        else {
          if (edge.connectorType === 'curved') {
            if (edge.points.length === 3) {

              // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

              var pointControl = edge.points[1];

              pathData += " S" + pointControl.x + "," + pointControl.y + " " + target.x + "," + target.y;
              return pathData;
            }
            else {

              // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

              pathData += " T" + target.x + "," + target.y;
              return pathData;
            }
          }
          else {
            console.log('Warning: pathvisio.js does not support connector type: ' + edge.connectorType);
            edge.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length -1))) {
                pathData += " L " + element.x + " " + element.y;
              }
            });
            pathData += " L " + target.x + " " + target.y;
          }
        }
      }
    }
    return pathData;
  }
 
  return {
    get:get
  };
}();
;

pathvisio.pathway.dataSources = [
   {
      "database":"Affy",
      "id":"X",
      "homePage":"http://www.affymetrix.com/",
      "linkOut":"https://www.affymetrix.com/LinkServlet?probeset=$id",
      "example":"1851_s_at",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:affy.probeset",
      "regex":"\d{4,}((_[asx])?_at)?",
      "fullName":"Affymetrix Probeset"
   },
   {
      "database":"Agilent",
      "id":"Ag",
      "homePage":"http://agilent.com",
      "linkOut":"",
      "example":"A_24_P98555",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Ag",
      "regex":"A_\d+_.+",
      "fullName":"Agilent"
   },
   {
      "database":"BIND",
      "id":"Bi",
      "homePage":"http://www.bind.ca/",
      "linkOut":"http://www.bind.ca/Action?identifier=bindid&idsearch=$id",
      "example":"",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:bind",
      "regex":"^\d+$",
      "fullName":"BIND"
   },
   {
      "database":"BioCyc",
      "id":"Bc",
      "homePage":"http://biocyc.org",
      "linkOut":"http://biocyc.org/getid?id=$id",
      "example":"ECOLI:CYT-D-UBIOX-CPLX",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biocyc",
      "regex":"^\w+\:[A-Za-z0-9-]+$",
      "fullName":"BioCyc"
   },
   {
      "database":"BioGrid",
      "id":"Bg",
      "homePage":"http://thebiogrid.org/",
      "linkOut":"http://thebiogrid.org/$id",
      "example":"31623",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biogrid",
      "regex":"^\d+$",
      "fullName":"BioGRID"
   },
   {
      "database":"BioModels Database",
      "id":"Bm",
      "homePage":"http://www.ebi.ac.uk/biomodels/",
      "linkOut":"http://www.ebi.ac.uk/biomodels-main/$id",
      "example":"BIOMD0000000048",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biomodels.db",
      "regex":"^((BIOMD|MODEL)\d{10})|(BMID\d{12})$",
      "fullName":"BioModels Database"
   },
   {
      "database":"BioSystems",
      "id":"Bs",
      "homePage":"http://www.ncbi.nlm.nih.gov/biosystems/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/biosystems/$id",
      "example":"1",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biosystems",
      "regex":"^\d+$",
      "fullName":"BioSystems"
   },
   {
      "database":"BRENDA",
      "id":"Br",
      "homePage":"http://www.brenda-enzymes.org/",
      "linkOut":"http://www.brenda-enzymes.org/php/result_flat.php4?ecno=$id",
      "example":"1.1.1.1",
      "dataNodeType":"",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:brenda",
      "regex":"^((\d+\.-\.-\.-)|(\d+\.\d+\.-\.-)|(\d+\.\d+\.\d+\.-)|(\d+\.\d+\.\d+\.\d+))$",
      "fullName":"BRENDA"
   },
   {
      "database":"CAS",
      "id":"Ca",
      "homePage":"http://commonchemistry.org",
      "linkOut":"http://commonchemistry.org/ChemicalDetail.aspx?ref=$id",
      "example":"50-00-0",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:cas",
      "regex":"^\d{1,7}\-\d{2}\-\d$",
      "fullName":"CAS"
   },
   {
      "database":"CCDS",
      "id":"Cc",
      "homePage":"http://identifiers.org/ccds/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=ALLFIELDS&DATA=$id",
      "example":"CCDS33337",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"",
      "regex":"^CCDS\d+\.\d+$",
      "fullName":"Consensus CDS"
   },
   {
      "database":"ChEBI",
      "id":"Ce",
      "homePage":"http://www.ebi.ac.uk/chebi/",
      "linkOut":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=$id",
      "example":"CHEBI:36927",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:obo.chebi",
      "regex":"^CHEBI:\d+$",
      "fullName":"ChEBI"
   },
   {
      "database":"Chemspider",
      "id":"Cs",
      "homePage":"http://www.chemspider.com/",
      "linkOut":"http://www.chemspider.com/Chemical-Structure.$id.html",
      "example":"56586",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:chemspider",
      "regex":"^\d+$",
      "fullName":"ChemSpider"
   },
   {
      "database":"CodeLink",
      "id":"Ge",
      "homePage":"http://www.appliedmicroarrays.com/",
      "linkOut":"",
      "example":"GE86325",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Ge",
      "regex":"",
      "fullName":"CodeLink"
   },
   {
      "database":"Database of Interacting Proteins",
      "id":"Dip",
      "homePage":"http://dip.doe-mbi.ucla.edu/",
      "linkOut":"http://dip.doe-mbi.ucla.edu/dip/DIPview.cgi?ID=$id",
      "example":"DIP-743N",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:dip",
      "regex":"^DIP[\:\-]\d{3}[EN]$",
      "fullName":"Database of Interacting Proteins"
   },
   {
      "database":"dbSNP",
      "id":"Sn",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=snp",
      "linkOut":"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=$id",
      "example":"121909098",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"",
      "regex":"^\d+$",
      "fullName":"dbSNP"
   },
   {
      "database":"DrugBank",
      "id":"Dr",
      "homePage":"http://www.drugbank.ca/",
      "linkOut":"http://www.drugbank.ca/drugs/$id",
      "example":"DB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:drugbank",
      "regex":"^DB\d{5}$",
      "fullName":"DrugBank"
   },
   {
      "database":"EcoCyc",
      "id":"Eco",
      "homePage":"http://ecocyc.org/",
      "linkOut":"http://ecocyc.org/ECOLI/NEW-IMAGE?type=NIL&object=$id",
      "example":"325-BISPHOSPHATE-NUCLEOTIDASE-RXN",
      "dataNodeType":"interaction",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"Eco",
      "regex":"",
      "fullName":"EcoCyc"
   },
   {
      "database":"EcoGene",
      "id":"Ec",
      "homePage":"http://ecogene.org/",
      "linkOut":"http://ecogene.org/geneInfo.php?eg_id=$id",
      "example":"EG10173",
      "dataNodeType":"gene",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"urn:miriam:ecogene",
      "regex":"^EG\d+$",
      "fullName":"EcoGene"
   },
   {
      "database":"EMBL",
      "id":"Em",
      "homePage":"http://www.ebi.ac.uk/embl/",
      "linkOut":"http://www.ebi.ac.uk/ena/data/view/$id",
      "example":"X58356",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ena.embl",
      "regex":"^[A-Z]+[0-9]+$",
      "fullName":"European Nucleotide Archive"
   },
   {
      "database":"Ensembl",
      "id":"En",
      "homePage":"http://www.ensembl.org/",
      "linkOut":"http://www.ensembl.org/id/$id",
      "example":"ENSG00000139618",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ensembl",
      "regex":"^ENS[A-Z]*[FPTG]\d{11}$",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl B. subtilis",
      "id":"EnBs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Bacillus/B_subtilis/Gene/Summary?g=$id",
      "example":"EBBACG00000000013",
      "dataNodeType":"gene",
      "species":"Bacillus subtilis",
      "priority":1,
      "unknown":"EnBs",
      "regex":"EBBACG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl C. elegans",
      "id":"EnCe",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Caenorhabditis_elegans/Gene/Summary?g=$id",
      "example":"Y42H9B.1",
      "dataNodeType":"gene",
      "species":"Caenorhabditis elegans",
      "priority":1,
      "unknown":"EnCe",
      "regex":"",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Chicken",
      "id":"EnGg",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Gallus_gallus/Gene/Summary?g=$id",
      "example":"ENSGALG00000021736",
      "dataNodeType":"gene",
      "species":"Gallus gallus",
      "priority":1,
      "unknown":"EnGg",
      "regex":"ENSGALG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Chimp",
      "id":"EnPt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Pan_troglodytes/Gene/Summary?g=$id",
      "example":"ENSPTRG00000036034",
      "dataNodeType":"gene",
      "species":"Pan troglodytes",
      "priority":1,
      "unknown":"EnPt",
      "regex":"ENSPTRG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Cow",
      "id":"EnBt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Bos_taurus/Gene/Summary?g=$id",
      "example":"ENSBTAG00000043548",
      "dataNodeType":"gene",
      "species":"Bos taurus",
      "priority":1,
      "unknown":"EnBt",
      "regex":"ENSBTAG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Dog",
      "id":"EnCf",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Canis_familiaris/Gene/Summary?g=$id",
      "example":"ENSCAFG00000025860",
      "dataNodeType":"gene",
      "species":"Canis familiaris",
      "priority":1,
      "unknown":"EnCf",
      "regex":"ENSCAFG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl E. coli",
      "id":"EnEc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Escherichia_Shigella/E_coli_K12/Gene/Summary?g=$id",
      "example":"EBESCG00000000010",
      "dataNodeType":"gene",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"EnEc",
      "regex":"EBESCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Fruitfly",
      "id":"EnDm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Drosophila_melanogaster/Gene/Summary?g=$id",
      "example":"FBgn0032956",
      "dataNodeType":"gene",
      "species":"Drosophila melanogaster",
      "priority":1,
      "unknown":"EnDm",
      "regex":"FBgn\d{7}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Horse",
      "id":"EnQc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Equus_caballus/Gene/Summary?g=$id",
      "example":"ENSECAG00000026160",
      "dataNodeType":"gene",
      "species":"Equus caballus",
      "priority":1,
      "unknown":"EnQc",
      "regex":"ENSECAG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Human",
      "id":"EnHs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=$id",
      "example":"ENSG00000139618",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"EnHs",
      "regex":"ENSG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl M. tuberculosis",
      "id":"EnMx",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Mycobacterium/M_tuberculosis_H37Rv/Gene/Summary?g=$id",
      "example":"EBMYCG00000003122",
      "dataNodeType":"gene",
      "species":"Mycobacterium tuberculosis",
      "priority":1,
      "unknown":"EnMx",
      "regex":"EBMYCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Mosquito",
      "id":"EnAg",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Anopheles_gambiae/Gene/Summary?_q=$id",
      "example":"AGAP006864",
      "dataNodeType":"gene",
      "species":"Anopheles gambiae",
      "priority":1,
      "unknown":"EnAg",
      "regex":"AGAP\d{6}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Mouse",
      "id":"EnMm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Mus_musculus/Gene/Summary?g=$id",
      "example":"ENSMUSG00000017167",
      "dataNodeType":"gene",
      "species":"Mus musculus",
      "priority":1,
      "unknown":"EnMm",
      "regex":"ENSMUSG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Pig",
      "id":"EnSs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Sus_scrofa/Gene/Summary?g=$id",
      "example":"ENSSSCG00000004244",
      "dataNodeType":"gene",
      "species":"Sus scrofa",
      "priority":1,
      "unknown":"EnSs",
      "regex":"ENSSSCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Plants",
      "id":"EP",
      "homePage":"http://plants.ensembl.org/",
      "linkOut":"http://plants.ensembl.org/id/$id",
      "example":"AT1G73965",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ensembl.plant",
      "regex":"^\w+$",
      "fullName":"Ensembl Plants"
   },
   {
      "database":"Ensembl Rat",
      "id":"EnRn",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Rattus_norvegicus/Gene/Summary?g=$id",
      "example":"ENSRNOG00000016648",
      "dataNodeType":"gene",
      "species":"Rattus norvegicus",
      "priority":1,
      "unknown":"EnRn",
      "regex":"ENSRNOG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Xenopus",
      "id":"EnXt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Xenopus_tropicalis/Gene/Summary?g=$id",
      "example":"ENSXETG00000029448",
      "dataNodeType":"gene",
      "species":"Xenopus tropicalis",
      "priority":1,
      "unknown":"EnXt",
      "regex":"ENSXETG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Yeast",
      "id":"EnSc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Saccharomyces_cerevisiae/Gene/Summary?g=$id",
      "example":"YGR147C",
      "dataNodeType":"gene",
      "species":"Saccharomyces cerevisiae",
      "priority":1,
      "unknown":"EnSc",
      "regex":"Y[A-Z][RL]\d{3}[WC](?:\-[A-Z])?",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Zebrafish",
      "id":"EnDr",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Danio_rerio/Gene/Summary?g=$id",
      "example":"ENSDARG00000024771",
      "dataNodeType":"gene",
      "species":"Danio rerio",
      "priority":1,
      "unknown":"EnDr",
      "regex":"ENSDARG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Entrez Gene",
      "id":"L",
      "homePage":"http://www.ncbi.nlm.nih.gov/gene",
      "linkOut":"http://www.ncbi.nlm.nih.gov/gene/$id",
      "example":"100010",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ncbigene",
      "regex":"^\d+$",
      "fullName":"Entrez Gene"
   },
   {
      "database":"Enzyme Nomenclature",
      "id":"E",
      "homePage":"http://www.ebi.ac.uk/intenz/",
      "linkOut":"http://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=$id",
      "example":"1.1.1.1",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ec-code",
      "regex":"^\d+\.-\.-\.-|\d+\.\d+\.-\.-|\d+\.\d+\.\d+\.-|\d+\.\d+\.\d+\.(n)?\d+$",
      "fullName":"Enzyme Nomenclature"
   },
   {
      "database":"FlyBase",
      "id":"F",
      "homePage":"http://flybase.org/",
      "linkOut":"http://flybase.org/reports/$id.html",
      "example":"FBgn0011293",
      "dataNodeType":"gene",
      "species":"Drosophila melanogaster",
      "priority":1,
      "unknown":"urn:miriam:flybase",
      "regex":"^FB\w{2}\d{7}$",
      "fullName":"FlyBase"
   },
   {
      "database":"GenBank",
      "id":"G",
      "homePage":"http://www.ncbi.nlm.nih.gov/genbank/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/nuccore/$id",
      "example":"NW_004190323",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"G",
      "regex":"(\w\d{5})|(\w{2}\d{6})|(\w{3}\d{5})",
      "fullName":"GenBank"
   },
   {
      "database":"Gene Wiki",
      "id":"Gw",
      "homePage":"http://en.wikipedia.org/wiki/Portal:Gene_Wiki",
      "linkOut":"http://plugins.biogps.org/cgi-bin/wp.cgi?id=$id",
      "example":"1017",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Gw",
      "regex":"\d+",
      "fullName":"Gene Wiki"
   },
   {
      "database":"GeneOntology",
      "id":"T",
      "homePage":"http://www.ebi.ac.uk/QuickGO/",
      "linkOut":"http://www.ebi.ac.uk/QuickGO/GTerm?id=$id",
      "example":"GO:0006915",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:obo.go",
      "regex":"^GO:\d{7}$",
      "fullName":"Gene Ontology"
   },
   {
      "database":"Gramene Arabidopsis",
      "id":"EnAt",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/Arabidopsis_thaliana/Gene/Summary?g=$id",
      "example":"ATMG01360-TAIR-G",
      "dataNodeType":"gene",
      "species":"Arabidopsis thaliana",
      "priority":1,
      "unknown":"EnAt",
      "regex":"AT[\dCM]G\d{5}\-TAIR\-G",
      "fullName":"Grameen Arabidopsis"
   },
   {
      "database":"Gramene Genes DB",
      "id":"Gg",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/db/genes/search_gene?acc=$id",
      "example":"GR:0060184",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Gg",
      "regex":"GR:\d+",
      "fullName":"Gramene Genes"
   },
   {
      "database":"Gramene Literature",
      "id":"Gl",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/db/literature/pub_search?ref_id=$id",
      "example":"6200",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Gl",
      "regex":"",
      "fullName":"Gramene Literature"
   },
   {
      "database":"Gramene Maize",
      "id":"EnZm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.maizesequence.org/Zea_mays/Gene/Summary?g=$id",
      "example":"GRMZM2G174107",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"EnZm",
      "regex":"",
      "fullName":"Gramene Maize"
   },
   {
      "database":"Gramene Pathway",
      "id":"Gp",
      "homePage":"http://www.gramene.org/pathway",
      "linkOut":"",
      "example":"AAH72400",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"Gp",
      "regex":"",
      "fullName":"Gramene Pathway"
   },
   {
      "database":"Gramene Rice",
      "id":"EnOj",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/Oryza_sativa/Gene/Summary?db=core;g=$id",
      "example":"osa-MIR171a",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"EnOj",
      "regex":"",
      "fullName":"Gramene Rice"
   },
   {
      "database":"HGNC",
      "id":"H",
      "homePage":"http://www.genenames.org",
      "linkOut":"http://www.genenames.org/data/hgnc_data.php?match=$id",
      "example":"DAPK1",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hgnc.symbol",
      "regex":"^[A-Za-z0-9]+",
      "fullName":"HGNC Symbol"
   },
   {
      "database":"HGNC Accession number",
      "id":"Hac",
      "homePage":"http://www.genenames.org",
      "linkOut":"http://www.genenames.org/data/hgnc_data.php?hgnc_id=$id",
      "example":"HGNC:2674",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hgnc",
      "regex":"^(HGNC:)?\d{1,5}$",
      "fullName":"HGNC"
   },
   {
      "database":"HMDB",
      "id":"Ch",
      "homePage":"http://www.hmdb.ca/",
      "linkOut":"http://www.hmdb.ca/metabolites/$id",
      "example":"HMDB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:hmdb",
      "regex":"^HMDB\d{5}$",
      "fullName":"HMDB"
   },
   {
      "database":"HomoloGene",
      "id":"Hg",
      "homePage":"http://www.ncbi.nlm.nih.gov/homologene/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/homologene/$id",
      "example":"1000",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:homologene",
      "regex":"^\d+$",
      "fullName":"HomoloGene"
   },
   {
      "database":"HPRD",
      "id":"Hp",
      "homePage":"http://www.hprd.org/",
      "linkOut":"",
      "example":"",
      "dataNodeType":"interaction",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hprd",
      "regex":"",
      "fullName":"HPRD"
   },
   {
      "database":"Illumina",
      "id":"Il",
      "homePage":"http://www.illumina.com/",
      "linkOut":"",
      "example":"ILMN_5668",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Il",
      "regex":"ILMN_\d+",
      "fullName":"Illumina"
   },
   {
      "database":"IntAct",
      "id":"Ia",
      "homePage":"http://www.ebi.ac.uk/intact/",
      "linkOut":"http://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=$id",
      "example":"EBI-2307691",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:intact",
      "regex":"^EBI\-[0-9]+$",
      "fullName":"IntAct"
   },
   {
      "database":"InterPro",
      "id":"I",
      "homePage":"http://www.ebi.ac.uk/interpro/",
      "linkOut":"http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=$id",
      "example":"IPR000100",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:interpro",
      "regex":"^IPR\d{6}$",
      "fullName":"InterPro"
   },
   {
      "database":"IPI",
      "id":"Ip",
      "homePage":"http://www.ebi.ac.uk/IPI",
      "linkOut":"http://www.ebi.ac.uk/cgi-bin/dbfetch?db=IPI&id=$id&format=default",
      "example":"IPI00000001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ipi",
      "regex":"^IPI\d{8}$",
      "fullName":"IPI"
   },
   {
      "database":"IRGSP Gene",
      "id":"Ir",
      "homePage":"http://rgp.dna.affrc.go.jp/IRGSP/",
      "linkOut":"",
      "example":"Os12g0561000",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Ir",
      "regex":"Os\d{2}g\d+",
      "fullName":"IRGSP Gene"
   },
   {
      "database":"Kegg Compound",
      "id":"Ck",
      "homePage":"http://www.genome.jp/kegg/ligand.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?cpd:$id",
      "example":"C12345",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.compound",
      "regex":"^C\d+$",
      "fullName":"KEGG Compound"
   },
   {
      "database":"KEGG Drug",
      "id":"Kd",
      "homePage":"http://www.genome.jp/kegg/drug/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?dr:$id",
      "example":"D00123",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.drug",
      "regex":"^D\d+$",
      "fullName":"KEGG Drug"
   },
   {
      "database":"KEGG Genes",
      "id":"Kg",
      "homePage":"http://www.genome.jp/kegg/genes.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?$id",
      "example":"syn:ssr3451",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.genes",
      "regex":"^\w+:[\w\d\.-]*$",
      "fullName":"KEGG Genes"
   },
   {
      "database":"KEGG Glycan",
      "id":"Kgl",
      "homePage":"http://www.genome.jp/kegg/glycan/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?gl:$id",
      "example":"G00123",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.glycan",
      "regex":"^G\d+$",
      "fullName":"KEGG Glycan"
   },
   {
      "database":"KEGG Pathway",
      "id":"Kp",
      "homePage":"http://www.genome.jp/kegg/pathway.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?pathway+$id",
      "example":"hsa00620",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.pathway",
      "regex":"^\w{2,4}\d{5}$",
      "fullName":"KEGG Pathway"
   },
   {
      "database":"KEGG Reaction",
      "id":"Kr",
      "homePage":"http://www.genome.jp/kegg/reaction/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?rn:$id",
      "example":"R00100",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.reaction",
      "regex":"^R\d+$",
      "fullName":"KEGG Reaction"
   },
   {
      "database":"LIPID MAPS",
      "id":"Lm",
      "homePage":"http://www.lipidmaps.org",
      "linkOut":"http://www.lipidmaps.org/data/get_lm_lipids_dbgif.php?LM_ID=$id",
      "example":"LMPR0102010012",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:lipidmaps",
      "regex":"^LM(FA|GL|GP|SP|ST|PR|SL|PK)[0-9]{4}([0-9a-zA-Z]{4,6})?$",
      "fullName":"LIPID MAPS"
   },
   {
      "database":"LipidBank",
      "id":"Lb",
      "homePage":"http://lipidbank.jp/index.html",
      "linkOut":"http://lipidbank.jp/cgi-bin/detail.cgi?id=$id",
      "example":"BBA0001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:lipidbank",
      "regex":"^\w+\d+$",
      "fullName":"LipidBank"
   },
   {
      "database":"MACiE",
      "id":"Ma",
      "homePage":"http://www.ebi.ac.uk/thornton-srv/databases/MACiE/index.html",
      "linkOut":"http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/MACiE/entry/getPage.pl?id=$id",
      "example":"M0001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:macie",
      "regex":"^M\d{4}$",
      "fullName":"MACiE"
   },
   {
      "database":"MaizeGDB",
      "id":"Mg",
      "homePage":"",
      "linkOut":"http://www.maizegdb.org/cgi-bin/displaylocusresults.cgi?term=$id",
      "example":"acc1",
      "dataNodeType":"gene",
      "species":"Zea mays",
      "priority":1,
      "unknown":"Mg",
      "regex":"",
      "fullName":"MaizeGDB"
   },
   {
      "database":"MatrixDB",
      "id":"Md",
      "homePage":"http://matrixdb.ibcp.fr/",
      "linkOut":"http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=$id&class=Association",
      "example":"P00747_P07355",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:matrixdb.association",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])_.*|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9]_.*)|(GAG_.*)|(MULT_.*)|(PFRAG_.*)|(LIP_.*)|(CAT_.*)$",
      "fullName":"MatrixDB"
   },
   {
      "database":"MetaCyc",
      "id":"Mc",
      "homePage":"http://www.metacyc.org/",
      "linkOut":"http://www.metacyc.org/META/NEW-IMAGE?type=NIL&object=$id",
      "example":"D-GLUTAMATE-OXIDASE-RXN",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"Mc",
      "regex":"",
      "fullName":"MetaCyc"
   },
   {
      "database":"MGI",
      "id":"M",
      "homePage":"http://www.informatics.jax.org/",
      "linkOut":"http://www.informatics.jax.org/marker/$id",
      "example":"MGI:2442292",
      "dataNodeType":"gene",
      "species":"Mus musculus",
      "priority":1,
      "unknown":"urn:miriam:mgd",
      "regex":"^MGI:\d+$",
      "fullName":"Mouse Genome Database"
   },
   {
      "database":"MINT",
      "id":"Mi",
      "homePage":"http://mint.bio.uniroma2.it/mint/",
      "linkOut":"http://mint.bio.uniroma2.it/mint/search/inFrameInteraction.do?interactionAc=$id",
      "example":"MINT-10000",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mint",
      "regex":"^MINT\-\d{1,5}$",
      "fullName":"MINT"
   },
   {
      "database":"miRBase mature sequence",
      "id":"Mbm",
      "homePage":"http://www.mirbase.org/",
      "linkOut":"http://www.mirbase.org/cgi-bin/mature.pl?mature_acc=$id",
      "example":"MIMAT0000001",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mirbase.mature",
      "regex":"MIMAT\d{7}",
      "fullName":"miRBase mature sequence"
   },
   {
      "database":"miRBase Sequence",
      "id":"Mb",
      "homePage":"http://microrna.sanger.ac.uk/",
      "linkOut":"http://microrna.sanger.ac.uk/cgi-bin/sequences/mirna_entry.pl?acc=$id",
      "example":"MI0000001",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mirbase",
      "regex":"MI\d{7}",
      "fullName":"miRBase Sequence"
   },
   {
      "database":"NASC Gene",
      "id":"N",
      "homePage":"http://arabidopsis.info/",
      "linkOut":"",
      "example":"ATMG00960-TAIR-G",
      "dataNodeType":"gene",
      "species":"Arabidopsis thaliana",
      "priority":1,
      "unknown":"N",
      "regex":"AT[\dCM]G\d{5}\-TAIR\-G",
      "fullName":"NASC Gene"
   },
   {
      "database":"NCBI Protein",
      "id":"Np",
      "homePage":"http://www.ncbi.nlm.nih.gov/protein",
      "linkOut":"http://www.ncbi.nlm.nih.gov/protein/$id",
      "example":"CAA71118.1",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ncbiprotein",
      "regex":"^\w+\d+(\.\d+)?$",
      "fullName":"NCBI Protein"
   },
   {
      "database":"NCI Pathway Interaction Database",
      "id":"Pid",
      "homePage":"http://pid.nci.nih.gov/",
      "linkOut":"http://pid.nci.nih.gov/search/pathway_landing.shtml?what=graphic&jpg=on&pathway_id=$id",
      "example":"pi3kcipathway",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pid.pathway",
      "regex":"^\w+$",
      "fullName":"NCI Pathway Interaction Database"
   },
   {
      "database":"NuGO wiki",
      "id":"Nw",
      "homePage":"http://wiki.nugo.org",
      "linkOut":"http://wiki.nugo.org/index.php/$id",
      "example":"HMDB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":0,
      "unknown":"Nw",
      "regex":"",
      "fullName":"NuGO wiki"
   },
   {
      "database":"OMIM",
      "id":"Om",
      "homePage":"http://omim.org/",
      "linkOut":"http://omim.org/entry/$id",
      "example":"603903",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:omim",
      "regex":"^[*#+%^]?\d{6}$",
      "fullName":"OMIM"
   },
   {
      "database":"Oryzabase",
      "id":"Ob",
      "homePage":"http://www.shigen.nig.ac.jp/rice/oryzabase",
      "linkOut":"http://www.shigen.nig.ac.jp/rice/oryzabase/gateway/gatewayAction.do?target=symbol&id=$id",
      "example":"468",
      "dataNodeType":"gene",
      "species":"Oryza sativa",
      "priority":1,
      "unknown":"Ob",
      "regex":"",
      "fullName":"Oryzabase"
   },
   {
      "database":"Other",
      "id":"O",
      "homePage":"",
      "linkOut":"",
      "example":"",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"O",
      "regex":"",
      "fullName":"Other"
   },
   {
      "database":"Pathway Commons",
      "id":"Pc",
      "homePage":"http://www.pathwaycommons.org/pc/",
      "linkOut":"http://www.pathwaycommons.org/pc/record2.do?id=$id",
      "example":"485991",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pathwaycommons",
      "regex":"^\d+$",
      "fullName":"Pathway Commons"
   },
   {
      "database":"PDB",
      "id":"Pd",
      "homePage":"http://www.pdb.org/",
      "linkOut":"http://www.rcsb.org/pdb/explore/explore.do?structureId=$id",
      "example":"2gc4",
      "dataNodeType":"protein",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:pdb",
      "regex":"^[0-9][A-Za-z0-9]{3}$",
      "fullName":"Protein Data Bank"
   },
   {
      "database":"Pfam",
      "id":"Pf",
      "homePage":"http://pfam.sanger.ac.uk/",
      "linkOut":"http://pfam.sanger.ac.uk/family/$id/",
      "example":"PF01234",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pfam",
      "regex":"^PF\d{5}$",
      "fullName":"Pfam"
   },
   {
      "database":"PharmGKB Drug",
      "id":"Pgd",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/drug/$id",
      "example":"PA448710",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.drug",
      "regex":"^PA\d+$",
      "fullName":"PharmGKB Drug"
   },
   {
      "database":"PharmGKB Gene",
      "id":"Pgg",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/gene/$id",
      "example":"PA131",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.gene",
      "regex":"^PA\w+$",
      "fullName":"PharmGKB Gene"
   },
   {
      "database":"PharmGKB Pathways",
      "id":"Pgp",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/pathway/$id",
      "example":"PA146123006",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.pathways",
      "regex":"^PA\d+$",
      "fullName":"PharmGKB Pathways"
   },
   {
      "database":"PhosphoSite Protein",
      "id":"Pp",
      "homePage":"http://www.phosphosite.org/homeAction.do",
      "linkOut":"http://www.phosphosite.org/proteinAction.do?id=$id",
      "example":"12300",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:phosphosite.protein",
      "regex":"^\d{5}$",
      "fullName":"PhosphoSite Protein"
   },
   {
      "database":"PINA",
      "id":"Pi",
      "homePage":"http://cbg.garvan.unsw.edu.au/pina/",
      "linkOut":"http://cbg.garvan.unsw.edu.au/pina/interactome.oneP.do?ac=$id&showExtend=null",
      "example":"Q13485",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pina",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])$",
      "fullName":"PINA"
   },
   {
      "database":"PlantGDB",
      "id":"Pl",
      "homePage":"http://www.plantgdb.org/",
      "linkOut":"",
      "example":"PUT-157a-Vitis_vinifera-37378",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Pl",
      "regex":"PUT-[\w\d-]+",
      "fullName":"PlantGDB"
   },
   {
      "database":"PubChem-bioassay",
      "id":"Cpb",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=pcassay ",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/assay/assay.cgi?aid=$id",
      "example":"1018",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.bioassay",
      "regex":"^\d+$",
      "fullName":"PubChem-bioassay"
   },
   {
      "database":"PubChem-compound",
      "id":"Cpc",
      "homePage":"http://pubchem.ncbi.nlm.nih.gov/",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?cid=$id",
      "example":"100101",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.compound",
      "regex":"^\d+$",
      "fullName":"PubChem-compound"
   },
   {
      "database":"PubChem-substance",
      "id":"Cps",
      "homePage":"http://pubchem.ncbi.nlm.nih.gov/",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?sid=$id",
      "example":"100101",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.substance",
      "regex":"^\d+$",
      "fullName":"PubChem-substance"
   },
   {
      "database":"Reactome",
      "id":"Re",
      "homePage":"http://www.reactome.org/",
      "linkOut":"http://www.reactome.org/cgi-bin/eventbrowser_st_id?FROM_REACTOME=1&ST_ID=$id",
      "example":"REACT_1590",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:reactome",
      "regex":"^REACT_\d+(\.\d+)?$",
      "fullName":"Reactome"
   },
   {
      "database":"RefSeq",
      "id":"Q",
      "homePage":"http://www.ncbi.nlm.nih.gov/projects/RefSeq/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/entrez/viewer.fcgi?val=$id",
      "example":"NP_012345",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:refseq",
      "regex":"^(NC|AC|NG|NT|NW|NZ|NM|NR|XM|XR|NP|AP|XP|ZP)_\d+$",
      "fullName":"RefSeq"
   },
   {
      "database":"RESID",
      "id":"Res",
      "homePage":"http://www.ebi.ac.uk/RESID/",
      "linkOut":"http://srs.ebi.ac.uk/srsbin/cgi-bin/wgetz?-id+6JSUg1NA6u4+-e+[RESID:'$id']",
      "example":"AA0001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:resid",
      "regex":"^AA\d{4}$",
      "fullName":"RESID"
   },
   {
      "database":"Rfam",
      "id":"Rf",
      "homePage":"",
      "linkOut":"http://www.sanger.ac.uk/cgi-bin/Rfam/getacc?$id",
      "example":"RF00066",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Rf",
      "regex":"RF\d+",
      "fullName":"RFAM"
   },
   {
      "database":"RGD",
      "id":"R",
      "homePage":"http://rgd.mcw.edu/",
      "linkOut":"http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=$id",
      "example":"2018",
      "dataNodeType":"gene",
      "species":"Rattus norvegicus",
      "priority":1,
      "unknown":"urn:miriam:rgd",
      "regex":"^\d{4,7}$",
      "fullName":"Rat Genome Database"
   },
   {
      "database":"Rhea",
      "id":"Rh",
      "homePage":"http://www.ebi.ac.uk/rhea/",
      "linkOut":"http://www.ebi.ac.uk/rhea/reaction.xhtml?id=$id",
      "example":"12345",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:rhea",
      "regex":"^\d{5}$",
      "fullName":"Rhea"
   },
   {
      "database":"Rice Ensembl Gene",
      "id":"Os",
      "homePage":"http://www.gramene.org/Oryza_sativa",
      "linkOut":"http://www.gramene.org/Oryza_sativa/geneview?gene=$id",
      "example":"LOC_Os04g54800",
      "dataNodeType":"gene",
      "species":"Oryza sativa",
      "priority":1,
      "unknown":"Os",
      "regex":"",
      "fullName":"Rice Ensembl Gene"
   },
   {
      "database":"SGD",
      "id":"D",
      "homePage":"http://www.yeastgenome.org/",
      "linkOut":"http://www.yeastgenome.org/cgi-bin/locus.fpl?dbid=$id",
      "example":"S000028457",
      "dataNodeType":"gene",
      "species":"Saccharomyces cerevisiae",
      "priority":1,
      "unknown":"urn:miriam:sgd",
      "regex":"^S\d+$",
      "fullName":"SGD"
   },
   {
      "database":"Small Molecule Pathway Database",
      "id":"Sm",
      "homePage":"http://www.smpdb.ca/pathways",
      "linkOut":"http://pathman.smpdb.ca/pathways/$id/pathway",
      "example":"SMP00001",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:smpdb",
      "regex":"^SMP\d{5}$",
      "fullName":"Small Molecule Pathway Database"
   },
   {
      "database":"SMART",
      "id":"Sma",
      "homePage":"http://smart.embl-heidelberg.de/",
      "linkOut":"http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=$id",
      "example":"SM00015",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:smart",
      "regex":"^SM\d{5}$",
      "fullName":"SMART"
   },
   {
      "database":"SPIKE",
      "id":"Sk",
      "homePage":"http://www.cs.tau.ac.il/~spike/",
      "linkOut":"http://www.cs.tau.ac.il/~spike/maps/$id.html",
      "example":"spike00001",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:spike.map",
      "regex":"^spike\d{5}$",
      "fullName":"SPIKE Map"
   },
   {
      "database":"SPRINT",
      "id":"Spr",
      "homePage":"http://www.bioinf.manchester.ac.uk/dbbrowser/sprint/",
      "linkOut":"http://www.bioinf.manchester.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?prints_accn=$id&display_opts=Prints&category=None&queryform=false&regexpr=off",
      "example":"PR00001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:sprint",
      "regex":"^PR\d{5}$",
      "fullName":"SPRINT"
   },
   {
      "database":"STRING",
      "id":"Str",
      "homePage":"http://string.embl.de/",
      "linkOut":"http://string.embl.de/interactions/$id",
      "example":"P53350",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:string",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])|([0-9][A-Za-z0-9]{3})$",
      "fullName":"STRING"
   },
   {
      "database":"SubstrateDB",
      "id":"Sdb",
      "homePage":"http://substrate.burnham.org/",
      "linkOut":"http://substrate.burnham.org/protein/annotation/$id/html",
      "example":"1915",
      "dataNodeType":"protein",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:pmap.substratedb",
      "regex":"^\d+$",
      "fullName":"SubstrateDB"
   },
   {
      "database":"SubtiWiki",
      "id":"Sw",
      "homePage":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/Main_Page",
      "linkOut":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/$id",
      "example":"BSU29180",
      "dataNodeType":"gene",
      "species":"Bacillus subtilis",
      "priority":1,
      "unknown":"urn:miriam:subtiwiki",
      "regex":"^BSU\d{5}$",
      "fullName":"SubtiWiki"
   },
   {
      "database":"SUPFAM",
      "id":"Sf",
      "homePage":"http://supfam.org/SUPERFAMILY/",
      "linkOut":"http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=$id",
      "example":"SSF57615",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:supfam",
      "regex":"^\w+$",
      "fullName":"SUPFAM"
   },
   {
      "database":"SWISS-MODEL",
      "id":"Sw",
      "homePage":"http://swissmodel.expasy.org/",
      "linkOut":"http://swissmodel.expasy.org/repository/smr.php?sptr_ac=$id",
      "example":"P23298",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:swiss-model",
      "regex":"^\w+$",
      "fullName":"SWISS-MODEL"
   },
   {
      "database":"Systems Biology Ontology",
      "id":"Sbo",
      "homePage":"http://www.ebi.ac.uk/sbo/",
      "linkOut":"http://www.ebi.ac.uk/sbo/main/$id",
      "example":"SBO:0000262",
      "dataNodeType":"ontology",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biomodels.sbo",
      "regex":"^SBO:\d{7}$",
      "fullName":"Systems Biology Ontology"
   },
   {
      "database":"TAIR",
      "id":"A",
      "homePage":"http://arabidopsis.org/index.jsp",
      "linkOut":"http://arabidopsis.org/servlets/TairObject?type=locus&name=$id",
      "example":"AT1G01030",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:tair.locus",
      "regex":"^AT[1-5]G\d{5}$",
      "fullName":"TAIR Locus"
   },
   {
      "database":"TIGR",
      "id":"Ti",
      "homePage":"http://www.jcvi.org/",
      "linkOut":"",
      "example":"12012.t00308",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Ti",
      "regex":"",
      "fullName":"TIGR"
   },
   {
      "database":"TTD Drug",
      "id":"Td",
      "homePage":"http://bidd.nus.edu.sg/group/cjttd/TTD_HOME.asp",
      "linkOut":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDRUG.asp?ID=$id",
      "example":"DAP000773",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ttd.drug",
      "regex":"^DAP\d+$",
      "fullName":"TTD Drug"
   },
   {
      "database":"TTD Target",
      "id":"Tt",
      "homePage":"http://bidd.nus.edu.sg/group/cjttd/TTD_HOME.asp",
      "linkOut":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDetail.asp?ID=$id",
      "example":"TTDS00056",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ttd.target",
      "regex":"^TTDS\d+$",
      "fullName":"TTD Target"
   },
   {
      "database":"TubercuList",
      "id":"Tb",
      "homePage":"http://tuberculist.epfl.ch",
      "linkOut":"http://tuberculist.epfl.ch/quicksearch.php?gene+name=$id",
      "example":"Rv0064",
      "dataNodeType":"gene",
      "species":"Mycobacterium tuberculosis",
      "priority":1,
      "unknown":"Tb",
      "regex":"Rv\d{4}(A|B|c|\.\d)?",
      "fullName":"TubercuList"
   },
   {
      "database":"UCSC Genome Browser",
      "id":"Uc",
      "homePage":"http://genome.ucsc.edu/",
      "linkOut":"http://genome.ucsc.edu/cgi-bin/hgTracks?position=$id",
      "example":"uc001tyh.1",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Uc",
      "regex":"uc\d{3}[a-z]{3}\.\d",
      "fullName":"UCSC Genome Browser"
   },
   {
      "database":"UniGene",
      "id":"U",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=unigene",
      "linkOut":"http://www.ncbi.nlm.nih.gov/UniGene/clust.cgi?UGID=1548618&SEARCH=$id",
      "example":"Hs.553708",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"U",
      "regex":"[A-Z][a-z][a-z]?\.\d+",
      "fullName":"UniGene"
   },
   {
      "database":"Unipathway",
      "id":"Up",
      "homePage":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway",
      "linkOut":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway/upa?upid=$id",
      "example":"UPA00206",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:unipathway",
      "regex":"^UPA\d{5}$",
      "fullName":"Unipathway"
   },
   {
      "database":"Uniprot-TrEMBL",
      "id":"S",
      "homePage":"http://www.uniprot.org/",
      "linkOut":"http://www.uniprot.org/uniprot/$id",
      "example":"P62158",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:uniprot",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])|($",
      "fullName":"UniProtKB/TrEMBL"
   },
   {
      "database":"Uniprot-SwissProt",
      "id":"Sp",
      "homePage":"http://www.uniprot.org/",
      "linkOut":"http://www.uniprot.org/uniprot/$id",
      "example":"CALM_HUMAN",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"Sp",
      "regex":"^[A-Z0-9]+_[A-Z]+$",
      "fullName":"UniProtKB/Swiss-Prot"
   },
   {
      "database":"Wheat gene names",
      "id":"Wn",
      "homePage":"http://wheat.pw.usda.gov/",
      "linkOut":"http://wheat.pw.usda.gov/report?class=gene;name=$id",
      "example":"5S-Rrna-D1_(Triticum)",
      "dataNodeType":"gene",
      "species":"Triticum aestivum",
      "priority":1,
      "unknown":"Wn",
      "regex":"",
      "fullName":"Wheat gene names"
   },
   {
      "database":"Wheat gene refs",
      "id":"Wr",
      "homePage":"http://wheat.pw.usda.gov/",
      "linkOut":"http://wheat.pw.usda.gov/cgi-bin/graingenes/report.cgi?class=reference&name=$id",
      "example":"WGS-95-1333",
      "dataNodeType":"probe",
      "species":"Triticum aestivum",
      "priority":0,
      "unknown":"Wr",
      "regex":"",
      "fullName":"Wheat gene refs"
   },
   {
      "database":"WikiGenes",
      "id":"Wg",
      "homePage":"http://www.wikigenes.org/",
      "linkOut":"http://www.wikigenes.org/e/gene/e/$id.html",
      "example":"7157",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Wg",
      "regex":"",
      "fullName":"WikiGenes"
   },
   {
      "database":"WikiPathways",
      "id":"Wp",
      "homePage":"http://www.wikipathways.org/",
      "linkOut":"http://www.wikipathways.org/index.php/Pathway:$id",
      "example":"WP100",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:wikipathways",
      "regex":"WP\d{1,5}",
      "fullName":"WikiPathways"
   },
   {
      "database":"Wikipedia",
      "id":"Wi",
      "homePage":"http://www.wikipedia.org",
      "linkOut":"http://en.wikipedia.org/wiki/$id",
      "example":"Acetate",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":0,
      "unknown":"Wi",
      "regex":"",
      "fullName":"Wikipedia"
   },
   {
      "database":"WormBase",
      "id":"W",
      "homePage":"http://www.wormbase.org/",
      "linkOut":"http://www.wormbase.org/db/gene/gene?name=$id;class=Gene",
      "example":"WBGene00000001",
      "dataNodeType":"gene",
      "species":"Caenorhabditis elegans",
      "priority":1,
      "unknown":"urn:miriam:wormbase",
      "regex":"^WBGene\d{8}$",
      "fullName":"WormBase"
   },
   {
      "database":"ZFIN",
      "id":"Z",
      "homePage":"http://zfin.org",
      "linkOut":"http://zfin.org/action/marker/view/$id",
      "example":"ZDB-GENE-041118-11",
      "dataNodeType":"gene",
      "species":"Danio rerio",
      "priority":1,
      "unknown":"urn:miriam:zfin",
      "regex":"ZDB\-GENE\-\d+\-\d+",
      "fullName":"ZFIN Gene"
   }
];
;

pathvisio.pathway.xRef = function(){

    function getData(species, database, id, callback) {
      var databaseId = pathvisio.pathway.dataSources.filter(function(element) {return element.database === database;})[0].id;
      var url = '../../remote-data-sources/php/bridgedb.php?species=' + encodeURIComponent(species) + '&database=' + encodeURIComponent(databaseId) + '&id=' + encodeURIComponent(id);
      $.ajax({
        url: url,
        dataType: "text",
        success: function(data) {callback(data);}
      });
    }

    function displayData(organism, node) {
      console.log('organism');
      console.log(organism);
      self.node = node;
      var xRefData = getData(organism, node.xRef.database, node.xRef.id, function(data) {
        var parser = CSVParser.parse(data, true, ' ', false, false, '.');
        var parsed = DataGridRenderer.json(parser.dataGrid, parser.headerNames, parser.headerTypes,'\t','\n');
        var xRefDataParsed = self.xRefDataParsed = JSON.parse(parsed);

        var idsByDatabase = xRefDataParsed;
        var feature = {};
        idsByDatabase.ids = [];
        var features = [];
        xRefDataParsed.forEach(function(xRefForEach, index, array) {
          feature.database = xRefForEach.database;
          feature.ids = [];
          if (features.filter(function(featureFilter) {return featureFilter.database === xRefForEach.database;}).length === 0) {
            array.filter(function(xRefFilter) {
              return xRefFilter.database === xRefForEach.database;}).forEach(function(element) {
                feature.ids.push(element.id);
              });
            features.push({'database':xRefForEach.database, 'ids': feature.ids});
          }
        });

        features.forEach(function(feature) {
          try {
            var dataSource = pathvisio.pathway.dataSources.filter(function(dataSource) {return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == feature.database.replace(/[^a-z0-9]/gi,'').toLowerCase(); })[0];
            feature.dataSourceId = dataSource.id;
            feature.linkOut = dataSource.linkOut;
            feature.priority = dataSource.priority;
          }
          catch (e) {
            console.warn(e);
            console.warn('Error: No database found for external reference database "' + feature.database + '".');
          }
        });

        features.sort(function(a, b) {
            if (a.priority === b.priority)
            {
                var x = a.database.toLowerCase(), y = b.database.toLowerCase();
                
                return x < y ? -1 : x > y ? 1 : 0;
            }
            return b.priority - a.priority;
        });

        var specifiedFeature = features.filter(function(element) {return (element.database == node.xRef.database);})[0];
        var currentFeatureIndex = features.indexOf(specifiedFeature);

        var specifiedXRefId = specifiedFeature.ids.filter(function(element) {return (element == node.xRef.id);})[0];
        var currentXRefIdIndex = specifiedFeature.ids.indexOf(specifiedXRefId);

        features = pathvisio.helpers.moveArrayItem(features, currentFeatureIndex, 0);
        specifiedFeature.ids = pathvisio.helpers.moveArrayItem(specifiedFeature.ids, currentXRefIdIndex, 0);

        var detailsFrame = d3.select('#details-frame');
        //.attr('style', 'visibility:visible');
        
        detailsFrame.selectAll('*').remove();

        var detailsHeader = detailsFrame.append('header')
        .attr('class', 'data-node-label');

        var detailsPullLeftSpan = detailsHeader.append('span')
        .attr('class', 'pull-left');
        var detailsMoveSpan = detailsPullLeftSpan.append('span')
        .attr('class', 'header-move');
        var detailsMoveIcon = detailsMoveSpan.append('i')
        .attr('class', 'icon-move')
        .attr('style', 'color:#aaa');

        var detailsHeaderLabelSpan = detailsHeader.append('span')
        .attr('style', 'font-size: 120%;')
        .text(function(d) {return node.textLabel.text + ' ';});
        
        var detailsSearchSpan = detailsHeaderLabelSpan.append('span')
        .attr('class', 'header-search')
        .attr('title', function(d) {return 'Search for pathways containing ' + node.textLabel.text; });
        var detailsSearchLink = detailsSearchSpan.append('a')
        .attr('href', function(d) {
          return 'http://wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&ids=' + node.xRef.id + '&codes=' + pathvisio.pathway.dataSources.filter(function(dataSource) {
            return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == node.xRef.database.replace(/[^a-z0-9]/gi,'').toLowerCase();
          })[0].id + '&type=xref';
        });
        var detailsSearchIcon = detailsSearchLink.append('i')
        .attr('class', 'icon-search')
        .attr('style', 'color:blue; font-size:50%');
        
        var detailsPullRightSpan = detailsHeader.append('span')
        .attr('class', 'pull-right');
        var detailsCloseSpan = detailsPullRightSpan.append('span')
        .attr('class', 'header-close')
        .on("click", function(d, i){
          detailsFrame.selectAll('*').remove();
          detailsFrame[0][0].style.visibility = 'hidden';
        });
        var detailsCloseIcon = detailsCloseSpan.append('i')
        .attr('class', 'icon-remove')
        .attr('style', 'color:#aaa; font-size:120%');

        var dataNodeTypeDiv = detailsHeader.append('div')
        .attr('class', 'data-node-description');
        var dataNodeType = dataNodeTypeDiv.append('h2')
        .text(node.dataNodeType);
        
        var detailsList = detailsFrame.append('ul')
        .attr('class', 'data-node');

        var detailsListItems = detailsList.selectAll('li')
        .data(features)
        .enter()
        .append('li');

        /*
        [{'database':'a','ids':[1,2,3]},{'database':'b','ids':[1,2,3]}]
        <li><span class='feature-title'></span><span class='feature-item'></span></li>
        features[element.database] = [element.id];
        */

        detailsListItems[0].forEach(function(detailsListItem) {
          var featureTitle = d3.select(detailsListItem).append('span')
          .attr('class', 'feature-title')
          .text(function(d) {return d.database + ': ';});
          
          var linkOuts = d3.select(detailsListItem).selectAll('a')
          .data(function(d) {
            var featuresFilled = [];
            d.ids.forEach(function(id) {
              var linkOut = d.linkOut.replace('$id', id);
              featuresFilled.push({'id':id, 'linkOut':linkOut});
            });
            return featuresFilled;
          })
          .enter()
          .append('a')
          .attr('href', function(d) {return d.linkOut;});
          
          var featureText = linkOuts.append('span')
          .attr('class', 'feature-text')
          .attr('style', function(d) {
            if (!!d.linkOut) {
              return '';
            }
            else {
              return 'color: #696969;';
            }
          })
          .text(function(d) {return ' ' + d.id;});
        });

        detailsFrame[0][0].style.visibility = 'visible';

      });
    }

    return {
      getData:getData,
      displayData:displayData,
    };
}();
