import { groupBy, intersection, keys, forOwn, toPairs, uniq, values } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/** Import */
import { style } from 'typestyle';
import { normalize, setupPage } from "csstips";

import { Observable } from 'rxjs/Observable';
import { AjaxRequest } from  'rxjs/observable/dom/AjaxObservable';
import 'rxjs/add/observable/dom/ajax';

import 'rxjs/add/observable/from';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

normalize();
setupPage('#root');

// Based on the list from here: https://www.w3.org/TR/SVG/painting.html#MarkerProperties
// but in camel case to match React inputs.
export type MarkerPropertyName = 'markerStart' | 'markerEnd' | 'markerMid' | 'marker';
const MARKER_PROPERTY_NAMES: ReadonlyArray<MarkerPropertyName> = ['markerStart', 'markerMid', 'markerEnd', 'marker'];

export interface MarkerComponentProps {
	backgroundColor: string;
	color: string;
	markerDrawers: Function;
	markerLocationType: MarkerPropertyName;
	markerName: NonFuncIriMarkerPropertyValue & string;
}

export type NonFuncIriMarkerPropertyValue = 'none' | 'inherit';
const NON_FUNC_IRI_MARKER_PROPERTY_VALUES: ReadonlyArray<NonFuncIriMarkerPropertyValue> = ['none', 'inherit'];

function getMarkerId(
		markerLocationType: MarkerPropertyName,
		markerName: string,
		color: string,
		backgroundColor: string
): string {
	return [markerLocationType, markerName, color, backgroundColor]
		.join('-')
		// we only want alphanumeric values and dashes in the id
		.replace(/[^A-Za-z0-9-]/g, '');
}

function getMarkerPropertyValue(
		markerLocationType: MarkerPropertyName,
		markerName: NonFuncIriMarkerPropertyValue & string,
		color: string,
		backgroundColor: string
): NonFuncIriMarkerPropertyValue | string {
	// Don't make a funciri out of any of the names in NON_FUNC_IRI_MARKER_PROPERTY_VALUES
	if (NON_FUNC_IRI_MARKER_PROPERTY_VALUES.indexOf(markerName) > -1) {
		return markerName;
	}
	return `url(#${getMarkerId(markerLocationType, markerName, color, backgroundColor)})`;
}

