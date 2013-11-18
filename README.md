pathvisiojs
============

JavaScript viewer and editor for biological pathways. All code is in beta stage and is subject to change.

Demos
=====

* [gh-pages](http://wikipathways.github.io/pathvisiojs/test/)
* [JSBin](http://jsbin.com/iJUTEjU/latest)
* [Widget example on JSFiddle](http://jsfiddle.net/ariutta/RzeKd/)

Installing
===================
Pathvisiojs depends on the following JS libraries:
  * rgb-color.js
  * case-converter.js
  * async.js
  * d3.js
  * jquery
  * jquery-ui
  * typeahead.js
  * openseadragon.js
  * modernizr.js
  * screenfull.js
  * svg-pan.js
  * path-finding

and the following stylesheets:
  * font-awesome
  * pathvisio-js.css
  * annotation.css
  * pan-zoom.css
  * pathway-template.css

You can make it run in the browser by copying the following snippet:

```
  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/pathvisio-js.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/annotation.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/pan-zoom.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/pathway-template.css" media="screen">
  <script src="http://wikipathways.github.io/pathvisiojs/lib/rgb-color/rgb-color.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/case-converter/case-converter.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/async/lib/async.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/d3/d3.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/jquery/jquery.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/jquery-ui/ui/minified/jquery-ui.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/typeahead.js/dist/typeahead.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/openseadragon/openseadragon.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/modernizr/modernizr.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/screenfull/dist/screenfull.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/svg-pan/svg-pan.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/build/js/pathvisio.min.js"></script>
```

How To Get Involved
===================

1. Get the Latest Code
----------------------

If you have not forked pathvisiojs,

* Fork the WikiPathways repo for pathvisiojs [here](https://github.com/wikipathways/pathvisiojs/fork)
* Go to your fork at https://github.com/your-github-account/pathvisiojs/

If you've already forked pathvisiojs in the past,

* Go to your fork of pathvisiojs at https://github.com/your-github-account/pathvisiojs/ and select the "Compare and review" button to the left of the "branch" drop-down to pull from the wikipathways fork of pathvisiojs into your fork
* Select "Edit" and "compare across forks" as needed to make the drop-downs look like this: 
```
your-github-account:gh-pages ... wikipathways:gh-pages
```
* Create pull request
* Accept pull request (if github says that the pull request cannot be done automatically, you will need to merge the files from the command line. Let Anders or Alex know and they can help.)

2. Make Awesome Updates
-----------------------
* You can edit any of the files in the "src" directory of the gh-pages branch of your fork (https://github.com/your-github-account/pathvisiojs/tree/gh-pages/src/)
* View your changes live at http://your-github-account.github.io/pathvisiojs/test/ (note the .IO)

3. Send Us a Pull Request
-------------------------
* View each of the test pathways at http://your-github-account.github.io/pathvisiojs/test/ to ensure your code works well
* Create a pull request to the wikipathways fork of pathvisiojs: 
```
wikipathways:gh-pages ... your-github-account:gh-pages
```

License
=======

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
