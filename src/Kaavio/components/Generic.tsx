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
						id, padding, rotation, strokeDasharray, textAlign,
						textContent, type, verticalAlign, width, wpType, x, y } = element;
		

		let nodeTransform;
		if (x || y || rotation) {
			nodeTransform = `translate(${element.x} ${element.y})`;
			if (rotation) {
				nodeTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
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
				typeof={element.type.join(' ')}
				color={color}
				transform={nodeTransform}>
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
					<text key={`citation-for-${element.id}`} className="citation" transform={`translate(${ element.width + 5 } 0)`}>{
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
