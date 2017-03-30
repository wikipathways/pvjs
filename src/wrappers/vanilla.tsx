import { defaults } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Pvjs as PvjsComponent} from '../Pvjs'; // Fix conflicting imports/exports
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';

export interface Opts {
	about?: string;
	version?: number;
	src?: string;
	customStyle?: any;
	showPanZoomControls?: boolean;
}

/**
 * Simple wrapper around the Pvjs react component.
 * Use this function to call Pvjs
 * @param selector: DOM Selector for the container in which to render the diagram
 * @param about: unique identifier for the pathway
 * @param [opts]
 * @param [opts.version=0]: Pathways at WikiPathways are versioned, e.g., WP1 has version 73346.
 * 													Version 0 mean latest.
 * @param [opts.src]: if pvjson for pathway cannot be obtained from about, give a
 * 						     	  URL where the pvjson for the pathway can be obtained.
 * @param [opts.customStyle]
 * @param [callback]: The callback to call with the reference to the Pvjs instance
 */
export function Pvjs(selector: string, about: string, opts: Opts, callback?: any): void {
	let ref = null;
	const props = defaults({}, opts, {
		about: 'http://identifiers.org/wikipathways/' + about,
		version: 0,
		customStyle: WikiPathwaysDefaultDisplayStyle,
		showPanZoomControls: true
	});
    let container = document.querySelector(selector);
    ReactDOM.render(
        <PvjsComponent {...props} ref={pvjs => ref = pvjs}/>,
        container,
		(_) => {
			callback(ref)
		}
    );
}
