import * as React from 'react';
import { getHighlighted } from "../utils/getHighlighted";
import { Entity } from './Entity';
import { Node } from './Node';
import { getHidden } from "../utils/getHidden";
// Must also export this class for type definitions to work
export class nodeWithGroup extends React.Component {
    constructor(wrappedNode) {
        super(wrappedNode.props);
    }
    render() {
        const { x, y, entityMap, highlightedNodes, backgroundColor, customStyle, icons, edgeDrawers, contains, id, hiddenEntities } = this.props;
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
                toSet.origX = toSet.x;
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
            return React.createElement(Entity, Object.assign({ key: entity.id }, entity, { icon: icon ? icon : null, edgeDrawers: edgeDrawers, backgroundColor: backgroundColor, customStyle: customStyle, isHighlighted: highlighted.highlighted, highlightedColor: highlighted.color, highlightedNodes: highlightedNodes, icons: icons, entityMap: entityMap, hidden: hidden, hiddenEntities: hiddenEntities }));
        });
        return React.createElement(Node, Object.assign({ key: id }, this.props, { children: children }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL2NvbXBvbmVudHMvR3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTdDLDJEQUEyRDtBQUMzRCxNQUFNLG9CQUFxQixTQUFRLEtBQUssQ0FBQyxTQUFtQjtJQUN4RCxZQUFZLFdBQWdCO1FBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELE1BQU07UUFDRixNQUFNLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQ3BHLGNBQWMsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFakMsTUFBTSxRQUFRLEdBQUcsUUFBUTthQUNwQixHQUFHLENBQUMsQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsaUhBQWlIO2FBQzlKLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDthQUM1SCxHQUFHLENBQUMsTUFBTTtZQUNQLHlCQUF5QjtZQUN6QixJQUFJLEtBQUssQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDMUIsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDbkIsQ0FBQztZQUVELHVFQUF1RTtZQUN2RSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUN6QixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDMUIsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxNQUFNO1lBQ1AsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDakQsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsb0JBQUMsTUFBTSxrQkFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBTSxNQUFNLElBQUUsSUFBSSxFQUFFLElBQUksR0FBRSxJQUFJLEdBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQzVFLGVBQWUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFDMUQsYUFBYSxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFDM0UsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUN0RSxNQUFNLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQzNELENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNQLE1BQU0sQ0FBQyxvQkFBQyxJQUFJLGtCQUFDLEdBQUcsRUFBRSxFQUFFLElBQU0sSUFBSSxDQUFDLEtBQUssSUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFHLENBQUM7SUFDaEUsQ0FBQztDQUNKO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsV0FBVyxLQUFLLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDIn0=