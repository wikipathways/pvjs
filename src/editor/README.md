# Editor

It will emit an event from the container element of the pathvisiojs instance (the one you specified). You can listen for ```pathvisiojsdatachange``` like this:

```js
document.querySelector('#your-container-element').addEventListener('pathvisiojsdatachange', function (event) {
  console.log(event.detail);
}, false);
```

The ```detail``` property will have a property named ```pvjson```, which is the current diagram data.

It will TEMPORARILY also have a property named ```gpml```, which will be the gpml data as a string. This property will be removed as soon as the pvjson to gpml converter is working, at which time the conversion will happen outside of pathvisiojs.
