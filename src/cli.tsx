import "source-map-support/register";

import { createJson2SvgCLI } from "kaavio/lib/createJson2SvgCLI";

// TODO: for both css imports below, I just want the CSS string,
// but the .css -> .d.ts compiler doesn't specify a default export.
// Importing as * as blah yields an object, not a string.
// Both require and import + extract default work, but they look ugly.

// TODO: does it make sense to import the CSS for the HTML?
// Doesn't the CLI only make SVG?
/*
//import * as customStyleHTML from "./customStyleHTML.css";
import * as customStyleHTMLModule from "./customStyleHTML.css";
const customStyleHTML = customStyleHTMLModule["default"];
//*/
const customStyleHTML = require("./customStyleHTML.css");
/*
//import customStyleSVG from "./customStyleSVG.css";
import * as customStyleSVGModule from "./customStyleSVG.css";
const customStyleSVG = customStyleSVGModule["default"];
//*/
const customStyleSVG = require("./customStyleSVG.css");

import * as edgeDrawerMap from "./drawers/edges/index";
import * as filterDrawerMap from "./drawers/filters/index";
import { Icons } from "./drawers/icons/index";
import * as markerDrawerMap from "./drawers/markers/index";

createJson2SvgCLI("pvjs", {
  customStyleHTML,
  customStyleSVG,
  edgeDrawerMap,
  filterDrawerMap,
  Icons,
  markerDrawerMap
});
