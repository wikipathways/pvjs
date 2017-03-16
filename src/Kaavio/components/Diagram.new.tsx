import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as _ from 'lodash';
import {Entity} from './Entity.new';
import {Observable} from "rxjs";
import * as validDataUrl from 'valid-data-url';
import {MARKER_PROPERTY_NAMES, NON_FUNC_IRI_MARKER_PROPERTY_VALUES} from "./Marker";
import {getHighlighted} from "../utils/getHighlighted";

export class Diagram extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const prevProps = this.props;
        _.forOwn(nextProps, (prop, key) => {
            if (key === 'filters') {
                this.setState({
                    [key]: prop,
                });
            } else if (prop && JSON.stringify(prevProps[key]) !== JSON.stringify(prop)) {
                this.setState({
                    [key]: prop,
                });
            }
        });
    }

    handleClick(e) {
        const { handleClick, entityMap } = this.props;
        const id = e.target.parentNode.getAttribute('id');
        const entity = entityMap[id];
        handleClick(_.omitBy(_.defaults({entity: entity}, e), (v, k) => k.indexOf('_') === 0));
    }

    getGroupedZIndexedEntities(zIndexedEntities) {
        const {entityMap} = this.props;
        return zIndexedEntities
            .filter((entity) => !entity.isPartOf)
            .reduce(function(acc, entity) {
                const kaavioType = entity.kaavioType;
                if (kaavioType === 'Group') {
                    // TODO: refactor this so that contains is actually a map of the contained elements. Not just an array of their IDs
                    entity.contains = entity.contains
                        .map((id) => entityMap[id])
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
                        .map((entity) => entity.id);
                } else if (entity.hasOwnProperty('burrs')) {
                    entity.burrs = entity.burrs
                        .map((id) => entityMap[id])
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
                        .map((entity) => entity.id);
                }
                if (['Burr'].indexOf(kaavioType) === -1 && !entity.hasOwnProperty('isPartOf')) {
                    acc.push(entity);
                }
                return acc;
            }, []);
    }

    render() {
        const { about, backgroundColor, customStyle, edgeDrawers, entityMap, filters, height, name, organism,
            markerDrawers, width, zIndices, highlightedNodes, icons} = this.props;

        const zIndexedEntities = zIndices
            .map((id) => entityMap[id]);

        const groupedZIndexedEntities = this.getGroupedZIndexedEntities(zIndexedEntities);

        return <svg xmlns="http://www.w3.org/2000/svg" id={about} vocab="http://schema.org/" version="1.1"
                    baseProfile="full" preserveAspectRatio="xMidYMid" width={width} height={height}
                    onClick={this.handleClick.bind(this)} className={`kaavio-diagram ${ customStyle.diagramClass }`}
                    style={{overflow: 'hidden'}}
                    prefix={[
                        'biopax: http://www.biopax.org/release/biopax-level3.owl#',
                        'gpml: http://vocabularies.wikipathways.org/gpml#',
                        'identifiers: http://identifiers.org/',
                        'schema: http://schema.org/',
                        'rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                        'wp: http://vocabularies.wikipathways.org/wp#',
                    ].join(' ')}>

            <style type="text/css" dangerouslySetInnerHTML={{__html: `
				<![CDATA[
					${''/*customStyle*/}
				]]>
			`}}/>

            <g id="viewport-20161003191720605"
               className={`viewport ${customStyle.viewportClass} svg-pan-zoom_viewport`}
               typeof="wp:Pathway gpml:Pathway"
               resource="identifiers:wikipathways/WP554/">

                <rect x="0" y ="0" width="100%" height="100%" className="kaavio-viewport-background"
                      fill={backgroundColor} />
                {
                    groupedZIndexedEntities.filter((entity) => ['Node', 'Edge', 'Group'].indexOf(entity.kaavioType) > -1)
                        .filter((entity) => !entity.hasOwnProperty('isPartOf'))
                        .map(function(entity) {
                            const highlighted = getHighlighted(entity, highlightedNodes);
                            const icon = icons[entity.drawAs];
                            return <Entity key={entity.id} {...entity} icon={icon? icon: null} edgeDrawers={edgeDrawers}
                                           backgroundColor={backgroundColor} customStyle={customStyle}
                                           isHighlighted={highlighted.highlighted} highlightedColor={highlighted.color}
                                           highlightedNodes={highlightedNodes} icons={icons} entityMap={entityMap}
                            />
                        })
                }
            </g>
        </svg>
    }
}