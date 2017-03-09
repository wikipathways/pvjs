import {forOwn} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Diagram} from './components/Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
import {normalize, setupPage} from 'csstips';
 
export class Kaavio extends React.Component<any, any> {
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

  render() {
		let that = this;
		const state = that.state;
		const { about, customStyle, filters, handleClick, entities, name, width, height, edgeDrawers, icons, markerDrawers } = state;
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
				customStyle={customStyle} />
		</div>
	}
}
