/// <reference path="../../../index.d.ts" />

import {Node} from './Node';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';

export class Entity extends React.Component<any, any> {
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

		// Check if the children have changed
		// This is inefficient since not all the children may have changed. Why is there an entity wrapper?
		// TODO: Refactor the entity to make children updates more efficient

		const nextChildren = nextProps.children;
		const prevChildren = prevProps.children;

		const diffArr = _.difference(prevChildren, nextChildren);

		if(diffArr.length > 0 ){
			that.setState({
				children: nextChildren
			})
		}
	}

	render() {
		let that = this;
		const state = that.state;
		const { about, children, customStyle, edgeDrawers, entity, entityMap, icons, iconsLoaded, iconSuffix, svgId, organism } = state;
		const { burrs, backgroundColor, borderWidth, color, drawAs, filter,
			fillOpacity, fontFamily, fontSize, fontStyle, fontWeight, height,
			id, padding, points, rotation, strokeDasharray, textAlign,
			textContent, type, verticalAlign, width, wpType, x, y, kaavioType } = entity;

		let entityTransform;
		if (x || y || rotation) {
			entityTransform = `translate(${entity.x} ${entity.y})`;
			if (rotation) {
				entityTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
			}
		}

		const className = customStyle ? type.concat(
			type.reduce(function(acc, t) {
				const thisStyle = customStyle[t + 'Class'];
				if (thisStyle) {
					acc.push(thisStyle);
				}
				return acc;
			}, [])
		)
			.join(' ') : null;

		return <g id={id}
				  key={id}
				  className={className}
				  typeof={entity.type.join(' ')}
				  color={color}
				  transform={entityTransform}>
			{
				/*
				 // TODO it would be nice to add the attribute resource to the 'g' element above,
				 // but it is WikiPathways-specific, and Kaavio should be generic. How can we handle this?
				 resource={`identifiers:wikipathways/WP554/${id}`}

				 // TODO Similar to the issue as for the 'resource' attribute described above,
				 // how can we add these rdfa items below in a generic fashion?
				 <g property="rdfa:copy" href={wpType}></g>
				 <g property="biopax:entityReference" content="identifiers:ec-code/3.6.3.14"></g>
				 */
			}

			{
				children
			}

			{
				(burrs || [])
					.map((burrId) => entityMap[burrId])
					.map(function(burr) {
						// NOTE: notice side effect
						burr.width += 0;
						burr.height += 0;
						const attachmentDisplay = burr.attachmentDisplay;
						const position = attachmentDisplay.position;
						const offset = attachmentDisplay.hasOwnProperty('offset') ? attachmentDisplay.offset : [0, 0];

						// kaavioType is referring to the entity the burr is attached to
						if (['Node', 'Group'].indexOf(kaavioType) > -1) {
							burr.x = width * position[0] - burr.width / 2 + offset[0];
							burr.y = height * position[1] - burr.height / 2 + offset[1];
						} else if (kaavioType === 'Edge') {
							// TODO get edge logic working so we can position this better
							// TODO look at current production pvjs to see how this is done
							const positionXY = edgeDrawers[entity.drawAs].getPointAtPosition(points, position[0]);
							burr.x = positionXY.x - burr.width / 2 + offset[0];
							burr.y = positionXY.y - burr.height / 2 + offset[1];
						} else {
							throw new Error(`Cannot handle burr with parent of type ${kaavioType}`)
						}

						return burr;
					})
					.map(function(burr) {
						return <Node key={burr.id} backgroundColor={backgroundColor}
									 customStyle={customStyle}
									 entity={burr}
									 entityMap={entityMap}
									 icons={icons}
									 iconsLoaded={iconsLoaded}
									 iconSuffix={iconSuffix} />;
					})
			}

			{/*
			 // TODO it would be nice to add the attribute resource to the 'g' entity above,
			 // but it is WikiPathways-specific, and Kaavio should be generic. How can we handle this?
			 resource={`identifiers:wikipathways/WP554/${id}`}

			 // TODO Similar to the issue as for the 'resource' attribute described above,
			 // how can we add these rdfa items below in a generic fashion?
			 <g property="rdfa:copy" href={wpType}></g>
			 <g property="biopax:entityReference" content="identifiers:ec-code/3.6.3.14"></g>
			 */}

		</g>
	}
}
