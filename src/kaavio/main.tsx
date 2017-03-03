import { forOwn } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Diagram from './Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
import { normalize, setupPage } from 'csstips';
 
class Kaavio extends React.Component<any, any> {
  constructor(props) {
		super(props);
		const id = props.id || 'kaavio-container-' + new Date().toISOString();
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

		return <div id={id} width={width} height={height} className={`kaavio-container ${ customStyle.containerClass }`}>
			<Diagram organism={organism}
				id={`kaavio-diagram-for-${id.replace(/\W/g, '')}`}
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
		</div>
	}
}

export default Kaavio;
