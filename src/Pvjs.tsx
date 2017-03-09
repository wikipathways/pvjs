import {find, forOwn, omit} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Base64} from 'js-base64';
import {Kaavio} from './Kaavio';
import {Filter, generateFilterId, doubleStroke, round} from './Kaavio/components/Filters';
import {BridgeDb, XrefsAnnotationPanel} from 'bridgedb';
import 'bootstrap/dist/css/bootstrap.min.css';
// The edge drawing definitions are in Kaavio because they can be generically used.
import EdgeDrawers from './Kaavio/components/EdgeDrawers';
// But the icons and markers are specific to Pvjs (less likely to useful to other applications).
import icons from './icons/main';
import MarkerDrawers from './MarkerDrawers';
import {gpml2pvjson} from 'gpml2pvjson';
import {Observable} from 'rxjs/Observable';
import {AjaxRequest} from  'rxjs/observable/dom/AjaxObservable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';

// TODO move this into utils
// Create a string of citation numbers for display,
// delimited by commas, and
// replacing any consecutive series of numbers with the
// first and last joined by a hyphen.
function createPublicationXrefString(displayNumbers) {
	var publicationXrefString;
	if (displayNumbers.length === 1) {
		publicationXrefString = displayNumbers[0];
	} else {
		displayNumbers.sort(function(a, b) {
			return a - b;
		});
		var i = 0;
		publicationXrefString = displayNumbers[i].toString();

		if (displayNumbers.length > 2) {
			do {
				i += 1;

				if (displayNumbers[i - 1] + 1 !== displayNumbers[i] || displayNumbers[i] + 1 !== displayNumbers[i + 1]) {
					if (i !== 1) {
						if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
							publicationXrefString += '-' + displayNumbers[i].toString();
						} else {
							publicationXrefString += ', ' + displayNumbers[i].toString();
						}
					} else {
						publicationXrefString += ', ' + displayNumbers[i].toString();
					}
				}

			} while (i < displayNumbers.length - 2);
		}

		i += 1;

		if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
			publicationXrefString += '-' + displayNumbers[i].toString();
		} else {
			publicationXrefString += ', ' + displayNumbers[i].toString();
		}
	}

	return publicationXrefString;
}

export class Pvjs extends React.Component<any, any> {
	pathwayRequest: Observable<any>;
  constructor(props) {
		const customStyle = props.customStyle || {};
		super(props);
		this.state = {
			about: props.about,
			version: props.version,
			src: props.src,
			alt: props.alt,
			customStyle: props.customStyle,
			pvjson: {
				entities: [],
				organism: '',
				name: '',
			},
			filters: [],
			selected: null,
			detailPanelOpen: false,
		};
  }

	closeActive() {
		this.setState({selected: null, detailPanelOpen: false})
	}

	handleClick(e) {
		const that = this;
		const entity = e.entity;
		if (entity && entity.type.indexOf('DataNode') > -1 && entity.dbId && entity.dbName) {
			that.setState({selected: entity, detailPanelOpen: true});
		}
	}

