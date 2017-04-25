import * as React from 'react';
//import * as RGBColor from 'rgbcolor';
export function doubleStroke({ source = 'SourceGraphic', strokeWidth = 1 }) {
    if (strokeWidth === 1) {
        return [
            React.createElement("feComposite", { in: source, in2: source, operator: "over", result: "doubleStrokedarkened" }),
            React.createElement("feMorphology", { in: source, operator: "dilate", radius: "1", result: "doubleStrokedilated" }),
            React.createElement("feComposite", { in: "doubleStrokedilated", in2: "doubleStrokedarkened", operator: "out", result: "doubleStrokeResult" }),
        ];
    }
    return [
        React.createElement("feMorphology", { in: source, operator: "dilate", radius: strokeWidth, result: "doubleStrokedilated" }),
        React.createElement("feComposite", { in: "doubleStrokedilated", operator: "xor", in2: source, result: "doubleStrokeResult" }),
    ];
}
export function round({ source = 'SourceGraphic', strokeWidth = 1 }) {
    // Can we handle a strokeWidth of 0.4?
    //const roundedStrokeWidth = Math.max(1, Math.round(strokeWidth || 1));
    // C' = slope * C + intercept
    // where C is the initial component (e.g., ‘feFuncR’),
    //       C' is the remapped component;
    //       both in the closed interval [0,1].
    // http://www.w3.org/TR/filter-effects/#feComponentTransferElement
    const darkInputSlope = 1.5;
    const darkInputIntercept = 0;
    const darkOutputSlope = 4;
    const darkOutputIntercept = -0.7;
    const normalizedWidth = 3;
    //const strokeWidthNormalizationOperator = (strokeWidth > 2) ? 'contract' : 'dilate';
    const strokeWidthNormalizationOperator = (strokeWidth > normalizedWidth) ? 'contract' : 'dilate';
    // strangely, this is what appears needed to normalize stroke width to a value
    // large enough to be blurred without being destroyed:
    const radius = strokeWidthNormalizationOperator === 'dilate' ? 1 : 0;
    // would have expected this, but it doesn't produce expected results:
    //const radius = (strokeWidthNormalizationOperator === 'dilate') ? (normalizedWidth - strokeWidth) : strokeWidth - normalizedWidth;
    //const radius = Math.abs((normalizedWidth - strokeWidth - 1) / 2 );
    //const radius = Math.abs(normalizedWidth - strokeWidth);
    const strokeWidthRevertOperator = strokeWidthNormalizationOperator === 'contract' ? 'dilate' : 'contract';
    /*
    return Math.max(normalizedWidth - strokeWidth, 1);
    let normalizedDark = [
        <feBlend in="SourceGraphic" in2="SourceGraphic" mode="multiply" result="rounddarkinput"/>
    ].concat(
        range(0, normalizedBlendIterations)
            .map(function(i) {
                return <feBlend in={`rounddarkinput${(i - 1)}`} in2={`rounddarkinput${i}`} mode="multiply" result="roundnormalizeddarkinput"/>;
            })
  )
    .concat([
        <feBlend in="rounddarkinput" in2="rounddarkinput" mode="multiply" result={`roundnormalizeddarkinput${normalizedBlendIterations}`}/>,
      ...
  //*/
    //*
    const normalizedDark = strokeWidth === 1 ? [
        React.createElement("feBlend", { in: "SourceGraphic", in2: "SourceGraphic", mode: "multiply", result: "rounddarkinput" }),
        React.createElement("feBlend", { in: "rounddarkinput", in2: "rounddarkinput", mode: "multiply", result: "roundnormalizeddarkinput" }),
        React.createElement("feMorphology", { in: "roundnormalizeddarkinput", operator: strokeWidthNormalizationOperator, radius: radius, result: "roundnormalized" }),
    ] : [
        React.createElement("feBlend", { in: "SourceGraphic", in2: "SourceGraphic", mode: "multiply", result: "roundnormalizeddarkinput" }),
        React.createElement("feMorphology", { in: "roundnormalizeddarkinput", operator: strokeWidthNormalizationOperator, radius: radius, result: "roundnormalized" }),
    ];
    //*/
    return normalizedDark
        .concat([
        //<feMorphology in="roundnormalizeddarkinput" operator={strokeWidthNormalizationOperator} radius={ normalizationRadius - 1/2 } result="roundnormalized" />,
        /*
        <feComponentTransfer in={source} colorInterpolationFilters="sRGB" result="rounddarkinput">
            <feFuncR type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
            <feFuncG type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
            <feFuncB type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
            <feFuncA type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
        </feComponentTransfer>,
        //*/
        /*
        <feComponentTransfer in={source} result="rounddarkinput">
            <feFuncR type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
            <feFuncG type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
            <feFuncB type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
            <feFuncA type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
        </feComponentTransfer>,
        //*/
        React.createElement("feGaussianBlur", { in: "roundnormalized", stdDeviation: 3 * 2, result: "roundblurred" }),
        React.createElement("feColorMatrix", { in: "roundblurred", mode: "matrix", values: `1   0   0   0   0
                            0   1   0   0   0
                            0   0   1   0   0
                            0   0   0  17  -3`, result: "roundcolored" }),
        React.createElement("feBlend", { in: "roundcolored", in2: "roundcolored", mode: "multiply", result: "rounddarkoutput" }),
        React.createElement("feBlend", { in: "rounddarkoutput", in2: "rounddarkoutput", mode: "multiply", result: "rounddarkeroutput" }),
        /*
        <feComponentTransfer in="rounddarkeroutput" result="roundoutput">
            <feFuncR type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
            <feFuncG type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
            <feFuncB type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
            <feFuncA type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
        </feComponentTransfer>,
        //*/
        React.createElement("feMorphology", { in: "rounddarkeroutput", operator: strokeWidthRevertOperator, radius: radius, result: "roundResult" }),
    ]);
}
export function generateFilterId(filterName, strokeWidth) {
    return [filterName, strokeWidth].join('-');
}
export class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
    }
    render() {
        const { id, children } = this.state;
        return React.createElement("filter", { id: id, key: id, children: children });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9GaWx0ZXJzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUcvQix1Q0FBdUM7QUFFdkMsTUFBTSx1QkFBdUIsRUFBQyxNQUFNLEdBQUcsZUFBZSxFQUFFLFdBQVcsR0FBRyxDQUFDLEVBQUM7SUFDdkUsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDO1lBQ04scUNBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixHQUFHO1lBQ3RGLHNDQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxxQkFBcUIsR0FBRztZQUN0RixxQ0FBYSxFQUFFLEVBQUMscUJBQXFCLEVBQUMsR0FBRyxFQUFDLHNCQUFzQixFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixHQUFHO1NBQzlHLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDO1FBQ04sc0NBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDLHFCQUFxQixHQUFHO1FBQ2hHLHFDQUFhLEVBQUUsRUFBQyxxQkFBcUIsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLG9CQUFvQixHQUFHO0tBQ2hHLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxnQkFBZ0IsRUFBQyxNQUFNLEdBQUcsZUFBZSxFQUFFLFdBQVcsR0FBRyxDQUFDLEVBQUM7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