# API for PVJS alterations
This would be the API to dynamically alter PVJS from the container application.

As per the "green links" like in Proteopedia, this API could eventually be used to get similiar functionality in WikiPathways. Within the description editor, could have a functionality for adding the green links. In Proteopedia they use an HTML like sytax I believe. This is offputting for many users. I'd go for a WYSIWYG editor or something similiar to markdown like so:

```
!highlight(node_identifier, colour)[glutamine]
```

The above would generate a link looking something like this:
```
<a href="#" onclick="window.pvjs().highlight(node_identifier, colour)">glutamine</a>
```

## As per usual call PVJS
```
let elem = $(".pvjs-container");
let pvjs = pvjs(elem).render();
```

## Highlight node
- How are nodes identified?

```
pvjs.toggleHighlight(node_identifier, colour);
```

## Reset all highlights
```
pvjs.resetHighlight();
```

## Zoom

```
pvjs.zoom(zoom_perc, zoom_origin);
```

## Zoom on
Zoom to a particular node.
```
pvjs.zoomOn(node_identifier);
```

## Reset zoom
```
pvjs.resetZoom();
```

## Pan

```
pvjs.pan(top, left, bottom, right);
```

## Pan to
```
pvjs.panTo(node_identifier);
```

## Reset pan
```
pvjs.resetPan();
```

## Toggle annotations
Think this should automatically close other open annotations. Having too many open is messy.

```
pvjs.toggleAnnotations(node_identifier);
```

## Reset everything
```
pvjs.reset();
```



## Download
```
pvjs.download(format);
```
