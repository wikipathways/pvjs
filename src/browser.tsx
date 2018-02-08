import * as React from "react";
import * as ReactDOM from "react-dom";
import { isString } from "lodash/fp";
// TODO look at how to properly import this so it works
// for both ES5, esnext, tree-shaking, etc.
//import { Kaavio } from "kaavio";
import { Kaavio } from "kaavio/lib/Kaavio";

const customStyleSVG = require("./customHTMLStyle.css");
const customSVGStyle = require("./customSVGStyle.plain.css");

import * as edgeDrawerMap from "./drawers/edges/index";
import * as filterDrawerMap from "./drawers/filters/index";
import { Defs } from "./drawers/defs/__bundled_dont_edit__.plain";
import * as markerDrawerMap from "./drawers/markers/index";

export function Pvjs(userSpecifiedContainerInput: any, data) {
  const userSpecifiedContainer = isString(userSpecifiedContainerInput)
    ? document.querySelector(userSpecifiedContainerInput)
    : userSpecifiedContainerInput;

  return ReactDOM.render(
    <Kaavio
      customSVGStyle={customSVGStyle}
      Defs={Defs}
      edgeDrawerMap={edgeDrawerMap}
      filterDrawerMap={filterDrawerMap}
      markerDrawerMap={markerDrawerMap}
      pathway={data.pathway}
      entityMap={data.entityMap}
      onReady={function() {
        console.warn("browser-version of pvjs is ready");
      }}
      onEntityClick={function(entity) {
        if (window.hasOwnProperty("XrefPanel")) {
          if (!!entity.dbConventionalName && !!entity.dbId) {
            window["XrefPanel"][
              "show"
            ](
              userSpecifiedContainer,
              entity.dbId,
              entity.dbConventionalName,
              data.pathway.organism,
              {
                "0": entity.textContent
              }
            );
          }
        }
      }}
    />,
    userSpecifiedContainer
  );
}
