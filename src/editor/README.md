# Editor

It will emit an event from the container element of the pathvisiojs instance (the one you specified). You can listen for ```pathvisiojsdatachange``` like this:

```js
document.querySelector('#your-container-element').addEventListener('pathvisiojsdatachange', function (event) {
  console.log(event.detail);
}, false);
```

The ```detail``` property will have a property named ```gpml```, which will have the gpml data as a string.
