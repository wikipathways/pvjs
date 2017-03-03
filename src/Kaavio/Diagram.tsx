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
import {
    MARKER_PROPERTY_NAMES, NonFuncIriMarkerPropertyValue,
    NON_FUNC_IRI_MARKER_PROPERTY_VALUES, Components
} from "./DiagramComponents";
import {getMarkerId} from "./utils";

normalize();
setupPage('#root');

export class Diagram extends React.Component<any, any> {
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

	/**
	 * TODO: add description of this
	 * @returns {any}
	 */
	getZIndexElements(){
		const {zIndices, elementMap} = this.state;
		return zIndices
			.map((id) => elementMap[id]);
	}

	/**
	 * TODO: Add description of this and refactor the code
	 * @returns {any}
	 */
	getGroupedZIndexedElements() {
		const {elementMap} = this.state;
		return this.getZIndexElements()
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
			}, []);
	}

	/**
	 * Get all of the components inside the diagram.
	 *
	 * TODO: refactor this.
	 * @returns jsx
	 */
	getComponents = () => {
		const { backgroundColor, customStyle, edgeDrawers, elementMap, icons, iconsLoaded, name, organism } = this.state;
		return this.getGroupedZIndexedElements().filter((element) => ['Node', 'Edge', 'Group'].indexOf(element.pvjsonType) > -1)
			.map(function(element) {
				switch (element.pvjsonType) {
					case 'Node':
						return 	<Components.Node key={element.id} backgroundColor={backgroundColor} element={element} elementMap={elementMap}
									   edgeDrawers={edgeDrawers} icons={icons} iconsLoaded={iconsLoaded} customStyle={customStyle} />
					case 'Edge':
						return 	<Components.Edge key={element.id} backgroundColor={backgroundColor} element={element} elementMap={elementMap}
									   edgeDrawers={edgeDrawers} icons={icons} iconsLoaded={iconsLoaded} customStyle={customStyle} />
					case 'Group':
						return <Components.Group key={element.id} backgroundColor={backgroundColor} element={element} elementMap={elementMap}
							 edgeDrawers={edgeDrawers} icons={icons} iconsLoaded={iconsLoaded} customStyle={customStyle} />
					case 'Marker':
						return <Components.Marker key={element.id} backgroundColor={backgroundColor} element={element} elementMap={elementMap}
							 edgeDrawers={edgeDrawers} icons={icons} iconsLoaded={iconsLoaded} customStyle={customStyle} />
				}
			});
	};

  	render() {
		let that = this;
		const state = that.state;
		const { backgroundColor, customStyle, edgeDrawers, elementMap, filters, height, icons, iconsLoaded, name, organism, markerDrawers, width, zIndices } = state;

		const edges = this.getZIndexElements()
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
							return <Components.Marker key={getMarkerId(markerLocationType, markerName, color, markerBackgroundColor)}
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
					this.getComponents()
				}
    	</g>
		</svg>
	}
}
