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
  /*
  private _theme: string;
  private _hidden: any[];
  private _highlighted: any[];
  private _pathway: Pathway;
  private _entitiesById: EntitiesById;
	//*/
  constructor(
    containerSelectorOrEl: any,
    {
      theme = "plain",
      hidden = [],
      highlighted = [],
      pathway = {} as Pathway,
      entitiesById = {} as EntitiesById,
      hydrate = false
    }
  ) {
    this._containerEl = isString(containerSelectorOrEl)
      ? document.querySelector(containerSelectorOrEl)
      : containerSelectorOrEl;
    const renderMethod = (this._renderMethod = hydrate ? "hydrate" : "render");
    this._data = {
      theme,
      hidden,
      highlighted,
      pathway,
      entitiesById
    };
    this.render();
  }

  set data(data: any) {
    const { _containerEl, _data: prevData } = this;
    const { theme, hidden, highlighted, pathway, entitiesById } = data;
    this._data = data;
    if (pathway.id !== prevData.pathway.id) {
      ReactDOM.unmountComponentAtNode(_containerEl);
      this._renderMethod = "render";
      this.render();
    } else {
      this._element.setState(data);
    }
  }

  render() {
    const { _data, _renderMethod, _containerEl } = this;
    this._element = ReactDOM[_renderMethod](
      <PvjsEl {..._data} />,
      _containerEl
    );
  }
}
