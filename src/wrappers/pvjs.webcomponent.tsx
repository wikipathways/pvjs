import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Pvjs} from '../Pvjs';
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';
import { loadDiagram } from './vanilla';

declare let window: any;

/**
 * A custom HTML element for WikiPathways Diagrams
 * See this guide: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */
class WikiPathwaysElement extends HTMLElement {
	constructor(){
		super();
		this.id = `wikipathways-pvjs-${Date.now()}`;
	}

	static get observedAttributes() {
		return ['wpId', 'version'];
	}

	connectedCallback() {
		if(! this.wpId) return;
		this.createPvjs();
	}

	attributeChangedCallback(name, oldValue, newValue){
		if(! this.wpId) return;
		this.createPvjs();
	}

	/**
	 * Get the unique identifier for the desired pathway
	 * E.g. WP4
	 * @returns {string|null}
	 */
	get wpId() {
		return this.getAttribute('wpId');
	}

	set wpId(val){
		if(val){
			this.setAttribute('wpId', val);
		}
		else {
			this.removeAttribute('wpId');
		}
	}

	/**
	 * Pathways at WikiPathways are versioned. Get the version
	 * E.g. WP has version 73346
	 * @returns {string|null}
	 */
	get version(){
		return this.getAttribute('version');
	}

	set version(val){
		if(val){
			this.setAttribute('version', val);
		}
		else {
			this.removeAttribute('version');
		}
	}

	get customStyle(){
		return this.getAttribute('customStyle');
	}

	set customStyle(val){
		if(val){
			this.setAttribute('customStyle', val);
		}
		else {
			this.removeAttribute('customStyle')
		}
	}

	// comma-separated map of entityIds to highlight
	// E.g. d8bae:red,faafb:green,...
	get highlightedById() {
		return this.getAttribute('highlightedById');
	}

	set highlightedById(val) {
		if(val) {
			this.setAttribute('highlightedById', val);
		}
		else {
			this.removeAttribute('highlightedById');
		}
	}

	// comma-separated map of entity labels to highlight
	// cases are ignored
	// E.g. Nucleus:red,ATP:green,..
	get highlightedByLabel() {
		return this.getAttribute('highlightedByLabel');
	}

	set highlightedByLabel(val) {
		if(val) {
			this.setAttribute('highlightedByLabel', val);
		}
		else {
			this.removeAttribute('highlightedByLabel');
		}
	}

	// dbName$dbId:color,...
	// E.g. Entrez Gene$8525:red
	get highlightedByXref() {
		return this.getAttribute('highlightedByXref');
	}

	set highlightedByXref(val) {
		if(val) {
			this.setAttribute('highlightedByXref', val);
		}
		else {
			this.removeAttribute('highlightedByXref');
		}
	}

	private createPvjs(){
		const createHighlightedMap = (propName, propVal) => {
			return propVal.split(',').map((singleHighlighted, i) => {
				const splitMap = singleHighlighted.split(':');
				return {
					[propName]: splitMap[0],
					color: splitMap[1],
				}
			});
		};

		let highlightedEntities;
		if (this.highlightedById) {
			highlightedEntities = createHighlightedMap('entityId', this.highlightedById);
		}

		const callbackFuncs = [];
		if (this.highlightedByLabel) {
			const highlightedMap = createHighlightedMap('label', this.highlightedByLabel);
			callbackFuncs.push(({entities, manipulator}) => {
				console.log(entities.filter(single => single.textContent === 'Calcium'));
				highlightedMap.forEach(singleHighlighted => {
					entities.filter(singleEntity => !!singleEntity.textContent)
						.filter(singleEntity =>
							singleEntity.textContent.toUpperCase() === singleHighlighted.label.toUpperCase()
						).forEach(toHighlight => {
							manipulator.highlightOn(toHighlight.id, singleHighlighted.color);
						});
				})
			})
		}

		if(this.highlightedByXref) {
			const highlightedMap = createHighlightedMap('xref', this.highlightedByXref);
			callbackFuncs.push(({entities, manipulator}) => {
				highlightedMap.forEach(singleHighlighted => {
					const xrefSplit = singleHighlighted.xref.split('$'); // [dbName, dbId];
					entities.filter(singleEntity => !!singleEntity.dbName && !!singleEntity.dbId)
						.filter(singleEntity =>
							singleEntity.dbName === xrefSplit[0] && singleEntity.dbId === xrefSplit[1]
						).forEach(toHighlight => {
							manipulator.highlightOn(toHighlight.id, singleHighlighted.color)
						})
				})
			})
		}

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

/**
 * Web Component wrapper around the Pvjs react component.
 * Insert this component into your HTML to use Pvjs:
 * <wikipathways-pvjs about="http://identifiers.org/wikipathways/WP1" />
 */
function registerWikiPathwaysPvjsElement() {

	// Public: WikiPathwaysPvjsPrototype constructor.
	//
	//   # => <wikipathways-pvjs></wikipathways-pvjs>
	//
	window.customElements.define('wikipathways-pvjs', WikiPathwaysElement);
}


if(typeof(window) !== 'undefined' && typeof(document) !== 'undefined') {
	if (document.readyState === 'complete') {
		registerWikiPathwaysPvjsElement();
	} else {
		window.addEventListener('load', function listener(event) {
			window.removeEventListener('load', listener, false);
			registerWikiPathwaysPvjsElement();
		}, false);
	}
}
