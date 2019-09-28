# Pvjs

JavaScript-based biological pathway diagram viewer. Used in [WikiPathways](http://wikipathways.org).

## Beta

The beta tag given to this version means that it is not advisable to use it in production. There are some known issues
and it has not been fully cross browser tested.

Having said that, most of the desired functionality does work as intended in most modern browsers.

**Note**: If you need to use the stable version of Pvjs see [this README](https://github.com/wikipathways/pvjs/blob/master/README.md).

## Contents

- [Installation](#install)
  - [Using a Module Bundler (Webpack)](#webpack)
  - [Using the UMD bundle](#umd)
- [React Usage](#react)
  - [Basic Example](#react.example)
  - [Props](#react.props)
  - [Advanced Example](#react.advanced)
- [Web Component](#component)
  - [Example](#component.example)
  - [Attributes](#component.attributes)
  - [Properties](#component.properties)
  - [Events](#component.events)
  - [Manipulating](#component.manipulation)
    - [Example](#manipulation.example)
    - [Methods](#manipulation.methods)
- [Contributions & Bug Reports](#contributions)
- [Funding](#funding)

## <a name="install"></a>Installation

### <a name="webpack"></a>Using a Module Bundler (Webpack)

We recommend using a module bundler like [Webpack](https://webpack.js.org/) in your project. If you're doing this, just install and import Pvjs. All examples will assume you are using this method and not the UMD bundle.

Note that Pvjs does come with some styles which will be automatically picked up by Webpack.

```
npm install @wikipathways/pvjs --save
```

```javascript
// Somewhere in your project
import { Pvjs } from "@wikipathways/pvjs";
```

### <a name="umd"></a>Using the UMD bundle

Pvjs comes with a UMD bundle that you can include in your HTML page. It's available under `dist/index.js`. Once you've included the bundle, Pvjs is available under the `Pvjs` namespace.

````

### <a name="umd"></a>Using the UMD bundle
Pvjs comes with a UMD bundle that you can include in your HTML page. It's available under `dist/index.js`. Once you've included the bundle, Pvjs is available under the `Pvjs` namespace.

1. Copy `dist/index.js`, `dist/style.css`, and all of `dist/assets` into your project assets (tip: use a task runner like gulp)
2. Include `index.js` and `style.css` in your project's head tag:

```html
<script src="assets/pvjs/index.js"></script>
<link rel="stylesheet" href="assets/pvjs/style.css" />
````

Alternatively, just use it from the unpkg CDN:

```html
<script src="https://unpkg.com/@wikipathways/pvjs/dist/index.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/@wikipathways/pvjs/dist/style.css"
/>
```

## <a name="react"></a> React Usage

If you are already using React then you can directly use the React component.

### <a name="react.example"></a> Basic Example

Use the component as below. Pvjs will fill whatever container it is in, so it is a good idea to place it inside a container with set dimensions.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Pvjs } from "@wikipathways/pvjs";

ReactDOM.render(<Pvjs wpId="WP4" />, document.getElementById("root"));
```

### <a name="react.props"></a> Props

- `wpId`: Required. A string for the WikiPathways ID of the desired pathway. E.g. 'WP4'.
- `version`: Default = 0. A number for the version of the pathway. 0 is latest.
- `onReady`: Function that is called with the list of entities in the diagram when the diagram has finished loading. You can use this to get the entityIds for other props.
- `onEntityClick`: Function that is called with the entity whenever a diagram entity has been clicked.
- `onPanZoomChange`: Function that is called whenever the diagram is panned or zoomed. It is called with an object with the form: `{ x: number, y: number, zoomLevel: number }`. The coordinates in the object are relative to the diagram dimensions.
- `detailPanelEnabled`: Default = `true`. Indicates whether the annotations pop-up will be shown when an entity is clicked.
- `panZoomLocked`: Default = `false`. Indicates whether the user can manually pan and zoom the diagram. Note, changes to pannedEntities and zoomedEntities will still have an effect if this is true.
- `showPanZoomControls`: Default = true. Indicates whether the controls for panning and zooming are shown.
- `highlightedEntities`: Default = `[]`. Array of objects for highlighted diagram entities. Objects in this array look like `{ entityId: string, color: string }`. Color can be any CSS color. See the [advanced example](#react.advanced).
- `hiddenEntities`: Default = `[]`. Array of entityIds. See the [advanced example](#react.advanced).
- `pannedEntities`: Default = `[]`. Array of entityIds. See the [advanced example](#react.advanced).
- `zoomedEntities`: Default = `[]`. Array of entityIds. See the [advanced example](#react.advanced). Note, that zoomed does not also mean panned. In most cases, an entityId in zoomedEntities should also be in pannedEntities.
- `zoomLevel`: Default = `1`. Number indicating the level of zoom the diagram should be at. 1 = no zoom in/out.
- `panCoordinates`: Default: `{x: 0, y: 0}`. Relative coordinates to pan to. `x` is relative to the diagram width and `y` the diagram height. E.g. `{x: 0.5, y: 0.5}` will pan half way across the x and y axis.

_Note that pannedCoordinates and zoomLevel take precedence over pannedEntities and zoomedEntities._

### <a name="react.advanced"></a> Advanced Example

```javascript
import React, { Component } from "react";
import { Pvjs } from "@wikipathways/pvjs";

class MyPvjsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightedEntities: [],
      hiddenEntities: [],
      zoomedEntities: [],
      pannedEntities: []
    };
  }

  onEntityClick = entity => {
    // This will highlight an entity red, whenever it is clicked
    this.setState(state => {
      return {
        highlightedEntities: state.highlightedEntities.concat([
          {
            entityId: entity.id,
            color: "red" // Color can be any CSS color
          }
        ])
      };
    });
  };

  onPvjsReady = entityList => {
    // Find the entity with TCA cycle as the node text
    const TCA = entityList.find(
      singleEntity => singleEntity.textContent === "TCA Cycle"
    );
    const BRCA1 = entityList.find(
      singleEntity => singleEntity.textContent === "BRCA1"
    );

    this.setState({
      highlightedEntities: [{ entityId: TCA.id, color: "blue" }],
      pannedEntities: [TCA.id],
      zoomedEntities: [TCA.id],
      hiddenEntities: ["daafb"]
    });
  };

  render() {
    const {
      highlightedEntities,
      hiddenEntities,
      zoomedEntities,
      pannedEntities
    } = this.state;

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Pvjs
          wpId="WP4"
          version={0}
          onReady={this.onPvjsReady}
          onEntityClick={this.onEntityClick}
          highlightedEntities={highlightedEntities}
          hiddenEntities={hiddenEntities}
          zoomedEntities={zoomedEntities}
          pannedEntities={pannedEntities}
          detailPanelEnabled={false}
        />
      </div>
    );
  }
}
```

## <a name="component"></a> Web Component

The web component allows you to use Pvjs without React. To use it, first make sure that Pvjs is available on the page in which you're using it. The easiest way to do this is to include the UMD bundle in your pages head. If you're using a module bundler, just make sure Pvjs is included in your build process (normally in `index.js`).

### <a name="component.example"></a> Example

An example is served at [this gist](https://gist.github.com/jacobwindsor/3684220d95210df2dcbdf79b9e5c2ef5).

### <a name="component.attributes"></a> Attributes

- `wp-id`: Required. A string for the WikiPathways ID of the desired pathway. E.g. 'WP4'.
- `version`: Default = 0. A number for the version of the pathway. 0 is latest.
- `detail-panel-enabled`: Indicates whether the annotations pop-up will be shown when an entity is clicked.
- `pan-zoom-locked`: Indicates whether the user can manually pan and zoom the diagram. Note, changes via the [Manipulation API](#component.manipulation) will still take effect.
- `show-pan-zoom-controls`: Indicates whether the controls for panning and zooming are shown.
- `ready`: Indicates when the diagram is fully loaded and ready for manipulating. You cannot set this.
- `highlighted-entities`: Comma separated list of `entityId:color` maps. E.g. `d8bae:red`. You may set this using the [API](#component.manipulation).
- `panned-entities`: Comma separated list of entity IDs that are panned to. You may set this using the [API](#component.manipulation).
- `zoomed-entities`: Comma separated list of entity IDs that are zoomed to. You may set this using the [API](#component.manipulation).
- `hidden-entities`: Comma separated list of entity IDs that are hidden. You may set this using the [API](#component.manipulation).

#### <a name="component.properties"></a> Properties

These properties are **not** reflected in the DOM attributes.

- `entities`: The list of entity objects in the diagram. This is null until the diagram is ready.

### <a name="component.events"></a> Events

- `ready`: This is fired when the diagram is ready. `entities` is provided in the detail object for convenience. See [this gist](https://gist.github.com/jacobwindsor/b45fdf2485a2e0c772fe2884c32ee9cc).

### <a name="component.manipulation"></a> Manipulating

The custom element provides a custom API that allows you to programmatically manipulate the diagram.

#### <a name="manipulation.example"></a> Example

An example is served at [this gist](https://gist.github.com/jacobwindsor/b45fdf2485a2e0c772fe2884c32ee9cc).

#### <a name="manipulation.methods"></a> Methods

##### zoomOn

This method accepts a single entity ID or an array of entity IDs. If a single entity is given then the diagram will
_zoom and pan_ to that entity. If an array is given, the diagram will _zoom and pan_ to the area defined by all of those
entities.

```javascript
zoomOn(entity_id: string | string[])
```

##### panTo

Basically the same as zoomOn but without the zooming.

```javascript
panTo(entity_id: string | string[])
```

##### highlightOn

### <a name="component.attributes"></a> Attributes

```javascript
highlightOn(entity_id: string, color: string)
```

##### highlightOff

```javascript
highlightOff(entity_id: string)
```

##### toggleHighlight

```javascript
toggleHighlight(entity_id: string)
```

##### hide

```javascript
hide(entity_id: string)
```

##### show

```javascript
show(entity_id: string)
```

##### toggleHidden

```javascript
toggleHidden(entity_id: string)
```

##### resetPan

````javascript
resetPan()

##### toggleHidden
```javascript
toggleHidden(entity_id: string)
````

##### resetPan

```javascript
resetPan();
```

##### resetZoom

```javascript
resetZoom();
```

##### resetHighlighted

Un-highlight all highlighted entities.
Accepts an optional exclude array that will exclude the given entities from being reset.

```javascript
resetHighlighted(exclude?: string[])
```

##### resetHidden

Show all hidden entities.
Accepts an optional exclude array that will exclude the given entities from being reset.

```javascript
resetHidden(exclude?: string[])
```

##### reset

Reset the pan, zoom, hidden, and highlighted entities

```javascript
reset();
```

## <a name="contributions"></a> Contributions & Bugs

We love pull requests! If you want to contribute to Pvjs then please feel free to make a pull request. The GitHub page is available [here](https://github.com/wikipathways/pvjs).

If you find a bug please check the [issue tracker](https://github.com/wikipathways/pvjs/issues) to see if it hasn't already been reported. If not, then please create a new issue. If you can then we would love for you to make a fix for it in a pull request.

## peer dependencies

The dependencies `babel-preset-es2016` and `babel-preset-es2016` are required by pvjs dependency `collit`.

## <a name="funding"></a> Funding

- The National Institute for General Medical Sciences [R01-GM100039](http://www.nigms.nih.gov/)
- The BioRange program of the Netherlands [Bioinformatics Centre](http://www.nbic.nl/)
- [University Maastricht](http://www.unimaas.nl/default.asp?taal=en): Broad Research Strategy Program Part 2 (BOS2)
