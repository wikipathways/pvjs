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
const customStyleHTML = require("./html.css");
/*
//import customStyleSVG from "./customStyleSVG.css";
import * as customStyleSVGModule from "./customStyleSVG.css";
const customStyleSVG = customStyleSVGModule["default"];
//*/
const customStyleSVGPlain = require("./svg.plain.css");
const customStyleSVGPretty = require("./svg.pretty.css");

import * as edgeDrawerMap from "./drawers/edges/index";
import * as filterDrawerMap from "./drawers/filters/index";
import { Icons as IconsPlain } from "./drawers/IconBundle.plain";
import { Icons as IconsPretty } from "./drawers/IconBundle.pretty";
import * as markerDrawerMap from "./drawers/markers/index";

const plain = false;
if (plain) {
  createJson2SvgCLI("pvjs", {
    customStyleHTML,
    customStyleSVG: customStyleSVGPlain,
    edgeDrawerMap,
    filterDrawerMap,
    Icons: IconsPlain,
    markerDrawerMap
  });
} else {
  createJson2SvgCLI("pvjs", {
    customStyleHTML,
    customStyleSVG: customStyleSVGPretty,
    edgeDrawerMap,
    filterDrawerMap,
    Icons: IconsPretty,
    markerDrawerMap
  });
}
