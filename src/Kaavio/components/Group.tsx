import * as React from 'react';
import * as ReactDom from 'react-dom';
import {getHighlighted} from "../utils/getHighlighted";
import {Entity} from './Entity';
import {Node} from './Node';
import {getHidden} from "../utils/getHidden";

// Must also export this class for type definitions to work
export class nodeWithGroup extends React.Component<any, any> {
    constructor(wrappedNode: any) {
        super(wrappedNode.props);
    }
    render() {
        const {x, y, entityMap, highlightedNodes, backgroundColor, customStyle, icons, edgeDrawers, contains, id,
            hiddenEntities} = this.props;

        const children = contains
            .map((containedId) => entityMap[containedId]) // TODO: Refactor this so contains is actually the map of elements. Then don't have to pass through entityMap too
            .filter(entity => ['Node', 'Edge'].indexOf(entity.kaavioType) > -1) // Ensure only node or Edge. We don't allow nested Groups
            .map(entity => {
                // Set the X and Y values
                let toSet;
                if (entity.kaavioType == 'Edge') {
                    toSet = entity.points;
                }
                else {
                    toSet = entity;
                }

                // Keep a reference to the origin X and Y values in case of a re-render
                if (!toSet.origX) {
                    toSet.origX = toSet.x
                }
                if (!toSet.origY) {
                    toSet.origY = toSet.y;
                }
                toSet.x = toSet.origX - x;
                toSet.y = toSet.origY - y;
                return toSet;
            })
            .map(entity => {
                const highlighted = getHighlighted(entity, highlightedNodes);
                const hidden = getHidden(entity, hiddenEntities);
                const icon = icons[entity.drawAs];
                return <Entity key={entity.id} {...entity} icon={icon? icon: null} edgeDrawers={edgeDrawers}
                               backgroundColor={backgroundColor} customStyle={customStyle}
                               isHighlighted={highlighted.highlighted} highlightedColor={highlighted.color}
                               highlightedNodes={highlightedNodes} icons={icons} entityMap={entityMap}
                               hidden={hidden} hiddenEntities={hiddenEntities}
                />
            });
        return <Node key={id} {...this.props} children={children}/>;
    }
}

/**
 * Higher order Group component.
 * Much of the implementation of a Group is the same as the Node, since a group is a node but with children...
 * See: https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.z5a94mm1b
 *
 * @returns {Group}
 */
export const Group = (wrappedNode) => new nodeWithGroup(wrappedNode);