import { style } from 'typestyle';

const kaavioBackgroundColor = 'white';
const kaavioColor = 'black';

export const globalClass = style({
	fontFamily: 'Roboto',
	position: 'relative',
	width: '100%',
	height: '100%',
	overflow: 'hidden'
});

export const containerClass = style({
	color: kaavioColor,
	backgroundColor: kaavioBackgroundColor,
	width: '100%',
	height: '100%'
});

export const diagramClass = style({
	backgroundColor: kaavioBackgroundColor,
	width: '100%',
	height: '100%'
});

export const viewportClass = style({
	[`.kaavio-viewport-background`]: {
		fill: kaavioBackgroundColor,
	},
	[`text`]: {
		fontSize: '12px',
		pointerEvents: 'none',
		strokeWidth: '0px',
	}
});

export const CellularComponentClass = style({
	[` .Icon`]: {
		clipPath: 'none',
		fill: 'transparent',
		stroke: '#808080',
		strokeWidth: 3,
	},
});

export const DataNodeClass = style({
	[` .Icon`]: {
		clipPath: 'url(#rounded-rectangle-clip-path)',
		fill: '#2BDA82',
		strokeWidth: '0px',
	},
	[` .textlabel`]: {
		fill: '#fff',
	},
	[` .Highlighted`]: {
		opacity: 0.6,
		clipPath: 'url(#rounded-rectangle-clip-path)',
		strokeWidth: '0px'
	},
	[`&.Rna`]: {
		[`& .Icon`]: {
			fill: '#9453A7',
		}
	},
	[`&.Metabolite`]: {
		[`& .Icon`]: {
			clipPath: 'none',
			fill: '#0099FF',
		},
		[`& .Highlighted`]: {
			clipPath: 'none'
		}
	},
	[`&.Pathway`]: {
		[`& .Icon`]: {
			clipPath: 'none',
			fill: kaavioBackgroundColor,
			// NOTE: Uncomment the line below to see an example
			// of adding a dropshadow to Pathway DataNodes:
			/*filter: 'drop-shadow( 2px 2px 2px #000 )', */
			strokeWidth: '0px',
		},
		[`& .textlabel`]: {
			fill: '#75C95C',
		},
		[`& .Highlighted`]: {
			clipPath: 'none'
		}
	},
});

export const LabelClass = style({
	[` .Icon`]: {
		clipPath: 'url(#rounded-rectangle-clip-path)',
		stroke: 'transparent',
		strokeWidth: '0px',
		fill: 'transparent',
	},
	[` .textlabel`]: {
		fill: '#444',
	},
});

export const StateClass = style({
  fill: '#009999',
  stroke: '#fff',
  strokeWidth: 1,
});

export const GroupGroupClass = style({
  fill: 'transparent',
  strokeWidth: '0px',
});

export const GroupComplexClass = style({
  	[`& > .Icon`]: {
		fill: '#B4B464',
		fillOpacity: 0.1,
		stroke: '#808080',
	}
});

export const GroupNoneClass = style({
	[`& > .Icon`]: {
		fill: '#B4B464',
		fillOpacity: 0.1,
  		stroke: '#808080',	
	}
});

export const GroupPathwayClass = style({
	[`& > .Icon`]: {
		fill: '#008000',
		fillOpacity: 0.05,
  		stroke: '#808080',
	}
});

export const InteractionClass = style({
  stroke: '#000000',
});

export const InhibitionClass = style({
  stroke: 'red',
  strokeWidth: 1.3,
});

export const CitationClass = style({
	[` .Icon`]: {
		fill: 'none',
		strokeWidth: '0px',
	},
	[` .textlabel`]: {
		fill: 'gray',
		fontSize: '10px',
	},
});

export const InfoBoxClass = style({
  fill: '#444',
	[`${CitationClass}`]: {
		fontSize: '0px',
	},
});
