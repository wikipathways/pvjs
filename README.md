pvjs-2.4.84
====================

JavaScript-based diagram viewer (implemented) and editor (in-progress) intended for biological pathways. It uses SVG and HTML for rendering, the [Mithril](http://lhorie.github.io/mithril/) framework for code organization and [BridgeDb](http://bridgedb.org/) for biological entity reference queries.

Demo
====

* [WikiPathways - Sandbox Pathway](http://wikipathways.org/index.php/Pathway:WP4)

How To Add It To Your Site
===================
You can loading it with either one of the two options below: HTML Element or Script.
It's as simple as referencing the pvjs JavaScript bundle and its dependencies in your HTML document:

## Load Using [Custom HTML Element](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)

```HTML
<wikipathways-pvjs
    alt="WP525 Biological Pathway"
    src="http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:WP525"
    display-errors="true"
    display-warnings="true"
    fit-to-container="true">
</wikipathways-pvjs>

<script src="//wikipathways.github.io/pvjs/lib/pvjs/pvjs-polyfills-2.3.5.bundle.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//wikipathways.github.io/pvjs/lib/pvjs/pvjs-2.4.84.bundle.min.js"></script>
```

## Load Using Script

First reference the pvjs JavaScript bundle and its dependencies in your HTML document:

```HTML
<script src="//wikipathways.github.io/pvjs/lib/pvjs/pvjs-polyfills-2.3.5.bundle.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//wikipathways.github.io/pvjs/lib/pvjs/pvjs-2.4.84.bundle.min.js"></script>
```

If you have jQuery, then you may do:

```js
$('#pvjs-container').pvjs({
  sourceData: [
    // at least one item required
    {
      uri:'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:WP525',
      fileType:'gpml' // generally will correspond to filename extension
    },
    {
      uri:'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:WP525',
      fileType:'png'
    }
  ]
});
```

If you don't have jQuery and do not want to add it, then you may call `pvjs` directly and pass two arguments: container selector and options object.

```js
pvjs('#pvjs-container', {
  sourceData: [
    // at least one item required
    {
      uri:'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:WP525',
      fileType:'gpml' // generally will correspond to filename extension
    },
    {
      uri:'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:WP525',
      fileType:'png'
    }
  ]
});
```

For Developers
==============
If it's your first time working on pvjs, check out the [Getting Started Guide](https://github.com/wikipathways/pvjs/tree/master/test) for tips on testing and contributing to the codebase.

See [./lib/README.md](https://github.com/wikipathways/pvjs/blob/master/lib/README.md) for descriptions and locations of the pvjs components, plugins, event messages and options.

Related
=======
This project is supported by the same community that maintains the Java-based pathway diagram editor [PathVisio](http://www.pathvisio.org/), but the codebases between pvjs and PathVisio-Java are entirely distinct. PathVisio-Java plugins will not work with pvjs.

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


Support and Funding
=======
* The National Institute for General Medical Sciences [R01-GM100039](http://www.nigms.nih.gov/)
* The BioRange program of the Netherlands [Bioinformatics Centre](http://www.nbic.nl/)
* [University Maastricht](http://www.unimaas.nl/default.asp?taal=en): Broad Research Strategy Program Part 2 (BOS2)
* Open source license for cross-browser testing courtesy <a href="https://www.browserstack.com">BrowserStack <img src="https://dgzoq9b5asjg1.cloudfront.net/production/images/static/header/header-logo.svg" alt="BrowserStack" height="42" width="auto"></a>

NOTE: manually changed yolk.js dependency to rely on rx-extra instead of plain rx.
