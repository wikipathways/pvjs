import {isArray, isNaN, isNumber, forOwn} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Edge} from './Edge';
import {Node} from './Node';

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
		this.setState({
			highlightedNodes: nextProps.highlightedNodes
		});
	}

  render() {
		let that = this;
		const { customStyle, entityMap, entity, edgeDrawers, icons, iconsLoaded, iconSuffix, highlightedNodes } = that.state;
		const { backgroundColor, borderWidth, color, drawAs, filter, fillOpacity, height, id, rotation, strokeDasharray, textContent, width, x, y } = entity;
		const children = entity.contains
			.map((containedId) => entityMap[containedId])
			.map(function(contained) {
				const containedKaavioType = contained.kaavioType;

				if (['Node', 'Burr'].indexOf(containedKaavioType) > -1) {
					// Keep a reference to the origin X and Y values in case of a re-render
					if(! contained.origX) {
						contained.origX = contained.x
					}
					if(! contained.origY ){
						contained.origY = contained.y;
					}
					contained.x = contained.origX - x;
					contained.y = contained.origY - y;
				} else if (containedKaavioType === 'Edge') {
					// TODO use gpml2pvjson point definition
					contained.points = contained.points.map(function(point: {x: number, y: number, origX? : number, origY?: number}) {
						// NOTE: notice side effects
						// Keep a reference to the origin X and Y values in case of a re-render
						if(! point.origX) {
							point.origX = contained.x
						}
						if(! point.origY ){
							point.origY = contained.y;
						}

						point.x = point.origX - x;
						point.y = point.origY - y;
						return point;
					});
				} else {
					throw new Error(`Unexpected content (type: "${contained.kaavioType}") in Group "${entity.id}".`)
				}
				return contained;
			})
			// TODO what's up with Citations being drawn like this?
			// Why do they have x and y properties now?
			//.filter(el => el.kaavioType !== 'Citation')
			.map(function(contained) {
				const SubTag = components[contained.kaavioType];
				return <SubTag key={contained.id} backgroundColor={backgroundColor}
								customStyle={customStyle}
								edgeDrawers={edgeDrawers}
								entity={contained}
								entityMap={entityMap}
								icons={icons}
								iconsLoaded={iconsLoaded}
								iconSuffix={iconSuffix}
							    highlightedNodes={highlightedNodes}
								/>
			});

		return <Node backgroundColor={backgroundColor}
						customStyle={customStyle}
						edgeDrawers={edgeDrawers}
						entity={entity}
						entityMap={entityMap}
						icons={icons}
						iconsLoaded={iconsLoaded}
						iconSuffix={iconSuffix}
						children={children}
					 	highlightedNodes={highlightedNodes}
						/>;
	}
}

export default Group;
