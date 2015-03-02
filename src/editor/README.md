# Editor

It will emit an event from the parent element of the pathvisiojs instance. You can listen for ```pathvisiojsdatachange``` like this:

```js
document.querySelector('.wikipathways-pathvisiojs').addEventListener('pathvisiojsdatachange', function (event) {
  console.log(event.detail);
}, false);
```

The ```detail``` property will have a property named ```gpml```, which will have the gpml data as a string.
