//! pathvisiojs 0.8.0
//! Built on 2014-01-21
//! https://github.com/wikipathways/pathvisiojs
//! License: http://www.apache.org/licenses/LICENSE-2.0/

var pathvisioNS = pathvisioNS || {};
pathvisioNS["tmp/pathvisiojs.html"] = '<div id="pathvisiojs-container" style="width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; position: absolute; ">\n\n    <!-- **********************************************************************\n    Pathway Container (JavaScript inserts pathway image inside this div)\n    *********************************************************************** -->\n\n    <div id="pathway-container" style="width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; " class="y-mid">\n\n      <svg id="pathway-svg" version="1.1" baseProfile="full" xmlns="http://www.w3.org/1999/xlink" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" width="500px" height="500px" style="display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; " preserveAspectRatio="xMidYMid" onmouseup="svgPanZoom.handleMouseUp(evt)" onmousedown="svgPanZoom.handleMouseDown(evt)" onmousemove="svgPanZoom.handleMouseMove(evt)" xlink="http://www.w3.org/1999/xlink" ev="http://www.w3.org/2001/xml-events">\n\n        <g>\n        <title>pathvisiojs pathway diagram</title>\n        <desc>\n          This SVG file contains all the graphical elements (markers and symbols in defs as well as\n          style data) used by the program pathvisiojs, which has two components: \n          1) a viewer for transforming GPML biological pathway data into an SVG visual representation and \n          2) an editor for creating both views and models for biological pathways.\n        </desc>\n        </g>\n        <defs>\n\n          <filter id="highlight" width="150%" height="150%">\n            <feOffset result="offOut" in="SourceGraphic" dx="30" dy="30"></feOffset>\n              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"></feGaussianBlur>\n            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\n          </filter>\n\n        <marker id="shape-library-markers-arrow-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-arrow-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-arrow-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-arrow-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="16" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 8, 6)">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-start-default" class="default-fill-color solid-stroke">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-end-default" class="default-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.1" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.1" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10.5" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="9" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="10" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 15)">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="20.5" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 12)">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-start-default" class="board-fill-color solid-stroke">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0.5" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-end-default" class="board-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0.5" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10.5" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-none-svg-start-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-none-svg-start-default" class="board-fill-color board-stroke-color node shape">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-none-svg-end-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-none-svg-end-default" class="board-fill-color board-stroke-color node shape" transform="rotate(180, 0, 0)">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.9" y="5.3" width="2.6" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.9" y="5.3" width="2.6" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-start-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.9" y="5.3" width="2.6" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-end-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="3.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 2, 6)">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.9" y="5.3" width="2.6" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><style type="text/css">	svg {\n		color-interpolation: auto;\n		image-rendering: auto;\n		shape-rendering: auto;\n		vector-effect: non-scaling-stroke;\n                background: white;\n	/* removed fill and stroke since they override marker specs */\n	/*	fill: white;\n    		stroke: black; */\n	}\n\n	/* default color for pathway elements */\n	.default-fill-color {\n		fill: black; \n	}\n	.default-stroke-color {\n		stroke: black;\n	}\n	\n	/* default color of the background drawing board */ 	\n	.board-fill-color {\n		fill: white;\n	}\n	.board-stroke-color {\n		stroke: white;\n	}\n\n	.text-area {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: middle;\n		font-size: 10px;\n		fill: black;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.citation {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: top;\n		font-size: 7px;\n		fill: #999999;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.info-box {\n		font-family: Sans-Serif;\n		font-size: 10px;\n		fill: black;\n		stroke: none;\n		text-align: left;\n		vertical-align: top;\n	}\n\n	.info-box-item-property-name {\n		font-weight: bold;\n	}\n\n	.info-box-item-property-value {\n	}\n\n	.data-node {\n		text-align: right;\n		fill-opacity: 1;\n		fill: white;\n		stroke: black;\n		stroke-width: 1;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n    		pointer-events:auto;\n	}\n	\n	.has-xref:hover {\n		cursor: pointer;\n	}\n\n	.data-node.gene-product {\n	}\n\n	.metabolite {\n		stroke: blue;\n	}\n\n	.data-node.metabolite &gt; .text-area {\n		fill: blue;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.data-node.pathway {\n		stroke: none;\n		fill-opacity: 0;\n	}\n\n	.data-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		fill-opacity: 1;\n		font-size: 12px;\n		font-weight: bold;\n	}\n\n	.data-node.protein {\n	}\n\n	.data-node.rna {\n	}\n\n	.data-node.unknown {\n	}\n\n	.label {\n		stroke: null;\n		stroke-width: 0;\n		fill-opacity: 0;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape {\n		fill-opacity: 0;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape.none {\n		fill: none;\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	g.group-node &gt; .shape {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node &gt; .text-area {\n		fill-opacity: 0.4;\n		font-family: Serif, Times;\n		font-size: 32px;\n		fill: black;\n		stroke-width: 0;\n		font-weight: bold;\n  	}	\n\n	.group-node.none {\n		fill: rgb(180,180,100);\n		stroke-dasharray: 5,3;\n	}\n\n	.group-node.none &gt; .text-area {\n		display: none;\n  	}	\n\n	/*.group-node.none:hover {\n		fill: rgb(255,180,100);\n		fill-opacity: 0.05;\n	}*/\n\n	.group-node.group {\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	.group-node.group &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.group:hover {\n		fill: rgb(0,0,255);\n		stroke-width: 1px;\n		stroke-dasharray: 5,3;\n		stroke: gray;\n		fill-opacity: 0.1;\n	}*/\n\n	.group-node.complex {\n		fill: rgb(180,180,100);\n	}\n\n	.group-node.complex &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.complex:hover {\n		fill: rgb(255,0,0);\n		fill-opacity: 0.05;\n	}*/	\n\n  	.group-node.pathway {\n		fill: rgb(0,255,0);\n		stroke-dasharray: 5,3;\n	}\n	/*.group-node.pathway:hover {\n		fill: rgb(0,255,0);\n		fill-opacity: 0.2;\n	}*/\n	.group-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		stroke: rgb(20,150,30);\n  }\n\n  .cellular-component {\n		fill-opacity: 0;\n		stroke: silver;\n	}\n\n  .graphical-line {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	.interaction {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n  .marker-end {\n    -webkit-transform: rotate(180deg);\n    -webkit-transform-origin: 50% 50%;\n\n    -o-transform: rotate(180deg); \n    -o-transform-origin: 50% 50%;\n\n    transform: rotate(180deg);\n    transform-origin: 50% 50%;\n  }\n\n	.solid-stroke {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n	.dashed-stroke {\n		stroke-dasharray: 5,3;\n	}\n\n  .highlighted-node {\n		fill: yellow;\n    fill-opacity: 0.2;\n		stroke: orange; \n    stroke-width: 3px;\n  }\n</style></defs>\n\n        <g id="viewport" transform="matrix(0.8630183945977313,0,0,0.8630183945977313,10,20)">\n        </g>\n\n      </svg>\n\n    \n      \n    </div>\n    \n    <div id="typeahead" style="position: absolute; top: 5px; right: 5px;">\n    <!-- **********************************************************************\n      Highlight Element by Label Control\n      *********************************************************************** -->\n\n      <span class="twitter-typeahead" style="position: relative; display: inline-block;"><input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled="" style="position: absolute; top: 0px; left: 0px; border-color: transparent; box-shadow: none; background-attachment: scroll; background-clip: border-box; background-color: rgb(255, 255, 255); background-image: none; background-origin: padding-box; background-size: auto; background-position: 0% 0%; background-repeat: repeat repeat;"><input id="highlight-by-label-input" placeholder="Enter node name to highlight." role="textbox" aria-autocomplete="list" aria-haspopup="true" class="tt-query" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top; background-color: transparent;"><span style="position: absolute; left: -9999px; visibility: hidden; white-space: nowrap; font-family: \'Lucida Grande\'; font-size: 12px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;"></span><span class="tt-dropdown-menu" style="position: absolute; top: 100%; left: 0px; z-index: 100; display: none;"></span></span>\n\n      </div> \n     \n   \n      <!-- **********************************************************************\n      Pan Zoom Control\n      see http://bumbu.github.io/cytoscape.js/debug/ for example of cytoscape.js \n      *********************************************************************** -->\n\n    <!--  <div id="pan-zoom-control" class="ui-cytoscape-panzoom">\n        <div class="ui-cytoscape-panzoom-zoom-in ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-plus"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-zoom-out ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-minus"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-reset ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-resize-full"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-slider">\n          <div class="ui-cytoscape-panzoom-slider-background">\n          </div>\n          <div class="ui-cytoscape-panzoom-slider-handle" style="top: 42.80000001192093px;">\n            <span class="icon icon-minus"></span>\n          </div>\n          <div class="ui-cytoscape-panzoom-no-zoom-tick" style="top: 42.80000001192093px;">\n          </div>\n        </div>\n        <div class="ui-cytoscape-panzoom-panner">\n          <div class="ui-cytoscape-panzoom-panner-handle">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-up ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-down ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-left ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-right ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-indicator" style="display: none; left: 22.424611085682006px; top: 0.12287108520014556px; background-color: rgb(127, 127, 127); background-position: initial initial; background-repeat: initial initial;">\n          </div>\n        </div>\n      </div>\n	-->\n      <!-- **********************************************************************\n      Fullscreen Control \n      *********************************************************************** -->\n\n      <div id="fit-to-screen-control" style="position: absolute; bottom: 5px; right: 8px;">                           \n        <img class="icon-screenshot" style="color:#aaa" src="../src/img/fitscreen_icon.png">                                                        \n      </div>\n    <!--  <div id="fullscreen-control" style="position: absolute; bottom: 5px; right: 5px;">\n        <i class="icon-fullscreen" style="color:#aaa"></i>\n      </div>\n    -->\n\n    <div id="viewer-toolbar" style="position: absolute; top: 0px; right: 0px; height: inherit">\n    </div>\n      \n    <!-- **********************************************************************\n    Details Frame\n    *********************************************************************** -->\n\n    <div id="annotation" class="annotation ui-draggable" style="visibility: hidden; position: absolute; right: 75px; top: 100px;">\n      <header class="annotation-header">\n      <span id="annotation-move" class="annotation-header-move">\n        <i class="icon-move"></i>\n      </span>\n      <span class="annotation-header-close">                                                                                    \n        <i class="icon-remove"></i>                                                                                                                             \n      </span>   \n      <span id="annotation-header-text" class="annotation-header-text">\n        Header\n      </span> \n      <span id="annotation-header-search" class="annotation-header-search" title="Search for pathways containing \'Header Text\'">\n        <a href="http://wikipathways.org//index.php?title=Special:SearchPathways">\n          <i class="icon-search" style="color:blue; font-size:50% ; text-decoration:none"></i>\n        </a>\n      </span>\n      <div id="annotation-description" class="annotation-description">\n        <h2>description</h2>\n      </div>\n      </header>\n      <span class="annotation-items-container">\n        <ul id="annotation-items-container">\n          <!-- List items inside this ul element are generated automatically by JavaScript.\n          Each item will be composed of a title and text. The text can be set to be an href.\n          You can edit the styling of the title by editing CSS class "annotation-item-title"\n          and the styling of the text by editing CSS class "annotation-item-text.\n          -->\n        </ul>\n      </span>\n    </div>\n  </div>\n';
;

