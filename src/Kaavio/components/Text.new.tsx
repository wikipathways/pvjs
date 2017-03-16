import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as _ from 'lodash'
import SvgText from 'svg-text';

export class Text extends React.Component<any, any> {
    svgRef: any;

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // Anders: I've removed a lot of the custom props in favour of fewer with some defaults.
        // I can't see a use case for many of the ones that were here before. What do you think?

        const {textContent = '', textAlign = 'center', className, fill = 'currentColor', fontFamily = 'serif',
            fontSize = '1rem', fontStyle = 'normal', fontWeight = 'normal', x=0, y=0} = this.props;

        const style = {
            fill: fill,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontStyle: fontStyle,
            fontWeight: fontWeight
        };

        // Use ReactDom to find the node. Don't access DOM directly through browser API.
        const svgElem = ReactDom.findDOMNode(this.svgRef);
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
        new SvgText(opts);
    }

    render() {
        return (
            <g ref={svgRef => this.svgRef = svgRef} />
        )
    }
}