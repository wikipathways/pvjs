import {forOwn} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Diagram} from './components/Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
import {normalize, setupPage} from 'csstips';
import {PanZoom} from "./PanZoom/PanZoom";
import {Manipulator} from './manipulator';
import {BehaviorSubject, Observable} from "rxjs";

// pullAllWith is missing from the lodash typings so just require for now
// See issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13747
// TODO: Track the issue and go back to import * as _ from 'lodash'
const _ = require('lodash');

export interface highlightedNode {
	node_id: string,
	color: string; // CSS color. E.g. 'red' or '#ffff'
}

export class Kaavio extends React.Component<any, any> {
	// Observable for other components/services to listen to to check kaavio is ready
	private kaavioReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
	panZoomEnabled$: Observable<boolean> = this.kaavioReady.asObservable(); // TODO: Name this correctly kaavioReady$

	diagramRef: any;
	panZoomRef: any;
	manipulator: Manipulator;
	private highlightedNodes: highlightedNode[] = []; // A stack of the highlighted nodes that is pushed and popped

	constructor(props) {
		super(props);
		const about = (props.about || 'kaavio-container-' + new Date().toISOString()).replace(/\W/g, '');
		this.state = {
			about: about,
			backgroundColor: 'white',
			entities: [],
			name: '',
			width: 0,
			height: 0,
			customStyle: props.customStyle || '',
			filters: props.filters,
			handleClick: props.handleClick,
			edgeDrawers: props.edgeDrawers,
			icons: props.icons,
			markerDrawers: props.markerDrawers,
			highlightedNodes: []
		};

		normalize();
		// TODO doublecheck how to use setupPage
		setupPage('#' + about);
	}

	componentWillReceiveProps(nextProps) {
		let that = this;
		const prevProps = that.props;
		forOwn(nextProps, function(prop, key) {
			if (key === 'filters') {
				that.setState({
					[key]: prop,
				});
			} else if (prop && JSON.stringify(prevProps[key]) !== JSON.stringify(prop)) {
				that.setState({
					[key]: prop,
				});
			}
		});
	}

	componentDidUpdate(prevProps, prevState){
		this.panZoomRef.panZoomEnabled.subscribe(res => {
			if(res) this.kaavioReady.next(true);
		});
		this.setupManipulator();
	}

	private setupManipulator(): void {
		if(this.manipulator) this.manipulator = null;
		this.manipulator = new Manipulator(this, this.panZoomRef);
	}

	pushHighlighted = (highlighted: highlightedNode | highlightedNode[]) =>  {
		let toHighlight;
		if(highlighted.constructor !== Array){
			toHighlight = [highlighted];
		}
		else {
			toHighlight = highlighted;
		}
		// Remove any items from the current highlightedNodes array with the same node_id
		_.pullAllWith(this.highlightedNodes, toHighlight, (arrVal, othVal) => {
			return arrVal.node_id == othVal.node_id;
		});

		this.highlightedNodes = this.highlightedNodes.concat(toHighlight);
		this.setState({
			highlightedNodes: this.highlightedNodes
		});
	};

	popHighlighted(node_id: string | string[]): void {
		let toRemove;
		if(typeof node_id === 'string'){
			toRemove = [node_id]
		}
		else {
			toRemove = node_id;
		}

		// Remove any items from the current highlightedNodes array with the same node_id
		_.pullAllWith(this.highlightedNodes, toRemove, (arrVal, othVal) => {
			return arrVal.node_id == othVal;
		});
		this.setState({highlightedNodes: this.highlightedNodes});

	}

	render() {
		let that = this;
		const state = that.state;
		const { about, customStyle, filters, handleClick, entities, name, width, height, edgeDrawers, icons, markerDrawers, highlightedNodes } = state;
		const backgroundColor = customStyle.backgroundColor || state.backgroundColor;

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

		return <div id={about} width={width} height={height} className={`kaavio-container ${ customStyle.containerClass }`}>
			<Diagram
				ref={diagram => this.diagramRef = diagram}
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
			/>
			<PanZoom ref={panZoom => this.panZoomRef = panZoom} diagram={this.diagramRef} />
		</div>
	}
}
