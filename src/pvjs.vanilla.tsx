import * as React from "react";
import * as ReactDOM from "react-dom";
import { isString } from "lodash/fp";
import { Pvjs as PvjsEl } from "./Pvjs";
export type Pathway = Record<string, any>;
export type EntitiesById = Record<string, any>;

export class Pvjs {
  // NOTE: this is the user-specified container, not the Kaavio container
  private _containerEl: any;
  private _data: any;
  private _element: React.Component;
  private _renderMethod: "hydrate" | "render";
  constructor(containerEl: any, data) {
    this._containerEl = containerEl;
    this._renderMethod =
      containerEl.innerHTML.trim() === "" ? "render" : "hydrate";
    this._data = data;
    this.render();
  }

  set data(data: any) {
    const { _containerEl, _data: prevData } = this;
    const { pathway } = data;
    this._data = data;
    //ReactDOM.unmountComponentAtNode(_containerEl);
    this._renderMethod = "render";
    this.render();
    /*
	  const propIds = ["highlighted", "hidden", "pathway", "entitiesById"];
	  const stateIds = ["highlighted", "hidden", "pathway", "entitiesById"];
    if (pathway.id !== prevData.pathway.id) {
      ReactDOM.unmountComponentAtNode(_containerEl);
      this._renderMethod = "render";
      this.render();
    } else {
      this._element.setState(data);
    }
	  //*/
  }

  render() {
    const { _data, _renderMethod, _containerEl } = this;
    this._element = ReactDOM[_renderMethod](
      <PvjsEl {..._data} />,
      _containerEl
    );
  }
}
