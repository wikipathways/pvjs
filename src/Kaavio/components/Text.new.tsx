import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as _ from 'lodash'
import SvgText from 'svg-text';

export class Text extends React.Component<any, any> {
    svgRef;

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {id, text, fontColor, textAlign, outerWidth, outerHeight, verticalAlign, className, attrs,
            padding} = this.props;
        const svgElem = ReactDom.findDOMNode(this.svgRef);
        const opts = {
            text: text,
            element: svgElem,
            align: textAlign,
            outerWidth: outerWidth,
            outerHeight: outerHeight,
            verticalAlign: verticalAlign,
            className: className,
            textOverflow: 'ellipsis',
            attrs: attrs,
            padding: padding
        };
        new SvgText(opts);
    }

    render() {
        return (
            <g ref={svgRef => this.svgRef = svgRef} />
        )
    }
}