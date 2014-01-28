pathvisiojs
============

JavaScript-based diagram viewer and editor intended for biological pathways. This project is supported by the same community that maintains the Java-based pathway diagram editor [PathVisio](http://www.pathvisio.org/), but the codebases between pathvisiojs and PathVisio-Java are entirely distinct. PathVisio-Java plugins will not work with pathvisiojs.

All code is in beta stage, and any APIs are subject to change.

Demos
=====

* [gh-pages](http://wikipathways.github.io/pathvisiojs/test/)

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
  * [svg-pan-zoom](https://www.github.com/ariutta/svg-pan-zoom/)
  * [jsonld.js](https://www.github.com/digitalbazaar/jsonld.js/)

and the font-awesome icons.

You can make it run in the browser by copying one of the [pathvisiojs load snippets](https://gist.github.com/ariutta/8377189) (outdated. check the dependencies in bower.json for up-to-date requirements.).

How To Get Involved
===================

A. Fork and clone pathvisiojs. If you've already done this, skip ahead to Step B. Otherwise:

Fork the [WikiPathways repo for pathvisiojs](https://github.com/wikipathways/pathvisiojs/fork) by clicking the "Fork" button on the upper right. Github will create a fork of pathvisiojs for you and take you to your newly created fork. On your newly created fork, find the "HTTPS clone URL," copy it, open a terminal on your dev machine and enter the following command:

```
$ cd ~/Sites/ #or another directory of your choice
$ git clone https://github.com/YOUR-GITHUB-ACCOUNT/pathvisiojs.git #replace with the HTTPS clone URL you copied
$ cd pathvisiojs
```

B. Add the wikipathways pathvisiojs repo as a remote named "wikipathways," if you have not already done so:

```
$ cd ~/Sites/pathvisiojs/ #use the location where the pathvisiojs directory is actually located on your computer  
$ git remote add wikipathways https://github.com/wikipathways/pathvisiojs.git
```

Pull latest code from wikipathways master branch of pathvisiojs:

```
$ git pull wikipathways master
```

C. Make Awesome Updates

You can edit any of the files in the [src directory](https://github.com/wikipathways/pathvisiojs/tree/master/src):

```
$ cd ~/Sites/pathvisiojs/src/ #update this to where the pathvisiojs directory is actually located on your computer
```

To view your changes as you edit, you can use the functionalities in the [test directory](https://github.com/wikipathways/pathvisiojs/tree/master/test):

```
$ cd ~/Sites/pathvisiojs/src/test/ #update this to where the pathvisiojs directory is actually located on your computer
```

If you add a JS file, you will need to add a reference to it in the "sources" array in [compare.js](https://github.com/wikipathways/pathvisiojs/blob/master/test/compare.js#L111) and in [Gruntfile.js](https://github.com/wikipathways/pathvisiojs/blob/master/Gruntfile.js#L10).

The [README](https://github.com/wikipathways/pathvisiojs/tree/master/test/README.md) in this directory includes information on how to view diagrams during development and how to run tests.

D. Send Us a Pull Request

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
   
   
Funding
=======
* The National Institute for General Medical Sciences [R01-GM100039](http://www.nigms.nih.gov/)
* The BioRange program of the Netherlands [Bioinformatics Centre](http://www.nbic.nl/)
* [University Maastricht](http://www.unimaas.nl/default.asp?taal=en): Broad Research Strategy Program Part 2 (BOS2) 