class Marker extends React.Component<any, any> {
  constructor(props: MarkerComponentProps) {
		super(props);
		this.state = {
			markerName: props.markerName,
			color: props.color,
			backgroundColor: props.backgroundColor,
			markerLocationType: props.markerLocationType,
			markerDrawers: props.markerDrawers,
		}
	}
  render() {
		let that = this;
		const state = that.state;
		const { backgroundColor, color, markerLocationType, markerDrawers, markerName } = state;

		const markerDrawer = markerDrawers[markerName](backgroundColor, color);
		const { markerAttributes, groupChildren } = markerDrawer;
		const { markerWidth, markerHeight } = markerAttributes;

		const markerId = getMarkerId(markerLocationType, markerName, color, backgroundColor);

		return <marker 
							id={markerId}
							key={markerId}
							markerUnits="strokeWidth"
							orient="auto"
							preserveAspectRatio="none"
							refX={(markerLocationType === 'markerEnd') ?  markerWidth : 0}
							refY={markerHeight / 2}
							viewBox={`0 0 ${ markerWidth } ${ markerHeight}`}
							{...markerAttributes}>
			<g id={`g-${markerId}`}
				 key={`g-${markerId}`}
				 transform={(markerLocationType === 'markerEnd') ? '' : `rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
				{groupChildren}
			</g>
		</marker>;
	}
}

class Edge extends React.Component<any, any> {
  constructor(props) {
		super(props);
		this.state = {
			// NOTE: currently, this is the background color of the diagram as a whole,
			// not necessarily that of the edge or any element the edge is on top of.
			backgroundColor: props.backgroundColor,
			edgeDrawers: props.edgeDrawers,
			element: props.element,
		}
	}
  render() {
		let that = this;
		const state = that.state;
		const { backgroundColor, edgeDrawers, element } = state;
		const { color, borderWidth, points, id, drawAs, strokeDasharray } = element;

		const { getPathSegments, getPointAtPosition } = edgeDrawers[drawAs];
		const pathSegments = getPathSegments(points, id);
		const d = pathSegments
			.map(function(pathSegment) {
				return pathSegment.command + pathSegment.points.join(',');
			})
			.join('');
			 
		const markerProperties = intersection(
				MARKER_PROPERTY_NAMES,
				keys(element)
		)
		.reduce(function(acc: any[], markerLocationType: MarkerPropertyName) {
			const markerName = element[markerLocationType];
			if (markerName) {
				acc.push({
					name: markerLocationType,
					value: getMarkerPropertyValue(markerLocationType, markerName, color, backgroundColor)
				});
			}
			return acc;
		}, []) as any[];

		let opts = {
			className: element.type.join(' '),
			d: d,
			fill: 'transparent',
			stroke: color,
			strokeDasharray: strokeDasharray,
			strokeWidth: borderWidth,
			id: element.id,
		};
		markerProperties.forEach(function(attribute) {
			opts[attribute.name] = attribute.value;
		});

		return <path {...opts}/>;
	}
}

class Node extends React.Component<any, any> {
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
		const { children, customStyle, elementMap, element, icons, iconsLoaded } = state;

		const { backgroundColor, borderWidth, color, drawAs, filter,
			fillOpacity, height, id, rotation, strokeDasharray, textAnchor, textContent, type, width, wpType, x, y } = element;

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
			transform={nodeTransform}
			// TODO the following two are WP-specific. Kaavio should be generic.
			resource={`identifiers:wikipathways/WP554/${id}`}>
			<g property="rdfa:copy" href={wpType}></g>
			{/* TODO re-enable this when we actually have the data
				<g property="biopax:entityReference" content="identifiers:ec-code/3.6.3.14"></g>
			*/}

			{
				// NOTE: we can pull the externally referenced SVGs in using either
				// the SVG 'image' element or the SVG 'use' element. The 'use' element
				// is better, because it allows for more control over styling.
				// If the source image is not available, we can fall back to a simple
				// rectangle.
				iconsLoaded ?
					// see https://css-tricks.com/svg-use-with-external-reference-take-2/
					<use
							height={element.height + 'px'}
							href={'#' + icon.id}
							fill={backgroundColor}
							filter={!!filter ? `url(#${filter})` : null}
							stroke={color}
							strokeWidth={borderWidth}
							typeof="schema:ImageObject" className="Icon"
							width={element.width + 'px'}
							x="0"
							y="0"/>
				:
					<rect
							height={element.height + 'px'}
							fill={backgroundColor}
							filter={!!filter ? `url(#${filter})` : null}
							stroke={color}
							strokeWidth={borderWidth}
							typeof="schema:ImageObject" className="Icon"
							width={element.width + 'px'}
							x="0"
							y="0">
					</rect>
			}

			<g transform={`translate(${ element.width / 10 } 0)`}
					id={`text-for-${ element.id }`}
					className="textlabel"
					content={textContent}>
				{
					(textContent || '')
						.split('\r')
						.map((t, i) => <text id={`text-line${i}`} key={`text-line${i}`} x="0" y={`${0.75 * (i + 1)}em`} dominantBaseline="central" textAnchor={textAnchor}>{t}</text>)
				}
				
			</g>
			{
				(element.citation || [])
					.map((citationId) => elementMap[citationId])
					.map(function(citation) {
						return <text className="citation"
								key={element.id + citation.id}
								content={`identifiers:pubmed/${citation.dbId}`}
								transform={`translate(${ element.width + 5 } 0)`}>{citation.textContent}</text>
					})
			}
			{
				children
			}
		</g>
	}
}

class Group extends React.Component<any, any> {
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
		const { customStyle, elementMap, element, edgeDrawers, icons, iconsLoaded } = that.state;
		const { backgroundColor, borderWidth, color, drawAs, filter, fillOpacity, height, id, rotation, strokeDasharray, textAnchor, textContent, width, x, y } = element;

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
								iconsLoaded={iconsLoaded} />
			});

		return <Node key={id} backgroundColor={backgroundColor}
						customStyle={customStyle}
						edgeDrawers={edgeDrawers}
						element={element}
						elementMap={elementMap}
						icons={icons}
						iconsLoaded={iconsLoaded}
						children={children} />;
	}
}

