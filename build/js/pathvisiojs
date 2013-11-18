//! pathvisio-js 0.0.1
//! Built on 2013-11-18
//! https://github.com/wikipathways/pathvisiojs
//! License: http://www.apache.org/licenses/LICENSE-2.0/

var pathvisioNS = pathvisioNS || {};
pathvisioNS["tmp/pathvisio-js.html"] = '<div id="pathvisio-js-container" style="width: inherit; height: inherit; position: absolute; ">\n\n    <!-- **********************************************************************\n    Pathway Container (JavaScript inserts pathway image inside this div)\n    *********************************************************************** -->\n\n    <div id="pathway-container" style="width:inherit; height: inherit; " class="y-mid">\n      \n    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="pathway-svg" version="1.1" baseProfile="full" width="500px" height="500px" style="display: inline; width: 502px; height: 502px; " class="x-mid" onmouseup="svgPanZoom.handleMouseUp(evt)" onmousedown="svgPanZoom.handleMouseDown(evt)" onmousemove="svgPanZoom.handleMouseMove(evt)">\n	<g>\n	<title>pathway defs for pathvisiojs</title>\n	<desc>\n	This SVG file contains all the graphical elements (markers and symbols in defs as well as\n	style data) used by the program pathvisiojs, which has two components: \n	1) a viewer for transforming GPML biological pathway data into an SVG visual representation and \n	2) an editor for creating both views and models for biological pathways.\n	</desc>\n	</g>\n	<defs>\n\n    <filter id="highlight" width="150%" height="150%">\n        <feOffset result="offOut" in="SourceGraphic" dx="30" dy="30"></feOffset>\n        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"></feGaussianBlur>\n        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\n    </filter>\n\n	<!-- ***************************\n	Markers (Arrowheads) \n	*************************** -->\n\n	<!-- Here we generate a set of interaction markers for the default color (black). If we need other colors,\n	we need to clone the black marker and set the color for the clone to the desired color using d3.js.\n	I wish fill="currentColor" worked for markers, but that does not appear to be the case. -->\n\n	<!-- Each marker includes a small rectangle with a default-fill color to obscure the\n	ends of lines that might otherwise show up beneath the marker. Double lines require their own special\n	obscuring rects and are included as a double-line-hack-start/end marker, defined here and added in\n	gpml2json.js -->\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n<!--\n	<marker id="arrow-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="default-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="12,5 0,0 12,-5"/>\n	</marker>\n\n	<marker id="arrow-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="default-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-12,5 0,0 -12,-5"/>\n	</marker>\n  -->\n	<marker id="arrow-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/arrow.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="arrow-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/arrow.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n<!--\n	<marker id="mim-binding-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="default-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="12,6 0,0 12,-6 5,0 "/>\n	</marker>\n\n	<marker id="mim-binding-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="default-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-12,6 0,0 -12,-6 -5,0 "/>\n	</marker>\n-->\n	<marker id="mim-binding-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-binding.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-binding-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-binding.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n<!--\n	<marker id="mim-branching-left-start-black" \n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="3.7" y1="0" x2="0" y2="-6"/>	\n	</marker>\n\n	<marker id="mim-branching-left-end-black"\n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-3.5" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="0" x2="0" y2="6"/>	\n	</marker>\n-->\n	<marker id="mim-branching-left-start-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-branching-left.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-branching-left-end-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-branching-left.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n  <!--\n	<marker id="mim-branching-right-start-black" \n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="3.7" y1="0" x2="0" y2="6"/>\n	</marker>\n\n	<marker id="mim-branching-right-end-black"\n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-3.5" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="0" x2="0" y2="-6"/>	\n	</marker>\n-->\n	<marker id="mim-branching-right-start-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-branching-right.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-branching-right-end-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-branching-right.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and black stroke -->\n<!--\n	<marker id="mim-catalysis-start-black"\n	class="default-fill"\n	stroke="black"\n	markerHeight="12"\n	markerWidth="12"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<circle cx="5.3" cy="0" r="5.3px" stroke-width="1px"/>\n	</marker>\n\n	<marker id="mim-catalysis-end-black"\n	class="default-fill"\n	stroke="black"\n	markerHeight="12"\n	markerUnits="strokeWidth"\n	markerWidth="12"\n	orient="auto"\n	refX="5" refY="0"\n	viewBox="-6.5 -6 12 12">\n	<circle cx="-0.3" cy="0" r="5.3px" stroke-width="1px"/>\n	</marker>\n-->\n\n	<marker id="mim-catalysis-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-catalysis.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-catalysis-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-catalysis.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n  <!--\n	<marker id="mim-cleavage-start-black" \n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-8 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="3.7" y1="0" x2="3.7" y2="6"/>	\n	<line fill="none" stroke-width=".4" x1="3.7" y1="6" x2="-8" y2="-6"/>	\n	</marker>\n\n	<marker id="mim-cleavage-end-black"\n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-4 -6 12 12">\n	<rect stroke="none" x="-3.5" y="-0.6" width="3.5" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="0" x2="-3.7" y2="-6"/>	\n	<line fill="none" stroke-width=".4" x1="-3.7" y1="-6" x2="8" y2="6"/>	\n	</marker>\n  -->\n	<marker id="mim-cleavage-start-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="8" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-cleavage.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-cleavage-end-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="4" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-cleavage.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n<!--\n	<marker id="mim-conversion-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="default-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="11,5 0,0 11,-5"/>\n	</marker>\n\n	<marker id="mim-conversion-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="default-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-11,5 0,0 -11,-5"/>\n	</marker>\n-->\n	<marker id="mim-conversion-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-conversion.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-conversion-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-conversion.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n<!--\n	<marker id="mim-covalent-bond-start-black"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	</marker>\n\n	<marker id="mim-covalent-bond-end-black"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	</marker>\n-->\n	<marker id="mim-covalent-bond-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-covalent-bond.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-covalent-bond-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-covalent-bond.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n<!--\n	<marker id="mim-gap-start-black"\n	class="default-fill"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="-2" y="-0.7" width="8" height="1.4" />\n	</marker>\n\n	<marker id="mim-gap-end-black"\n	class="default-fill"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-6" y="-0.7" width="8" height="1.4" />\n	</marker>\n-->\n	<marker id="mim-gap-start-black" class="default-fill" stroke="black" markerHeight="10" markerWidth="10" markerUnits="strokeWidth" orient="auto" refX="2" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-gap.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-gap-end-black" class="default-fill" stroke="black" markerHeight="10" markerWidth="10" markerUnits="strokeWidth" orient="auto" refX="10" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-gap.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n\n  <!--\n	<marker id="mim-inhibition-start-black"\n	class="default-fill"\n	stroke="black"\n	markerWidth="16" \n	markerHeight="16"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="5" y1="-6" x2="5" y2="6"/>\n  </marker>\n\n	<marker id="mim-inhibition-end-black"\n	class="default-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="16" \n	markerHeight="16"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-5" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="-5" y1="-6" x2="-5" y2="6"/>\n	</marker>\n	-->\n  \n	<marker id="mim-inhibition-start-black" class="default-fill" stroke="black" markerWidth="16" markerHeight="16" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-inhibition.svg" x="0" y="0" width="12" height="12"></image>\n  </marker>\n  \n	<marker id="mim-inhibition-end-black" class="default-fill" stroke="black" markerWidth="16" markerHeight="16" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-inhibition.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n  </marker>\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n<!-- TODO\n	<marker id="mim-modification-start-black" \n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="default-fill" stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="12,6 0,0 12,-6 5,0 "/>\n	</marker>\n\n	<marker id="mim-modification-end-black"\n	fill="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="default-fill" stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="0" points="-12,6 0,0 -12,-6 -5,0 "/>\n	</marker>\n  -->\n	<marker id="mim-modification-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-modification.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-modification-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-modification.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, black stroke; and vertical line -->\n<!--\n	<marker id="mim-necessary-stimulation-start-black"\n	class="default-fill"\n	stroke="black"\n	markerWidth="12" markerHeight="12"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 15 12">\n	<rect stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<line fill="none" stroke-width="1" x1="14" y1="-6" x2="14" y2="6"/>\n	<polygon stroke-width="1" points="9,5 0,0 9,-5"/>\n	</marker>\n\n	<marker id="mim-necessary-stimulation-end-black"\n	class="default-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-15 -6 15 12">\n	<rect stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<line fill="none" stroke-width="1" x1="-14" y1="-6" x2="-14" y2="6"/>\n	<polygon stroke-width="1" points="-9,5 0,0 -9,-5"/>\n	</marker>\n  -->\n	<marker id="mim-necessary-stimulation-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 15 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-necessary-stimulation.svg" x="0" y="0" width="15" height="12"></image>\n	</marker>\n\n	<marker id="mim-necessary-stimulation-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="15" refY="6" viewBox="0 0 15 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-necessary-stimulation.svg" x="0" y="0" width="15" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, black stroke -->\n<!--\n	<marker id="mim-stimulation-start-black"\n	class="default-fill"\n	stroke="black"\n	markerWidth="12" markerHeight="12"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="1" points="11,5 0,0 11,-5"/>\n	</marker>\n\n	<marker id="mim-stimulation-end-black"\n	class="default-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="12" markerHeight="12"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-2" y="-0.6" width="2" height="1.2" />\n	<polygon stroke-width="1" points="-11,5 0,0 -11,-5"/>\n	</marker>\n  -->\n	<marker id="mim-stimulation-start-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-stimulation.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-stimulation-end-black" class="default-fill" stroke="black" markerHeight="12" markerWidth="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-stimulation.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n<!--\n	<marker id="mim-transcription-translation-start-black"\n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="6" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="9" y1="0" x2="9" y2="-4"/>\n	<line fill="none" stroke-width=".4" x1="9" y1="-4" x2="5" y2="-4"/>\n	<polygon stroke-width=".4" points="5,-6 0,-4 5,-2"/>\n	</marker>\n\n	<marker id="mim-transcription-translation-end-black"\n	class="default-fill" \n	stroke="black"\n	markerHeight="24"\n	markerWidth="24"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-6" y="-0.6" width="6" height="1.2" />\n	<line fill="none" stroke-width=".4" x1="-9" y1="0" x2="-9" y2="4"/>\n	<line fill="none" stroke-width=".4" x1="-9" y1="4" x2="-5" y2="4"/>\n	<polygon stroke-width=".4" points="-5,6 0,4 -5,2"/>	\n	</marker>\n  -->\n	<marker id="mim-transcription-translation-start-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-transcription-translation.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="mim-transcription-translation-end-black" class="default-fill" stroke="black" markerHeight="24" markerWidth="24" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-transcription-translation.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<!-- t-bar markers: vertical line; and extended drawing-board rect -->\n<!--\n	<marker id="t-bar-start-black"\n	class="default-fill"\n	stroke="black"\n	markerWidth="16" \n	markerHeight="16"\n	markerUnits="strokeWidth"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect stroke="none" x="0" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="5" y1="-6" x2="5" y2="6"/>\n	</marker>\n\n	<marker id="t-bar-end-black"\n	class="default-fill"\n	stroke="black"\n	markerUnits="strokeWidth"\n	markerWidth="16" \n	markerHeight="16"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect stroke="none" x="-5" y="-0.6" width="5" height="1.2" />\n	<line fill="none" stroke-width="1.6" x1="-5" y1="-6" x2="-5" y2="6"/>\n	</marker>\n  -->\n	<marker id="t-bar-start-black" class="default-fill" stroke="black" markerHeight="16" markerWidth="16" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/t-bar.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="t-bar-end-black" class="default-fill" stroke="black" markerHeight="16" markerWidth="16" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/t-bar.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n	\n	<!-- double-line-hack markers are used in double line handling; they include their own \n	special blank rect to obscure the ends -->\n<!--\n	<marker id="double-line-hack-start"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="0 -6 12 12">\n	<rect class="default-fill" stroke="none" x="0" y="-1.5" width="2.3" height="3" />\n	</marker>\n\n	<marker id="double-line-hack-end"\n	markerUnits="strokeWidth"\n	markerWidth="10" markerHeight="10"\n	orient="auto"\n	refX="0" refY="0"\n	viewBox="-12 -6 12 12">\n	<rect class="default-fill" stroke="none" x="-2.3" y="-1.5" width="2.3" height="3" />\n	</marker>\n  -->\n	<marker id="double-line-hack-start" class="default-fill" stroke="black" markerHeight="10" markerWidth="10" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/double-line-hack.svg" x="0" y="0" width="12" height="12"></image>\n	</marker>\n\n	<marker id="double-line-hack-end" class="default-fill" stroke="black" markerHeight="10" markerWidth="10" markerUnits="strokeWidth" orient="auto" refX="12" refY="6" viewBox="0 0 12 12">\n  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/double-line-hack.svg" x="0" y="0" width="12" height="12" class="marker-end"></image>\n	</marker>\n\n	<symbol id="grid-square" viewBox="0 0 100 100" preserveAspectRatio="none">\n\n		<rect x="1" y="1" width="99" height="99" stroke="gray" stroke-width="2"></rect>\n	</symbol>\n\n	<symbol id="none" viewBox="0 0 100 100" preserveAspectRatio="none"></symbol>\n\n	<marker id="arrow" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="arrow" version="1.1" baseProfile="full" width="12" height="12" class="solid-stroke" style="fill:black" viewBox="0 0 12 12">\n	<rect class="default-fill" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon fill="black" stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</svg></marker><marker id="mim-branching-left" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-branching-left" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke">\n\n	<rect stroke="none" x="0" y="5.4" width="3.5" height="1.2"></rect>\n	<line fill="none" stroke-width=".4" x1="3.7" y1="6" x2="0" y2="0"></line>	\n\n</svg></marker><marker id="mim-branching-right" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-branching-right" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke">\n\n	<rect stroke="none" x="0" y="5.4" width="3.5" height="1.2"></rect>\n	<line fill="none" stroke-width=".4" x1="0" y1="12" x2="3.7" y2="6"></line>	\n\n</svg></marker><marker id="mim-necessary-stimulation" preserveAspectRatio="none" viewBox="0 0 15 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-necessary-stimulation" version="1.1" baseProfile="full" width="15" height="12" class="default-fill solid-stroke" style="stroke:black" viewBox="0 0 15 12">\n\n	<rect stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<polygon stroke-width="1" points="9,11 0,6 9,1"></polygon>\n\n</svg></marker><marker id="mim-binding" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-binding" version="1.1" baseProfile="full" width="12" height="12" class="solid-stroke" style="fill:black" viewBox="0 0 12 12">\n\n	<rect class="default-fill" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</svg></marker><marker id="mim-conversion" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-conversion" version="1.1" baseProfile="full" width="12" height="12" style="fill:black" class="solid-stroke" viewBox="0 0 12 12">\n\n	<rect class="default-fill" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="11,11 0,6 11,1"></polygon>\n\n</svg></marker><marker id="mim-stimulation" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-stimulation" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke" style="stroke:black" viewBox="0 0 12 12">\n\n	<rect class="default-fill" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="1" points="11,11 0,6 11,1"></polygon>\n\n</svg></marker><marker id="mim-modification" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-modification" version="1.1" baseProfile="full" width="12" height="12" class="solid-stroke" style="fill:black" viewBox="0 0 12 12">\n\n	<rect class="default-fill" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</svg></marker><marker id="mim-catalysis" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-catalysis" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke" viewBox="-6 -6 12 12">\n\n	<circle cx="0" cy="0" r="5.3px" stroke-width="1px"></circle>\n\n</svg></marker><marker id="mim-inhibition" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-inhibition" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke">\n\n	<rect stroke="none" x="0" y="5.4" width="5" height="1.2"></rect>\n	<line fill="none" stroke-width="1.6" x1="5" y1="0" x2="5" y2="12"></line>\n\n</svg></marker><marker id="mim-cleavage" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-cleavage" version="1.1" baseProfile="full" width="12" height="12" viewBox="0 0 12 12" class="default-fill solid-stroke">\n\n	<rect stroke="none" x="8" y="5.4" width="3.5" height="1.2"></rect>\n	<line fill="none" stroke-width=".4" x1="11.7" y1="6" x2="11.7" y2="12"></line>	\n	<line fill="none" stroke-width=".4" x1="11.7" y1="12" x2="0" y2="0"></line>	\n\n</svg></marker><marker id="mim-covalent-bond" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-covalent-bond" version="1.1" baseProfile="full" width="12" height="12" class="solid-stroke" style="fill:black" viewBox="0 0 12 12">\n\n</svg></marker><marker id="mim-transcription-translation" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-transcription-translation" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke" style="stroke:black">\n\n	<rect stroke="none" x="0" y="5.4" width="6" height="1.2"></rect>\n	<line fill="none" stroke-width=".4" x1="9" y1="6" x2="9" y2="2"></line>\n	<line fill="none" stroke-width=".4" x1="9" y1="2" x2="5" y2="2"></line>\n	<polygon stroke-width=".4" points="5,0 0,2 5,4"></polygon>\n\n</svg></marker><marker id="mim-gap" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="mim-gap" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke" viewBox="0 0 12 12">\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</svg></marker><marker id="t-bar" preserveAspectRatio="none" viewBox="0 0 12 12"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" id="t-bar" version="1.1" baseProfile="full" width="12" height="12" class="default-fill solid-stroke" style="stroke:black">\n\n	<rect stroke="none" x="0" y="5.4" width="5" height="1.2"></rect>\n	<line fill="none" stroke-width="1.6" x1="5" y1="0" x2="5" y2="12"></line>\n\n</svg></marker><symbol id="brace" preserveAspectRatio="none" viewBox="0 0 100 50"><clipPath id="brace-clip-path">\n		<path d="m1.5,49.499996c0,-16.166668 8.166666,-24.249996 24.499998,-24.249996s24.499998,-8.083336 24.499998,-24.250002c0,16.166666 8.166664,24.250002 24.499996,24.250002s24.5,8.083328 24.5,24.249996" vector-effect="non-scaling-stroke"></path>\n        </clipPath></symbol><symbol id="arc" preserveAspectRatio="none" viewBox="0 0 100 100"><path d="m1.5,50.5c0,-16.16667 8.16667,-24.25 24.5,-24.25s24.5,-8.08334 24.5,-24.25c0,16.16666 8.16666,24.25 24.49999,24.25s24.50001,8.08333 24.50001,24.25" vector-effect="non-scaling-stroke" class="node shape"></path></symbol><symbol id="golgi-apparatus" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="golgi-apparatus-clip-path1">\n	<path d="m58.46714,27.713327c-22.205345,-29.90079 37.310066,-30.258356 25.567245,-4.823446c-8.807655,18.581238 -17.066429,58.135235 -0.941673,99.22044c13.31469,27.066696 -41.748463,27.760925 -27.755554,-1.469849c11.345825,-29.420242 10.286858,-80.336422 3.129982,-92.927145z" vector-effect="non-scaling-stroke"></path>\n   	</clipPath><clipPath id="golgi-apparatus-clip-path3">\n   	<path d="m29.803959,52.160912c1.584177,11.474716 2.723461,16.737267 -1.482977,38.361366c-3.731956,12.989006 -3.600399,16.340691 -11.732334,19.412781c-6.683298,1.658531 -11.864832,-9.789436 -4.793299,-16.11377c4.855728,-5.623222 6.141087,-10.882362 6.658888,-22.954659c-0.239212,-9.521427 0.814508,-15.823826 -5.36692,-19.958626c-7.624315,-2.195171 -6.088041,-16.534611 4.824059,-13.863804c5.849354,1.027065 10.282408,8.561516 11.892582,15.116711z" vector-effect="non-scaling-stroke"></path>\n	</clipPath><path d="m31.214371,36.214363c-10.791712,-21.427903 29.897598,-19.848164 18.407501,0.670895c-4.066933,7.422386 -5.782803,61.572803 1.160713,75.028805c8.52943,18.597427 -32.852985,19.355408 -20.500162,-2.250633c6.952761,-17.358604 10.473742,-52.291187 0.931948,-73.449066z" style="clip-path: url(#golgi-apparatus-clip-path2); " vector-effect="non-scaling-stroke"></path></symbol><symbol id="endoplasmic-reticulum" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="endoplasmic-reticulum-clip-path">\n		<path d="m73.52756,56.60967c-5.62457,-18.60675 23.51463,-32.43358 23.40173,-45.06604c-0.34426,-4.86102 -10.48934,-8.89743 -18.28974,-5.33395c-17.04119,7.87556 -15.64949,29.30503 -21.20533,42.23387c-0.35661,3.60951 -7.36274,2.46926 -7.74964,-0.48694c-5.8512,-11.38871 17.13534,-24.48692 5.96075,-29.42586c-19.63467,-8.16979 -28.75184,21.15346 -22.0682,28.81784c7.4956,14.17602 -2.17949,24.40679 -6.74689,15.49637c-2.44209,-5.30613 6.06605,-11.08445 -0.80351,-16.17689c-4.31991,-2.79993 -11.75555,-0.64618 -16.15468,3.0943c-12.89117,10.73799 4.72957,40.98145 20.96467,36.14635c4.69833,-1.95989 -3.23603,-8.70151 3.90717,-9.59951c7.29767,-0.81255 5.17628,6.18889 7.68745,9.22691c2.3071,4.0509 4.83232,8.35538 10.7626,11.6237c4.78642,2.53724 15.29437,2.11225 16.77148,-1.95795c2.0318,-9.26291 -26.11129,-28.35848 -10.68903,-31.2815c18.55524,-2.71473 4.74866,23.84573 24.31006,29.69419c9.50188,2.02824 15.63902,-0.62194 14.81255,-4.03272c-2.74586,-11.26327 -25.13557,-22.6802 -24.96441,-33.14968" vector-effect="non-scaling-stroke"></path>\n	</clipPath></symbol><symbol id="hexagon" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="hexagon-clip-path">\n		<path d="m1.42004,50.99635l21.07262,-42.13943l56.19152,0l21.0667,42.13943l-21.0667,42.14507l-56.19152,0l-21.07262,-42.14507z" vector-effect="non-scaling-stroke"></path>\n        </clipPath></symbol><symbol id="mim-degradation" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="mim-degradation-circle-clip-path">\n		<circle cx="50" cy="50" r="49" vector-effect="non-scaling-stroke"></circle>\n  	</clipPath><line x1="1" y1="1" x2="100" y2="100" stroke-width="1" vector-effect="non-scaling-stroke"></line></symbol><symbol id="mitochondria" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="oval-clip-path">\n		<ellipse cx="50" cy="50" rx="50" ry="50" vector-effect="non-scaling-stroke"></ellipse>\n        </clipPath><ellipse cx="50" cy="50" rx="50" ry="50" style="clip-path: url(#oval-clip-path); " vector-effect="non-scaling-stroke"></ellipse></symbol><symbol id="oval" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="oval-clip-path">\n		<ellipse cx="50" cy="25" rx="50" ry="25" vector-effect="non-scaling-stroke"></ellipse>\n        </clipPath></symbol><symbol id="pentagon" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="pentagon-clip-path">\n		<polygon points="59.159732818603516,99.61322021484375 95,50.28331756591797 59.159732818603516,0.9534196853637695 1.168962001800537,19.795764923095703 1.168962001800537,80.7708740234375 " vector-effect="non-scaling-stroke"></polygon>\n	</clipPath></symbol><symbol id="rectangle" preserveAspectRatio="none" viewBox="0 0 100 50"><clipPath id="rectangle-clip-path">\n	<rect x="0" y="0" width="100" height="50" vector-effect="non-scaling-stroke"></rect>\n      	</clipPath><rect x="0" y="0" width="100" height="50" style="clip-path: url(#rectangle-clip-path); " vector-effect="non-scaling-stroke"></rect></symbol><symbol id="sarcoplasmic-reticulum" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="sarcoplasmic-reticulum-clip-path">\n		<path d="m46.60182,1.40724c-32.37224,1.34138 -36.32004,22.77011 -26.50318,38.12777c9.31826,18.3425 -18.7656,30.15016 2.56955,49.37807c16.82126,13.11594 46.33175,6.10508 52.12638,-8.56826c5.89916,-15.24847 -10.95099,-26.0272 -3.29316,-40.96135c10.85342,-19.88432 -0.77615,-38.13043 -24.89959,-37.97624z" vector-effect="non-scaling-stroke"></path>	\n	</clipPath></symbol><symbol id="triangle" preserveAspectRatio="none" viewBox="0 0 100 100"><clipPath id="triangle-clip-path">\n		<polygon points="1,49 49,24 1,1" vector-effect="non-scaling-stroke"></polygon>\n        </clipPath></symbol><style type="text/css">	svg {\n		color-interpolation: auto;\n		image-rendering: auto;\n		shape-rendering: auto;\n		vector-effect: non-scaling-stroke;\n		fill: white;\n		background: white;\n    stroke: black;\n	}\n\n	.default-fill {\n		fill: white;\n	}\n\n	.stroke-color-equals-default-fill-color {\n		stroke: white;\n	}\n\n	text {\n		font-family: Sans-Serif, Helvetica, Arial;\n		font-size: 10px;\n		fill: black;\n		fill-opacity: 1;\n		stroke: none;\n		text-anchor: middle;\n		font-size: 10px;\n		stroke: none;\n	}\n\n	.info-box {\n		font-family: Sans-Serif;\n		font-size: 10px;\n		fill: black;\n		stroke: none;\n		text-anchor: start;\n	}\n\n	.info-box-property-name {\n		font-weight: bold;\n	}\n\n	path.group {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n	}\n\n	path.group:hover {\n		fill-opacity: 0.2;\n		stroke-width: 1px;\n	}\n\n	path.group-none {\n		fill: rgb(180,180,100);\n		stroke-dasharray: 5,3;\n	}\n\n	path.group-group {\n		fill-opacity: 0;\n		stroke-width: 0;\n	}\n\n	path.group-complex {\n		fill: rgb(180,180,100);\n	}\n\n	path.group-pathway {\n		fill: lightgreen;\n		stroke-dasharray: 5,3;\n	}\n\n	use.data-node {\n		fill-opacity: 1;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	use.gene-product {\n	}\n\n	use.metabolite {\n		stroke: blue;\n	}\n\n	text.metabolite {\n		fill: blue;\n	}\n\n	use.pathway {\n		stroke: rgb(20,150,30);\n		fill-opacity: 0;\n	}\n\n	text.pathway {\n		fill: rgb(20,150,30);\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	use.protein {\n	}\n\n	use.rna {\n	}\n\n	use.unknown {\n	}\n\n	.label {\n		stroke: black;\n		stroke-width: 0;\n		fill-opacity: 0;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape {\n		fill-opacity: 1;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape-none {\n		fill: none;\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	.cellular-component {\n		fill-opacity: 0;\n		stroke: gray;\n	}\n\n	.graphical-line {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	.interaction {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n  .marker-end {\n    -webkit-transform: rotate(180deg);\n    -webkit-transform-origin: 50% 50%;\n\n    -o-transform: rotate(180deg); \n    -o-transform-origin: 50% 50%;\n\n    transform: rotate(180deg);\n    transform-origin: 50% 50%;\n  }\n\n	.solid-stroke {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n	.dashed-stroke {\n		stroke-dasharray: 5,3;\n	}\n\n  .highlighted-node {\n		fill: yellow;\n    fill-opacity: 0.2;\n		stroke: orange; \n    stroke-width: 3px;\n  }\n</style></defs>\n\n	<g id="viewport" transform="matrix(0.6736939549446106,0,0,0.6736939549446106,1.0000041846169552,6.999998453056833)">\n	</g>\n\n</svg></div>\n    \n    <!-- **********************************************************************\n      Highlight Element by Label Control\n      *********************************************************************** -->\n\n      <span class="twitter-typeahead" style="position: relative; display: inline-block;"><input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled="" style="position: absolute; top: 0px; left: 0px; border-color: transparent; box-shadow: none; background-attachment: scroll; background-clip: border-box; background-color: rgb(255, 255, 255); background-image: none; background-origin: padding-box; background-size: auto; background-position: 0% 0%; background-repeat: repeat repeat;"><input id="highlight-by-label-input" placeholder="Enter node name to highlight." role="textbox" aria-autocomplete="list" aria-haspopup="true" class="tt-query" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top; background-color: transparent;"><span style="position: absolute; left: -9999px; visibility: hidden; white-space: nowrap; font-family: \'Lucida Grande\'; font-size: 12px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;"></span><span class="tt-dropdown-menu" style="position: absolute; top: 100%; left: 0px; z-index: 100; display: none;"></span></span>\n\n      <!-- **********************************************************************\n      Pan Zoom Control\n      see http://bumbu.github.io/cytoscape.js/debug/ for example of cytoscape.js \n      *********************************************************************** -->\n\n      <div id="pan-zoom-control" class="ui-cytoscape-panzoom">\n        <div class="ui-cytoscape-panzoom-zoom-in ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-plus"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-zoom-out ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-minus"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-reset ui-cytoscape-panzoom-zoom-button">\n          <span class="icon icon-resize-full"></span>\n        </div>\n        <div class="ui-cytoscape-panzoom-slider">\n          <div class="ui-cytoscape-panzoom-slider-background">\n          </div>\n          <div class="ui-cytoscape-panzoom-slider-handle" style="top: 42.80000001192093px;">\n            <span class="icon icon-minus"></span>\n          </div>\n          <div class="ui-cytoscape-panzoom-no-zoom-tick" style="top: 42.80000001192093px;">\n          </div>\n        </div>\n        <div class="ui-cytoscape-panzoom-panner">\n          <div class="ui-cytoscape-panzoom-panner-handle">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-up ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-down ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-left ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-right ui-cytoscape-panzoom-pan-button">\n          </div>\n          <div class="ui-cytoscape-panzoom-pan-indicator" style="display: none; left: 22.424611085682006px; top: 0.12287108520014556px; background-color: rgb(127, 127, 127); background-position: initial initial; background-repeat: initial initial;">\n          </div>\n        </div>\n      </div>\n\n      <!-- **********************************************************************\n      Fullscreen Control \n      *********************************************************************** -->\n\n      <div id="fullscreen-control" style="position: absolute; bottom: 5px; right: 5px;">\n        <i class="icon-fullscreen" style="color:#aaa"></i>\n      </div>\n   \n\n    <div id="viewer-toolbar" style="position: absolute; top: 0px; right: 0px; height: inherit">\n    </div>\n      \n    <!-- **********************************************************************\n    Details Frame\n    *********************************************************************** -->\n\n    <div id="annotation" class="annotation ui-draggable" style="visibility: hidden; position: absolute; right: 75px; top: 100px;">\n      <header class="annotation-header">\n      <span id="annotation-move" class="annotation-header-move">\n        <i class="icon-move"></i>\n      </span>\n      <span id="annotation-header-text" class="annotation-header-text">\n        Header\n      </span> \n      <span id="annotation-header-search" class="annotation-header-search" title="Search for pathways containing \'Header Text\'">\n        <a href="http://wikipathways.org//index.php?title=Special:SearchPathways">\n          <i class="icon-search" style="color:blue; font-size:50% ; text-decoration:none"></i>\n        </a>\n      </span>\n      <span class="annotation-header-close">\n        <i class="icon-remove"></i>\n      </span>\n      <div id="annotation-description" class="annotation-description">\n        <h2>description</h2>\n      </div>\n      </header>\n      <span class="annotation-items-container">\n        <ul id="annotation-items-container">\n          <!-- List items inside this ul element are generated automatically by JavaScript.\n          Each item will be composed of a title and text. The text can be set to be an href.\n          You can edit the styling of the title by editing CSS class "annotation-item-title"\n          and the styling of the text by editing CSS class "annotation-item-text.\n          -->\n        </ul>\n      </span>\n    </div>\n  </div>\n';
;

