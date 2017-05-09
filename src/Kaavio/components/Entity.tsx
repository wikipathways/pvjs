import * as React from 'react';
import * as ReactDom from 'react-dom';
import {highlighter} from "../filters/highlighter";
import {Text} from './Text';
import {Node} from './Node';
import {EntityProps} from "../typings";
import {Group} from "./Group";
import {Edge} from "./Edge";
import {getHighlighted} from "../utils/getHighlighted";
import {getHidden} from "../utils/getHidden";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Parent Entity component.
 * Most components share many properties so we "lift state up" to the parent.
 */
export class Entity extends React.Component<any, any> {
    constructor(props: EntityProps) {
        super(props);
    }

    renderText() {
        const { width, height, id, textContent, fontFamily, fontSize, fontStyle, fontWeight, textAlign, color}
            = this.props;
        if(!textContent) return;

        return <Text id={`text-for-${id}`} key={`text-for-${id}`} className="textlabel" textContent={textContent}
                     fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight} fontStyle={fontStyle}
                     textAlign={textAlign} color={color} width={width} height={height}/>
    }

    renderBurrs() {
        const {burrs, entityMap, width, height, kaavioType, edgeDrawers, points, drawAs, backgroundColor, customStyle,
            icons, highlightedNodes, hiddenEntities}
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
                const hidden = getHidden(burr, hiddenEntities);
                const icon = icons[burr.drawAs];
                return <Entity key={burr.id} {...burr} edgeDrawers={edgeDrawers}
                               backgroundColor={backgroundColor} customStyle={customStyle}
                               isHighlighted={highlighted.highlighted} highlightedColor={highlighted.color}
                               highlightedNodes={highlightedNodes} icon={icon} icons={icons} entityMap={entityMap}
                               hiddenEntities={hiddenEntities} hidden={hidden} />;
            });
    }

    render() {

        const {rotation, width, height, type, id, x, y, color, kaavioType, customClass, isHighlighted,
            highlightedColor, hidden} = this.props;
        let entityTransform;
        if (x || y || rotation) {
            entityTransform = `translate(${x},${y})`;
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
                child = <Edge  {...this.props} />;
                break;
            case 'Group':
                child = <Group {...this.props}/>;
                break;
            default:
                throw new Error('The Kaavio type of ' + kaavioType + ' does not exist. Please use one of ' +
                    'Node, Edge, or Group.');
        }

        return (
            <g id={id} key={id} className={customClass} color={color}
               visibility={hidden? 'hidden' : 'visible'}
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