	getPathway() {
		let that = this;
		const state = that.state;
		const { about, version } = state;
		// TODO handle version
		const src = state.src ||
			about.replace(/.*wikipathways[:\/]/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=');
		const ajaxRequest: AjaxRequest = {
			url: src,
			method: 'GET',
			responseType: 'json',
			timeout: 1 * 1000, // ms
			crossDomain: true,
		};
		return gpml2pvjson(
				Observable.ajax(ajaxRequest)
					.map((ajaxResponse): {data: string} => ajaxResponse.xhr.response)
					.map(res => Base64.decode(res.data)),
				about
		)
			.subscribe(function(pvjson) {
				let { entities, organism, name } = pvjson;

				const infoBoxTextContent = `Title: ${name} \n Organism: ${organism}`;

				pvjson.entities = entities.map(function(entity) {
					const displayName = entity.displayName;
					if (displayName) {
						entity.textContent = displayName;
					}
					return omit(entity, ['displayName']);
				}).concat([{
					id: 'pvjs-infobox',
					kaavioType: 'Node',
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
					zIndex: entities.length + 1,
				}]);

				pvjson.entities = pvjson.entities
					.reduce(function(acc, entity) {
						if (entity.hasOwnProperty('citation')) {
							const burrs = entity.burrs || [];
							const {citation, x, y, width, height, kaavioType, points} = entity;

							const citationBurrId = `citation-burr-${citation.join('-')}-for-${entity.id}`;
							burrs.push(citationBurrId);
							entity.burrs = burrs;

							const citationDisplayString = createPublicationXrefString(
									citation
										.map(cId => find(pvjson.entities, {id: cId}))
										.map(c => c.textContent)
							);
							const citationBurr = {
								id: citationBurrId,
								type: ['Citation', 'Burr'],
								width: citationDisplayString.length * 1.5,
								height: 12,
								textContent: citationDisplayString,
								drawAs: 'None',
								attachmentDisplay: {
									position: kaavioType === 'Edge' ? [0.5] : [1, 0],
									offset: kaavioType === 'Edge' ? [5, 5] : [0, -5],
								},
							};
							acc.push(citationBurr);
						}
						acc.push(entity);
						return acc;
					}, []);

				const filters = Array.from(
						pvjson.entities
							.filter((entity) => entity.lineStyle === 'double')
							.reduce(function(acc, entity) {
								const lineStyle = entity.lineStyle;
								let entityFilters = [];
								if (entity.filter) {
									entityFilters.push(entity.filter);
								}
								const strokeWidth = entity.borderWidth;
								entityFilters.push(generateFilterId('doubleStroke', strokeWidth));
								const filterId = entityFilters.join('_');
								// NOTE: notice side effect
								entity.filter = filterId;
								acc.add(filterId);
								return acc;
							}, new Set())
				)
					.reduce(function(acc: any, filterId: string) {
						const filterChildren = filterId.split('_').reduce(function(subAcc, subFilter: string): any[] {
							const [filterName, strokeWidthAsString] = subFilter.split('-');
							const strokeWidth = parseFloat(strokeWidthAsString);

							if (filterName === 'doubleStroke') {
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

				that.setState({pvjson: pvjson, filters: filters});
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
//	componentDidUpdate(prevProps, prevState) {
//		let that = this;
//		const state = that.state;
//		if (JSON.stringify(prevState.pvjson) !== JSON.stringify(state.pvjson)) {
//			that.getPathway();
//		}
//	}

	componentWillReceiveProps(nextProps) {
		let that = this;
		const prevProps = that.props;
		forOwn(nextProps, function(prop, key) {
			if (prop && JSON.stringify(prevProps[key]) !== JSON.stringify(prop)) {
				that.setState({
					[key]: prop,
				});
			}
		});
	}

	componentWillUnmount() {
		let that = this;
		// TODO cancel any pending network requests, possibly something like this:
		//that.pathwayRequest.dispose();
	}

	handleCloseDetailsPanel() {
		this.setState({detailPanelOpen: false})
	}

  render() {
		let that = this;
		const state = that.state;
		const { about, customStyle, detailPanelOpen, pvjson, filters, selected } = state;

		return <section>
			<Kaavio handleClick={that.handleClick.bind(that)} about={about}
							entities={pvjson.entities}
							name={pvjson.name}
							width={pvjson.width}
							height={pvjson.height}
							backgroundColor={pvjson.backgroundColor}
							customStyle={customStyle}
							edgeDrawers={EdgeDrawers} icons={icons} markerDrawers={MarkerDrawers} filters={filters} />
			{
					detailPanelOpen ?
							<XrefsAnnotationPanel
									bridgeDb={new BridgeDb()}
									organism={pvjson.organism}
									entityType={!!selected && selected.wpType}
									displayName={!!selected && selected.textContent}
									dataSource={selected && selected.dbName}
									identifier={!!selected && selected.dbId}
									handleClose={that.handleCloseDetailsPanel.bind(that)}
							/>: <g />
			}
		</section>
	}
}

export default Pvjs;
