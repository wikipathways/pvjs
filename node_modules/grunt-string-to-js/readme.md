# grunt-string-to-js

### Build any text into JavaScript

```npm install grunt-string-to-js --save``

Grunt configuration

```
str2js: {
  NS: { 'test/build.js': ['test/html.html']}
}
```

Turns ```test/test.html```

```
<div class="foo">
    <p class="bar">baz</p>
</div>
```

into ```test/build.js```

```
var NS = NS || {};
NS["test/html.html"] = '<div class="foo">\n    <p class="bar">baz</p>\n</div>\n';
```

### Credits

Credit for the regex goes to https://github.com/visionmedia/node-string-to-js
