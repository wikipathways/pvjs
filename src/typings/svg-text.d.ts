declare module 'svg-text' {
	export interface SvgTextOpts {
			text: string;
			textOverflow: 'ellipsis' | 'clip' | string;
			x?: number; // default 0
			y?: number; // default 0
			width?: number; // default 'auto'
			height?: number; // default 'auto'
			maxWidth?: number; // default 'auto'
			maxHeight?: number; // default 'auto'
			outerWidth?: number; // default 'auto'
			outerHeight?: number; // default 'auto'
			maxLines?: number; // default Infinity
			align?: 'left' | 'center' | 'right'; // default 'left'
			verticalAlign?: 'top' | 'middle' | 'bottom'; // default 'top'
			// TODO the definition for document.getElementById incorrectly says it only returns HTMLElements,
			// but element and svg below should actually only be SVGElements. Adding HTMLElement is a kludge.
			element?: SVGElement | HTMLElement;
			svg?: SVGElement | HTMLElement;
			selectorNamespace?: string;
			className?: string;
			style?: any; // TODO what should the type be?
			styleElement?: HTMLElement; // default first style element
			attrs?: any; // TODO what should the type be?
			rect?: any;
			margin?: string | number;
	}

	export default class SvgTextClass {
		svg: SVGElement;
		style: HTMLElement;
		constructor(svgTextOpts)
		writeStyle(selector: string, css: any, style: HTMLElement)
		forIllustrator(textWeb: SVGElement, textAi: SVGElement, postScriptFontName: string) // textWeb should be SVG <text/> element
	}
}

// TODO SvgUtil types not declared. See https://github.com/dowjones/svg-text#svgutil-methods
