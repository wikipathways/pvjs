import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pvjs} from '../Pvjs';
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';

declare let window: any;

/**
 * A custom HTML element for WikiPathways Diagrams
 * See this guide: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */
class WikiPathwaysElement extends HTMLElement {
	constructor(){
		super();
	}

	static get observedAttributes() {
		return ['about', 'version'];
	}

	connectedCallback() {
		if(! this.about) return;
		this.createPvjs();
	}

	attributeChangedCallback(name, oldValue, newValue){
		if(! this.about) return;
		this.createPvjs();
	}
	/**
	 * Get the unique identifier for the desired pathway
	 * E.g. http://identifiers.org/wikipathways/WP1
	 * @returns {string|null}
	 */
	get about() {
		return this.getAttribute('about');
	}

	set about(val){
		if(val){
			this.setAttribute('about', val);
		}
		else {
			this.removeAttribute('about');
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

	private createPvjs(){
		// TODO: Add props: src, alt, customStyles, displayErrors, displayWarnings, displaySuccess, fitToContainer,
		// highlights, hashEditorState
		const props = {
			about: 'http://identifiers.org/wikipathways/' + this.about,
			version: this.version,
			customStyle: this.customStyle? this.customStyle : WikiPathwaysDefaultDisplayStyle
		};

		ReactDOM.render(
			<Pvjs {...props} />,
			this
		)
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

if (document.readyState === 'complete') {
  registerWikiPathwaysPvjsElement();
} else {
  window.addEventListener('load', function listener(event) {
    window.removeEventListener('load', listener, false);
    registerWikiPathwaysPvjsElement();
  }, false);
}
