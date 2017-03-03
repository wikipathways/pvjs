import { omit } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Base64 } from 'js-base64';
import Kaavio from './kaavio/main';
import { Filter, generateFilterId, doubleStroke, round } from './kaavio/filters';

require('./stripped-bootstrap.css');
import * as WikiPathwaysDefaultDisplayStyle from './WikiPathwaysDefaultDisplayStyle';

import icons from './icons/main';
import edgeDrawers from './edgeDrawers';
import markerDrawers from './markerDrawers';

//import gpml2pvjson from 'gpml2pvjson/lib/main';
let gpml2pvjson = require('gpml2pvjson').default;

import { Observable } from 'rxjs/Observable';
import { AjaxRequest } from  'rxjs/observable/dom/AjaxObservable';
import 'rxjs/add/observable/dom/ajax';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';

class Pvjs extends React.Component<any, any> {
	pathwayRequest: Observable<any>;
  constructor(props) {
		const customStyle = props.customStyle || {};
		super(props);
		this.state = {
			id: props.id,
			pvjson: {
				elements: [],
				organism: '',
				name: '',
			},
			customStyle: props.customStyle,
		};
  }

	getPathway() {
		let that = this;
		const state = that.state;
		// NOTE: this is in case the pathway id is provided as something like wikipathways:WP554
		// TODO what about if it's provided as something like this: http://identifiers.org/wikipathways/WP554
		const fullId = state.id.replace(/wikipathways:/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=')
		const ajaxRequest: AjaxRequest = {
			url: fullId,
			method: 'GET',
			responseType: 'json',
			timeout: 1 * 1000, // ms
			crossDomain: true,
		};
		return gpml2pvjson(
				Observable.ajax(ajaxRequest)
					.map((ajaxResponse): {data: string} => ajaxResponse.xhr.response)
					.map(res => Base64.decode(res.data)),
				fullId
		)
			.subscribe(function(pvjson) {
				let { elements, organism, name } = pvjson;

				const infoBoxTextContent = `Title: ${name} \n Organism: ${organism}`;

				pvjson.elements = elements.map(function(element) {
					const displayName = element.displayName;
					if (displayName) {
						element.textContent = displayName;
					}
					return omit(element, ['displayName']);
				}).concat([{
					id: 'pvjs-infobox',
					pvjsonType: 'Node',
					drawAs: 'None',
					backgroundColor: 'transparent',
					borderWidth: 0,
					color: '#999999',
					fontSize: 14,
					textContent: infoBoxTextContent,
					textAlign: 'start',
					type: [
						'Node',
						'Label',
						'InfoBox',
					],
					padding: '0.1em',
					align: 'left',
					verticalAlign: 'middle',
					fontFamily: 'Arial',
					x: 5,
					y: 5,
					height: 50,
					width: infoBoxTextContent.length * 3.5,
					zIndex: elements.length + 1,
				}]);
				that.setState({pvjson: pvjson});
			}, function(err) {
				err.message = err.message || '';
				err.message += ' Error getting pathway (is webservice.wikipathways.org down?)'
				console.error(err);
				that.setState({});
			})
	}

	componentDidMount() {
		let that = this;
		that.getPathway();
	}

	// TODO is this correct? Or should we use componentWillUpdate?
	componentDidUpdate(prevProps, prevState) {
		let that = this;
		const state = that.state;
		if (JSON.stringify(prevState.pvjson) !== JSON.stringify(state.pvjson)) {
			that.getPathway();
		}
	}

	componentWillUnmount() {
		let that = this;
		// TODO cancel any pending network requests, possibly something like this:
		//that.pathwayRequest.dispose();
	}	

  render() {
		let that = this;
		const state = that.state;
		const { pvjson, id, customStyle } = state;

		const filters = Array.from(
				pvjson.elements
					.filter((element) => element.lineStyle === 'double')
					.reduce(function(acc, element) {
						const lineStyle = element.lineStyle;
						let elementFilters = [];
						if (element.filter) {
							elementFilters.push(element.filter);
						}
						const strokeWidth = element.borderWidth;
						elementFilters.push(generateFilterId('doubleStroke', strokeWidth));
						const filterId = elementFilters.join('_');
						// NOTE: notice side effect
						element.filter = filterId;
						acc.add(filterId);
						return acc;
					}, new Set())
		)
		.reduce(function(acc: any, filterId: string) {
			const filterChildren = filterId.split('_').reduce(function(subAcc, subFilter: string): any[] {
				const [filterName, strokeWidthAsString] = subFilter.split('-');
				const strokeWidth = parseFloat(strokeWidthAsString);

				if (filterName === 'round') {
					round({source: 'SourceGraphic', strokeWidth: strokeWidth})
						.forEach(function(x) {
							subAcc.push(x)
						});
				} else if (filterName === 'doubleStroke') {
					doubleStroke({
						source: filterId.indexOf('ound') > -1 ? 'roundResult' : 'SourceGraphic',
						strokeWidth: strokeWidth,
					})
						.forEach(function(x) {
							subAcc.push(x);
						});
				}

				return subAcc;
			}, []);
			acc.push(<Filter id={filterId} key={filterId} children={filterChildren} />);
			return acc;
		}, []);

		return <Kaavio id={id}
										pvjson={pvjson}
										customStyle={/*customStyle*/WikiPathwaysDefaultDisplayStyle}
										edgeDrawers={edgeDrawers}
										filters={filters}
										icons={icons}
										markerDrawers={markerDrawers} />;
	}
}

export default Pvjs;
