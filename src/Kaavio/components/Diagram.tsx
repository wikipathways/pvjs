/// <reference path="../../../index.d.ts" />

import { normalize, setupPage } from "csstips";
import Edge from './Edge';
import Group from './Group';
import { Base64 } from 'js-base64';
import { find, groupBy, intersection, keys, forOwn, toPairs, uniq, values } from 'lodash';
import { Marker, getMarkerId, MARKER_PROPERTY_NAMES, NON_FUNC_IRI_MARKER_PROPERTY_VALUES } from './Marker';
import Node from './Node';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Observable } from 'rxjs/Observable';
import { AjaxRequest } from  'rxjs/observable/dom/AjaxObservable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { style } from 'typestyle';
import * as validDataUrl from 'valid-data-url';

normalize();
setupPage('#root');

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
		this.state.iconSuffix = new Date().toISOString().replace(/\W/g, '');
  }

	componentWillReceiveProps(nextProps) {
		let that = this;
		const prevProps = that.props;
		forOwn(nextProps, function(prop, key) {
			if (key === 'filters') {
				that.setState({
					[key]: prop,
				});
			} else if (prop && JSON.stringify(prevProps[key]) !== JSON.stringify(prop)) {
				that.setState({
					[key]: prop,
				});
			}
		});
	}

	componentDidMount() {
		this.getIcons();
	}

	getIcons() {
		// see https://css-tricks.com/ajaxing-svg-sprite/
		let that = this;
		const state = that.state;
		const { icons, iconSuffix } = state;
		const iconUrls: string[] = uniq(
			values(icons)
				.map((icon: {id: string, url: string}) => icon.url)
		);
		Observable.from(iconUrls)
			.mergeMap(function(iconUrl): Observable<any>  {
				let svgStringSource;

				// NOTE: data URI parsing is a variation of code from
				// https://github.com/killmenot/parse-data-url/blob/master/index.js
				if (validDataUrl(iconUrl)) {
					const parts = iconUrl.match(validDataUrl.regex);
					let mediaType;
					if (parts[1]) {
						mediaType = parts[1].toLowerCase();
					}

					let charset;
					if (parts[2]) {
						charset = parts[2].split('=')[1].toLowerCase();
					}

					const isBase64 = !!parts[3];

					let data;
					if (parts[4]) {
						data = parts[4];
					}

					const decoded = !isBase64 ? decodeURIComponent(data) : Base64.decode(data);
					svgStringSource = Observable.of(decoded);
				} else {
					const ajaxRequest: AjaxRequest = {
						url: iconUrl,
						method: 'GET',
						responseType: 'text',
						timeout: 1 * 1000, // ms
						crossDomain: true,
					};
					svgStringSource = Observable.ajax(ajaxRequest)
						.map((ajaxResponse): string => ajaxResponse.xhr.response)
						.do(null, function(err) {
							err.message = err.message || '';
							err.message += ` Error getting icon from "${iconUrl}". Is source website down?`;
							console.error(err);
						});
				}
				return svgStringSource
					.map(function(svgString) {
						return {
							iconUrl: iconUrl,
							svgString: svgString,
						};
					});
			})
			.subscribe(function({ iconUrl, svgString }) {
				var div: any = document.createElement("div");
				div.innerHTML = svgString;
				div.style.display = 'none';
				div.style.visibility = 'hidden';
				const id = find(icons, (icon: Icon) => icon.url === iconUrl).id;
				const el = div.querySelector('#' + id);
				el.setAttribute('id', id + iconSuffix);
				document.body.insertBefore(div, document.body.childNodes[0]);
			}, function(err) {
				err.message = err.message || '';
				err.message += ' Error getting icon(s).';
				console.error(err);
				that.setState({iconsLoaded: false});
			}, function() {
				that.setState({iconsLoaded: true});
			});
	}

	getMarkerInputs(zIndexedElements) {
		const backgroundColor = this.state.backgroundColor;
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

		return markerColors
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
	}

	getGroupedZIndexedElements(zIndexedElements) {
		const elementMap = this.state.elementMap;
		return zIndexedElements
			.filter((element) => !element.isPartOf)
			.reduce(function(acc, element) {
				const pvjsonType = element.pvjsonType;
				if (pvjsonType === 'Group') {
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
				} else if (element.hasOwnProperty('burrs')) {
					element.burrs = element.burrs
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
				if (['Burr'].indexOf(pvjsonType) === -1 && !element.hasOwnProperty('isPartOf')) {
					acc.push(element);
				}
				return acc;
			}, []);
	}

  render() {
		let that = this;
		const state = that.state;
		const { about, backgroundColor, customStyle, edgeDrawers, elementMap, filters, handleClick,
						height, icons, iconsLoaded, iconSuffix,
						name, organism, markerDrawers, width, zIndices } = state;

		const zIndexedElements = zIndices
			.map((id) => elementMap[id]);

		const markerInputs = that.getMarkerInputs(zIndexedElements);

		const groupedZIndexedElements = that.getGroupedZIndexedElements(zIndexedElements);

		function thisHandleClick(e) {
			console.log('Diagram');
			console.log('e.target');
			console.log(e.target);
			handleClick(e.target);
		}

		return <svg xmlns="http://www.w3.org/2000/svg"
						id={about}
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
						onClick={thisHandleClick}
						className={`kaavio-diagram ${ customStyle.diagramClass }`}
						style={{overflow: 'hidden'}}>

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
					{
						<clipPath id="rounded-rectangle-clip-path" clipPathUnits="objectBoundingBox">
							<rect x="0" y="0" rx="0.125" ry="0.25" width="1" height="1"></rect>
						</clipPath>
					}
					{
						filters
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

    		<rect x="0" y ="0" width="100%" height="100%" className="kaavio-viewport-background" fill={backgroundColor}></rect>
				{
					groupedZIndexedElements.filter((element) => ['Node', 'Edge', 'Group'].indexOf(element.pvjsonType) > -1)
						.filter((element) => !element.hasOwnProperty('isPartOf'))
						.map(function(element) {
							// Meta is anything that Kaavio doesn't use but becomes part of the node properties.
							// Useful for BridgeDb
							let meta = {
								organism: organism,
								entityType: element.wpType,
								displayName: element.displayName,
								dataSource: element.dbName,
								identifier: element.dbId
							};
							const Tag = components[element.pvjsonType];
							return <Tag key={element.id} backgroundColor={backgroundColor} element={element} elementMap={elementMap}
													svgId={about} edgeDrawers={edgeDrawers} icons={icons} iconsLoaded={iconsLoaded} iconSuffix={iconSuffix}
													customStyle={customStyle} meta={meta} />
						})
				}
    	</g>
		</svg>
	}
}

export default Diagram;
