import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as _ from 'lodash';
import {Entity} from './Entity';
import {Observable} from "rxjs";
import * as validDataUrl from 'valid-data-url';
import {MARKER_PROPERTY_NAMES, NON_FUNC_IRI_MARKER_PROPERTY_VALUES} from "./Marker";
import {getHighlighted} from "../utils/getHighlighted";
import {getMarkerId, Marker} from "./Marker";
import {getHidden} from "../utils/getHidden";

export class Diagram extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        const { handleClick, entityMap } = this.props;
        const id = e.target.parentNode.parentNode.getAttribute('id');
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

    getMarkerInputs(zIndexedEntities) {
        const backgroundColor = this.props.backgroundColor;
        const edges = zIndexedEntities
            .filter((entity) => entity.kaavioType === 'Edge');

        // TODO Currently just using the background color of the diagram as a whole.
        // Do we want to handle the case where the marker is on top of another entity?
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
                    _.intersection(
                        MARKER_PROPERTY_NAMES,
                        _.keys(edge)
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
                const pairs = _.toPairs(partialInput);
                return acc.concat(
                    markerBackgroundColors
                        .map(function(markerBackgroundColor) {
                            return pairs
                                .reduce(function(subAcc: any, pair) {
                                    const key = pair[0];
                                    subAcc[key] = pair[1];
                                    subAcc.markerBackgroundColor = markerBackgroundColor;
                                    return subAcc;
                                }, {});
                        })
                );
            }, [])
            .reduce(function(acc: any[], partialInput) {
                const pairs = _.toPairs(partialInput);
                return acc.concat(
                    MARKER_PROPERTY_NAMES
                        .map(function(markerLocationType) {
                            return pairs
                                .reduce(function(subAcc: any, pair) {
                                    const key = pair[0];
                                    subAcc[key] = pair[1];
                                    subAcc.markerLocationType = markerLocationType;
                                    return subAcc;
                                }, {});
                        })
                );
            }, [])
            .reduce(function(acc: any[], partialInput) {
                const pairs = _.toPairs(partialInput);
                return acc.concat(
                    markerNames
                        .map(function(markerName) {
                            return pairs
                                .reduce(function(subAcc: any, pair) {
                                    const key = pair[0];
                                    subAcc[key] = pair[1];
                                    subAcc.markerName = markerName;
                                    return subAcc;
                                }, {});
                        })
                );
            }, []) as any[];
    }

    render() {
        const { about, backgroundColor, customStyle, edgeDrawers, entityMap, filters, height, name, organism,
            markerDrawers, width, zIndices, highlightedNodes, icons, hiddenEntities} = this.props;

        const zIndexedEntities = zIndices
            .map((id) => entityMap[id]);

        const groupedZIndexedEntities = this.getGroupedZIndexedEntities(zIndexedEntities);

        const markerInputs = this.getMarkerInputs(zIndexedEntities);

        return <svg xmlns="http://www.w3.org/2000/svg" id={about} version="1.1"
                    baseProfile="full" preserveAspectRatio="xMidYMid"
                    onClick={this.handleClick.bind(this)} className={`kaavio-diagram ${ customStyle.diagramClass }`}
                    style={{overflow: 'hidden'}}>

            <style type="text/css" dangerouslySetInnerHTML={{__html: `
				<![CDATA[
					${''/*customStyle*/}
				]]>
			`}}/>

            <g className={`viewport ${customStyle.viewportClass} svg-pan-zoom_viewport`}>

                <defs>
                    {
                        <clipPath id="rounded-rectangle-clip-path" clipPathUnits="objectBoundingBox">
                            <rect x="0" y="0" rx="0.125" ry="0.25" width="1" height="1" />
                        </clipPath>
                    }
                    {
                        filters
                    }
                    {
                        markerInputs.map((input) => {
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

                <rect x="0" y ="0" width="100%" height="100%" className="kaavio-viewport-background"
                      fill={backgroundColor} />
                <g width={width} height={height}>
                {
                    groupedZIndexedEntities.filter((entity) => ['Node', 'Edge', 'Group'].indexOf(entity.kaavioType) > -1)
                        .filter((entity) => !entity.hasOwnProperty('isPartOf'))
                        .map(function(entity) {
                            const highlighted = getHighlighted(entity, highlightedNodes);
                            const hidden = getHidden(entity, hiddenEntities);
                            const icon = icons[entity.drawAs];
                            return <Entity key={entity.id} {...entity} icon={icon? icon: null} edgeDrawers={edgeDrawers}
                                           backgroundColor={backgroundColor} customStyle={customStyle}
                                           isHighlighted={highlighted.highlighted} highlightedColor={highlighted.color}
                                           highlightedNodes={highlightedNodes} icons={icons} entityMap={entityMap}
                                           hidden={hidden} hiddenEntities={hiddenEntities}
                            />
                        })
                }
                </g>
            </g>
        </svg>
    }
}