/// <reference path="../../index.d.ts" />

//import { } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Edge from './Edge';
import Node from './Node';

const components = {
	Edge: Edge,
	Node: Node,
	// NOTE: we don't currently allow nested groups
	//Group: Group,
};

export class Group extends React.Component<any, any> {
  constructor(props) {
		super(props);
		this.state = {...props};
	}

	componentWillReceiveProps(nextProps) {
		let that = this;
		const prevProps = that.props;
		const prevIconsLoaded = prevProps.iconsLoaded;
		const nextIconsLoaded = nextProps.iconsLoaded;
		if (prevIconsLoaded !== nextIconsLoaded) {
			that.setState({iconsLoaded: nextIconsLoaded});
		}
	}

  render() {
		let that = this;
		const { customStyle, elementMap, element, edgeDrawers, icons, iconsLoaded, iconSuffix } = that.state;
		const { backgroundColor, borderWidth, color, drawAs, filter, fillOpacity, height, id, rotation, strokeDasharray, textContent, width, x, y } = element;

		const children = 	element.contains
			.map((containedId) => elementMap[containedId])
			.map(function(contained) {
				// NOTE: notice side effect
				contained.x = contained.x - x;
				contained.y = contained.y - y;
				return contained;
			})
			.map(function(contained) {
				const SubTag = components[contained.pvjsonType];
				return <SubTag key={contained.id} backgroundColor={backgroundColor}
								customStyle={customStyle}
								edgeDrawers={edgeDrawers}
								element={contained}
								elementMap={elementMap}
								icons={icons}
								iconsLoaded={iconsLoaded}
								iconSuffix={iconSuffix}
								/>
			});

		return <Node key={id} backgroundColor={backgroundColor}
						customStyle={customStyle}
						edgeDrawers={edgeDrawers}
						element={element}
						elementMap={elementMap}
						icons={icons}
						iconsLoaded={iconsLoaded}
						iconSuffix={iconSuffix}
						children={children} />;
	}
}

export default Group;
