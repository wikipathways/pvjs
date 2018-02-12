import * as React from "react";
import * as ReactDOM from "react-dom";
import { isString } from "lodash/fp";
// TODO look at how to properly import this so it works
// for both ES5, esnext, tree-shaking, etc.
//import { Kaavio } from "kaavio";
import { Kaavio } from "kaavio/lib/Kaavio";

const ContainerCustomStyle = require("./themes/styles/Container.css");
const DiagramCustomStylePlain = require("./themes/styles/Diagram.plain.css");
import { Defs } from "./themes/__bundles_dont_edit__/plain/Defs";

import * as edgeDrawerMap from "./drawers/edges/index";
import * as filterDrawerMap from "./drawers/filters/index";

export function Pvjs(userSpecifiedContainerInput: any, data) {
  const userSpecifiedContainer = isString(userSpecifiedContainerInput)
    ? document.querySelector(userSpecifiedContainerInput)
    : userSpecifiedContainerInput;

  return ReactDOM.render(
    <Kaavio
      style={{
        container: ContainerCustomStyle,
        diagram: DiagramCustomStylePlain
      }}
      Defs={Defs}
      edgeDrawerMap={edgeDrawerMap}
      filterDrawerMap={filterDrawerMap}
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
