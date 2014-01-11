pathvisiojs
============

JavaScript viewer and editor for biological pathways. All code is in beta stage and is subject to change.

Demos
=====

* [gh-pages](http://wikipathways.github.io/pathvisiojs/test/)
* [Widget example on JSFiddle](http://jsfiddle.net/RzeKd/2/) (outdated/still works)
* [JSBin](http://jsbin.com/iJUTEjU/latest) (outdated/not-working)

Installing
===================
Pathvisiojs depends on the following JS libraries:
  * [rgb-color](https://www.github.com/ariutta/rgb-color/)
  * [strcase](https://www.github.com/tower/strcase/)
  * [async](https://www.github.com/caolan/async/)
  * [d3](https://www.github.com/mbostock/d3/)
  * [jquery](https://www.github.com/components/jquery/)
  * [typeahead.js](https://www.github.com/twitter/typeahead.js/)
  * [Modernizr](https://www.github.com/Modernizr/Modernizr/)
  * [screenfull.js](https://www.github.com/sindresorhus/screenfull.js)
  * [svg-pan-zoom](https://www.github.com/ariutta/svg-pan-zoom/)
  * [PathFinding.js](https://www.github.com/qiao/PathFinding.js/)
  * [jsonld.js](https://www.github.com/digitalbazaar/jsonld.js/)

and the following stylesheets:
  * font-awesome
  * pathvisiojs.css
  * annotation.css
  * pan-zoom.css
  * pathway-diagram.css

You can make it run in the browser by copying the following snippet:

```
  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/pathvisiojs.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/annotation.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/pan-zoom.css" media="screen">
  <link rel="stylesheet" href="http://wikipathways.github.io/pathvisiojs/src/css/pathway-diagram.css" media="screen">
  <script src="http://wikipathways.github.io/pathvisiojs/lib/rgb-color/rgb-color.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/strcase/build/build.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/async/lib/async.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/d3/d3.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/jquery/jquery.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/typeahead.js/dist/typeahead.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/modernizr/modernizr.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/screenfull/dist/screenfull.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/svg-pan-zoom/svg-pan-zoom.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/PathFinding.js/lib/pathfinding-browser.min.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/jsonld.js/js/jsonld.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/jsonld.js/js/Promise.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/lib/jsonld.js/js/rdfa.js"></script>
  <script src="http://wikipathways.github.io/pathvisiojs/build/js/pathvisio.min.js"></script>
```
Or something like this in PHP:

```
$scripts = array(
        "$wgScriptPath/wpi/lib/js/rgb-color.min.js",
        "$wgScriptPath/wpi/lib/strcase/build/build.js",
        "$wgScriptPath/wpi/lib/js/async.js",
        "$wgScriptPath/wpi/lib/js/d3.min.js",
        "$wgScriptPath/wpi/lib/js/jquery.min.js",                                                                                                                                                                          
        "$wgScriptPath/wpi/lib/js/typeahead.min.js",
        "$wgScriptPath/wpi/lib/js/modernizr.js",                                                                                                                                                                           
        "$wgScriptPath/wpi/lib/js/screenfull.min.js",
        "$wgScriptPath/wpi/lib/js/svg-pan.js",
        "$wgScriptPath/wpi/lib/js/pathfinding-browser.min.js",
        "$wgScriptPath/wpi/lib/js/pathvisio.min.js"
); 

$libs = "<script type=\"text/javascript\">" . $scripts . "</script>
 <link rel=\"stylesheet\" href=\"http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css\" media=\"screen\" type=\"text/css\" />
 <link rel=\"stylesheet\" href=\"http://wikipathways.github.io/pathvisiojs/src/css/pathvisiojs.css\" media=\"screen\" type=\"text/css\" />
 <link rel=\"stylesheet\" href=\"http://wikipathways.github.io/pathvisiojs/src/css/annotation.css\" media=\"screen\" type=\"text/css\" />
 <link rel=\"stylesheet\" href=\"http://wikipathways.github.io/pathvisiojs/src/css/pan-zoom.css\" media=\"screen\" type=\"text/css\" />
 <link rel=\"stylesheet\" href=\"http://wikipathways.github.io/pathvisiojs/src/css/pathway-diagram.css\" media=\"screen\" type=\"text/css\" />\n";
                        
```
How To Get Involved
===================

A. Get the Latest Code
----------------------

1. If you have not yet forked and cloned pathvisiojs,

* Fork the [WikiPathways repo for pathvisiojs](https://github.com/wikipathways/pathvisiojs/fork) by clicking the "Fork" button on the upper right.
* Once Github takes you to your newly created fork, find the "HTTPS clone URL," copy it and open a terminal on your dev machine and enter the following command:

```
cd ~/Sites/ #or another directory of your preference
git clone https://github.com/YOUR-GITHUB-ACCOUNT/pathvisiojs.git #replace YOUR-GITHUB-ACCOUNT with the appropriate value for you
cd pathvisiojs
```

2. If you've already forked and cloned pathvisiojs in the past, use either step a) or b) below to get the latest code.
a. Github interface
* Go to your fork of pathvisiojs at https://github.com/YOUR-GITHUB-ACCOUNT/pathvisiojs/ and select the "Compare and review" button to the left of the "branch" drop-down to pull from the wikipathways fork of pathvisiojs into your fork
* Select "Edit" and "compare across forks" as needed to make the drop-downs look like this:

```
YOUR-GITHUB-ACCOUNT:master ... wikipathways:master
```

* Create pull request
* Accept pull request (if github says that the pull request cannot be done automatically, you will need to merge the files from the command line. Let Anders or Alex know and they can help.)

```
cd ~/Sites/pathvisiojs/ #update this to where the pathvisiojs directory is actually located on your computer  
git pull origin master
```

b. Command line interface
* Add the wikipathways pathvisiojs repo as a remote named wikipathways with the following command

```
cd ~/Sites/pathvisiojs/ #use the location where the pathvisiojs directory is actually located on your computer  
git remote add wikipathways https://github.com/wikipathways/pathvisiojs.git #if you haven't already done this
git pull wikipathways master
```

B. Make Awesome Updates
-----------------------
You can edit any of the files in the ["src" directory](https://github.com/wikipathways/pathvisiojs/tree/master/src):

```
cd ~/Sites/pathvisiojs/src/ #update this to where the pathvisiojs directory is actually located on your computer
```

To view your changes as you edit, you can use the functionalities in the ["test" directory](https://github.com/wikipathways/pathvisiojs/tree/master/test):

```
cd ~/Sites/pathvisiojs/src/test/ #update this to where the pathvisiojs directory is actually located on your computer
```

The [README](https://github.com/wikipathways/pathvisiojs/tree/master/test/README.md) in this directory includes information on how to view diagrams during development and how to run tests.

C. Send Us a Pull Request
-------------------------
* Visually inspect each of the test pathways from the test page, comparing your version with the current version to ensure your code produces the correct visual result in terms of styling, etc.
* Run the tests
* Commit your changes and push them to your github fork of pathvisiojs
* Create a pull request to the wikipathways fork of pathvisiojs: 
```
wikipathways:master ... YOUR-GITHUB-ACCOUNT:master
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

