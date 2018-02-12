import "source-map-support/register";

import { createJson2SvgCLI } from "kaavio/lib/createJson2SvgCLI";

const npmPackage = require("../package.json");

// TODO: for the css below, I just want the CSS string,
// but the .css -> .d.ts compiler doesn't specify a default export.
// Importing as * as blah yields an object, not a string.
// Both require and import + extract default work, but they look ugly.
/*
//import DiagramCustomStyle from "./DiagramCustomStyle.css";
import * as DiagramCustomStyleModule from "./DiagramCustomStyle.css";
const DiagramCustomStyle = DiagramCustomStyleModule["default"];
//*/
const DiagramCustomStylePlain = require("./themes/styles/Diagram.plain.css");
const DiagramCustomStyleDark = require("./themes/styles/Diagram.dark.css");
import { Defs as DefsPlain } from "./themes/__bundles_dont_edit__/plain/Defs";
import { Defs as DefsDark } from "./themes/__bundles_dont_edit__/dark/Defs";

import * as edgeDrawerMap from "./drawers/edges/index";
import * as filterDrawerMap from "./drawers/filters/index";

createJson2SvgCLI(npmPackage, [
  {
    name: "plain",
    style: DiagramCustomStylePlain,
    edgeDrawerMap,
    filterDrawerMap,
    Defs: DefsPlain
  },
  {
    name: "dark",
    style: DiagramCustomStyleDark,
    edgeDrawerMap,
    filterDrawerMap,
    Defs: DefsDark
  }
]);
