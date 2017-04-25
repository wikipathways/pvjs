import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as _ from 'lodash'
import { Typesetter } from 'typesettable';
import {TextProps} from "../typings";

export class Text extends React.Component<any, any> {
    svgRef: any;

    constructor(props: TextProps){
        super(props);
    }

    componentDidMount(){
        // Anders: I've removed a lot of the custom props in favour of fewer with some defaults.
        // I can't see a use case for many of the ones that were here before. What do you think?

        const {textContent = '', textAlign = 'center', className, fontColor = 'currentColor', fontFamily = 'serif',
            fontSize = '1rem', fontStyle = 'normal', fontWeight = 'normal', x=0, y=0} = this.props;

        const style = {
            fill: fontColor,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontStyle: fontStyle,
            fontWeight: fontWeight
        };

        // Use ReactDom to find the node. Don't access DOM directly through browser API.
        const svgElem = ReactDom.findDOMNode(this.svgRef) as SVGElement;

        const typesetter = Typesetter.svg(svgElem);
        const writeOptions = {
            xAlign: textAlign,
            yAlign: "middle",
            textRotation: 0,
            textShear: 0,
        };
        const opts = {
            text: textContent,
            element: svgElem,
            align: textAlign,
            verticalAlign: 'middle',
            className: className,
            textOverflow: 'ellipsis',
            style: style,
            x: x,
            y: y
        };

        typesetter.write(textContent, x, y);
    }

    render() {
        return (
            <g ref={svgRef => this.svgRef = svgRef} />
        )
    }
}