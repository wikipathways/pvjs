# PathvisioJS Highlighter

Highlighter pulgin with autocomplete text input.

## Requirements

* PathvisioJS
* jQuery
* Typeahead (for jQuery)

## Usage

First you have to add JS and CSS requirement to your page.

Instantiate Highlighter after PathvisioJS was rendered:

```js
// Init pathvisiojs
$('#pathvisiojs-container').pathvisiojs({
  fitToContainer: true
, manualRender: true
, sourceData: [{
    uri:'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=WP1',
    fileType:'gpml' // generally will correspond to filename extension
  }]
})

// Get first element from array of instances
var pathInstance = $('#pathvisiojs-container').pathvisiojs('get').pop()

// Load highlighter after render
pathInstance.on('rendered', function(){
  var hi = pathvisiojsHighlighter(pathInstance)
})

// Call renderer
pathInstance.render()
```

To customize Highlighter pass arguments to its constructor:

```js
var hi = pathvisoijsHighlighter(pathInstance, {
  displayInputField: true
, autocompleteLimit: 10
})
```

To highlight or attenuate call corresponding API methods:

```js
var hi = pathvisiojsHighlighter(pathInstance)

// Highlight by ID
hi.highlight('#e6e')
// Highlight by text label
hi.highlight('Cholesterol')
// Highlight by xref
hi.highlight('xref:12345')

// Attenuate by ID
hi.attenuate('#e6e')
```

You can create highlight groups. This is useful if you want to namespace highlighters for easier attenuation.

```js
var hi = pathvisiojsHighlighter(pathInstance)

// Default group
hi.highlight('#e6e')

// Group g1
hi.highlight('#e7e', 'g1')
hi.highlight('#e8b', 'g1')
hi.highlight('#e9c', 'g1')

// One highlighting can be part of more groups
hi.highlight('#e7e', 'g2')

// Attenuate #e7e only if it is in group g2
hi.attenuate('#e7e', 'g2')

// Attenuate all elements from group g1
hi.attenuate(null, 'g1')
```

You may provide a custom style to your highlighting

```js
var hi = pathvisiojsHighlighter(pathInstance)

// Red fill, blue stroke
hi.highlight('#e6e', null, {fill: 'red', stroke: 'blue'})
```
