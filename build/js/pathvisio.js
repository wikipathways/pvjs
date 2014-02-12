//! pathvisiojs 1.0.4
//! Built on 2014-02-11
//! https://github.com/wikipathways/pathvisiojs
//! License: http://www.apache.org/licenses/LICENSE-2.0/

var pathvisioNS = pathvisioNS || {};
pathvisioNS["tmp/pathvisiojs.html"] = '<div id="pathvisiojs-container" style="width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; position: absolute; ">\n\n    <!-- **********************************************************************\n    Pathway Container (JavaScript inserts pathway image inside this div)\n    *********************************************************************** -->\n\n    <div id="diagram-container" style="width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; "></div>\n    \n    <div id="typeahead" style="position: absolute; top: 5px; right: 5px;">\n    <!-- **********************************************************************\n      Highlight Element by Label Control\n      *********************************************************************** -->\n\n      <span class="twitter-typeahead" style="position: relative; display: inline-block;"><input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled="" style="position: absolute; top: 0px; left: 0px; border-color: transparent; box-shadow: none; background-attachment: scroll; background-clip: border-box; background-color: rgb(255, 255, 255); background-image: none; background-origin: padding-box; background-size: auto; background-position: 0% 0%; background-repeat: repeat repeat;"><input id="highlight-by-label-input" placeholder="Enter node name to highlight." role="textbox" aria-autocomplete="list" aria-haspopup="true" class="tt-query" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top; background-color: transparent;"><span style="position: absolute; left: -9999px; visibility: hidden; white-space: nowrap; font-family: Arial; font-size: 12px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;"></span><span class="tt-dropdown-menu" style="position: absolute; top: 100%; left: 0px; z-index: 100; display: none;"></span></span>\n\n      </div> \n     \n   \n      <!-- **********************************************************************\n      Pan Zoom Control\n      see http://bumbu.github.io/cytoscape.js/debug/ for example of cytoscape.js \n      *********************************************************************** -->\n\n<!--      <div id="pan-zoom-control" class="ui-cytoscape-panzoom">\n        <div class="ui-cytoscape-panzoom-zoom-in ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-plus"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-zoom-out ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-minus"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-reset ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-resize-full"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-slider">\n          <div class="ui-cytoscape-panzoom-slider-background">\n          </div>\n          <div class="ui-cytoscape-panzoom-slider-handle" style="top: 42.80000001192093px;">\n            <span class="icon icon-minus"></span>\n          </div>\n          <div class="ui-cytoscape-panzoom-no-zoom-tick" style="top: 42.80000001192093px;">\n          </div>\n        </div>\n        <div class="ui-cytoscape-panzoom-panner">\n          <div class="ui-cytoscape-panzoom-panner-handle">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-up ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-down ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-left ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-right ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-indicator" style="display: none; left: 22.424611085682006px; top: 0.12287108520014556px; background-color: rgb(127, 127, 127); background-position: initial initial; background-repeat: initial initial;">\n          </div>\n        </div>\n      </div>\n-->\n      <!-- **********************************************************************\n      Fullscreen Control \n      *********************************************************************** -->\n\n      <div id="fit-to-screen-control" class="fit-to-screen-controls" style="position: absolute; bottom: 5px; right: 0px;">                           \n        <img class="icon-screenshot" style="color:#aaa" src="../src/img/fitscreen_icon.png">                                                        \n      </div>    \n\n   <!--   <div id="fullscreen-control" style="position: absolute; bottom: 5px; right: 8px;">\n        <i class="icon-fullscreen" style="color:#aaa"></i>\n      </div>\n   -->\n\n    <div id="viewer-toolbar" style="position: absolute; top: 0px; right: 0px; height: inherit">\n    </div>\n      \n    <!-- **********************************************************************\n    Details Frame\n    *********************************************************************** -->\n\n    <div id="annotation" class="annotation ui-draggable" style="visibility: hidden; position: absolute; right: 75px; top: 100px;">\n      <header class="annotation-header">\n      <span id="annotation-move" class="annotation-header-move">\n        <i class="icon-move"></i>\n      </span>\n      <span class="annotation-header-close">                                                                                    \n        <i class="icon-remove"></i>                                                                                                                             \n      </span>   \n      <span id="annotation-header-text" class="annotation-header-text">\n        Header\n      </span> \n      <span id="annotation-header-search" class="annotation-header-search" title="Search for pathways containing \'Header Text\'">\n        <a href="http://wikipathways.org//index.php?title=Special:SearchPathways">\n          <i class="icon-search" style="color:blue; font-size:50% ; text-decoration:none"></i>\n        </a>\n      </span>\n      <div id="annotation-description" class="annotation-description">\n        <h2>description</h2>\n      </div>\n      </header>\n      <span class="annotation-items-container">\n        <ul id="annotation-items-container">\n          <!-- List items inside this ul element are generated automatically by JavaScript.\n          Each item will be composed of a title and text. The text can be set to be an href.\n          You can edit the styling of the title by editing CSS class "annotation-item-title"\n          and the styling of the text by editing CSS class "annotation-item-text.\n          -->\n        </ul>\n      </span>\n    </div>\n  </div> \n';
pathvisioNS["tmp/pathvisiojs.svg"] = '<svg id="pathvisiojs-diagram" version="1.1" baseProfile="full" xmlns="http://www.w3.org/1999/xlink" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" width="100%" height="100%" style="display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; " preserveAspectRatio="xMidYMid" onmouseup="svgPanZoom.handleMouseUp(evt)" onmousedown="svgPanZoom.handleMouseDown(evt)" onmousemove="svgPanZoom.handleMouseMove(evt)" onmouseleave="svgPanZoom.handleMouseUp(evt)" xlink="http://www.w3.org/1999/xlink" ev="http://www.w3.org/2001/xml-events"><g><desc>This SVG file contains all the graphical elements (markers and symbols in defs as well as\nstyle data) used by the program pathvisiojs, which has two components:\n1) a viewer for transforming GPML biological pathway data into an SVG visual representation and\n2) an editor for creating both views and models for biological pathways.</desc></g><title>pathvisiojs diagram</title><defs><marker id="shape-library-markers-arrow-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-arrow-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-arrow-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-arrow-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="16" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 8, 6)">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-start-default" class="default-fill-color solid-stroke">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-end-default" class="default-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="9" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="10" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 15)">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="0" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="20" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 12)">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-start-default" class="board-fill-color solid-stroke">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-end-default" class="board-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-none-svg-start-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-none-svg-start-default" class="board-fill-color board-stroke-color node shape">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-none-svg-end-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-none-svg-end-default" class="board-fill-color board-stroke-color node shape" transform="rotate(180, 0, 0)">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-start-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-end-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="3.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 2, 6)">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><style type="text/css">	svg {\n		color-interpolation: auto;\n		image-rendering: auto;\n		shape-rendering: auto;\n		vector-effect: non-scaling-stroke;\n                background: white;\n	/* removed fill and stroke since they override marker specs */\n	/*	fill: white;\n    		stroke: black; */\n	}\n\n	/* default color for pathway elements */\n	.default-fill-color {\n		fill: black; \n	}\n	.default-stroke-color {\n		stroke: black;\n	}\n	\n	/* default color of the background drawing board */ 	\n	.board-fill-color {\n		fill: white;\n	}\n	.board-stroke-color {\n		stroke: white;\n	}\n\n	.text-area {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: middle;\n		font-size: 10px;\n		fill: black;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.citation {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: top;\n		font-size: 7px;\n		fill: #999999;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.info-box {\n		font-family: Sans-Serif;\n		font-size: 10px;\n		fill: black;\n		stroke: none;\n		text-align: left;\n		vertical-align: top;\n	}\n\n	.info-box-item-property-name {\n		font-weight: bold;\n	}\n\n	.info-box-item-property-value {\n	}\n\n	.data-node {\n		text-align: right;\n		fill-opacity: 1;\n		fill: white;\n		stroke: black;\n		stroke-width: 1;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n    		pointer-events:auto;\n	}\n	.data-node:hover {\n	 	cursor: pointer;\n	}\n	\n	.has-xref {\n	}\n\n	.data-node.gene-product {\n	}\n\n	.metabolite {\n		stroke: blue;\n	}\n\n	.data-node.metabolite &gt; .text-area {\n		fill: blue;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.data-node.pathway {\n		stroke: none;\n		fill-opacity: 0;\n	}\n\n	.data-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		fill-opacity: 1;\n		font-size: 12px;\n		font-weight: bold;\n	}\n\n	.data-node.protein {\n	}\n\n	.data-node.rna {\n	}\n\n	.data-node.unknown {\n	}\n\n	.label {\n		stroke: null;\n		stroke-width: 0;\n		fill-opacity: 0;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape {\n		fill-opacity: 0;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape.none {\n		fill: none;\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	g.group-node &gt; .shape {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node &gt; .text-area {\n		fill-opacity: 0.4;\n		font-family: Serif, Times;\n		font-size: 32px;\n		fill: black;\n		stroke-width: 0;\n		font-weight: bold;\n  	}	\n\n	.group-node.none {\n		fill: rgb(180,180,100);\n		stroke-dasharray: 5,3;\n	}\n\n	.group-node.none &gt; .text-area {\n		display: none;\n  	}	\n\n	/*.group-node.none:hover {\n		fill: rgb(255,180,100);\n		fill-opacity: 0.05;\n	}*/\n\n	.group-node.group {\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	.group-node.group &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.group:hover {\n		fill: rgb(0,0,255);\n		stroke-width: 1px;\n		stroke-dasharray: 5,3;\n		stroke: gray;\n		fill-opacity: 0.1;\n	}*/\n\n	.group-node.complex {\n		fill: rgb(180,180,100);\n	}\n\n	.group-node.complex &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.complex:hover {\n		fill: rgb(255,0,0);\n		fill-opacity: 0.05;\n	}*/	\n\n  	.group-node.pathway {\n		fill: rgb(0,255,0);\n		stroke-dasharray: 5,3;\n	}\n	/*.group-node.pathway:hover {\n		fill: rgb(0,255,0);\n		fill-opacity: 0.2;\n	}*/\n	.group-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		stroke: rgb(20,150,30);\n  }\n\n  .cellular-component {\n		fill-opacity: 0;\n		stroke: silver;\n	}\n\n  .graphical-line {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	.interaction {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n  .marker-end {\n    -webkit-transform: rotate(180deg);\n    -webkit-transform-origin: 50% 50%;\n\n    -o-transform: rotate(180deg); \n    -o-transform-origin: 50% 50%;\n\n    transform: rotate(180deg);\n    transform-origin: 50% 50%;\n  }\n\n	.solid-stroke {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n	.dashed-stroke {\n		stroke-dasharray: 5,3;\n	}\n\n  .highlighted-node {\n		fill: yellow;\n    fill-opacity: 0.2;\n		stroke: orange; \n    stroke-width: 3px;\n  }\n</style></defs><filter id="highlight" width="150%" height="150%"><feOffset result="offOut" in="SourceGraphic" dx="30" dy="30"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter><g id="viewport" transform="matrix(0.6710888444694338, 0, 0, 0.6710888444694338, 364.8176552543344, 20) "></g></svg>\n';
;

// IE8 only allows console.log when Developer Tools is open. This will prevent errors
// from showing up if we use console.log without DevTools being open.
// from http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer

/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
(function() {
 if (!window.console) {
   window.console = {};
 }
 // union of Chrome, FF, IE, and Safari console methods
 var m = [
 "log", "info", "warn", "error", "debug", "trace", "dir", "group",
 "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
 "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
 ];
 // define undefined methods as noops to prevent errors
 for (var i = 0; i < m.length; i++) {
   if (!window.console[m[i]]) {
   window.console[m[i]] = function() {};
   }    
 } 
})();

var pathvisiojs = function(){
  'use strict';

  var svg, pathway, args;

  function load(args) {
    //console.log(args);

    // for now, load will just load a visual representation of a pathway, but
    // this could change in the future if we add capabilities for analytics or data conversion.

    // ********************************************
    // Check that required parameters are present
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified to indicate where to insert the diagram.');
    }
    if (!args.sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    var configArray = d3.map(pathvisiojs.config).entries();
    var updateConfigsAsNeeded = function(configElement, callback) {
      if (args.hasOwnProperty(configElement.key)) {
        pathvisiojs.config[configElement.key] = args[configElement.key];
      }
      callback(null);
    };

    async.each(configArray, updateConfigsAsNeeded, function(err){
      //console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      pathvisiojs.view.pathwayDiagram.load(args);
    });
  }

  return {
    load:load
  };
}();
;

