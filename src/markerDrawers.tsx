import * as React from 'react';
import * as ReactDOM from 'react-dom';

// TODO groupChildren were originally drawn as markerStart, but markerEnd is actually used much
// more often than markerStart. So for performance and simplicity reasons, it would be better that
// the groupChildren were drawn for markerEnd. When we redraw them, we can get rid of the extra g
// element and its transform for each markerDrawer below.

// NOTE: All markers put the groupChildren (visible marker contents) inside a group g element.
// Draw the groupChildren for markerEnd. If a marker is markerStart, Kaavio will rotate it 180deg.
let markerDrawers: any = {
	Arrow: function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="Arrow" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke={backgroundColor} fill={backgroundColor}/>
					<polygon points="12,11 0,6 12,1" strokeWidth="0" fill={color}/>
				</g>
			],
		};
	},
	'mim-binding': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-binding" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke={backgroundColor} fill={backgroundColor}/>
					<polygon points="12,12 0,6 12,0 5,6" strokeWidth="0" fill={color}/>
				</g>
			],
		};
	},
	'mim-necessary-stimulation': function(backgroundColor, color) {
		const markerWidth = 16;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-necessary-stimulation" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke="none" fill={backgroundColor}/>
					<line x1="14" y1="0" x2="14" y2="12" stroke={color} strokeWidth="1" fill="none"/>
					<line x1="16" y1="6" x2="16" y2="6" stroke="none" fill="none"/>
					<polygon points="0,6 9,11 9,1" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-stimulation': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-stimulation" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke="none" fill={backgroundColor}/>
					<line x1="12" y1="6" x2="12" y2="6" stroke="none" fill="none"/>
					<polygon points="0,6 11,11 11,1" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-modification': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-modification" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.4" width="2" height="1.2" stroke={backgroundColor} fill={backgroundColor}/>
					<polygon points="0,6 11,11 11,1" strokeWidth="0" fill={color}/>
				</g>
			],
		};
	},
	'mim-catalysis': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-catalysis" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<circle cx="6" cy="6" r="5.3px" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-cleavage': function(backgroundColor, color) {
		const markerWidth = 20;
		const markerHeight = 30;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-cleavage" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="14.3" width="18.4" height="1.4" stroke={backgroundColor} fill={backgroundColor}/>
					<line x1="18" y1="14.5" x2="18" y2="30" stroke={color} strokeWidth="1"/>
					<line x1="18" y1="30" x2="0" y2="0" stroke={color} strokeWidth="1"/>
				</g>
			],
		};
	},
	'mim-covalent-bond': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-covalent-bond" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="0" width="0" height="0" stroke={backgroundColor} strokeWidth="0" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-transcription-translation': function(backgroundColor, color) {
		const markerWidth = 20;
		const markerHeight = 24;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-transcription-translation" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="11" width="12" height="2" stroke={backgroundColor} fill={backgroundColor}/>
					<line x1="15" y1="12" x2="15" y2="5" stroke={color} strokeWidth="1" fill="none"/>
					<line x1="15.5" y1="5" x2="8" y2="5" stroke={color} strokeWidth="1" fill="none"/>
					<polygon points="0,5 8,1 8,9" stroke={color} strokeWidth="1" fill={backgroundColor}/>
				</g>
			],
		};
	},
	'mim-gap': function(backgroundColor, color) {
		const markerWidth = 12;
		const markerHeight = 12;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="mim-gap" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="5.3" width="8" height="1.4" stroke="none" fill={backgroundColor}/>
				</g>
			],
		};
	},
	TBar: function(backgroundColor, color) {
		const markerWidth = 10;
		const markerHeight = 20;
		return {
			markerAttributes: {
				markerWidth: markerWidth,
				markerHeight: markerHeight,
			},
			groupChildren: [
				<g key="TBar" transform={`rotate(180, ${ markerWidth / 2 }, ${ markerHeight / 2 })`}>
					<rect x="0" y="9" width="8" height="2" fill={backgroundColor}/>
					<line x="0" y="0" width="12" height="12" stroke={color} strokeWidth="1.8" x1="7" y1="0" x2="7" y2="20"/>
				</g>
			],
		};
	},
};
markerDrawers['mim-inhibition'] = markerDrawers.TBar;
markerDrawers['mim-conversion'] = markerDrawers.Arrow;

// TODO the branching markerDrawers are currently just be copies of Arrow,
// because we didn't have time to draw them. But we should either delete
// these or else draw them properly.
markerDrawers['mim-branching-left'] = markerDrawers.Arrow;
markerDrawers['mim-branching-right'] = markerDrawers.Arrow;

export default markerDrawers;
