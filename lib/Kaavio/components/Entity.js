import * as React from 'react';
import { highlighter } from "../filters/highlighter";
import { Text } from './Text';
import { Node } from './Node';
import { Group } from "./Group";
import { Edge } from "./Edge";
import { getHighlighted } from "../utils/getHighlighted";
import { getHidden } from "../utils/getHidden";
/**
 * Parent Entity component.
 * Most components share many properties so we "lift state up" to the parent.
 */
export class Entity extends React.Component {
    constructor(props) {
        super(props);
    }
    renderText() {
        const { width, height, id, textContent, fontFamily, fontSize, fontStyle, fontWeight, textAlign, fontColor } = this.props;
        if (!textContent)
            return;
        if (id === 'f71')
            console.log(width, height);
        return React.createElement(Text, { id: `text-for-${id}`, key: `text-for-${id}`, className: "textlabel", textContent: textContent, fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, fontStyle: fontStyle, textAlign: textAlign, fontColor: fontColor, width: width, height: height });
    }
    renderBurrs() {
        const { burrs, entityMap, width, height, kaavioType, edgeDrawers, points, drawAs, backgroundColor, customStyle, icons, highlightedNodes, hiddenEntities } = this.props;
        if (!burrs || burrs.length < 1)
            return;
        return burrs.map((burrId) => entityMap[burrId])
            .map((burr) => {
            // NOTE: notice side effect
            burr.width += 0;
            burr.height += 0;
            const attachmentDisplay = burr.attachmentDisplay;
            const position = attachmentDisplay.position;
            const offset = attachmentDisplay.hasOwnProperty('offset') ? attachmentDisplay.offset : [0, 0];
            // kaavioType is referring to the entity the burr is attached to
            if (['Node', 'Group'].indexOf(kaavioType) > -1) {
                burr.x = width * position[0] - burr.width / 2 + offset[0];
                burr.y = height * position[1] - burr.height / 2 + offset[1];
            }
            else if (kaavioType === 'Edge') {
                // TODO get edge logic working so we can position this better
                // TODO look at current production pvjs to see how this is done
                const positionXY = edgeDrawers[drawAs].getPointAtPosition(points, position[0]);
                burr.x = positionXY.x - burr.width / 2 + offset[0];
                burr.y = positionXY.y - burr.height / 2 + offset[1];
            }
            else {
                throw new Error(`Cannot handle burr with parent of type ${kaavioType}`);
            }
            return burr;
        })
            .map((burr) => {
            // Return a new entity with the burr
            // If just a Node is returned then actions such as highlighting the burr individually cannot be done
            burr.kaavioType = "Node";
            const highlighted = getHighlighted(burr, highlightedNodes);
            const hidden = getHidden(burr, hiddenEntities);
            const icon = icons[burr.drawAs];
            return React.createElement(Entity, Object.assign({ key: burr.id }, burr, { edgeDrawers: edgeDrawers, backgroundColor: backgroundColor, customStyle: customStyle, isHighlighted: highlighted.highlighted, highlightedColor: highlighted.color, highlightedNodes: highlightedNodes, icon: icon, icons: icons, entityMap: entityMap, hiddenEntities: hiddenEntities, hidden: hidden }));
        });
    }
    render() {
        // Anders: Here, I only show the props that are required by the component.
        // Also use this.props instead of this.state
        const { rotation, width, height, type, id, x, y, color, kaavioType, customClass, isHighlighted, highlightedColor, highlightedNodes, icons, hidden, hiddenEntities } = this.props;
        let entityTransform;
        if (x || y || rotation) {
            entityTransform = `translate(${x},${y})`;
            if (rotation) {
                entityTransform += ` rotate(${rotation},${x + width / 2},${y + height / 2})`;
            }
        }
        // Anders: I think it's best to be explicit. Instead of using components[kaavioType] do this.
        // I know it's a bit redundant but in this case I think it aids comprehension
        let child;
        switch (kaavioType) {
            case 'Node':
                child = React.createElement(Node, Object.assign({}, this.props));
                break;
            case 'Edge':
                child = React.createElement(Edge, Object.assign({}, this.props));
                break;
            case 'Group':
                child = React.createElement(Group, Object.assign({}, this.props));
                break;
            default:
                throw new Error('The Kaavio type of ' + kaavioType + ' does not exist. Please use one of ' +
                    'Node, Edge, or Group.');
        }
        return (React.createElement("g", { id: id, key: id, className: customClass, color: color, visibility: hidden ? 'hidden' : 'visible', transform: entityTransform, filter: isHighlighted ? 'url(#' + highlighter(id, highlightedColor).url + ')' : null },
            React.createElement("defs", null, isHighlighted ? highlighter(id, highlightedColor).filter : null),
            child,
            this.renderBurrs(),
            this.renderText()));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0thYXZpby9jb21wb25lbnRzL0VudGl0eS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUc3Qzs7O0dBR0c7QUFDSCxNQUFNLGFBQWMsU0FBUSxLQUFLLENBQUMsU0FBbUI7SUFDakQsWUFBWSxLQUFrQjtRQUMxQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELFVBQVU7UUFDTixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLEdBQ3BHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDakIsRUFBRSxDQUFBLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDeEIsRUFBRSxDQUFBLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQztZQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBRTNDLE1BQU0sQ0FBQyxvQkFBQyxJQUFJLElBQUMsRUFBRSxFQUFFLFlB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