# Diagram Loading Process

Handling Pathvisiojs Template

 1) Development
  a) compare.js calls generateHtmlView() to create a string, pathvisioNS['tmp/pathvisiojs.html'], that corresponds to the content of src/pathvisio.html
  b) compare.js calls pathvisiojs.load() and uses the customMarkers argument to pass in the locations of the SVG files that we use as defaults for customMarkers
 2) Production
  a) Currently, developer manually generates the pathvisiojs template partial by opening any pathway from test/index.html in development mode,
      calling getPathvisiojsHtmlTemplate() in the console, right-clicking the result and selecting "Reveal in Elements Panel," 
      right-clicking the element and selecting "Copy as HTML," and pasting the result into tmp/pathvisiojs.html, overwriting anything already in the file.
      In the future, we will use a Grunt build process that generates the template.
  b) Grunt build process takes template and turns it into a JavaScript string with identifier pathvisioNS['tmp/pathvisiojs.html']. Currently, this file is
      stored as tmp/pathvisiojs.js, but in the future, we will not rely on this tmp folder.
  c) Grunt build process then minifies and concatenates the file from the previous step as well as all the js files in src/pathvisiojs/, saving them as
      build/js/APPROPRIATE DIRECTORY/pathvisio.js and pathvisio.min.js

Loading Pathway

1) pathvisiojs.load() calls pathvisiojs.view.pathwayDiagram.load()
2) pathvisiojs.view.pathwayDiagram.load() calls pathvisiojs.view.pathwayDiagram.svg.loadPartials() (this is messy if we don't actually render an SVG)
3) pathvisiojs.view.pathwayDiagram.svg.loadPartials() inserts template (div#pathvisiojs-container from src/pathvisio.html) into target container specified by user in pathvisiojs.load()
4) Once data is ready (currently this means GPML is converted to JSON) and if an SVG is to be rendered, then we use the SVG in the pathvisiojs template as our starting point
    for rendering the pathway diagram.

# How Diagram Dimensions Are Set



