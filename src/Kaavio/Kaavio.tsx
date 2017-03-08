import {forOwn} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
<<<<<<< HEAD:src/Kaavio/Kaavio.tsx
import {Diagram} from './Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./Kaavio.css');
import { normalize, setupPage } from 'csstips';
import {PanZoom} from './PanZoom/PanZoom'
 
export class Kaavio extends React.Component<any, any> {
  	diagamRef: any; //Reference to the diagram node

    constructor(props) {
		super(props);
		const id = props.id || 'Kaavio-container-' + new Date().toISOString();
=======
import {Diagram} from './components/Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
import {normalize, setupPage} from 'csstips';
 
export class Kaavio extends React.Component<any, any> {
  constructor(props) {
		super(props);
		const about = (props.about || 'kaavio-container-' + new Date().toISOString()).replace(/\W/g, '');
>>>>>>> bd6bf6f8b5551ba02504a63326aa69690c06788d:src/Kaavio/Kaavio.tsx
		this.state = {
			about: about,
			pvjson: props.pvjson || {
				elements: [],
				organism: '',
				name: '',
				width: 0,
				height: 0,
			},
			customStyle: props.customStyle || '',
			filters: props.filters,
			handleClick: props.handleClick,
			edgeDrawers: props.edgeDrawers,
			icons: props.icons,
			markerDrawers: props.markerDrawers,
		};

		normalize();
		// TODO doublecheck how to use setupPage
<<<<<<< HEAD:src/Kaavio/Kaavio.tsx
		//setupPage('#root');
		setupPage('#' + id);
    }
=======
		setupPage('#' + about);
  }
>>>>>>> bd6bf6f8b5551ba02504a63326aa69690c06788d:src/Kaavio/Kaavio.tsx

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
		const { about, customStyle, filters, handleClick, pvjson, edgeDrawers, icons, markerDrawers } = state;
		const { elements, organism, name, width, height } = pvjson;
		const backgroundColor = customStyle.backgroundColor || pvjson.backgroundColor || 'white';

		const elementMap = elements.reduce(function(acc, element) {
			acc[element.id] = element;
			return acc;
		}, {});

		const zIndices = elements
			.sort(function(a: any, b: any) {
				if (a.zIndex > b.zIndex) {
					return 1;
				} else if (a.zIndex < b.zIndex) {
					return -1;
				} else {
					return 0;
				}
			})
			.map((element) => element.id);

<<<<<<< HEAD:src/Kaavio/Kaavio.tsx
        const containerStyle = {
            width: width,
            height: height,
            position: 'relative'
        };

		return <div id={id} style={containerStyle} className={`kaavio-container ${ customStyle.containerClass }`}>
			<Diagram
				ref={diagram => this.diagamRef = diagram}
				organism={organism}
=======
		return <div id={about} width={width} height={height} className={`kaavio-container ${ customStyle.containerClass }`}>
			<Diagram organism={organism}
				about={`kaavio-diagram-for-${about}`}
>>>>>>> bd6bf6f8b5551ba02504a63326aa69690c06788d:src/Kaavio/Kaavio.tsx
				name={name}
				width={width}
				height={height}
				backgroundColor={backgroundColor}
				edgeDrawers={edgeDrawers}
				elementMap={elementMap}
				filters={filters}
				handleClick={handleClick}
				icons={icons}
				markerDrawers={markerDrawers}
				zIndices={zIndices}
				customStyle={customStyle} />
            <PanZoom diagram={this.diagamRef}/>
		</div>
	}
}
