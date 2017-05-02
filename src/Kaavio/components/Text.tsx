import * as React from 'react';
import {TextProps} from "../typings";

export class Text extends React.Component<any, any> {

    constructor(props: TextProps){
        super(props);
    }

    render() {
        const {textContent = '', width, maxFontSize = 12, height} = this.props;
        const lines = textContent.split('\n');
        const lineSpacing = 2; // In px

        // Calculate the font size that will fit into the container
        // All sizes must be in pixels.
        // TODO: Handle other size formats (em, rem, in, mm etc.)
        const longestLineLength = lines.reduce((acc, val) => val.length > acc ? val.length : acc, 0);
        const fontSize = Math.min(width / longestLineLength, maxFontSize);

        const style = {
            fontSize: `${fontSize}px`
        };

        const SVGText = lines.map((content, i) =>
            <text key={`text-line-${i}`}
                  textAnchor="middle"
                  style={style}
                  dy={
                      /* Add an extra offset of the fontSize (plus a spacer) for each line*/
                      lines.length > 1 ? (fontSize + lineSpacing)*i : fontSize
                  }
            >{content}</text>
        );

        const SVGTextHeight: number = (lines.length > 1 ?
            (fontSize + lineSpacing)*lines.length : fontSize);

        const shiftX: number = width / 2;
        const shiftY: number = (height - SVGTextHeight) / 2;

        return (
            <g transform={`translate(${shiftX},${shiftY})`}>
                {SVGText}
            </g>
        )
    }
}