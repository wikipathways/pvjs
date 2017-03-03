/// <reference path="../../index.d.ts" />

//import { } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Text from './Text';

const textAlignToAlign = {
	left: 'left',
	center: 'center',
	right: 'left',
	start: 'left',
	end: 'right',
};

export class Node extends React.Component<any, any> {
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
		const { children, customStyle, element, elementMap, icons, iconsLoaded, iconSuffix, svgId } = state;

		const { burrs, backgroundColor, borderWidth, color, drawAs, filter,
						fillOpacity, fontFamily, fontSize, fontStyle, fontWeight, height,
						id, padding, rotation, strokeDasharray, textAlign,
						textContent, type, verticalAlign, width, wpType, x, y } = element;
		
		const alignSvgText = textAlignToAlign[textAlign];
		const alignSvgTextToXSvgText = {
			left: 0,
			center: width / 2,
			right: width,
		};
		const xSvgText = alignSvgTextToXSvgText[alignSvgText];

		const verticalAlignToYSvgText = {
			top: 0,
			middle: height / 2,
			bottom: height,
		};
		const ySvgText = verticalAlignToYSvgText[verticalAlign];
		
		let nodeTransform=`translate(${element.x} ${element.y})`;
		if (rotation) {
			nodeTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
		}

		const className = type.concat(
				type.reduce(function(acc, t) {
					const thisStyle = customStyle[t + 'Class'];
					if (thisStyle) {
						acc.push(thisStyle);
					}
					return acc;
				}, [])
		)
		.join(' ');

		const icon = icons[drawAs];
		if (!icon) {
			console.warn(`Missing icon for ${drawAs}`);
		}

		return <g id={id}
			className={className}
			color={color}
			transform={nodeTransform}>
			{/*
				// TODO it would be nice to add the attribute resource to the 'g' element above,
				// but it is WikiPathways-specific, and Kaavio should be generic. How can we handle this?
				resource={`identifiers:wikipathways/WP554/${id}`}

				// TODO Similar to the issue as for the 'resource' attribute described above,
				// how can we add these rdfa items below in a generic fashion?
				<g property="rdfa:copy" href={wpType}></g>
				<g property="biopax:entityReference" content="identifiers:ec-code/3.6.3.14"></g>
			*/}
			{/*
					<rect
							height={element.height + 'px'}
							fill="yellow"
							filter={!!filter ? `url(#${filter})` : null}
							stroke="red"
							strokeWidth={borderWidth}
							typeof="schema:ImageObject" className="Icon"
							width={element.width + 'px'}
							style={{fillOpacity: 0.1}}
							x="0"
							y="0">
					</rect>
			*/}
			{
				// NOTE: we can pull the externally referenced SVGs in using either
				// the SVG 'image' element or the SVG 'use' element. The 'use' element
				// is better, because it allows for more control over styling.
				// If the source image is not available, we can fall back to a simple
				// rectangle.
				// NOTE 'stroke' for the icon is analogous to the CSS property 'color' when
				// referring to the border color of an HTML div.
				iconsLoaded ?
					// see https://css-tricks.com/svg-use-with-external-reference-take-2/
					<use
							x="0"
							y="0"
							width={width + 'px'}
							height={height + 'px'}
							href={'#' + icon.id + iconSuffix}
							fill={backgroundColor}
							filter={!!filter ? `url(#${filter})` : null}
							// TODO does specifying stroke for a 'use' element do anything?
							// If an the referenced element is using stroke="currentColor",
							// I think the 'color' property might overrule this stroke property.
							stroke={color}
							strokeWidth={borderWidth}
							typeof="schema:ImageObject" className="Icon"/>
				:
					<rect
							x="0"
							y="0"
							width={width + 'px'}
							height={height + 'px'}
							fill={backgroundColor}
							filter={!!filter ? `url(#${filter})` : null}
							stroke={color}
							strokeWidth={borderWidth}
							typeof="schema:ImageObject" className="Icon"/>
			}
			{
				!!textContent ?	<Text id={`text-for-${id}`}
															svgId={svgId}
															key={`text-for-${id}`}
															textOverflow="clip"
															x={xSvgText}
															y={ySvgText}
															// TODO what should these be?
															outerWidth={width + padding}
															outerHeight={height + padding}
															align={alignSvgText}
															verticalAlign={verticalAlign}
															className="textlabel"
															attrs={{
																fill: 'currentColor',
																fontFamily: fontFamily,
																fontSize: fontSize,
																fontStyle: fontStyle,
																fontWeight: fontWeight
															}}
															padding={padding}
															text={textContent}/> : null
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
										iconSuffix={iconSuffix}
										/>;
					})
			}

			{
				element.citation ?
					<text className="citation" transform={`translate(${ element.width + 5 } 0)`}>{
						element.citation
							.map((citationId) => elementMap[citationId].textContent)
							.sort()
							.join(',')
					}</text>
				:
					null
				/* TODO include the RDFa content while not overlapping the citation numbers
				(element.citation || [])
					.map((citationId) => elementMap[citationId])
					.map(function(citation) {
						return <text className="citation"
								key={element.id + citation.id}
								// TODO this is pvjs specific. kaavio should only contain diagram logic, not pvjs logic.
								content={`identifiers:pubmed/${citation.dbId}`}
								transform={`translate(${ element.width + 5 } 0)`}>{citation.textContent}</text>
					})
				//*/
			}
			{
				children
			}
		</g>
	}
}

export default Node;
