import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as _ from 'lodash'
import { CacheMeasurer, SvgContext, Wrapper, Writer  } from 'typesettable';
import {TextProps} from "../typings";

export class Text extends React.Component<any, any> {
    svgRef: any;

    constructor(props: TextProps){
        super(props);
    }

    componentDidMount(){
        // Anders: I've removed a lot of the custom props in favour of fewer with some defaults.
        // I can't see a use case for many of the ones that were here before. What do you think?

        const {textContent = '', textAlign = 'center', width = 200, height = 200}:TextProps = this.props;

        // Use ReactDom to find the node. Don't access DOM directly through browser API.
        const svgElem = ReactDom.findDOMNode(this.svgRef) as SVGElement;

        const writeOptions = {
            xAlign: textAlign,
            yAlign: "center" as "center",
            textRotation: 0,
            textShear: 0,
        };
        const context = new SvgContext(svgElem);
        const measurer = new CacheMeasurer(context);
        const wrapper = new Wrapper().allowBreakingWords(true);
        const writer = new Writer(measurer, context, wrapper);

        writer.write(textContent, width, height, writeOptions);
    }

    render() {
        return (
            <g ref={svgRef => this.svgRef = svgRef} />
        )
    }
}