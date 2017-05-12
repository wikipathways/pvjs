import * as React from 'react';
import {TextProps} from "../typings";

export class Text extends React.Component<any, any> {

    constructor(props: TextProps){
        super(props);
    }

    render() {
        const {textContent = '', width, height, fontSize = 12, fontFamily = 'arial', fontStyle, fontWeight,
            color = '#141414'} = this.props;
        const lines = textContent.split('\n');
        const lineSpacing = 2; // In px

        const style = {
            fontSize: `${fontSize}px`,
            fontFamily,
            fontStyle,
            fontWeight
        };

        const SVGText = lines.map((content, i) =>
            <text key={`text-line-${i}`}
                  textAnchor="middle"
                  style={style}
                  fill={color}
                  dy={
                      /* Add an extra offset of the fontSize (plus a spacer) for each line*/
                      lines.length > 1 ? (fontSize + lineSpacing)*i : fontSize
                  }
            >{content}</text>
        );

        const SVGTextHeight: number = (lines.length > 1 ?
            (fontSize + lineSpacing)*lines.length : fontSize);

        const shiftX: number = width / 2;
        const shiftY: number = SVGTextHeight / 2;

        return (
            <g transform={`translate(${shiftX},${shiftY})`}>
                {SVGText}
            </g>
        )
    }
}