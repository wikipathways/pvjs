// IMPORTS
// Required libraries that are imported for side-effects. Polyfills and shims go here.
// TODO: Most of these polyfills are actually used by Kaavio. Be sure to include them when separating
import 'document-register-element';
import 'whatwg-fetch';

// Import styles
// TODO: Use material design
// TODO: Use shadow DOM to encapsulate styles
// TODO: State in docs that Webpack/browserify will automatically bring styles in when bundling
import 'roboto-fontface/css/roboto/roboto-fontface.css';

// Import internal libraries for side-effects.
import './wrappers/pvjs.webcomponent'; // TODO: Check this registers the component in browsers

// Exports
export { loadDiagram } from './wrappers/vanilla';
export { Pvjs } from './Pvjs';