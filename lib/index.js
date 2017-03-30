"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
// Required libraries that are imported for side-effects. Polyfills and shims go here.
// TODO: Most of these polyfills are actually used by Kaavio. Be sure to include them when separating
require("@webcomponents/custom-elements/src/htmlelement-instanceof");
require("@webcomponents/custom-elements/src/native-shim");
require("@webcomponents/custom-elements/src/custom-elements");
require("web-animations-js");
require("whatwg-fetch");
// Import styles
// TODO: Use material design
// TODO: Use shadow DOM to encapsulate this css
require("bootstrap/dist/css/bootstrap.min.css");
// Import internal libraries for side-effects.
require("./wrappers/pvjs.webcomponent"); // TODO: Check this registers the component in browsers
// Exports
var vanilla_1 = require("./wrappers/vanilla");
exports.Pvjs = vanilla_1.Pvjs;
exports.default = vanilla_1.Pvjs; // Use default
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxVQUFVO0FBQ1Ysc0ZBQXNGO0FBQ3RGLHFHQUFxRztBQUNyRyxxRUFBbUU7QUFDbkUsMERBQXdEO0FBQ3hELDhEQUE0RDtBQUM1RCw2QkFBMkI7QUFDM0Isd0JBQXFCO0FBRXJCLGdCQUFnQjtBQUNoQiw0QkFBNEI7QUFDNUIsK0NBQStDO0FBQy9DLGdEQUE4QztBQUU5Qyw4Q0FBOEM7QUFDOUMsd0NBQXNDLENBQUMsdURBQXVEO0FBRTlGLFVBQVU7QUFDViw4Q0FBd0M7QUFFaEMsOEJBQUk7QUFEWixrQkFBZSxjQUFJLENBQUMsQ0FBQyxjQUFjIn0=