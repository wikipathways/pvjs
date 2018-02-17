import "source-map-support/register";

import { createJson2SvgCLI } from "kaavio/esnext/createJson2SvgCLI";

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

import * as theme from "./themes/dark/theme";
const DiagramCustomStylePlain = require("./themes/styles/Diagram.plain.css");
const DiagramCustomStyleDark = require("./themes/styles/Diagram.dark.css");

createJson2SvgCLI(npmPackage, [
  {
    name: "plain",
    theme: { diagramStyle: DiagramCustomStylePlain, ...theme }
  },
  {
    name: "dark",
    theme: { diagramStyle: DiagramCustomStyleDark, ...theme }
  }
]);
