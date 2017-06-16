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

1. Copy `dist/index.js`, `dist/style.css`, and all of `dist/assets` into your project assets (tip: use a task runner like gulp)
2. Include `inde.js` and `style.css` in your project's head tag:

```html
<script src="assets/pvjs/index.js"></script>
<script src="assets/pvjs/index.css"></script>
```

Alternatively, just use it from the unpkg CDN:

```html
<script src="https://unpkg.com/@wikipathways/pvjs/dist/index.js"></script>
<script src="https://unpkg.com/@wikipathways/pvjs/dist/index.css"></script>
```

3. Pvjs is now available via the `Pvjs` namespace.

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
<wikipathways-pvjs wpId="SOMEPATHWAYID" version="0"></wikipathways-pvjs>
```

wpId is the WikiPathways ID (e.g. WP4) and version is the version of the pathway to use (0 is the latest).

### loadDiagram
Use the loadDiagram for more fine-grained control. 

Pass in a callback that is called with the instance of the manipulator so you can make changes to the diagram. The 
callback **will not** be called if an error (e.g. network error) occurs. Details of the manipulator are available below.

*Note* that if you are using the *UMD* module, you will need to call `Pvjs.loadDiagram(...)`.

```javascript
import { loadDiagram } from '@wikipathways/pvjs';

loadDiagram('#pathway-container', 'SOME_WP_ID', opts, callback);
```

`opts` is an object containing options for the diagram. Available options are:
```
{
	version?: number; // The version number. Use 0 for latest. Defaults to 0
	showPanZoomControls?: boolean;
	hiddenEntities: string[], // List of entityIds,
	highlightedEntities: {entityId: string, color: string}[],
	zoomedEntities: string[],
	pannedEntities: string[],
	detailPanelEnabled: boolean, // Defaults to true. Whether the pop-up for more detail on nodes should show
	onEntityClick: (entity) => void, // Called whenever an entity is clicked
}
```

### In React
If you are already using React then you can directly use the React component. 

You *do not* need to use the Manipulator when using the React component. Just update the props to achieve the desired
effect.

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

onEntityClick = (entity) => console.log(entity);

const onReady = (entityList) => {
    // This will be called when everything is ready.
    // After Kaavio is mounted and pan/zoom functionality is ready
    // It is passed a list of all the entities in the diagram
    // You can use this in setState to update the props passed to Pvjs for highlightedEntities, hiddenEntities etc.
};

ReactDOM.render(
    <Pvjs 
        about={'http://identifiers.org/wikipathways/' + WPID} 
        version={version} 
        showPanZoomControls={showPanZoomControls}
        onReady={onPvjsReady} 
        onEntityClick={onEntityClick}
        detailPanelEnabled={true}
        highlightedEntities={highlightedEntities} 
        hiddenEntities={hiddenEntities}
        zoomedEntities={zoomedEntities}
        pannedEntities={pannedEntities} />,
    document.getElementById('root')
);
```

## Setting dimensions
In all usage methods, it is advisable to wrap the Pvjs diagram in a container with predefined with and heights.
Pvjs will then fill this container.

```html
<!--Example with the HTML custom element-->

<div style="width: 800px; height: 600px">
    <wikipathways-pvjs wpId="SOMEPATHWAYID" version="0"></wikipathways-pvjs>
</div>
```

## Manipulation API (Manipulator)
The manipulation API allows you to perform operations on the diagram such as highlighting and hiding elements, and 
zooming in to parts of the diagram.

A demonstration of what's possible with the manipulation API is available at [MetabMaster](http://metabaster.jcbwndsr.com);

### Usage
The callback function to loadDiagram is called with an object containing the list of entities in the diagram and the 
Manipulator. Use the entities to get the IDs to perform manipulations on.

```javascript
import { loadDiagram } from '@wikipathways/pvjs';

loadDiagram('#pathway-container', 'SOME_WP_ID', options, ({entities, manipulator}) => {
        // Grab an entityId
        // I just want to get the entity that has "Acetyl CoA" for the text.
        const acetylCoA = entities
            .filter(singleEntity => singleEntity.textContent === 'Acetyl CoA')[0].id;
    
        // Use the manipulator methods here
        manipulator.zoomOn(acetylCoA);
})
```

### Methods
#### zoomOn
This method accepts a single entity ID or an array of entity IDs. If a single entity is given then the diagram will 
*zoom and pan* to that entity. If an array is given, the diagram will *zoom and pan* to the area defined by all of those 
entities.

```javascript
manipulator.zoomOn(entity_id: string | string[])
```

### zoomIn
Zoom the diagram in by one increment
```javascript
manipulator.zoomIn()
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
loadDiagram('#pathway-container', 'WP78', options, ({manipulator, entities}) => {
    // Get the ID for citrate
    const ID = entities
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

