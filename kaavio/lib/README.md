# Notes

## Footer/Editor Integration

The editor functionality is not currently split up ideally between **kaavio**, **kaavio-editor** and **pvjs**. We want to extract the editor code out of **kaavio** into **kaavio-editor**, and we don't want to lock ourselves into the editor being located in any one place. That's why **kaavio** has a generic `footer` and `footer open button`. But the code for triggering the opening of the editor could be handled better. Currently (2015-11-09) it works like this:

To render a footer, a parent library must call **kaavio**, passing in a component for the property `footerContent`. For example, see how **pvjs** [sets](https://github.com/wikipathways/pvjs/blob/f933e2ff042701962acf68feeeaec3d6726e5abe/lib/editor/editor.js#L270) `pvjs.footerContent` to be an editor component.

When a user clicks the `footerOpenButton`, **kaavio** calls `kaavioComponent.vm.state.footer(open)`, setting its value to `open` ([see](https://github.com/wikipathways/kaavio/blob/660ee84884b8ffe922ed18a412208d4fae10b88d/lib/footer-open-button.js#L45)). When this value is `open`, the footer [is rendered](https://github.com/wikipathways/kaavio/blob/660ee84884b8ffe922ed18a412208d4fae10b88d/lib/footer.js#L91) as a [component](https://github.com/wikipathways/kaavio/blob/660ee84884b8ffe922ed18a412208d4fae10b88d/lib/footer.js#L32), which is the `footerContent` specified earlier.

## shape-library

The directory `shape-library` is not currently being used (TODO verify this. what is its relationship to [xp-shapes](https://github.com/ariutta/cross-platform-shapes)?), but in the future, it could potentially be used as a component of our proposed Reusable Shape Library, which would be a collection of glyphs that people could use when drawing their diagrams.
