import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Entity} from './Entity';
import Text from './Text';
import * as direction from 'direction';
 
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
		const { children, entity, entityMap, icons, iconsLoaded, iconSuffix, svgId } = state;

		const { backgroundColor, borderWidth, color, drawAs, filter,
						fillOpacity, fontFamily, fontSize, fontStyle, fontWeight, height,
						id, padding, rotation, strokeDasharray, textAlign,
						textContent, type, verticalAlign, width, wpType, x, y } = entity;
		
		let nodeTransform=`translate(${x} ${y})`;
		if (rotation) {
			nodeTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
		}

		const iconProvided = icons.hasOwnProperty(drawAs);
		const icon = icons[drawAs];
		if (!iconProvided) {
			console.warn(`No "${drawAs}" icon provided.`);
		}

		const textDirection = direction(textContent);
		let cssTextAlignToTypeSetter: any = {
			left: 'left',
			center: 'center',
			right: 'right'
		};
		const right = cssTextAlignToTypeSetter.right;
		const left = cssTextAlignToTypeSetter.left;
		cssTextAlignToTypeSetter.start = textDirection === 'rtl' ? right : left;
		cssTextAlignToTypeSetter.end = textDirection === 'rtl' ? left : right;
		const xAlign = cssTextAlignToTypeSetter[textAlign];

		const cssVerticalAlignToTypeSetter = {
			top:  'top',
			middle: 'center',
			bottom: 'bottom'
		};
		const yAlign = cssVerticalAlignToTypeSetter[verticalAlign];
		
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
								x="0px"
								y="0px"
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
								typeof="schema:ImageObject" className="Icon" />
					:
						<rect
								id={`icon-for-${id}`}
								key={`icon-for-${id}`}
								x="0px"
								y="0px"
								width={width + 'px'}
								height={height + 'px'}
								fill={backgroundColor}
								filter={!!filter ? `url(#${filter})` : null}
								stroke={color}
								strokeWidth={borderWidth}
								typeof="schema:ImageObject" className="Icon" />
				:
					<image
							id={`icon-for-${id}`}
							key={`icon-for-${id}`}
							x="0px"
							y="0px"
							width={width + 'px'}
							height={height + 'px'}
							fill={backgroundColor}
							filter={!!filter ? `url(#${filter})` : null}
							stroke={color}
							strokeWidth={borderWidth}
							typeof="schema:ImageObject" className="Icon"
							href="https://upload.wikimedia.org/wikipedia/commons/2/24/Warning_icon.svg" />,

					!!textContent ?	<Text entityId={id}
																key={`react-text-element-for-${id}`}
																className="textlabel"
																textContent={textContent}
																x={padding}
																y={padding}
																width={width}
																height={height}
																xAlign={xAlign}
																yAlign={yAlign}
																padding={padding} />
												:
													null
		].concat(children || [])} />;
	}
}
/*
	 textContent={textContent.slice(0, 8) + '&#10;&#13;\r\n<br>\r1 \r 2a 2b\r3'}
																textContent={textContent.slice(0, 8) + '\n1 \n 2a 2b\n3'}
	see also:
https://en.wikipedia.org/wiki/Newline#Unicode
http://stackoverflow.com/questions/13836352/what-is-the-utf-8-representation-of-end-of-line-in-text-file
 */
