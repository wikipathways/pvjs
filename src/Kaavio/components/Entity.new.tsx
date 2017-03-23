import * as React from 'react';
import * as ReactDom from 'react-dom';
import {highlighter} from "../filters/highlighter";
import {Text} from './Text.new';
import {Node} from './Node.new';
import {EntityProps} from "../typings";
import {Group} from "./Group.new";
import {Edge} from "./Edge.new";
import {getHighlighted} from "../utils/getHighlighted";

/**
 * Parent Entity component.
 * Most components share many properties so we "lift state up" to the parent.
 */
export class Entity extends React.Component<any, any> {
    constructor(props: EntityProps) {
        super(props);
    }

    renderText() {
        const { width, height, id, textContent, fontFamily, fontSize, fontStyle, fontWeight, textAlign, fontColor}
            = this.props;

        if(!textContent) return;
        const alignSvgTextToXSvgText = {
            left: 0,
            center: width / 2,
            right: width,
        };
        const xSvgText = alignSvgTextToXSvgText[textAlign];
        const ySvgText = height / 2; // Anders: I just set this to always be middle.

        return <Text id={`text-for-${id}`} key={`text-for-${id}`} className="textlabel" textContent={textContent}
                     fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight} fontStyle={fontStyle}
                     textAlign={textAlign} fontColor={fontColor} x={xSvgText} y={ySvgText}/>
    }

    renderBurrs() {
        const {burrs, entityMap, width, height, kaavioType, edgeDrawers, points, drawAs, backgroundColor, customStyle,
            icons, highlightedNodes}
            = this.props;
        if(! burrs || burrs.length < 1) return;

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
                } else if (kaavioType === 'Edge') {
                    // TODO get edge logic working so we can position this better
                    // TODO look at current production pvjs to see how this is done
                    const positionXY = edgeDrawers[drawAs].getPointAtPosition(points, position[0]);
                    burr.x = positionXY.x - burr.width / 2 + offset[0];
                    burr.y = positionXY.y - burr.height / 2 + offset[1];
                } else {
                    throw new Error(`Cannot handle burr with parent of type ${kaavioType}`)
                }

                return burr;
            })
            .map((burr) => {
                // Return a new entity with the burr
                // If just a Node is returned then actions such as highlighting the burr individually cannot be done
                burr.kaavioType = "Node";
                const highlighted = getHighlighted(burr, highlightedNodes);
                const icon = icons[burr.drawAs];
                return <Entity key={burr.id} {...burr} edgeDrawers={edgeDrawers}
                               backgroundColor={backgroundColor} customStyle={customStyle}
                               isHighlighted={highlighted.highlighted} highlightedColor={highlighted.color}
                               highlightedNodes={highlightedNodes} icon={icon} icons={icons} entityMap={entityMap}/>;
            });
    }

    render() {
        // Anders: Here, I only show the props that are required by the component.
        // Also use this.props instead of this.state

        const {rotation, width, height, type, id, x, y, color, kaavioType, customClass, isHighlighted, highlightedColor,
            highlightedNodes, icons}
            = this.props;
        let entityTransform;
        if (x || y || rotation) {
            entityTransform = `translate(${x} ${y})`;
            if (rotation) {
                entityTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
            }
        }

        // Anders: I think it's best to be explicit. Instead of using components[kaavioType] do this.
        // I know it's a bit redundant but in this case I think it aids comprehension
        let child;
        switch(kaavioType) {
            case 'Node':
                child = <Node {...this.props} />;
                break;
            case 'Edge':
                child = <Edge {...this.props} />;
                break;
            case 'Group':
                child = <Group {...this.props}/>;
                break;
            default:
                throw new Error('The Kaavio type of ' + kaavioType + ' does not exist. Please use one of ' +
                    'Node, Edge, Marker or Group.');
        }
        return (
            <g id={id} key={id} className={customClass} color={color}
               transform={entityTransform} filter={isHighlighted? 'url(#' + highlighter(id, highlightedColor).url + ')': null}>

                <defs>
                    {/*Define any SVG definitions that apply to the whole entity. Filters etc. */}
                    {isHighlighted? highlighter(id, highlightedColor).filter: null}
                </defs>

                {child}

                {this.renderBurrs()}

                {this.renderText()}
            </g>
        )
    }
}