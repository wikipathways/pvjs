"use strict";
// IMPORTS
// Required libraries that are imported for side-effects. Polyfills and shims go here.
// TODO: Most of these polyfills are actually used by Kaavio. Be sure to include them when separating
require("document-register-element");
require("whatwg-fetch");
// Import styles
// TODO: Use material design
// TODO: Use shadow DOM to encapsulate styles
// TODO: State in docs that Webpack/browserify will automatically bring styles in when bundling
require("roboto-fontface/css/roboto/roboto-fontface.css");
// Import internal libraries for side-effects.
require("./wrappers/pvjs.webcomponent"); // TODO: Check this registers the component in browsers
// Exports
var vanilla_1 = require("./wrappers/vanilla");
exports.loadDiagram = vanilla_1.loadDiagram;
var Pvjs_1 = require("./Pvjs");
exports.Pvjs = Pvjs_1.Pvjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTtBQUNWLHNGQUFzRjtBQUN0RixxR0FBcUc7QUFDckcscUNBQW1DO0FBQ25DLHdCQUFzQjtBQUV0QixnQkFBZ0I7QUFDaEIsNEJBQTRCO0FBQzVCLDZDQUE2QztBQUM3QywrRkFBK0Y7QUFDL0YsMERBQXdEO0FBRXhELDhDQUE4QztBQUM5Qyx3Q0FBc0MsQ0FBQyx1REFBdUQ7QUFFOUYsVUFBVTtBQUNWLDhDQUFpRDtBQUF4QyxnQ0FBQSxXQUFXLENBQUE7QUFDcEIsK0JBQThCO0FBQXJCLHNCQUFBLElBQUksQ0FBQSJ9