const components = {
	Edge: Edge,
	Node: Node,
	Group: Group,
};

class Diagram extends React.Component<any, any> {
  constructor(props) {
		super(props);
		this.state = {...props};
		this.state.iconsLoaded = false;
  }

	componentWillReceiveProps(nextProps) {
		let that = this;
		const prevProps = that.props;
		forOwn(nextProps, function(prop, key) {
			if (JSON.stringify(prevProps[key]) !== JSON.stringify(prop)) {
				that.setState({
					[key]: prop,
				});
			}
		});
	}

	getIcons() {
		// see https://css-tricks.com/ajaxing-svg-sprite/
		let that = this;
		const state = that.state;
		const { icons } = state;
		const iconUrls = uniq(
			values(icons)
				.map((icon: any) => icon.url)
		);
		Observable.from(iconUrls)
			.mergeMap(function(iconUrl: any) {
				const ajaxRequest: AjaxRequest = {
					url: iconUrl,
					method: 'GET',
					responseType: 'text',
					timeout: 1 * 1000, // ms
					crossDomain: true,
				};
				return Observable.ajax(ajaxRequest)
					.map((ajaxResponse): {data: string} => ajaxResponse.xhr.response)
					.do(function(res) {
						var div: any = document.createElement("div");
						div.innerHTML = res;
						div.style.display = 'none';
						div.style.visibility = 'hidden';
						document.body.insertBefore(div, document.body.childNodes[0]);
					}, function(err) {
						err.message = err.message || '';
						err.message += ` Error getting icon from "${iconUrl}". Is source website down?`;
						console.error(err);
					});
			})
			.subscribe(function(res) {
			}, function(err) {
				err.message = err.message || '';
				err.message += ' Error getting icons. Is source website down?';
				console.error(err);
				that.setState({iconsLoaded: false});
			}, function() {
				that.setState({iconsLoaded: true});
			});
	}

	componentDidMount() {
		let that = this;
		that.getIcons();
	}

