Xccessors (cross-browser accessors) is a JavaScript shim that implements the legacy or
standard methods for defining and looking up accessors (getters and setters) of objects.

**Please note**: Internet Explorer 8 only supports getters and setters on the DOM, its
prototypes (document, Element.prototype, etc.), and the window object. As long as you are
setting an accessor on the window object, a DOM element, or a DOM prototype, Xccessors
should work fine in every browser.


Xccessors Standard
------------------

Xcessors Standard implements ECMAScript 5's (formerly 3.1) `Object.defineProperty`,
`Object.defineProperties`, and `Object.getOwnPropertyDescriptor` in browsers that
support the legacy non-standard accessor methods. Everything behaves according to the
ECMAScript 5 standard except the configurable, enumerable, and writable options if set
to `false`. It is impossible to implement these options without native support for
`Object.defineProperty`. The good news is that you are never going to use them if you
are changing a JavaScript program from the legacy to standard methods.


Xccessors Legacy
----------------

Xccessors Legacy implements the legacy accessor methods (`object.__define[GS]etter__`
and `object.__lookup[GS]etter__`) in browsers that support the standard
ECMAScript 5 accessor methods.


Supported Platforms
-------------------

* SpiderMonkey (Firefox, all Gecko browsers)
* JavaScriptCore (Safari, many WebKit-based browsers)
* V8 (Google Chrome, Chromium)
* Futhark (Opera 9.5)
* Carakan (Opera 10.5)
* JScript 1.5 (Internet Explorer 8; DOM elements and prototypes only)
* Chakra (Internet Explorer 9)
* Rhino
* Narcissus

![Tracking image](https://in.getclicky.com/212712ns.gif =1x1)
