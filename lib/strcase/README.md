# Tower String Case

Convert strings to `camelCase`, `snake_case`, `CONSTANT_CASE`, and other useful code-cases. **< 0.4kb** minified and gzipped.

## Install

node:
----

```
npm install tower-strcase
```

browser:
-------

``` html
component install tower/strcase
```

or using minified file from Grunt build:

``` html
<script src="./dist/strcase.min.js" />
```

## Usage

``` javascript
var strcase = require('tower-strcase')
  , cases = [
      'fooBar'
    , 'foo_bar'
    , 'FOO_BAR'
    , 'FooBar'
    , 'Foo.Bar'
    , 'Foo Bar'
    , 'foo-bar'
    , 'foo/bar'
    , 'foo.bar'
  ]

cases.forEach(function(string) {
  strcase.camelCase(string)      // "fooBar"
  strcase.snakeCase(string)      // "foo_bar"
  strcase.constantCase(string)   // "FOO_BAR"
  strcase.classCase(string)      // "FooBar"
  strcase.namespaceCase(string)  // "Foo.Bar"
  strcase.titleCase(string)      // "Foo Bar"
  strcase.paramCase(string)      // "foo-bar"
  strcase.pathCase(string)       // "foo/bar"
  strcase.dotCase(string)        // "foo.bar"
});
```

### Test

```
mocha
```

## License

MIT
