/// <reference path="../../../index.d.ts" />

import {Node} from './Node';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class Generic extends React.Component<any, any> {
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
		const state = that.state;
		const { about, children, customStyle, edgeDrawers, element, elementMap, icons, iconsLoaded, iconSuffix, svgId, organism } = state;
		const { burrs, backgroundColor, borderWidth, color, drawAs, filter,
						fillOpacity, fontFamily, fontSize, fontStyle, fontWeight, height,
						id, padding, points, rotation, strokeDasharray, textAlign,
						textContent, type, verticalAlign, width, wpType, x, y } = element;

		let entityTransform;
		if (x || y || rotation) {
			entityTransform = `translate(${element.x} ${element.y})`;
			if (rotation) {
				entityTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
			}
		}

		let citationTransform;
		if (x && y) {
			citationTransform = `translate(${ element.width + 5 } -5)`;
		} else if (points) {
			// TODO get edge logic working so we can position this better
			// TODO look at current production pvjs to see how this is done
			const startPoint = points[0];
			const startX = startPoint.x;
			const startY = startPoint.y;
			const endPoint = points[points.length - 1];
			const endX = endPoint.x;
			const endY = endPoint.y;
			const displacementX = endX - startX;
			const displacementY = endY - startY;
			const citationX = startX + 5 * (1 + (displacementX === 0 ? 0 : displacementX / Math.abs(displacementX)));
			const citationY = startY + 5 * (1 + (displacementY === 0 ? 0 : displacementY / Math.abs(displacementY)));
			citationTransform = `translate(${citationX} ${citationY})`;
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
				typeof={element.type.join(' ')}
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
					.map((burrId) => elementMap[burrId])
					.map(function(burr) {
						// NOTE: notice side effect
						burr.width += 0;
						burr.height += 0;
						burr.x = width * burr.attachmentDisplay.position[0] - burr.width / 2;
						burr.y = height * burr.attachmentDisplay.position[1] - burr.height / 2;
						return burr;
					})
					.map(function(burr) {
						return <Node key={burr.id} backgroundColor={backgroundColor}
										customStyle={customStyle}
										element={burr}
										elementMap={elementMap}
										icons={icons}
										iconsLoaded={iconsLoaded}
										iconSuffix={iconSuffix} />;
					})
			}

			{
				element.citation ?
					<text key={`citation-for-${element.id}`} className={customStyle.citationClass} transform={citationTransform}>{
						element.citation
							.map((citationId) => elementMap[citationId].textContent)
							.sort()
							.join(',')
					}</text>
				:
					null
//				/* TODO include the RDFa content while not overlapping the citation numbers
//				(element.citation || [])
//					.map((citationId) => elementMap[citationId])
//					.map(function(citation) {
//						return <text className="citation"
//								key={element.id + citation.id}
//								// TODO this is pvjs specific. kaavio should only contain diagram logic, not pvjs logic.
//								content={`identifiers:pubmed/${citation.dbId}`}
//								transform={`translate(${ element.width + 5 } 0)`}>{citation.textContent}</text>
//					})
//				//*/
			}

			{/*
				// TODO it would be nice to add the attribute resource to the 'g' element above,
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
