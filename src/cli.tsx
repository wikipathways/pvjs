import "source-map-support/register";

import { createJson2SvgCLI } from "kaavio/lib/createJson2SvgCLI";

// TODO: for the css below, I just want the CSS string,
// but the .css -> .d.ts compiler doesn't specify a default export.
// Importing as * as blah yields an object, not a string.
// Both require and import + extract default work, but they look ugly.
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

createJson2SvgCLI("pvjs", [
  {
    name: "plain",
    style: customStyleSVGPlain,
    edgeDrawerMap,
    filterDrawerMap,
    Icons: IconsPlain,
    markerDrawerMap
  },
  {
    name: "pretty",
    style: customStyleSVGPretty,
    edgeDrawerMap,
    filterDrawerMap,
    Icons: IconsPretty,
    markerDrawerMap
  }
]);