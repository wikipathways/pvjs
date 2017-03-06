// NOTE one difference from SvgText API:
// the user specifies "id" and "svgId", not "element" and "svg"

// NOTE other possibly relevant libraries:
// https://www.npmjs.com/package/jsyg-texteditor
// https://www.npmjs.com/package/svg-text-wrap: Give a string, a desired width, and some svg style attributes, get back an array
// https://www.npmjs.com/package/svg-text-size: Get a {width, height} given a text string (or array) and svg attributes
// https://github.com/reactjs/react-art/blob/master/src/ReactART.js#L539
// https://github.com/ariutta/cross-platform-text/blob/master/lib/svg.js

import { omit } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// TODO why do I need to specify importing SvgTextOpts?
import SvgText, { SvgTextOpts } from 'svg-text';
 
export interface TextOpts extends SvgTextOpts {
	id: string;
	element: undefined;
	svg: undefined;
}

export default class Text extends React.Component<any, any> {
	svgText: SvgText; // TODO this should be instance. Is it?
  constructor(props: TextOpts) {
		super(props);
		this.state = {...props};
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
		const { id, svgId } = state;
		const opts = omit(omit(state, 'id'), 'svgId') as SvgTextOpts;
		opts.element = document.getElementById(id);
		opts.svg = document.getElementById(svgId);
		that.svgText = new SvgText(opts);
	}

	componentWillUnmount() {
		// destroy SvgText instance
	}

  render() {
		// Since this is always the same, React won't try to change the contents
		return <g id={this.state.id}/>;
	}
}
