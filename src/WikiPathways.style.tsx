/** Import */
import { style } from 'typestyle';

const kaavioBackgroundColor = 'white';
const kaavioColor = 'black';

export const containerClass = style({
	color: kaavioColor,
	backgroundColor: kaavioBackgroundColor,
});

export const diagramClass = style({
	backgroundColor: kaavioBackgroundColor,
});

export const viewportClass = style({
	[`.kaavio-viewport-background`]: {
		fill: kaavioBackgroundColor,
	},
	[`text`]: {
		fontSize: '14px',
		pointerEvents: 'none',
		fontFamily: 'Arial, Helvetica, sans-serif',
	}
});

export const citationClass = style({
  fill: 'gray',
  fontSize: '10px',
});

export const InfoBoxClass = style({
  fill: '#444',
	[` .citation.${citationClass}`]: {
		fontSize: '0px',
	},
});

export const CellularComponentClass = style({
	[` .Icon`]: {
		clipPath: 'url(#rounded-rectangle-clip-path)',
	},
  fill: 'transparent',
  stroke: '#808080',
  strokeWidth: 3,
});

export const DataNodeClass = style({
	[` .Icon`]: {
		clipPath: 'url(#rounded-rectangle-clip-path)',
		fill: '#518569',
	},
	[` .textlabel`]: {
		fill: '#fff',
	},
	[`&.Rna`]: {
		[`& .Icon`]: {
			fill: '#9453A7',
		},
	},
	[`&.Metabolite`]: {
		[`& .Icon`]: {
			clipPath: 'none',
			fill: '#0059b3',
		},
	},
	[`&.Pathway`]: {
		[`& .Icon`]: {
			clipPath: 'none',
			fill: kaavioBackgroundColor,
			// NOTE: Uncomment the line below to see an example
			// of adding a dropshadow to Pathway DataNodes:
			/*filter: 'drop-shadow( 2px 2px 2px #000 )', */
			strokeWidth: 0,
		},
		[`& .textlabel`]: {
			fill: '#75C95C',
		},
	},
});

export const LabelClass = style({
	[` .Icon`]: {
		clipPath: 'url(#rounded-rectangle-clip-path)',
		stroke: 'transparent',
		strokeWidth: 0,
		fill: 'transparent',
	},
	[` .textlabel`]: {
		fill: '#444',
	},
});

export const GroupComplexClass = style({
  fill: '#B4B464',
  fillOpacity: 0.1,
  stroke: '#808080',
});

export const GroupNoneClass = style({
  fill: '#B4B464',
  fillOpacity: 0.1,
  stroke: '#808080',
});

export const GroupPathwayClass = style({
  fill: '#008000',
  fillOpacity: 0.05,
  stroke: '#808080',
});

export const InteractionClass = style({
  stroke: '#000000',
});

export const InhibitionClass = style({
  stroke: 'red',
  strokeWidth: 1.3,
});
