// NOTE other possibly relevant libraries:
// https://www.npmjs.com/package/jsyg-texteditor
// https://www.npmjs.com/package/svg-text-wrap: Give a string, a desired width, and some svg style attributes, get back an array
// https://www.npmjs.com/package/svg-text-size: Get a {width, height} given a text string (or array) and svg attributes
// https://github.com/reactjs/react-art/blob/master/src/ReactART.js#L539
// https://github.com/ariutta/cross-platform-text/blob/master/lib/svg.js

import {omit} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Typesetter} from 'typesettable';
 
export default class Text extends React.Component<any, any> {
  constructor(props: any) {
		super(props);
		const { entityId } = props;
		this.state = {svgTextElementContainerId: `text-for-${entityId}`, ...omit(props, 'entityId')};
  }

//	componentWillReceiveProps(nextProps) {
//		let that = this;
//		const prevProps = that.props;
//		forOwn(nextProps, function(prop, key) {
//			if (prop && JSON.stringify(prevProps[key]) !== JSON.stringify(prop)) {
//				that.setState({
//					[key]: prop,
//				});
//			}
//		});
//	}

  componentDidMount() {
		let that = this;
		const state = that.state;
		const { svgTextElementContainerId, svgId, width, height, padding, textContent, xAlign, yAlign } = state;

		//const svgTypesetter = Typesetter.svg(document.getElementById(svgTextElementContainerId), className?: string, addTitleElement?: boolean)
		const svgTypesetter = Typesetter.svg(document.querySelector('#' + svgTextElementContainerId) as SVGElement)

		svgTypesetter.write(textContent, width, height, {
			xAlign: xAlign,
			yAlign: yAlign,
			textRotation: 0,
			textShear: 0,
		});
	}

	componentWillUnmount() {
		// destroy SvgText instance
	}

  render() {
		// Since this is always the same, React won't try to change the contents
		return <g id={this.state.svgTextElementContainerId} />;
	}
}
