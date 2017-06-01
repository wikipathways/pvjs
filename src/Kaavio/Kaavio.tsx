import {forOwn} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Diagram} from './components/Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
import {PanZoom} from "./components/PanZoom";
import {Manipulator} from './manipulator';

// pullAllWith is missing from the lodash typings so just require for now
// See issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13747
// TODO: Track the issue and go back to import * as _ from 'lodash'
const _ = require('lodash');

export interface highlightedNode {
	node_id: string,
	color: string; // CSS color. E.g. 'red' or '#ffff'
}

/**
 * Kaavio component.
 * This is the highest component in Kaavio. All states are handled here and passed down as props to other components.
 *
 * You may pass an onReady(kaavio) function to this. This will be called with the Kaavio reference when everything is
 * rendered. You can access the manipulation API via kaavio.manipulator
 */
export class Kaavio extends React.Component<any, any> {
	manipulator: Manipulator;

	constructor(props) {
		super(props);
		this.state = {
			diagramRef: null,
			highlightedNodes: [], // A stack of the highlighted nodes that is pushed and popped
			hiddenEntities: [], // A stack of hidden entities that is pushed and popped
		};
	}

	private onPanZoomReady(panZoom){
		const {diagramRef} = this.state;
		if(! diagramRef) return;
		this.manipulator = new Manipulator(this, panZoom, diagramRef);

		// Fire the onReady function with a reference to Kaavio
		const {onReady} = this.props;
		onReady(this);
	}

	pushHighlighted = (highlighted: highlightedNode | highlightedNode[]) =>  {
		let toHighlight;
		if(highlighted.constructor !== Array){
			toHighlight = [highlighted];
		}
		else {
			toHighlight = highlighted;
		}

		this.setState((prevState) => {
			// Remove same elements so the entity is highlighted with the newly specified color
			const differences = _.differenceWith(prevState.highlightedNodes, toHighlight, (arrVal, othVal) => {
				return arrVal.node_id == othVal.node_id;
			});
			return { highlightedNodes: differences.concat(toHighlight)}
		});
	};

	popHighlighted = (node_id: string | string[]) => {
		let toRemove;
		if(typeof node_id === 'string'){
			toRemove = [node_id]
		}
		else {
			toRemove = node_id;
		}
		const {highlightedNodes} = this.state;

		// Remove any items from the current highlightedNodes array with the same node_id
		_.pullAllWith(highlightedNodes, toRemove, (arrVal, othVal) => {
			return arrVal.node_id == othVal;
		});
		this.setState({highlightedNodes: highlightedNodes});

		this.setState((prevState) => {
			const removed = _.difference(prevState.highlightedNodes, toRemove);
			return {hiddenEntities: removed}
		});
	};

	resetHighlighted = (exclude?: string[]) => {
		const {highlightedNodes} = this.state;
		let toReset = highlightedNodes.map(highlightedNode => {
			return highlightedNode.node_id;
		});
		if(exclude){
			toReset = _.pullAll(toReset, exclude);
		}
		this.popHighlighted(toReset)
	};

	isHighlighted = (node_id: string) => {
		const {highlightedNodes} = this.state;
		return !!highlightedNodes.find(elem => {
			return elem.node_id === node_id;
		});
	};

	pushHidden = (entity_id: string | string[]) => {
		let toHide;
		if(entity_id.constructor !== Array){
			toHide = [entity_id];
		}
		else {
			toHide = entity_id;
		}

		this.setState((prevState) => {
			// Remove same elements so the entity is highlighted with the newly specified color
			const differences = _.differenceWith(prevState.hiddenEntities, toHide, (arrVal, othVal) => {
				return arrVal == othVal;
			});
			return { hiddenEntities: differences.concat(toHide)}
		});
	};

	popHidden = (entity_id: string | string[]) => {
		let toRemove;
		if(typeof entity_id === 'string'){
			toRemove = [entity_id]
		}
		else {
			toRemove = entity_id;
		}

		this.setState((prevState) => {
			const removed = _.difference(prevState.hiddenEntities, toRemove);
			return {hiddenEntities: removed}
		});
	};

	resetHidden = (exclude?: string[]) => {
		const {hiddenEntities} = this.state;

		let toReset = hiddenEntities;
		if(exclude){
			toReset = _.pullAll(toReset, exclude);
		}
		this.popHidden(toReset)
	};

	isHidden = (entity_id: string) => {
		const {hiddenEntities} = this.state;
		return hiddenEntities.indexOf(entity_id) > -1;
	};

	getEntities = () => {
		return this.props.entities;
	};

	render() {
		const {customStyle, filters, handleClick, entities, name, width, height, edgeDrawers, icons,
			markerDrawers, showPanZoomControls = true} = this.props;
		const {highlightedNodes , hiddenEntities} = this.state;

		const backgroundColor = customStyle.backgroundColor || 'white' ;
		let {about} = this.props;
		about = about || ('kaavio-container-' + new Date().toISOString()).replace(/\W/g, '');

		const entityMap = entities.reduce(function(acc, entity) {
			acc[entity.id] = entity;
			return acc;
		}, {});

		const zIndices = entities
			.sort(function(a: any, b: any) {
				if (a.zIndex > b.zIndex) {
					return 1;
				} else if (a.zIndex < b.zIndex) {
					return -1;
				} else {
					return 0;
				}
			})
			.map((entity) => entity.id);

		// TODO: Don't use refs!
		// Accessing the diagram ref from the state is a little bit of a hack to get panZoom working.
		// Consider refactoring the panZoom to be truly Reactive and not use refs
		return (
			<div id={about} className={`kaavio-container ${ customStyle.containerClass }`}>
				<Diagram
					ref={diagram => !this.state.diagramRef && this.setState({diagramRef: diagram})}
					about={`kaavio-diagram-for-${about}`}
					name={name}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					edgeDrawers={edgeDrawers}
					entityMap={entityMap}
					filters={filters}
					handleClick={handleClick}
					icons={icons}
					markerDrawers={markerDrawers}
					zIndices={zIndices}
					customStyle={customStyle}
					highlightedNodes={highlightedNodes}
					hiddenEntities={hiddenEntities}
				/>
				<PanZoom diagram={this.state.diagramRef} onReady={panZoom => this.onPanZoomReady(panZoom)}
						 showPanZoomControls={showPanZoomControls} />
			</div>
		)
	}
}
