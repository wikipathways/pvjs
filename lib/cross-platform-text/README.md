cross-platform-text
===================

JS library for creating text in SVG, Canvas and possibly other formats in the future. Handles both single- and multi-line text.

Usage
=====

1) Create Instance
  ```js
  var myInstance1 = crossPlatformText.getInstance({
    targetSelector:'#my-svg1', // (CSS selector) required
    format: 'svg' // ('svg' or 'canvas') required if 'targetSelector' does not reference an SVG or Canvas element
  });
  ```

  ```targetSelector``` references an SVG, Canvas or HTML element (such as a div).
  If it references an HTML element, the library will create a new SVG or Canvas element inside
  the HTML element, as specified by ```format```.

  For an existing SVG, the library will look for a ```g``` element with the class ```viewport```.
  If it does not exist, the library will create it.

2) Render text

  ```js
  var myText1 = myInstance1.render({
      x:50, // (px) required
      y:200, // (px) required
      width:100, // (px) required
      height:20, // (px) required
      textContent:'My text\nhas two lines' // (string) required
    });
  ```

API
===

Supported arguments for ```render(arguments)```:
* x: x value of [transform:translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform), relative to upper left corner
* y: y value of [transform:translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform), relative to upper left corner
* [ width ](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
* [ height ](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
* [ textContent ](https://developer.mozilla.org/en-US/docs/Web/API/Node.textContent)
* [ color ](https://developer.mozilla.org/en-US/docs/Web/CSS/color): color of element behind the text
* [ containerSelector ](http://www.w3.org/TR/CSS21/selector.html): references a container for the text (parent element for text)
* id: for the text element
* [ fill ](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill): color of the text and any decorations
* [ fillOpacity ](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity): opacity of the text and any decorations
* [ fontSize ](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
* [ fontFamily ](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
* [ fontStyle ](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)
* [ fontWeight ](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
* [ overflowX ](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x)
* [ overflowY ](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y)
* [ padding ](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
* rotation: rotate value for [transform:rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform), with origin centered within the provided x/y and width/height
* [ textAlign ](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align): horizontal alignment of the text within the provided width
* [ textOverflow ](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
* [ verticalAlign ](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align): vertical alignment of the text within the provided height
* [ whiteSpace ](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
