/**
* This is the entry point for the TS part of PVJS.
* All app-wide TS dependencies should be imported here.
*
* NOTE: If converting other JS modules into TS. Once done, just
* import them here.
*/

// Since PVJS is not in TS yet, import it here
// Then can add any extensions to it's prototype
// TODO: convert PVJS' main.js file into TS

let Pvjs = require('./main.js');

// Import PVJS extensions
import { Manipulator } from './manipulation-api'


// Note: Temporary solution for extending PVJS
// Just do pvjs_instance.manipulator = new Manipulator(pvjs_instance);
// TODO: port PVJS and kaavio to TS and then import the Manipulator into PVJS directly
window.Pvjs = Pvjs;
window.Manipulator = Manipulator;