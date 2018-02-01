import * as React from "react";
import * as ReactDOM from "react-dom";
import { isString } from "lodash/fp";
// TODO look at how to properly import this so it works
// for both ES5, esnext, tree-shaking, etc.
//import { Kaavio } from "kaavio";
import { Kaavio } from "kaavio/lib/Kaavio";

const customStyleHTML = require("./customStyleHTML.css");
const customStyleSVG = require("./customStyleSVG.css");

import * as edgeDrawerMap from "./drawers/edges/index";
import * as filterDrawerMap from "./drawers/filters/index";
import { Icons } from "./drawers/icons/index";
import * as markerDrawerMap from "./drawers/markers/index";

export function Pvjs(userSpecifiedContainerInput: any, data) {
  const userSpecifiedContainer = isString(userSpecifiedContainerInput)
    ? document.querySelector(userSpecifiedContainerInput)
    : userSpecifiedContainerInput;

  return ReactDOM.render(
    <Kaavio
      customStyleSVG={customStyleSVG}
      Icons={Icons}
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
