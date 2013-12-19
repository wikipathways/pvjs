This folder holds two parts of our shape library: markers (arrowheads) and shapes that scale uniformly.

For shapes that scale non-uniformly (e.g., the arc-like corner of a rounded
rectangle if the corner must keep a constant radius, regardless of the size of the shape), please
see the JavaScript code. For SVG, these shapes are currently rendered on-demand by JavaScript as SVG path elements, 
with their attributes being set in the files in the [path shape directory](../js/pathvisiojs/view/pathway-diagram/svg/node/path-shape).

We may also be able to define shapes that scale uniformly in all ways except that they keep their original
stroke width (line thickness).regardless of the zoom level of the diagram. In SVG, doing this would depend
on using the [non-scaling-stroke vector effect](http://www.w3.org/TR/SVGMobile12/painting.html#NonScalingStroke).
Browser support for non-scaling-stroke is inconsistent.

In SVG, we are rendering these uniformly scaling shapes as symbol elements. Symbol elements as used in SVG
serve as shape templates that never display on their own. To display a symbol, we add an SVG 'use' element with
an xlink:href to the symbol id.

Each of the markers should be drawn as if it were to be used at the start of an edge with a stroke (line)
color of black. If the pathway calls other colors, the JavaScript uses D3.js to clone the black marker, sets the color
for the clone to the desired color and inserts it into the SVG template. I wish fill="currentColor" worked for
markers, but that does not appear to be the case.

Each marker includes a small rectangle with a default-fill color to obscure the
ends of lines that might otherwise show up beneath the marker. Double lines require their own special
obscuring rects and are included as a double-line-hack-start/end marker, defined here and added in
JavaScript.

This folder will probably eventually be replaced with a database. 

When we build the pathvisio.min.js file, we take the SVG content of for each of our preferred selection of shapes
and markers and insert it into a template SVG file. Then we stringify the template SVG file and add it to our
concatenated, minified JS file pathvisio.min.js. 

The template SVG file file serves as our template for standardized GPML pathway visual representations.
It can be used for many purposes outside of pathvisiojs, including allowing
other projects to work better with GPML. For purposes of pathvisiojs, this file will
be the starting point for our JavaScript rendering of pathways. Every time we want to
render a GPML file on the browser, we will read a copy of this file into D3.js and
modify the copy by adding "use" statements, cloning markers, etc. in order to create
the desired pathway illustration in SVG.

The XML declaration used in the template is taken from [an example](http://www.w3.org/TR/SVG/images/struct/use04.svg) from the W3C,
except I added:
encoding="UTF-8" 

We will want to change standalone to yes if we keep the CSS and
JS all inside this document.

Doctypes are not needed for SVG, and jwatt discourages their use:
https://jwatt.org/svg/authoring/.

Style guides can be arbitrary, but for consistency of SVG markup for the pathvisiojs project,
	I suggest using JS Watt's SVG authoring advice and Google's HTML and JavaScript Guides:
	https://jwatt.org/svg/authoring/
	http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
	http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml

JS Watt's advice is referenced from MDN:
https://developer.mozilla.org/en-US/docs/Web/SVG

For testing, we will ensure the template SVG and CSS work with the following browsers and graphics programs:
Chrome (latest release)
	Uses Skia graphics library
Firefox (latest release)
	Uses Azure graphics library
	Safari (latest release)
	Android Browser (latest release)
	iOS Browser (latest release)
	Internet Explorer (IE9 and subsequent versions)
Squiggle SVG browser (latest release)
	Uses Batik 
	Available for download at http://xmlgraphics.apache.org/batik/download.html
SVG-Edit (latest release)
	Version 2.6 (latest release as of 2013-07-08) available for download at 
	http://svg-edit.googlecode.com/svn/branches/2.6/editor/svg-editor.html
	Inkscape
	Uses livarot rendering engine but is in process of transitioning to Cairo
	Available for download at http://inkscape.org/

	Optional additional tests:
	SvgWeb
	Adobe Illustrator (CS6)
		Either convert SVG to PDF and import PDF into Illustrator or convert SVG to .ai (Illustrator format)
		with a data like Unidata, available for download at
		http://sk1project.org/modules.php?name=Products&product=uniconvertor
		Opening this SVG directly with Illustrator does not work well.
		In the future, we could use Unidata on the server to make it possible to download pathway images in
		.ai (Illustrator) and .cdr (CorelDraw) formats.

	For more information on SVG, these references are helpful:
	[W3 Spec](http://www.w3.org/TR/SVG/expanded-toc.html)
	[MDN on SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
