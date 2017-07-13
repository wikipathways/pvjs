import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Pvjs} from '../Pvjs';
import { cloneDeep } from 'lodash';
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';
import { loadDiagram } from './vanilla';

/**
 * A custom HTML element for WikiPathways Diagrams
 * See this guide: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */
class WikiPathwaysElement extends HTMLElement {
	props: {
		wpId: string, // e.g. 'WP4'
		version: number,
	};

	constructor(){
		super();
		this.id = `wikipathways-pvjs-${Date.now()}`;
	}

	static get observedAttributes() {
		return ['wpId', 'version'];
	}

	set props(newProps) {
		const curProps = cloneDeep(this.props);
		return { ...curProps, ...newProps };
	}

	connectedCallback() {
		if(! this.wpId) return;
		this.createPvjs();
	}

	attributeChangedCallback(name, oldValue, newValue){
		if(! this.wpId) return;
		this.createPvjs();
	}

	private createPvjs(){
		const opts = {
			version: this.version,
			customStyle: this.customStyle? this.customStyle : WikiPathwaysDefaultDisplayStyle,
			showPanZoomControls: true,
			highlightedEntities,
		};


		const callback = toPass => callbackFuncs.forEach(singleCb => singleCb(toPass));
		loadDiagram(`#${this.id}`, this.wpId, opts, callback);
	}
}