pathvisiojs.utilities = function(){
  'use strict';

  // from here: http://www.cjboco.com/blog.cfm/post/determining-an-elements-width-and-height-using-javascript/
  // TODO have not tested x-browser yet.
  // could use jquery, but I want to remove it as a dependency for pv.js.
  Element.prototype.getElementWidth = function() {
    if (typeof this.clip !== "undefined") {
      return this.clip.width;
    } else {
      if (this.style.pixelWidth) {
        return this.style.pixelWidth;
      } else {
        return this.width;
      }
    }
  };

  Element.prototype.getElementHeight = function() {
    if (typeof this.clip !== "undefined") {
      return this.clip.width;
    } else {
      if (this.style.pixelHeight) {
        return this.style.pixelHeight;
      } else {
        return this.height;
      }
    }
  };

  function collect() {
    // from http://stackoverflow.com/questions/2454295/javascript-concatenate-properties-from-multiple-objects-associative-array
    var ret = {};
    var len = arguments.length;
    for (var i=0; i<len; i++) {
      for (var p in arguments[i]) {
        if (arguments[i].hasOwnProperty(p)) {
          ret[p] = arguments[i][p];
        }
      }
    }
    return ret;
  }

  function clone(src) {
    function mixin(dest, source, copyFunc) {
      var name, s, i, empty = {};
      for(name in source){
        // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
        // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
        // don't overwrite it with the toString() method that source inherited from Object.prototype
        s = source[name];
        if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
          dest[name] = copyFunc ? copyFunc(s) : s;
        }
      }
      return dest;
    }

    if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
      // null, undefined, any non-object, or function
      return src;	// anything
    }
    if(src.nodeType && "cloneNode" in src){
      // DOM Node
      return src.cloneNode(true); // Node
    }
    if(src instanceof Date){
      // Date
      return new Date(src.getTime());	// Date
    }
    if(src instanceof RegExp){
      // RegExp
      return new RegExp(src);   // RegExp
    }
    var r, i, l;
    if(src instanceof Array){
      // array
      r = [];
      for(i = 0, l = src.length; i < l; ++i){
        if(i in src){
          r.push(clone(src[i]));
        }
      }
      // we don't clone functions for performance reasons
      //		}else if(d.isFunction(src)){
      //			// function
      //			r = function(){ return src.apply(this, arguments); };
    }else{
      // generic objects
      r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src, clone);

  }  

  // this both clones a node and inserts it at the same level of the DOM
  // as the element it was cloned from.
  // it returns a d3 selection of the cloned element
  function cloneNode(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  }

  function convertToArray(object) {
    var array = null;
    if (getObjectType( object ) === 'Object' ) {
      array = [];
      array.push(object);
      return array;
    }
    else {
      if( getObjectType( object ) === 'Array' ) {
        return object;
      }
      else {
        if( getObjectType( object ) === 'String' ) {
          array = [];
          array.push(object);
          return array;
        }
      }
    }
  }

  function getObjectType(object) {
    var result;
    if (Object.prototype.toString.call( object ) === '[object Object]' ) {
      result = 'Object';
    }
    else {
      if( Object.prototype.toString.call( object ) === '[object Array]' ) {
        result = 'Array';
      }
      else {
        if( Object.prototype.toString.call( object ) === '[object String]' ) {
          result = 'String';
        }
      }
    }
    return result;
  }

  function getTextDirection(text) {
    /**
     * From http://stackoverflow.com/questions/7770235/change-text-direction-of-textbox-automatically
     * What about Chinese characters that go top to bottom?
     */
    var x =  new RegExp("[\x00-\x80]+"); // is ascii

    //alert(x.test($this.val()));

    var isAscii = x.test(text);

    var direction;
    if (isAscii) {
      direction = "ltr";
    }
    else {
      direction = "rtl";
    }

    return direction;
  }  

  function getUriParam(name) {
    // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-uri-parameters-with-javascript
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

 function getWindowDimensions(object) {
    var winW = 630, winH = 460;
    if (document.body && document.body.width) {
     winW = document.body.width;
     winH = document.body.height;
    }
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.width ) {
     winW = document.documentElement.width;
     winH = document.documentElement.height;
    }
    if (window.innerWidth && window.innerHeight) {
     winW = window.innerWidth;
     winH = window.innerHeight;
    }
    return {'width':winW, 'height':winH};
  }

  function intersect(a, b) {
    // modified version of https://github.com/juliangruber/intersect/blob/master/index.js
    var res = [];
    for (var i = 0; i < a.length; i++) {
      if (b.indexOf(a[i]) > -1) res.push(a[i]);
    }
    return res;
  }

  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  function isUri(str) {
    // from https://gist.github.com/samuelcole/920312
    var uriPattern = /(?:(?=[\s`!()\[\]{};:'".,<>?«»“”‘’])|\b)((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/|[a-z0-9.\-]+[.](?:com|org|net))(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))*(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]|\b))/gi;
    return uriPattern.test(str);
  }

  // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  var isOdd = function(num) {
    return num % 2;
  }

  function isWikiPathwaysId(data) {
    data = data.trim();
    if (data.substr(0,2).toUpperCase() === 'WP' && isNumber(data.substr(data.length - 1))) {
      return true;
    }
    else {
      return false;
    }
  }

  // TODO should we use requirejs for loading scripts instead?
  function loadScripts(array, callback){  
    var loader = function(src,handler){  
      var script = document.createElement('script');  
      script.src = src;  
      script.onload = script.onreadystatechange = function(){  
        script.onreadystatechange = script.onload = null;  
        if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent))window.setTimeout(function(){handler();},8,this);  
        else handler();  
      }  
      var head = document.getElementsByTagName('head')[0];  
      (head || document.body).appendChild( script );  
    };  
    (function(){  
      if(array.length!=0){  
        loader(array.shift(),arguments.callee);  
      }else{  
        callback && callback();  
      }  
    })();  
  }

  function moveArrayItem(arr, old_index, new_index) {
    // from http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  }

  function splitStringByNewLine(str) {
    // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.
    return str.split(/\r\n|\r|\n/g);
  }

  function strToHtmlId(str) {
    var re = /\W/gi;
    var id = str.replace(re, "");
    return id;
  }

  return{
    clone:clone,
    cloneNode:cloneNode,
    collect:collect,
    convertToArray:convertToArray,
    getObjectType:getObjectType,
    getTextDirection:getTextDirection,
    getUriParam:getUriParam,
    getWindowDimensions:getWindowDimensions,
    isIE:isIE,
    intersect:intersect,
    isNumber:isNumber,
    isOdd:isOdd,
    isUri:isUri,
    isWikiPathwaysId:isWikiPathwaysId,
    loadScripts:loadScripts,
    moveArrayItem:moveArrayItem,
    splitStringByNewLine:splitStringByNewLine,
    strToHtmlId:strToHtmlId
  };
}();



;

"use strict";
pathvisiojs.config = {};
pathvisiojs.config.gpmlSourceUriStub = '/wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:';
pathvisiojs.config.bridgedbLinkOutsUriStub = '/wpi/extensions/bridgedb.php/';
pathvisiojs.config.bridgedbDatasources = '/wpi/extensions/PathwayViewer/datasources.txt';
pathvisiojs.config.diagramLoadingIconUri = '/wpi/extensions/PathwayViewer/img/loading.gif';
pathvisiojs.config.diagramNotAvailableIconUri = '/wpi/extensions/PathwayViewer/img/imageNotAvailable.jpg';
pathvisiojs.config.imgDiagramUriStub = '/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
pathvisiojs.config.pathwaySearchUriStub = '/index.php?title=Special:SearchPathways&doSearch=1&query=';
;

pathvisiojs.data = function(){
  'use strict';

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var fileType = sourceData.fileType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    // TODO handle if sourceData.object

    if (fileType === 'gpml') {
      pathvisiojs.data.gpml.get(sourceData, function(gpml) {
        pathvisiojs.data.gpml.toPvjson(gpml, uri, function(json) {
          callback(json);
        });
      });
    }
    else {
      throw new Error('Cannot get jGpml from the specified input.');
    }

    // This is just an experiment with using mongodb for caching json,
    // but the higher priority for now would be to cache the SVG.
    // Caching the json would be part of having the API deliver results
    // in JSON format.
    /*
    d3.json(parsedInputData.cached, function(json) {
      callback(json);
    });
    //*/
  }

  return{
    get:get
  };
}();


;

pathvisiojs.data.bridgedb = function(){
  'use strict';

  function getXrefAnnotationDataByDataNode(singleSpecies, id, datasource, label, desc, callback) {
    //For unannotated nodes, without datasource or identifier
    if (null == id || null == datasource){
        var annotationData = {
          "header": label,
          "description": desc,
          "listItems": ['Missing ID and datasource']
        };
        callback(annotationData);  
    } else {   
    getDataSources(function(dataSources) {
      var dataSourceRowCorrespondingToDataNodeXrefDatabase = getDataSourceRowByName(datasource, dataSources);
      var systemCode = dataSourceRowCorrespondingToDataNodeXrefDatabase.systemCode;
      getXrefAliases(singleSpecies, systemCode, id, function(xRefAliases) {
        var currentDataSourceRow;
        var listItems = [];
        if (typeof xRefAliases != 'undefined') { //BridgeDb Error
        listItems = xRefAliases.map(function(xRefAlias) {
          var listItem = {}
          listItem.title = xRefAlias.dataSourceName;
          listItem.text = xRefAlias.xRefId;
          currentDataSourceRow = getDataSourceRowByName(xRefAlias.dataSourceName, dataSources);
          listItem.priority = currentDataSourceRow.priority;
          if (currentDataSourceRow.hasOwnProperty('linkoutPattern')) {
            if (currentDataSourceRow.linkoutPattern !== "" && currentDataSourceRow.linkoutPattern !== null) {
              listItem.uri = currentDataSourceRow.linkoutPattern.replace('$id', listItem.text);
            }
          }
          return listItem;
        });
        }

        listItems.sort(function(a, b) {
          if (a.priority === b.priority)
          {
              var x = a.title.toLowerCase(), y = b.title.toLowerCase();
              
              return x < y ? -1 : x > y ? 1 : 0;
          }
          return b.priority - a.priority;
        });

        var nestedListItems = d3.nest()
        .key(function(d) { return d.title; })
        .entries(listItems);

        // handle case where nothing is returned by bridgedb webservice
        if (nestedListItems.length == 0){
          var uri = "";
          var ds = getDataSourceRowByName(datasource, dataSources);
           if (ds.hasOwnProperty('linkoutPattern')) {
             if (ds.linkoutPattern !== "" && ds.linkoutPattern !== null) {
               uri = ds.linkoutPattern.replace('$id', id);
             }
           }
          nestedListItems = [{"key": datasource, "values":[{"priority": "1","text": id,"title": datasource,"uri":uri}]}];
        }

        // We want the identifier that was listed by the pathway creator for this data node to be listed first.

        var specifiedListItem = nestedListItems.filter(function(element) {return (element.key == datasource);})[0];
        var currentListItemIndex = nestedListItems.indexOf(specifiedListItem);
        nestedListItems = pathvisiojs.utilities.moveArrayItem(nestedListItems, currentListItemIndex, 0);

        var specifiedXRefId = specifiedListItem.values.filter(function(element) {return (element.text == id);})[0];
        var currentXRefIdIndex = specifiedListItem.values.indexOf(specifiedXRefId);
        specifiedListItem.values = pathvisiojs.utilities.moveArrayItem(specifiedListItem.values, currentXRefIdIndex, 0);

        var annotationData = {
          "header": label,
          "description": desc,
          "listItems": nestedListItems
        };
        callback(annotationData);
      });
    });
   }
  }

  function getDataSourceRowByName(dataSourceName, dataSources) {
    var regexp = /[^\w]/gi;
    var dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName === dataSourceName; })[0];
    if (!dataSourceRow) {
      dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName.replace(regexp, '').toLowerCase() === dataSourceName.replace(regexp, '').toLowerCase(); })[0];
    }
    return dataSourceRow;
  }

  function getDataSources(callback) {
    d3.tsv(pathvisiojs.config.bridgedbDatasources)
    .response(function(request) {
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {dataSourceName: d[0], systemCode: d[1], websiteUri: d[2], linkoutPattern: d[3], exampleIdentifier: d[4], entityIdentified: d[5], singleSpecies: d[6], priority: d[7], uri: d[8], regex: d[9], officialName: d[10]};
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  function getXrefAliases(singleSpecies, systemCode, xRefId, callback) {
    var bridgedbUri = pathvisiojs.config.bridgedbLinkOutsUriStub + encodeURIComponent(singleSpecies) + '/xrefs/' + encodeURIComponent(systemCode) + '/' + encodeURIComponent(xRefId);
    //console.log(bridgedbUri);
    d3.tsv(bridgedbUri)
    .response(function(request) { 
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {xRefId: d[0], dataSourceName: d[1]}; 
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  return {
    getXrefAnnotationDataByDataNode:getXrefAnnotationDataByDataNode
  };
}();
;

pathvisiojs.data.biopax = function(){
  'use strict';

  // TODO get ontology terms and other data

  function toPvjson(xmlBiopax, callback) {
    try {
      d3.ns.prefix.bp = 'http://www.biopax.org/owldoc/Level3/';
      d3.ns.prefix.rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
      d3.ns.qualify('bp:PublicationXref');      
      var xmlBiopaxPubs = xmlBiopax.selectAll('PublicationXref');
      var jsonBiopax = {};
      jsonBiopax.PublicationXref = [];
      var publicationXref;
      xmlBiopaxPubs.each(function() {
        publicationXref = {};
        publicationXref.rdfId = d3.select(this).attr('rdf:id').toString();
        jsonBiopax.PublicationXref.push(publicationXref);
      });
      callback(jsonBiopax);
    }
    catch (e) {
      throw new Error("Error converting biopax to json: " + e.message);
    }
  }

  return {
    toPvjson:toPvjson
  };
}();

;

pathvisiojs.data.pvjson = function(){
  'use strict';

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(renderableSourceDataElement, callback) {
    var uri = renderableSourceDataElement.uri;
    var object = renderableSourceDataElement.object;
    var fileType = renderableSourceDataElement.fileType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    // TODO handle if renderableSourceDataElement.object exists

    if (fileType === 'gpml') {
      pathvisiojs.data.gpml.get(renderableSourceDataElement, function(gpml) {
        pathvisiojs.data.gpml.toPvjson(gpml, uri, function(json) {
          console.log('json');
          console.log(json);
          callback(json);
        });
      });
    }
    else {
      throw new Error('Cannot get jGpml from the specified input.');
    }

    // This is just an experiment with using mongodb for caching json,
    // but the higher priority for now would be to cache the SVG.
    // Caching the json would be part of having the API deliver results
    // in JSON format.
    /*
    d3.json(parsedInputData.cached, function(json) {
      callback(json);
    });
    //*/
  }

  return{
    get:get
  };
}();


;

pathvisiojs.data.gpml = function(){
  'use strict';

  var pathvisioDefaultStyleValues = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  }

  function get(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var fileType = sourceData.fileType;

    if ((!uri) && (!object)) {
      return new Error('No sourceData specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    if (fileType === 'gpml') {
      if (pathvisiojs.utilities.isIE() !== 9) {
        // d3.xml does not work with IE9 (and probably earlier), so we're using d3.xhr instead of d3.xml for IE9
        // TODO file a bug report on d3 issue tracker
        d3.xml(uri, function(gpmlDoc) {
          var gpml = gpmlDoc.documentElement;
          callback(gpml);
        });
      }
      else {
        async.waterfall([
          function(callbackInside) {
            if (!$) {
              // TODO should we use requirejs for loading scripts instead?
              pathvisiojs.utilities.loadScripts(['http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'], function() {
                callbackInside(null);
              })
            }
            else {
              callbackInside(null);
            }
          },
          function(callbackInside) {
            d3.xhr(uri, 'application/xml', function(error, data) {
              var gpmlString = data.responseText;
              callbackInside(null, gpmlString);
            });
          },
          function(gpmlString, callbackInside) {
            var gpmlDoc = $.parseXML(gpmlString);
            var gpml = gpmlDoc.documentElement;
            callback(gpml);
          }
        ]);
      }
    }
    else {
      throw new Error('Cannot get GPML from the specified input.');
    }
  }

  function gpmlColorToCssColor(gpmlColor, pathvisioDefault) {
    var color;
    if (gpmlColor !== pathvisioDefault) {
      if (!!gpmlColor) {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          return pathvisioDefault;
        }
      }
      else {
        return pathvisioDefault;
      }
    }
    else {
      return pathvisioDefault;
    }
  }

  function setColorAsJson(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
    var jsonColor;
    if (currentGpmlColorValue !== defaultGpmlColorValue) {
      jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
      jsonElement.color = jsonColor;
      jsonElement.borderColor = jsonColor;
      if (jsonElement.hasOwnProperty('text')) {
        jsonElement.text.color = jsonColor;
      }
    }
    return jsonElement;
  }

  // TODO can we delete this function?

  function getLineStyle(gpmlElement) {
    var LineStyle, attributes; 
    var graphics = gpmlElement.select('Graphics');
    if (!!graphics) {
      LineStyle = graphics.attr('LineStyle'); 
      if (!!LineStyle) {
        return LineStyle;
      }
      else {

        // As currently specified, a given element can only have one LineStyle.
        // This one LineStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has LineStyle of double.

        attributes = gpmlElement.selectAll('Attribute');
        if (attributes.length > 0) {
          LineStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (LineStyle[0].length > 0) {
            return 'double';
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      }
    }
  }

  function getBorderStyle(gpmlLineStyle, pathvisioDefault) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle;
    if (gpmlLineStyle !== pathvisioDefault) {
      if (!!gpmlLineStyle) {
        borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
        if (borderStyle) {
          return borderStyle;
        }
        else {
          console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
          return 'solid';
        }
      }
      else {
        return 'solid';
      }
    }
    else {

      // TODO use code to actually get the default
      
      return 'whatever the default value is';
    }
  }

  function setBorderStyleAsJson(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
    var borderStyle;

    // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
    // whether it has returned the default value, and we need to know whether we are using the
    // default here.

    if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
      borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
      jsonElement.borderStyle = borderStyle;
    }
    return jsonElement;
  }

  function toPvjson(gpml, pathwayIri, callbackOutside){
    var gpmlPathway = d3.select(gpml);
    //var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var pathway = {};
    pathway.xmlns = gpmlPathway.attr('xmlns');
    pathway.nodes = [];
    pathway.edges = [];
    pathway.elements = [];

    // test for whether file is GPML

    if ( pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== 0) {

        // TODO call the Java RPC updater or in some other way call for the file to be updated.

        callbackOutside('fail');
        //alert('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + pathway.xmlns + '). Please convert to the supported version of GPML (xmlns: ' + pathvisiojs.data.gpml.namespaces[0] + ').');
      }
      else {

      async.parallel({
          '@context': function(callback){
            pathway['@context'] = {
              '@vocab':'http://vocabularies.wikipathways.org/gpml#',
              'gpml':'http://vocabularies.wikipathways.org/gpml#',
              'xsd': 'http://www.w3.org/2001/XMLSchema#',
              'wp':'http://vocabularies.wikipathways.org/wp#',
              'biopax': 'http://www.biopax.org/release/biopax-level3.owl#',
              'schema':'http://schema.org/',
              'hMDB':'http://www.hmdb.ca/metabolites/HMDB',
              'entrezGene':'http://www.ncbi.nlm.nih.gov/gene/',
              'ChEBI':'http://www.ebi.ac.uk/chebi/searchId.do?chebiId=',
              'media':'http://www.w3.org/TR/mediaont-10/',
              'ex':'http://www.example.com/',
              'pathwayIri':pathwayIri,
              'PublicationXref':'biopax:PublicationXref',
              'gpmlFolder':'file://Users/andersriutta/Sites/pathvisiojs/test/gpml/',
              'name':'http://xmlns.com/foaf/0.1/name',
              'dcterms':'http://puri.org/dc/terms/',
              'css2':'http://www.w3.org/TR/CSS2/',
              'css3Ui':'http://www.w3.org/TR/css3-ui/#',
              'cssTransform':'http://www.w3.org/TR/css-transforms-1/#',
              'svg':'http://www.w3.org/TR/SVG11/',
              'boxSizing':{
                '@id':'css3Ui:box-sizing',
                '@value':'border-box'
              },
              'rotate':'cssTransform:funcdef-rotate',
              'position':'css2:visuren.html#propdef-position',
              'color':'css2:colors.html#propdef-color', //foreground color
              'backgroundColor':'css2:colors.html#propdef-background-color',
              'backgroundImage':'css2:colors.html#propdef-background-image',
              'borderColor':'css2:box.html#propdef-border-color',
              'borderWidth':'css2:box.html#propdef-border-width',
              'borderStyle':'css2:box.html#propdef-border-style',
              'x':'css2:visuren.html#propdef-left',
              'y':'css2:visuren.html#propdef-top',
              'width':'css2:visudet.html#propdef-width',
              'height':'css2:visudet.html#propdef-height',
              'padding':'css2:box.html#propdef-padding',
              'fontFamily':'css2:fonts.html#font-family-prop',
              'fontStyle':'css2:fonts.html#propdef-font-style', //italic
              'textAlign':'css2:text.html#propdef-text-align', //left | right | center
              'verticalAlign':'css2:visudet.html#propdef-vertical-align', //top | bottom | middle
              'fontSize':'css2:fonts.html#propdef-font-size',
              'fontWeight':'css2:fonts.html#propdef-font-weight', //normal | bold
              'zIndex': {
                '@id': 'css2:z-index',
                '@type': 'xsd:integer'
              },
              'DatasourceReference': 'wp:DatasourceReference',
              'DataSource': 'gpml:Data-Source',
              'LastModified': 'gpml:Last-Modified',
              'Pathway': 'biopax:Pathway',
              'shapeLibrary': 'http://shapelibrary.example.org/',
              'shapeName': 'shapeLibrary:shapeName',
              'image': 'schema:image',
              'dataNodeType': 'gpml:Type',
              'author': 'schema:author',
              'organism': 'biopax:organism',
              'stroke': 'svg:painting.html#StrokeProperty',
              'strokeWidth': 'svg:painting.html#StrokeWidthProperty',
              /*
              'text': {
                '@id': 'svg:text.html#TextElement',
                '@type': '@id'
              },
              //*/
              'line': {
                '@id': 'svg:text.html#TSpanElement',
                '@container': '@set'
              },
              'Group': {
                '@id': 'gpml:Group',
                '@container': '@list'
              },
              'pathwayElements': {
                '@id': 'ex:pathwayElements/',
                '@container': '@list'
              },
              'contains': {
                '@id': 'ex:contains',
                '@type': '@id'
                //'@container': '@list'
              },
              'isContainedBy': {
                '@reverse': 'ex:contains',
                '@type': '@id'
              },
              'edge': {
                '@type': '@id',
                '@container':'@list',
                'InteractionGraph': {
                  '@type': '@id',
                  '@container':'@list'
                }
              },
              //*
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              /*
               * Defining this as shown below works. It ensures InteractionGraph is an array.
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              //*/
              /*
               * Defining this as shown below makes it so the members are not included. I don't know why.
              'InteractionGraph': {
                '@id': 'ex:InteractionGraph',
                '@type': '@id'
              },
              //*/
              'interactsWith': {
                '@id': 'ex:interactsWith',
                '@type': '@id',
              },
              'Interaction': {
                '@id': 'biopax:Interaction',
                '@type': '@id'
              },
              'Point': {
                '@id': 'gpml:Point',
                '@container': '@list'
              }
            };
            callback(null, pathway['@context']);
          },
          PublicationXref: function(callback){
            pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(gpmlPathway, function(publicationXrefs) {
              if (!!publicationXrefs) {
                pathway.PublicationXref = publicationXrefs;
                callback(null, 'BiopaxRefs are all converted.');
              }
              else {
                callback(null, 'No biopaxRefs to convert.');
              }
            });
          },
          DataSource: function(callback){
            var jsonDataSource = gpmlPathway.attr('Data-Source');
            if (!!jsonDataSource) {
              pathway.DataSource = jsonDataSource;
              callback(null, 'DataSource converted.');
            }
            else {
              callback(null, 'No DataSource to convert.');
            }
          },
          Version: function(callback){
            var jsonVersion = gpmlPathway.attr('Version');
            if (!!jsonVersion) {
              pathway.Version = jsonVersion;
              callback(null, 'Version converted.');
            }
            else {
              callback(null, 'No Version to convert.');
            }
          },
          Author: function(callback){
            var jsonAuthor = gpmlPathway.attr('Author');
            if (!!jsonAuthor) {
              pathway.Author = jsonAuthor;
              callback(null, 'Author converted.');
            }
            else {
              callback(null, 'No Author to convert.');
            }
          },
          Maintainer: function(callback){
            var jsonMaintainer = gpmlPathway.attr('Maintainer');
            if (!!jsonMaintainer) {
              pathway.Maintainer = jsonMaintainer;
              callback(null, 'Maintainer converted.');
            }
            else {
              callback(null, 'No Maintainer to convert.');
            }
          },
          Email: function(callback){
            var jsonEmail = gpmlPathway.attr('Email');
            if (!!jsonEmail) {
              pathway.Email = jsonEmail;
              callback(null, 'Email converted.');
            }
            else {
              callback(null, 'No Email to convert.');
            }
          },
          LastModified: function(callback){
            var jsonLastModified = gpmlPathway.attr('Last-Modified');
            if (!!jsonLastModified) {
              pathway.LastModified = jsonLastModified;
              callback(null, 'LastModified converted.');
            }
            else {
              callback(null, 'No LastModified to convert.');
            }
          },
          License: function(callback){
            var jsonLicense = gpmlPathway.attr('License');
            if (!!jsonLicense) {
              pathway.License = jsonLicense;
              callback(null, 'License converted.');
            }
            else {
              callback(null, 'No License to convert.');
            }
          },
          Name: function(callback){
            var jsonName = gpmlPathway.attr('Name');
            if (!!jsonName) {
              pathway.Name = jsonName;
              callback(null, 'Name converted.');
            }
            else {
              callback(null, 'No Name to convert.');
            }
          },
          Organism: function(callback){
            var jsonOrganism = gpmlPathway.attr('Organism');
            if (!!jsonOrganism) {
              pathway.Organism = jsonOrganism;
              callback(null, 'Organism converted.');
            }
            else {
              callback(null, 'No Organism to convert.');
            }
          },
          image: function(callback){
            pathway.image = {
              '@context': {
                '@vocab': 'http://schema.org/'
              },
              'width':parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
            };
            callback(null, pathway.image);
          },
          Biopax: function(callback){
            var xmlBiopax = gpmlPathway.selectAll('Biopax');
            if (xmlBiopax[0].length > 0) {
              pathvisiojs.data.biopax.toPvjson(xmlBiopax, function(jsonBiopax) {
                pathway.Biopax = jsonBiopax;
              });
              callback(null, 'Biopax all converted.');
            }
            else {
              callback(null, 'No Biopax to convert.');
            }
          },
          DataNode: function(callback){
            var gpmlDataNode, dataNodes = gpmlPathway.selectAll('DataNode');
            if (dataNodes[0].length > 0) {
              pathway.DataNode = [];
              dataNodes.each(function() {
                gpmlDataNode = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.dataNode.toPvjson(gpmlDataNode, pathwayIri, function(jsonDataNode) {
                  pathway.DataNode.push(jsonDataNode);
                  pathway.nodes = pathway.nodes.concat(jsonDataNode);
                  pathway.elements = pathway.elements.concat(jsonDataNode);
                });
              })
              callback(null, 'DataNodes are all converted.');
            }
            else {
              callback(null, 'No dataNodes to convert.');
            }
          },
          Label: function(callback){
            var gpmlLabel, labels = gpmlPathway.selectAll('Label');
            if (labels[0].length > 0) {
              pathway.Label = [];
              gpmlPathway.selectAll('Label').each(function() {
                gpmlLabel = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.label.toPvjson(gpmlLabel, pathwayIri, function(jsonLabel) {
                  pathway.Label.push(jsonLabel);
                  pathway.nodes = pathway.nodes.concat(jsonLabel);
                  pathway.elements = pathway.elements.concat(jsonLabel);
                });
              })
              callback(null, 'Labels are all converted.');
            }
            else {
              callback(null, 'No labels to convert.');
            }
          },
          Shape: function(callback){
            var gpmlShape, shapes = gpmlPathway.selectAll('Shape');
            if (shapes[0].length > 0) {
              pathway.Shape = [];
              gpmlPathway.selectAll('Shape').each(function() {
                gpmlShape = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.shape.toPvjson(gpmlShape, pathwayIri, function(jsonShape) {
                  pathway.Shape.push(jsonShape);
                  pathway.nodes = pathway.nodes.concat(jsonShape);
                  pathway.elements = pathway.elements.concat(jsonShape);
                });
              })
              callback(null, 'Shapes are all converted.');
            }
            else {
              callback(null, 'No shapes to convert.');
            }
          },
          Group: function(callback){
            // Note: this calculates all the data for each group-node, except for its dimensions.
            // The dimenensions can only be calculated once all the rest of the elements have been
            // converted from GPML to JSON.
            var gpmlGroup, groups = gpmlPathway.selectAll('Group');
            if (groups[0].length > 0) {
              pathway.Group = [];
              gpmlPathway.selectAll('Group').each(function() {
                gpmlGroup = d3.select(this);
                pathvisiojs.data.gpml.element.node.groupNode.toPvjson(gpml, gpmlGroup, pathwayIri, function(jsonGroup) {
                  pathway.Group.push(jsonGroup);
                  pathway.nodes = pathway.nodes.concat(jsonGroup);
                });
              })
              callback(null, 'Groups are all converted.');
            }
            else {
              callback(null, 'No groups to convert.');
            }
          },
          //*
          GraphicalLine: function(callback){
            var gpmlGraphicalLine, graphicalLines = gpmlPathway.selectAll('GraphicalLine');
            if (graphicalLines[0].length > 0) {
              pathway.GraphicalLine = [];
              gpmlPathway.selectAll('GraphicalLine').each(function() {
                gpmlGraphicalLine = d3.select(this);
                pathvisiojs.data.gpml.edge.graphicalLine.toPvjson(gpml, gpmlGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
                  pathway.GraphicalLine.push(jsonGraphicalLine);
                  pathway.edges = pathway.edges.concat(jsonGraphicalLine);
                  pathway.elements = pathway.elements.concat(jsonGraphicalLine);
                });
              })
              callback(null, 'GraphicalLines are all converted.');
            }
            else {
              callback(null, 'No graphicalLines to convert.');
            }
          },
          //*/
          Interaction: function(callback){
            var gpmlInteraction, interactions = gpmlPathway.selectAll('Interaction');
            if (interactions[0].length > 0) {
              pathway.Interaction = [];
              gpmlPathway.selectAll('Interaction').each(function() {
                gpmlInteraction = d3.select(this);
                pathvisiojs.data.gpml.edge.interaction.toPvjson(gpml, gpmlInteraction, pathwayIri, function(jsonInteraction) {
                  pathway.Interaction.push(jsonInteraction);
                  pathway.edges = pathway.edges.concat(jsonInteraction);
                  pathway.elements = pathway.elements.concat(jsonInteraction);
                });
              })
              callback(null, 'Interactions are all converted.');
            }
            else {
              callback(null, 'No interactions to convert.');
            }
          }
      },
      function(err, results) {
        var groupsFrame, jsonGroups = [];
        if (!!pathway.Group) {
          groupsFrame = {
            '@context': pathway['@context'],
            '@type': 'GroupNode',
            'contains': {}
          };  
          jsonld.frame(pathway, groupsFrame, function(err, framedGroups) {
            async.waterfall([
              function(callbackInside){
                framedGroups['@graph'].forEach(function(jsonGroup) {
                  // Some GPML files contain empty groups due to a PathVisio-Java bug. They are deleted
                  // here because only groups that pass the test (!!jsonGroup.contains) are added to
                  // the jsonGroups array, and the jsonGroups array overwrites pathway.Group.
                  if (!!jsonGroup.contains) {
                    pathvisiojs.data.gpml.element.node.groupNode.getGroupDimensions(jsonGroup, function(dimensions) {
                      jsonGroup.x = dimensions.x;
                      jsonGroup.y = dimensions.y;
                      jsonGroup.width = dimensions.width;
                      jsonGroup.height = dimensions.height;
                      jsonGroup.zIndex = dimensions.zIndex;
                      pathvisiojs.data.gpml.element.node.getPorts(jsonGroup, function(ports) {
                        jsonGroup.Port = ports;
                        if (jsonGroups.indexOf(jsonGroup) === -1) {
                          jsonGroups.push(jsonGroup);
                        }
                      });
                    });
                  }
                });
                callbackInside(null, jsonGroups);
              },
              function(jsonGroups, callbackInside){
                pathway.Group = jsonGroups;
                pathway.elements = pathway.elements.concat(pathway.Group);

                var relativeZIndexByRenderableType = {
                  'GroupNode': 0,
                  'Interaction': 1,
                  'GraphicalLine': 2,
                  'Anchor': 3,
                  'EntityNode': 4
                }

                // sort by explicitly set z-index for all elements except GroupNodes, which use the lowest z-index
                // of their contained elements, and anchors, which use their parent element's z-index
                //TODO check whether anchors have been set to have a z-index
                pathway.elements.sort(function(a, b) {
                  var aPriority, bPriority;
                  if (a.zIndex !== b.zIndex) {
                    // if two elements have the same z-index,
                    // they will be sub-sorted by renderableElementType priority,
                    // as indicated in relativeZIndexByRenderableType
                    aPriority = a.zIndex + relativeZIndexByRenderableType[a.renderableType];
                    bPriority = b.zIndex + relativeZIndexByRenderableType[b.renderableType];
                  }
                  else {
                    aPriority = a.zIndex;
                    bPriority = b.zIndex;
                  }
                  return aPriority - bPriority;
                });
                callbackInside(null, pathway);
              },
              function(pathway, callbackInside){
                /*
                 * we don't need this until we start rendering without cached data
                pathway.pathwayNestedByDependencies = d3.nest()
                .key(function(d) { return d.hasDependencies; })
                .entries(pathway.elements);
                //*/

                pathway.pathwayNestedByGrouping = d3.nest()
                .key(function(d) { return d.isContainedBy; })
                .entries(pathway.elements);

                var firstOrderElement = pathway.pathwayNestedByGrouping.filter(function(group) {
                  return group.key === 'undefined';
                })[0];
                pathway.pathwayNestedByGrouping = pathvisiojs.utilities.moveArrayItem(pathway.pathwayNestedByGrouping, pathway.pathwayNestedByGrouping.indexOf(firstOrderElement), 0);
                callbackInside(null, pathway);
              },
              function(pathway, callbackInside){
                self.myPathway = pathway;
                callbackOutside(pathway);
              }
            ]);
          });
        }
        else {
          pathway.elements.sort(function(a, b) {
            return a.zIndex - b.zIndex;
          });

          pathway.pathwayNestedByGrouping = d3.nest()
          .key(function(d) { return d.isContainedBy; })
          .entries(pathway.elements);

          //self.myPathway = pathway;
          callbackOutside(pathway);
        }
      });
      }
/*
      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = pathvisiojs.utilities.convertToArray( pathway.comment );
          delete pathway.comment;

          pathway.comments.forEach(function(element, index, array) {
            // modify data
          });
        }
        else {
          console.log('No element(s) named 'comment' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting comment to json: ' + e.message);
      }

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalLine')) {
          var graphicalLines = pathvisiojs.utilities.convertToArray( pathway.graphicalLine );
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
          console.log('No element(s) named 'graphicalLine' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting graphicalLine to json: ' + e.message);
      }

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = pathvisiojs.utilities.convertToArray( pathway.interaction );
          delete pathway.interaction;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          interactions.forEach(function(element, index, array) {
            element.edgeType = 'interaction';
            pathway.edges.push(element);
          });

          interactions;
          pathway.edges;
        }
        else {
          console.log('No element(s) named 'interaction' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting interaction to json: ' + e.message);
      }

      //*/
    }
    else {
      alert('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
      throw new Error('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
    }
  }

  return {
    get:get,
    toPvjson:toPvjson,
    getLineStyle:getLineStyle,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson,
    gpmlColorToCssColor:gpmlColorToCssColor,
    setColorAsJson:setColorAsJson
  };
}();

// hack required because we call ...node.anchors.toPvjson() before we
// call the other ...node.toPvjson() methods
pathvisiojs.data.gpml.node = pathvisiojs.data.gpml.node || {};
;

'use strict';

// includes all GPML elements. Is parent of node and edge.

pathvisiojs.data.gpml.element = {};


var pathvisioDefaultStyleValues = {
  'FontSize':{
    'Type':"FontSize",
    'Value':10
  }
}

pathvisiojs.data.gpml.element.gpmlColorToCssColor = function(gpmlColor, pathvisioDefault) {
  var color;
  if (gpmlColor !== pathvisioDefault) {
    if (!!gpmlColor) {
      color = new RGBColor(gpmlColor);
      if (color.ok) {
        return color.toHex();
      }
      else {
        return 'black';
      }
    }
    else {
      return 'black';
    }
  }
  else {
    return null;
  }
}

pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
  var jsonColor;
  if (currentGpmlColorValue !== defaultGpmlColorValue) {
    jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
    jsonElement.color = jsonColor;
    jsonElement.borderColor = jsonColor;
    if (jsonElement.hasOwnProperty('text')) {
      jsonElement.text.color = jsonColor;
    }
  }
  return jsonElement;
}


pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
  var jsonColor;
  if (currentGpmlColorValue !== defaultGpmlColorValue) {
    jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
    jsonElement.color = jsonColor;
    jsonElement.borderColor = jsonColor;
    if (jsonElement.hasOwnProperty('text')) {
      jsonElement.text.color = jsonColor;
    }
  }
  return jsonElement;
}

// TODO can we delete this function?

pathvisiojs.data.gpml.element.getLineStyle = function(gpmlElement) {
  var LineStyle, attributes; 
  var graphics = gpmlElement.select('Graphics');
  if (!!graphics) {
    LineStyle = graphics.attr('LineStyle'); 
    if (!!LineStyle) {
      return LineStyle;
    }
    else {

      // As currently specified, a given element can only have one LineStyle.
      // This one LineStyle can be solid, dashed (broken) or double.
      // If no value is specified in GPML for LineStyle, then we need to check
      // for whether the element has LineStyle of double.

      attributes = gpmlElement.selectAll('Attribute');
      if (attributes.length > 0) {
        LineStyle = attributes.filter(function(d, i) {
          return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
        });

        if (LineStyle[0].length > 0) {
          return 'double';
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
  }
}

pathvisiojs.data.gpml.element.getBorderStyle = function(gpmlLineStyle, pathvisioDefault) {

  // Double-lined EntityNodes will be handled by using a symbol with double lines.
  // Double-lined edges will be rendered as single-lined, solid edges, because we
  // shouldn't need double-lined edges other than for cell walls/membranes, which
  // should be symbols. Any double-lined edges are curation issues.

  var lineStyleToBorderStyleMapping = {
    'Solid':'solid',
    'Double':'solid',
    'Broken':'dashed'
  };
  var borderStyle;
  if (gpmlLineStyle !== pathvisioDefault) {
    if (!!gpmlLineStyle) {
      borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
      if (borderStyle) {
        return borderStyle;
      }
      else {
        console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
        return 'solid';
      }
    }
    else {
      return 'solid';
    }
  }
  else {

    // TODO use code to actually get the default

    return 'whatever the default value is';
  }
}

pathvisiojs.data.gpml.element.setBorderStyleAsJson = function(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
  var borderStyle;

  // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
  // whether it has returned the default value, and we need to know whether we are using the
  // default here.

  if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
    borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
    jsonElement.borderStyle = borderStyle;
  }
  return jsonElement;
}

// set default values. "swing" refers to PathVisio-Java.
pathvisiojs.data.gpml.element.color = {};
pathvisiojs.data.gpml.element.color.swing = '000000';
pathvisiojs.data.gpml.element.color.gpml = null;

pathvisiojs.data.gpml.element.fillColor = {};
pathvisiojs.data.gpml.element.fillColor.swing = 'ffffff';
pathvisiojs.data.gpml.element.fillColor.gpml = null;

pathvisiojs.data.gpml.element.lineStyle = {};
pathvisiojs.data.gpml.element.lineStyle.swing = 'Solid';
pathvisiojs.data.gpml.element.lineStyle.gpml = null;

pathvisiojs.data.gpml.element.fontSize = {};
pathvisiojs.data.gpml.element.fontSize.swing = 10;
pathvisiojs.data.gpml.element.fontSize.gpml = 10;

pathvisiojs.data.gpml.element.fontWeight = {};
pathvisiojs.data.gpml.element.fontWeight.swing = null;
pathvisiojs.data.gpml.element.fontWeight.gpml = null;

pathvisiojs.data.gpml.element.fontName = {};
pathvisiojs.data.gpml.element.fontName.swing = 'Arial';
pathvisiojs.data.gpml.element.fontName.gpml = null;
  
pathvisiojs.data.gpml.element.toPvjson = function(gpmlElement, jsonElement, elementCallback) {
  jsonElement["@type"] = jsonElement["@type"] || [];
  jsonElement["@type"].push("element");

  pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(gpmlElement, function(publicationXrefs) {
    if (!!publicationXrefs) {
      jsonElement.PublicationXref = publicationXrefs;
    }
    elementCallback(jsonElement);
  });

  /*
     var graphics = gpmlElement.select('Graphics'),
     zIndex,
     borderWidth;
     if (graphics[0].length > 0) {
     zIndex = graphics.attr('ZOrder') || 1;
     jsonElement.zIndex = parseFloat(borderWidth);

     borderWidth = graphics.attr('LineThickness') || 1;
     jsonElement.borderWidth = parseFloat(borderWidth);
     }
  //*/
};
;

pathvisiojs.data.gpml.text = function() {
  'use strict';

  var pathvisioDefaultStyleValues = {
    'text':{
      'Align':null,
      'Valign':'Middle',
      'FontStyle':null,
      'FontName':null
    }
  }

  function toPvjson(gpmlNode, inputDefaultValues, textCallbackOutside) {
    /*
    console.log('gpmlNode');
    console.log(gpmlNode[0][0]);
    console.log('inputDefaultValues');
    console.log(inputDefaultValues);
    console.log('textCallbackOutside');
    console.log(textCallbackOutside);
    //*/
    try {
      var thisPathvisioDefaultStyleValues = pathvisiojs.utilities.collect(pathvisioDefaultStyleValues.text, inputDefaultValues);
      var jsonText, textAlign, verticalAlign, fontStyle, fontWeight, fontSize, fontFamily,
        text = gpmlNode.attr('TextLabel');
      if (!!text) {
        jsonText = {};
        jsonText['@id'] = ('id' + uuid.v4());
        jsonText.line = text.split(/\r\n|\r|\n|&#xA;/g);

        var graphics = gpmlNode.select('Graphics');
        var textAlign, fontStyle, fontWeight, fontSize, fontFamily;
        if (!!graphics[0][0]) {
          textAlign = gpmlNode.select('Graphics').attr('Align') || 'center';
          jsonText.textAlign = textAlign.toLowerCase();

          verticalAlign = gpmlNode.select('Graphics').attr('Valign') || 'middle';
          jsonText.verticalAlign = verticalAlign.toLowerCase();

          fontStyle = gpmlNode.select('Graphics').attr('FontStyle');
          if (fontStyle !== thisPathvisioDefaultStyleValues['FontStyle'] && !!fontStyle) {
            jsonText.fontStyle = fontStyle.toLowerCase();
          }

          fontWeight = gpmlNode.select('Graphics').attr('FontWeight');
          if (fontWeight !== thisPathvisioDefaultStyleValues['FontWeight'] && !!fontWeight) {
            jsonText.fontWeight = fontWeight.toLowerCase();
          }

          fontSize = gpmlNode.select('Graphics').attr('FontSize') || 10;
          if (parseFloat(fontSize) !== thisPathvisioDefaultStyleValues['FontSize'] && !!fontSize) {
            jsonText.fontSize = parseFloat(fontSize);
          }

          fontFamily = gpmlNode.select('Graphics').attr('FontName');
          if (fontFamily !== thisPathvisioDefaultStyleValues['FontName'] && !!fontFamily) {
            jsonText.fontFamily = fontFamily;
          }
        }
        textCallbackOutside(jsonText);
      }
      else {
        textCallbackOutside(null);
      }
    }
    catch (e) {
      throw new Error("Error converting gpmlNode's text to renderable json: " + e.message);
    }
  }

  return {
    toPvjson:toPvjson
  };
}();
;

// array of GPML xml namespaces in order from newest to oldest

pathvisiojs.data.gpml.namespaces = [
  "http://pathvisio.org/GPML/2013a",
  "http://genmapp.org/GPML/2010a",
  "http://genmapp.org/GPML/2008a",
  "http://genmapp.org/GPML/2007"
]
;

pathvisiojs.data.gpml.biopaxRef = function(){
  'use strict';

  function getAllAsPvjson(gpmlElement, callback) {
    var publicationXrefs, jsonPublicationXref, tagName = gpmlElement[0][0].tagName;
    var biopaxRefs = gpmlElement.selectAll(tagName + ' > BiopaxRef');
    if (biopaxRefs[0].length > 0) {
      publicationXrefs = [];
      biopaxRefs.each(function() {
        jsonPublicationXref = d3.select(this)[0][0].textContent;
        publicationXrefs.push(jsonPublicationXref);
      })
      callback(publicationXrefs);
    }
    else {
      callback(null);
    }
  }

  return {
    getAllAsPvjson:getAllAsPvjson
  };
}();
;

'use strict';

// includes GPML elements of type EntityNode and Group

pathvisiojs.data.gpml.element.node = Object.create(pathvisiojs.data.gpml.element);

pathvisiojs.data.gpml.element.node.shapeType = pathvisiojs.data.gpml.element.node.backgroundImage = {};
pathvisiojs.data.gpml.element.node.shapeType.swing = 'Rectangle';
pathvisiojs.data.gpml.element.node.shapeType.gpml = 'Rectangle';

pathvisiojs.data.gpml.element.node.valign = pathvisiojs.data.gpml.element.node.verticalAlign = {};
pathvisiojs.data.gpml.element.node.valign.swing = 'Middle';
pathvisiojs.data.gpml.element.node.valign.gpml = 'Middle';

pathvisiojs.data.gpml.element.node.align = pathvisiojs.data.gpml.element.node.textAlign = {};
pathvisiojs.data.gpml.element.node.align.swing = 'Center';
pathvisiojs.data.gpml.element.node.align.gpml = null;

pathvisiojs.data.gpml.element.node.padding = {};
pathvisiojs.data.gpml.element.node.padding.swing = '0.5em';
pathvisiojs.data.gpml.element.node.padding.gpml = null;

pathvisiojs.data.gpml.element.node.lineThickness = pathvisiojs.data.gpml.element.node.borderWidth = {};
pathvisiojs.data.gpml.element.node.lineThickness.swing = 1;
pathvisiojs.data.gpml.element.node.lineThickness.gpml = null;

pathvisiojs.data.gpml.element.node.lineStyle = pathvisiojs.data.gpml.element.node.borderStyle;

pathvisiojs.data.gpml.element.node.setJsonBackgroundColor = function(jsonNode, currentGpmlFillColorValue, defaultGpmlFillColorValue) {
  var jsonBackgroundColor;
  if (currentGpmlFillColorValue !== defaultGpmlFillColorValue) {
    jsonBackgroundColor = pathvisiojs.data.gpml.gpmlColorToCssColor(currentGpmlFillColorValue, defaultGpmlFillColorValue);
    jsonNode.backgroundColor = jsonBackgroundColor;
  }
  return jsonNode;
}

pathvisiojs.data.gpml.element.node.getPorts = function(jsonNode, callback) {
  var getPerpendicularLine = function(sx, sy, rotate) {
    var rad = rotate * Math.PI/180;
    var sideAngleRotation = 2 * Math.PI - rad;
    var dx, dy;
    var sideAngleBeforeRotate = Math.atan2(sy, sx);
    var dx = Math.cos(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
    var dy = Math.sin(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
    return {'dx': dx, 'dy': dy};
  }

  var ports = [];
  var relXYCombinations = [
    {
    RelX: -0.5,
    RelY: -1
  },
  {
    RelX: 0,
    RelY: -1
  },
  {
    RelX: 0.5,
    RelY: -1
  },
  {
    RelX: 1,
    RelY: -0.5
  },
  {
    RelX: 1,
    RelY: 0
  },
  {
    RelX: 1,
    RelY: 0.5
  },
  {
    RelX: -0.5,
    RelY: 1
  },
  {
    RelX: 0,
    RelY: 1
  },
  {
    RelX: 0.5,
    RelY: 1
  },
  {
    RelX: -1,
    RelY: -0.5
  },
  {
    RelX: -1,
    RelY: 0
  },
  {
    RelX: -1,
    RelY: 0.5
  }
  ];

  var side = {};

  var x, y, perpendicularUnitVector, rotate;
  relXYCombinations.forEach(function(relXYCombination) {
    if (Math.abs(relXYCombination.RelX) === 1) {
      side.sx = relXYCombination.RelX;
      side.sy = 0;
    }
    else {
      side.sx = 0;
      side.sy = relXYCombination.RelY;
    }

    // if rotate has a value, keep the value. Otherwise, it's 0deg.

    rotate = jsonNode.rotate || 0;
    perpendicularUnitVector = getPerpendicularLine(side.sx, side.sy, rotate);

    /*
     * then get line represented by side
     * and then get perpendicular to that line, taking
     * into account rotation
     * */

    ports.push({
      'x': (jsonNode.x + jsonNode.width * (relXYCombination.RelX + 1)/2),
      'y': (jsonNode.y + jsonNode.height * (relXYCombination.RelY + 1)/2),
      'positionRelative':{
        '@context':{
          'position':{
            '@value':'relative'
          }
        },
        'x': 100 * (relXYCombination.RelX + 1)/2 + '%',
        'y': 100 * (relXYCombination.RelY + 1)/2 + '%'
      },
      'dx': perpendicularUnitVector.dx,
      'dy': perpendicularUnitVector.dy,
      '@type':'Port'
    }); 
  }); 
  callback(ports);
}

// gpmlNode is NOT referring to data nodes exclusively. It is also referring to any other non-edge elements that can have anchors.

pathvisiojs.data.gpml.element.node.toPvjson = function(gpmlNode, jsonNode, callback) {
  jsonNode["@type"] = jsonNode["@type"] || [];
  jsonNode["@type"].push("node");

  pathvisiojs.data.gpml.element.toPvjson(gpmlNode, jsonNode, function(jsonNode) {
    callback(jsonNode);
  });

  /*
     var comments = gpmlNode.selectAll('Comment');
     if (comments[0].length > 0) {
     jsonNode.comments = [];
     comments.each(function() {
     jsonNode.comments.push(d3.select(this).text());
     });
     }

  // Be warned that support for zIndex in SVG is spotty (non-existent? TODO check css cross-browser). You should rely on ordering in the DOM.

  var zIndex = gpmlNode.select('Graphics').attr('ZOrder');
  if (!!zIndex) {
  jsonNode.zIndex = parseFloat(zIndex);
  }

  var centerX = parseFloat(gpmlNode.select('Graphics').attr('CenterX'));
  jsonNode.width = parseFloat(gpmlNode.select('Graphics').attr('Width'));
  jsonNode.x = centerX - jsonNode.width/2;

  var centerY = parseFloat(gpmlNode.select('Graphics').attr('CenterY'));
  jsonNode.height = parseFloat(gpmlNode.select('Graphics').attr('Height'));
  jsonNode.y = centerY - jsonNode.height/2;

  jsonNode.id = gpmlNode.attr('GraphId');

  var shapeType = gpmlNode.select('Graphics').attr('ShapeType'); 
  if (!shapeType) {

// To display correctly, a data-node must have a shape type.
// If no shape type is specified in GPML, this code will
// make the default be 'rectangle'

if (jsonNode.nodeType === 'data-node') {
jsonNode.shapeType = "rectangle";
}
else {
jsonNode.shapeType = "none";
}
}
else {
jsonNode.shapeType = strcase.paramCase(shapeType);
}

var strokeWidth = gpmlNode.select('Graphics').attr('LineThickness'); 
if (!!strokeWidth) {
jsonNode.strokeWidth = strokeWidth;
}

var attributes = gpmlNode.selectAll('Attribute');
console.log('attributes');
console.log(attributes);
///*
var doubleProperty, cellularComponent;
if (attributes.length > 0) {
doubleProperty = attributes.filter(function(d, i) {
console.log('this');
console.log(this);
return d3.select(this).attr('Key') === 'org.pathvisio.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
});
if (doubleProperty[0].length > 0) {
jsonNode.shapeType = shapeType + '-double';
}
cellularComponent = attributes.filter(function(d, i) {
return d3.select(this).attr('Key') === 'org.pathvisiojs.CellularComponentProperty' && d3.select(this).attr('Value') != 'None';
});
if (cellularComponent[0].length > 0) {
jsonNode.cellularComponent = cellularComponent.attr('Value');
}
}



// BiopaxRefs 

try {
  if (element.hasOwnProperty('biopaxRef')) {
    element.biopaxRefs = pathvisiojs.utilities.convertToArray( element.biopaxRef );
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
//*/
}

pathvisiojs.data.gpml.element.node.getPortCoordinates = function(boxDimensions, relX, relY) {
  var port = {};
  port.x = boxDimensions.x + (relX * boxDimensions.width);
  port.y = boxDimensions.y + (relY * boxDimensions.height);
  return port;
}
;

pathvisiojs.data.gpml.element.node.groupNode = function() {
  'use strict';

  var groupTypeToShapeTypeMappings = {
    'Complex':'complex',
    'Group':'rectangle',
    'None':'rectangle',
    'Pathway':'rectangle'
  };

  var pathvisioDefaultStyleValues = {
    'FontSize':null,
    'FontWeight':null
  }

  function getGroupDimensions(group, callback) {
    /*
    console.log('group');
    console.log(group);
    console.log('groupContents');
    console.log(groupContents);
    //*/
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = 99999;
    dimensions.topLeftCorner.y = 99999;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;

    var groupContents = group.contains;
    groupContents = pathvisiojs.utilities.convertToArray(groupContents);

    // TODO check what happens if the contained element lacks a z-index
    dimensions.zIndex = groupContents[0].zIndex;
    async.each(groupContents, function(groupContent, callbackInside) {
      if (groupContent.renderableType === 'EntityNode') {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.x + groupContent.width);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.y + groupContent.height);
      }
      else {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
      }
      dimensions.x = dimensions.topLeftCorner.x - group.padding - group.borderWidth;
      dimensions.y = dimensions.topLeftCorner.y - group.padding - group.borderWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (group.padding + group.borderWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (group.padding + group.borderWidth);
      dimensions.zIndex = Math.min(dimensions.zIndex, groupContent.zIndex);
      callbackInside(null);
    },
    function (err) {
      callback(dimensions);
    });
  }

  function toPvjson(pathway, gpmlGroup, pathwayIri, callbackOutside) {
    var jsonGroup = {},
      groupId,
      shapeType,
      groupType;

    var graphId = gpmlGroup.attr('GraphId') || ('id' + uuid.v4());
    jsonGroup.GraphId = graphId;
    groupId = gpmlGroup.attr('GroupId') || ('id' + uuid.v4());
    jsonGroup["@id"] = 'pathwayIri:' + groupId;
    jsonGroup.GroupId = groupId;
    groupType = gpmlGroup.attr('Style') || 'None';

    var shapeType = groupTypeToShapeTypeMappings[groupType];
    jsonGroup.ShapeType = shapeType || 'rectangle';

    jsonGroup.renderableType = 'GroupNode';
    jsonGroup.nodeType = "GroupNode";
    jsonGroup.groupType = groupType;

    jsonGroup["@type"] = [];
    jsonGroup["@type"].push(shapeType);
    jsonGroup["@type"].push("GroupNode");
    jsonGroup["@type"].push(groupType);

    // Groups in PathVisio (Java) appear to have unchangable padding values,
    // but they are different based on GroupType.

    var groupTypeToPaddingValueMappings = {
      'Complex': 11,
      'Group': 8,
      'None': 8,
      'Pathway': 8
    };

    jsonGroup.padding = groupTypeToPaddingValueMappings[groupType];

    // Groups in PathVisio (Java) appear to have a default borderWidth
    // of 1px at normal zoom levels, but unlike for edges and EntityNodes, 
    // this borderWidth does not change when I zoom in or out.
    //
    // TODO this should be updated to check for whether it is defined
    // in CSS. If it is, this could conflict or require defining
    // borderWidth twice -- once here and once in CSS.

    jsonGroup.borderWidth = 1;
    pathvisiojs.data.gpml.text.toPvjson(gpmlGroup, pathvisioDefaultStyleValues, function(text) {
      /*
      console.log('text');
      console.log(text);
      //*/
      if (!!text) {
        jsonGroup.text = text;

        // TODO set fontSize in CSS, not here. Need to be able to still calculate font rendering, however,
        // which depends in part on font size.

        jsonGroup.text.fontSize = 32;
        jsonGroup.text.textAlign = 'center';
        jsonGroup.text.verticalAlign = 'middle';
      }
      pathvisiojs.data.gpml.element.node.toPvjson(gpmlGroup, jsonGroup, function(jsonGroup) {
        callbackOutside(jsonGroup);
      });
    });
  }

  return {
    toPvjson:toPvjson,
    getGroupDimensions:getGroupDimensions
  };
}();

;

// includes GPML elements of type Shape, Label and DataNode

pathvisiojs.data.gpml.element.node.entityNode = Object.create(pathvisiojs.data.gpml.element.node);

pathvisiojs.data.gpml.element.node.entityNode.setJsonRotationValue = function(jsonNode, currentGpmlRotationValue, defaultGpmlRotationValue) {
  if (currentGpmlRotationValue !== defaultGpmlRotationValue) {
    jsonNode.rotate = currentGpmlRotationValue * 180/Math.PI; //converting from radians to degrees
  }
  return jsonNode;
}

pathvisiojs.data.gpml.element.node.entityNode.toPvjson = function(gpmlEntityNode, jsonEntityNode, pathvisioDefaultStyleValues, pathwayIri, EntityNodeCallback) {
  'use strict';
  var graphId = gpmlEntityNode.attr('GraphId') || ('id' + uuid.v4());
  jsonEntityNode["@id"] = 'pathwayIri:' + graphId;
  jsonEntityNode.GraphId = graphId;

  var isContainedBy = gpmlEntityNode.attr('GroupRef');
  if (!!isContainedBy) {
    jsonEntityNode.isContainedBy = 'pathwayIri:' + isContainedBy;
  }

  var shapeType = gpmlEntityNode.select('Graphics').attr('ShapeType') || 'rectangle';
  if (shapeType === 'None') {
    shapeType = 'rectangle';
  }
  shapeType = strcase.paramCase(shapeType);
  jsonEntityNode.ShapeType = shapeType;
  jsonEntityNode.zIndex = parseFloat(gpmlEntityNode.select('Graphics').attr('ZOrder'));
  jsonEntityNode.renderableType = 'EntityNode';

  jsonEntityNode["@type"] = jsonEntityNode["@type"] || [];
  jsonEntityNode["@type"].push("EntityNode");
  jsonEntityNode["@type"].push(shapeType);
  var groupedStatus = isContainedBy || 'notGrouped';
  jsonEntityNode["@type"].push(groupedStatus);

  var borderWidth = gpmlEntityNode.select('Graphics').attr('LineThickness');
  if (borderWidth !== pathvisioDefaultStyleValues.LineThickness) {
    jsonEntityNode.borderWidth = parseFloat(borderWidth);
  }
  // TODO get the actual default value instead of just assuming a value of 1
  borderWidth = jsonEntityNode.borderWidth || 1;

  // exactly what is meant by "width" and "height" is not clearly specified in GPML,
  // so I analyzed examples by visually inspecting the rendering in PathVisio-Java, at
  // a zoom level that made for easy reading of DataNodes at their default size.
  // This analysis indicates the following meaning for GPML width in CSS2.1 box-model terms:
  // gpmlWidth = elementWidth + elementPadding + elementBorderWidth (1/2 on each side = 1)
  // with a similar calculation for gpmlHeight

  var gpmlWidth = parseFloat(gpmlEntityNode.select('Graphics').attr('Width'));
  jsonEntityNode.width = gpmlWidth + borderWidth; 

  var gpmlHeight = parseFloat(gpmlEntityNode.select('Graphics').attr('Height'));
  jsonEntityNode.height = gpmlHeight + borderWidth; 

  var centerX = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterX'));
  jsonEntityNode.x = centerX - gpmlWidth/2;

  var centerY = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterY'));
  jsonEntityNode.y = centerY - gpmlHeight/2;

  jsonEntityNode.padding = "0.5em";

  var attributes = gpmlEntityNode.selectAll('Attribute');
  var doubleProperty;
  if (attributes.length > 0) {
    doubleProperty = attributes.filter(function(d, i) {
      return d3.select(this).attr('Key') === 'org.pathvisio.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
    });
    if (doubleProperty[0].length > 0) {
      jsonEntityNode.ShapeType = shapeType + '-double';
    }
  }

  pathvisiojs.data.gpml.element.node.getPorts(jsonEntityNode, function(ports) {
    //console.log('ports');
    //console.log(ports);
    jsonEntityNode.Port = ports;
    pathvisiojs.data.gpml.element.node.toPvjson(gpmlEntityNode, jsonEntityNode, function(jsonEntityNode) {
      EntityNodeCallback(jsonEntityNode, ports);
    });
  });
}
;

// TODO I don't know why these two elements below are here.
pathvisiojs.data.gpml.element.node.entityNode.dataNode = Object.create(pathvisiojs.data.gpml.element.node.entityNode);

var pathvisioDefaultStyleValues = {
  'DataNode':{
    'LineStyle':null,
    'FillColor':null,
    'GeneProduct':{
      'Color':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Complex':{
      'Color':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Protein':{
      'Color':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Rna':{
      'Color':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Unknown':{
      'Color':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Pathway':{
      'Color':'14961e',
      'FontSize':12,
      'FontWeight':'Bold'
    },
    'Metabolite':{
      'Color':'0000ff',
      'FontSize':10,
      'FontWeight':null
    }
  }
}

pathvisiojs.data.gpml.element.node.entityNode.dataNode.toPvjson = function(gpmlDataNode, pathwayIri, callbackInside) {
  'use strict';
  var jsonDataNode = {};
  var dataNodeType = gpmlDataNode.attr('Type');
  if (!dataNodeType) {
    dataNodeType = 'Unknown';
  }
  jsonDataNode.nodeType = "DataNode";
  jsonDataNode.dataNodeType = dataNodeType;
  jsonDataNode["@type"] = jsonDataNode["@type"] || [];
  jsonDataNode["@type"].push("DataNode");
  jsonDataNode["@type"].push(dataNodeType);

  var thisPathvisioDefaultStyleValues = pathvisiojs.utilities.collect(pathvisioDefaultStyleValues.DataNode, pathvisioDefaultStyleValues.DataNode[dataNodeType]);

  pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlDataNode, jsonDataNode, thisPathvisioDefaultStyleValues, pathwayIri, function(jsonDataNode) {
    var database, ID, 
    datasourceReference = gpmlDataNode.select('Xref');
    if (!!datasourceReference) {
      database = datasourceReference.attr('Database')
      ID = datasourceReference.attr('ID')
      if (!!database && !!ID) {
        jsonDataNode.DatasourceReference = {};
        jsonDataNode.DatasourceReference.Database = database;
        jsonDataNode.DatasourceReference.ID = ID;
      }
    }
    pathvisiojs.data.gpml.text.toPvjson(gpmlDataNode, thisPathvisioDefaultStyleValues, function(text) {
      if (!!text) {
        jsonDataNode.text = text;
      }
      jsonDataNode = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonDataNode,
                                                                gpmlDataNode.select('Graphics').attr('LineStyle'),
                                                                thisPathvisioDefaultStyleValues.LineStyle);
      jsonDataNode = pathvisiojs.data.gpml.setColorAsJson(jsonDataNode,
                                                          gpmlDataNode.select('Graphics').attr('Color'),
                                                          thisPathvisioDefaultStyleValues.Color);
      jsonDataNode = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonDataNode,
                                                                       gpmlDataNode.select('Graphics').attr('FillColor'),
                                                                       thisPathvisioDefaultStyleValues.FillColor);
      callbackInside(jsonDataNode);
    });
  });
}
;

pathvisiojs.data.gpml.element.node.entityNode.label = Object.create(pathvisiojs.data.gpml.element.node.entityNode);

pathvisiojs.data.gpml.element.node.entityNode.label.Rotation = null;
pathvisiojs.data.gpml.element.node.entityNode.label.Color = null;
pathvisiojs.data.gpml.element.node.entityNode.label.FillColor = null;
pathvisiojs.data.gpml.element.node.entityNode.label.FontSize = 10;
pathvisiojs.data.gpml.element.node.entityNode.label.FontWeight = null;

pathvisiojs.data.gpml.element.node.entityNode.label.toPvjson = function(gpmlLabel, pathwayIri, callback) {
  'use strict';
  /*
  console.log('gpmlLabel');
  console.log(gpmlLabel[0][0]);
  console.log('pathwayIri');
  console.log(pathwayIri);
  console.log('callback');
  console.log(callback);
  //*/
  var jsonLabel = {};
  jsonLabel.nodeType = "Label";
  pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlLabel, jsonLabel, pathvisiojs.data.gpml.element.node.entityNode.label, pathwayIri, function(jsonLabel) {
    pathvisiojs.data.gpml.text.toPvjson(gpmlLabel, pathvisiojs.data.gpml.element.node.entityNode.label, function(text) {
      if (!!text) {
        jsonLabel.text = text;
      }

      jsonLabel = pathvisiojs.data.gpml.setColorAsJson(jsonLabel,
                    gpmlLabel.select('Graphics').attr('Color'),
                    pathvisiojs.data.gpml.element.node.entityNode.label.Color);

      jsonLabel = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonLabel,
                    gpmlLabel.select('Graphics').attr('FillColor'),
                    pathvisiojs.data.gpml.element.node.entityNode.label.FillColor);

      var gpmlBackgroundColor = gpmlLabel.select('Graphics').attr('FillColor');
      var jsonBackgroundColor = pathvisiojs.data.gpml.gpmlColorToCssColor(gpmlBackgroundColor, pathvisiojs.data.gpml.element.node.entityNode.label.FillColor);
      if (!!jsonBackgroundColor) {
        jsonLabel.backgroundColor = jsonBackgroundColor;
      }

      callback(jsonLabel);
    });
  });
}
;

pathvisiojs.data.gpml.element.node.entityNode.shape = function(){
  'use strict';

  var pathvisioDefaultStyleValues = {
    'Shape':{
      'Rotation':'0.0',
      'Color':null,
      'FillColor':null,
      'FontSize':10,
      'FontWeight':null,
      'LineStyle':null,
      'LineThickness':null,
      'Cell':{
        'Color':'c0c0c0',
        'LineStyle':'Broken'
      },
      'Nucleus':{
        'Color':'c0c0c0'
      },
      'EndoplasmicReticulum':{
        'Color':'c0c0c0'
      },
      'GolgiApparatus':{
        'Color':'c0c0c0'
      },
      'Mitochondria':{
        'Color':'c0c0c0'
      },
      'SarcoplasmicReticulum':{
        'Color':'c0c0c0'
      },
      'Organelle':{
        'Color':'c0c0c0'
      },
      'Vesicle':{
        'Color':'c0c0c0'
      },
      'ExtracellularRegion':{
        'Color':'c0c0c0'
      }
    }
  }

  function toPvjson(gpmlShape, pathwayIri, callback) {
    
    // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
    // Below we correct the GPMl so that the display in pathvisiojs will matches the display in PathVisio-Java.
    self.myGpmlShape = gpmlShape;
    var gpmlWidth, gpmlCenterX; 
    if (gpmlShape.select('Graphics').attr('ShapeType') === 'Triangle') {
      gpmlWidth = parseFloat(gpmlShape.select('Graphics').attr('Width'));
      gpmlCenterX = parseFloat(gpmlShape.select('Graphics').attr('CenterX'));
      gpmlShape.select('Graphics').attr('CenterX', gpmlCenterX + gpmlWidth * 0.27);
      gpmlShape.select('Graphics').attr('Width', gpmlWidth * 0.98);
    }

    var jsonShape = {};
    jsonShape.nodeType = "Shape";

    var attributes = gpmlShape.selectAll('Attribute');
    var CellularComponent;
    if (attributes.length > 0) {
      CellularComponent = attributes.filter(function(d, i) {
        return d3.select(this).attr('Key') === 'org.pathvisio.CellularComponentProperty' && d3.select(this).attr('Value') !== 'None';
      });

      if (CellularComponent[0].length > 0) {
        jsonShape.CellularComponent = CellularComponent.attr('Value');
      }
    }

    var thisPathvisioDefaultStyleValues;
    if (!!jsonShape.CellularComponent) {
      thisPathvisioDefaultStyleValues = pathvisiojs.utilities.collect(pathvisioDefaultStyleValues.Shape, pathvisioDefaultStyleValues.Shape[strcase.classCase(jsonShape.CellularComponent)]);
    }
    else {
      thisPathvisioDefaultStyleValues = pathvisioDefaultStyleValues.Shape;
    }

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlShape, jsonShape, thisPathvisioDefaultStyleValues, pathwayIri, function(jsonShape) {
      pathvisiojs.data.gpml.text.toPvjson(gpmlShape, thisPathvisioDefaultStyleValues, function(text) {
        if (!!text) {
          jsonShape.text = text;
        }

        jsonShape = pathvisiojs.data.gpml.setColorAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('Color'),
                      thisPathvisioDefaultStyleValues.Color);

        jsonShape = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonShape,
                      gpmlShape.select('Graphics').attr('FillColor'),
                      thisPathvisioDefaultStyleValues.FillColor);

        jsonShape = pathvisiojs.data.gpml.element.node.entityNode.setJsonRotationValue(jsonShape,
                      gpmlShape.select('Graphics').attr('Rotation'),
                      thisPathvisioDefaultStyleValues.Rotation);

        jsonShape = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('LineStyle'),
                      thisPathvisioDefaultStyleValues.LineStyle);

        callback(jsonShape);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


;

pathvisiojs.data.gpml.node.anchor = function() {
  'use strict';

  // anchors
  // an anchor is an attachment point at which an edge can originate or terminate.
  // It has the following elements:
  // anchor = {
  //  id: unique value for this anchor
  //  graphRef: reference to the pathway element to which the anchor is bound.
  //  side: [top, right, bottom, left] (choose a side. only for anchors attached to nodes, not edges.)
  //  position: percentage of the distance along the specified side of the element or the edge to which the anchor is bound.
  //    For nodes, if the side specified is right or left, the starting point is the topmost point on the side, and
  //    if the side specified is top or bottom, the starting point is the leftmost point on the side (smallest x or y value in SVG coordinate system).
  //  initialEdgeDirection: direction (in degrees) by which the edge emanates from the anchor (only for anchors attached to nodes, not edges)
  // }

  function toPvjson(gpmlParentElement, jsonParentElement, elementType, pathwayIri, callback) {
    var gpmlAnchors, gpmlAnchor, jsonAnchor, elementIri, graphId;
    if (elementType === 'edge') {
      gpmlAnchors = gpmlParentElement.selectAll('Anchor');
      if (gpmlAnchors[0].length > 0) {
        jsonParentElement.Anchor = [];
        gpmlAnchors.each(function() {
          jsonAnchor = {};
          gpmlAnchor = d3.select(this);
          graphId = gpmlAnchor.attr('GraphId') || ('id' + uuid.v4());
          elementIri = 'pathwayIri:' + graphId;
          jsonAnchor['@id'] = elementIri;
          jsonAnchor['@type'] = [
            'node',
            'element',
            'Element',
            'Anchor'
          ];
          jsonAnchor.dependsOn = jsonParentElement['@id'];
          jsonAnchor.anchorPosition = gpmlAnchor.attr('Position');
          if (!!jsonParentElement.stroke) {
            jsonAnchor.backgroundColor = jsonParentElement.stroke;
          }
          jsonAnchor.ShapeType = gpmlAnchor.attr('Shape');
          if (!!jsonAnchor.ShapeType) {
            if (jsonAnchor.ShapeType === 'Circle') {
              jsonAnchor.ShapeType = 'oval';
            }
          }
          else {
            jsonAnchor.ShapeType = 'none';
          }
          jsonParentElement.Anchor.push(jsonAnchor);
        })
        callback(jsonParentElement);
      }
      else {
        callback(jsonParentElement);
      }
    }
    else {
      throw new Error('anchor.toPvjson doesnt know how to handle anything other than edges as parent elements right now. handling other elements needs to be implemented.');
    }
  }

  function getAllFromNode(jsonNode, callback) {
    self.jsonNode = jsonNode;
    var jsonAnchors = [];
    var parentId, renderableType, id, position, x, y, sideOffsetX, sideOffsetY, positionOffsetX, positionOffsetY;
    /*
    var elementSides = [
      {'side': 'top', 'initialEdgeDirection': 90}, 
      {'side': 'right', 'initialEdgeDirection': 0}, 
      {'side': 'bottom', 'initialEdgeDirection': 270}, 
      {'side': 'left', 'initialEdgeDirection': 180} 
    ];
    //*/
    var elementSides = [
      {'side': 'top', 'dx': 0, 'dy': -1}, 
      {'side': 'right', 'dx': 1, 'dy': 0}, 
      {'side': 'bottom', 'dx': 0, 'dy': 1}, 
      {'side': 'left', 'dx': -1, 'dy': 0} 
    ];
    var anchorPositions = [0.25, 0.5, 0.75];

    parentId = jsonNode.id;
    renderableType = 'anchor';

    elementSides.forEach(function(element) {
      sideOffsetX = Math.max(element.dx, 0) * jsonNode.width;
      sideOffsetY = Math.max(element.dy, 0) * jsonNode.height;
      anchorPositions.forEach(function(position) {
        id = String(jsonNode.id) + String(element.side) + String(position);
        positionOffsetX = Math.abs(element.dy) * position * jsonNode.width;
        positionOffsetY = Math.abs(element.dx) * position * jsonNode.height;
        x = jsonNode.x + sideOffsetX + positionOffsetX;
        y = jsonNode.y + sideOffsetY + positionOffsetY;
        jsonAnchors.push({
          'parentId': jsonNode.id,
          'renderableType': 'anchor',
          'side': element.side,
          'dx': element.dx,
          'dy': element.dy,
          'id': id,
          'position': position,
          'x': x,
          'y': y 
        });
      });
    });
    //callback(jsonAnchors);
    return jsonAnchors;
  }

  return {
    toPvjson:toPvjson,
    getAllFromNode:getAllFromNode
  };
}();
;

pathvisiojs.data.gpml.edge = function(){
  'use strict';

  var strokeStyleMappings = {
    'Broken': 'dashed'
  };

  function toPvjson(gpmlEdge, pathwayIri, callback) {
    var jsonAnchorEdge, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef;
    var jsonEdge = {};
    var graphId = gpmlEdge.attr('GraphId') || ('id' + uuid.v4());
    var elementIri = 'pathwayIri:' + graphId;
    jsonEdge['@id'] = elementIri;
    jsonEdge.GraphId = graphId;

    var containingGroupRef = gpmlEdge.attr('GroupRef');
    var isContainedBy;
    var dependsOn = [];
    if (!!containingGroupRef) {
      isContainedBy = jsonEdge.isContainedBy = 'pathwayIri:' + containingGroupRef;
      dependsOn.push(isContainedBy);
    }

    jsonEdge.zIndex = parseFloat(gpmlEdge.select('Graphics').attr('ZOrder'));
    var points = gpmlEdge.selectAll('Point');
    jsonEdge['@type'] = [
      'element',
      'SvgPath',
      'Edge',
      isContainedBy || 'notGrouped'
    ];

    // Graphical Only Data below, except maybe Anchors

    var point, pointObj;
    jsonEdge.Point = [];
    points.each(function() {
      point = d3.select(this);
      pointObj = {};
      var relX = parseFloat(point.attr('RelX'));
      var relY = parseFloat(point.attr('RelY'));
      if ((relX !== null && relX !== undefined) && (relY !== null && relY !== undefined)) {
        pointObj['@type'] = 'SnappedPoint';

        dependsOn.push('pathwayIri:' + point.attr('GraphRef'));

        pointObj.hasReference = 'pathwayIri:' + point.attr('GraphRef');
        pointObj.RelX = relX;
        pointObj.RelY = relY;
        pointObj.x = parseFloat(point.attr('X'));
        pointObj.y = parseFloat(point.attr('Y'));
      }
      else {
        pointObj['@type'] = 'GraphicalPoint';
        pointObj.x = {};
        pointObj.x = parseFloat(point.attr('X'));
        pointObj.y = parseFloat(point.attr('Y'));
      }

      jsonEdge.Point.push(pointObj);
    })

    var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType') || 'Straight';
    jsonEdge.ConnectorType = '' + connectorType;

    var stroke = gpmlEdge.select('Graphics').attr('Color');
    if (!!stroke) {
      jsonEdge['stroke'] = stroke;
    }

    var strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');
    if (!!strokeWidth) {
      jsonEdge['strokeWidth'] = parseFloat(strokeWidth);
    }

    /*
    var jsonAnchorEdges = gpmlEdge.selectAll('Anchor');
    if (jsonAnchorEdges[0].length > 0) {
      jsonEdge.Anchor = [];
      jsonAnchorEdges.each(function() {
        jsonAnchorEdge = {};
        anchor = d3.select(this);
        elementIri = pathwayIri + anchor.attr('GraphId');
        jsonAnchorEdge['@id'] = pathwayIri + anchor.attr('GraphId');
        jsonAnchorEdge['@type'] = [
          'element',
          'Edge',
          'Anchor'
        ];
        jsonAnchorEdge.dependsOn = jsonEdge['@id'];
        jsonAnchorEdge.anchorPosition = anchor.attr('Position');
        jsonEdge.Anchor.push(jsonAnchorEdge);
      })
    }
    //*/

    pathvisiojs.data.gpml.node.anchor.toPvjson(gpmlEdge, jsonEdge, 'edge', pathwayIri, function(jsonEdge) {
      pathvisiojs.data.gpml.element.toPvjson(gpmlEdge, jsonEdge, function(jsonEdge) {
        callback(jsonEdge);
      });
    });
  }

  /*
     function toPvjson(gpmlEdge, jsonEdge, callback) {
     try {
     jsonEdge.id = gpmlEdge.attr('GraphId');
     jsonEdge.renderableType = 'edge';
     var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
     if (!!connectorType) {
     jsonEdge.connectorType = connectorType.toLowerCase();
     }
     else {
     jsonEdge.connectorType = 'straight';
     }

     var attribute;
     var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
     if (!!strokeStyle) {
     jsonEdge.strokeStyle = strokeStyle;
     }
     else {
     attribute = gpmlEdge.select('Attribute'); 
     if (!!attribute[0][0]) {
     console.log(attribute);
     if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
     jsonEdge.strokeStyle = 'double';
     }
     }
     }

     var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
     if (!!stroke) {
     var color = new RGBColor(stroke);
     if (color.ok) {
     jsonEdge.stroke = color.toHex();
     }
     }

     jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

     jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

     var xRef = gpmlEdge.select('Xref');
     if (xRef > 0) {
     if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
     jsonEdge.xRef = xRef;
     }
     }

     var gpmlPoints = gpmlEdge.selectAll('Point');
     self.gpmlPoints = gpmlPoints;
     var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
     if (!!markerStart) {
     jsonEdge.markerStart = markerStart;
     }
     else {
     jsonEdge.markerStart = 'none';
     }
     var lastPointIndex = gpmlPoints[0].length - 1;
     var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
     if (!!markerEnd) {
     jsonEdge.markerEnd = markerEnd;
     }
     else {
     jsonEdge.markerEnd = 'none';
     }

     var jsonPoints = [];
     gpmlPoints.each(function() {
     pathvisiojs.data.gpml.edge.point.toPvjson(d3.select(this), function(jsonPoint) {
     jsonPoints.push(jsonPoint);
     });
     });
jsonEdge.points = jsonPoints;
callback(jsonEdge);
}
catch (e) {
  console.log("Error converting edge to json: " + e.message);
  return e;
}
}
//*/

return {
toPvjson:toPvjson
};
}();
;

pathvisiojs.data.gpml.edge.interaction = function(){
  'use strict';

  //*
  //var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'Activity',
    'TBar':'InhibitoryActivity',
    'mim-catalysis':'Catalysis',
    'mim-inhibition':'Inhibition',
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"NecessaryStimulation",
    "mim-binding":"Binding",
    "mim-conversion":"Conversion",
    "mim-stimulation":"Stimulation",
    "mim-modification":"Modification",
    "mim-cleavage":"Cleavage",
    "mim-covalent-bond":"CovalentBond",
    "mim-transcription-translation":"TranscriptionTranslation",
    "mim-gap":"Gap",
    "Line":"Unspecified"
  };
  //*/

  function getGpmlArrowHeadNameFromSemanticName(semanticName) {
    for (gpmlArrowHeadName in gpmlArrowHeadToSemanticMappings) {
      if (gpmlArrowHeadToSemanticMappings[gpmlArrowHeadName] === semanticName) {
        return gpmlArrowHeadName;
      }
    }

    // if we get to here, there is no GPML ArrowHead name that matches the
    // semantic name. This should probably be in a try, catch, finally block.

    if (!gpmlArrowHeadName) {
      gpmlArrowHeadName = semanticName;
      console.warn('No GPML ArrowHead name found for semantic name "' + semanticName + '". Returning original semantic name as GPML ArrowHead name. PathVisio-Java will delete this ArrowHead from the GPML file if it edits this file.');
    }
    return gpmlArrowHeadName;
  }

  function getSemanticNameFromGpmlArrowHeadName(gpmlArrowHeadName) {
    var semanticName;
    if (!!gpmlArrowHeadName) {
      semanticName = gpmlArrowHeadToSemanticMappings[gpmlArrowHeadName];
      if (!semanticName) {
        semanticName = gpmlArrowHeadName;
        console.warn('No semantic name found for GPML ArrowHead name "' + gpmlArrowHeadName + '". Returning original GPML ArrowHead name as semantic name.');
      }
    }
    else {
      semanticName = 'Unspecified';
    }

    return semanticName;
  }

  function toPvjson(gpml, gpmlInteraction, pathwayIri, callback) {
    var jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef, source, sourceId;
    pathvisiojs.data.gpml.edge.toPvjson(gpmlInteraction, pathwayIri, function(jsonInteraction) {
      //console.log('jsonInteraction');
      //console.log(jsonInteraction);

      jsonInteraction['@type'].push('Interaction');
      jsonInteraction.renderableType = 'Interaction';

      points = gpmlInteraction.selectAll('Point');

      var database, ID, 
      datasourceReference = gpmlInteraction.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database')
        ID = datasourceReference.attr('ID')
        if (!!database && !!ID) {
          jsonInteraction.DatasourceReference = {};
          jsonInteraction.DatasourceReference.Database = database;
          jsonInteraction.DatasourceReference.ID = ID;
        }
      }

      // Arrowheads on both ends of a single graphical Interaction would represent two semantic Interactions

      function buildInteractionGraph(gpmlSource, gpmlTarget, callbackBIG) {
        //console.log('gpmlSource');
        //console.log(gpmlSource);
        //console.log('gpmlTarget');
        //console.log(gpmlTarget);
        var InteractionGraphMember = {};
        interactionType = getSemanticNameFromGpmlArrowHeadName(gpmlTarget.getAttribute('ArrowHead'));
        var interactionTypeExistenceCheck;
        if (!!interactionType) {
          jsonInteraction.InteractionGraph = jsonInteraction.InteractionGraph || [];

          sourceId = gpmlSource.getAttribute('GraphRef');
          if (!!sourceId) {
            source = gpml.querySelector('[GraphId=' + sourceId + ']');
            if (source.tagName === 'Anchor') {
              sourceId = source.parentNode.parentNode.getAttribute('GraphId');
            }
            else {
              if (source.tagName === 'Group') {
                sourceId = source.getAttribute('GroupId');
              }
            }
          }
          InteractionGraphMember['@id'] = pathwayIri + sourceId;

          targetId = gpmlTarget.getAttribute('GraphRef');
          if (!!targetId) {
            target = gpml.querySelector('[GraphId=' + targetId + ']');
            if (target.tagName === 'Anchor') {
              targetId = target.parentNode.parentNode.getAttribute('GraphId');
            }
            else {
              if (target.tagName === 'Group') {
                targetId = target.getAttribute('GroupId');
              }
            }

            InteractionGraphMember.interactsWith = pathwayIri + targetId;
            InteractionGraphMember.interactionType = interactionType;
          }
          interactionTypeExistenceCheck = jsonInteraction['@type'].indexOf(interactionType);
          if (interactionTypeExistenceCheck === -1) {
            jsonInteraction['@type'].push(interactionType);
          }
          else {
            //jsonInteraction['@type'][interactionTypeExistenceCheck] = 'Bidirectional-' + interactionType;
            jsonInteraction['@type'].push('Bidirectional-' + interactionType);
          }

          jsonInteraction.InteractionGraph.push(InteractionGraphMember);
          // TODO add the reaction, if it exists
          //'ex:Anchor': pathwayIri + '#Reaction1'

          callbackBIG(InteractionGraphMember, strcase.paramCase(interactionType));
        }
        else {
          callbackBIG(null, 'unspecified');
        }
      }

      var firstPoint = points[0][0];
      var firstGpmlArrowHeadName = firstPoint.getAttribute('ArrowHead');

      var lastPoint = points[0][points[0].length - 1];
      var lastGpmlArrowHeadName = lastPoint.getAttribute('ArrowHead');

      // first function below has inputs lastPoint, firstPoint because it
      // corresponds to the marker type for the first point


      if (!!firstGpmlArrowHeadName && !!lastGpmlArrowHeadName) {
        buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember, interactionType) {
        });
        buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember, interactionType) {
        });
      }
      else {
        if (!!firstGpmlArrowHeadName || !!lastGpmlArrowHeadName) {
          if (!!firstGpmlArrowHeadName) {
            buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember, interactionType) {
            });
          }

          if (!!lastGpmlArrowHeadName) {
            buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember, interactionType) {
            });
          }
        }
        else {
          lastPoint.setAttribute('ArrowHead', 'Line');
          buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember, interactionType) {
          });
        }
      }

      // TODO this is temporary solution. In the future, we will want to get
      // the marker id from the interactionType at render time.
      if (firstGpmlArrowHeadName) {
        jsonInteraction.markerStart = strcase.paramCase(firstGpmlArrowHeadName);
      }
      else {
        jsonInteraction.markerStart = 'none';
      }

      if (lastGpmlArrowHeadName) {
        jsonInteraction.markerEnd = strcase.paramCase(lastGpmlArrowHeadName);
      }
      else {
        jsonInteraction.markerEnd = 'none';
      }

      callback(jsonInteraction);
    })
  }

  /*
     function toPvjson(gpmlEdge, jsonEdge, callback) {
     try {
     jsonEdge.id = gpmlEdge.attr('GraphId');
     jsonEdge.renderableType = 'edge';
     var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
     if (!!connectorType) {
     jsonEdge.connectorType = connectorType.toLowerCase();
     }
     else {
     jsonEdge.connectorType = 'straight';
     }

     var attribute;
     var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
     if (!!strokeStyle) {
     jsonEdge.strokeStyle = strokeStyle;
     }
     else {
     attribute = gpmlEdge.select('Attribute'); 
     if (!!attribute[0][0]) {
     console.log(attribute);
     if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
     jsonEdge.strokeStyle = 'double';
     }
     }
     }

     var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
     if (!!stroke) {
     var color = new RGBColor(stroke);
     if (color.ok) {
     jsonEdge.stroke = color.toHex();
     }
     }

     jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

     jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

     var xRef = gpmlEdge.select('Xref');
     if (xRef > 0) {
     if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
     jsonEdge.xRef = xRef;
     }
     }

     var gpmlPoints = gpmlEdge.selectAll('Point');
     self.gpmlPoints = gpmlPoints;
     var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
     if (!!markerStart) {
     jsonEdge.markerStart = markerStart;
     }
     else {
     jsonEdge.markerStart = 'none';
     }
     var lastPointIndex = gpmlPoints[0].length - 1;
     var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
     if (!!markerEnd) {
     jsonEdge.markerEnd = markerEnd;
     }
     else {
     jsonEdge.markerEnd = 'none';
     }

     var jsonPoints = [];
     gpmlPoints.each(function() {
     pathvisiojs.data.gpml.edge.point.toPvjson(d3.select(this), function(jsonPoint) {
     jsonPoints.push(jsonPoint);
     });
     });
jsonEdge.points = jsonPoints;
callback(jsonEdge);
}
catch (e) {
  console.log("Error converting edge to json: " + e.message);
  return e;
}
}
//*/

return {
  toPvjson:toPvjson,
  getGpmlArrowHeadNameFromSemanticName:getGpmlArrowHeadNameFromSemanticName,
  getSemanticNameFromGpmlArrowHeadName:getSemanticNameFromGpmlArrowHeadName
};
}();
;

pathvisiojs.data.gpml.edge.graphicalLine = function(){
  'use strict';

  //*
  //var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'arrow'
  };
  //*/

  function toPvjson(gpml, gpmlGraphicalLine, pathwayIri, callback) {
    var jsonAnchorGraphicalLine, anchor, jsonAnchor, points, jsonPoints, graphicalLineType, target, targetId, groupRef;
    pathvisiojs.data.gpml.edge.toPvjson(gpmlGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
      //console.log('jsonGraphicalLine');
      //console.log(jsonGraphicalLine);

      jsonGraphicalLine['@type'].push('GraphicalLine');
      jsonGraphicalLine.renderableType = 'GraphicalLine';

      points = gpmlGraphicalLine.selectAll('Point');

      var firstPoint = points[0][0];
      if (!!firstPoint.getAttribute('ArrowHead')) {
        jsonGraphicalLine.markerStart = strcase.paramCase(firstPoint.getAttribute('ArrowHead'));
      }
      else {
        jsonGraphicalLine.markerStart = 'none';
      }

      var lastPoint = points[0][points[0].length - 1];
      if (!!lastPoint.getAttribute('ArrowHead')) {
        jsonGraphicalLine.markerEnd = strcase.paramCase(lastPoint.getAttribute('ArrowHead'));
      }
      else {
        console.log('markerEnd = none');
        jsonGraphicalLine.markerEnd = 'none';
      }

      jsonGraphicalLine.ConnectorType = (gpmlGraphicalLine.select('Graphics').attr('ConnectorType')); 
      if (!jsonGraphicalLine.ConnectorType) {
	jsonGraphicalLine.ConnectorType = 'Straight';
      }

      callback(jsonGraphicalLine);
    })
  }

  /*
  function toPvjson(gpmlEdge, jsonEdge, callback) {
    try {
      jsonEdge.id = gpmlEdge.attr('GraphId');
      jsonEdge.renderableType = 'edge';
      var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
      if (!!connectorType) {
        jsonEdge.connectorType = connectorType.toLowerCase();
      }
      else {
        jsonEdge.connectorType = 'straight';
      }

      var attribute;
      var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
      if (!!strokeStyle) {
        jsonEdge.strokeStyle = strokeStyle;
      }
      else {
        attribute = gpmlEdge.select('Attribute'); 
        if (!!attribute[0][0]) {
        console.log(attribute);
          if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
            jsonEdge.strokeStyle = 'double';
          }
        }
      }

      var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
      if (!!stroke) {
        var color = new RGBColor(stroke);
        if (color.ok) {
          jsonEdge.stroke = color.toHex();
        }
      }

      jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

      jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

      var xRef = gpmlEdge.select('Xref');
      if (xRef > 0) {
        if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
          jsonEdge.xRef = xRef;
        }
      }

      var gpmlPoints = gpmlEdge.selectAll('Point');
      self.gpmlPoints = gpmlPoints;
      var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
      if (!!markerStart) {
        jsonEdge.markerStart = markerStart;
      }
      else {
        jsonEdge.markerStart = 'none';
      }
      var lastPointIndex = gpmlPoints[0].length - 1;
      var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
      if (!!markerEnd) {
        jsonEdge.markerEnd = markerEnd;
      }
      else {
        jsonEdge.markerEnd = 'none';
      }

      var jsonPoints = [];
      gpmlPoints.each(function() {
        pathvisiojs.data.gpml.edge.point.toPvjson(d3.select(this), function(jsonPoint) {
          jsonPoints.push(jsonPoint);
        });
      });
      jsonEdge.points = jsonPoints;
      callback(jsonEdge);
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    }
  }
  //*/

  return {
    toPvjson:toPvjson
  };
}();
;

pathvisiojs.data.gpml.edge.point = function(){
  'use strict';

  var gpmlRelXToJsonSideAndPositionMapping = { 
    '-1.0': {'side': 'left'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'right'}
  };

  var gpmlRelYToJsonSideAndPositionMapping = { 
    '-1.0': {'side': 'top'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'bottom'}
  };

  function toPvjson(gpmlPoint, callback) {
    var jsonPoint = {};
    try {
      jsonPoint.x = parseFloat(gpmlPoint.attr('X'));
      jsonPoint.y = parseFloat(gpmlPoint.attr('Y'));

      var relX = String(gpmlPoint.attr('RelX'));
      var relY = String(gpmlPoint.attr('RelY'));

      var side;
      var position;
      if (!!relX && !!relY && relX != 'null' && relY != 'null') {
        if (relX == '0.0' && relY == '0.0') {
          jsonPoint.anchorId = gpmlPoint.attr('GraphRef');
        }
        else {
          side = gpmlRelXToJsonSideAndPositionMapping[relX].side !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].side : gpmlRelYToJsonSideAndPositionMapping[relY].side;
          position = gpmlRelXToJsonSideAndPositionMapping[relX].position !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].position : gpmlRelYToJsonSideAndPositionMapping[relY].position;
          jsonPoint.anchorId = String(gpmlPoint.attr('GraphRef')) + String(side) + String(position);
        }
      }

      callback(jsonPoint);
    }
    catch (e) {
      console.log("Error converting point to json: " + e.message);
      return e;
    }
  }

  function convertGpmlPositionToJsonPosition(relX, relY) {
  }

  return {
    toPvjson:toPvjson
  };
}();
;

pathvisiojs.view = pathvisiojs.view || {};

     
;

pathvisiojs.view.annotation = function(){
  'use strict';
  function render(annotationData) {
    self.annotationData = annotationData;
    var annotation = d3.select("#annotation")
    .data([annotationData]);
 
    //Special drag code to update absolute position of annotation panel
    var dragAbs = d3.behavior.drag()
    .on("drag", function(d,i){
	var dright = parseInt(annotation.style("right"));
	var dtop = parseInt(annotation.style("top"));
	dright-=d3.event.dx;
	dtop+=d3.event.dy;
	annotation.style("right", dright+"px");
	annotation.style("top", dtop+"px");
    });


    var annotationHeaderText = annotation.select('#annotation-header-text')
    .text(function(d) { return d.header; });

    var detailsSearchUri = annotation.select('#annotation-header-search').select('a')
    .attr('href', function(d) {
    	return pathvisiojs.config.pathwaySearchUriStub + d.header;
     })
     .attr('title', function(d) {return 'Search for pathways containing ' + d.header; });

    var annotationIconMove = annotation.select('i.icon-move')
    .on("mousedown", function(d, i){
	//add dragAbs function when icon is pressed
       	annotation.call(dragAbs);
    })
    .on("mouseup", function(d, i){
	//nullify dragAbs when icon is released; simulates drag behaviour via icon
       	annotation.on('mousedown.drag', null);
    });

    var annotationIconRemove = annotation.select('i.icon-remove')
    .on("click", function(d, i){
      annotation[0][0].style.visibility = 'hidden';
    });

    var annotationDescription = annotation.select('#annotation-description')
    .text(function(d) { return d.description; });

    var annotationListItemsContainer = annotation.selectAll('#annotation-items-container')
    .data(function(d) {
      //if a single string, then check for special case: img src for loading gif
      if (typeof d.listItems[0] === 'string'){
       if (d.listItems[0].split('.').pop() == 'gif'){
	annotationDescription.append('br');
	annotationDescription.append('br');
	annotationDescription.append('img').attr('src', d.listItems[0]).attr('style', 'width: 20px');
       } else { //display the custom text
	annotationDescription.append('p').html('<font color="red">'+d.listItems[0]+'</font>');
       }
        //fake item list that effectively clears the display while loading gif is active
        return [{"key":"clear","values":[{"clear": "clear"}]}];
      } else {
      //debug//console.log([d.listItems]);
      return [d.listItems];
      }	
    });

    //debug//console.log(annotationListItemsContainer);

    // Update
    var annotationListItems = annotationListItemsContainer.selectAll('li')
    .data(function(d) {
      //debug//console.log('d annotationListItems');
      //debug//console.log(d);
      return d;
    });

    // Enter
    annotationListItems.enter().append('li');

    // Exit…
    annotationListItems.exit().remove();

    var annotationItemTitles = annotationListItems.selectAll('.annotation-item-title')
    .data(function(d) {
      //debug//console.log('d annotationListItems');
      //debug//console.log(d);
      return [d.key];
    })
    .text(function(d) {return d + ': ';});
    //Enter
    annotationItemTitles
    .enter().append('span')
    .attr('class', 'annotation-item-title')
    .text(function(d) {return d + ': ';});
    //Exit
    annotationItemTitles.exit().remove();

    // Update
    var annotationItemPlainTextElements = annotationListItems.selectAll('span.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (!element.hasOwnProperty('uri')) {
          //debug//console.log('annotationItemPlainTextElement');
          //debug//console.log(element);
          return element; 
        }
      });
    })
    .text(function(d) { return ' ' + d.text; });
    // Enter
    annotationItemPlainTextElements.enter()
    .append('span')
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });
    // Exit
    annotationItemPlainTextElements.exit().remove();

    // Update
    var annotationItemLinkedTextElements = annotationListItems.selectAll('a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          return element; 
        }
      }); 
    })
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; });
    // Enter
    annotationItemLinkedTextElements.enter()
    .append('a')
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; });
    // Exit
    annotationItemLinkedTextElements.exit().remove();
    
    annotation[0][0].style.visibility = 'visible';
  }
      
  return {
    render:render
  };
}();
;

pathvisiojs.view.annotation.citation = function(){
  'use strict';
    function render(organism, node) {
    }

    return {
      render:render
    };
}();
;

pathvisiojs.view.annotation.xRef = function(){
  'use strict';
  var cachedAnnotationData = {};

  function render(organism, id, datasource, label, desc) {
    var data = getCachedAnnotationData(organism, label, id, datasource);
    if (data){
      //if cache, then use it
      pathvisiojs.view.annotation.render(data);
    }
    else {
      //else render immediate data and loading gif
      var data = {
        "header": label,
        "description": desc,
        "listItems":[pathvisiojs.config.diagramLoadingIconUri] 
      };
      pathvisiojs.view.annotation.render(data);

      //console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      //then retrieve the bridgedb data
      var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
        setCachedAnnotationData(organism, label, id, datasource, annotationData);
        pathvisiojs.view.annotation.render(annotationData);
      });
    }
  }

  function getCachedAnnotationData(organism, label, id, datasource){
    return cachedAnnotationData[organism+label+id+datasource];
  }

  function setCachedAnnotationData(organism, label, id, datasource, data){
    cachedAnnotationData[organism+label+id+datasource] = data;
  }

  return {
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram = function(){
  'use strict';

  // currently just using Gecko (Firefox) list of supported image formats for the HTML img tag:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img
  // TODO decide what to do if the user specifies an SVG image as a dataSource element

  // the viewMethods are sorted in order of preference - viewMethod with lower index will be used if more than one is returned.
  var sourceDataFileTypeToViewMethodMappings = {
    gpml:[
      'svg' //in the future, could add canvas support
    ],
    biopax:[ //biopax is not currently supported
      'svg' //in the future, could add canvas support
    ],
    pdf:[
      'pdf' //not supported now. this would be future. we might use pdf.js or we could just try using an embed or object tag.
    ],
    png:[
      'img'
    ],
    jpg:[
      'img'
    ],
    jpeg:[
      'img'
    ],
    jpe:[
      'img'
    ],
    jif:[
      'img'
    ],
    jfif:[
      'img'
    ],
    jfi:[
      'img'
    ],
    gif:[
      'img'
    ],
    ico:[
      'img'
    ],
    bmp:[
      'img'
    ],
    dib:[
      'img'
    ]
  };

  function getFirstRenderableSourceDataElement(sourceData) {
    var sourceDataElement, viewMethodsForSourceDataFileType, supportedViewMethodsForSourceDataFileType,
      results = {},
      supportedViewMethods = getSupportedViewMethods();

    var i = 0;
    do {
      sourceDataElement = sourceData[i];
      viewMethodsForSourceDataFileType = sourceDataFileTypeToViewMethodMappings[sourceDataElement.fileType];
      supportedViewMethodsForSourceDataFileType = pathvisiojs.utilities.intersect(viewMethodsForSourceDataFileType, supportedViewMethods);
      i += 1;
    } while ((supportedViewMethodsForSourceDataFileType.length < 1) && (i < sourceData.length + 1));

    sourceDataElement.selectedViewMethod = supportedViewMethodsForSourceDataFileType[0];
    return sourceDataElement;
  }

  //function getImageFormatByDataSourceFileType(fileType) {
  //this is testing the browser the user is currently using 
  function getSupportedViewMethods() {
    //making an assumption that all browsers we care about support the HTML img tag

    var supportedViewMethods = ['img'];

    // TODO support svg that is not inline in the svg viewMethod
    // The IE9 detection is a temporary hack. It is used because IE9 cannot currently convert GPML to pvjson,
    // so it cannot display the resulting SVG.
    // TODO get gpml to pvjson conversion working with IE9
    if (Modernizr.inlinesvg) {
    //if (Modernizr.inlinesvg && (!pathvisiojs.utilities.isIE())) {
    //if (Modernizr.inlinesvg && (pathvisiojs.utilities.isIE() !== 9)) {
      supportedViewMethods.push('svg');
    }
    
    return supportedViewMethods;
  }

  function loadHtmlTemplate(userSpecifiedContainer, callback) {
    userSpecifiedContainer.html(pathvisioNS['tmp/pathvisiojs.html']);
    var diagramContainer = userSpecifiedContainer.select('#diagram-container');
    callback(diagramContainer);
  }

  function load(args) {
    // this function gets a reference to a GPML file and draws a visual representation of the pathway
    // TODO Much of the SVG creation code should be moved to ./svg/svg.js so we just call
    // pathvisiojs.view.pathwayDiagram.svg.load() in the same way as we do for
    // pathvisiojs.view.pathwayDiagram.img.load()

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    var userSpecifiedContainerSelector = args.container,
      sourceData = args.sourceData,
      fitToContainer = args.fitToContainer,
      cssUri = args.cssUri,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      highlightNodes = args.highlightNodes,
      hiddenElements = args.hiddenElements,
      userSpecifiedContainer, // the element matching the user-specified selector. the user specified selector is the parameter "container" in the pathvisiojs.load() method.
      pathvisioJsContainer,
      diagramContainer;

    if (!sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    if (!userSpecifiedContainerSelector) {
      throw new Error('No container selector specified as container for pathvisiojs.');
    }

    userSpecifiedContainer = d3.select(userSpecifiedContainerSelector);
    if (userSpecifiedContainer.length !== 1) {
      throw new Error('Container selector must be matched by exactly one element.');
    }

    // waterfall means that each function completes in order, passing its result to the next
    async.waterfall([
      function(callback){ // this could be in parallel
        // ********************************************
        // Load HTML template
        // ********************************************
        var htmlTemplate = loadHtmlTemplate(userSpecifiedContainer, function(thisPathwayContainer) {
          diagramContainer = thisPathwayContainer;
          callback(null);
        });
      },
      function(callback){
        // ********************************************
        // Add loading gif
        // ********************************************
        var diagramLoadingIconUri = pathvisiojs.config.diagramLoadingIconUri;
        var img = diagramContainer.append('img')
        .attr('id', 'loading-icon')
        .attr('src', diagramLoadingIconUri)
        .attr('width', 50);

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************
        var renderableSourceDataElement = getFirstRenderableSourceDataElement(sourceData);

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************
        var boundingClientRect = userSpecifiedContainer[0][0].getBoundingClientRect();
        var containerWidth = boundingClientRect.width - 3; //account for space for pan/zoom controls,
        var containerHeight = boundingClientRect.height - 3; //account for space for search field;

        callback(null, containerWidth, containerHeight, renderableSourceDataElement);
      },
      function(containerWidth, containerHeight, renderableSourceDataElement, callback){
        var svg, pathway,
        loadDiagramArgs = {};
        loadDiagramArgs.container = diagramContainer;
        loadDiagramArgs.renderableSourceDataElement = renderableSourceDataElement;
        loadDiagramArgs.containerWidth = containerWidth;
        loadDiagramArgs.containerHeight = containerHeight;
        loadDiagramArgs.fitToContainer = fitToContainer;

        // ********************************************
        // Check for SVG support. If false, use static image (png, jpg, gif, etc.) fallback
        // ********************************************
        if (renderableSourceDataElement.selectedViewMethod === 'svg') { // TODO get this working in IE9
          loadDiagramArgs.cssUri = cssUri;
          loadDiagramArgs.customMarkers = customMarkers;
          //loadDiagramArgs.customSymbols = customSymbols;
          //*
          pathvisiojs.view.pathwayDiagram.svg.load(loadDiagramArgs, function(diagram) {
            if (!!diagram) {
              callback(null, diagram);
            }
            else {
              // TODO refactor this to not just assume PNG will be available as fallback
              loadDiagramArgs.renderableSourceDataElement = sourceData[1];
              pathvisiojs.view.pathwayDiagram.img.load(loadDiagramArgs, function(diagram) {
                callback(null, diagram);
              });
            }
          });
          //*/
        }
        else {
          pathvisiojs.view.pathwayDiagram.img.load(loadDiagramArgs, function(diagram) {
            callback(null, diagram);
          });
        }
      },
      function(diagram, callback){
        // ********************************************
        // Remove loading icon
        // ********************************************
        diagramContainer.select('#loading-icon').remove();

        // adding this as a signal for e2e tests that the diagram has finished loading 
        // TODO refactor tests so they don't need this hack.
        d3.select('body').append('span')
        .attr('id', 'pathvisiojs-is-loaded');
        //console.log('Pathvisiojs done loading.');
        callback(null);
      }
    ]);
  }

  return{
    load:load
  };
}();

     
;

pathvisiojs.view.pathwayDiagram.svg = function(){
  'use strict';

  var svg, shapesAvailable, markersAvailable, contextLevelInput,
    renderableTypeToSvgElementMappings = {
      entityNode: 'g',
      groupNode: 'g',
      interaction: 'path',
      graphicalLine: 'path'
    };

  //calculates the proper scaling and translations to fit content (i.e., diagram) to screen (i.e., viewport)
  function fitAndCenterDiagramWithinViewport(viewport, viewportWidth, viewportHeight, diagramWidth, diagramHeight) {
    // viewport is a d3 selection

    var fitScreenScale = Math.min(viewportWidth/diagramWidth, viewportHeight/diagramHeight);
    var diagramWidthScaled = fitScreenScale * diagramWidth;
    var diagramHeightScaled = fitScreenScale * diagramHeight;

    var xTranslation = viewportWidth/2 - diagramWidthScaled/2 + 10; //plus margin-left
    var yTranslation = viewportHeight/2 - diagramHeightScaled/2 + 20; //plus margin-top

    var translationMatrixString = 'matrix(' + fitScreenScale + ', 0, 0, ' + fitScreenScale + ', ' + xTranslation + ', ' + yTranslation + ') ';
    
    viewport.attr("transform", translationMatrixString);
  }

  function load(args, callbackOutside) {
    var diagramContainer = args.container, //a d3 selection corresponding to the containing element in the parent document
      containerWidth = args.containerWidth,
      containerHeight = args.containerHeight,
      cssUri = args.cssUri,
      renderableSourceDataElement = args.renderableSourceDataElement,
      fitToContainer = args.fitToContainer,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      pathway,
      diagramContainer,
      svg;


    async.waterfall([
      function(callback){
        async.parallel({
          preloadSvg: function(callback) {
            var preloadDiagramArgs = {};
              preloadDiagramArgs.container = diagramContainer;
              preloadDiagramArgs.customMarkers = customMarkers,
              //preloadDiagramArgs.customSymbols = customSymbols,
              preloadDiagramArgs.cssUri = cssUri;

            pathvisiojs.view.pathwayDiagram.svg.loadPartials(preloadDiagramArgs, function(svgTemplate) {
              svg = svgTemplate;

              if (!svg) {
                throw new Error("Could not load SVG template.");
              }

              callback(null);
            });
          },
          pathway: function(callback){
            pathvisiojs.data.pvjson.get(renderableSourceDataElement, function(json) {
              pathvisiojs.context = json['@context'];

              if (!json || json === 'fail') {
                callbackOutside(null);
                throw new Error("Could not convert input source data to pathvisioJsJson.");
              }

              //console.log('json');
              //console.log(json);
              pathway = json;
              callback(null, json);
            })
          }
        },
        function(err, results){
          //TODO get pathwayWidth and Height

          callback(null);
        })
      },
      function(callback){
        pathvisiojs.view.pathwayDiagram.svg.renderWithCachedData(svg, pathway, function() {
          callback(null);
        })
      },
      function(callback) {
        var viewport = svg.select('#viewport');

        /* not all containers will have a width or height style attribute. this is now done using the same logic
         * but uses boundingClientRect() instead. the code is located in pathway-diagram.js
        var container = d3.select('body').select('#diagram-container');
        var containerWidth = parseInt(container.style("width")) - 40; //account for space for pan/zoom controls
        var containerHeight = parseInt(container.style("height")) -20; //account for space for search field
        //*/
        var fitScreenScale;
        if (fitToContainer) {
          fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
        }

        var fitToScreen = d3.select('body').select('#fit-to-screen-control');
        fitToScreen.on("click", function(d,i){
          fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
        });

        var fullscreen = d3.select('body').select('#fullscreen-control');
        fullscreen.on("click", function(d,i){
          var pvjs = document.getElementById("pathvisiojs-dev").innerHTML;
          var newwin = window.open('','','width=800,height=600');
          var doc = newwin.document;
          doc.open();
          doc.write(pvjs);
          doc.close();	
        });

        svgPanZoom.init({
          //'root': 'svg', //Alex, what is this line for? It doesn't appear to be doing anything and might be intended to be doing what the line below that I added is doing.
          'selector': 'svg',
          'zoomEnabled': false,
          'minZoom': '0.1',
          'maxZoom': '8.0',
        });

        var svgInFocus = false;
        svg.on("click", function(d, i){
          svgPanZoom.enableZoom();
          svgInFocus = true;
        })
        .on("mouseenter", function(d, i){
          if (svgInFocus) {
            svgPanZoom.enableZoom();
          }
        })
        .on("mouseleave", function(d, i){
          if (svgInFocus) {
            svgPanZoom.disableZoom();
            svgInFocus = false;
          }
        });
        callback(null);
      },
      function(callback){
        //* Node Highlighter

        var nodeLabels, nodeLabel;
        if (!!pathway) {
          nodeLabels = [];
          if (pathway.hasOwnProperty('DataNode')) {
            pathway.DataNode.forEach(function(node) {
              if (!!node.text) {
                nodeLabels.push(node.text.line[0]);
              }
            });

            // see http://twitter.github.io/typeahead.js/

            $('#highlight-by-label-input').typeahead({
              name: 'Highlight node in pathway',
              local: nodeLabels,
              limit: 10
            });
          }

          /*
             $('.icon-eye-open').click(function(){
             var nodeLabel = $("#highlight-by-label-input").val();
             if (!nodeLabel) {
             console.warn('Error: No data node value entered.');
             }
             else {
             pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(svg, nodeLabel);
             }
             });
          //*/
          // see http://api.jquery.com/bind/
          // TODO get selected value better and make function to handle

          $( "#highlight-by-label-input" ).bind("typeahead:selected", function() {
            nodeLabel = $("#highlight-by-label-input").val();
            if (!nodeLabel) {
              throw new Error("No data node value entered for type-ahead node highlighter.");
            }
            else {

              // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
              // a highlighter for svg, png, etc. as appropriate.

              pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(svg, pathway, nodeLabel);
            }
          });
          callback(null, 'svg loaded');
        }
      }
    ],
    function(err, results) {
      callbackOutside(svg);
    });
  }

  function loadPartials(args, callbackOutside) {
    var diagramContainer = args.container,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      cssUri = args.cssUri;

    async.series([
      function(callback) {
        diagramContainer.html(pathvisioNS['tmp/pathvisiojs.svg']);

        svg = diagramContainer.select('#pathvisiojs-diagram')
        svg.attr('style', 'display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; ') // TODO this should be moved to the CSS file
        .attr('preserveAspectRatio', 'xMidYMid');

        callback(null);
      },
      function(callback) {
        if (!!args.customMarkers) {
          pathvisiojs.view.pathwayDiagram.svg.edge.marker.loadAllCustom(svg, customMarkers, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      /*
      function(callback) {
        if (!!args.customSymbols) {
          pathvisiojs.view.pathwayDiagram.svg.symbol.loadAllCustom(svg, customSymbols, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      //*/      
      function(callback) {
        if (!!cssUri) {
          d3.text(cssUri, 'text/css', function(data) {
            var defs = svg.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callback(null);
          })
        }
        else {
          callback(null);
        }
      }
    ],
    function(err, results) {
      callbackOutside(svg);
    });
  }

  // this function does not render all elements. Rather, it renders
  // one or more selected elements that are given as inputs.
  // If one or more of these elements are a groupNode that contains
  // other elements, this function will call itself back to render
  // the elements within the groupNode.
  function appendElementsInDomOrder(args, callback){
    var svg = args.svg,
      data = args.data,
      pathway = args.pathway,
      viewport = args.container,
      container;

    if (!viewport) {
      throw new Error("No viewport specified.");
    }
    if (!data) {
      throw new Error("No data entered to render.");
    }
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No pathway specified.");
    } 
    data = pathvisiojs.utilities.convertToArray(data);

    var i = 0;
    async.each(data, function(item, callbackInside) {
      if (item.key !== 'undefined') {
        container = viewport.select('#' + strcase.paramCase(item.key));
      }
      else {
        container = viewport;
      }

      container.selectAll('.element')
      .data(item.values)
      .enter()
      .append(function(d) {
        var childElementName = renderableTypeToSvgElementMappings[strcase.camelCase(d.renderableType)];
        var child = document.createElementNS('http://www.w3.org/2000/svg', childElementName);
        return child;
      })
      .attr("id", function (d) {
        return strcase.paramCase(d['@id']);
      })
      .attr('class', 'element');
      i += 1;

      callbackInside(null);
    },
    function(err){
      callback(null, 'Successfully rendered elements');
    });
  }

  // this function does not render all elements. Rather, it renders
  // one or more selected elements that are given as inputs.
  // If one or more of these elements are a groupNode that contains
  // other elements, this function will call itself back to render
  // the elements within the groupNode.
  function updateElementProperties(args, callback){
    var svg = args.svg,
      data = args.data,
      pathway = args.pathway,
      container = args.container;

    if (!container) {
      throw new Error("No container specified.");
    }
    if (!data) {
      throw new Error("No data entered to render.");
    }
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No pathway specified.");
    } 
    data = pathvisiojs.utilities.convertToArray(data);

    var renderingArgs = args;
    data.forEach(function(dataElement) {
      renderingArgs.data = dataElement;
      renderingArgs.element = d3.select('#' + strcase.paramCase(dataElement['@id']));
      if (dataElement.renderableType === 'GraphicalLine') {                                                                                        
        pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);                                                          
      } 
else if (dataElement.renderableType === 'Interaction') {
        pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
      } 
      else if (dataElement.renderableType === 'GroupNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
          // TODO this used to render the group contents, but now the callback does nothing
        });
      }
      else if (dataElement.renderableType === 'EntityNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
      }
    });
    callback(null, 'Successfully rendered elements');
  }

  function renderWithCachedData(svg, pathway, callback){
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No data entered to render.");
    }

    var viewport = svg.select('#viewport');

    pathvisiojs.view.pathwayDiagram.svg.infoBox.render(viewport, pathway);

    var renderArgs = {};
    renderArgs.svg = svg;
    renderArgs.container = viewport;
    renderArgs.pathway = pathway;

    async.waterfall([
      function(callbackInside){
        // create the required elements and their ids in DOM order,
        // without specifying width, height, etc.
        renderArgs.data = pathway.pathwayNestedByGrouping;
        appendElementsInDomOrder(renderArgs, function() {
          callbackInside(null, svg);
        });
      },
      function(svg, callbackInside){
        //TODO for the non-cached version, this should sort the elements by dependency, so that group contents are updated before their containing group,
        //and an edge is updated before any edges that rely on it.
        // this would be using something like pathway.pathwayElementsNestedByDependency
        renderArgs.data = pathway.elements;
        updateElementProperties(renderArgs, function() {
          callback(svg);
        });
      }
    ]);
  }


      //pathvisiojs.view.pathwayDiagram.svg.grid.render(svg);

      /*
      async.series([
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.groupData;
          appendElementsInDomOrder(args, function() {
            console.log(1);
          });
          callbackInside2(null, svg);
        },
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.notGroupedData;
          self.args = args;
          appendElementsInDomOrder(args, function() {
            console.log(2);
            callbackInside2(null, svg);
          });
        }
      ],
      function(err, results) {
        callback(svg);
      })
    })
  }
  //*/
  /*
  function render(args, callback){
    if (!args.svg) {
      throw new Error("No svg specified.");
    }
    if (!args.pathway) {
      throw new Error("No data entered to render.");
    }

    async.parallel({
      'hierarchicalData': function(callbackInside) {
        var frame = {
          '@context': pathway['@context'],
          '@type': 'element'
        };  
        jsonld.frame(args.pathway, frame, function(err, hierarchicalData) {
          callbackInside(null, hierarchicalData);
        });
      },
      'groupData': function(callbackInside) {
        var frame = {
          '@context': pathway['@context'],
          '@type': 'GroupNode'
        };  
        jsonld.frame(args.pathway, frame, function(err, groupData) {
          callbackInside(null, groupData);
        });
      },
      'grid': function(callbackInside) {
        pathvisioNS.grid = {};
        var frame = {
          '@context': pathway['@context'],
          '@type': 'EntityNode'
        };  
        jsonld.frame(args.pathway, frame, function(err, framedData) {
          pathvisiojs.view.pathwayDiagram.pathFinder.generateGridData(framedData['@graph'], args.pathway.image.width, args.pathway.image.height, function() {
            callbackInside(null);
          });
        });
      },
      'topLevelData': function(callbackInside) {
        var inputTopLevel = pathvisiojs.utilities.clone(args.pathway);
        inputTopLevel['@context'] = contextLevelInput;
        var topLevelFrame = {
          "@context": contextLevelInput,
          "@type":"element",
          "dependsOn": {}        
        };
        jsonld.frame(inputTopLevel, topLevelFrame, function(err, framedDataTopLevel) {
          var topLevelData = [];
          framedDataTopLevel['@graph'].forEach(function(element) {
            if (!element.dependsOn) {
              topLevelData.push(element['@id']);
            }
          });
          callbackInside(null, topLevelData);
        });
      }
    },
    function(err, results) {
      var resultsData = results.hierarchicalData['@graph'].filter(function(element) {
        return (results.topLevelData.indexOf(element['@id']) > -1);
      });
    })
  }
  //*/

  return {
    //render:render,
    renderWithCachedData:renderWithCachedData,
    appendElementsInDomOrder:appendElementsInDomOrder,
    load:load,
    loadPartials:loadPartials
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.infoBox = function(){
  'use strict';
    
  function render(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing input parameters.');
    }

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathway.hasOwnProperty('Name')) {
      infoBox.push({'key':'Title', 'value':pathway.Name});
    }

    if (pathway.hasOwnProperty('License')) {
      infoBox.push({'key':'Availability', 'value':pathway.License});
    }

    if (pathway.hasOwnProperty('LastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathway.LastModified});
    }

    if (pathway.hasOwnProperty('Organism')) {
      infoBox.push({'key':'Organism', 'value':pathway.Organism});
    }

    /*
    if (pathway.hasOwnProperty('PublicationXref')) {
      pathvisiojs.view.pathwayDiagram.svg.publicationXref.getPublicationXrefString(pathway, pathway.PublicationXref, function(publicationXrefString) {
        infoBox.push({'key':'Citation(s)', 'value':publicationXrefString});
      })
    }
    //*/

    var infoBox = viewport.selectAll("g.info-box")
    .data([infoBox])
    .enter()
    .append("g")
    .attr("id", function (d,i) {return "info-box-" + i; })
    .attr("class", "text-area info-box");

    var infoBoxItems = infoBox.selectAll("text")
    .data(function(d) {return d;})
    .enter()
    .append("text")
    .attr("id", function (d,i) {return "info-box-text" + i; })
    .attr("class", "item")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    var infoBoxPropertyName = infoBoxItems.append("tspan")
    .attr("class", "info-box-item-property-name")
    .text(function (d) {return d.key + ': ';});

    var infoBoxProperty = infoBoxItems.append("tspan")
    .attr("class", "info-box-item-property-value")
    .text(function (d) {return d.value;});
  }

  return {
    render:render
  };
}();
;

// This class is for SVG Symbols. Note that SVG Use Elements display instances SVG Symbols,
// but SVG Symbols are never visible on their own.
// See also: ./node/use-element.js


pathvisiojs.view.pathwayDiagram.svg.symbol = function(){
  'use strict';

  // a hack because I don't know how to pass the svg variable to the function appendCustom() when it's part of async.each().
  // TODO refactor
  var svg;

  var semanticNameToIdMapping = { 
    'datanode':'shape-library-symbols-rectangle-svg',
  };

  function appendCustom(uniqueSymbolShapeUri, callback) {
    var img, width, height, imgChildren;
    var dimensions = null;

    var symbolId = strcase.paramCase(uniqueSymbolShapeUri)
    var defsSection = svg.select('defs');
    var symbol = defsSection.select('#' + symbolId);
    if (!symbol[0][0]) {
      symbol = defsSection.append('symbol')
      .attr('id', symbolId)
      .attr('preserveAspectRatio', 'none');
    }
    else {
      symbol.selectAll('*').remove();
    }

    // ignoring non-svg symbols for now
    if (1===1) {
    //if (symbolType === 'svg') {
      d3.xml(uniqueSymbolShapeUri, "image/svg+xml", function(svgXml) {
        img = d3.select(svgXml.documentElement)
        width = img.attr('width');
        height = img.attr('height');
        symbol.attr('viewBox', '0 0 ' + width + ' ' + height);
        imgChildren = img[0][0].children;
        do {
          symbol[0][0].appendChild(imgChildren[0]);
        } while (imgChildren.length > 0);
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = uniqueSymbolShapeUri;
      img.onload = function() {
        symbol.attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        dimensions = symbol.attr('viewBox').split(' ');
        symbol.append('image').attr('xlink:xlink:href', uniqueSymbolShapeUri)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");
        callback(null);
      }
    }
  }

  function loadAllCustom(thisSvg, customSymbols, callback) {
    svg = thisSvg;

    var uniqueSymbolShapeUris = [];
    customSymbols.forEach(function(customSymbol){
      semanticNameToIdMapping[customSymbol.semanticName] = strcase.paramCase(customSymbol.uri);
      if (uniqueSymbolShapeUris.indexOf(customSymbol.uri) === -1) {
        uniqueSymbolShapeUris.push(customSymbol.uri);
      }
    });

    async.each(uniqueSymbolShapeUris, appendCustom, function(err){
      // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function getAllSymbolNames(svg, callback) {
    var allSymbolNames = svg.selectAll('symbol')[0].map(function(symbol) {
      return strcase.paramCase(symbol.id);
    })
    callback(allSymbolNames);
  }

  return {
    loadAllCustom:loadAllCustom,
    semanticNameToIdMapping:semanticNameToIdMapping,
    getAllSymbolNames:getAllSymbolNames
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.publicationXref = function(){
  'use strict';

  function getReferenceNumberForDisplay(pathway, rdfId) {
    var displayNumberForDisplay = null;
    var i = -1;
    var currentPublicationXref;
    var found = false;

    do {
      i += 1;
      currentPublicationXref = pathway.Biopax.PublicationXref[i];
      if (typeof currentPublicationXref != 'undefined'){
        if (currentPublicationXref.rdfId === rdfId) {
          found = true;
          displayNumberForDisplay = i + 1;
        }
      }
    } while (found === false && i < pathway.Biopax.PublicationXref.length);

    return displayNumberForDisplay;
  }

  // Create a string of citation numbers for display,
  // delimited by commas, and
  // replacing any consecutive series of numbers with the
  // first and last joined by a hyphen.
  function createPublicationXrefString(displayNumbers) {
    var publicationXrefString;
    if (displayNumbers.length === 1) {
      publicationXrefString = displayNumbers[0];
    }
    else {
      displayNumbers.sort(function(a, b) {
        return a - b;
      });
      var i = 0;
      publicationXrefString = displayNumbers[i].toString();

      if (displayNumbers.length > 2) {
        do {
          i += 1;

          if (displayNumbers[i - 1] + 1 !== displayNumbers[i] || displayNumbers[i] + 1 !== displayNumbers[i + 1]) {
            if (i !== 1) {
              if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
                publicationXrefString += '-' + displayNumbers[i].toString();
              }
              else {
                publicationXrefString += ', ' + displayNumbers[i].toString();
              }
            }
            else {
              publicationXrefString += ', ' + displayNumbers[i].toString();
            }
          }

        } while (i < displayNumbers.length - 2);
      }

      i += 1;

      if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
        publicationXrefString += '-' + displayNumbers[i].toString();
      }
      else {
        publicationXrefString += ', ' + displayNumbers[i].toString();
      }
    }

    return publicationXrefString;
  }

  function getPublicationXrefString(pathway, rdfIds, callback) {
    var displayNumbers = [];
    var publicationXrefString = '';
    // make sure it's an array
    rdfIds = pathvisiojs.utilities.convertToArray(rdfIds);
    rdfIds.forEach(function(rdfId) {
      var num = getReferenceNumberForDisplay(pathway, rdfId);
      if(!!num) {
        displayNumbers.push(num); 
      }	
    });
    if (displayNumbers.length > 0){
      publicationXrefString = createPublicationXrefString(displayNumbers);
    }
    callback(publicationXrefString);
  }

  function render(target, targetType, pathway, rdfIds) {
    /* targetType can be any of the following:
     * node
     * edge
     * not currently but maybe in the future: diagram (applies to the whole pathway)
    //*/

    var viewport, text;
    getPublicationXrefString(pathway, rdfIds, function(publicationXrefString) {
      if (targetType === 'node') {
	var nodeWidth = target[0][0]['__data__'].width;
	var textLength = publicationXrefString.toString().length;
	var offset = nodeWidth - textLength *3 / 2 - 2;
        target.append('text')
        .attr('class', 'citation')
        .attr('transform', function(d) {return 'translate('+offset+' -4)';})
        .text(publicationXrefString);
      }
      else {

        // TODO don't repeat svg definition
        viewport = d3.select('svg > #viewport');
        if (targetType === 'edge') {
          viewport = d3.select('svg > #viewport');
          text = viewport.append('text')
          .attr('class', 'citation')
          .attr('transform', function(d) {return 'translate(0 -10)';});

          text.append('textPath')
          .attr('xlink:xlink:href', '#' + target)
          .attr('startOffset', '50%')
          .text(publicationXrefString);

        }
        else {
          throw new Error('Pathvisiojs cannot render a citation for targets of this type: ' + targetType);
        }
      }
    })

  }

  return {
    getPublicationXrefString:getPublicationXrefString,
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node = function(){
  'use strict';
  function dragmove(d) {
    /*
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
    //*/
    // don't have anchors rendered yet
    /*
    var changingAnchors = pathwayHere.elements.filter(function(element) {return element.parentId === d.id});
    var d3Node = self.d3Node = d3.select(this);
    console.log('changingAnchors');
    console.log(changingAnchors);
    d3Node.attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
    changingAnchors.forEach(function(anchor){
      console.log('anchor');
      console.log(anchor);
      console.log(d3Node);
      self.d3Node = d3Node;
      self.anchor = anchor;
      anchor.x = d3Node.select('#' + anchor.id)[0][0].getCTM().e;
      anchor.y = d3Node.select('#' + anchor.id)[0][0].getCTM().f; 
    })
    //*/
    d.x = d3.event.x;
    d.y = d3.event.y;


    /*
    var args = {};
    args.svg = d3.select('svg');
    args.pathway = pathwayHere;
    args.uniformlyScalingShapesList = uniformlyScalingShapesListHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});
    */
  }

  function render(args, callback) {
    if (!args) {
      throw new Error('Need input args to render a node.');
    }

    var nodeContainer = args.element,
      data = args.data,
      pathway = args.pathway,
      parentDataElement,
      translatedX,
      translatedY;

    if (!pathway) {
      throw new Error('Need a pathway to render a node.');
    }
    if (!nodeContainer) {
      throw new Error('Need a nodeContainer to render a node.');
    }
    if (!data) {
      throw new Error('Need input data to render a node.');
    }

    if (data.hasOwnProperty('isContainedBy')) {
      parentDataElement = pathway.elements.filter(function(element) {
        return element['@id'] === data.isContainedBy;
      })[0];
      translatedX = data.x - parentDataElement.x;
      translatedY = data.y - parentDataElement.y;
    }
    else {
      translatedX = data.x;
      translatedY = data.y;
    }

    /************ 
     * container
     * *********/

    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    nodeContainer.attr('transform', function(d) {
      return 'translate(' + translatedX + ' ' + translatedY + ')';
    })
    .attr("style", function (d) {
      var style = '';
      if (d.hasOwnProperty('backgroundColor')) {
	if (d.ShapeType == 'brace' || d.ShapeType == 'arc'){ 
	  //Brace color is NOT for fill and should always be transparent
	  style = 'fill-opacity:0; ';
	} 
        else if (d.nodeType == 'Label' && d.backgroundColor == '#ffffff'){  
	  //Label fill attr is programmatically IGNORED when set to Java editor default of white.
	  //This is obviously a hack that should ultimately be resolved by fixing the editor's 
	  // default for label backgroundColor.
	  style = '' ;
	}
	else {
          style = 'fill:' + d.backgroundColor + '; fill-opacity:1; ';
	}
      }
      return style;
    })
    .call(drag)



    /****************** 
     * background shape
     * ***************/

    var shapeType = strcase.paramCase(data.ShapeType);
    
    // check for whether desired shape type is available as a symbol
//    if (pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping.hasOwnProperty(shapeType)) {
      //console.log('We will use an SVG "use" element to render this ' + shapeType);
//      pathvisiojs.view.pathwayDiagram.svg.node.useElement.render(nodeContainer, data);
//    }
    // else check for whether it is available as a pathShape
//    else {
      //console.log('We will use a pathShape to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(nodeContainer, data);
//    }

    /****************** 
     * text label
     * ***************/

    if (data.hasOwnProperty('text')) {
      pathvisiojs.view.pathwayDiagram.svg.node.text.render(nodeContainer, data);
    }

    /****************** 
     * citation(s)
     * ***************/

    if (data.hasOwnProperty('PublicationXref')) {
      pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(nodeContainer, 'node', args.pathway, data.PublicationXref);
    }

    callback(nodeContainer);
  }

  /*
  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      //console.log(args.allSymbolNames);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!args.allSymbolNames) {
        console.log('args.allSymbolNames not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or args.allSymbolNames.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return allSymbolNames.indexOf(d.shapeType) === -1; });

    // Update… 
    var nodes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    nodes.enter().append("path")
    .call(render);

    // Exit…
    nodes.exit().remove();

  }
  //*/

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }


  function highlightByLabel(svg, pathway, nodeLabel) {
    var svg = d3.selectAll('#pathvisiojs-diagram');
    svg.selectAll('.highlighted-node').remove();
    var allDataNodesWithText = pathway.DataNode.filter(function(d, i) {return (!!d.text);});
    var selectedNodes = allDataNodesWithText.filter(function(d, i) {return d.text.line.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeContainer = svg.select('#pathway-iri-' + node.GraphId); //strcase.paramCase(node['@id']));
      var height = nodeContainer[0][0].getBBox().height;
      var width = nodeContainer[0][0].getBBox().width; 
      nodeContainer.append('rect') 
      .attr('class', 'highlighted-node')
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
  }  

  return {
    //renderAll:renderAll,
    render:render,
    getPortCoordinates:getPortCoordinates,
    highlightByLabel:highlightByLabel
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.anchor = function(){
  'use strict';

  function render(container, parentEdgeId, data) {
    // renders all anchors for a given edge

    // TODO look at using markers for this instead of independent symbols

    /*    if (!svg) {
          throw new Error('svg missing for rendering anchors.');
          }
    //*/    

    if (!container) {
      throw new Error('container element not specified for rendering anchors.');
    }
    if (!parentEdgeId) {
      throw new Error('parentEdgeId missing for rendering anchors.');
    }
    if (!data) {
      throw new Error('anchor data missing for rendering anchors.');
    }

    // make sure it's an array
    data = pathvisiojs.utilities.convertToArray(data);

    var defaultAnchorWidth = 10;
    var defaultAnchorHeight = 10;

    // TODO refactor svg.node.render() so we can use it for the other nodes and for anchors instead of basically repeating much of that method here
    var nodeContainer = container.selectAll('.node.anchor.parent-edge-' + strcase.paramCase(parentEdgeId))
    .data(data)
    .enter()
    .append("g")
    .attr('transform', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      var translateX = anchorCoordinates.x - defaultAnchorWidth/2;
      var translateY = anchorCoordinates.y - defaultAnchorHeight/2;
      return 'translate(' + translateX + ' ' + translateY + ')';
    })
    .attr('class', 'node anchor parent-edge-' + strcase.paramCase(parentEdgeId))
    .attr("style", function (d) {
      var style;
      if (d.hasOwnProperty('backgroundColor')) {
        if (d.ShapeType == 'brace' || d.ShapeType == 'arc'){ 
          //Brace color is NOT for fill and should always be transparent
          style = 'fill-opacity:0; ';
        } 
        else if (d.nodeType == 'Label' && d.backgroundColor == '#ffffff'){  
          //Label fill attr is programmatically IGNORED when set to Java editor default of white.
          //This is obviously a hack that should ultimately be resolved by fixing the editor's 
          // default for label backgroundColor.
          style = '' ;
        }
        else {
          style = 'fill:' + d.backgroundColor + '; fill-opacity:1; ';
        }
      }
      return style;
    })
    .each(function(d) {
      var thisNodeContainer = d3.select(this);
      if (!d.width) {
        d.width = defaultAnchorWidth;
      }
      if (!d.height) {
        d.height = defaultAnchorHeight;
      }
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(thisNodeContainer, d);
    });

    /*
    var anchors = container.selectAll('use.anchor.parent-edge-' + strcase.paramCase(parentEdgeId))
    .data(data)
    .enter()
    .append('use')
    .attr('x', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      return anchorCoordinates.x - defaultAnchorWidth/2;
    })
    .attr('y', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      return anchorCoordinates.y - defaultAnchorHeight/2;
    })
    .attr('width', defaultAnchorWidth)
    .attr('height', defaultAnchorHeight)
    .attr('xlink:xlink:href', function(d) {
      var backgroundImageId;
      var backgroundImage = d.backgroundImage;
      if (!!backgroundImage) {
        // check for whether desired shape type is available as a symbol
        backgroundImageId = pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping[strcase.paramCase(backgroundImage)]; 
        if (!!backgroundImageId) {
          //console.log('We will use an SVG "use" element to render this ' + shapeType);
          return '#' + backgroundImageId;
        }
        else {
          return 'none'
        }
      }
      else {
        return 'none'
      }
    })
    .attr('class', 'node anchor parent-edge-' + strcase.paramCase(parentEdgeId))
    .attr('style', function(d) {
      var style = ''
      if (d.hasOwnProperty('backgroundColor')) {
        style += 'fill:' + d.backgroundColor + '; ';
      }
      return style;
    })
    //*/

  }

  return {
    render:render
    //renderAll:renderAll
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.EntityNode = function(){
  'use strict';
  function render(args) {
    if (!args.data) {
      throw new Error('EntityNode data missing.');
    }
    if (!args.pathway) {
      throw new Error('Pathway not specified for this EntityNode. Pathway is needed for items like setting the Organism for DataNode annotations.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        var cssClass = 'node entity-node ' + strcase.paramCase(d.nodeType) + ' ';
        if (d.nodeType === 'DataNode') {
          cssClass += strcase.paramCase(d.dataNodeType) + ' ';
	  cssClass += strcase.paramCase('label-'+decodeURIComponent(d.text.line[0])) + ' ';
          if (!!d.DatasourceReference) {
            cssClass += 'has-xref ';
	    cssClass += strcase.paramCase('xref-'+decodeURIComponent(d['DatasourceReference'].ID+','+d['DatasourceReference'].Database)) + ' ';
          }
        }
        if (d.hasOwnProperty('CellularComponent')) {
          cssClass += 'cellular-component ' + strcase.paramCase(d.CellularComponent) + ' ';
        }
        return cssClass;
      })
      if (args.data.nodeType === 'DataNode') { //all datanodes should be clickable
        var notDragged = true;
        nodeContainer
        .on("mousedown", function(d,i) {
          notDragged = true;
        })
        .on("mousemove", function(d,i) {
          notDragged = false;
        })
        .on("mouseup", function(d,i) {
          if (notDragged) {
            var dfId = null, dfDb = null;
            if (!!d['DatasourceReference']){
              if (!!d['DatasourceReference'].ID && !!d['DatasourceReference'].Database){ 
                dfId = d['DatasourceReference'].ID;
                dfDb = d['DatasourceReference'].Database;
              }
            }

            pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, dfId, dfDb, d.text.line.join(' '), d.dataNodeType); //that's capital 'O' Organism from GPML vocab

          }
        });
      }
    });
  }

  return {
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape = function(){
  'use strict';

  function render(parent, data) {
    /*
    console.log(parent);
    console.log(data);
    //*/
    var re;
    var pathShapeNameToUse = strcase.camelCase(data.ShapeType);
    if (!pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
      re = /Double$/gi;
      pathShapeNameToUse = pathShapeNameToUse.replace(re, '');
      if (pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
      }
      else {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available. Using pathShape "rounded-rectangle" instead');
        pathShapeNameToUse = 'roundedRectangle';
      }
    }

    //style attribute modified on parent 
    var style = parent.attr('style');
    parent.attr('style', function(d) {
        if(d.hasOwnProperty('borderColor')) {
	  if(d.nodeType != 'Label'){  //Label "Color" attrs are NOT for borderColor of svg-specific rectangle shape
            style += 'stroke:' + d.borderColor + '; ';
	  }
        }
        return style;})

    //other attributes extracted and applied to new g element
    var stroke = 1
    var transform = '';
    var g = parent.insert('g', ':first-child');
    g.attr('stroke-width', function(d) {
        if(!isNaN(d.borderWidth)){
          stroke = d.borderWidth; //LineThickness in GPML
        }
        return stroke;})
      .attr('transform', function(d) {
        if (d.rotate){
          transform += ' rotate(' + d.rotate + ',' + d.width/2 + ',' + d.height/2 + ')';
        }
        return transform;});

    var nodeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.pathShape[pathShapeNameToUse].getAttributes(data.width, data.height, data.borderWidth);
    nodeAttributes.forEach(function(attribute) {

     if(attribute.scale == 'true'){
        g.attr('stroke-width', function(d) {
          return stroke / ((d.width + d.height) / 200);
	})
	.attr('transform', function(d) {
	  transform += ' scale('+d.width/100+', '+d.height/100+')';
	  return transform;
	});
     }

      //handle alt path types and lists of attrs
      var child = 'path';
      var names = [attribute.name];
      var paths = [attribute.path];
      if (attribute.alt){
	child = attribute.alt;
	names = attribute.name;
	paths = attribute.path;
      }
      var childElement = g.append(child);
      for(var i = 0; i < names.length; i++){
	childElement.attr(names[i], paths[i]);
      }
    });
  }

  /*
  function render(pathShape) {

    // TODO this seems like a hack. How can the code be refactored so this line below is not needed?

    if (!pathShape[0] || pathShape[0].length < 1) {return 'nonuniformlyScalingNodes empty'};
    self.pathShape = pathShape;
    pathShape.attr('id', function (d) {return 'shape-' + d.id;})
    .attr('class', function (d) {
      var cssClass = '';
      if (d.elementType === 'data-node') {
        cssClass = 'shape ' + d.dataNodeType + ' ' + d.shapeType;
      }
      else {
        cssClass = 'shape ' + d.shapeType;
      }
      return cssClass;
    })

    // TODO there must be a cleaner, less brittle way of getting nodeData here

    var nodeData = pathShape[0].parentNode.__data__;
    var shapeType = strcase.camelCase(nodeData.shapeType);
    var pathShapeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.shape.pathShape[shapeType].getAttributes(nodeData.width, nodeData.height);
    pathShapeAttributes.forEach(function(attribute) {
      pathShape.attr(attribute.name, attribute.value)
    });
  }
  //*/

 /*
  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      //console.log(allSymbolNames);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!allSymbolNames) {
        console.log('allSymbolNames not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or allSymbolNames.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return allSymbolNames.indexOf(d.shapeType) === -1; });

    // Update… 
    var pathShapes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    pathShapes.enter().append("path")
    .call(render);

    // Exit…
    pathShapes.exit().remove();

  }
  //*/

  return {
    //renderAll:renderAll,
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.arc = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm99.5,50c0,27.338341 -22.162117,49.5 -49.5,49.5s-49.5,-22.161659 -49.5,-49.5'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.brace = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm1.5,98.5c0,-32.50001 8.16667,-48.75 24.5,-48.75s24.5,-16.25001 24.5,-48.75c0,32.49999 8.16666,48.75 24.49999,48.75s24.5,16.24999 24.5,48.75'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.complex = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:'d',
          path: 'M ' + (0 + 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth - 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + 18) +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0 + nodeWidth - 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0 + 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0) + ' ' + (0 + 18) +
            ' Z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.endoplasmicReticulum = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm73.52756,56.60967c-5.62457,-18.60675 23.51463,-32.43358 23.40173,-45.06604c-0.34426,-4.86102 -10.48934,-8.89743 -18.28974,-5.33395c-17.04119,7.87556 -15.64949,29.30503 -21.20533,42.23387c-0.35661,3.60951 -7.36274,2.46926 -7.74964,-0.48694c-5.8512,-11.38871 17.13534,-24.48692 5.96075,-29.42586c-19.63467,-8.16979 -28.75184,21.15346 -22.0682,28.81784c7.4956,14.17602 -2.17949,24.40679 -6.74689,15.49637c-2.44209,-5.30613 6.06605,-11.08445 -0.80351,-16.17689c-4.31991,-2.79993 -11.75555,-0.64618 -16.15468,3.0943c-12.89117,10.73799 4.72957,40.98145 20.96467,36.14635c4.69833,-1.95989 -3.23603,-8.70151 3.90717,-9.59951c7.29767,-0.81255 5.17628,6.18889 7.68745,9.22691c2.3071,4.0509 4.83232,8.35538 10.7626,11.6237c4.78642,2.53724 15.29437,2.11225 16.77148,-1.95795c2.0318,-9.26291 -26.11129,-28.35848 -10.68903,-31.2815c18.55524,-2.71473 4.74866,23.84573 24.31006,29.69419c9.50188,2.02824 15.63902,-0.62194 14.81255,-4.03272c-2.74586,-11.26327 -25.13557,-22.6802 -24.96441,-33.14968'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.golgiApparatus = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm58.4671,16.99297c-22.2053,-19.30712 37.3101,-19.538 25.5673,-3.1145c-8.8077,11.998 -17.0665,37.53828 -0.9417,64.06707c13.3147,17.47735 -41.7485,17.92546 -27.7555,-0.94919c11.3458,-18.99656 10.2868,-51.87342 3.1299,-60.00338l0,0z'
        },
	{
	  name:'d',
	  path: 'm31.2144,22.48219c-10.7917,-13.83614 29.8976,-12.81612 18.4075,0.4332c-4.067,4.79263 -5.7828,39.75796 1.1607,48.44653c8.5294,12.0082 -32.853,12.49764 -20.5002,-1.45349c6.9528,-11.2083 10.4738,-33.76451 0.932,-47.42624l0,0z'
	},
	{
	  name:'d',
	  path: 'm29.80396,32.77896c1.58418,7.4093 2.72346,10.80737 -1.48298,24.77019c-3.73195,8.38708 -3.6004,10.5513 -11.73233,12.53496c-6.6833,1.07092 -11.86483,-6.32111 -4.7933,-10.40477c4.85573,-3.63095 6.14109,-7.02681 6.65889,-14.82198c-0.23922,-6.14805 0.8145,-10.21755 -5.36692,-12.88742c-7.62432,-1.41744 -6.08804,-10.67651 4.82406,-8.95195c5.84935,0.66319 10.2824,5.52823 11.89258,9.76096z'
	}
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.gridSquare = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
	  scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm1,1l99,0l0,99l-99,0l0,-99z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hexagon = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm1.42004,50.99635l21.07262,-42.13943l56.19152,0l21.0667,42.13943l-21.0667,42.14507l-56.19152,0l-21.07262,-42.14507z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.mimDegradation = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm8,50c0,-23.20442 18.79558,-42 42,-42c23.20442,0 42,18.79558 42,42c0,23.20442 -18.79558,42 -42,42c-23.20442,0 -42,-18.79558 -42,-42z'
        },
	{
	  name:'d',
	  path:'m1,1l99,99'
	}
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.mitochondria = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm0,50c0,-27.62431 22.37569,-50 50,-50c27.62431,0 50,22.37569 50,50c0,27.62431 -22.37569,50 -50,50c-27.62431,0 -50,-22.37569 -50,-50z'
        },
	{
	  name:'d',
	  path: 'm14.894899,26.347357c4.363817,-0.741571 3.827518,17.036169 8.182638,16.183825c8.27347,0.030762 2.982006,-28.148991 9.899754,-28.336687c6.967995,-0.187704 2.246651,29.947527 9.204983,29.43981c7.632813,-0.560024 0.507309,-32.935357 8.136253,-33.623082c7.698521,-0.689259 2.919197,32.039941 10.628349,32.224557c6.546684,0.160011 3.026451,-27.642808 9.56057,-26.921232c7.192177,0.79388 0.664818,29.842905 7.781624,31.667604c4.748405,1.215439 4.420822,-18.257757 9.204018,-17.440804c11.128883,7.577278 8.628105,37.698658 -2.179977,44.645138c-3.138542,0.698479 -3.965698,-10.502029 -7.112938,-9.905075c-5.59005,1.058502 -3.982124,22.284088 -9.603096,21.799461c-5.239281,-0.456947 -2.226364,-21.636383 -7.47047,-21.730232c-6.961235,-0.116928 -3.357895,28.924408 -10.316231,28.495148c-6.140846,-0.375397 -1.73064,-24.950363 -7.825104,-26.191963c-5.681847,-1.156982 -5.378429,22.170242 -11.027426,20.680939c-6.249069,-1.644684 -0.469624,-26.673519 -6.759275,-27.865887c-3.728954,-0.706188 -2.647665,14.400654 -6.403677,14.545292c-14.016198,-5.938736 -15.748776,-39.707981 -3.899994,-47.666811z'
	}
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.none = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'M0 0'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.oval = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm0,50c0,-27.62431 22.37569,-50 50,-50c27.62431,0 50,22.37569 50,50c0,27.62431 -22.37569,50 -50,50c-27.62431,0 -50,-22.37569 -50,-50z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.ovalDouble = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:['ry','rx','cy','cx'],
	  alt:'ellipse',
          path:[nodeHeight/2,nodeWidth/2,nodeHeight/2,nodeWidth/2] 
	},
        {
          name:['ry','rx','cy','cx'],
          alt:'ellipse',
          path:[nodeHeight/2-6,nodeWidth/2-6,nodeHeight/2,nodeWidth/2]
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.pentagon = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,'+0.81*nodeHeight+'l0,-'+0.62*nodeHeight+'l'+0.62*nodeWidth+',-'+0.19*nodeHeight+'l'+0.38*nodeWidth+','+0.5*nodeHeight+'l-'+0.38*nodeWidth+','+0.5*nodeHeight+'l-'+0.62*nodeWidth+',-'+0.19*nodeHeight+'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.rectangle = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,0l'+ nodeWidth +',0l0,'+ nodeHeight + 'l-' + nodeWidth +',0l0,-' + nodeHeight +'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangle = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,10c0,-5.43379 4.56621,-10 10,-10l' 
		+ (nodeWidth - 20) 
		+ ',0c5.43379,0 10,4.56621 10,10l0,'
		+ (nodeHeight - 20) 
		+ 'c0,5.43379 -4.56621,10 -10,10l' 
		+ (20 - nodeWidth) 
		+ ',0c-5.43379,0 -10,-4.56621 -10,-10l0,' 
		+ (20 - nodeHeight) 
		+ 'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangleDouble = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
    var attributes = [
      {
        name:'d',
        path:
          'm6,13c0,-3.80365 3.19635,-7 7,-7l'
        + (nodeWidth - 26)
        + ',0c3.80365,0 7,3.19635 7,7l0,'
        + (nodeHeight - 26)
        + 'c0,3.80365 -3.19635,7 -7,7l'
        + (26 - nodeWidth)
        + ',0c-3.80365,0 -7,-3.19635 -7,-7l0,'
        + (26 - nodeHeight)
        + 'z'
      },
      {
        name:'d',
        path: 'm0,10c0,-5.43379 4.56621,-10 10,-10l'
        + (nodeWidth - 20)
        + ',0c5.43379,0 10,4.56621 10,10l0,'
        + (nodeHeight - 20)
        + 'c0,5.43379 -4.56621,10 -10,10l'
        + (20 - nodeWidth)
        + ',0c-5.43379,0 -10,-4.56621 -10,-10l0,'
        + (20 - nodeHeight)
        + 'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.sarcoplasmicReticulum = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm46.60182,1.40724c-32.37224,1.34138 -36.32004,22.77011 -26.50318,38.12777c9.31826,18.3425 -18.7656,30.15016 2.56955,49.37807c16.82126,13.11594 46.33175,6.10508 52.12638,-8.56826c5.89916,-15.24847 -10.95099,-26.0272 -3.29316,-40.96135c10.85342,-19.88432 -0.77615,-38.13043 -24.89959,-37.97624z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape.triangle = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,'+nodeHeight+'l0,-'+nodeHeight+'l'+nodeWidth+','+nodeHeight/2+'l-'+nodeWidth+','+nodeHeight/2+'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.text = function(){
  'use strict';

  // for more details, see 
  // http://www.w3.org/TR/SVG11/text.html#TextAnchorProperty
  // start | middle | end | inherit
  // and
  // http://www.w3.org/TR/CSS2/text.html#alignment-prop
  // left | right | center | justify | inherit

    /*
    'left': 'start',
    'right': 'end',
    'center': 'middle',
    'inherit': 'inherit',
    'justify': null
    //*/


  function render(nodeContainer, data) {
    // TODO make a better caching system
    var cache = {};
    cache.padding = 5;
    var text = {};
    text.cache = {};
    text.cache.fontSize = 12;
    text.cache.alignmentBaseline = data.text.verticalAlign;
    text.cache.textAnchor = function() {
      if (data.text.textAlign == 'left'){
        return 'start';
      } else if (data.text.textAlign == 'right') {
        return 'end';
      } else {
        return 'middle';
      }
    };
    text.cache.x = function() {
      if (data.text.textAlign == 'left'){
        return -1 * data.width / 2;
      } else if (data.text.textAlign == 'right') {
        return data.width / 2;
      } else {
        return 0;
      }
    };
    text.cache.translate = {};
    // TODO replace this with the actual translate values
    text.cache.translate.dx = data.width / 2;
    text.cache.translate.dy = data.height / 2;
    text.line = {};
    text.line.cache = {};
    text.line.cache.y = [];
    var textLineCount = data.text.line.length;
    var i = 0
    data.text.line.forEach(function(line) {
      text.line.cache.y.push(i * text.cache.fontSize);
      i += 1;
    });  

    var textArea = nodeContainer.selectAll('g.text-area')
    .data(function(d) {
      return [data];
    })
    .enter()
    .append('g')
    .attr("id", function (d) {
      return 'text-container' + strcase.paramCase(d['@id']);
    })
    .attr('transform', function(d) {
      return 'translate(' + text.cache.translate.dx + ' ' + text.cache.translate.dy + ')';
    })
    .attr("class", "text-area")
    .attr("style", function (d) {
      var style = '';
      if (d.text.hasOwnProperty('color')) {
        style += 'fill:' + d.text.color + '; ';
      }
      if (d.text.hasOwnProperty('fontFamily')) {
        style += 'font-family:' + d.text.fontFamily + '; ';
      }
      if (d.text.hasOwnProperty('fontSize')) {
        style += 'font-size:' + d.text.fontSize + 'px; ';
      }
      if (d.text.hasOwnProperty('fontWeight')) {
        style += 'font-weight:' + d.text.fontWeight + '; ';
      }
      if (d.text.hasOwnProperty('fontStyle')) {
        style += 'font-style:' + d.text.fontStyle + '; ';
      }
      return style;
    });

    var textLine = textArea.selectAll('text')
    .data(function(d) {
      return d.text.line;
    })
    .enter()
    .append('text')
    .attr("id", function (d, i) {
      return 'text-line' + i;
    })
    .attr("x", text.cache.x)
    .attr("y", function (d, i) { return (i - (textLineCount - 1)/2) * 1.1 + 'em';})
    .attr("alignment-baseline", text.cache.alignmentBaseline) 
    .attr("text-anchor", text.cache.textAnchor)
    .text(function (d) { return d; });

    /*
    nodeText.attr('transform', function(d) {
      applyTextAlign(nodeText[0][0], d, function(translate) {
        return 'translate(' + translate.dx + ' ' + translate.dy + ')';
      });
    })
    //*/

    return nodeContainer;
  }

  return {
    render:render
  };
}();

;

pathvisiojs.view.pathwayDiagram.svg.node.groupNode = function(){
  'use strict';
  function render(args, callback) {
    if (!args.container) {
      throw new Error('Error: container element not specified for rendering groupNode.');
    }
    if (!args.data) {
      throw new Error('Error: group data missing for rendering groupNode.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(groupContainer) {
      groupContainer.attr("class", function (d) {
        var cssClass = 'node group-node ' + strcase.paramCase(d.groupType) + ' ';
        return cssClass;
      })

      var groupContents = args.data.contains;
      callback(groupContainer, groupContents);
    });
  }
 
  return {
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.useElement = function(){
  'use strict';
  
  var pathwayHere, allSymbolNamesHere;

  function dragmove(d) {
    /*
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
    //*/

    // don't have anchors rendered yet
    /*
    var changingAnchors = pathwayHere.elements.filter(function(element) {return element.parentId === d.id});
    var d3Node = self.d3Node = d3.select(this);
    console.log('changingAnchors');
    console.log(changingAnchors);
    d3Node.attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
    changingAnchors.forEach(function(anchor){
      console.log('anchor');
      console.log(anchor);
      console.log(d3Node);
      self.d3Node = d3Node;
      self.anchor = anchor;
      anchor.x = d3Node.select('#' + anchor.id)[0][0].getCTM().e;
      anchor.y = d3Node.select('#' + anchor.id)[0][0].getCTM().f; 
    })
    //*/
    d.x = d3.event.x;
    d.y = d3.event.y;


    var args = {};
    args.svg = d3.select('svg');
    args.pathway = pathwayHere;
    args.allSymbolNames = allSymbolNamesHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});
  }

  function render(parent, data) {
    var node = parent.append("use")
    .data([data])
    .attr("id", function (d) {return 'node-' + strcase.paramCase(d['@id']);})
    .attr("class", function (d) {
      return 'symbol ';
    })
    .attr('transform', function(d) {
      var transform = 'scale(1)';
      if (d.hasOwnProperty('rotation')) {
        transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
      }
      return transform;
    })
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", function (d) { return d.width;})
    .attr("height", function (d) { return d.height;})
    .attr("style", function (data) {
      var style = '';
      if (data.hasOwnProperty('borderColor')) {
        style += 'stroke:' + data.borderColor + '; ';
      }
      /*
      if (d.hasOwnProperty('fillOpacity')) {
        style += 'fill-opacity:' + d.fillOpacity + '; ';
      }
      //*/
      var borderWidthEffective;
      if (data.hasOwnProperty('borderWidth')) {

        // Doubling borderWidth to create borderWidthEffective.
        // Reason: border is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
        // of the border so that the border does not go outside its bounding box. Because the outer half of the border is not displayed, we need to
        // double the border width so that the border's apparent width matches the value specified in GPML.

        borderWidthEffective = 2 * data.borderWidth;
      }
      else {
        borderWidthEffective = 2;
      }

      style += 'stroke-width:' + borderWidthEffective + '; ';


      return style;
    })


    /*


      if (d.hasOwnProperty('strokeStyle')) {
        if (d.strokeStyle === 'dashed') {
          style += 'stroke-dasharray: 5,3; ';
        }

        /*
        if (d.strokeStyle === 'double') {

          // render second element

          d3.select(nodesContainer[0][i]).append("use")
          .attr("id", function (d) {return 'node-double' + d.id;})
          .attr("class", function (d) {
            var cssClass = '';
            if (d.elementType === 'data-node') {
              cssClass = 'node ' + d.dataNodeType;
            }
            else {
              cssClass = 'node';
            }
            return cssClass;
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
          .attr("xlink:xlink:href", function (d) {return "#" + d.ShapeType;})
          //.attr("class", "stroke-color-equals-default-fill-color")
          .attr("style", function(d) { return style + 'fill-opacity:0; ';});
        }
      }

      // be careful that all additions to 'style' go above the 'double-line second element' above
      // so that they are applied to both the first and second elements.

      return style;
    })
        //*/
    .attr("xlink:xlink:href", function(d) {
      var shapeType = strcase.paramCase(d.ShapeType);
      var symbolId = pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping[shapeType];
      return '#' + symbolId;
    });
  }

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  function highlightByLabel(svg, pathway, nodeLabel) {
    svg.selectAll('.highlighted-node').remove();
    var dataNodesWithText = pathway.elements.filter(function(d, i) {return d.nodeType === 'data-node' && (!!d.textLabel);});
    var selectedNodes = dataNodesWithText.filter(function(d, i) {return d.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeDomElement = svg.select('#node-' + node.id);
      var height = nodeDomElement[0][0].getBBox().height;
      var width = nodeDomElement[0][0].getBBox().width;
      nodeDomElement.append('rect')
      .attr('class', 'highlighted-node')
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
  }

  return {
    render:render,
    getPortCoordinates:getPortCoordinates,
    highlightByLabel:highlightByLabel
  };
}();
;

// Edges (interactions and graphical lines)

pathvisiojs.view.pathwayDiagram.svg.edge = function(){
  'use strict';

  function getPointAtPositionById(edgeElementId, position) {
    // position refers to percentage of total length along
    // edge from start toward end

    var edgeElement = d3.select('#' + edgeElementId)[0][0];
    var totalLength = edgeElement.getTotalLength();
    var lengthFromStartToPosition = position * totalLength;
    var point = edgeElement.getPointAtLength(lengthFromStartToPosition);
    return point;
  }

  //var svg, customMarkers;

  function render(args, callback) {
    var svg = args.svg,
      edge = args.element,
      parentDataElement;
    if (!svg) {
      throw new Error('svg missing');
    }
    var pathway = args.pathway;
    if (!pathway) {
      throw new Error('pathway missing');
    }
    var data = args.data;
    if (!data) {
      throw new Error('data missing');
    }
    var container = args.container;
    if (!container) {
      throw new Error('container missing');
    }
    var markerStartName = args.data.markerStart;
    //console.log('markerStartName');
    //console.log(markerStartName);
    var markerEndName = args.data.markerEnd;
    //console.log('markerEndName');
    //console.log(markerEndName);
    var edgeId = strcase.paramCase(data['@id']);

    if (data.hasOwnProperty('isContainedBy')) {
      parentDataElement = pathway.elements.filter(function(element) {
        return element['@id'] === data.isContainedBy;
      })[0];
      data.Point.forEach(function(point) {
        point.x = point.x - parentDataElement.x;
        point.y = point.y - parentDataElement.y;
      });
    }

    /*
    console.log('svg in edge');
    console.log(svg);
    console.log('edge in edge');
    console.log(edge);
    console.log('data in edge');
    console.log(data);
    console.log('markerStartName in edge');
    console.log(markerStartName);
    console.log('markerEndName in edge');
    console.log(markerEndName);
    //*/
    /*
    var createPathDataString = d3.svg.line()
    .x(function(data) { return data.x; })
    .y(function(data) { return data.y; });

    // "stepType" is the term d3js uses to specify type of interpolation.
    // we need to convert from GPML ConnectorType to
    // d3 stepType here
    var gpmlConnectorTypeToD3StepTypeMapping = {
      Straight:'linear',
      Segmented:'linear',
      Elbow:'linear',
      Curved:'basis'
    };
    var stepType = 'linear';
    if (gpmlConnectorTypeToD3StepTypeMapping.hasOwnProperty(data.ConnectorType)) {
      stepType = gpmlConnectorTypeToD3StepTypeMapping[data.ConnectorType];
    }
    createPathDataString.interpolate(stepType);
    //*/
    var stroke = data.stroke,
      markerStartAttributeValue,
      markerEndAttributeValue;
    async.series({
      'markerStartAttributeValue': function(callback) {
        var markerStartIdStub = pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[markerStartName];
        if (!!markerStartIdStub) {
          if (!!stroke) { // if edge is not of default stroke color (at time of writing, this was black)
            if (markerStartName === 'none') { // if no marker is to be used, JSON data will specify 'none'
              markerStartAttributeValue = 'none';
              callback(null, markerStartAttributeValue);
            }
            else {
              if (pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerStartIdStub].indexOf(stroke) === -1) { // if no marker of this stroke color exists
                pathvisiojs.view.pathwayDiagram.svg.edge.marker.appendNonDefaultColorMarkerBothEnds(svg, markerStartIdStub, stroke, function() {
                  markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-' + stroke) + ')';
                  callback(null, markerStartAttributeValue);
                });
              }
              else {
                markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-' + stroke) + ')';
                callback(null, markerStartAttributeValue);
              }
            }
          }
          else {
            markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-default') + ')';
            callback(null, markerStartAttributeValue);
          }
        }
        else {
          console.warn('Pathvisiojs does not have access to a marker (arrowhead) of the requested type: "' + markerStartName + '"');
          markerStartAttributeValue = 'none';
          callback(null, markerStartAttributeValue);
        }
      },
      'markerEndAttributeValue': function(callback) {
        var markerEndIdStub = pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[markerEndName];
        if (!!markerEndIdStub) {
          if (!!stroke) { // if edge is not of default stroke color (at time of writing, this was black)
            if (markerEndName === 'none') { // if no marker is to be used, JSON data will specify 'none'
              markerEndAttributeValue = 'none';
              callback(null, markerEndAttributeValue);
            }
            else {
              if (pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerEndIdStub].indexOf(stroke) === -1) { // if no marker of this stroke color exists
                pathvisiojs.view.pathwayDiagram.svg.edge.marker.appendNonDefaultColorMarkerBothEnds(svg, markerEndIdStub, stroke, function() {
                  markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-' + stroke) + ')';
                  callback(null, markerEndAttributeValue);
                });
              }
              else {
                markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-' + stroke) + ')';
                callback(null, markerEndAttributeValue);
              }
            }
          }
          else {
            markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-default') + ')';
            callback(null, markerEndAttributeValue);
          }
        }
        else {
          console.warn('Pathvisiojs does not have access to a marker (arrowhead) of the requested type: "' + markerEndName + '"');
          markerEndAttributeValue = 'none';
          callback(null, markerEndAttributeValue);
        }
      },
      /*
      'convertedPointSet': function(callback) {
        var index, firstSegmentHorizontal, currentSegmentHorizontal, convertedPointSet;

        // in GPML, some points are implied, such as for many curves and elbows with only two points.
        // This code below fills in the implied points, returning the full set of points.

        convertedPointSet = [];

        if ((!data.ConnectorType) || (data.ConnectorType === undefined) || (data.ConnectorType === 'Straight') || (data.ConnectorType === 'Segmented')) {
          callback(null, data.Point);
        }
        else {

          // Elbow and Curved are considered together, because a Curve is just a modification
          // of an Elbow. The Curve uses the Elbow point set, but it has interpolation of
          // basis instead of linear.

          if (data.ConnectorType === 'Elbow' || data.ConnectorType === 'Curved') {
            if (data.Point.length === 2) {

              // GPML specifies just the start and end points and assumes a programmatic
              // path finding algorithm will fill in the intermediate points, unless
              // the user explicitly sets the intermediate points by dragging the edge.

              // fill in intermediate points using default algorithmic layout

              pathvisiojs.view.pathwayDiagram.pathFinder.getPath(svg, data, function(convertedPointSet) {
                callback(null, convertedPointSet);
              });
            }
            else {

              // use user-specified intermediate points. This requires converting from
              // point set format #2 (see above) to format #1.

              convertedPointSet.push(data.Point[0]);

              if (Math.abs(data.Point[0].RelX) === 1) {
                firstSegmentHorizontal = true;
              }
              else {
                if (Math.abs(data.Point[0].RelY) === 1) {
                  firstSegmentHorizontal = false;
                }
                else {
                  if ((Math.abs(data.Point[data.Point.length - 1].RelX) === 1) && pathvisiojs.utilities.isOdd(data.Point.length)) {
                    firstSegmentHorizontal = true;
                  }
                  else {
                    firstSegmentHorizontal = false;
                  }
                }
              }

              currentSegmentHorizontal = firstSegmentHorizontal;
              index = 0;
              do {
                index += 1;

                if (currentSegmentHorizontal) {
                  convertedPointSet.push({
                    'x':data.Point[index].x,
                    'y':data.Point[index - 1].y
                  });
                }
                else {
                  convertedPointSet.push({
                    'x':data.Point[index - 1].x,
                    'y':data.Point[index].y
                  });
                }

                currentSegmentHorizontal = !currentSegmentHorizontal;

              } while (index < data.Point.length - 1);

              convertedPointSet.push(data.Point[data.Point.length - 1]);
              callback(null, convertedPointSet);
            }
          }
          else {
            console.warn('Warning: pathvisiojs does not support connector type: ' + data.ConnectorType + '. Using linear interpolation as fallback.');
            callback(null, data.Point);
          }
        }
      }
    },
    function(err, results) {
    //*/
    'path': function() {
      edge.attr("marker-start", markerStartAttributeValue)
      .attr("marker-end", markerEndAttributeValue)
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:#' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("fill", 'none')
      .attr("d", function (data) {
        return pathvisiojs.view.pathwayDiagram.svg.edge.path.getPath(data); //createPathDataString(results.convertedPointSet);
      });

     /****************** 
       * anchor(s) (note that this method is called from ...EDGE.render() but the result is to render a NODE)
       * ***************/

      if (data.hasOwnProperty('Anchor')) {
        pathvisiojs.view.pathwayDiagram.svg.node.anchor.render(container, edgeId, data.Anchor);
      }

      /****************** 
       * citation(s)
       * ***************/

      if (data.hasOwnProperty('PublicationXref')) {
        pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(edgeId, 'edge', pathway, data.PublicationXref);
        callback(edge);
      }
      else {
        callback(edge);
      }
    }
   }); //close async
  } //close function

  /*
  function renderAll(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = viewport.selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var cssClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (data) {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (data) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }
  //*/


  return {
    render:render,
    getPointAtPositionById:getPointAtPositionById
    //renderAll:renderAll
  };
}();
  
;

pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine = function(){
  'use strict';
  //function render(svg, container, data) {
  function render(args) {
    var svg = args.svg;
    var container = args.container;
    var data = args.data;
    /*
    console.log('container');
    console.log(container);
    console.log('data');
    console.log(data);
    //*/

    pathvisiojs.view.pathwayDiagram.svg.edge.render(args, function(graphicalLine) {
      graphicalLine.attr("class", function (data) {
        var cssClass = 'edge graphical-line';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      });

      var containerElement = container[0][0];
      var containerElementX, containerElementY;
      if (containerElement.hasOwnProperty('__data__')) {
        graphicalLine.attr('transform', function() {
          containerElementX = containerElement.__data__.x || 0;
          containerElementY = containerElement.__data__.y || 0;
          return 'translate(' + (-1*containerElementX) + ' ' + (-1*containerElementY) + ')';
        })
      }
    });


    //pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes(svg, graphicalLine, data, data.markerStart, data.markerEnd);

    //.call(pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes);

    /*
    // Update…
    var graphicalLine = container.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .call(setAttributes);

    // Enter…
    graphicalLine.enter().append("path")
    .call(setAttributes);

    // Exit…
    graphicalLine.exit().remove();
    //*/

  }


  /*
  function renderAll(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = viewport.selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var cssClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (data) {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (data) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }
  //*/


  return {
    render:render
    //renderAll:renderAll
  };
}();
  
;

pathvisiojs.view.pathwayDiagram.svg.edge.interaction = function(){
  'use strict';
  function getMarkerNameFromInteractionGraph(InteractionGraph) {
    var interactionType;
    if (!InteractionGraph) {
      return 'none';
    }
    else {
      interactionType = InteractionGraph.interactionType;
      if (!interactionType) {
        return 'none';
        console.warn('No interactionType specified for interaction.');
      }
      else {

        // TODO check for whether marker is specified in list of availableMarkers

        return strcase.paramCase(interactionType);
      }
    }
  }

  //function render(svg, target, data) {
  function render(args) {
    var svg = args.svg;
    var container = args.container;
    var data = args.data;
    /*
    console.log('container');
    console.log(container);
    console.log('data');
    console.log(data);
    //*/


    var firstInteractionGraph, lastInteractionGraph, markerStart, markerEnd;
    if (!!data.InteractionGraph) {
      if (data.InteractionGraph.length > 1) {
        firstInteractionGraph = data.InteractionGraph[0];
        //markerStart = getMarkerNameFromInteractionGraph(firstInteractionGraph);
        lastInteractionGraph = data.InteractionGraph[data.InteractionGraph.length - 1];
        //markerEnd = getMarkerNameFromInteractionGraph(lastInteractionGraph);
      }
      else {
        lastInteractionGraph = data.InteractionGraph[0];
        //markerEnd = getMarkerNameFromInteractionGraph(lastInteractionGraph);
      }
    }

    pathvisiojs.view.pathwayDiagram.svg.edge.render(args, function(interaction) {
      interaction.attr("class", function (data) {
        var cssClass = 'edge interaction' + ' ';
        if (!!data.DatasourceReference) {
          cssClass += 'has-xref ';
          if (!!data.DatasourceReference.ID) {
            interaction.on("click", function(d,i) {
              pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, d['DatasourceReference'].ID, d['DatasourceReference'].Database, d.renderableType, d.markerStart+'<-->'+d.markerEnd); // d.InteractionGraph[0].interactsWith.text.line[0]+' + '+d.InteractionGraph[0].text.line[0], d.renderableType); 
	      //That's capital 'O' Organism from GPML vocab.
	      //Names of interaction partners is given as header, which is also used to form site query, 
	      // thus the "+" is used to convey both the interaction and query logic.
            })
          }
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })

      var containerElement = container[0][0];
      var containerElementX, containerElementY;
      if (containerElement.hasOwnProperty('__data__')) {
        interaction.attr('transform', function() {
          containerElementX = containerElement.__data__.x || 0;
          containerElementY = containerElement.__data__.y || 0;
          return 'translate(' + (-1*containerElementX) + ' ' + (-1*containerElementY) + ')';
        })
      }
    });


    // I want to get the marker name from the interactionType later.
    //pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes(svg, interaction, data, markerStart, markerEnd);

    /*
    // Update…
    var interaction = container.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .call(setAttributes);

    // Enter…
    interaction.enter().append("path")
    .call(setAttributes);

    // Exit…
    interaction.exit().remove();
    //*/

  }


  /*
  function renderAll(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = viewport.selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var cssClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (data) {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (data) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }
  //*/


  return {
    render:render,
    //renderAll:renderAll
  };
}();
  
;

pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){
  'use strict';

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  var svg;

  var semanticNameToIdMapping = { 
    'arrow':'shape-library-markers-arrow-svg',
    'necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'binding':'shape-library-markers-mim-binding-svg',
    'conversion':'shape-library-markers-mim-conversion-svg',
    'stimulation':'shape-library-markers-mim-stimulation-svg',
    'modification':'shape-library-markers-mim-modification-svg',
    'catalysis':'shape-library-markers-mim-catalysis-svg',
    'inhibition':'shape-library-markers-mim-inhibition-svg',
    'cleavage':'shape-library-markers-mim-cleavage-svg',
    'covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'gap':'shape-library-markers-mim-gap-svg',
    'inhibitory-activity':'shape-library-markers-t-bar-svg',
    'unspecified':'shape-library-markers-none-svg',
    'activity':'shape-library-markers-arrow-svg',
    'mim-branching-left':'shape-library-markers-mim-branching-left-svg',
    'mim-branching-right':'shape-library-markers-mim-branching-right-svg',
    'mim-necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'mim-binding':'shape-library-markers-mim-binding-svg',
    'mim-conversion':'shape-library-markers-mim-conversion-svg',
    'mim-stimulation':'shape-library-markers-mim-stimulation-svg',
    'mim-modification':'shape-library-markers-mim-modification-svg',
    'mim-catalysis':'shape-library-markers-mim-catalysis-svg',
    'mim-inhibition':'shape-library-markers-mim-inhibition-svg',
    'mim-cleavage':'shape-library-markers-mim-cleavage-svg',
    'mim-covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'mim-transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'mim-gap':'shape-library-markers-mim-gap-svg',
    't-bar':'shape-library-markers-t-bar-svg',
    'none':'shape-library-markers-none-svg'
  };

  var colorsAvailable = {
    'shape-library-markers-arrow-svg':['default'],
    'shape-library-markers-mim-necessary-stimulation-svg':['default'],
    'shape-library-markers-mim-binding-svg':['default'],
    'shape-library-markers-mim-conversion-svg':['default'],
    'shape-library-markers-mim-stimulation-svg':['default'],
    'shape-library-markers-mim-modification-svg':['default'],
    'shape-library-markers-mim-catalysis-svg':['default'],
    'shape-library-markers-mim-inhibition-svg':['default'],
    'shape-library-markers-mim-cleavage-svg':['default'],
    'shape-library-markers-mim-covalent-bond-svg':['default'],
    'shape-library-markers-mim-transcription-translation-svg':['default'],
    'shape-library-markers-mim-gap-svg':['default'],
    'shape-library-markers-t-bar-svg':['default'],
    'shape-library-markers-mim-branching-left-svg':['default'],
    'shape-library-markers-mim-branching-right-svg':['default'],
    'shape-library-markers-none-svg':['default']
  };

  function appendCustom(uniqueMarkerShapeUri, callback) {
    var idStub = strcase.paramCase(uniqueMarkerShapeUri)
    var startId = idStub + '-start-default';
    var endId = idStub + '-end-default';
    var markerStart = svg.select('defs').select('#' + startId);

    markerStart = svg.select('defs').append('marker')
    .attr('id', startId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUri, markerStart, startId, false);

    var markerEnd = svg.select('defs').select('#' + endId);
    markerEnd = svg.select('defs').append('marker')
    .attr('id', endId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUri, markerEnd, endId, true);

    callback(null);
  }

  function processSvg(uniqueMarkerShapeUri, marker, markerId, rotate){
    d3.xml(uniqueMarkerShapeUri, 'image/svg+xml', function(svgXml) {
      var newMarker = d3.select(svgXml.documentElement);
      var width = newMarker.attr('width');
      var height = newMarker.attr('height');
      var markerClass = newMarker.attr('class');
      var refXstart = newMarker.attr('refXstart');                                              
      var refYstart = newMarker.attr('refYstart');
      var refXend = newMarker.attr('refXend');
      var refYend = newMarker.attr('refYend');  
      var viewBox = newMarker.attr('viewBox');

      marker.attr('viewBox', viewBox)
      .attr('markerWidth', width)
      .attr('markerHeight', height)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto');

      if (rotate){
	//end marker
        marker.attr('refX', refXend)
        .attr('refY', refYend);
        marker.append('g')
        .attr('id', 'g-' + markerId)
        .attr('class', markerClass)
	.attr('transform', 'rotate(180, '+width/2+', '+height/2+')'); 
/*        .attr('style', ' -webkit-transform: rotate(180deg); -webkit-transform-origin: 50% 50%; '
			+ '-o-transform: rotate(180deg); -o-transform-origin: 50% 50%; '
			+ '-moz-transform: rotate(180deg); -moz-transform-origin: 50% 50%; '
			+ '-ms-transform: rotate(180deg); -ms-transform-origin: 50% 50%; '
			+ 'transform: rotate(180deg); transform-origin: 50% 50%; '
        );
*/      } else {
	//start marker
        marker.attr('refX', refXstart)
        .attr('refY', refYstart);

        marker.append('g')
        .attr('id', 'g-' + markerId)
        .attr('class', markerClass);
      }

      var g = document.querySelector('#' + 'g-' + markerId);
      var newMarkerChildren = newMarker[0][0].childNodes;
      do {
        g.appendChild(newMarkerChildren[0]);
      } while (newMarkerChildren.length > 0);
    });
  }

//    }
//    else {
      // note that HTML uses 'img' while SVG uses 'image'
      // we need to get the dimensions of the image we are adding to the new symbol,
      // so we'll create an img element in HTML to check width and height
      // then we'll append an image element to the SVG symbol

/*
 * could also look at using SVG image tags for this, like so:
	<marker id="mim-binding-start-black" 
	class="default-fill" 
	stroke="black"
	markerHeight="12"
	markerWidth="12"
	markerUnits="strokeWidth"
	orient="auto"
	refX="0" refY="6"
	viewBox="0 0 12 12">
  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-binding.svg" x="0" y="0" width="12" height="12"></image>
	</marker>
//*/
/*
      img = document.createElement('img');
      img.id = idStub;
      img.src = uniqueMarkerShapeUri;
      img.onload = function() {
        var width = this.width;
        var height = this.height;
        markerStart = svg.select('#' + this.id + '-start-default')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', 6);

        markerStart.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('externalResourcesRequired', "true");

        markerEnd = d3.select('svg').select('defs').select('#' + this.id + '-end-default')
        .attr('id', endId)
        .attr('viewBox', -1*width + ' ' + -1*height + ' ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', -1*height/2);
        var g = markerEnd.append('g')
        .attr('id', 'g-' + endId)
        .attr('style', '-webkit-transform: rotate(180deg); -webkit-transform-origin: 50% 50%;');
        // TODO the transform attribute used is specific to chrome. we need ot add the transform attributes for other browsers
        // check for this on MDN.

        g.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('externalResourcesRequired', "true");
        callback(null);
      }
    }
  }
*/

  function loadAllCustom(thisSvg, customMarkers, callback) {
    svg = thisSvg;
    var image = null;
    var img = null;
    var marker = null;
    var dimensions = null;
    var dimensionSet = [];

    var semanticName;
    var markerUri;
    var paramCaseUri;
    var uniqueMarkerShapeUris = [];
    customMarkers.forEach(function(customMarker){
      semanticName = customMarker.semanticName;
      markerUri = customMarker.uri;
      paramCaseUri = strcase.paramCase(markerUri);
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[semanticName] = paramCaseUri;
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[paramCaseUri] = ['default'];
      if (uniqueMarkerShapeUris.indexOf(markerUri) === -1) {
        uniqueMarkerShapeUris.push(markerUri);
      }
    });

    async.each(uniqueMarkerShapeUris, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function appendNonDefaultColorMarkerBothEnds(svg, markerIdStub, color, callback) {
    appendNonDefaultColorMarker(svg, markerIdStub, 'start', color, function() {
      appendNonDefaultColorMarker(svg, markerIdStub, 'end', color, function() {
        pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerIdStub].push(color);
        callback();
      })
    })
  }

  function appendNonDefaultColorMarker(svg, markerIdStub, position, color, callback) {
    var defaultId = markerIdStub + '-' + position + '-default';
    var marker = pathvisiojs.utilities.cloneNode('#' + defaultId);

    var defaultMarker, refX, refY, viewBox, viewBoxElements;
    if (position === 'end') {
      defaultMarker = d3.select('#' + markerIdStub + '-'+position+'-default');
      refX = parseFloat(defaultMarker.attr('refX'));
      refY = parseFloat(defaultMarker.attr('refY'));
      viewBox = defaultMarker.attr('viewBox');
      if (!!viewBox) {
        viewBoxElements = viewBox.split(' ');
        marker.attr('viewBox', viewBox); 
      }
      marker.attr('refX', refX)
      marker.attr('refY', refY)
    }

    // define style of marker element's SVG

    var markerContents = marker.select("g");
    var markerStyle = markerContents.attr('style') || '';
    if (markerContents.attr('class').match(/default-stroke-color/)) {
      markerStyle += 'stroke:#' + color + '; ';
    }

    if (markerContents.attr('class').match(/default-fill-color/)) {
      markerStyle += 'fill:#' + color + '; ';
    }

    var markerId = markerIdStub + '-' + position + '-' + color;
    marker.attr('id', markerId);
    markerContents.attr('id', strcase.paramCase('g-' + markerId));
    markerContents.attr('style', markerStyle);

    callback(markerId);
  }
 
  return {
    appendNonDefaultColorMarkerBothEnds:appendNonDefaultColorMarkerBothEnds,
    loadAllCustom:loadAllCustom,
    semanticNameToIdMapping:semanticNameToIdMapping,
    colorsAvailable:colorsAvailable
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.edge.point = function(){
  'use strict';

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

  function getGraphRef(pathway, point) {
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

  function getCoordinates(pathway, point) {
    if (!pathway || !point) {
      return console.warn('Error: Missing input parameters.');
    }

    var coordinates = {};
    var edgeTerminusRef = getGraphRef(pathway, point);
    if (edgeTerminusRef.type !== 'anchor') {
      if (edgeTerminusRef.type === 'unconnected') {
        coordinates.x = point.x;
        coordinates.y = point.y;

      }
      else {
        if (edgeTerminusRef.type === 'node') {
          coordinates = pathvisiojs.view.pathwayDiagram.svg.node.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathvisiojs.view.pathwayDiagram.svg.node.groupNode.getDimensions(pathway, edgeTerminusRef.groupId);
            coordinates = pathvisiojs.view.pathwayDiagram.svg.node.getPortCoordinates(groupDimensions, point.relX, point.relY);
          }
          else {
            return 'error';
          }
        }
      }
    }
    else {
      var path = document.select("#interaction-" + edgeTerminusRef.edge.graphId)[0][0];
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
    isTwoPointElbow:isTwoPointElbow
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.edge.path = function(){	
  'use strict';

  function getPath(edge) {
    var path;
    var type = edge.ConnectorType;

    if (type == 'Straight'){
      if (edge.Point.length == 2) {
        return svgLine(edge.Point);
      }
      else {
        // TODO throw errors or use console.warn instead of using console.log
        console.log("Too many points for a straight line!");
        return null;
      }
    }

    else if (type == 'Segmented') {
      return svgLine(edge.Point);
    }

    else if (type == 'Elbow'){
      return svgLine(calcPathpoints(edge.Point));
    }

    else if (type == 'Curved'){
      return svgCurve(calcPathpoints(edge.Point));
    }

    else {
      console.log("Unknown connector type: " + type);
      return null;
    }
  }

  function calcPathpoints(p){
    //check to see if all waypoints are provided
    if (p.length == 2) {
      p = calcAllWaypoints(p);
    }

    var ppts = [];

    //first path point is start
    ppts[0] = p[0];

    //intermediate path points
    var axis = getAxis(p[0]); //TODO: account for starting on an anchor..
    var i;
    for (i=1; i<p.length; i++){ 
      var dy = p[i].y - p[i-1].y;
      var dx = p[i].x - p[i-1].x;

      if (axis == 1){ //Vertical
        ppts[i] = {x:p[i-1].x,y:p[i-1].y+dy};
      } else { //Horizontal
        ppts[i] = {x:p[i-1].x+dx,y:p[i-1].y};
      }
      axis = (axis+1)%2;  //toggle 1|0
    }

    // final path point is end
    ppts[p.length] = p[p.length-1];

    return ppts; 
  }

  function calcAllWaypoints(p) {
    var wptCount = getNumWaypoints(p);
    var offset = 20;
    var start = p[0];
    var end = p[1];

    var wpts = [];

    // first waypoint is start
    wpts[0] = start;

    // calc new waypoints	
    if (wptCount == 0) {
      //done!
    }
    else if (wptCount == 1) {
      wpts[1] = calcWaypoint(start, end, getAxis(start), getDir(end));
    } else if (wptCount == 2){
      wpts[1] = calcWaypoint(start, {x:(end.x + offset * getDir(end)), y:(end.y + offset * getDir(end))}, getAxis(start), getDir(start));
      wpts[2] = calcWaypoint(end, wpts[1], getAxis(end), getDir(end));
    } else if (wptCount == 3){
      wpts[2] = {x:(start.x + (end.x - start.x)/2), y:(start.y + (end.y - start.y)/2)};
      wpts[1] = calcWaypoint(start, wpts[2], getAxis(start), getDir(start));
      wpts[3] = calcWaypoint(end, wpts[2], getAxis(end), getDir(end));
    } else {
      console.log("Too many waypoint estimated!!!");
    }

    // final waypoint is end
    wpts[wptCount+1] = end;

    //console.log(wptCount);
    //console.log(wpts);

    return wpts;
  }

  function calcWaypoint(start, end, axis, dir){
    var offset = 20;
    var x = 0;
    var y = 0;
    if (axis == 1){ //Vertical
      x = start.x + (end.x - start.x)/2;
      y = start.y + offset * dir;
    } else {  //Horizontal
      x = start.x + offset * dir;
      y = start.y + (end.y - start.y)/2;
    }
    return {x:x, y:y};
  }

  function getNumWaypoints(pts){
    var start = pts[0];
    var end = pts[1];

    var leftToRight = sign(end.x - start.x) > 0; 
    var left = leftToRight ? start : end;
    var right = leftToRight ? end : start;

    var leftIsBottom = sign(left.y - right.y) < 0; 
    var z = leftIsBottom ? 1 : 0;
    var x = leftToRight ? getSide(start) : getSide(end);
    var y = leftToRight ? getSide(end) : getSide(start);

    var wptMatrix = [
      [
      [ 1, 1 ],
      [ 2, 2 ],
      [ 1, 3 ],
      [ 0, 2 ]
    ],
    [
      [ 2, 0 ],
      [ 1, 1 ],
      [ 0, 2 ],
      [ 1, 1 ],
    ],
    [
      [ 3, 1 ],
      [ 2, 2 ],
      [ 1, 1 ],
      [ 2, 0 ],
    ],
    [
      [ 2, 2 ],
      [ 3, 3 ],
      [ 2, 2 ],
      [ 1, 1 ],
    ]
    ]

    return wptMatrix[x][y][z];
  }

  function sign(x) { 
    return x ? x < 0 ? -1 : 1 : 0; //caution: sign("0") -> 1 
  };

  function getSide(p){
    if(Math.abs(p.RelX) > Math.abs(p.RelY)) {
      if(p.RelX > 0) {
        return 1; //East
      } else {
        return 3; //West
      }
    } else {
      if(p.RelY > 0) {
        return 2; //South
      } else {
        return 0; //North
      }
    }
  }

  function getAxis(p) {
    if (Math.abs(p.RelX) > Math.abs(p.RelY)){
      return 0; // Y-Axis; Vertical
    } else {
      return 1; // X-Axis; Horzontal
    }
  }

  function getDir(p){ 
    if(Math.abs(p.RelX) > Math.abs(p.RelY)) {
      if(p.RelX > 0) {
        return 1; //Right
      } else {
        return -1; //Left
      }
    } else {
      if(p.RelY > 0) {
        return 1; //Down
      } else {
        return -1; //Up
      }
    }
  }

  //for generating line segments through a path of points (pathpoints, not waypoints)
  var svgLine = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  .interpolate("linear");

  //for generating bezier curves through a path of points (pathpoints, not waypoints)
  var svgCurve = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  .interpolate("basis");

  return {
    getPath:getPath
  };
}();
;

// TODO remove controls that don't work with this element
// This code is for the HTML img element. It displays the
// diagram as a PNG, JPG, GIF, etc.

pathvisiojs.view.pathwayDiagram.img = function(){
  'use strict';

  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }
    var container = args.container, //a d3 selection corresponding to the containing element in the parent document
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      fitToContainer = args.fitToContainer,
      imgUri = args.renderableSourceDataElement.uri;

    if (!imgUri) {
      console.warn('No uri specified for sourceData element.'); //TODO decide whether this should warn or throw an error.
      imgUri = args.renderableSourceDataElement.uri || pathvisiojs.config.diagramNotAvailableIconUri;
    }

    loadImage(
      imgUri,
      function (img) {
        if (img.type === "error") {
          console.warn("Error loading image " + imgUri); //TODO decide whether this should warn or throw an error.
          loadImage(
            pathvisiojs.config.diagramNotAvailableIconUri,
            function (img) {
              //changing from d3 selection to html element
              container[0][0].appendChild(img);
              callback(null, img);
            },
            {
              maxWidth: containerWidth,
              maxHeight: containerHeight
            }
          );
        }
        else {
          //changing from d3 selection to html element
          container[0][0].appendChild(img);
          //TODO this should go into the CSS file somehow, but be careful not to mess up the SVG version
          img.setAttribute('style', 'margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;')
          callback(null, img);
        }
      },
      {
        maxWidth: containerWidth,
        maxHeight: containerHeight,
        //canvas: true,
        contain: fitToContainer
        //crossOrigin:'Anonymous' // I thought this would allow CORS images, but it actually does not.
      }
    );
  }

  /*
  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }

    var container = args.container,
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      imgUri = args.renderableSourceDataElement.uri || pathvisiojs.config.diagramNotAvailableIconUri,
      img,
      fitScreenScale;
      
      console.log(imgUri);

      img = document.createElement('img');
      img.src = imgUri;
      img.onload = function() {
        console.log(this);
        insertImage(container, containerWidth, containerHeight, img, imgUri, callback);
      }
      img.onerror = function() {
        img.src = pathvisiojs.config.diagramNotAvailableIconUri;
        img.onload = function() {
          console.log(this);
          insertImage(container, containerWidth, containerHeight, img, imgUri, callback);
          callback(null);
        }
      };
  }

  function insertImage(container, containerWidth, containerHeight, img, imgUri, callback) {
        var imgWidth = parseFloat(img.width);
        var imgHeight = parseFloat(img.height);
        var fitScreenScale = Math.min((containerWidth/imgWidth), (containerHeight/imgHeight));
        container.append('img')
        .attr('id', 'pathvisiojs-pathway-img')
        .attr('src', imgUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('style', 'position:relative; left:'
              + (containerWidth - imgWidth * fitScreenScale)/2 + 'px; '
              + 'top:' + (containerHeight - imgHeight * fitScreenScale)/2 + 'px; ')
        .attr('width', imgWidth * fitScreenScale)
        .attr('height', imgHeight * fitScreenScale);
        callback(null);
  }
  //*/

  return {
    load:load
  };
}();
