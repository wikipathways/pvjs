import "source-map-support/register";

import { createJson2SvgCLI } from "kaavio/lib/createJson2SvgCLI";

// TODO: for the css below, I just want the CSS string,
// but the .css -> .d.ts compiler doesn't specify a default export.
// Importing as * as blah yields an object, not a string.
// Both require and import + extract default work, but they look ugly.
/*
//import customSVGStyle from "./customSVGStyle.css";
import * as customSVGStyleModule from "./customSVGStyle.css";
const customSVGStyle = customSVGStyleModule["default"];
//*/
const customSVGStylePlain = require("./customSVGStyle.plain.css");
const customSVGStylePretty = require("./customSVGStyle.dark.css");
const npmPackage = require("../package.json");

import * as edgeDrawerMap from "./drawers/edges/index";
import * as filterDrawerMap from "./drawers/filters/index";
import { Defs as DefsPlain } from "./drawers/defs/__bundled_dont_edit__.plain";
import { Defs as DefsDark } from "./drawers/defs/__bundled_dont_edit__.dark";
import * as markerDrawerMap from "./drawers/markers/index";

createJson2SvgCLI(npmPackage, [
  {
    name: "plain",
    pathway: {
      backgroundColor: "white"
    },
    customSVGStyle: customSVGStylePlain,
    edgeDrawerMap,
    filterDrawerMap,
    Defs: DefsPlain,
    markerDrawerMap
  },
  {
    name: "dark",
    pathway: {
      backgroundColor: "#3D3D3D"
    },
    customSVGStyle: customSVGStylePretty,
    edgeDrawerMap,
    filterDrawerMap,
    Defs: DefsDark,
    markerDrawerMap
  }
]);
