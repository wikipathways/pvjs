# Notes

This project is composed of many small modules in order to [manage complexity](http://dailyjs.com/2015/07/02/small-modules-complexity-over-size/). In addition to the many modules from others, there are several modules from our team that are key to this project:

* [pvjs](https://github.com/wikipathways/pvjs): code relating to WikiPathways and to pathways in general
* [kaavio](https://github.com/wikipathways/kaavio): code capturing just the diagram *viewer* functionality -- should not contain any pathway-specific code
* [kaavio-editor](https://github.com/wikipathways/kaavio-editor): code capturing just the diagram *editor* functionality -- should not contain any pathway-specific code
* [bridgedbjs](https://github.com/bridgedb/bridgedbjs): wrapper for BridgeDb API, plus helper utils

Note that the code could use some work to make it actually reflect the organization above. There is currently (2015-11-09) pathway-specific code sprinkled around various parts of the codebase. Much of this code should be moved out of *kaavio* and *kaavio-editor* into *pvjs* in order to make it easier to troubleshoot any bugs coming from the diagram viewer or editor.

The editor code is currently a little confusing. Here's how the editor is currently (2015-11-09) initialized:

when calling pvjs, you pass in `pvjsOptions`, one of which is `editor`. This option specifies whether the editor should be enabled ([see](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L88)). This same value is passed along to kaavio on `pvjs.kaavioOptions` ([see](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L87)).

Pvjs [inherits kaavio](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L87) and optionally [gets](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/main.js#L89) an `editor` property with a value of a [pvjs editor component](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/editor/editor.js). This pvjs editor component inherits kaavio-editor and adds functionality for saving the pathway GPML back to WikiPathways (using the [WikiPathways JS API client](https://github.com/wikipathways/wikipathways-api-client-js)). The pvjs editor component is [set](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/editor/editor.js#L270) as the value of `pvjs.footerContent`.

See the [kaavio lib README](https://github.com/wikipathways/kaavio/blob/master/lib/README.md) for what happens next in *kaavio*.
