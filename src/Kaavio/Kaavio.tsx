import { forOwn } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
		this.state = {
			id: id,
			pvjson: props.pvjson || {
				elements: [],
				organism: '',
				name: '',
				width: 0,
				height: 0,
			},
			customStyle: props.customStyle || '',
			filters: props.filters,
			edgeDrawers: props.edgeDrawers,
			icons: props.icons,
			markerDrawers: props.markerDrawers,
		};

		normalize();
		// TODO doublecheck how to use setupPage
		//setupPage('#root');
		setupPage('#' + id);
    }

	componentWillReceiveProps(nextProps) {
		let that = this;
		const prevProps = that.props;
		forOwn(nextProps, function(prop, key) {
			if (prop && JSON.stringify(prevProps[key]) !== JSON.stringify(prop)) {
				that.setState({
					[key]: prop,
				});
			}
		});
	}

  	render() {
		let that = this;
		const state = that.state;
		const { customStyle, filters, pvjson, id, edgeDrawers, icons, markerDrawers } = state;
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

        const containerStyle = {
            width: width,
            height: height,
            position: 'relative'
        };

		return <div id={id} style={containerStyle} className={`kaavio-container ${ customStyle.containerClass }`}>
			<Diagram
				ref={diagram => this.diagamRef = diagram}
				organism={organism}
				name={name}
				width={width}
				height={height}
				backgroundColor={backgroundColor}
				edgeDrawers={edgeDrawers}
				elementMap={elementMap}
				filters={filters}
				icons={icons}
				markerDrawers={markerDrawers}
				zIndices={zIndices}
				customStyle={customStyle} />
            <PanZoom diagram={this.diagamRef}/>
		</div>
	}
}
