# Diagram Loading Process

Handling Pathvisiojs Template
 1) Development
  a) compare.js calls function "generateHtmlView" to create a string, pathvisioNS['tmp/pathvisiojs.html'], that corresponds to the content of src/pathvisio.html
  b) compare.js calls function "pathvisiojs.load" and uses the customMarkers argument to pass in the locations of the SVG files that we use as defaults for customMarkers
 2) Production
  a) Currently, developer manually generates the pathvisiojs template partial by opening any pathway from test/index.html in development mode,
      calling the function "getPathvisiojsHtmlTemplate()" in the console, right-clicking the result and selecting "Reveal in Elements Panel," 
      right-clicking the element and selecting "Copy as HTML," and pasting the result into tmp/pathvisiojs.html, overwriting anything already in the file.
      In the future, we will use a Grunt build process that generates the template.
  b) Grunt build process takes template and turns it into a JavaScript string with identifier pathvisioNS['tmp/pathvisiojs.html']. Currently, this file is
      stored as tmp/pathvisiojs.js, but in the future, we will not rely on this tmp folder.
  c) Grunt build process then minifies and concatenates the file from the previous step as well as all the js files in src/pathvisiojs/, saving them as
      build/js/APPROPRIATE DIRECTORY/pathvisio.js and pathvisio.min.js

Loading Pathway
1) "pathvisiojs.load(args)" calls pathvisiojs.view.pathwayDiagram.load(args).
  to insert div#pathvisiojs-container from src/pathvisio.html into target (div#pathvisiojs-dev) in compare.html.

2) pathvisiojs.load(args); 
3) 
# How Diagram Dimensions Are Set



