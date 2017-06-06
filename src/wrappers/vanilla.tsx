import { uniq } from 'lodash';
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
export function loadDiagram(selector: string, about: string, opts: Opts, callback?: any): void {
	const props = Object.assign({}, opts, {
		about: 'http://identifiers.org/wikipathways/' + about,
		version: 0,
		customStyle: WikiPathwaysDefaultDisplayStyle,
		showPanZoomControls: true,
		highlightedEntities: [],
		zoomedEntities: [],
		pannedEntities: []
	});
    let container = document.querySelector(selector);
    renderComponent(
        props,
        container,
		() => {
			callback({
				highlightOn: (entityId, color) => {
					props.highlightedEntities = props.highlightedEntities.concat([{entityId, color}]);
					renderComponent(props, container)
				},
				highlightOff: (entityId) => {
					props.highlightedEntities = props.highlightedEntities
						.filter(singleEntity => singleEntity.entityId !== entityId);
					renderComponent(props, container)
				},
				zoomOn: (entityId) => {
					props.zoomedEntities = [entityId];
					props.pannedEntities = [entityId];
					renderComponent(props, container);
				}
			})
		}
    );
}

const renderComponent = (props, container, cb?) => {
	ReactDOM.render(
		<PvjsComponent {...props}/>,
		container,
		cb
	)
};