import * as React from 'react';
import * as _ from 'lodash';
import { Entity } from './Entity';
import { MARKER_PROPERTY_NAMES, NON_FUNC_IRI_MARKER_PROPERTY_VALUES } from "./Marker";
import { getHighlighted } from "../utils/getHighlighted";
import { getMarkerId, Marker } from "./Marker";
import { getHidden } from "../utils/getHidden";
export class Diagram extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        const { handleClick, entityMap } = this.props;
        const id = e.target.parentNode.parentNode.getAttribute('id');
        const entity = entityMap[id];
        handleClick(_.omitBy(_.defaults({ entity: entity }, e), (v, k) => k.indexOf('_') === 0));
    }
    getGroupedZIndexedEntities(zIndexedEntities) {
        const { entityMap } = this.props;
        return zIndexedEntities
            .filter((entity) => !entity.isPartOf)
            .reduce(function (acc, entity) {
            const kaavioType = entity.kaavioType;
            if (kaavioType === 'Group') {
                // TODO: refactor this so that contains is actually a map of the contained elements. Not just an array of their IDs
                entity.contains = entity.contains
                    .map((id) => entityMap[id])
                    .sort(function (a, b) {
                    const zIndexA = a.zIndex;
                    const zIndexB = b.zIndex;
                    if (zIndexA < zIndexB) {
                        return 1;
                    }
                    else if (zIndexA > zIndexB) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                })
                    .map((entity) => entity.id);
            }
            else if (entity.hasOwnProperty('burrs')) {
                entity.burrs = entity.burrs
                    .map((id) => entityMap[id])
                    .sort(function (a, b) {
                    const zIndexA = a.zIndex;
                    const zIndexB = b.zIndex;
                    if (zIndexA < zIndexB) {
                        return 1;
                    }
                    else if (zIndexA > zIndexB) {
                        return -1;
                    }
                    else {
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
        const markerColors = Array.from(edges
            .filter((edge) => edge.hasOwnProperty('color'))
            .reduce(function (acc, edge) {
            acc.add(edge.color);
            return acc;
        }, new Set()));
        // TODO Currently just keeping the background colors the same as the colours. I.e. arrowhead is same as line
        // Do we want to handle the case where the marker is on top of another entity?
        const markerBackgroundColors = markerColors.slice();
        const markerNames = Array.from(edges
            .reduce(function (acc, edge) {
            _.intersection(MARKER_PROPERTY_NAMES, _.keys(edge))
                .forEach(function (markerLocationType) {
                const markerName = edge[markerLocationType];
                // we don't want to create a marker def for markers with names like "none"
                if (NON_FUNC_IRI_MARKER_PROPERTY_VALUES.indexOf(markerName) === -1) {
                    acc.add(edge[markerLocationType]);
                }
            });
            return acc;
        }, new Set()));
        return markerColors
            .map((color) => ({ color: color }))
            .reduce(function (acc, partialInput) {
            const pairs = _.toPairs(partialInput);
            return acc.concat(markerBackgroundColors
                .map(function (markerBackgroundColor) {
                return pairs
                    .reduce(function (subAcc, pair) {
                    const key = pair[0];
                    subAcc[key] = pair[1];
                    subAcc.markerBackgroundColor = markerBackgroundColor;
                    return subAcc;
                }, {});
            }));
        }, [])
            .reduce(function (acc, partialInput) {
            const pairs = _.toPairs(partialInput);
            return acc.concat(MARKER_PROPERTY_NAMES
                .map(function (markerLocationType) {
                return pairs
                    .reduce(function (subAcc, pair) {
                    const key = pair[0];
                    subAcc[key] = pair[1];
                    subAcc.markerLocationType = markerLocationType;
                    return subAcc;
                }, {});
            }));
        }, [])
            .reduce(function (acc, partialInput) {
            const pairs = _.toPairs(partialInput);
            return acc.concat(markerNames
                .map(function (markerName) {
                return pairs
                    .reduce(function (subAcc, pair) {
                    const key = pair[0];
                    subAcc[key] = pair[1];
                    subAcc.markerName = markerName;
                    return subAcc;
                }, {});
            }));
        }, []);
    }
    render() {
        const { about, backgroundColor, customStyle, edgeDrawers, entityMap, filters, height, name, organism, markerDrawers, width, zIndices, highlightedNodes, icons, hiddenEntities } = this.props;
        const zIndexedEntities = zIndices
            .map((id) => entityMap[id]);
        const groupedZIndexedEntities = this.getGroupedZIndexedEntities(zIndexedEntities);
        const markerInputs = this.getMarkerInputs(zIndexedEntities);
        return React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", id: about, version: "1.1", baseProfile: "full", preserveAspectRatio: "xMidYMid", onClick: this.handleClick.bind(this), className: `kaavio-diagram ${customStyle.diagramClass}`, viewBox: `0 0 ${width} ${height}` },
            React.createElement("style", { type: "text/css", dangerouslySetInnerHTML: { __html: `
				<![CDATA[
					${'' /*customStyle*/}
				]]>
			` } }),
            React.createElement("g", { className: `viewport ${customStyle.viewportClass} svg-pan-zoom_viewport` },
                React.createElement("defs", null,
                    React.createElement("clipPath", { id: "rounded-rectangle-clip-path", clipPathUnits: "objectBoundingBox" },
                        React.createElement("rect", { x: "0", y: "0", rx: "0.125", ry: "0.25", width: "1", height: "1" })),
                    filters,
                    markerInputs.map((input) => {
                        const { markerLocationType, markerName, color, markerBackgroundColor } = input;
                        return React.createElement(Marker, { key: getMarkerId(markerLocationType, markerName, color, markerBackgroundColor), color: color, backgroundColor: markerBackgroundColor, markerLocationType: markerLocationType, markerName: markerName, markerDrawers: markerDrawers });
                    })),
                React.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%", className: "kaavio-viewport-background", fill: backgroundColor }),
                React.createElement("g", { width: width, height: height }, groupedZIndexedEntities.filter((entity) => ['Node', 'Edge', 'Group'].indexOf(entity.kaavioType) > -1)
                    .filter((entity) => !entity.hasOwnProperty('isPartOf'))
                    .map(function (entity) {
                    const highlighted = getHighlighted(entity, highlightedNodes);
                    const hidden = getHidden(entity, hiddenEntities);
                    const icon = icons[entity.drawAs];
                    return React.createElement(Entity, Object.assign({ key: entity.id }, entity, { icon: icon ? icon : null, edgeDrawers: edgeDrawers, customStyle: customStyle, isHighlighted: highlighted.highlighted, highlightedColor: highlighted.color, highlightedNodes: highlightedNodes, icons: icons, entityMap: entityMap, hidden: hidden, hiddenEntities: hiddenEntities }));
                }))));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9EaWFncmFtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBR2hDLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxtQ0FBbUMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNwRixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTdDLE1BQU0sY0FBZSxTQUFRLEtBQUssQ0FBQyxTQUFtQjtJQUNsRCxZQUFZLEtBQUs7UUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVcsQ0FBQyxDQUFDO1FBQ1QsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUss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