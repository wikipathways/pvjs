Pvjs
====================

JavaScript-based biological pathway diagram viewer. Used in [WikiPathways](http://wikipathways.org).

## Beta
The beta tag given to this version means that it is not advisable to use it in production. There are some known issues 
and it has not been fully cross browser tested.

Having said that, most of the desired functionality does work as intended in most modern browsers.

**Note**: If you need to use the stable version of Pvjs see [this README](https://github.com/wikipathways/pvjs/blob/master/README.md).

## Bugs
If you find a bug please report it via the [issue tracker](https://github.com/wikipathways/pvjs/issues).

## Installation
```
npm install @wikipathways/pvjs --save
```
### Using the UMD bundle
Pvjs comes with a UMD bundle that you can include in your HTML page. It's available under `dist/index.js`.

1) Copy the file into your projects assets. Probably use a task runner like Gulp for this.
2) Include it in your head tag

```
<script src="assets/pvjs/index.js"></script>
```

3) Pvjs is now available via the `Pvjs` namespace. So you can call something like `Pvjs.loadDiagram(<params>)`.
### Importing
If you are using a module bundler like [Webpack](http://webpack.github.io/), then just import Pvjs as you normally would.

```javascript
// Import everything for side-effects
// Can just do this if using the custom element
import '@wikipathways/pvjs';
 
import {loadDiagram} from '@wikipathways/pvjs';
```

## Usage
### Custom element
A custom element is provided that allows easy use with a simple HTML tag.

```html
<wikipathways-pvjs about="SOMEPATHWAYID"></wikipathways-pvjs>
```

About is the WikiPathways ID. E.g. Give "WP78" for the TCA sycle.

### loadDiagram
Use the loadDiagram for more fine-grained control. 
Pass in a callback that is called with the instance of the manipulator so you can make changes to the diagram. The 
callback **will not** be called if an error (e.g. network error) occurs.

```javascript
import { loadDiagram } from '@wikipathways/pvjs';

loadDiagram('#pathway-container', 'SOME_WP_ID', opts, callback);
```

`opts` is an object containing options for the diagram. Available options are:
```
{
	version?: number; // The version number. Use 0 for latest
	showPanZoomControls?: boolean;
	hiddenEntities: string[], // List of entityIds,
	highlightedEntities: {entityId: string, color: string}[],
	zoomedEntities: string[],
	pannedEntities: string[]
}
```

### In React
If you are already using React then you can directly use the React component
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Pvjs } from '@wikipathways/pvjs';

const WPID = 'WP4'; // Or whatever ID you desire
const version = 0; // Version 0 is the latest
const showPanZoomControls = true;
highlightedEntities = [{entityId: 'd8bae', color: 'red'}];
hiddenEntities = ['d8bae'];
zoomedEntities = ['d8bae'];
pannedEntities = ['d8bae'];

const onPvjsReady = (pvjsRef) => {
    // This will be called when everything is ready.
    // After Kaavio is mounted and pan/zoom functionality is ready
};

ReactDOM.render(
    <Pvjs 
        about={'http://identifiers.org/wikipathways/' + WPID} 
        version={version} 
        showPanZoomControls={showPanZoomControls}
        onReady={onPvjsReady} 
        highlightedEntities={highlightedEntities} 
        hiddenEntities={hiddenEntities}
        zoomedEntities={zoomedEntities}
        pannedEntities={pannedEntities} />,
    document.getElementById('root')
);


```

## Manipulation API
The manipulation API allows you to perform operations on the diagram such as highlighting and hiding elements, and 
zooming in to parts of the diagram.

A demonstration of what's possible with the manipulation API is available at [MetabMaster](http://metabaster.jcbwndsr.com);

### Usage
```javascript
import { loadDiagram } from '@wikipathways/pvjs';

loadDiagram('#pathway-container', 'SOME_WP_ID', options, manipulator => {
        manipulator.zoomOn('SOME_ENTITY_ID');
})
```

### Getting the entity IDs
For most of the methods in the manipulation API an entity ID is required.
The manipulation API provides a `getEntities` method which returns an array containing some useful properties for the 
entities in the diagram. 

Entities refers to any element on the diagram. E.g. metabolites, genes, interactions (arrows)...

```javascript
const entities = instance.manipulator.getEntitites();

// I just want to get the entity that has "Acetyl CoA" for the text.
const acetylCoA = entities.filter(singleEntity => singleEntity.textContent === 'Acetyl CoA')[0];

// Now I can grab the ID
const ID = acetylCoA.id;
```

### Methods
#### zoomOn
This method accepts a single entity ID or an array of entity IDs. If a single entity is given then the diagram will 
*zoom and pan* to that entity. If an array is given, the diagram will *zoom and pan* to the area defined by all of those 
entities.

```javascript
zoomOn(entity_id: string | string[])
```

### zoomIn
Zoom the diagram in by one increment
```javascript
zoomIn()
```

### zoomOut
```javascript
zoomOut()
```

### panTo
Basically the same as zoomOn but without the zooming.

```javascript
panTo(entity_id: string | string[])
```

### highlightOn
Highlight the entity with any CSS color.

```javascript
highlightOn(entity_id: string, color: string)
```

### highlightOff
```javascript
highlightOff(entity_id: string)
```

### toggleHighlight
```javascript
toggleHighlight(entity_id: string)
```

### hide
```javascript
hide(entity_id: string)
```

### show
```javascript
show(entity_id: string)
```

### toggleHidden 
```javascript
toggleHidden(entity_id: string)
```

### resetPan
```javascript
resetPan()
```

### resetZoom
```javascript
resetZoom()
```

### resetHighlighted
Un-highlight all highlighted entities.
Accepts an optional exclude array that will exclude the given entities from being reset.
```javascript
resetHighlighted(exclude?: string[])
```

### resetHidden
Show all hidden entities. 
Accepts an optional exclude array that will exclude the given entities from being reset.
```javascript
resetHidden(exclude?: string[])
```

### reset
Reset the pan, zoom, hidden, and highlighted entities

```javascript
reset()
```

## Example
```javascript
import { loadDiagram } from '@wikipathways/pvjs';

// WP78 is the TCA cycle
loadDiagram('#pathway-container', 'WP78', options, manipulator => {
    // Get the ID for citrate
    const ID = manipulator.getEntities()
            .filter(singleEntity => singleEntity.textContent === 'citrate')[0].id;
    
    manipulator.zoomOn(ID);
    manipulator.zoomOut();
    manipulator.highlightOn(ID, '#00FFFF');
})
```

Funding
=======
* The National Institute for General Medical Sciences [R01-GM100039](http://www.nigms.nih.gov/)
* The BioRange program of the Netherlands [Bioinformatics Centre](http://www.nbic.nl/)
* [University Maastricht](http://www.unimaas.nl/default.asp?taal=en): Broad Research Strategy Program Part 2 (BOS2)

