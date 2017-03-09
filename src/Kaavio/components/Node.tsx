import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Entity} from './Entity';
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
		this.state = {
			...props
		};
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
		const { children, entity, entityMap, icons, iconsLoaded, iconSuffix, svgId, isHighlighted, highlightedColor } = state;

		const { backgroundColor, borderWidth, color, drawAs, filter,
						fillOpacity, fontFamily, fontSize, fontStyle, fontWeight, height,
						id, padding, rotation, strokeDasharray, textAlign,
						textContent, type, verticalAlign, width, wpType, x, y } = entity;
		
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
		
		let nodeTransform=`translate(${entity.x} ${entity.y})`;
		if (rotation) {
			nodeTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
		}

		const iconProvided = icons.hasOwnProperty(drawAs);
		const icon = icons[drawAs];
		if (!iconProvided) {
			console.warn(`No "${drawAs}" icon provided.`);
		}

		return <Entity {...state} children={[
				// NOTE: we can pull the externally referenced SVGs in using either
				// the SVG 'image' element or the SVG 'use' element. The 'use' element
				// is better, because it allows for more control over styling.
				// If the source image is not available, we can fall back to a simple
				// rectangle.
				// NOTE 'stroke' for the icon is analogous to the CSS property 'color' when
				// referring to the border color of an HTML div.
				iconProvided ?
					iconsLoaded ?
						// see https://css-tricks.com/svg-use-with-external-reference-take-2/
						<use
								id={`icon-for-${id}`}
								key={`icon-for-${id}`}
								x="0"
								y="0"
								width={width + 'px'}
								height={height + 'px'}
								href={'#' + icon.id + iconSuffix}
								fill={isHighlighted? highlightedColor: backgroundColor}
								filter={!!filter ? `url(#${filter})` : null}
								// TODO does specifying stroke for a 'use' element do anything?
								// If an the referenced element is using stroke="currentColor",
								// I think the 'color' property might overrule this stroke property.
								stroke={color}
								strokeWidth={borderWidth}
								typeof="schema:ImageObject" className="Icon"/>
					:
						<rect
								id={`icon-for-${id}`}
								key={`icon-for-${id}`}
								x="0"
								y="0"
								width={width + 'px'}
								height={height + 'px'}
								fill={backgroundColor}
								filter={!!filter ? `url(#${filter})` : null}
								stroke={color}
								strokeWidth={borderWidth}
								typeof="schema:ImageObject" className="Icon"/>
				:
					<image
							id={`icon-for-${id}`}
							key={`icon-for-${id}`}
							x="0"
							y="0"
							width={width + 'px'}
							height={height + 'px'}
							fill={backgroundColor}
							filter={!!filter ? `url(#${filter})` : null}
							stroke={color}
							strokeWidth={borderWidth}
							typeof="schema:ImageObject" className="Icon"
							href="https://upload.wikimedia.org/wikipedia/commons/2/24/Warning_icon.svg" />,

					!!textContent ?	<Text id={`text-for-${id}`}
																key={`text-for-${id}`}
																svgId={svgId}
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
		].concat(children || [])} />;
	}
}
