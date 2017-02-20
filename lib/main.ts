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

// Extend PVJS' prototype
Pvjs.manipulator = new Manipulator();

window.Pvjs = Pvjs;