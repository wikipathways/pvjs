import { createJson2SvgCLI } from "kaavio/es5/createJson2SvgCLI";

const path = require("path");
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

import * as themePlain from "./themes/plain/theme";
import * as themeDark from "./themes/dark/theme";
// TODO make the CLI do this
// TODO what is the best way to handle CSS when using tsc?
// Compiling w/ webpack is really slow for the CLI.
// how about using this: https://github.com/longlho/ts-transform-css-modules
/*
const DiagramCustomStylePlain = require("./themes/styles/Diagram.plain.css");
const DiagramCustomStyleDark = require("./themes/styles/Diagram.dark.css");
//*/
//*
const fs = require("fs");
const DiagramCustomStylePlain = fs.readFileSync(
  path.resolve(__dirname, "./themes/styles/Diagram.plain.css")
);
const DiagramCustomStyleDark = fs.readFileSync(
  path.resolve(__dirname, "./themes/styles/Diagram.dark.css")
);
//*/

themePlain["diagramStyle"] = DiagramCustomStylePlain;
themeDark["diagramStyle"] = DiagramCustomStyleDark;

createJson2SvgCLI(npmPackage, [
  {
    name: "plain",
    theme: themePlain
  },
  {
    name: "dark",
    theme: themeDark
  }
]);
