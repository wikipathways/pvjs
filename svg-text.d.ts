// TODO how does CSSProperties compare to CSSStyleDeclaration from typescript's lib.dom.d.ts?
import {CSSProperties} from 'typestyle/lib/types';

interface NonNestedPlainObject {
		// TODO should this include null and/or undefined?
		[key: string]: string | number | boolean;
}

export interface SvgTextOpts {
		text: string;

		// TODO the definition for document.getElementById incorrectly says it only returns HTMLElement,
		// but 'element' below should really be just SVGElement. The union with HTMLElement is a kludge.
		element?: SVGElement | HTMLElement;
		// 'svg' below should really be just SVGSVGElement. See comment above.
		svg?: SVGSVGElement | HTMLElement;

		x?: number; // default: 0
		y?: number; // default: 0
		width?: number; // default: 'auto'
		height?: number; // default: 'auto'
		maxWidth?: number; // default: 'auto'
		maxHeight?: number; // default: 'auto'
		outerWidth?: number; // default: 'auto'
		outerHeight?: number; // default: 'auto'
		maxLines?: number; // default: Infinity
		align?: 'left' | 'center' | 'right'; // default: 'left'
		verticalAlign?: 'top' | 'middle' | 'bottom'; // default: 'top'
		textOverflow: 'ellipsis' | 'clip' | string;
		selectorNamespace?: string;
		className?: string;
		style?: CSSProperties;
		styleElement?: HTMLStyleElement; // default: first style element
		attrs?: NonNestedPlainObject; // TODO what should the type be?
		rect?: NonNestedPlainObject;
		padding?: number | string;
		margin?: number | string;
}

export default class SvgText {
		svg: SVGSVGElement;
		style: HTMLStyleElement;
		constructor(svgTextOpts: SvgTextOpts)
		writeStyle(selector: string, css: CSSProperties, style: HTMLStyleElement)
		forIllustrator(textWeb: SVGTextElement, textAi: SVGTextElement, postScriptFontName: string)
}

export interface SvgUtil {
		toJs(prop: string): keyof CSSProperties;
		toCss(prop: keyof CSSProperties): string;

		// TODO neither lib.dom.ts nor typestyle types have the CSS formatted properties, e.g.,
		// {"vertical-align": 'baseline' | 'sub' | ...},
		// but that's what NonNestedPlainObject should actually be here.
		normalizeKeys(object: CSSProperties | NonNestedPlainObject, style: 'css' | 'js'): NonNestedPlainObject | CSSProperties; // style default: 'css'


		// TODO this should actually be something like "keyof SVGElementTagNameMap", but that doesn't exist in lib.dom.d.ts
		createElement<K extends keyof ElementTagNameMap>(name: K, attrs: NonNestedPlainObject): ElementTagNameMap[K] & SVGElement;

		isPosNum(value: any): boolean;
		minNum(...params: any[]): number | 'auto';
		maxNum(...params: any[]): number | 'auto';
		autoNum(value: string | number, altNum: number): number;
		toArrayLen4(value: number | undefined | null | string): [number, number, number, number];
}
