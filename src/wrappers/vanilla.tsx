import { defaults } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pvjs from '../Pvjs';

export interface Opts {
	about?: string;
	version?: number;
	src?: string;
	customStyle?: any;
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
 */
export function pvjs(selector: string, about: string, opts: Opts){
		const props = defaults({}, opts, {
			about: about,
			version: 0
		});
    let container = document.querySelector(selector);
    ReactDOM.render(
        <Pvjs {...props} />,
        container
    )
}

declare var window: any;

window.pvjs = pvjs;
