import * as React from 'react';
import {Diagram} from './components/Diagram';
import {PanZoom} from './components/PanZoom';

/**
 * Kaavio component.
 * This is the highest component in Kaavio. All states are handled here and passed down as props to other components.
 *
 * You may pass an onReady(kaavio) function to this. This will be called with the Kaavio reference when everything is
 * rendered. You can access the manipulation API via kaavio.manipulator
 */
export class Kaavio extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {
			diagramRef: null,
		};
	}

	onPanZoomReady = (panZoom) => {
		// Fire the onReady function with a reference to Kaavio
		const {onReady} = this.props;
		onReady(this);
	};

	render() {
		const {customStyle, filters, handleClick, entities, name, width, height, edgeDrawers, icons,
			markerDrawers, highlightedEntities, hiddenEntities, zoomedEntities, pannedEntities,
			showPanZoomControls = true} = this.props;

		console.log(this.props);

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
				{/* highlightedNodes is legacy. TODO: All references of highlightedNodes -> highlightedEntities */}
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
					highlightedNodes={highlightedEntities}
					hiddenEntities={hiddenEntities}
				/>
				<PanZoom diagram={this.state.diagramRef}
						 zoomedEntities={zoomedEntities}
						 pannedEntities={pannedEntities}
						 onReady={this.onPanZoomReady}
						 showPanZoomControls={showPanZoomControls} />
			</div>
		)
	}
}
