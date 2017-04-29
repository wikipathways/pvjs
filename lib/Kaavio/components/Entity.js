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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0thYXZpby9jb21wb25lbnRzL0VudGl0eS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUc3Qzs7O0dBR0c7QUFDSCxNQUFNLGFBQWMsU0FBUSxLQUFLLENBQUMsU0FBbUI7SUFDakQsWUFBWSxLQUFrQjtRQUMxQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELFVBQVU7UUFDTixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLEdBQ3BHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDakIsRUFBRSxDQUFBLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFeEIsTUFBTSxDQUFDLG9CQUFDLElBQUksSUFBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQzNGLFVB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