import * as React from 'react';
import * as ReactDom from 'react-dom';
import {getHighlighted} from "../utils/getHighlighted";
import {highlighter} from "../filters/highlighter";
import {Text} from './Text.new';
import {Node} from './Node.new';
import {EntityProps} from "../typings/EntityProps";

/**
 * Parent Entity component.
 * Most components share many properties so we "lift state up" to the parent.
 */
export class Entity extends React.Component<any, any> {
    constructor(props: EntityProps) {
        super(props);
    }

    /**
     * Render the text for the component
     * Anders: makes things neater. See option 2: http://devnacho.com/2016/02/15/different-ways-to-add-if-else-statements-in-JSX/
     * TODO: Should extract this logic into the Text component
     * @returns {any}
     */
    renderText(){
        const {rotation, width, height, type, id, x, y, color, kaavioType, customClass, isHighlighted, highlightedColor,
            text } = this.props;

        if(!text) return;
        // const alignSvgTextToXSvgText = {
        //     left: 0,
        //     center: width / 2,
        //     right: width,
        // };
        // const xSvgText = alignSvgTextToXSvgText[alignSvgText];
        //
        // const verticalAlignToYSvgText = {
        //     top: 0,
        //     middle: height / 2,
        //     bottom: height,
        // };
        // const ySvgText = verticalAlignToYSvgText[verticalAlign];

        // const textAttrs = {
        //     fill: 'currentColor',
        //     fontFamily: fontFamily,
        //     fontSize: fontSize,
        //     fontStyle: fontStyle,
        //     fontWeight: fontWeight
        // };
        // console.log(id)
        return (
           <Text id={`text-for-${id}`} key={`text-for-${id}`} textOverflow="clip" align="center"
                 verticalAlign="middle" className="textlabel"
                 text={text}/>
        )
    }

    render() {
        // Anders: Here, I only show the props that are required by the component.
        // Also use this.props instead of this.state
        // using let that = this should be redundant in ES6.
        // See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions

        const {rotation, width, height, type, id, x, y, color, kaavioType, customClass, isHighlighted, highlightedColor } = this.props;

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
                //child = <Edge {...this.props} />;
                break;
            case 'Marker':
                //child = <Marker {...this.props} />;
                break;
            case 'Group':
                //child = <Group {...this.props} />;
                break;
            default:
                throw new Error('The Kaavio type of " + entity.kaavioType + " does not exist. Please use one of ' +
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
                {this.renderText()}
            </g>
        )
    }
}