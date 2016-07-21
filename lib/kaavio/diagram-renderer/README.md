# Diagram Loading Process

Handling Pvjs Template

 1) Development
  a) compare.js calls generateHtmlView() to create a string, pvjsNS['tmp/pvjs.html'], that corresponds to the content of src/pvjs.html
  b) compare.js calls pvjs.load() and uses the customMarkers argument to pass in the locations of the SVG files that we use as defaults for customMarkers
 2) Production
  a) Currently, developer manually generates the pvjs template partial by opening any pathway from test/index.html in development mode,
      calling getPvjsHtmlTemplate() in the console, right-clicking the result and selecting "Reveal in Elements Panel," 
      right-clicking the element and selecting "Copy as HTML," and pasting the result into tmp/pvjs.html, overwriting anything already in the file.
      In the future, we will use a Grunt build process that generates the template.
  b) Grunt build process takes template and turns it into a JavaScript string with identifier pvjsNS['tmp/pvjs.html']. Currently, this file is
      stored as tmp/pvjs.js, but in the future, we will not rely on this tmp folder.
  c) Grunt build process then minifies and concatenates the file from the previous step as well as all the js files in src/pvjs/, saving them as
      build/js/APPROPRIATE DIRECTORY/pvjs.js and pvjs.min.js

Loading Pathway

1) pvjs.load() calls pvjs.renderer.load()
2) pvjs.renderer.load() calls pvjs.renderer.svg.loadPartials() (this is messy if we don't actually render an SVG)
3) pvjs.renderer.svg.loadPartials() inserts template (div#pvjs-container from src/pvjs.html) into target container specified by user in pvjs.load()
4) Once data is ready (currently this means GPML is converted to JSON) and if an SVG is to be rendered, then we use the SVG in the pvjs template as our starting point
    for rendering the pathway diagram.

# How Diagram Dimensions Are Set



