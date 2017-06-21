import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Pvjs as PvjsComponent} from '../Pvjs'; // Fix conflicting imports/exports
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';
import { Manipulator } from '../manipulator';
import { curryRight, defaults } from 'lodash';

/**
 * Simple wrapper around the Pvjs react component.
 * Use this function to call Pvjs
 * @param selector: DOM Selector for the container in which to render the diagram
 * @param wpId: The WikiPathways ID. E.g. WP4
 * @param [opts]
 * @param [opts.version=0]: Pathways at WikiPathways are versioned, e.g., WP1 has version 73346.
 * 													Version 0 mean latest.
 * @param [opts.src]: if pvjson for pathway cannot be obtained from about, give a
 * 						     	  URL where the pvjson for the pathway can be obtained.
 * @param [opts.customStyle]
 * @param [opts.onEntityClick] called with the entity that has been clicked
 * @param [callback]: The callback to call with the reference to the Pvjs instance
 */
export function loadDiagram(selector: string, wpId: string, opts: any, callback?: any): void {
	const props = defaults(opts, {
		wpId,
		version: 0,
		customStyle: WikiPathwaysDefaultDisplayStyle,
		showPanZoomControls: true,
		highlightedEntities: [],
		zoomedEntities: [],
		pannedEntities: []
	});
    const container = document.querySelector(selector);
    renderComponent(
        props,
        container,
		(entities) => {
        	const reRender = curryRight(renderComponent as (t1: any) => any)(null)(container);
        	if (callback) {
				callback({
					entities,
					manipulator: new Manipulator(reRender, props)
				})
			}
		}
    );
}

const renderComponent = (props, container, cb?) => {
	if(cb) {
		props.onReady = cb;
	}

	ReactDOM.render(
		<PvjsComponent {...props} />,
		container
	);
};