  render() {
		let that = this;
		const state = that.state;
		const { backgroundColor, customStyle, edgeDrawers, elementMap, filters, height, icons, iconsLoaded, name, organism, markerDrawers, width, zIndices } = state;

		const zIndexedElements = zIndices
			.map((id) => elementMap[id]);

		const edges = zIndexedElements
			.filter((element) => element.pvjsonType === 'Edge');

		// TODO Currently just using the background color of the diagram as a whole.
		// Do we want to handle the case where the marker is on top of another element?
		const markerBackgroundColors: ReadonlyArray<string> = [backgroundColor];

		const markerColors = Array.from(
				edges
					.filter((edge) => edge.hasOwnProperty('color'))
					.reduce(function(acc, edge) {
						acc.add(edge.color);
						return acc;
					}, new Set())
		);

		const markerNames = Array.from(
				edges
					.reduce(function(acc, edge: any) {
						intersection(
								MARKER_PROPERTY_NAMES,
								keys(edge)
						)
						.forEach(function(markerLocationType) {
							const markerName: string & NonFuncIriMarkerPropertyValue = edge[markerLocationType];
							// we don't want to create a marker def for markers with names like "none"
							if (NON_FUNC_IRI_MARKER_PROPERTY_VALUES.indexOf(markerName) === -1) {
								acc.add(edge[markerLocationType]);
							}
						});
						return acc;
					}, new Set())
		);

	const markerInputs = markerColors
		.map((color) => ({color: color}))
		.reduce(function(acc: any[], partialInput) {
			const pairs = toPairs(partialInput);
			return acc.concat(
					markerBackgroundColors
						.map(function(markerBackgroundColor) {
							return pairs
								.reduce(function(subAcc: any, pair) {
									const key = pair[0];
									const value = pair[1];
									subAcc[key] = value;
									subAcc.markerBackgroundColor = markerBackgroundColor;
									return subAcc;
								}, {});
						})
			);
		}, [])
		.reduce(function(acc: any[], partialInput) {
			const pairs = toPairs(partialInput);
			return acc.concat(
					MARKER_PROPERTY_NAMES
						.map(function(markerLocationType) {
							return pairs
								.reduce(function(subAcc: any, pair) {
									const key = pair[0];
									const value = pair[1];
									subAcc[key] = value;
									subAcc.markerLocationType = markerLocationType;
									return subAcc;
								}, {});
						})
			);
		}, [])
		.reduce(function(acc: any[], partialInput) {
			const pairs = toPairs(partialInput);
			return acc.concat(
					markerNames
						.map(function(markerName) {
							return pairs
								.reduce(function(subAcc: any, pair) {
									const key = pair[0];
									const value = pair[1];
									subAcc[key] = value;
									subAcc.markerName = markerName;
									return subAcc;
								}, {});
						})
			);
		}, []) as any[];

		const groupedZIndexedElements = zIndexedElements
			.filter((element) => !element.isPartOf)
			.reduce(function(acc, element) {
				if (element.pvjsonType === 'Group') {
					element.contains = element.contains
						.map((id) => elementMap[id])
						.sort(function(a, b) {
							const zIndexA = a.zIndex;
							const zIndexB = b.zIndex;
							if (zIndexA < zIndexB) {
								return 1;
							} else if (zIndexA > zIndexB) {
								return -1;
							} else {
								return 0;
							}
						})
						.map((element) => element.id);
				}
				acc.push(element);
				return acc;
			}, [])

		return <svg xmlns="http://www.w3.org/2000/svg"
						id="kaavio-diagram-1"
						prefix={[
							'biopax: http://www.biopax.org/release/biopax-level3.owl#',
							'gpml: http://vocabularies.wikipathways.org/gpml#',
							'identifiers: http://identifiers.org/',
							'schema: http://schema.org/',
							'rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#',
							'wp: http://vocabularies.wikipathways.org/wp#',
						].join(' ')}
						vocab="http://schema.org/"
						version="1.1"
						baseProfile="full"
						preserveAspectRatio="xMidYMid"
						width={width}
						height={height}
						className={`kaavio-diagram ${ customStyle.diagramClass }`}
						style={{overflow: 'hidden'}}>

			// TODO continue checking that styling is coming across correctly, especially for edges and markers.
						// Check that "shape" is always and everywhere changed to "drawAs".
						// What should customShapes be named? drawingLibrary? customDraw? gallery?
						// For customShapes, try to make it both JSON and React friendly. Also, make API sensible for both glyphs and lines.
			<style type="text/css" dangerouslySetInnerHTML={{__html: `
				<![CDATA[
					${''/*customStyle*/}
				]]>
			`}}/>
			
    	<g id="viewport-20161003191720605"
					className={`viewport ${customStyle.viewportClass} svg-pan-zoom_viewport`}
					typeof="wp:Pathway gpml:Pathway"
					resource="identifiers:wikipathways/WP554/">

    		<defs>
          <clipPath id="rounded-rectangle" clipPathUnits="objectBoundingBox">
            <rect x="0" y="0" rx="0.125" ry="0.25" width="1" height="1"></rect>
          </clipPath>
					{
						filters.map((filter) => filter())
					}
					{
						markerInputs.map(function(input) {
							const { markerLocationType, markerName, color, markerBackgroundColor } = input;
							return <Marker key={getMarkerId(markerLocationType, markerName, color, markerBackgroundColor)}
											color={color}
											backgroundColor={markerBackgroundColor}
											markerLocationType={markerLocationType}
											markerName={markerName}
											markerDrawers={markerDrawers} />;
						})
					}
    		</defs>

    		<rect id="canvas" x="0" y ="0" width="100%" height="100%" className="kaavio-viewport-background" fill={backgroundColor}></rect>
				{
					groupedZIndexedElements.filter((element) => ['Node', 'Edge', 'Group'].indexOf(element.pvjsonType) > -1)
						.map(function(element) {
							const Tag = components[element.pvjsonType];
							return <Tag key={element.id} backgroundColor={backgroundColor} element={element} elementMap={elementMap} edgeDrawers={edgeDrawers} icons={icons} iconsLoaded={iconsLoaded} customStyle={customStyle} />
						})
				}
    	</g>
		</svg>
	}
}

export default Diagram;
