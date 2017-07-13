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
2. Include `index.js` and `style.css` in your project's head tag:

```html
<script src="assets/pvjs/index.js"></script>
<link rel="stylesheet" href="assets/pvjs/style.css" />
```

Alternatively, just use it from the unpkg CDN:

```html
<script src="https://unpkg.com/@wikipathways/pvjs/dist/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@wikipathways/pvjs/dist/style.css" />
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
        wpId={WPID} 
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
It is advisable to wrap the Pvjs diagram in a container with predefined width and height.
Pvjs will then fill this container. This holds true for React and the custom element.

```html
<!--Example with the HTML custom element-->

<div style="width: 800px; height: 600px">
    <wikipathways-pvjs wpId="SOMEPATHWAYID" version="0"></wikipathways-pvjs>
</div>
```

Funding
=======
* The National Institute for General Medical Sciences [R01-GM100039](http://www.nigms.nih.gov/)
* The BioRange program of the Netherlands [Bioinformatics Centre](http://www.nbic.nl/)
* [University Maastricht](http://www.unimaas.nl/default.asp?taal=en): Broad Research Strategy Program Part 2 (BOS2)