pathvisiojs = function(){

  var svg, pathway, args;

  function getUriFromWikiPathwaysId(wikiPathwaysId, revision) {

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=' + wikiPathwaysId + '&rev=' + revision;
  }

  function getInputDataDetails(inputData) {

    console.log('inputData');
    console.log(inputData);

    // inputData can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.

    var results = {};
    if (!inputData.revision) {
      inputData.revision = 0;
    }

    if (pathvisiojs.utilities.getObjectType(inputData) === 'Object') {
      results = inputData;
      if (pathvisiojs.utilities.isWikiPathwaysId(inputData.wikiPathwaysId)) {
        results.uri = getUriFromWikiPathwaysId(inputData.wikiPathwaysId, inputData.revision);
        results.type = 'GPML';
        results.pathwayIri = 'wpId:' + inputData.wikiPathwaysId;
      }
    }
    else {
      if (pathvisiojs.utilities.isUrl(inputData)) {
        results.uri = inputData;
        if (results.uri.indexOf('.gpml') > -1) {
          results.type = 'GPML';
          results.pathwayIri = inputData;
        }
      }
      else {
        if (pathvisiojs.utilities.isWikiPathwaysId(inputData)) {
          results.uri = getUriFromWikiPathwaysId(inputData);
          results.type = 'GPML';
          results.pathwayIri = 'wpId:' + inputData;
        }
        else {
          return new Error('Pathvisio.js cannot handle the data source type entered: ' + data);
        }
      }
    }

    return results;
  }

  function getJson(inputData, callback) {

    // inputData is a uri to a GPML or other pathway data file.
    // This function converts data specified by inputData to formatted JSON
    // and return the JSON to the function that called getJson()

    var inputDataDetails = getInputDataDetails(inputData);

    // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
    // GPML or has no type specified, into JSON.
    // TODO Later, this functionality can be extended to include other data types and
    // to test for data type when it is not specified.

    if (!!inputDataDetails.uri && (!inputDataDetails.type || inputDataDetails.type === 'GPML')) {

      // TODO d3.xml doesn't seem to work with IE8

      d3.xml(inputDataDetails.uri, function(gpml) {
        pathvisiojs.data.gpml.toRenderableJson(gpml, inputDataDetails.pathwayIri, function(json) {
          callback(json);
        });
      });
    }
    else {
      return new Error('No data source specified or pathvisio.js cannot handle the data source specified.');

    }
  }

  function load(args) {

    // this function gets JSON and draws SVG representation of pathway

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.target) { return console.warn('Error: No target selector specified as target for pathvisiojs.'); }
    if (!args.data) { return console.warn('Error: No input data source (URL or WikiPathways ID) specified.'); }

    async.parallel({
      preload: function(callback) {
        pathvisiojs.view.pathwayDiagram.preload(args, function(loadArgs) {
          callback(null, loadArgs);
        })
      },
      pathway: function(callback){
        getJson(args.data, function(json) {
          console.log('json');
          console.log(json);
          callback(null, json);
        })
      }
    },
    function(err, results){
      self.results = results;
      var viewLoadArgs = results.preload;
      viewLoadArgs.pathway = results.pathway;

      pathvisiojs.view.pathwayDiagram.load(viewLoadArgs, function() {
        // do something here
      })


///*

      ///* Node Highlighter

      var nodeLabels = [];
      var dataNodes = results.pathway.elements.filter(function(element) {return element.nodeType === 'data-node';});
      dataNodes.forEach(function(node) {
        if (!!node.textLabel) {
          nodeLabels.push(node.textLabel.text);
        }
      });


      // see http://twitter.github.io/typeahead.js/

      $('#highlight-by-label-input').typeahead({
        name: 'Highlight node in pathway',
        local: nodeLabels,
        limit: 10
      });
//*/

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

      $( "#highlight-by-label-input" ).bind( "typeahead:selected", function() {
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {

          // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
          // a highlighter for svg, png, etc. as appropriate.

          pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(results.preload.svg, results.pathway, nodeLabel);
        }
      });

    });
  }

  return {
    load:load,
    getJson:getJson
  };
}();
;

