// IMPORTS
// Required libraries that are imported for side-effects. Polyfills and shims go here.
// TODO: Most of these polyfills are actually used by Kaavio. Be sure to include them when separating
import '@webcomponents/custom-elements/src/htmlelement-instanceof';
import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements/src/custom-elements';
import 'web-animations-js';
import 'whatwg-fetch'

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import internal libraries for side-effects.
import './wrappers/pvjs.webcomponent'; // TODO: Check this registers the component in browsers

// Exports
import {Pvjs} from './wrappers/vanilla';
export default Pvjs; // Use default
export {Pvjs}; // and specific syntax