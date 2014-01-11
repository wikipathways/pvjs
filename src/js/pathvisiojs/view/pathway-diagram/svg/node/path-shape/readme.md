This directory holds our shape library's definitions for shapes that scale non-uniformly (e.g., the arc-like corner of a rounded
rectangle if the corner must keep a constant radius, regardless of the size of the rectangle). A definition is an array of 
key/value pairs that specify attributes and attribute values for an [SVG path element](http://www.w3.org/TR/SVG/paths.html).

Be sure to specify style elements like default fill and stroke color. This should be done with a CSS class in the file
located at /src/css/pathway-diagram.css. The CSS class name must be the same as the JavaScript class name, except in dash case
(roundedRectangle becomes rounded-rectangle). If the shapes have doubled lines corresponding to the GPML/PathVisio-Java
attribute for doubled lines:

```xml
<Attribute Key="org.pathvisio.DoubleLineProperty" Value="Double" />
```

then the class names should have the word "double" at the end. For example, rounded-rectangle-double and
roundedRectangleDouble.

For the proper casing, we will use the strcase library. You can enter your desired text, such as rounded rectangle
double, and get the proper casing as follows:

1) CSS class: rounded-rectangle-double

```js
strcase.paramCase('rounded rectangle double')
```

2) JavaScript class: roundedRectangleDouble

```js
strcase.camelCase('rounded rectangle double')
```

For markers and for shapes that scale uniformly, please see the [shape library directory](../../../../../../shape-library/symbols/).

This directory will probably eventually be replaced with a database. 
