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
import markerDrawers from './markerDrawers';
import {gpml2pvjson} from 'gpml2pvjson';
import {Observable} from 'rxjs/Observable';
import {AjaxRequest} from  'rxjs/observable/dom/AjaxObservable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import {Manipulator} from "./Kaavio/manipulator/manipulator";
import * as Spinner from 'react-spinkit';

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
	kaavioRef: any;
	manipulator: Manipulator;

  	constructor(props) {
		super(props);
		this.state = {
			pvjson: null,
			filters: null,
			loading: false,
			loaded: false,
			detailPanelOpen: false,
			selected: null,
			error: null
		};
  	}

	getPathway() {
  		this.setState({loading: true});
		const { about, version } = this.props;
		// TODO handle version
		const src = about.replace(/.*wikipathways[:\/]/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=');

		const ajaxRequest: AjaxRequest = {
			url: src,
			method: 'GET',
			responseType: 'json',
			timeout: 1000, // ms
			crossDomain: true,
		};

		const observable = Observable.ajax(ajaxRequest)
			.map((ajaxResponse): {data: string} => ajaxResponse.xhr.response)
            .map(res => Base64.decode(res.data));

		return gpml2pvjson(observable, about).subscribe((pvjson) => {
			const { entities, organism, name } = pvjson;

			pvjson.entities = entities.map((entity) => {
				if (entity.displayName) {
					// Set the inner text to the displayName
					// We don't need displayName
					entity.textContent = entity.displayName;
				}
				// Remove the displayName
				return omit(entity, ['displayName']);
			});

			// Build up the title for the diagram
			const infoBoxTextContent = `Title: ${name} \n Organism: ${organism}`;
			// Add on the info box containing the title
			pvjson.entities = entities.concat([{
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

			// If an entity has citations, format the citation and add it to the entities array
			pvjson.entities = pvjson.entities.reduce((acc, entity) => {
				if (entity.hasOwnProperty('citation')) {
					const burrs = entity.burrs || [];
					const {citation, kaavioType} = entity;

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

			// Add filters if a double line style is specified in the entity
			// Anders: We discussed just doing this with CSS. What's the verdict?
			const filters = pvjson.entities
				.filter((entity) => entity.lineStyle === 'double')
				.reduce((acc, entity) => {
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
					acc.push(filterId);
					return acc;
				}, []);

			// Reduce the filters further. Add any children needed.
			filters.reduce((acc: any, filterId: string) => {
				const filterChildren = filterId.split('_').reduce((subAcc, subFilter: string) => {
					const [filterName, strokeWidthAsString] = subFilter.split('-');
					const strokeWidth = parseFloat(strokeWidthAsString);

					if(filterName !== 'doubleStroke') return;

					doubleStroke({
						source: filterId.indexOf('ound') > -1 ? 'roundResult' : 'SourceGraphic',
						strokeWidth: strokeWidth,
					}).forEach(x => {
						subAcc.push(x);
					});

					return subAcc;
				}, []);
				acc.push(<Filter id={filterId} key={filterId} children={filterChildren} />);
				return acc;
			}, []);

			this.setState({pvjson: pvjson, filters: filters, loaded: true, loading: false});
		}, (err) => {
			err.message = err.message || '';
			err.message += ' Error getting pathway (is webservice.wikipathways.org down?)';
			this.setState({error: err, loaded: false, loading: false})
		});
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

	componentWillMount() {
		this.getPathway();
	}


	componentWillReceiveProps(nextProps) {
		const prevProps = this.props;
		if (nextProps.about !== prevProps.about || nextProps.version !== prevProps.version) {
			// Reset the state
			this.setState({
				pvjson: null,
				filter: null,
				loading: false,
				loaded: false,
				detailPanelOpen: false,
				selected: null,
				error: null
			});
			this.getPathway();
		}
	};

	componentWillUnmount() {
		// TODO cancel any pending network requests, possibly something like this:
		//this.pathwayRequest.dispose();
	}

	onKaavioReady(kaavio){
		this.manipulator = kaavio.manipulator;
	}

	handleCloseDetailsPanel() {
		this.setState({detailPanelOpen: false})
	}

	renderDetailsPanel() {
		const {pvjson, selected, detailPanelOpen} = this.state;
		if(! detailPanelOpen) return null;

		return (
			<XrefsAnnotationPanel
				bridgeDb={new BridgeDb()}
				organism={pvjson.organism}
				entityType={!!selected && selected.wpType}
				displayName={!!selected && selected.textContent}
				dataSource={selected && selected.dbName}
				identifier={!!selected && selected.dbId}
				handleClose={e => this.handleClick(e)}
			/>
		)
	}

  	render() {
		const {loading, loaded, error, pvjson, filters} = this.state;
		const { about, customStyle} = this.props;

		const spinnerStyle = {
			width: '80px',
			marginLeft: 'auto',
			marginRight: 'auto',
			paddingTop: '1rem'

		};

		if(loading) return <Spinner spinnerName="wandering-cubes" style={spinnerStyle} />;

		return (
			<section>
				<Kaavio ref={kaavio => this.kaavioRef = kaavio} handleClick={e => this.handleClick(e)} about={about}
						entities={pvjson.entities} name={pvjson.name} width={pvjson.width} height={pvjson.height}
						backgroundColor={pvjson.backgroundColor} customStyle={customStyle} edgeDrawers={EdgeDrawers}
						icons={icons} markerDrawers={markerDrawers} filters={filters}
						onReady={kaavio => this.onKaavioReady(kaavio)} />

				{this.renderDetailsPanel()}
			</section>
		)
	}
}