"use strict"

var pathvisiojs = function(){

  var svg, pathway, args;



  function load(args) {
    console.log(args);

    // for now, load will just load a visual representation of a pathway, but
    // this could change in the future

    // ********************************************
    // Check that required parameters are present
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified as container.');
    }
    if (!args.sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    pathvisiojs.view.pathwayDiagram.load(args);
  }

  return {
    load:load
  };
}();
;

"use strict";

var pathvisiojs = pathvisiojs || {};
pathvisiojs.config = function() {
  var gpmlSourceUriStub = function() {
    if(typeof console !== "undefined") {
      console.warn('WikiPathways does not yet support CORS, so until we get CORS support, we are using Pointer as a proxy to enable CORS for getting GPML.');
    }
    return 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=';
  }

  var bridgedbLinkOutsUrlStub = function() {
    return 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb/bridgedb.php/';
  }

  var bridgedbDatasources = function() {
    return '../external-data/bridgedb/datasources.txt';
  }

  var diagramNotAvailableImageUri = function() {
    // TODO update this link to a URL we control
    return 'http://upload.wikimedia.org/wikipedia/commons/3/3b/Picture_Not_Yet_Available.png';
  }

  var pngDiagramUriStub = function() {
    return 'http://www.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
  }

  var pathwaySearchUriStub = function() {
    return 'http://wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&query=';
  }

  return {
    gpmlSourceUriStub:gpmlSourceUriStub,
    bridgedbLinkOutsUrlStub:bridgedbLinkOutsUrlStub,
    bridgedbDatasources:bridgedbDatasources,
    pngDiagramUriStub:pngDiagramUriStub,
    diagramNotAvailableImageUri:diagramNotAvailableImageUri,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();
;

pathvisiojs.utilities = function(){

  // from http://stackoverflow.com/questions/2454295/javascript-concatenate-properties-from-multiple-objects-associative-array

  function collect() {
    var ret = {};
    var len = arguments.length;
    for (var i=0; i<len; i++) {
      for (p in arguments[i]) {
        if (arguments[i].hasOwnProperty(p)) {
          ret[p] = arguments[i][p];
        }
      }
    }
    return ret;
  }

  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  /**
   * From http://stackoverflow.com/questions/7770235/change-text-direction-of-textbox-automatically
   * What about Chinese characters that go top to bottom?
   */

  function getTextDirection(text) {

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

  function strToHtmlId(str) {
    var re = /\W/gi;
    var id = str.replace(re, "");
    return id;
  }

  function isUrl(str) {

    // from https://gist.github.com/samuelcole/920312

    var urlPattern = /(?:(?=[\s`!()\[\]{};:'".,<>?«»“”‘’])|\b)((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/|[a-z0-9.\-]+[.](?:com|org|net))(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))*(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]|\b))/gi;
    return urlPattern.test(str);
  }

  function splitStringByNewLine(str) {

    // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.

    return str.split(/\r\n|\r|\n/g);
  }

  // this both clones a node and inserts it at the same level of the DOM
  // as the element it was cloned from.
  // it returns a d3 selection of the cloned element
  function cloneNode(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  }

  // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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

  function isWikiPathwaysId(data) {
    data = data.trim();
    if (data.substr(0,2).toUpperCase() === 'WP' && isNumber(data.substr(data.length - 1))) {
      return true;
    }
    else {
      return false;
    }
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

  var isOdd = function(num) { return num % 2;}

  return{
    collect:collect,
    isUrl:isUrl,
    isIE:isIE,
    splitStringByNewLine:splitStringByNewLine,
    getUrlParam:getUrlParam,
    cloneNode:cloneNode,
    clone:clone,
    convertToArray:convertToArray,
    getWindowDimensions:getWindowDimensions,
    moveArrayItem:moveArrayItem,
    isOdd:isOdd,
    isWikiPathwaysId:isWikiPathwaysId,
    isNumber:isNumber,
    strToHtmlId:strToHtmlId,
    getObjectType:getObjectType,
    getTextDirection:getTextDirection
  };
}();



;

pathvisiojs.data = function(){

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var mimeType = sourceData.mimeType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!mimeType) {
      return new Error('No mimeType specified.');
    }

    // TODO handle if sourceData.object

    if (mimeType === 'application/xml+gpml') {
      pathvisiojs.data.gpml.get(sourceData, function(gpml) {
        pathvisiojs.data.gpml.toRenderableJson(gpml, uri, function(json) {
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

  var bridgedbLinkOutsUrlStub = pathvisiojs.config.bridgedbLinkOutsUrlStub();
  var bridgedbDatasources = pathvisiojs.config.bridgedbDatasources();

  function getXrefAnnotationDataByDataNode(singleSpecies, id, datasource, label, desc, callback) {
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

  function getDataSourceRowByName(dataSourceName, dataSources) {
    var regexp = /[^\w]/gi;
    var dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName === dataSourceName; })[0];
    if (!dataSourceRow) {
      dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName.replace(regexp, '').toLowerCase() === dataSourceName.replace(regexp, '').toLowerCase(); })[0];
    }
    return dataSourceRow;
  }

  function getDataSources(callback) {
    d3.tsv(bridgedbDatasources)
    .response(function(request) {
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {dataSourceName: d[0], systemCode: d[1], websiteUrl: d[2], linkoutPattern: d[3], exampleIdentifier: d[4], entityIdentified: d[5], singleSpecies: d[6], priority: d[7], uri: d[8], regex: d[9], officialName: d[10]};
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  function getXrefAliases(singleSpecies, systemCode, xRefId, callback) {
    var bridgedbUrl = bridgedbLinkOutsUrlStub + encodeURIComponent(singleSpecies) + '/xrefs/' + encodeURIComponent(systemCode) + '/' + encodeURIComponent(xRefId);
    console.log(bridgedbUrl);
    d3.tsv(bridgedbUrl)
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

pathvisiojs.data.bridgedb.dataSources = [
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

pathvisiojs.data.biopax = function(){

  // TODO get ontology terms and other data

  function toRenderableJson(xmlBiopax, callback) {
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
    toRenderableJson:toRenderableJson
  };
}();

;

pathvisiojs.data.pathvisiojsJson = function(){

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var mimeType = sourceData.mimeType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!mimeType) {
      return new Error('No mimeType specified.');
    }

    // TODO handle if sourceData.object

    if (mimeType === 'application/xml+gpml') {
      pathvisiojs.data.gpml.get(sourceData, function(gpml) {
        pathvisiojs.data.gpml.toRenderableJson(gpml, uri, function(json) {
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

"use strict";
pathvisiojs.data.gpml = function(){

  var pathvisioDefaultStyleValues = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  }

  function get(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var mimeType = sourceData.mimeType;

    if ((!uri) && (!object)) {
      return new Error('No sourceData specified.');
    }
    if (!mimeType) {
      return new Error('No mimeType specified.');
    }

    if (mimeType === 'application/xml+gpml') {
      // TODO d3.xml doesn't seem to work with IE8
      d3.xml(uri, function(gpml) {
        callback(gpml);
      });
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

  function toRenderableJson(gpml, pathwayIri, callbackOutside){
    var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var pathway = {};
    pathway.xmlns = gpmlPathway.attr('xmlns');

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
              'dcterms':'http://purl.org/dc/terms/',
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
            pathvisiojs.data.gpml.biopaxRef.getAllAsRenderableJson(gpmlPathway, function(publicationXrefs) {
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
              pathvisiojs.data.biopax.toRenderableJson(xmlBiopax, function(jsonBiopax) {
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
                pathvisiojs.data.gpml.element.node.entityNode.dataNode.toRenderableJson(gpmlDataNode, pathwayIri, function(jsonDataNode) {
                  pathway.DataNode.push(jsonDataNode);
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
                pathvisiojs.data.gpml.element.node.entityNode.label.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel) {
                  pathway.Label.push(jsonLabel);
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
                pathvisiojs.data.gpml.element.node.entityNode.shape.toRenderableJson(gpmlShape, pathwayIri, function(jsonShape) {
                  pathway.Shape.push(jsonShape);
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
                pathvisiojs.data.gpml.element.node.groupNode.toRenderableJson(gpml, gpmlGroup, pathwayIri, function(jsonGroup) {
                  pathway.Group.push(jsonGroup);
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
                pathvisiojs.data.gpml.edge.graphicalLine.toRenderableJson(gpml, gpmlGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
                  pathway.GraphicalLine.push(jsonGraphicalLine);
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
                pathvisiojs.data.gpml.edge.interaction.toRenderableJson(gpml, gpmlInteraction, pathwayIri, function(jsonInteraction) {
                  pathway.Interaction.push(jsonInteraction);
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
          self.myPathway = pathway;
          jsonld.frame(pathway, groupsFrame, function(err, framedGroups) {
            console.log('err');
            console.log(err);
            console.log('framedGroups');
            console.log(framedGroups);
	  var unique = [];
          framedGroups['@graph'].forEach(function(jsonGroup) {
            // Some GPML files contain empty groups due to a PathVisio-Java bug. They are deleted
            // here because only groups that pass the test (!!jsonGroup.contains) are added to
            // the jsonGroups array, and the jsonGroups array overwrites pathway.Group.
            if (!!jsonGroup.contains) {
              pathvisiojs.data.gpml.element.node.groupNode.getGroupDimensions(jsonGroup, function(dimensions) {
                console.log('jsonGroup in gpml.js');
                console.log(jsonGroup);

                jsonGroup.x = dimensions.x;
                jsonGroup.y = dimensions.y;
                jsonGroup.width = dimensions.width;
                jsonGroup.height = dimensions.height;
                pathvisiojs.data.gpml.element.node.getPorts(jsonGroup, function(ports) {
		 if (unique.indexOf(jsonGroup.GroupId) == -1) { //exclude duplicates
                  jsonGroup.Port = ports;
                  jsonGroups.push(jsonGroup);
		  unique.push(jsonGroup.GroupId);
		 }
                });
              });
            }
          });
          pathway.Group = jsonGroups;
          self.myPathway = pathway;
          callbackOutside(pathway);
          });
        }
        else {
          self.myPathway = pathway;
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
    toRenderableJson:toRenderableJson,
    getLineStyle:getLineStyle,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson,
    gpmlColorToCssColor:gpmlColorToCssColor,
    setColorAsJson:setColorAsJson
  };
}();

// hack required because we call ...node.anchors.toRenderableJson() before we
// call the other ...node.toRenderableJson() methods
pathvisiojs.data.gpml.node = pathvisiojs.data.gpml.node || {};
;

"use strict";

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
  
pathvisiojs.data.gpml.element.toRenderableJson = function(gpmlElement, jsonElement, elementCallback) {
  jsonElement["@type"] = jsonElement["@type"] || [];
  jsonElement["@type"].push("element");

  pathvisiojs.data.gpml.biopaxRef.getAllAsRenderableJson(gpmlElement, function(publicationXrefs) {
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

"use strict";
pathvisiojs.data.gpml.text = function() {

  var pathvisioDefaultStyleValues = {
    'text':{
      'Align':null,
      'Valign':'Middle',
      'FontStyle':null,
      'FontName':null
    }
  }

  function toRenderableJson(gpmlNode, inputDefaultValues, textCallbackOutside) {
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
    toRenderableJson:toRenderableJson
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

"use strict";
pathvisiojs.data.gpml.biopaxRef = function(){

  function getAllAsRenderableJson(gpmlElement, callback) {
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
    getAllAsRenderableJson:getAllAsRenderableJson
  };
}();
;

"use strict";

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

pathvisiojs.data.gpml.element.node.toRenderableJson = function(gpmlNode, jsonNode, callback) {
  jsonNode["@type"] = jsonNode["@type"] || [];
  jsonNode["@type"].push("node");

  pathvisiojs.data.gpml.element.toRenderableJson(gpmlNode, jsonNode, function(jsonNode) {
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

"use strict";
pathvisiojs.data.gpml.element.node.groupNode = function() {

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
    groupContents.forEach(function(groupContent) {
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
      callback(dimensions);
    });
  }

  function toRenderableJson(pathway, gpmlGroup, pathwayIri, callbackOutside) {
    var jsonGroup = {},
      groupId,
      shapeType,
      groupType;

    var graphId = gpmlGroup.attr('GraphId') || ('id' + uuid.v4());
    jsonGroup.GraphId = graphId;
    groupId = gpmlGroup.attr('GroupId') || ('id' + uuid.v4());
    jsonGroup["@id"] = pathwayIri + groupId;
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
    pathvisiojs.data.gpml.text.toRenderableJson(gpmlGroup, pathvisioDefaultStyleValues, function(text) {
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
      pathvisiojs.data.gpml.element.node.toRenderableJson(gpmlGroup, jsonGroup, function(jsonGroup) {
        callbackOutside(jsonGroup);
      });
    });
  }

  return {
    toRenderableJson:toRenderableJson,
    getGroupDimensions:getGroupDimensions
  };
}();

;

"use strict";

// includes GPML elements of type Shape, Label and DataNode

pathvisiojs.data.gpml.element.node.entityNode = Object.create(pathvisiojs.data.gpml.element.node);

pathvisiojs.data.gpml.element.node.entityNode.setJsonRotationValue = function(jsonNode, currentGpmlRotationValue, defaultGpmlRotationValue) {
  if (currentGpmlRotationValue !== defaultGpmlRotationValue) {
    jsonNode.rotate = currentGpmlRotationValue * 180/Math.PI; //converting from radians to degrees
  }
  return jsonNode;
}

pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson = function(gpmlEntityNode, jsonEntityNode, pathvisioDefaultStyleValues, pathwayIri, EntityNodeCallback) {
  var graphId = gpmlEntityNode.attr('GraphId') || ('id' + uuid.v4());
  jsonEntityNode["@id"] = pathwayIri + graphId;
  jsonEntityNode.GraphId = graphId;

  var isContainedBy = gpmlEntityNode.attr('GroupRef');
  if (!!isContainedBy) {
    jsonEntityNode.isContainedBy = pathwayIri + isContainedBy;
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
    pathvisiojs.data.gpml.element.node.toRenderableJson(gpmlEntityNode, jsonEntityNode, function(jsonEntityNode) {
      EntityNodeCallback(jsonEntityNode, ports);
    });
  });
}
;

"use strict";

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

pathvisiojs.data.gpml.element.node.entityNode.dataNode.toRenderableJson = function(gpmlDataNode, pathwayIri, callbackInside) {
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

  pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson(gpmlDataNode, jsonDataNode, thisPathvisioDefaultStyleValues, pathwayIri, function(jsonDataNode) {
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
    pathvisiojs.data.gpml.text.toRenderableJson(gpmlDataNode, thisPathvisioDefaultStyleValues, function(text) {
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

"use strict";

pathvisiojs.data.gpml.element.node.entityNode.label = Object.create(pathvisiojs.data.gpml.element.node.entityNode);

pathvisiojs.data.gpml.element.node.entityNode.label.Rotation = null;
pathvisiojs.data.gpml.element.node.entityNode.label.Color = null;
pathvisiojs.data.gpml.element.node.entityNode.label.FillColor = null;
pathvisiojs.data.gpml.element.node.entityNode.label.FontSize = 10;
pathvisiojs.data.gpml.element.node.entityNode.label.FontWeight = null;

pathvisiojs.data.gpml.element.node.entityNode.label.toRenderableJson = function(gpmlLabel, pathwayIri, callback) {
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
  pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson(gpmlLabel, jsonLabel, pathvisiojs.data.gpml.element.node.entityNode.label, pathwayIri, function(jsonLabel) {
    pathvisiojs.data.gpml.text.toRenderableJson(gpmlLabel, pathvisiojs.data.gpml.element.node.entityNode.label, function(text) {
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

"use strict";
pathvisiojs.data.gpml.element.node.entityNode.shape = function(){

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

  function toRenderableJson(gpmlShape, pathwayIri, callback) {
    
    // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
    // Below we correct the GPMl so that the display in pathvisiojs will matches the display in PathVisio-Java.
    console.log('gpmlShape at first');
    console.log(gpmlShape);
    self.myGpmlShape = gpmlShape;
    var gpmlWidth, gpmlCenterX; 
    if (gpmlShape.select('Graphics').attr('ShapeType') === 'Triangle') {
      gpmlWidth = parseFloat(gpmlShape.select('Graphics').attr('Width'));
      gpmlCenterX = parseFloat(gpmlShape.select('Graphics').attr('CenterX'));
      gpmlShape.select('Graphics').attr('CenterX', gpmlCenterX + gpmlWidth * 0.27);
      gpmlShape.select('Graphics').attr('Width', gpmlWidth * 0.98);
      console.log('gpmlShape');
      console.log(gpmlShape);
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

    pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson(gpmlShape, jsonShape, thisPathvisioDefaultStyleValues, pathwayIri, function(jsonShape) {
      pathvisiojs.data.gpml.text.toRenderableJson(gpmlShape, thisPathvisioDefaultStyleValues, function(text) {
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
    toRenderableJson:toRenderableJson
  };
}();


;

"use strict"

pathvisiojs.data.gpml.node.anchor = function() {

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

  function toRenderableJson(gpmlParentElement, jsonParentElement, elementType, pathwayIri, callback) {
    var gpmlAnchors, gpmlAnchor, jsonAnchor, elementIri, graphId;
    if (elementType === 'edge') {
      gpmlAnchors = gpmlParentElement.selectAll('Anchor');
      if (gpmlAnchors[0].length > 0) {
        jsonParentElement.Anchor = [];
        gpmlAnchors.each(function() {
          jsonAnchor = {};
          gpmlAnchor = d3.select(this);
          graphId = gpmlAnchor.attr('GraphId') || ('id' + uuid.v4());
          elementIri = pathwayIri + graphId;
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
      throw new Error('anchor.toRenderableJson doesnt know how to handle anything other than edges as parent elements right now. handling other elements needs to be implemented.');
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
    toRenderableJson:toRenderableJson,
    getAllFromNode:getAllFromNode
  };
}();
;

"use strict";
pathvisiojs.data.gpml.edge = function(){

  var strokeStyleMappings = {
    'Broken': 'dashed'
  };

  function toRenderableJson(gpmlEdge, pathwayIri, callback) {
    var jsonAnchorEdge, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef;
    var jsonEdge = {};
    var graphId = gpmlEdge.attr('GraphId') || ('id' + uuid.v4());
    var elementIri = pathwayIri + graphId;
    jsonEdge['@id'] = elementIri;
    jsonEdge.GraphId = graphId;

    var containingGroupRef = gpmlEdge.attr('GroupRef');
    var isContainedBy;
    var dependsOn = [];
    if (!!containingGroupRef) {
      isContainedBy = jsonEdge.isContainedBy = pathwayIri + containingGroupRef;
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

        dependsOn.push(pathwayIri + point.attr('GraphRef'));

        pointObj.hasReference = pathwayIri + point.attr('GraphRef');
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

    pathvisiojs.data.gpml.node.anchor.toRenderableJson(gpmlEdge, jsonEdge, 'edge', pathwayIri, function(jsonEdge) {
      pathvisiojs.data.gpml.element.toRenderableJson(gpmlEdge, jsonEdge, function(jsonEdge) {
        callback(jsonEdge);
      });
    });
  }

  /*
     function toRenderableJson(gpmlEdge, jsonEdge, callback) {
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
     pathvisiojs.data.gpml.edge.point.toRenderableJson(d3.select(this), function(jsonPoint) {
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
toRenderableJson:toRenderableJson
};
}();
;

"use strict";
pathvisiojs.data.gpml.edge.interaction = function(){

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

  function toRenderableJson(gpml, gpmlInteraction, pathwayIri, callback) {
    var jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef, source, sourceId;
    pathvisiojs.data.gpml.edge.toRenderableJson(gpmlInteraction, pathwayIri, function(jsonInteraction) {
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
     function toRenderableJson(gpmlEdge, jsonEdge, callback) {
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
     pathvisiojs.data.gpml.edge.point.toRenderableJson(d3.select(this), function(jsonPoint) {
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
  toRenderableJson:toRenderableJson,
  getGpmlArrowHeadNameFromSemanticName:getGpmlArrowHeadNameFromSemanticName,
  getSemanticNameFromGpmlArrowHeadName:getSemanticNameFromGpmlArrowHeadName
};
}();
;

"use strict";
pathvisiojs.data.gpml.edge.graphicalLine = function(){

  //*
  //var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'arrow'
  };
  //*/

  function toRenderableJson(gpml, gpmlGraphicalLine, pathwayIri, callback) {
    var jsonAnchorGraphicalLine, anchor, jsonAnchor, points, jsonPoints, graphicalLineType, target, targetId, groupRef;
    pathvisiojs.data.gpml.edge.toRenderableJson(gpmlGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
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

      // TODO handle this properly. Right now, we can't render graphical lines with
      // connector type of elbow or curve.

      jsonGraphicalLine.ConnectorType = 'Straight';

      callback(jsonGraphicalLine);
    })
  }

  /*
  function toRenderableJson(gpmlEdge, jsonEdge, callback) {
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
        pathvisiojs.data.gpml.edge.point.toRenderableJson(d3.select(this), function(jsonPoint) {
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
    toRenderableJson:toRenderableJson
  };
}();
;

pathvisiojs.data.gpml.edge.point = function(){

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

  function toRenderableJson(gpmlPoint, callback) {
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
    toRenderableJson:toRenderableJson
  };
}();
;

pathvisiojs.view = pathvisiojs.view || {};

     
;

pathvisiojs.view.annotation = function(){
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
    	return pathvisiojs.config.pathwaySearchUriStub() + d.header;
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
      //debug//console.log('d annotationListItemsContainer');
      //debug//console.log(d);
      //if a single string, then assume special case: img src for loading gif
      if (typeof d.listItems[0] === 'string'){
	annotationDescription.append('br');
	annotationDescription.append('br');
	annotationDescription.append('img').attr('src', d.listItems[0]).attr('style', 'width: 20px');
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
    function render(organism, node) {
    }

    return {
      render:render
    };
}();
;

pathvisiojs.view.annotation.xRef = function(){
  var cachedAnnotationData = {};

  function render(organism, id, datasource, label, desc) {
    var data = getCachedAnnotationData(organism, id, datasource);
    if (data){
      //if cache, then use it
      pathvisiojs.view.annotation.render(data);
    }
    else {
      //else render immediate data and loading gif
      var data = {
          "header": label,
          "description": desc,
	  "listItems":["../src/img/loading.gif"] 
        };
      pathvisiojs.view.annotation.render(data);
      //then retrieve the bridgedb data
      var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
        setCachedAnnotationData(organism, id, datasource, annotationData);
	pathvisiojs.view.annotation.render(annotationData);
      });
    }
  }

  function getCachedAnnotationData(organism, id, datasource){
    return cachedAnnotationData[organism+id+datasource];
  }

  function setCachedAnnotationData(organism, id, datasource, data){
    cachedAnnotationData[organism+id+datasource] = data;
  }

  return {
    render:render
  };
}();
;

"use strict"

pathvisiojs.view.pathwayDiagram = function(){

  function getPreserveAspectRatioValues(preserveAspectRatio) {

    // this function uses SVG terminology, but it is intended to work with any graphical
    // file format (SVG, PNG, etc.)

    var results = {};
    if (!preserveAspectRatio.align) {
      results.align = preserveAspectRatio;
    }
    else {
      results.align = preserveAspectRatio.align;
    }

    if (results.align === 'none') {
      results.xAlign = 'x-mid';
      results.yAlign = 'y-mid';
    }
    else {
      results.meetOrSlice = 'meet';
      if (!!preserveAspectRatio.meetOrSlice) {
        results.meetOrSlice = preserveAspectRatio.meetOrSlice;
      }
      
      results.xAlign = 'x-' + results.align.substr(1, 3).toLowerCase();
      results.yAlign = 'y-' + results.align.substr(results.align.length - 3, 3).toLowerCase();
    }
    return results;
  }

  function fitElementWithinContainer(containerWidth, containerHeight, pathwayWidth, pathwayHeight, preserveAspectRatioValues) {

    // following svg standards.
    // see http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute

    var meetOrSlice, xScale, yScale, scale, pathwayWidthScaled, pathwayHeightScaled, xMapping, yMapping;
    var results = {};

    xScale = scale = containerWidth/pathwayWidth;
    yScale = containerHeight/pathwayHeight;

    if (preserveAspectRatioValues.align === 'none') {
      results.x = 0;
      results.y = 0;
      
      results.width = xScale * pathwayWidth;
      results.height = yScale * pathwayHeight;
    }
    else {
      if (preserveAspectRatioValues.meetOrSlice === 'meet') {
        scale = xScale = yScale = Math.min(xScale, yScale);
      }
      else {
        scale = xScale = yScale = Math.max(xScale, yScale);
      }

      results.width = xScale * pathwayWidth;
      results.height = yScale * pathwayHeight;

      xMapping = [
        {'x-min': 0},
        {'x-mid': containerWidth/2 - results.width/2},
        {'x-max': containerWidth - results.width}
      ];

      yMapping = [
        {'y-min': 0},
        {'y-mid': containerHeight/2 - results.height/2},
        {'y-max': containerHeight - results.height}
      ];

      results.x = xMapping[preserveAspectRatioValues.xAlign];
      results.y = yMapping[preserveAspectRatioValues.yAlign];
      results.scale = scale;
    }

    var browserPrefixArray = [
      '-webkit-transform: ',
      '-o-transform: ',
      'transform: '
    ];

    var translationMatrixCssString = 'matrix(' + xScale + ', 0, 0, ' + yScale + ', ' + results.x + ', ' + results.y + '); ';
    
    results.translationMatrixCss = ' ';
    browserPrefixArray.forEach(function(element) {
      results.translationMatrixCss += (element + translationMatrixCssString);
    });

    //var translationMatrix = matrix(a, c, b, d, tx, ty);
    //var translationMatrix = matrix(xScale, rotation, skew, yScale, x translation, y translation);

    return results;
  }

  function getFirstRenderableSourceDataElement(sourceData) {
    var sourceDataElement,
      results = {};
    var i = 0;
    do {
      sourceDataElement = sourceData[i];
      var imageFormat = getImageFormatForDataSourceMimeType(sourceDataElement.mimeType);
      i += 1;
    } while ((!imageFormat) && (i < sourceData.length + 1));

    sourceDataElement.imageFormat = imageFormat;
    return sourceDataElement;
  }

  function getImageFormatForDataSourceMimeType(mimeType) {
    if ((mimeType === 'application/xml+gpml') && (Modernizr.svg) && (pathvisiojs.utilities.isIE() !== 9)) {
      return 'svg';
    }
    else if ((mimeType === 'image/png') || (mimeType === 'image/jpeg') || (mimeType === 'image/gif')) { //TODO update this to correct mimeTypes and also use a better test for all supported static image formats
      return 'png'; //TODO change this name so it also handles jpeg, etc.
    }
    else {
      return null;
    }
  }

  function load(args) {

    // this function gets a reference to a GPML file and draws a visual representation of the pathway
    // TODO Much of the SVG creation code should be moved to ./svg/svg.js so we just call
    // pathvisiojs.view.pathwayDiagram.svg.load() in the same way as we do for
    // pathvisiojs.view.pathwayDiagram.png.load()

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified as container for pathvisiojs.');
    }

    if (!args.sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    var containerSelector = args.container,
      sourceData = args.sourceData,
      fitToContainer = args.fitToContainer,
      cssUrl = args.cssUrl,
      customMarkers = args.customMarkers,
//      customSymbols = args.customSymbols,
      highlightNodes = args.highlightNodes,
      hiddenElements = args.hiddenElements,
      container;

    // waterfall means that each function completes in order, passing its result to the next
    async.waterfall([
      function(callback){

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************

        var renderableSourceDataElement = getFirstRenderableSourceDataElement(sourceData);

        callback(null, renderableSourceDataElement);
      },
      function(renderableSourceDataElement, callback){

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************

        var container = d3.select(containerSelector);
        if (container.length !== 1) {
          throw new Error('Container selector must be matched by exactly one element.');
        }

        var boundingClientRect = container[0][0].getBoundingClientRect();
        var containerWidth = boundingClientRect.width - 40; //account for space for pan/zoom controls,
        var containerHeight = boundingClientRect.height - 20; //account for space for search field;

        callback(null, container, containerWidth, containerHeight, renderableSourceDataElement);
      },
      function(container, containerWidth, containerHeight, renderableSourceDataElement, callback){
        var svg, pathway, loadDiagramArgs = {};

        loadDiagramArgs.container = container;
        loadDiagramArgs.containerWidth = containerWidth;
        loadDiagramArgs.containerHeight = containerHeight;
        loadDiagramArgs.fitToContainer = fitToContainer;

        // ********************************************
        // Check for SVG support. If false, use PNG fallback
        // ********************************************

        // TODO get this working in IE9

        if (renderableSourceDataElement.imageFormat === 'svg') {
          async.parallel({
            preloadSvg: function(callback) {
              var preloadDiagramArgs = {};
              preloadDiagramArgs.container = container;
              preloadDiagramArgs.customMarkers = customMarkers;
//              preloadDiagramArgs.customSymbols = customSymbols;
              preloadDiagramArgs.cssUrl = cssUrl;
              pathvisiojs.view.pathwayDiagram.svg.loadPartials(preloadDiagramArgs, function(svg) {
                callback(null, svg);
              });
            },
            pathway: function(callback){
              pathvisiojs.data.pathvisiojsJson.get(renderableSourceDataElement, function(json) {
                pathvisiojs.context = json['@context'];
                console.log('json');
                console.log(json);
                callback(null, json);
              })
            }
          },
          function(err, results){
            pathway = results.pathway;

            if (pathway !== 'fail') {
              svg = results.preloadSvg,

              loadDiagramArgs.svg = svg;
              loadDiagramArgs.pathway = pathway;

              pathvisiojs.view.pathwayDiagram.svg.load(loadDiagramArgs, function(svg) {

                ///* Node Highlighter

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
                else {
                  callback(null);
                }
              })
            }
            else {
              throw new Error('Detected mimeType does not match specified mimeType of "application/xml+gpml"');
            }
          })
        }
        else {
          loadDiagramArgs.sourceDataElement = renderableSourceDataElement;
          pathvisiojs.view.pathwayDiagram.png.load(loadDiagramArgs, function() {
            callback(null, 'png loaded');
          });
        }
      }
    ],
    function(err, results) {
      // adding this as a signal that the process is done
      d3.select('body').append('span')
      .attr('id', 'pathvisiojs-is-loaded');
      console.log('Pathvisiojs done loading.');
    });
  }

  return{
    load:load
  };
}();

     
;

"use strict";

pathvisiojs.view.pathwayDiagram.svg = function(){

  var svg, shapesAvailable, markersAvailable, contextLevelInput;

  function setCTM(element, scale) {
    // element is a d3 selection
    var s = "matrix(" + scale + ",0,0," + scale + ",10,20)"; // + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
    element.attr("transform", s);
  }

  function load(args, callback) {
    var svg = args.svg,
      pathway = args.pathway,
      container = args.container,
      containerWidth = args.containerWidth,
      containerHeight = args.containerHeight,
      fitToContainer = args.fitToContainer,
      pathwayWidth = args.pathway.image.width,
      pathwayHeight = args.pathway.image.height;

    //add loading gif
    // TODO this should probably use the args.container variable and not redefine a new container
    var container = d3.select('body').select('#pathway-container');
    var posX = containerWidth/2;
    var posY = containerHeight/2;
    var img = container.append('img');
    img.attr('src', "../src/img/loading.gif")
    .attr('width', 50)
    .style('position', "absolute")
    .style('top', posY + "px")
    .style('left', posX + "px");

    if (!svg) {
      throw new Error("Missing svg.");
    }
    if (!pathway) {
      throw new Error("Missing pathway.");
    }

    async.series([
      function(callback){
        pathvisiojs.view.pathwayDiagram.svg.renderFast(svg, pathway, function() {
          callback(null);
        })
      },
      function(callback) {
	//remove loading gif
        container.select('img').remove();

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

        var viewport = svg.select('#viewport');

        /* not all containers will have a width or height style attribute. this is now done using the same logic
         * but uses boundingClientRect() instead. the code is located in pathway-diagram.js
        var container = d3.select('body').select('#pathway-container');
        var containerWidth = parseInt(container.style("width")) - 40; //account for space for pan/zoom controls
        var containerHeight = parseInt(container.style("height")) -20; //account for space for search field
        //*/
        var fitScreenScale;
        if (fitToContainer) {
          fitScreenScale = Math.min(containerWidth/args.pathway.image.width, containerHeight/args.pathway.image.height);
          setCTM(viewport, fitScreenScale);
        }

    	var fittoscreen = d3.select('body').select('#fit-to-screen-control');
    	fittoscreen.on("click", function(d,i){
          fitScreenScale = Math.min(containerWidth/args.pathway.image.width, containerHeight/args.pathway.image.height);
          setCTM(viewport, fitScreenScale);
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
          'root': 'svg',
          'zoomEnabled': false
        });
        callback(null);
      }
    ],
    function(err, results) {
      callback();
    });
  }

  function loadPartials(args, callbackOutside) {
    var container = args.container,
      customMarkers = args.customMarkers,
//      customSymbols = args.customSymbols,
      cssUrl = args.cssUrl,
      pathvisioJsContainer,
      pathwayContainer;

    async.series([
      function(callback) {
        container.html(pathvisioNS['tmp/pathvisiojs.html']);
        pathvisioJsContainer = container.select('#pathvisiojs-container');
        pathwayContainer = pathvisioJsContainer.select('#pathway-container')

        svg = pathvisioJsContainer.select('#pathway-svg')
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
//*/      function(callback) {
        if (!!cssUrl) {
          d3.text(cssUrl, 'text/css', function(data) {
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
  function renderSelectedElementsFast(args, callbackOutside){
    console.log('render');
    console.log(new Date());
    console.log('renderSelectedElementsFast args');
    console.log(args);
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

    var contextLevelInput = pathvisiojs.utilities.clone(pathvisiojs.context);
    contextLevelInput.dependsOn = "ex:dependsOn";

    async.waterfall([
      function(callback) {
        data.sort(function(a, b) {
          return a.zIndex - b.zIndex;
        });
        callback(null, data);
      },
      function(sortedData, callback) {
        var renderingArgs = args;
        sortedData.forEach(function(element) {
          renderingArgs.data = element;
          if (element.renderableType === 'GroupNode') {
            pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(args, function(groupContainer, groupContents) {
              var groupedElementsArgs = renderingArgs;
              groupedElementsArgs.svg = svg;
              groupedElementsArgs.container = args.container; //groupContainer;
	      /* 
	      console.log('groupContainer');
	      console.log(groupContainer); //*/
              groupedElementsArgs.data = groupContents;
	      /*
	      console.log('groupContents');
	      console.log(groupContents); //*/
              groupedElementsArgs.pathway = pathway;

              // recursively calling this function to render elements within groupNode(s)
              pathvisiojs.view.pathwayDiagram.svg.renderSelectedElementsFast(groupedElementsArgs, function() {
              });


              /*
              var groupedElementsFrame = {
                '@context': pathway['@context'],
                "@type":element.GroupId
              };
              jsonld.frame(args.pathway, groupedElementsFrame, function(err, groupedElementsData) {
                var nodeEntityArgs = {};
                nodeEntityArgs.svg = args.svg;
                nodeEntityArgs.container = groupContainer;
                nodeEntityArgs.data = groupedElementsData['@graph'];
                pathvisiojs.view.pathwayDiagram.svg.renderSelectedElementsFast(nodeEntityArgs, function() {
                });
              });
              //*/
            });
          }
          else {
            if (element.renderableType === 'EntityNode') {
              pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
            }
            else {
              if (element.renderableType === 'Interaction') {
                pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
              }
              else {
                if (element.renderableType === 'GraphicalLine') {
                  pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);
                }
              }
            }
          }
        });
        callback(null, 'Successfully rendered elements');
      }
    ],
    function(err, results) {
      callbackOutside(null);
    })
  }

  function renderFast(svg, pathway, callback){
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No data entered to render.");
    }

    console.log('first');
    console.log(new Date());
    async.parallel({
      'firstOrderData': function(callbackInside) {
        var firstOrderFrame = {
          '@context': pathvisiojs.context,
          '@type':['notGrouped', 'GroupNode']
        };
	var newFrame = frameIt(pathway);
          callbackInside(null, newFrame['@graph']);
      }
    },
    function(err, results) {
      console.log('second');
      console.log(new Date());
      var viewport = svg.select('#viewport');

      pathvisiojs.view.pathwayDiagram.svg.infoBox.render(viewport, pathway);

      var renderSelectedElementsFastArgs = {};
      renderSelectedElementsFastArgs.svg = svg;
      renderSelectedElementsFastArgs.container = viewport;
      renderSelectedElementsFastArgs.pathway = pathway;
      renderSelectedElementsFastArgs.data = results.firstOrderData;
      renderSelectedElementsFast(renderSelectedElementsFastArgs, function() {
        console.log('third');
        console.log(new Date());
        callback(svg);
      });
    })
  }
  function frameIt(pathway){
	var nf = new Object({'@context': pathvisiojs.context});
	var arr = new Array();
        if(pathway.DataNode){
          for (var i=0; i<pathway.DataNode.length; i++){
	    if(!pathway.DataNode[i].isContainedBy){
              arr.push(pathway.DataNode[i]);
	    }
          }
        }
        if(pathway.Shape){
          for (var i=0; i<pathway.Shape.length; i++){
            arr.push(pathway.Shape[i]);
          }
        }
        if(pathway.Label){
          for (var i=0; i<pathway.Label.length; i++){
            arr.push(pathway.Label[i]);
          }
        }
        if(pathway.Interaction){
          for (var i=0; i<pathway.Interaction.length; i++){
            arr.push(pathway.Interaction[i]);
          }
        }
	if(pathway.Group){
          for (var i=0; i<pathway.Group.length; i++){
            arr.push(pathway.Group[i]);
          }
	}
	nf['@graph'] = arr; 
	return nf;
  }

      //pathvisiojs.view.pathwayDiagram.svg.grid.render(svg);

      /*
      async.series([
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.groupData;
          renderSelectedElementsFast(args, function() {
            console.log(1);
          });
          callbackInside2(null, svg);
        },
        function(callbackInside2) {
          args.container = args.svg.select('#viewport');
          args.data = results.notGroupedData;
          self.args = args;
          renderSelectedElementsFast(args, function() {
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
    renderFast:renderFast,
    renderSelectedElementsFast:renderSelectedElementsFast,
    load:load,
    loadPartials:loadPartials
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.grid = function(){

/*  Linear algebra conventions call for specifying an element of a matrix as row #, column #.
 *  The rows and columns use one-based indexing. Example: Element.1,2 is the element in the first row and the second column.
 *  The code in PathFinding.js uses x to refer to column # and y to refer to row #.
 *  JavaScript uses zero-based indexing for matrices. Example: matrix[0][1] refers to the element in the first row and the second column.
 *  This code will follow the PathFinding.js conventions and use zero-based indexing,
 *  so be careful to note this may differ from linear algebra conventions.
 * */

  function render(svg) {
    var viewport = svg.select('#viewport');

    var grid = viewport.selectAll('use.grid-square')
    .data(pathvisioNS.grid.gridRenderingData)
    .enter()
    .append('use')
    .attr('x', function(d) {return d.x;})
    .attr('y', function(d) {return d.y;})
    .attr('width', pathvisioNS.grid.squareLength)
    .attr('height', pathvisioNS.grid.squareLength)
    .attr('xlink:xlink:href', '#grid-square')
    .attr('class', 'grid-square')
    .attr('style', function(d) {return 'fill:' + d.fill + '; fill-opacity:0.3; stroke:darkgray;';});
  }

  return {
    render:render
  };
}();
;

"use strict";
pathvisiojs.view.pathwayDiagram.svg.infoBox = function(){
    
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

// a hack because I don't know how to pass the svg variable to the function appendCustom() when it's part of async.each().
var svg;

pathvisiojs.view.pathwayDiagram.svg.symbol = function(){

  var semanticNameToIdMapping = { 
    'datanode':'shape-library-symbols-rectangle-svg',
  };

  function appendCustom(uniqueSymbolShapeUrl, callback) {
    var img, width, height, imgChildren;
    var dimensions = null;

    var symbolId = strcase.paramCase(uniqueSymbolShapeUrl)
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
      d3.xml(uniqueSymbolShapeUrl, "image/svg+xml", function(svgXml) {
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
      img.src = uniqueSymbolShapeUrl;
      img.onload = function() {
        symbol.attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        dimensions = symbol.attr('viewBox').split(' ');
        symbol.append('image').attr('xlink:xlink:href', uniqueSymbolShapeUrl)
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

    var uniqueSymbolShapeUrls = [];
    customSymbols.forEach(function(customSymbol){
      semanticNameToIdMapping[customSymbol.semanticName] = strcase.paramCase(customSymbol.url);
      if (uniqueSymbolShapeUrls.indexOf(customSymbol.url) === -1) {
        uniqueSymbolShapeUrls.push(customSymbol.url);
      }
    });

    async.each(uniqueSymbolShapeUrls, appendCustom, function(err){
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

"use strict"

pathvisiojs.view.pathwayDiagram.svg.publicationXref = function(){

  function getReferenceNumberForDisplay(pathway, rdfId) {
    var displayNumberForDisplay;
    var i = -1;
    var currentPublicationXref;
    var found = false;

    do {
      i += 1;
      currentPublicationXref = pathway.Biopax.PublicationXref[i];
      if (currentPublicationXref.rdfId === rdfId) {
        found = true;
        displayNumberForDisplay = i + 1;
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
    // make sure it's an array
    rdfIds = pathvisiojs.utilities.convertToArray(rdfIds);
    rdfIds.forEach(function(rdfId) {
      displayNumbers.push(getReferenceNumberForDisplay(pathway, rdfId));
    });
    var publicationXrefString = createPublicationXrefString(displayNumbers);
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

"use strict";
pathvisiojs.view.pathwayDiagram.svg.node = function(){
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
    if (!args.container) {
      throw new Error('Need a container to render a node.');
    }
    if (!args.data) {
      throw new Error('Need input data to render a node.');
    }

    /************ 
     * container
     * *********/

    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    var nodeContainer = args.container.selectAll('#node-container-' + strcase.paramCase(args.data['@id']))
    .data([args.data])
    .enter()
    .append("g")
    .attr("id", function (d) { return 'node-container-' + strcase.paramCase(d['@id']); })
    .attr('transform', function(d) {
      var containerElement = {}
      if (args.container[0][0].hasOwnProperty('__data__')) {
        containerElement.x = (args.container[0][0].__data__.x);
        containerElement.y = (args.container[0][0].__data__.y);
      }
      else {
        containerElement.x = 0;
        containerElement.y = 0;
      }
      var element = {}
      element.x = d.x - containerElement.x;
      element.y = d.y - containerElement.y;
      return 'translate(' + element.x + ' ' + element.y + ')';
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

    var shapeType = strcase.paramCase(args.data.ShapeType);
    
    // check for whether desired shape type is available as a symbol
//    if (pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping.hasOwnProperty(shapeType)) {
      //console.log('We will use an SVG "use" element to render this ' + shapeType);
//      pathvisiojs.view.pathwayDiagram.svg.node.useElement.render(nodeContainer, args.data);
//    }
    // else check for whether it is available as a pathShape
//    else {
      //console.log('We will use a pathShape to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(nodeContainer, args.data);
//    }

    /****************** 
     * text label
     * ***************/

    if (args.data.hasOwnProperty('text')) {
      pathvisiojs.view.pathwayDiagram.svg.node.text.render(nodeContainer, args.data);
    }

    /****************** 
     * citation(s)
     * ***************/

    if (args.data.hasOwnProperty('PublicationXref')) {
      pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(nodeContainer, 'node', args.pathway, args.data.PublicationXref);
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
    var svg = d3.selectAll('#pathway-svg');
    svg.selectAll('.highlighted-node').remove();
    var allDataNodesWithText = pathway.DataNode.filter(function(d, i) {return (!!d.text);});
    var selectedNodes = allDataNodesWithText.filter(function(d, i) {return d.text.line.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeContainer = svg.select('#node-container-' + strcase.paramCase(node['@id']));
      if (null == nodeContainer[0][0]){
	//if null, try grouped node container id
        nodeContainer = svg.select('#node-container-pathway-iri-' + node.GraphId);
      }
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

"use strict"

pathvisiojs.view.pathwayDiagram.svg.node.anchor = function(){

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

"use strict";
pathvisiojs.view.pathwayDiagram.svg.node.EntityNode = function(){
  function render(args) {
    if (!args.container) {
      throw new Error('Container element not specified for this EntityNode.');
    }
    if (!args.data) {
      throw new Error('EntityNode data missing.');
    }
    if (!args.pathway) {
      throw new Error('Pathway not specified for this EntityNode. Pathway is needed for items like setting the Organism for DataNode annotations.');
    }
    console.log('data');
    console.log(args.data);

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        var cssClass = 'node entity-node ' + strcase.paramCase(d.nodeType) + ' ';
        if (d.nodeType === 'DataNode') {
          cssClass += strcase.paramCase(d.dataNodeType) + ' ';
          if (!!d.DatasourceReference) {
            cssClass += 'has-xref ';
          }
        }
        if (d.hasOwnProperty('CellularComponent')) {
          cssClass += 'cellular-component ' + strcase.paramCase(d.CellularComponent) + ' ';
        }
        return cssClass;
      })
      if (!!args.data.DatasourceReference) {
        console.log('args.data.DatasourceReference');
        console.log(args.data.DatasourceReference);
        if (!!args.data.DatasourceReference.ID) {
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
	 	pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, d['DatasourceReference'].ID, d['DatasourceReference'].Database, d.text.line.join(' '), d.dataNodeType); //that's capital 'O' Organism from GPML vocab
	    }
	  });
        }
      }
    });
  }
 
  return {
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.pathShape = function(){
  function render(parent, data) {
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
    var g = parent.append('g');
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

"use strict";
pathvisiojs.view.pathwayDiagram.svg.node.text = function(){

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
      return [d];
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
    .attr("y", function (d, i) { return (i - (textLineCount - 1)/2) * 1.4 + 'em';})
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
      console.log('args.data.contains');
      console.log(args.data.contains);
      callback(groupContainer, groupContents);
    });
  }
 
  return {
    render:render
  };
}();
;

"use strict"

pathvisiojs.view.pathwayDiagram.svg.node.useElement = function(){
  
  var pathwayHere, allSymbolNamesHere;

  function dragmove(d) {
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
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

"use strict";

// Edges (interactions and graphical lines)

pathvisiojs.view.pathwayDiagram.svg.edge = function(){

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
    var svg = args.svg;
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
    var edgeId = strcase.paramCase(data.GraphId);
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
    var edge,
      stroke = data.stroke,
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
      'edge': function(callback) {
        edge = container.selectAll('#' + strcase.paramCase(data.GraphId))
        .data([data])
        .enter().insert("path", ":first-child") // TODO this may cause problems in the future if we have groups with fully opaque backgrounds
        callback(null, edge);
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
      edge.attr("id", edgeId)
      .attr("marker-start", markerStartAttributeValue)
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

"use strict";
pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine = function(){
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

"use strict";
pathvisiojs.view.pathwayDiagram.svg.edge.interaction = function(){
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
              pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, d['DatasourceReference'].ID, d['DatasourceReference'].Database, d.InteractionGraph[0].interactsWith.text.line[0]+' + '+d.InteractionGraph[0].text.line[0], d.renderableType); 
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

"use strict"
pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){

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

  function appendCustom(uniqueMarkerShapeUrl, callback) {
    var idStub = strcase.paramCase(uniqueMarkerShapeUrl)
    var startId = idStub + '-start-default';
    var endId = idStub + '-end-default';
    var markerStart = svg.select('defs').select('#' + startId);

    markerStart = svg.select('defs').append('marker')
    .attr('id', startId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUrl, markerStart, startId, false);

    var markerEnd = svg.select('defs').select('#' + endId);
    markerEnd = svg.select('defs').append('marker')
    .attr('id', endId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUrl, markerEnd, endId, true);

    callback(null);
  }

  function processSvg(uniqueMarkerShapeUrl, marker, markerId, rotate){
    d3.xml(uniqueMarkerShapeUrl, 'image/svg+xml', function(svgXml) {
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
      img.src = uniqueMarkerShapeUrl;
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

        markerStart.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUrl)
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

        g.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUrl)
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
    var markerUrl;
    var paramCaseUrl;
    var uniqueMarkerShapeUrls = [];
    customMarkers.forEach(function(customMarker){
      semanticName = customMarker.semanticName;
      markerUrl = customMarker.url;
      paramCaseUrl = strcase.paramCase(markerUrl);
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[semanticName] = paramCaseUrl;
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[paramCaseUrl] = ['default'];
      if (uniqueMarkerShapeUrls.indexOf(markerUrl) === -1) {
        uniqueMarkerShapeUrls.push(markerUrl);
      }
    });

    async.each(uniqueMarkerShapeUrls, appendCustom, function(err){
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
      console.log('end');
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
    function getPath(edge) {
	var path;
	var type = edge.ConnectorType;
	
	if (type == 'Straight'){
          if (edge.Point.length == 2) {
            return svgLine(edge.Point);
          }
          else {
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

"use strict";

// TODO remove controls that don't work with PNG 

pathvisiojs.view.pathwayDiagram.png = function(){

  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }

    var container = args.container,
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      pngUrl = args.sourceDataElement.uri,
      png,
      pngWidth,
      pngHeight,
      fitScreenScale;

      /*
    if (!!wikiPathwaysId) {
      pngUrl = encodeURI(pathvisiojs.config.pngDiagramUriStub() + wikiPathwaysId + '&revision=' + revision);
    }
    else {
      pngUrl = pathvisiojs.config.diagramNotAvailableImageUri();
    }
    //*/

    window.setTimeout(function() {
      png = document.createElement('img');
      png.src = pngUrl;
      png.onload = function() {
        pngWidth = parseFloat(this.width);
        pngHeight = parseFloat(this.height);
        fitScreenScale = Math.min((containerWidth/pngWidth), (containerHeight/pngHeight));
        container.append('img')
        .attr('id', 'pathvisiojs-pathway-png')
        .attr('src', pngUrl)
        .attr('x', 0)
        .attr('y', 0)
        .attr('style', 'position:relative; left:'
              + (containerWidth - pngWidth * fitScreenScale)/2 + 'px; '
              + 'top:' + (containerHeight - pngHeight * fitScreenScale)/2 + 'px; ')
        .attr('width', pngWidth * fitScreenScale)
        .attr('height', pngHeight * fitScreenScale);
        callback(null);
      }
    }, 50);
  }

  return {
    load:load
  };
}();
