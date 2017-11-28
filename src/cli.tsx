import "source-map-support/register";

import { createJson2SvgCLI } from "kaavio/lib/createJson2SvgCLI";
import * as customStyleHTML from "./customStyleHTML.css";
import * as customStyleSVG from "./customStyleSVG.css";

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
