const arc = require('./arc.svg');
const brace = require('./brace.svg');
const ellipse = require('./ellipse.svg');
const endoplasmicReticulum = require('./endoplasmic-reticulum.svg');
const hexagon = require('./hexagon.svg');
const golgiApparatus = require('./golgi-apparatus.svg');
const mimDegradation = require('./mim-degradation.svg');
const mitochondria = require('./mitochondria.svg');
const none = require('./none.svg');
const octagon = require('./octagon.svg');
const pentagon = require('./pentagon.svg');
const rectangle = require('./rectangle.svg');
const roundedRectangle = require('./rounded-rectangle.svg');
const sarcoplasmicReticulum = require('./sarcoplasmic-reticulum.svg');
const triangle = require('./triangle.svg');

// for more, see
// https://commons.wikimedia.org/wiki/Category:Icons

// https://github.com/wikipathways/pvjs/tree/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols
let icons = {
	Arc: {
		id: 'arc',
		url: arc
	},
	Brace: {
		id: 'brace',
		url: brace
	},
	'Endoplasmic Reticulum': {
		id: 'endoplasmic-reticulum',
		url: endoplasmicReticulum
	},
	Hexagon: {
		id: 'hexagon',
		url: hexagon
	},
	'Golgi Apparatus': {
		id: 'golgi-apparatus',
		url: golgiApparatus
	},
	MimDegradation: {
		id: 'mim-degradation',
		url: mimDegradation
	},
	Mitochondria: {
		id: 'mitochondria',
		url: mitochondria
	},
	None: {
		id: 'none',
		url: none
	},
	Ellipse: {
		id: 'ellipse',
		url: ellipse
	},
	Octagon: {
		id: 'octagon',
		url: octagon
	},
	Pentagon: {
		id: 'pentagon',
		url: pentagon
	},
	Rectangle: {
		id: 'rectangle',
		url: rectangle,
		//url: 'http://localhost:4522/icons/rectangle.svg'
		//url: 'https://cdn.rawgit.com/wikipathways/pvjs/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols/rectangle.svg'
		//url: 'http://clipartist.net/social/clipartist.net/B/base_tux_g_v_linux.svg#layer1',
		//url: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-address-book.svg#Layer_1'
		//url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg',
		//url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aim_Shiny_Icon.svg#svg2',
		//url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Svg_example2.svg',
	},
	RoundedRectangle: {
		id: 'rounded-rectangle',
		url: roundedRectangle,
	},
	'Sarcoplasmic Reticulum': {
		id: 'sarcoplasmic-reticulum',
		url: sarcoplasmicReticulum
	},
	Triangle: {
		id: 'triangle',
		url: triangle
	},
} as any;

icons.Circle = icons.Oval = icons.Ellipse;
icons.Complex = icons.Octagon;
// if we allow for true none, it's hard to do custom styling
icons.None = icons.Rectangle;

export default icons;