pathvisiojs.utilities = function(){

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
        return this.offsetWidth;
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
        return this.offsetHeight;
      }
    }
  };

  function strToHtmlId(str) {
    var re = /\W/gi;
    var id = str.replace(re, "");
    return id;
  }

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

  // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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

  function isOdd(num) { return num % 2;}

  return{
    isUrl:isUrl,
    splitStringByNewLine:splitStringByNewLine,
    getUrlParam:getUrlParam,
    cloneNode:cloneNode,
    convertToArray:convertToArray,
    getWindowDimensions:getWindowDimensions,
    moveArrayItem:moveArrayItem,
    isOdd:isOdd,
    isWikiPathwaysId:isWikiPathwaysId,
    isNumber:isNumber,
    strToHtmlId:strToHtmlId,
    getObjectType:getObjectType
  };
}();



;

pathvisiojs.data = {};
;

pathvisiojs.data.bridgedb = function(){
  function getXrefAnnotationDataByDataNode(singleSpecies, node, callback) {
    getDataSources(function(dataSources) {
      var dataSourceRowCorrespondingToDataNodeXrefDatabase = getDataSourceRowByName(node.xRef.database, dataSources);
      var systemCode = dataSourceRowCorrespondingToDataNodeXrefDatabase.systemCode;
      getXrefAliases(singleSpecies, systemCode, node.xRef.id, function(xRefAliases) {
        var currentDataSourceRow;
        var listItems = xRefAliases.map(function(xRefAlias) {
          var listItem = {}
          listItem.title = xRefAlias.dataSourceName;
          listItem.text = xRefAlias.xRefId;
          currentDataSourceRow = getDataSourceRowByName(xRefAlias.dataSourceName, dataSources);
          listItem.priority = currentDataSourceRow.priority;
          if (currentDataSourceRow.hasOwnProperty('linkoutPattern')) {
            if (currentDataSourceRow.linkoutPattern !== "" && currentDataSourceRow.linkoutPattern !== null) {
              listItem.uri = currentDataSourceRow.linkoutPattern.replace('$id', node.xRef.id);
            }
          }
          return listItem;
        });

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

        // We want the identifier that was listed by the pathway creator for this data node to be listed first.

        var specifiedListItem = nestedListItems.filter(function(element) {return (element.key == node.xRef.database);})[0];
        var currentListItemIndex = nestedListItems.indexOf(specifiedListItem);
        nestedListItems = pathvisiojs.utilities.moveArrayItem(nestedListItems, currentListItemIndex, 0);

        var specifiedXRefId = specifiedListItem.values.filter(function(element) {return (element.text == node.xRef.id);})[0];
        var currentXRefIdIndex = specifiedListItem.values.indexOf(specifiedXRefId);
        specifiedListItem.values = pathvisiojs.utilities.moveArrayItem(specifiedListItem.values, currentXRefIdIndex, 0);

        var annotationData = {
          "header": node.textLabel.text,
          "description": node.dataNodeType,
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
    d3.tsv("http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php?target=datasources")
    .row(function(d) { return {dataSourceName: d.datasource_name, systemCode: d.system_code, websiteUrl: d.website_url, linkoutPattern: d.linkout_pattern, exampleIdentifier: d.example_identifier, entityIdentified: d.entity_identified, singleSpecies: d.single_species, priority: d.identifier_type, uri: d.uri, regex: d.regex, officialName: d.official_name}; })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  function getXrefAliases(singleSpecies, systemCode, xRefId, callback) {
    var bridgedbUrl = 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php?single_species=' + encodeURIComponent(singleSpecies) + '&system_code=' + encodeURIComponent(systemCode) + '&id=' + encodeURIComponent(xRefId);
    d3.tsv(bridgedbUrl)
    .row(function(d) { return {xRefId: d.id, dataSourceName: d.datasource_name}; })
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

pathvisiojs.data.gpml = function(){
    
  var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'Activity',
    'TBar':'InhibitoryActivity'
  };

  function toRenderableJson(gpml, pathwayIri, callback){
    self.gpml = gpml;
    
    var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var gpmlNamespace = null;
    try {
      gpmlNamespace = self.gpmlNamespace = gpmlPathway.attr('xmlns');
    }
    catch (e) {
      console.log(e.message);
      return;
    }

    // test for whether file is GPML

    if ( pathvisiojs.data.gpml.namespaces.indexOf(gpmlNamespace) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(gpmlNamespace) !== 0) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisiojs may not fully support the version of GPML provided (xmlns: " + gpmlNamespace + "). Please convert to the supported version of GPML (xmlns: " + pathvisiojs.data.gpml.namespaces[0] + ").");
      }

      jsonPathway = {
        "@id":pathwayIri,
        "wp:Author":
        [
          {"@id":"Khanspers"},
          {"@id":"Pjaiswal"},
          {"@id":"Ariutta"}
        ],
        "media:frameSize":{
          "media:width":parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
          "media:height":parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
        }
      };

      jsonPathway['@context'] = {
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "wp":"http://vocabularies.wikipathways.org/wp#",
        // TODO not taking into account revision, but it should be included in the IRI
        "wpId":"http://wikipathways.org/index.php/Pathway:WP",
        "gpmlFolder":"file://Users/andersriutta/Sites/pathvisiojs/test/gpml/",
        "gpml":"http://vocabularies.wikipathways.org/gpml#",
        "name":"http://xmlns.com/foaf/0.1/name",
        "dcterms":"http://purl.org/dc/terms/",
        "hMDB":"http://www.hmdb.ca/metabolites/HMDB",
        "entrezGene":"http://www.ncbi.nlm.nih.gov/gene/",
        "ChEBI":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=",
        "media":"http://www.w3.org/TR/mediaont-10/",
        "ex":"http://www.example.com/",
        "pathwayElements": {
          "@id": "ex:pathwayElements/",
          "@container": "@list"
        },
        "gpml:GraphRef": {
          "@type": "@id"
        },
        "ex:IsRefedBy": { "@reverse": "gpml:GraphRef" },
        "wp:Interaction": {
          "@type": "@id"
        },
        "gpml:Point": {
          "@id": "gpml:Point",
          "@container": "@list"
        },
        "gpml:SnappedPoint": {
          "gpml:GraphRef": "@id",
          "gpml:relX": "xsd:integer",
          "gpml:relY": "xsd:integer"
        },
        "gpml:GraphicalPoint": {
          "gpml:x": "xsd:integer",
          "gpml:y": "xsd:integer"
        }
      };

      var dataNode, elementIri, linestyle;
      jsonPathway.pathwayElements = {};
      gpmlPathway.selectAll('DataNode').each(function() {
        dataNode = d3.select(this);
        elementIri = pathwayIri + "#" + dataNode.attr('GraphId');
        jsonPathway.pathwayElements[elementIri] = {};
        jsonPathway.pathwayElements[elementIri]["@id"] = pathwayIri + '#' + dataNode.attr('GraphId');
        jsonPathway.pathwayElements[elementIri]["wp:DatasourceReference"] = {};
        jsonPathway.pathwayElements[elementIri]["wp:DatasourceReference"]["gpml:database"] = dataNode.select('Xref').attr('Database');
        jsonPathway.pathwayElements[elementIri]["wp:DatasourceReference"]["@id"] = dataNode.select('Xref').attr('ID')
        jsonPathway.pathwayElements[elementIri]["@type"] = "gpml:DataNode";
        jsonPathway.pathwayElements[elementIri]["gpml:DataNode"] = "wp:" + dataNode.attr('Type');
        jsonPathway.pathwayElements[elementIri]["gpml:textlabel"] = dataNode.attr('TextLabel');
        jsonPathway.pathwayElements[elementIri]["gpml:centerx"] = dataNode.select('Graphics').attr('CenterX');
        jsonPathway.pathwayElements[elementIri]["gpml:centery"] = dataNode.select('Graphics').attr('CenterY');
        jsonPathway.pathwayElements[elementIri]["gpml:width"] = dataNode.select('Graphics').attr('Width');
        jsonPathway.pathwayElements[elementIri]["gpml:height"] = dataNode.select('Graphics').attr('Height');
        linestyle = dataNode.select('Graphics').attr('LineStyle');
        if (!!linestyle) {
          linestyle = 'Solid';
        };
        jsonPathway.pathwayElements[elementIri]["gpml:linestyle"] = 'gpml:' + linestyle;
      })

      var interaction, anchor, points, interactionType;
      gpmlPathway.selectAll('Interaction').each(function() {
        interaction = d3.select(this);
        elementIri = pathwayIri + "#" + interaction.attr('GraphId');
        jsonPathway.pathwayElements[elementIri] = {};
        jsonPathway.pathwayElements[elementIri]["@id"] = pathwayIri + "#" + interaction.attr('GraphId');
        jsonPathway.pathwayElements[elementIri]["@type"] = "wp:Interaction";
        points = interaction.selectAll('Point');
        interactionType = 'wp:' + gpmlArrowHeadToSemanticMappings[points[0][points[0].length - 1].getAttribute('ArrowHead')];
        jsonPathway.pathwayElements[elementIri]["wp:Interaction"] = [];
        jsonPathway.pathwayElements[elementIri]["wp:Interaction"]["@id"] = pathwayIri + "#" + interaction.select('Point').attr('GraphRef');
        // TODO this is very rudimentary - it needs to be much improved for checking where the arrowhead is located, etc.
        jsonPathway.pathwayElements[elementIri]["wp:Interaction"]["@type"] = interactionType;
        jsonPathway.pathwayElements[elementIri]["wp:Interaction"][interactionType] = pathwayIri + "#" + points[0][points[0].length - 1].getAttribute('GraphRef');
        // TODO add the reaction, if it exists
        //"ex:reaction": pathwayIri + "#Reaction1"

        var connectorType = interaction.select('Graphics').attr('ConnectorType') || 'Straight';
        jsonPathway.pathwayElements[elementIri]["gpml:connectorType"] = "gpml:" + connectorType;

        var point, pointObj;
        jsonPathway.pathwayElements[elementIri]["gpml:Point"] = [];
        points.each(function() {
          point = d3.select(this);
          pointObj = {};
          var relX = point.attr('RelX');
          var relY = point.attr('RelY');
          if (!!relX && !!relY) {
            pointObj["@type"] = 'gpml:SnappedPoint';
            pointObj['gpml:SnappedPoint'] = {};
            pointObj['gpml:SnappedPoint']["gpml:GraphRef"] = pathwayIri + "#" + point.attr('GraphRef');
            pointObj['gpml:SnappedPoint']["gpml:RelX"] = relX;
            pointObj['gpml:SnappedPoint']["gpml:RelY"] = relY;
          }
          else {
            pointObj["@type"] = 'gpml:GraphicalPoint';
            pointObj['gpml:GraphicalPoint'] = {};
            pointObj['gpml:GraphicalPoint']["gpml:X"] = point.attr('X');
            pointObj['gpml:GraphicalPoint']["gpml:Y"] = point.attr('Y');
          }
          jsonPathway.pathwayElements[elementIri]["gpml:Point"].push(pointObj);
        })

        interaction.selectAll('Anchor').each(function() {
          anchor = d3.select(this);
          elementIri = pathwayIri + "#" + anchor.attr('GraphId');
          jsonPathway.pathwayElements[elementIri] = {};
          jsonPathway.pathwayElements[elementIri]["@id"] = pathwayIri + "#" + anchor.attr('GraphId');
          jsonPathway.pathwayElements[elementIri]["@type"] = "wp:Reaction";
          jsonPathway.pathwayElements[elementIri]["gpml:GraphRef"] = interaction["@id"];
          jsonPathway.pathwayElements[elementIri]["gpml:anchorPosition"] = anchor.attr('Position');
        })




















      })








      jsonPathway.metadata = {};
      jsonPathway.metadata.boardWidth = parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth'));
      jsonPathway.metadata.boardHeight = parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'));
      jsonPathway.metadata.name = d3.select(gpml).select('Pathway').attr('Name');
      jsonPathway.metadata.xmlns = d3.select(gpml).select('Pathway').attr('xmlns');
      jsonPathway.metadata.organism = d3.select(gpml).select('Pathway').attr('Organism');
      

      /*

      // infoBox
      // These values are a legacy from GenMAPP. They are always forced to be equal to 0 in PathVisio (Java) so as to place the infobox in the upper lefthand corner.

      pathway.infoBox.x = 0;
      delete pathway.infoBox.centerX;
      pathway.infoBox.y = 0;
      delete pathway.infoBox.centerY;
//*/



    async.parallel({
      jsonAnchorsFromEdges: function(callback) {
        var gpmlAnchors = gpmlPathway.selectAll('Anchor');
        var jsonAnchors;
        if (gpmlAnchors.length > 0) {
          jsonAnchors = [];
          gpmlAnchors.each(function() {
            pathvisiojs.data.gpml.anchor.getFromEdge(d3.select(this), function(renderableElement) {
              jsonAnchors.push(renderableElement);
            });
          });
          callback(null,jsonAnchors);
        }
        else {
          callback(null);
        }
      },
      elementsFromDataNodes: function(callback) {
        var gpmlDataNodes = gpmlPathway.selectAll('DataNode');
        var results = {};
        var elements = [];
        if (gpmlDataNodes.length > 0) {
          jsonDataNodes = [];
          jsonAnchors = [];
          gpmlDataNodes.each(function() {
            pathvisiojs.data.gpml.dataNode.toRenderableJson(d3.select(this), function(jsonDataNode, jsonAnchorsFromLastDataNode) {
              jsonDataNodes.push(jsonDataNode);
              jsonAnchors = jsonAnchors.concat(jsonAnchorsFromLastDataNode);
            });
          });
          elements = jsonAnchors.concat(jsonDataNodes);
          callback(null, elements);
        }
        else {
          callback(null);
        }
      },
      next: function(callback){
        callback(null);
      }
    },
    function(err, results){
      self.results = results;
      jsonPathway.elements = results.jsonAnchorsFromEdges.concat(results.elementsFromDataNodes);

      var gpmlGraphicalLines = gpmlPathway.selectAll('GraphicalLine');
      var jsonGraphicalLines = [];
      if (gpmlGraphicalLines.length > 0) {
        gpmlGraphicalLines.each(function() {
          pathvisiojs.data.gpml.graphicalLine.toRenderableJson(d3.select(this), function(jsonGraphicalLine) {
            jsonGraphicalLines.push(jsonGraphicalLine);
          });
        });
        jsonPathway.elements = jsonPathway.elements.concat(jsonGraphicalLines);
      }

      var gpmlInteractions = gpmlPathway.selectAll('Interaction');
      var jsonInteractions = [];
      if (gpmlInteractions.length > 0) {
        gpmlInteractions.each(function() {
          pathvisiojs.data.gpml.interaction.toRenderableJson(d3.select(this), function(jsonInteraction) {
            jsonInteractions.push(jsonInteraction);
          });
        });
        jsonPathway.elements = jsonPathway.elements.concat(jsonInteractions);
      }

      self.pathway = jsonPathway;
      callback(jsonPathway);
    })

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
          console.log("No element(s) named 'comment' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting comment to json: " + e.message);
      }

      // Groups

      try {
        if (pathway.hasOwnProperty('group')) {
          pathway.groups = pathvisiojs.utilities.convertToArray( pathway.group );
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
          console.log("No element(s) named 'graphicalLine' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting graphicalLine to json: " + e.message);
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
          console.log("No element(s) named 'interaction' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting interaction to json: " + e.message);
      }

      // Edges

      try {
        if (pathway.hasOwnProperty('edges')) {
          pathway.edges = pathvisiojs.pathway.edge.gpml2json(pathway.edges);
        }
        else {
          console.log("No element(s) named 'edges' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting edges to json: " + e.message);
      }

      //*/
    }
    else {
      alert("Pathvisiojs does not support the data format provided. Please convert to GPML and retry.");
      console.log("Pathvisiojs does not support the data format provided. Please convert to GPML and retry.");
      return;
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

pathvisiojs.data.gpml.dataNode = function() {

  function toRenderableJson(gpmlDataNode, callback) {
    self.gpmlDataNode = gpmlDataNode;
    var jsonDataNode = {};

    try {

      jsonDataNode.renderableType = 'node';
      jsonDataNode.nodeType = 'data-node';
      jsonDataNode.dataNodeType = caseConverter.paramCase(gpmlDataNode.attr('Type'));

      var xRef = gpmlDataNode.select('Xref');
      if ((!!xRef.attr('Database')) && (!!xRef.attr('ID'))) {
        jsonDataNode.xRef = {};
        jsonDataNode.xRef.database = xRef.attr('Database');
        jsonDataNode.xRef.id = xRef.attr('ID');
      }

      var jsonAnchorsFromThisDataNode;
      pathvisiojs.data.gpml.node.toRenderableJson(gpmlDataNode, jsonDataNode, function(jsonNode, jsonAnchorsFromThisNode) {
        jsonDataNode = jsonNode;
        jsonAnchorsFromThisDataNode = jsonAnchorsFromThisNode;
      });

      callback(jsonDataNode, jsonAnchorsFromThisDataNode);

    }
    catch (e) {
      console.log("Error converting data node to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
;

pathvisiojs.data.gpml.node = function(){

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

  // gpmlNode is NOT referring to data nodes exclusively. It is also referring to any other non-edge elements that can have anchors.

  function toRenderableJson(gpmlNode, jsonNode, callback) {
    try {

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

      var jsonAnchorsFromThisNode = pathvisiojs.data.gpml.anchor.getAllFromNode(jsonNode);

      var color;
      var colorValue = gpmlNode.select('Graphics').attr('Color');
      if (!!colorValue) {
        color = new RGBColor(colorValue);
        if (color.ok) {
          jsonNode.stroke = color.toHex();
        }
        else {
          console.warn('Invalid Color encountered. Setting Color to black.');
          jsonNode.stroke = "#000000";
        }
      }

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
        jsonNode.shapeType = caseConverter.paramCase(shapeType);
      }

      var fillColor = gpmlNode.select('Graphics').attr('FillColor'); 
      var validRGBFillColor;
      if (!!fillColor) {

        // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
        // license: Use it if you like it

        fillColor = fillColor.toLowerCase();

        if (fillColor === 'transparent') {
          jsonNode.fillOpacity = 0;
        }
        else {
          rGBFillColor = new RGBColor(fillColor);
          if (rGBFillColor.ok) {
            jsonNode.fill = rGBFillColor.toHex();
          }
          else {
            console.warn('Invalid FillColor encountered. Setting FillColor to gray.');
            jsonNode.fill = "#999999";
          }

          if (jsonNode.shapeType !== 'none') {
            jsonNode.fillOpacity = 1;
          }
        }
      }

      var strokeWidth = gpmlNode.select('Graphics').attr('LineThickness'); 
      if (!!strokeWidth) {
        jsonNode.strokeWidth = strokeWidth;
      }

      var attributes = gpmlNode.selectAll('Attribute');

      var strokeStyle = gpmlNode.select('Graphics').attr('LineStyle'); 
      if (!!strokeStyle) {
        strokeStyle = strokeStyle.toLowerCase();
        if (strokeStyle === 'broken') {
          jsonNode.strokeStyle = 'dashed';
        }
        else {
          jsonNode.strokeStyle = strokeStyle;
        }
      }
      else {

        // As currently specified, a given element can only have one strokeStyle.
        // This one strokeStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has strokeStyle of double.

        if (attributes.length > 0) {
          strokeStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (strokeStyle[0].length > 0) {
            jsonNode.strokeStyle = 'double';
          }
        }
      }

      ///*
      if (attributes.length > 0) {
        var cellularComponent = attributes.filter(function(d, i) {
          return d3.select(this).attr('Key') === 'org.pathvisiojs.CellularComponentProperty' && d3.select(this).attr('Value') != 'None';
        });
        if (cellularComponent[0].length > 0) {
          jsonNode.cellularComponent = cellularComponent.attr('Value');
        }
      }
      //*/

      // TODO move this to label.js
      // textLabel data

      var textLabel = gpmlNode.attr('TextLabel');
      self.gpmlNode = gpmlNode;
      console.log('textLabel');
      console.log(textLabel);
      ///*
      if (!!textLabel) {
        var text = textLabel.toString().replace("&#xA;","\r\n");

          jsonNode.textLabel = {};

          jsonNode.textLabel.text = text;

          if (jsonNode.hasOwnProperty("stroke")) {

            // jsonNode stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

            jsonNode.textLabel.fill = jsonNode.stroke;
          }

          // default fontSize is already specified in the CSS of pathway-template.svg, but I need the font size
          // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.
          
          var fontSize;
          fontSize = gpmlNode.select('Graphics').attr("FontSize");
          if (!fontSize) {
            fontSize = 10;
          }

          jsonNode.textLabel.fontSize = fontSize;

          var fontName;
          fontName = gpmlNode.select('Graphics').attr("FontName");
          if (!!fontName) {
            jsonNode.textLabel.fontFamily = fontName.toLowerCase();
          }

          var fontWeight;
          fontWeight = gpmlNode.select('Graphics').attr("FontWeight");
          if (!!fontWeight) {
            jsonNode.textLabel.fontWeight = fontWeight.toLowerCase();
          }

          var fontStyle;
          fontStyle = gpmlNode.select('Graphics').attr("FontStyle");
          if (!!fontStyle) {
            jsonNode.textLabel.fontStyle = fontStyle.toLowerCase();
          }

          var textAnchor;
          textAnchor = gpmlNode.select('Graphics').attr("Align");
          if (alignToAnchorMappings.hasOwnProperty(textAnchor)) {
            jsonNode.textLabel.textAnchor = textAnchor.toLowerCase();
          }
          else {
            jsonNode.textLabel.textAnchor = 'middle';
          }

          var vAlign;
          vAlign = gpmlNode.select('Graphics').attr("Valign");
          if (!!vAlign) {
            jsonNode.textLabel.vAlign = vAlign.toLowerCase();
          }
          else {
            jsonNode.textLabel.vAlign = 'top';
          }
        }
        //*/

/*



      if (element.graphics.hasOwnProperty("rotation")) {

        // get rotation in degrees because SVG rotate attribute uses degrees
        // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

        element.rotation = element.graphics.rotation * (180 / Math.PI);
        //element.rotation = Math.round( element.rotation * 100 ) / 100;
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

      callback(jsonNode, jsonAnchorsFromThisNode);
    }
    catch (e) {
      console.log("Error converting node to json: " + e.message);
      return e;
    }
  }

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  return {
    toRenderableJson:toRenderableJson,
    getPortCoordinates:getPortCoordinates
  };
}();
;

pathvisiojs.data.gpml.anchor = function() {

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

  function getFromEdge(gpmlAnchor, callback) {
    self.gpmlAnchor = gpmlAnchor;
    var jsonAnchor = {};

    try {
      jsonAnchor.id = gpmlAnchor.attr('GraphId');
      jsonAnchor.parentId = gpmlAnchor[0][0].parentNode.parentNode.attributes['GraphId'].textContent;
      jsonAnchor.position = gpmlAnchor.attr('Position');
      jsonAnchor.renderableType = 'anchor';
      callback(jsonAnchor);

    }
    catch (e) {
      console.log("Error converting anchor to renderable json: " + e.message);
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

    try {
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
    catch (e) {
      console.log("Error converting anchor to renderable json: " + e.message);
    }
  }



  return {
    getFromEdge:getFromEdge,
    getAllFromNode:getAllFromNode
  };
}();
;

pathvisiojs.data.gpml.interaction = function() {
  function toRenderableJson(gpmlInteraction, callback) {
    var jsonInteraction = {};

    try {
      jsonInteraction.edgeType = 'interaction';
      pathvisiojs.data.gpml.edge.toRenderableJson(gpmlInteraction, jsonInteraction, function(jsonEdge) {
        jsonInteraction = jsonEdge;
      });

      callback(jsonInteraction);

    }
    catch (e) {
      console.log("Error converting interaction to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
;

pathvisiojs.data.gpml.graphicalLine = function() {

  function toRenderableJson(gpmlGraphicalLine, callback) {
    var jsonGraphicalLine = {};

    try {
      jsonGraphicalLine.edgeType = 'graphical-line';
      pathvisiojs.data.gpml.edge.toRenderableJson(gpmlGraphicalLine, jsonGraphicalLine, function(jsonEdge) {
        jsonGraphicalLine = jsonEdge;
      });

      callback(jsonGraphicalLine);

    }
    catch (e) {
      console.log("Error converting graphicalLine to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
;

pathvisiojs.data.gpml.edge = function(){
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

  var strokeStyleMappings = {
    'Broken': 'dashed'
  };

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
    .data([annotationData])

    var annotationHeaderText = annotation.select('#annotation-header-text')
    .text(function(d) { return d.header; });

    var annotationIconMove = annotation.select('i.icon-move')
    .on("drag", function(d, i){
      // I think I need to play with absolute positioning for this
      // it doesn't currently work.
      //annotation.attr('transform', 'translate(10 10)');
    });

    var annotationIconRemove = annotation.select('i.icon-remove')
    .on("click", function(d, i){
      annotation.attr('style', 'visibility: hidden;');
    });

    var annotationDescription = annotation.select('#annotation-description')
    .text(function(d) { return d.description; });

    var annotationListItemsContainer = annotation.selectAll('#annotation-items-container')
    .data(function(d) {
      console.log('d annotationListItemsContainer');
      console.log(d);
      console.log([d.listItems]);
      return [d.listItems];
    });

    console.log(annotationListItemsContainer);

    // Update
    var annotationListItems = annotationListItemsContainer.selectAll('li')
    .data(function(d) {
      console.log('d annotationListItems');
      console.log(d);
      return d;
    });

    // Enter
    annotationListItems.enter().append('li');

    // Exit…
    annotationListItems.exit().remove();

    var annotationItemTitles = annotationListItems.selectAll('.annotation-item-title')
    .data(function(d) {
      console.log('d annotationListItems');
      console.log(d);
      return [d.key];
    })
    .enter().append('span')
    .attr('class', 'annotation-item-title')
    .text(function(d) {return d + ': ';});

    // Update
    var annotationItemPlainTextElements = annotationListItems.selectAll('span.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (!element.hasOwnProperty('uri')) {
          console.log('annotationItemPlainTextElement');
          console.log(element);
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

    // Exit…
    annotationItemPlainTextElements.exit().remove();

    // Update
    var annotationItemLinkedTextElements = annotationListItems.selectAll('a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          //console.log('annotationItemLinkedTextElement');
          //console.log(element);
          return element; 
        }
      }); 
    })
    .text(function(d) { return ' ' + d.text; });

    // Enter
    annotationItemLinkedTextElements.enter()
    .append('a')
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });

    // Exit…
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
  function render(organism, node) {
    var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, node, function(annotationData) {
      pathvisiojs.view.annotation.render(annotationData);
    });
  }

  return {
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram = function(){

  function getPreserveAspectRatioValues(preserveAspectRatio) {
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

  function fitElementWithinContainer(target, elementWidth, elementHeight, preserveAspectRatioValues) {

    // following svg standards.
    // see http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute

    var meetOrSlice, xScale, yScale, scale, elementWidthScaled, elementHeightScaled;
    var results = {};

    xScale = scale = target.width/elementWidth;
    yScale = target.height/elementHeight;

    if (preserveAspectRatioValues.align === 'none') {
      results.x = 0;
      results.y = 0;
      
      results.width = xScale * elementWidth;
      results.height = yScale * elementHeight;
    }
    else {
      if (preserveAspectRatioValues.meetOrSlice === 'meet') {
        scale = xScale = yScale = Math.min(xScale, yScale);
      }
      else {
        scale = xScale = yScale = Math.max(xScale, yScale);
      }

      results.width = xScale * elementWidth;
      results.height = yScale * elementHeight;

      xMapping = [
        {'x-min': 0},
        {'x-mid': target.width/2 - results.width/2},
        {'x-max': target.width - results.width}
      ];

      yMapping = [
        {'y-min': 0},
        {'y-mid': target.height/2 - results.height/2},
        {'y-max': target.height - results.height}
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

  function preload(args, callback) {

    // ********************************************
    // Get and define required data 
    // ********************************************

    if (!args.preserveAspectRatio) { args.preserveAspectRatio = 'xMidYMid'; }
    args.preserveAspectRatioValues = getPreserveAspectRatioValues(args.preserveAspectRatio);
    args.targetElement = d3.select(args.target);
    if (args.targetElement.length !== 1) { return console.warn('Error: Container selector must be matched by exactly one element.'); }
    args.target = {};
    args.target.element = args.targetElement;

    args.target.width = args.targetElement[0][0].getElementWidth();
    args.target.height = args.targetElement[0][0].getElementHeight();

    if (Modernizr.svg) {
      pathvisiojs.view.pathwayDiagram.svg.loadPartials(args, function(svg, uniformlyScalingShapesList) {
        console.log(svg);
        args.svg = svg;
        args.uniformlyScalingShapesList = uniformlyScalingShapesList;
        callback(args);
      })
    }
    else {

      // TODO use target selector and seadragon for this

      var pngUrl;
      var inputDataDetails = getInputDataDetails(args.data);
      if (!!inputDataDetails.wikiPathwaysId) {
        pngUrl = encodeURI('http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' + inputDataDetails.wikiPathwaysId + '&revision=' + inputDataDetails.revision);
      }
      else {

        // TODO update this link to a URL we control

        pngUrl = 'http://upload.wikimedia.org/wikipedia/commons/3/3b/Picture_Not_Yet_Available.png';
      }

      window.setTimeout(function() {
        $('#view').prepend('<img id="pathvisio-java-png" src="http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' +  + urlParamList.gpml + '&revision=' + urlParamList.gpmlRev + '" />')
      }, 50);
      callback(null);
    }
  }

  function load(args, callback) {
    if (!args || args == undefined) {
      if (!args.svg || args.svg == undefined) {
        return console.warn('Missing svg.');
      }
      if (!args.pathway || args.pathway == undefined) {
        return console.warn('Missing pathway.');
      }
      return console.warn('Missing required input parameter.');
    }
    console.log('args.pathway');
    console.log(args.pathway);
    if (Modernizr.svg) {
      pathvisiojs.view.pathwayDiagram.svg.load(args, function(svg) {
        console.log('view.load args');
        console.log(args);
        callback(args);
      })
    }
    else {
      // might not need to do anything here
    }
  }

  return{
    preload:preload,
    load:load,
    fitElementWithinContainer:fitElementWithinContainer
  };
}();

     
;

pathvisiojs.view.pathwayDiagram.pathFinder = function(){

  /*  Linear algebra conventions call for specifying an element of a matrix as row #, column #.
   *  The rows and columns use one-based indexing. Example: Element.1,2 is the element in the first row and the second column.
   *  The code in PathFinding.js uses x to refer to column # and y to refer to row #.
   *  JavaScript uses zero-based indexing for matrices. Example: matrix[0][1] refers to the element in the first row and the second column.
   *  This code will follow the PathFinding.js conventions and use zero-based indexing,
   *  so be careful to note this may differ from linear algebra conventions.
   * */

  function xYCoordinatesToMatrixLocation(x, y) {
    var results = {};
    results.column = Math.floor(x/pathvisioNS.grid.squareLength);
    results.row = Math.floor(y/pathvisioNS.grid.squareLength);
    return results;
  }

  function matrixLocationToXYCoordinates(column, row) {
    var results = {};
    results.x = column * pathvisioNS.grid.squareLength;
    results.y = row * pathvisioNS.grid.squareLength;
    return results;
  }

  function generateGridData(pathway, callback) {
    var nodes = pathway.elements.filter(function(element) {
      return element.renderableType === 'node';
    });
    nodes = d3.select(nodes).sort(function(node1, node2) {
      Math.min(node1.height, node1.width) - Math.min(node2.height, node2.width);
    });
    pathvisioNS.grid.squareLength = Math.min(nodes[0][0][0].height, nodes[0][0][0].width) / 7;
    var totalColumnCount = self.totalColumnCount = Math.ceil(pathway.metadata.boardWidth/pathvisioNS.grid.squareLength);
    var totalRowCount = self.totalRowCount = Math.ceil(pathway.metadata.boardHeight/pathvisioNS.grid.squareLength);

    var paddedMatrix = self.paddedMatrix = [];
    pathvisioNS.grid.gridRenderingData = [];

    // remember zero-based indexing means we want to go from 0 to totalRowCount - 1
    // and 0 to totalColumnCount - 1
    // last element is matrix[totalRowCount - 1][totalColumnCount - 1]

    for(var currentRow = 0; currentRow < totalRowCount; currentRow++) {
      paddedMatrix[currentRow] = [];
      for(var currentColumn = 0; currentColumn < totalColumnCount; currentColumn++) {
        paddedMatrix[currentRow][currentColumn] = 0;
      }
    }
    
    var tightMatrix, emptyMatrix;
    emptyMatrix = tightMatrix = paddedMatrix;

    // mark off no-go non-walkable regions for path finder (regions under nodes)

    var upperLeftCorner, lowerRightCorner, rowStart, rowEnd, columnStart, columnEnd;
    nodes[0][0].forEach(function(node) {
      upperLeftCorner = xYCoordinatesToMatrixLocation(node.x, node.y, pathvisioNS.grid.squareLength);
      lowerRightCorner = xYCoordinatesToMatrixLocation(node.x + node.width, node.y + node.height, pathvisioNS.grid.squareLength);

      columnStartTight = self.columnStartTight = Math.max((upperLeftCorner.column), 0);
      columnEndTight = self.columnEndTight = Math.min((lowerRightCorner.column), totalColumnCount - 1);
      rowStartTight = self.rowStartTight = Math.max((upperLeftCorner.row), 0);
      rowEndTight = self.rowEndTight = Math.min((lowerRightCorner.row), totalRowCount - 1);

      for(var currentRow=rowStartTight; currentRow<rowEndTight + 1; currentRow++) {
        for(var currentColumn=columnStartTight; currentColumn<columnEndTight + 1; currentColumn++) {
          tightMatrix[currentRow][currentColumn] = 1;
        }
      }

      columnStart = self.columnStart = Math.max((upperLeftCorner.column - 5), 0);
      columnEnd = self.columnEnd = Math.min((lowerRightCorner.column + 5), totalColumnCount - 1);
      rowStart = self.rowStart = Math.max((upperLeftCorner.row - 5), 0);
      rowEnd = self.rowEnd = Math.min((lowerRightCorner.row + 5), totalRowCount - 1);

      for(var currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        for(var currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
          paddedMatrix[currentRow][currentColumn] = 1;
          pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
            'x': currentColumn * pathvisioNS.grid.squareLength,
            'y': currentRow * pathvisioNS.grid.squareLength,
            'fill': 'blue'
          };
        }
      }
    });

    var anchors = pathway.elements.filter(function(element) {
      return element.renderableType === 'anchor';
    });

    var column1, column2, row1, row2, anchorPosition;
    anchors.forEach(function(anchor) {
      anchorPosition = xYCoordinatesToMatrixLocation(anchor.x, anchor.y);
      column1 = Math.max(Math.min((anchorPosition.column - 5 * anchor.dx), totalColumnCount - 1), 0);
      column2 = Math.max(Math.min((anchorPosition.column + 5 * anchor.dx), totalColumnCount - 1), 0);
      columnStart = Math.min(column1, column2);
      columnEnd = Math.max(column1, column2);

      row1 = Math.max(Math.min((anchorPosition.row - 5 * anchor.dy), totalRowCount - 1), 0);
      row2 = Math.max(Math.min((anchorPosition.row + 5 * anchor.dy), totalRowCount - 1), 0);
      rowStart = Math.min(row1, row2);
      rowEnd = Math.max(row1, row2);

      for(var currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        for(var currentColumn=columnStart; currentColumn < columnEnd + 1; currentColumn++) {
          paddedMatrix[currentRow][currentColumn] = 0;
          pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
            'x': currentColumn * pathvisioNS.grid.squareLength,
            'y': currentRow * pathvisioNS.grid.squareLength,
            'fill': 'yellow'
          };
        }
      }
    });

    pathvisioNS.grid.paddedGrid = new PF.Grid(totalColumnCount, totalRowCount, paddedMatrix);
    pathvisioNS.grid.tightGrid = new PF.Grid(totalColumnCount, totalRowCount, tightMatrix);
    pathvisioNS.grid.emptyGrid = new PF.Grid(totalColumnCount, totalRowCount, emptyMatrix);
    pathvisioNS.grid.gridRenderingData = pathvisioNS.grid.gridRenderingData.filter(function(element) {return !!element});

    callback();
  }

  function getPath(pathway, edge, callbackOutside) {
    var workingGrid = self.workingGrid = pathvisioNS.grid.paddedGrid.clone();
    var finder = self.finder = new PF.BiBreadthFirstFinder({
      allowDiagonal: false,
      dontCrossCorners: true
    });
    var points = edge.points;
    var pointStart = points[0];
    var pointEnd = points[points.length - 1];
    startLocation = self.startLocation = xYCoordinatesToMatrixLocation(pointStart.x, pointStart.y);
    endLocation = self.endLocation = xYCoordinatesToMatrixLocation(pointEnd.x, pointEnd.y);
    var pathData;
    async.series([
      function(callback){
        runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, function(data) {
          pathData = data;
          console.log('padded');
          console.log(pathData);
          console.log(pathData.length);
          callback(null);
        });
      },
      function(callback){
        if (pathData.length < 3) {
          workingGrid = self.workingGrid = pathvisioNS.grid.tightGrid.clone();
          runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, function(data) {
            pathData = data;
            console.log('tight');
            console.log(pathData);
            console.log(pathData.length);
            callback(null);
          });
        }
        else {
          callback(null);
        }
      },
      function(callback){
        if (pathData.length < 3) {
          workingGrid = self.workingGrid = pathvisioNS.grid.emptyGrid.clone();
          runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, function(data) {
            pathData = data;
            console.log('empty');
            console.log(pathData);
            console.log(pathData.length);
            pathData.push({'x': pointEnd.x, 'y': pointEnd.y});
            callback(null);
          });
        }
        else {
          callback(null);
        }
      }
    ],
    function(err) {
      console.log('returned');
      console.log(pathData);
      console.log(pathData.length);
      callbackOutside(pathData);
      //return pathData;
    });
  }

  function runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, callback) {

    /* 
     * Get blockyPath
     */

    var blockyPath = self.blockyPath = finder.findPath(startLocation.column, startLocation.row, endLocation.column, endLocation.row, workingGrid);
    console.log('blockyPath');
    console.log(blockyPath);

    /*
       var newWorkingGrid = pathvisioNS.grid.paddedGrid.clone();
       compressedMidpoints = PF.Util.smoothenPath(newWorkingGrid, blockyPath);
    //*/

    /* 
     * Get compressedMidpoints
     */
    // compress path data and extract points

    var compressedMidpoints = self.compressedMidpoints = [];
    var index = 0;
    if (blockyPath.length > 3) {
      do {
        index += 1;
        if ((blockyPath[index - 1][0] - blockyPath[index + 1][0]) && (blockyPath[index - 1][1] !== blockyPath[index + 1][1])) {
          compressedMidpoints.push([
            blockyPath[index][0],
            blockyPath[index][1]
          ]);
        }
      } while (index < blockyPath.length - 2);
    }
    else {
      console.log('blockyPath too short to compress.');
    }

    /* 
     * Get fullXYPath
     */

    var fullXYPath = self.fullXYPath = [];

    compressedMidpoints.forEach(function(element, index) {
      fullXYPath.push({
        'x': compressedMidpoints[index][0] * pathvisioNS.grid.squareLength,
        'y': compressedMidpoints[index][1] * pathvisioNS.grid.squareLength
      });
    });

    fullXYPath.unshift({'x': pointStart.x, 'y': pointStart.y});
    fullXYPath.push({'x': pointEnd.x, 'y': pointEnd.y});

    /* 
     * Get smootherPath
     */

    var smootherPath = self.smootherPath = [];
    index = 0;
    if (fullXYPath.length > 2) {
      do {
        index += 1;
        if ((Math.abs(fullXYPath[index].x - fullXYPath[index - 1].x) > 2 * pathvisioNS.grid.squareLength || Math.abs(fullXYPath[index + 1].x - fullXYPath[index].x) > 2 * pathvisioNS.grid.squareLength) && (Math.abs(fullXYPath[index].y - fullXYPath[index - 1].y) > 2 * pathvisioNS.grid.squareLength || Math.abs(fullXYPath[index + 1].y - fullXYPath[index].y) > 2 * pathvisioNS.grid.squareLength)) {
          smootherPath.push(fullXYPath[index]);
        }
      } while (index < fullXYPath.length - 2);
    }
    else {
      console.log('fullXYPath too short to smooth.');
    }

    smootherPath.unshift({'x': pointStart.x, 'y': pointStart.y});
    smootherPath.push({'x': pointEnd.x, 'y': pointEnd.y});


    /*
    // reposition start and end point to match source and origin
    if (smootherPath.length === 2) {
    if (Math.abs(smootherPath[1].x - pointStart.x) < Math.abs(smootherPath[1].x - pointEnd.x)) {
    smootherPath[1].x = pointStart.x;
    smootherPath[1].y = pointEnd.y;
    }
    else {
    smootherPath[1].x = pointEnd.x;
    smootherPath[1].y = pointStart.y;
    }
    }
    else {
    if (Math.abs(smootherPath[1].x - pointStart.x) < Math.abs(smootherPath[1].y - pointStart.y)) {
    smootherPath[1].x = pointStart.x;
    }
    else {
    smootherPath[1].y = pointStart.y;
    }

    if (Math.abs(smootherPath[smootherPath.length - 2].x - pointEnd.x) < Math.abs(smootherPath[smootherPath.length - 2].y - pointEnd.y)) {
    smootherPath[smootherPath.length - 2].x = pointEnd.x;
    }
    else {
    smootherPath[smootherPath.length - 2].y = pointEnd.y;
    }
    }
    //*/





    callback(smootherPath);
    //return smootherPath;
  }

  return {
    generateGridData:generateGridData,
    getPath:getPath,
    xYCoordinatesToMatrixLocation:xYCoordinatesToMatrixLocation,
    matrixLocationToXYCoordinates:matrixLocationToXYCoordinates
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg = function(){

  var svg, pathway, shapesAvailable, markersAvailable;

  function setCTM(element, matrix) {
    var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
    element.setAttribute("transform", s);
  }

  function load(args, callback) {
    if (!args) {
      if (!args.svg) {
        return console.warn('Missing svg.');
      }
      if (!args.pathway) {
        return console.warn('Missing pathway.');
      }
      return console.warn('Missing required input parameter.');
    }
    var svg = args.svg;
    async.series([
      function(callback) {
        pathvisioNS.grid = {};
        pathvisiojs.view.pathwayDiagram.pathFinder.generateGridData(results.pathway, function() {
          callback(null);
        });
      },
      function(callback){
        // TODO get SVG from where it was already defined
        svg = d3.select('body').select('#pathway-svg')
        //draw(svg, pathway, function() {
        pathvisiojs.view.pathwayDiagram.svg.render(args, function() {
          callback(null);
        })
      },
      function(callback) {
        var svgDimensions = self.svgDimensions = pathvisiojs.view.pathwayDiagram.fitElementWithinContainer(args.target, results.pathway.metadata.boardWidth, results.pathway.metadata.boardHeight, args.preserveAspectRatio);
        self.svgDimensions = svgDimensions;
        d3.select('#loading-icon').remove();

        var initialClick = false;
        svg.attr('style', 'display: inline; width: ' + args.target.width + 'px; height: ' + args.target.height + 'px; ')
        .on("click", function(d, i){
          svgPanZoom.setZoom(true);
          initialClick = true;
        })
        .on("mouseover", function(d, i){
          if (initialClick) {
            svgPanZoom.setZoom(true);
          }
        })
        .on("mouseout", function(d, i){
          if (initialClick) {
            svgPanZoom.setZoom(false);
          }
        });

        // TODO avoid defining svg again

        var svgElement = document.querySelector('svg');
        var m1 = svgElement.getCTM();
        var p = {'x': m1.e, 'y': m1.f};
        var m2 = svgElement.createSVGMatrix().translate(p.x, p.y).scale(svgDimensions.scale).translate(-p.x, -p.y);
        var viewport = svgElement.querySelector('#viewport');
        setCTM(viewport, m2);

        /*
         * function setCTM(element, matrix) {
         var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
         console.log(s);

         element.setAttribute("transform", s);
         }
         var svgElement = document.querySelector('svg');
         var m1 = svgElement.getCTM();
         var xScale1 = m1.a;
         var yScale1 = m1.d;
         var zoomFactor = 0.2;
         var p = {'x': m1.e, 'y': m1.f};
         var z = xScale1 * (1+zoomFactor);
         var m2 = svgElement.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);
         var viewport = svgElement.querySelector('#viewport');
         setCTM(viewport, m2);
        //*/

        svgPanZoom.init({
          'root': 'svg',
          'enableZoom': false 
        });
        callback(null);
      }
    ],
    function(err, results) {
      callback();
    });
  }

  function loadPartials(args, callbackOutside) {
    var pathvisioJsContainer, pathwayContainer, uniformlyScalingShapesList;
    async.series([
      function(callback) {
        args.target.element.html(pathvisioNS['tmp/pathvisio-js.html']);
        pathvisioJsContainer = args.target.element.select('#pathvisio-js-container');
        pathwayContainer = pathvisioJsContainer.select('#pathway-container')
        .attr('class', args.preserveAspectRatioValues.yAlign);

        svg = pathvisioJsContainer.select('#pathway-svg')
        .attr('class', args.preserveAspectRatioValues.xAlign)
        //.attr('viewBox', '0 0 ' + args.target.width + ' ' + args.target.height)
        .attr('style', 'display: none; ');

        callback(null);
      },
      function(callback){


        /*
        // Update…
        var pd3 = docfragd3.selectAll("p")
            .data([3, 4, 8, 15, 16, 23, 42])
            .text(String);

        // Enter…
        pd3.enter().append("p")
            .text(String);

        // Exit…
        pd3.exit().remove();

        d3.select('document').append(docfragd3);



// Update…
var container = d3.select('div.test')
.data([{'pathway':{'elements':[{'id':'node-a', 'label':'123', 'type':'node'}, {'id':'node-b', 'label':'456', 'type':'node'}, {'id':'edge-c', 'label':'79', 'type':'edge'}]}}])
.attr('class', 'test');  

// Enter…
container.enter().append("div")
.attr('class', 'test');  

// Exit…
container.exit().remove();

// Update… 
var nodes = container.selectAll("p.node")
.data(function(d) { return d.pathway.elements.filter(function(element) {return element.type === 'node'})})
.text(function(d) {
  return d.label;
});

// Enter…
nodes.enter().append("p")
.attr('class', 'node')
.text(function(d) {
  return d.label;
});

// Exit…
nodes.exit().remove();

// Update… 
var edges = container.selectAll("p.edge")
.data(function(d) { return d.pathway.elements.filter(function(element) {return element.type === 'edge'}); })
.text(function(d) {
  return d.label;
});

// Enter…
edges.enter().append("p")
.attr('class', 'edge')
.text(function(d) {
  return d.label;
});

// Exit…
edges.exit().remove();

// doing this again




// Update…
var container = d3.select('div.test')
.data([{'pathway':{'elements':[{'id':'node-a', 'label':'123', 'type':'node'}, {'id':'node-b', 'label':'456', 'type':'node'}, {'id':'edge-c', 'label':'79', 'type':'edge'}, {'id':'edge-c', 'label':'hi', 'type':'edge'}, {'id':'edge-c', 'label':'wow', 'type':'edge'}, {'id':'edge-c', 'label':'aaa', 'type':'edge'}, {'id':'edge-c', 'label':'bbb', 'type':'edge'}, {'id':'edge-c', 'label':'ccc', 'type':'edge'}]}}])
.attr('class', 'test');  



// Enter…
edges.data(function(d) { return d.pathway.elements.filter(function(element) {return element.type === 'edge'}); })
.enter().append("p")
.attr('class', 'edge')
.text(function(d) {
  return d.label;
});


        //*/

        //var loadingImage = targetElement.select('#pathway-image');




        ///*
        //var docfrag = document.createDocumentFragment();
        //var div = d3.select(docfrag).append('div');
        //var div = document.createElement('div');
        //args.target.element.html(pathvisioNS['tmp/pathvisio-js.html']);
        ////*/

        callback(null);
      },
      function(callback) {
        if (!!args.customMarkers) {
          pathvisiojs.view.pathwayDiagram.svg.edge.marker.loadAllCustom(svg, args.customMarkers, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      function(callback) {
        if (!!args.customShapes) {
          pathvisiojs.view.pathwayDiagram.svg.node.shape.uniformlyScalingShape.loadAllCustom(svg, args.customShapes, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      function(callback) {
        pathvisiojs.view.pathwayDiagram.svg.node.shape.uniformlyScalingShape.getUniformlyScalingShapesList(svg, function(data) {
          uniformlyScalingShapesList = data;
          callback(null);
        });
      },
      function(callback) {
        if (!!args.cssUrl) {
          d3.text(args.cssUrl, 'text/css', function(data) {
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
      callbackOutside(svg, uniformlyScalingShapesList);
    });
  }

  function render(args, callback){
    if (!args) {
      if (!args.svg) {
        console.warn('Error: No svg specified.');
        return 'Error';
      }
      if (!args.pathway) {
        console.warn('Error: No data entered as input.');
        return 'Error';
      }
      if (!args.uniformlyScalingShapesList) {
        console.warn('Error: No uniformlyScalingShapesList specified.');
        return 'Error';
      }
      console.warn('Error: Missing required input.');
      return 'Error';
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

    // TODO refactor so that svg isn't redefined here
    // Update…
    var viewport = svg.select('#viewport')
    .data([args.pathway]);

    //.attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
    /*
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        pathvisiojs.view.pathwayDiagram.svg.xRef.render(pathway.organism, d);
      }
    });
    */

    // Enter…
    /*
    viewport.enter().append("g")
    .attr("id", function (d) { return 'node-' + d.id; })
    .attr("id", 'viewport');
    //*/

    // Exit…
    viewport.exit().remove();

    console.log('viewport');
    console.log(viewport);

    console.log('args');
    console.log(args);

    pathvisiojs.view.pathwayDiagram.svg.node.renderAll(viewport, args.pathway, args.uniformlyScalingShapesList);

    //svg.attr('width', pathway.metadata.boardWidth);
    //svg.attr('height', pathway.metadata.boardHeight);

    /*
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

    if (pathway.hasOwnProperty('groups')) {
      pathvisiojs.view.pathwayDiagram.svg.group.renderAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('edges')) {
      pathvisiojs.view.pathwayDiagram.svg.edge.renderAll(svg, pathway);
    }
    else {
    console.log('none');
    }



    if (pathway.hasOwnProperty('infoBox')) {
      pathvisiojs.view.pathwayDiagram.svg.infoBox.render(svg, pathway);
    }

    //pathvisiojs.view.pathwayDiagram.svg.grid.render(svg);

    //pathvisiojs.view.pathwayDiagram.svg.anchor.renderAll(svg, pathway);

      window.svg = d3.select("svg")
      .attr('style', 'width: 500px');
//*/
    callback(svg);
  }

  return {
    render:render,
    load:load,
    loadPartials:loadPartials
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.group = function(){
  function renderAll(svg, pathway) {
    if (!svg || !pathway) {
      return console.warn('Error: Missing input parameters.');
    }

    var groups = pathway.groups;
    if (!groups) { return console.warn('Error: No group data available.');}

    // only consider non-empty groups

    var validGroups = groups.filter(function(el) {
      var groupId = el.groupId;
      return (pathway.nodes.filter(function(el) {return (el.groupRef === groupId);}).length>0);
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
      var groupDimensions = getDimensions(pathway, d.groupId);
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
    renderAll:renderAll,
    getDimensions:getDimensions
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.infoBox = function(){
    
  function render(svg, pathway) {
    if (!svg || !pathway) {
      return console.warn('Error: Missing input parameters.');
    }

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathway.hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':pathway.name});
    }

    if (pathway.hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':pathway.license});
    }

    if (pathway.hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathway.lastModified});
    }

    if (pathway.hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':pathway.organism});
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
    render:render
  };
}();
;

// Draw nodes. Includes data nodes, shapes, labels, cellular components...

pathvisiojs.view.pathwayDiagram.svg.node = function(){
  
  var pathwayHere, uniformlyScalingShapesListHere;

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
    args.uniformlyScalingShapesList = uniformlyScalingShapesListHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});

  }

  function renderAll(viewport, pathway, uniformlyScalingShapesList) {
    if (!viewport || !pathway) {
      if (!viewport) {
        console.log('viewport');
      }
      if (!pathway) {
        console.log('pathway');
      }
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    pathwayHere = pathway;
    uniformlyScalingShapesListHere = uniformlyScalingShapesList;
    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    // Update… 
    var nodes = viewport.selectAll("g.node")
    .data(function(d) {
      console.log('d');
      console.log(d);
      return d.elements.filter(function(element) { return element.renderableType === 'node'; })
    })
    .attr("id", function (d) { return 'node-' + d.id; })
    .attr('class', 'node')
    .attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
    .on("click", function(d,i) {
      console.log('clicked a data node');
      if (d.nodeType === 'data-node') {
        console.log(pathway);
        console.log(pathway.metadata.organism);
        pathvisiojs.view.annotation.xRef.render(pathway.metadata.organism, d);
      }
    })
    .call(drag)

    // Enter…
    nodes.enter().append("g")
    .attr("id", function (d) { return 'node-' + d.id; })
    .attr("class", function (d) {
      var styleClass = 'node ';
      if (d.strokeStyle === 'double') {
        styleClass += 'double ';
      }
      return styleClass;
    })
    .attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
    .on("click", function(d,i) {
      console.log('clicked a data node');
      if (d.nodeType === 'data-node') {
        console.log(pathway);
        console.log(pathway.metadata.organism);
        pathvisiojs.view.annotation.xRef.render(pathway.metadata.organism, d);
      }
    })
    .call(drag);

    // Exit…
    nodes.exit().remove();

    // Shapes
    pathvisiojs.view.pathwayDiagram.svg.node.shape.render(nodes, pathway, uniformlyScalingShapesList);

    // Labels
    pathvisiojs.view.pathwayDiagram.svg.node.label.renderAll(nodes, pathway);
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
    renderAll:renderAll,
    getPortCoordinates:getPortCoordinates,
    highlightByLabel:highlightByLabel
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.shape = function(){
  function getElementType(shapeType, uniformlyScalingShapesList) {
    if (uniformlyScalingShapesList.indexOf(shapeType) > -1) {
      elementType = 'use';
    }
    else {
      elementType = 'path';
    }
    return elementType;
  }

  function render(nodes, pathway, uniformlyScalingShapesList) {
    if (!nodes || !pathway) {
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes or pathway.');
    }


    //not sure whether to break this up into separate classes like immediately below

    pathvisiojs.view.pathwayDiagram.svg.node.shape.uniformlyScalingShape.renderAll(nodes, pathway, uniformlyScalingShapesList);
    pathvisiojs.view.pathwayDiagram.svg.node.shape.nonuniformlyScalingShape.renderAll(nodes, pathway, uniformlyScalingShapesList);

    /*
    // or do it all here with functions for specifying element type, etc. (This doesn't work yet below.)
    if (!nodes || !pathway || !uniformlyScalingShapesList) {
      console.log(uniformlyScalingShapesList);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!uniformlyScalingShapesList) {
        console.log('uniformlyScalingShapesList not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or uniformlyScalingShapesList.');
    }

    // Update… 
    var shapes = nodes.selectAll(".shape")
    .data([function(d) {
      console.log('d inside here');
      console.log(d);
      return d;
    }])
    .attr('class', 'shape')

    // Enter…
    //shapes.enter().append('path')
    shapes.enter().append(function(d) {
      var elementType = getElementType(d.shapeType, uniformlyScalingShapesList);
      console.log('elementType');
      console.log(elementType);
      return elementType;
    })
    .attr('class', 'shape');

    // Exit…
    shapes.exit().remove();

//*/

  }

  return {
    render:render
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.shape.uniformlyScalingShape = function(){
  function appendCustom(customShape, callback) {
    // TODO don't select svg again
    var svg = d3.select('#pathway-svg');
    if (1===1) {
      d3.xml(customShape.url, 'image/svg+xml', function(svgXml) {

        def = svg.select('defs').select('#' + customShape.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customShape.id)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }


        var shape = d3.select(svgXml.documentElement)
        var width = shape.attr('width');
        var height = shape.attr('height');

        def.attr('viewBox', '0 0 ' + width + ' ' + height);

        var parent = document.querySelector('#' + customShape.id);


        var d3Svg = shape[0][0].children;
        var i = -1;
        do {
          i += 1;
          parent.appendChild(d3Svg[i]);
        } while (i < d3Svg.length - 1);
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = customShape.url;
      img.onload = function() {
        def = svg.select('defs').select('#' + customShape.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customShape.id)
          .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }
        dimensions = def.attr('viewBox').split(' ');

        /*
        def.append('image').attr('xlink:xlink:href', customShape.url)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");
        //*/

        callback(null);
      }
    }

    /*
    def.append('object').attr('data', customShape.url)
    .attr('x', dimensions[0])
    .attr('y', dimensions[1])
    .attr('width', dimensions[2])
    .attr('height', dimensions[3])
    .attr('type', "image/svg+xml");
    //*/


  }

  function loadAllCustom(svg, customShapes, callback) {
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    async.each(customShapes, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function getUniformlyScalingShapesList(svg, callback) {
    var uniformlyScalingShapesList = [];
    svg.select('defs').selectAll('symbol')[0].forEach(function(element){
      uniformlyScalingShapesList.push(element.id);
    });
    callback(uniformlyScalingShapesList);
  }

  function render(uniformlyScalingShape) {
    uniformlyScalingShape.attr("id", function (d) {return 'shape-' + d.id;})
    .attr('transform', function(d) {
      var transform = 'scale(1)';
      if (d.hasOwnProperty('rotation')) {
        transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
      }
      return transform;
    })
    .attr("class", function (d) {
      var styleClass = 'shape ';
      if (d.elementType === 'data-node') {
        styleClass += d.dataNodeType + ' ';
      }
      if (d.strokeStyle === 'double') {
        styleClass += 'double-original ';
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

        /*
        if (d.strokeStyle === 'double') {

          // render second element

          d3.select(nodesContainer[0][i]).append("use")
          .attr("id", function (d) {return 'node-double' + d.id;})
          .attr("class", function (d) {
            var styleClass = '';
            if (d.elementType === 'data-node') {
              styleClass = 'node ' + d.dataNodeType;
            }
            else {
              styleClass = 'node';
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
          .attr("xlink:xlink:href", function (d) {return "#" + d.shapeType;})
          //.attr("class", "stroke-color-equals-default-fill-color")
          .attr("style", function(d) { return style + 'fill-opacity:0; ';});
        }
        //*/
      }

      // be careful that all additions to 'style' go above the 'double-line second element' above
      // so that they are applied to both the first and second elements.

      return style;
    })
    .attr("xlink:xlink:href", function(d) {return '#' + d.shapeType;});
  }

  function renderAll(nodes, pathway, uniformlyScalingShapesList) {
    if (!nodes || !pathway || !uniformlyScalingShapesList) {
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!uniformlyScalingShapesList) {
        console.log('uniformlyScalingShapesList not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or uniformlyScalingShapesList.');
    }

    var uniformlyScalingNodes = nodes.filter(function(d, i) { return uniformlyScalingShapesList.indexOf(d.shapeType) > -1; });

    // Update… 
    var uniformlyScalingShapes = uniformlyScalingNodes.selectAll("use.shape")
    .data(function(d) {
      return [d];
    })
    .call(render);

    // Enter…
    uniformlyScalingShapes.enter().append("use")
    .call(render);

    // Exit…
    uniformlyScalingShapes.exit().remove();
  }

  return {
    renderAll:renderAll,
    loadAllCustom:loadAllCustom,
    getUniformlyScalingShapesList:getUniformlyScalingShapesList
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.shape.nonuniformlyScalingShape = function(){
  function render(nonuniformlyScalingShape) {

    // TODO this seems like a hack. How can the code be refactored so this line below is not needed?

    if (!nonuniformlyScalingShape[0] || nonuniformlyScalingShape[0].length < 1) {return 'nonuniformlyScalingNodes empty'};
    self.nonuniformlyScalingShape = nonuniformlyScalingShape;
    nonuniformlyScalingShape.attr("id", function (d) {return 'shape-' + d.id;})
    .attr("class", function (d) {
      var styleClass = '';
      if (d.elementType === 'data-node') {
        styleClass = 'shape ' + d.dataNodeType + ' ' + d.shapeType;
      }
      else {
        styleClass = 'shape ' + d.shapeType;
      }
      return styleClass;
    })

    // TODO there must be a cleaner, less brittle way of getting nodeData here

    var nodeData = nonuniformlyScalingShape[0].parentNode.__data__;
    var shapeType = caseConverter.camelCase(nodeData.shapeType);
    var nonuniformlyScalingShapeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.shape.nonuniformlyScalingShape[shapeType].getAttributes(nodeData.width, nodeData.height);
    nonuniformlyScalingShapeAttributes.forEach(function(attribute) {
      nonuniformlyScalingShape.attr(attribute.name, attribute.value)
    });
  }

  function renderAll(nodes, pathway, uniformlyScalingShapesList) {
    if (!nodes || !pathway || !uniformlyScalingShapesList) {
      console.log(uniformlyScalingShapesList);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!uniformlyScalingShapesList) {
        console.log('uniformlyScalingShapesList not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or uniformlyScalingShapesList.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return uniformlyScalingShapesList.indexOf(d.shapeType) === -1; });

    // Update… 
    var nonuniformlyScalingShapes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    nonuniformlyScalingShapes.enter().append("path")
    .call(render);

    // Exit…
    nonuniformlyScalingShapes.exit().remove();

  }

  return {
    renderAll:renderAll
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.shape.nonuniformlyScalingShape.roundedRectangle = function(){

  // Be sure to specify style elements like default fill and stroke color!
  // This can be done in the JSON below, or it can be done via defining a CSS class. If you choose to use a CSS class,
  // the class name must be the same as the shape name, except in dash case (roundedRectangle would be rounded-rectangle).
  // The CSS file is located at /src/css/pathway-template.css

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:'d',
          value: 'm0,2.5c0,-1.35845 1.14155,-2.5 2.5,-2.5l' + (nodeWidth - 5) + ',0c1.35844,0 2.5,1.14155 2.5,2.5l0,' + (nodeHeight - 5) + 'c0,1.35845 -1.14156,2.5 -2.5,2.5l' + (5 - nodeWidth) + ',0c-1.35845,0 -2.5,-1.14155 -2.5,-2.5l0,' + (5 - nodeHeight) + 'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.node.label = function(){
  function renderAll(nodes, pathway) {
    if (!nodes || !pathway) {
      if (!nodes) {
        console.log('nodes');
      }
      if (!pathway) {
        console.log('pathway');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway.');
    }

    // Update… 
    var labels = nodes.selectAll("text.label")
    .data(function(d) { return [d]; })
    .call(render);

    // Enter…
    labels.enter().append("text")
    .call(render);

    // Exit…
    labels.exit().remove();
  }

  function render(nodeText) {
    nodeText.attr("id", function (d) { return 'node-text-' + d.id;})
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
            dy = d.height - (5 + (0.3 * d.textLabel.fontSize) + ((pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize));
          }
          else {
            dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
          }
        }
      }
      else {
        dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
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
            var textArray = pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text);
            return textArray;
          })
          .enter()
          .append('tspan')
          .attr("x", 0)
          .attr("y", function (d, i) { return i * fontSize;})
          .text(function (d) { return d;});
        });
  }


  return {
    renderAll:renderAll
  };
}();
;

// Edges (interactions and graphical lines)

pathvisiojs.view.pathwayDiagram.svg.edge = function(){

  function render(svg, pathway, edge) {
    if (!svg || !pathway || !edge) {
      return console.warn('Error: Missing one or more required parameters: svg, pathway, edge.');
    }

      var pathData = null;
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(svg, pathway, edge, function(data) {
          pathData = data;
          console.log('pathData');
          console.log(pathData);

      var edgeElement = svg.select('#viewport').append("path")
      .attr("id", edge.edgeType + '-' + edge.id )
      .attr("class", function () {
        var styleClass = 'edge ' + edge.edgeType + ' ';
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke";
          }
        }
        return styleClass;
      })
      .attr("style", function () {
        var style = 'stroke-width:' + edge.strokeWidth + '; ';
        if (edge.hasOwnProperty('stroke')) {
          style += 'stroke:' + edge.stroke + '; ';
        }
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * edge.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function () {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, edge.markerStart, 'start', edge.stroke);
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function () {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, edge.markerEnd, 'end', edge.stroke);
        if (edge.hasOwnProperty('strokeStyle')) {
          if (edge.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function () {
          if (edge.hasOwnProperty('strokeStyle')) {
            if (edge.strokeStyle === 'double') {

              // setting stroke-width equal to its specified line value is
              // what PathVisio (Java) does, but the white line (overlaying the
              // thick line to create a "double line") is hard to see at 1px.

              svg.select('#viewport').append("path")
              .attr("class", edge.edgeType + "-double")
              .attr("d", pathData)
              .attr("class", "stroke-color-equals-default-fill-color")
              .attr("style", "stroke-width:" + edge.strokeWidth + '; ')
              .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, edge.markerStart, 'start', edge.stroke) + ')')
              .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, edge.markerEnd, 'end', edge.stroke) + ')');
            }
          }
          console.log('pathData used');
          console.log(pathData);
          return pathData;
        });
      });
  }


  function renderAll(svg, pathway) {
    if (!svg || !pathway) {
      return console.warn('Error: Missing one or more required parameters: svg, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = svg.select('#viewport').selectAll("pathway.edge")
      .data(pathway.edges)
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
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, d.markerStart, 'start', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (d) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, d.markerEnd, 'end', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
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
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(svg, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            svg.select('#viewport').append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(svg, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }

  return {
    render:render,
    renderAll:renderAll
  };
}();
  
;

pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  function appendCustom(customMarker, callback) {
    // TODO don't select svg again
    var svg = d3.select('#pathway-svg');
    if (1===1) {
      d3.xml(customMarker.url, 'image/svg+xml', function(svgXml) {

        def = svg.select('defs').select('#' + customMarker.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('marker')
          .attr('id', customMarker.id)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }


        var marker = d3.select(svgXml.documentElement)
        var width = marker.attr('width');
        var height = marker.attr('height');

        def.attr('viewBox', '0 0 ' + width + ' ' + height);

        var parent = document.querySelector('#' + customMarker.id);
        parent.appendChild(svgXml.documentElement);
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = customMarker.url;
      img.onload = function() {
        def = svg.select('defs').select('#' + customMarker.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customMarker.id)
          .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }
        dimensions = def.attr('viewBox').split(' ');

        def.append('image').attr('xlink:xlink:href', customMarker.url)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");

        callback(null);
      }
    }
  }

  function loadAllCustom(svg, customMarkers, callback) {
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    async.each(customMarkers, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function render(svg, name, position, color) {
    var markerUrl = '';

    // if no marker is to be used, JSON data will specify 'none'.

    if (name === 'none') {
      markerUrl = name;
    }
    else {

      // check for whether the desired marker is defined once in the pathway template svg.

      var markerElementBlack = svg.select('marker#' + name + '-' + position + '-black');

      if (markerElementBlack.length === 1) {

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

          var markerElement = pathvisiojs.utilities.cloneNode(markerElementBlack[0][0]);

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
    render:render,
    loadAllCustom:loadAllCustom
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.edge.point = function(){

  // pathvisiojs vs PathVisio (Java) specification of anchor position
  // -----------------------------------------
  // pathvisiojs |  PathVisio  | Meaning
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

  function getCoordinates(svg, pathway, point) {
    if (!svg || !pathway || !point) {
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
            var groupDimensions = pathvisiojs.view.pathwayDiagram.svg.group.getDimensions(pathway, edgeTerminusRef.groupId);
            coordinates = pathvisiojs.view.pathwayDiagram.svg.node.getPortCoordinates(groupDimensions, point.relX, point.relY);
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
// [PathVisio Java code for elbows](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisiojs.core/src/org/pathvisio/core/model/ElbowConnectorShape.java)
// [jsPlumb JavaScript implemention of elbows](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-flowchart.js)
// [W3C documention on vertical and horizontal path movement - "lineto" commands - for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
//
// Bezier Curves:
// [PathVisio Java code for cubic bezier curve](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisiojs.core/src/org/pathvisio/core/model/CurvedConnectorShape.java)
// [jsPlumb JavaScript implemention of bezier curves](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-bezier.js)
// [W3C documention on cubic bezier curves for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
// There are other types of SVG curves, but I understand the Java code to use bezier curves.

pathvisiojs.view.pathwayDiagram.svg.edge.pathData = function(){

  function getPathDirectionForElbowFromPoint(pathway, edge, point) {
    var direction, otherEndDirection, otherEndPoint;

    direction = getPathDirectionForElbowFromPointByAnchor(pathway, point); 
    if (!direction) {
      if (point === edge.points[0]) {
        otherEndPoint = edge.points[edge.points.length - 1];
      }
      else {
        otherEndPoint = edge.points[0];
      }

      otherEndDirection = getPathDirectionForElbowFromPointByAnchor(pathway, otherEndPoint); 
      if (!!otherEndDirection) {
        if (pathvisiojs.utilities.isOdd(edge.points.length)) {
          direction = switchDirection(otherEndDirection);
        }
        else {
          direction = otherEndDirection;
        }
      }
      else {
        direction = getPathDirectionForElbowFromPointByDistance(pathway, edge, point);
      }
    }
    return direction;
  }

  function getPathDirectionForElbowFromPointByAnchor(pathway, point) {
    var anchor = pathway.elements.filter(function(element) {return element.id === point.anchorId})[0];
    if (!!anchor) {
      if (Math.abs(anchor.dx) === 1 || Math.abs(anchor.dy) === 1) {
        if (Math.abs(anchor.dx) === 1) {
          direction = 'H';
        }
        else {
          if (Math.abs(anchor.dy) === 1) {
            direction = 'V';
          }
        }
      }
      else {
        direction = undefined;
      }
    }
    else {
      direction = undefined;
    }
    return direction;
  }

  function getPathDirectionForElbowFromPointByDistance(pathway, edge, point) {
    var direction, comparisonPoint;
    if (point === edge.points[0]) {
      comparisonPoint = edge.points[1];
    }
    else {
      comparisonPoint = edge.points[edge.points.length - 1];
    }
    if (Math.abs(comparisonPoint.x - point.x) < Math.abs(comparisonPoint.y - point.y)) {
      direction = 'V';
    }
    else {
      direction = 'H';
    }
    return direction;
  }

  function switchDirection(currentDirection) {
    currentDirection = currentDirection.toUpperCase();
    if (currentDirection === 'H') {
      return 'V';
    }
    else {
      return 'H';
    }
  }

  function get(svg, pathway, edge, callback) {
    if (!svg || !edge) {
      return console.warn('Error: Missing input parameters.');
    }

    var currentDirection, startDirection, endDirection, controlPoint, index;
    var pointStart = edge.points[0];
    var source = pathvisiojs.view.pathwayDiagram.svg.edge.point.getCoordinates(svg, pathway, pointStart);

    var pointCoordinatesArray = self.pointCoordinatesArray = [];
    var pointCoordinates;
    edge.points.forEach(function(element) {
      pointCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.point.getCoordinates(svg, pathway, element);
      pointCoordinatesArray.push(pointCoordinates)
    })

    if (pointStart.dx === undefined) {
      source.dx = 0;
    }
    else {
      source.dx = pointStart.dx;
    }

    if (pointStart.dy === undefined) {
      source.dy = 0;
    }
    else {
      source.dy = pointStart.dy;
    }

    var pointEnd = edge.points[edge.points.length - 1];
    var target = pathvisiojs.view.pathwayDiagram.svg.edge.point.getCoordinates(svg, pathway, pointEnd);

    if (pointEnd.dx === undefined) {
      target.dx = 0;
    }
    else {
      target.dx = pointEnd.dx;
    }

    if (pointEnd.dy === undefined) {
      target.dy = 0;
    }
    else {
      target.dy = pointEnd.dy;
    }

    var pathData = 'M ' + source.x + ' ' + source.y;

    if ((!edge.connectorType) || (edge.connectorType === undefined) || (edge.connectorType === 'straight')) {
      pathData += " L " + target.x + " " + target.y;
      callback(pathData);
    }
    else {
      if (edge.connectorType === 'elbow') {

        // distance to move away from node when we can't go directly to the next node

        var stubLength = 15;

        startDirection = getPathDirectionForElbowFromPoint(pathway, edge, pointStart);
        console.log(startDirection);
        currentDirection = startDirection;
        endDirection = getPathDirectionForElbowFromPoint(pathway, edge, pointEnd);

        var pathCoordinatesArray = [];


        async.series([
          function(callbackInside){
            if (edge.points.length === 2) {
              pathvisiojs.view.pathwayDiagram.pathFinder.getPath(pathway, edge, function(data) {
                pathCoordinatesArray = data;
                callbackInside(null);
              });
            }
            else {
              pathCoordinatesArray.push({
                'x': pointStart.x,
                'y': pointStart.y
              });

              index = 0;
              do {
                index += 1;

                if (currentDirection === 'H') {
                  pathCoordinatesArray.push({
                    'x': edge.points[index].x,
                    'y': edge.points[index - 1].y
                  });
                }
                else {
                  pathCoordinatesArray.push({
                    'x': edge.points[index - 1].x,
                    'y': edge.points[index].y
                  });
                }
                currentDirection = switchDirection(currentDirection);
              } while (index < edge.points.length - 1);

              pathCoordinatesArray.push({
                'x': pointEnd.x,
                'y': pointEnd.y
              });
              callbackInside(null);
            }
          }
        ],
        function(err) {
          // reposition start and end point to match source and origin

          if (pathCoordinatesArray.length === 3) {
            if (Math.abs(pathCoordinatesArray[1].x - pointStart.x) < Math.abs(pathCoordinatesArray[1].x - pointEnd.x)) {
              pathCoordinatesArray[1].x = pointStart.x;
              pathCoordinatesArray[1].y = pointEnd.y;
            }
            else {
              pathCoordinatesArray[1].x = pointEnd.x;
              pathCoordinatesArray[1].y = pointStart.y;
            }
          }
          else {
            if (Math.abs(pathCoordinatesArray[1].x - pointStart.x) < Math.abs(pathCoordinatesArray[1].y - pointStart.y)) {
              pathCoordinatesArray[1].x = pointStart.x;
            }
            else {
              pathCoordinatesArray[1].y = pointStart.y;
            }

            if (Math.abs(pathCoordinatesArray[pathCoordinatesArray.length - 2].x - pointEnd.x) < Math.abs(pathCoordinatesArray[pathCoordinatesArray.length - 2].y - pointEnd.y)) {
              pathCoordinatesArray[pathCoordinatesArray.length - 2].x = pointEnd.x;
            }
            else {
              pathCoordinatesArray[pathCoordinatesArray.length - 2].y = pointEnd.y;
            }
          }

          if (startDirection === 'H') {
            pathCoordinatesArray[1].y = pointStart.y;
          }
          else {
            if (startDirection === 'V') {
              pathCoordinatesArray[1].x = pointStart.x;
            }
          }

          if (endDirection === 'H') {
            pathCoordinatesArray[pathCoordinatesArray.length - 2].y = pointEnd.y;
          }
          else {
            if (endDirection === 'V') {
              pathCoordinatesArray[pathCoordinatesArray.length - 2].x = pointEnd.x;
            }
          }

                console.log('pathCoordinatesArray');
                console.log(pathCoordinatesArray);
                self.pathCoordinatesArray = pathCoordinatesArray;
          index = 0;
          do {
            index += 1;
            pathData += ' L ' + pathCoordinatesArray[index].x + ' ' + pathCoordinatesArray[index].y;
          } while (index < pathCoordinatesArray.length - 1);
                console.log('pathData');
                console.log(pathData);
                callback(pathData);

        });











      }
      else {
        if (edge.connectorType === 'segmented') {
          edge.points.forEach(function(element, index, array) {
            if ((index > 0) && (index < (array.length -1))) {
              pathData += " L " + element.x + " " + element.y;
            }
          });
          pathData += " L " + target.x + " " + target.y;
          callback(pathData);
        }
        else {
          if (edge.connectorType === 'curved') {


            if (edge.points.length === 2) {
              pathCoordinatesArray = pathvisiojs.view.pathwayDiagram.pathFinder.getPath(pathway, edge);
            }
            else {
              pathCoordinatesArray = edge.points;
            }


            pathCoordinatesArray.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                target.x = (array[index].x + array[index - 1].x)/2;
                target.y = (array[index].y + array[index - 1].y)/2;
                pathData += " T" + target.x + "," + target.y;
              }
            });

            pathData += " T" + pathCoordinatesArray[pathCoordinatesArray.length - 1].x + "," + pathCoordinatesArray[pathCoordinatesArray.length - 1].y;
            callback(pathData);

            /*

            controlPoint = {};
            pathCoordinatesArray.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                controlPoint.x = element.x;
                controlPoint.y = element.y;
                target.x = (array[index].x + array[index - 1].x)/2;
                target.y = (array[index].y + array[index - 1].y)/2;
                pathData += " S" + controlPoint.x + "," + controlPoint.y + " " + target.x + "," + target.y;
              }
            });

            pathData += " S" + controlPoint.x + "," + controlPoint.y + " " + pathCoordinatesArray[pathCoordinatesArray.length - 1].x + "," + pathCoordinatesArray[pathCoordinatesArray.length - 1].y;
//*/

            /*
            if (edge.points.length === 3) {

              // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

              var controlPoint = edge.points[1];

              pathData += " S" + controlPoint.x + "," + controlPoint.y + " " + target.x + "," + target.y;
              return pathData;
            }
            else {

              // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

              pathData += " T" + target.x + "," + target.y;
              return pathData;
            }
            //*/
            



          }
          else {
            console.log('Warning: pathvisiojs does not support connector type: ' + edge.connectorType);
            edge.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length -1))) {
                pathData += " L " + element.x + " " + element.y;
              }
            });
            pathData += " L " + target.x + " " + target.y;
            callback(pathData);
          }
        }
      }
    }
    /*
    console.log('returned pathData');
    console.log(pathData);
    return pathData;
    //*/
  }

  return {
    get:get
  };
}();
;

pathvisiojs.view.pathwayDiagram.svg.anchor = function(){

function makeBlocky(x, y) {
 var results = {};
 var column = pathvisiojs.view.pathwayDiagram.pathFinder.xYCoordinatesToMatrixLocation(x, y).column;
 var row = pathvisiojs.view.pathwayDiagram.pathFinder.xYCoordinatesToMatrixLocation(x, y).row;
 results.x = pathvisiojs.view.pathwayDiagram.pathFinder.matrixLocationToXYCoordinates(column, row).x;
 results.y = pathvisiojs.view.pathwayDiagram.pathFinder.matrixLocationToXYCoordinates(column, row).y;
 return results;
}

  function renderAll(svg, pathway) {

    var anchors = pathway.elements.filter(function(element) {
      return element.renderableType === 'anchor';
    });

    var viewport = svg.select('#viewport');

    var anchorElements = viewport.selectAll('use.anchor')
    .data(anchors)
    .enter()
    .append('use')
    .attr('x', function(d) {return makeBlocky(d.x, d.y).x; })
    .attr('y', function(d) {return makeBlocky(d.x, d.y).y; })
    .attr('width', pathvisioNS.grid.squareLength)
    .attr('height', pathvisioNS.grid.squareLength)
    .attr('xlink:xlink:href', '#grid-square')
    .attr('class', 'anchor')
    .attr('style', function(d) {return 'fill:red; stroke:none;';});
  }

  return {
    renderAll:renderAll
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
