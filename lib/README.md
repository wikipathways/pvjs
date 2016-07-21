# Notes

Components
----------
* Viewer
  - Notifications Plugin
  - Highlighter Plugin
  - DiffViewer Plugin
  - Annotations Panel
* Editor
* bridgedbjs

Modules
-------

### Update 2016-07-21
Some of the code is using [yolk v0.10.1](https://github.com/garbles/yolk/tree/v0.10.1), which has issues with [npm link](https://docs.npmjs.com/cli/link) ([possibly related?](https://github.com/garbles/yolk/issues/80)). Without `npm link`, it's impossible to work with many small modules, so until the issue with yolk is resolved, I've moved many of the modules (bridgedb, kaavio, kaavio-editor, gpml2pvjson, jsonld-rx-extra) into the lib directory for easier development. Once we can use `npm link` again, I'll have to move them back out and merge any changes to those modules with their external repos.


~~This project is composed of many small modules in order to [manage complexity](http://dailyjs.com/2015/07/02/small-modules-complexity-over-size/). In addition to the many third-party modules, we have created several modules that are key to this project:

* [**pvjs**](https://github.com/wikipathways/pvjs): code relating to WikiPathways and to pathways in general
* [**kaavio**](https://github.com/wikipathways/kaavio): code capturing just the diagram **viewer** functionality -- should not contain any pathway-specific code
* [**kaavio-editor**](https://github.com/wikipathways/kaavio-editor): code capturing just the diagram **editor** functionality -- should not contain any pathway-specific code
* [**bridgedbjs**](https://github.com/bridgedb/bridgedbjs): wrapper for BridgeDb API, plus helper utils

Note that the code could use some work to make it actually reflect the organization above. There is currently (2015-11-09) pathway-specific code sprinkled around various parts of the codebase. Much of this code should be moved out of **kaavio** and **kaavio-editor** into **pvjs** in order to make it easier to troubleshoot any bugs coming from the diagram viewer or editor.~~

The editor code is currently a little confusing. Here's how the editor is currently (2015-11-09) initialized:

when calling **pvjs**, you pass in `pvjsOptions`, one of which is `editor`. This option specifies whether the editor should be enabled ([see](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L88)). This same value is passed along to **kaavio** on `pvjs.kaavioOptions` ([see](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L87)).

Pvjs [inherits **kaavio**](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L87) and optionally [gets](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L89) an `editor` property with a value of a [pvjs editor component](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/editor/editor.js). This pvjs editor component inherits **kaavio-editor** and adds functionality for saving the pathway GPML back to WikiPathways (using the [WikiPathways JS API client](https://github.com/wikipathways/wikipathways-api-client-js)). The pvjs editor component is [set](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/editor/editor.js#L270) as the value of `pvjs.footerContent`.

See the [kaavio lib README](https://github.com/wikipathways/kaavio/blob/master/lib/README.md) for what happens next in **kaavio**.

Available event messages
------------------------

Event messages are namespaced and may be called with namespace or without. Namespace is defined by a dot: `click.renderer`.
Triggering events without specifying a namespace will run both events with and without namespace (ex. trigger('click') will run both on('click') and on('click.renderer')).
Listening on events without a namespace will run hooks event if an event with namespace was triggered (ex. on('click') will run on both trigger('click') and trigger('click.renderer')).
In order to prevent running unwanted hooks it is better to namespace all events triggers and listeners.

List of available events through application (custom events may be added at any time):
* destroy.pvjs
* error.sourceData
* error.pvjson
* error.renderer
* rendered.renderer
* zoomed.renderer
* panned.renderer
* warning.renderer

Editor Plugin
-------------

Allows for updating the pvjson data.

Notifications Plugin
--------------------

Notifications plugin listens for warning and error messages and displays them as alert boxes.

### Usage

In order to add notifications to pvjs do:

1. Reference plugin's _JS_ and _CSS_ files or use bundle version of pvjs
2. Activate notifications for a given pvjs:

    ```js
    pvjsNotifications(pvjsInstance, {displayErrors: true, displayWarnings: true})
    ```

Highlighter Plugin
------------------

Highlighter plugin allows for highlighting pathway nodes, interactions, groups and other entities. It allows for selecting data nodes using autocomplete text input.

### Usage

```js
    $('#wikipathways-pvjs-1').pvjs({
      fitToContainer: true,
      sourceData: [
        // at least one item required
        {
          uri: '../input-data/WP525_73040.gpml',
          fileType: 'gpml' // generally will correspond to filename extension
        },
        {
          uri: 'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:WP1',
          fileType: 'biopax'
        },
        {
          uri: 'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:WP1',
          fileType: 'png'
        }
      ],
      displayErrors: true,
      displayWarnings: true,
      highlights: [
        {
          selector: 'ATFS-1',
          backgroundColor: 'yellow',
          borderColor: 'blue',
        },
        {
          selector: 'PHB-2',
          backgroundColor: 'white',
          borderColor: 'red',
        }
      ]
    });
```

<!---
To customize Highlighter pass arguments to its constructor:

```js
var hi = pvjsHighlighter(pathInstance, {
  displayInputField: true
, autocompleteLimit: 10
, styles: {
    fill: 'yellow'
  , 'fill-opacity': 0.2
  , stroke: 'orange'
  , 'stroke-width': '3px'
  , 'stroke-opacity': 1
  }
})
```
-->

To highlight or attenuate call corresponding API methods:

```js
// Highlight by ID
pathInstance.highlight('#e6e')
// Highlight by text label
pathInstance.highlight('Cholesterol')
// Highlight by xref
pathInstance.highlight('xref:12345')

// Attenuate by ID
pathInstance.attenuate('#e6e')
```

You can create highlight groups. This is useful if you want to namespace highlighters for easier attenuation.

```js
// Default group
pathInstance.highlight('#e6e')

// Group g1
pathInstance.highlight('#e7e', 'g1')
pathInstance.highlight('#e8b', 'g1')
pathInstance.highlight('#e9c', 'g1')

// One highlighting can be part of more groups
pathInstance.highlight('#e7e', 'g2')

// Attenuate #e7e only if it is in group g2
pathInstance.attenuate('#e7e', 'g2')

// Attenuate all elements from group g1
pathInstance.attenuate(null, 'g1')
```

You may provide a custom style to your highlighting

```js
// Red fill, blue stroke
pathInstance.highlight('#e6e', null, {fill: 'red', stroke: 'blue'})
```

Difference Viewer Plugin (DiffViewer)
-------------------------------------

DiffViewer plugin allows to compare difference between 2 different versions of a pathway.

### Usage

First reference plugin's _JS_ and _CSS_ files or use bundle version of pvjs.

Highlighter should be instantiated before pvjs was rendered:

```js
$('#pvjs-container').pvjs({
  fitToContainer: true,
  manualRender: true,
  sourceData: [
    {
      uri: 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=WP2806&rev=75308',
      fileType:'gpml'
    }
  ]
});

// Get first element from array of instances
pathInstance = $('#pvjs-container').pvjs('get').pop();

// Init difference viewer
pvjsDiffviewer(pathInstance, {
  sourceData: [
    {
      uri: 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=WP2806',
      fileType:'gpml'
    }
  ]
});

// Call renderer
pathInstance.render();
```
