import * as React from "react";
import * as ReactDOM from "react-dom";
import { isString } from "lodash/fp";
// TODO look at how to properly import this so it works
// for both ES5, esnext, tree-shaking, etc.
//import { Kaavio } from "kaavio";
import { Kaavio } from "kaavio/esnext/Kaavio";

import * as theme from "./themes/dark/theme";
const ContainerCustomStyle = require("./themes/styles/Container.css");
const DiagramCustomStylePlain = require("./themes/styles/Diagram.plain.css");
const DiagramCustomStyleDark = require("./themes/styles/Diagram.dark.css");

export function Pvjs(userSpecifiedContainerInput: any, data) {
  const userSpecifiedContainer = isString(userSpecifiedContainerInput)
    ? document.querySelector(userSpecifiedContainerInput)
    : userSpecifiedContainerInput;

  return ReactDOM.render(
    <Kaavio
      theme={{
        containerStyle: ContainerCustomStyle,
        //diagramStyle: DiagramCustomStylePlain,
        diagramStyle: DiagramCustomStyleDark,
        ...theme
      }}
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
