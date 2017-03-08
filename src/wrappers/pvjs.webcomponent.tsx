import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pvjs from '../Pvjs';

declare var window: any;

/**
 * Web Component wrapper around the Pvjs react component.
 * Insert this component into your HTML to use Pvjs:
 * <wikipathways-pvjs about="http://identifiers.org/wikipathways/WP1" />
 */
function registerWikiPathwaysPvjsElement() {
	let DivPrototype = Object.create(window.HTMLDivElement.prototype);

	DivPrototype.attributeChangedCallback = function(attrName, oldValue, newValue) {
		if (attrName === 'alt') {
			// TODO don't we only want to do this on error?
			this.textContent = newValue;
		}
	};

	let WikiPathwaysPvjsPrototype = Object.create(DivPrototype);

	WikiPathwaysPvjsPrototype.createdCallback = function() {
		let vm = this;
		const props = [
			// the unique identifier for this pathway,
			// e.g., http://identifiers.org/wikipathways/WP1
			'about',
			// Pathways at WikiPathways are versioned, e.g., WP has version 73346
			'version',
			// if pvjson for pathway cannot be obtained from about and version,
			// give a URL where the pvjson for the pathway can be obtained.
			'src',
			'alt',
			'custom-style',
		].reduce(function(acc, attrName) {
			let attrVal = vm.getAttribute(attrName);

			if (!!attrVal) {
				acc[attrName] = attrVal;

				// NOTE: side effect
				vm.attributeChangedCallback(attrName, null, attrVal);
			}

			return acc;
		}, {});

		/* TODO re-enable these attributes when the React version is ready
		let displayErrors = Boolean(vm.getAttribute('display-errors'));
		vm.attributeChangedCallback('display-errors', null, displayErrors);

		let displayWarnings = Boolean(vm.getAttribute('display-warnings'));
		vm.attributeChangedCallback('display-warnings', null, displayWarnings);

		let displaySuccess = Boolean(vm.getAttribute('display-success'));
		vm.attributeChangedCallback('display-success', null, displaySuccess);

		let fitToContainer = Boolean(vm.getAttribute('fit-to-container'));
		vm.attributeChangedCallback('fit-to-container', null, fitToContainer);

		let highlights = vm.getAttribute('highlights');
		if (!!highlights) {
			highlights = JSON.parse(decodeURIComponent(highlights));
			vm.attributeChangedCallback('highlights', null, highlights);
		}

		let hashEditorStateComponents = window.location.hash.match('editor\/(.*)$');
		let hashEditorState;
		if (!!hashEditorStateComponents && !!hashEditorStateComponents.length) {
			hashEditorState = hashEditorStateComponents[1];
		}
		let editor = hashEditorState || vm.getAttribute('editor');
		if (!!editor) {
			vm.attributeChangedCallback('editor', null, editor);
		}
	  //*/

    ReactDOM.render(
        <Pvjs {...props} />,
        vm
    )

	};

	// Public: WikiPathwaysPvjsPrototype constructor.
	//
	//   # => <wikipathways-pvjs></wikipathways-pvjs>
	//
	window.WikiPathwaysPvjs = document.registerElement(
			'wikipathways-pvjs', {
			prototype: WikiPathwaysPvjsPrototype
	});
}

if (document.readyState === 'complete') {
  registerWikiPathwaysPvjsElement();
} else {
  window.addEventListener('load', function listener(event) {
    window.removeEventListener('load', listener, false);
    registerWikiPathwaysPvjsElement();
  }, false);
}
