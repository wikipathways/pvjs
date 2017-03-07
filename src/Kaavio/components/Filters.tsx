import { fill, flatten, last, range } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

//import * as RGBColor from 'rgbcolor';
 
export function doubleStroke({source = 'SourceGraphic', strokeWidth = 1}) {
	if (strokeWidth === 1) {
		return [
			<feComposite in={source} in2={source} operator="over" result="doubleStrokedarkened" />,
			<feMorphology in={source} operator="dilate" radius="1" result="doubleStrokedilated" />,
			<feComposite in="doubleStrokedilated" in2="doubleStrokedarkened" operator="out" result="doubleStrokeResult" />,
		];
	}
	 
	return [
		<feMorphology in={source} operator="dilate" radius={strokeWidth} result="doubleStrokedilated" />,
		<feComposite in="doubleStrokedilated" operator="xor" in2={source} result="doubleStrokeResult" />,
	];
}

export function round({source = 'SourceGraphic', strokeWidth = 1}) {
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
		<feBlend in="SourceGraphic" in2="SourceGraphic" mode="multiply" result="rounddarkinput"/>,
		<feBlend in="rounddarkinput" in2="rounddarkinput" mode="multiply" result="roundnormalizeddarkinput"/>,
		<feMorphology in="roundnormalizeddarkinput" operator={strokeWidthNormalizationOperator} radius={ radius } result="roundnormalized" />,
	] : [
		<feBlend in="SourceGraphic" in2="SourceGraphic" mode="multiply" result="roundnormalizeddarkinput"/>,
		<feMorphology in="roundnormalizeddarkinput" operator={strokeWidthNormalizationOperator} radius={ radius } result="roundnormalized" />,
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
		<feGaussianBlur in="roundnormalized" stdDeviation={3 * 2} result="roundblurred" />,
    <feColorMatrix in="roundblurred" mode="matrix"
                   values={`1   0   0   0   0
                            0   1   0   0   0
                            0   0   1   0   0
                            0   0   0  17  -3`}
                   result="roundcolored" />,
		<feBlend in="roundcolored" in2="roundcolored" mode="multiply" result="rounddarkoutput"/>,
		<feBlend in="rounddarkoutput" in2="rounddarkoutput" mode="multiply" result="rounddarkeroutput"/>,
		/*
		<feComponentTransfer in="rounddarkeroutput" result="roundoutput">
			<feFuncR type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
			<feFuncG type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
			<feFuncB type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
			<feFuncA type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
		</feComponentTransfer>,
	 	//*/
		<feMorphology in="rounddarkeroutput" operator={strokeWidthRevertOperator} radius={ radius } result="roundResult" />,
	]);
}

export function generateFilterId(filterName, strokeWidth) {
	return [filterName, strokeWidth].join('-');
}

export class Filter extends React.Component<any, any> {
  constructor(props) {
		super(props);
		this.state = {...props};
  }
	render() {
		const { id, children } = this.state;
		return <filter id={id} key={id} children={children} />;
	}
}
