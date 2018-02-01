import * as React from "react";
import * as ReactDOM from "react-dom";
import { Arrow, TBar } from "kaavio/lib/drawers/markers/index";
export { Arrow, TBar } from "kaavio/lib/drawers/markers/index";

// TODO groupChildren were originally drawn as markerStart, but markerEnd is actually used much
// more often than markerStart. So for performance and simplicity reasons, it would be better that
// the groupChildren were drawn for markerEnd. When we redraw them, we can get rid of the extra g
// element and its transform for each markerDrawer below.

// NOTE: All markers put the groupChildren (visible marker contents) inside a group g element.
// Draw the groupChildren for markerEnd. If a marker is markerStart, Kaavio will rotate it 180deg.
export function MimBinding(backgroundColor, color) {
  const markerWidth = 12;
  const markerHeight = 12;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="MimBinding"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <rect
          x="0"
          y="5.4"
          width="2"
          height="1.2"
          stroke={backgroundColor}
          fill={backgroundColor}
        />
        <polygon points="12,12 0,6 12,0 5,6" strokeWidth="0" fill={color} />
      </g>
    ]
  };
}
export function MimNecessaryStimulation(backgroundColor, color) {
  const markerWidth = 16;
  const markerHeight = 12;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="MimNecessaryStimulation"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <rect
          x="0"
          y="5.4"
          width="2"
          height="1.2"
          stroke="none"
          fill={backgroundColor}
        />
        <line
          x1="14"
          y1="0"
          x2="14"
          y2="12"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <line x1="16" y1="6" x2="16" y2="6" stroke="none" fill="none" />
        <polygon
          points="0,6 9,11 9,1"
          stroke={color}
          strokeWidth="1"
          fill={backgroundColor}
        />
      </g>
    ]
  };
}
export function MimStimulation(backgroundColor, color) {
  const markerWidth = 12;
  const markerHeight = 12;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="Mimstimulation"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <rect
          x="0"
          y="5.4"
          width="2"
          height="1.2"
          stroke="none"
          fill={backgroundColor}
        />
        <line x1="12" y1="6" x2="12" y2="6" stroke="none" fill="none" />
        <polygon
          points="0,6 11,11 11,1"
          stroke={color}
          strokeWidth="1"
          fill={backgroundColor}
        />
      </g>
    ]
  };
}
export function MimModification(backgroundColor, color) {
  const markerWidth = 12;
  const markerHeight = 12;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="MimModification"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <rect
          x="0"
          y="5.4"
          width="2"
          height="1.2"
          stroke={backgroundColor}
          fill={backgroundColor}
        />
        <polygon points="0,6 11,11 11,1" strokeWidth="0" fill={color} />
      </g>
    ]
  };
}
export function MimCatalysis(backgroundColor, color) {
  const markerWidth = 12;
  const markerHeight = 12;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="MimCatalysis"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <circle
          cx="6"
          cy="6"
          r="5.3px"
          stroke={color}
          strokeWidth="1"
          fill={backgroundColor}
        />
      </g>
    ]
  };
}
export function MimCleavage(backgroundColor, color) {
  const markerWidth = 20;
  const markerHeight = 30;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="MimCleavage"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <rect
          x="0"
          y="14.3"
          width="18.4"
          height="1.4"
          stroke={backgroundColor}
          fill={backgroundColor}
        />
        <line
          x1="18"
          y1="14.5"
          x2="18"
          y2="30"
          stroke={color}
          strokeWidth="1"
        />
        <line x1="18" y1="30" x2="0" y2="0" stroke={color} strokeWidth="1" />
      </g>
    ]
  };
}

// This is the graphical representation of a covalent irreversible binding.
// See 7.2.3 from https://discover.nci.nih.gov/mim/formal_mim_spec.pdf
// PathVisio-Java doesn't do this quite right, because the arrowheads are
// not visible.
export function MimCovalentBond(backgroundColor, color) {
  const markerWidth = 12;
  const markerHeight = 12;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g key="MimCovalentBond">
        <path
          d="M 11,1 L 1,1 L 1,11 L 11,11"
          stroke={color}
          strokeWidth="1"
          fill={backgroundColor}
        />
      </g>
    ]
  };
}
export function MimTranscriptionTranslation(backgroundColor, color) {
  const markerWidth = 20;
  const markerHeight = 24;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="MimTranscriptionTranslation"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <rect
          x="0"
          y="11"
          width="12"
          height="2"
          stroke={backgroundColor}
          fill={backgroundColor}
        />
        <line
          x1="15"
          y1="12"
          x2="15"
          y2="5"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="15.5"
          y1="5"
          x2="8"
          y2="5"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="0,5 8,1 8,9"
          stroke={color}
          strokeWidth="1"
          fill={backgroundColor}
        />
      </g>
    ]
  };
}
export function MimGap(backgroundColor, color) {
  const markerWidth = 12;
  const markerHeight = 12;
  return {
    markerAttributes: {
      markerWidth: markerWidth,
      markerHeight: markerHeight
    },
    groupChildren: [
      <g
        key="MimGap"
        transform={`rotate(180, ${markerWidth / 2}, ${markerHeight / 2})`}
      >
        <rect
          x="0"
          y="5.3"
          width="8"
          height="1.4"
          stroke="none"
          fill={backgroundColor}
        />
      </g>
    ]
  };
}

export const MimInhibition = TBar;
export const MimConversion = Arrow;

// TODO the branching markerDrawers are currently just be copies of Arrow,
// because we didn't have time to draw them. But we should either delete
// these or else draw them properly.
export const MimBranchingLeft = Arrow;
export const MimBranchingRight = Arrow;
