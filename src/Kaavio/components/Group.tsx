import {isArray, isNaN, isNumber} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Edge} from './Edge';
import {Node} from './Node';
import {getHighlighted} from "../utils";

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
		const { customStyle, entityMap, entity, edgeDrawers, icons, iconsLoaded, iconSuffix, highlightedNodes } = that.state;
		const { backgroundColor, borderWidth, color, drawAs, filter, fillOpacity, height, id, rotation, strokeDasharray, textContent, width, x, y } = entity;
	  	const entityHighlighted = getHighlighted(entity, highlightedNodes);

		const children = 	entity.contains
			.map((containedId) => entityMap[containedId])
			.map(function(contained) {
				const containedKaavioType = contained.kaavioType;
				if (['Node', 'Burr'].indexOf(containedKaavioType) > -1) {
					contained.x = contained.x - x;
					contained.y = contained.y - y;
				} else if (containedKaavioType === 'Edge') {
					// TODO use gpml2pvjson point definition
					contained.points = contained.points.map(function(point: {x: number, y: number}) {
						// NOTE: notice side effects
						point.x = point.x - x;
						point.y = point.y - y;
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
				const highlighted = getHighlighted(contained, highlightedNodes);
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
							    isHighlighted={highlighted.highlighted} highlightedColor={highlighted.color}
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
					    isHighlighted={entityHighlighted.highlighted} highlightedColor={entityHighlighted.color}
						/>;
	}
}

export default Group;
