import { style } from 'typestyle';
// TODO: State in docs that Webpack/browserify will automatically bring styles in when bundling
import 'roboto-fontface/css/roboto/roboto-fontface.css';
const kaavioBackgroundColor = 'white';
const kaavioColor = 'black';
export const globalClass = style({
    fontFamily: 'Roboto',
    position: 'relative',
    minHeight: '30rem'
});
export const containerClass = style({
    color: kaavioColor,
    backgroundColor: kaavioBackgroundColor
});
export const diagramClass = style({
    backgroundColor: kaavioBackgroundColor,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lraVBhdGh3YXlzLnN0eWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1dpa2lQYXRod2F5cy5zdHlsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsQywrRkFBK0Y7QUFDL0YsT0FBTyxnREFBZ0QsQ0FBQztBQUV4RCxNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQztBQUN0QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFFNUIsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNoQyxVQUFVLEVBQUUsUUFBUTtJQUNwQixRQUFRLEVBQUUsVUFBVTtJQUNwQixTQUFTLEVBQUUsT0FBTztDQUNsQixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ25DLEtBQUssRUFBRSxXQUFXO0lBQ2xCLGVBQWUsRUFBRSxxQkFBcUI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNqQyxlQUFlLEVBQUUscUJBQXFCO0NBQ3RDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFO1FBQ2hDLElBQUksRUFBRSxxQkFBcUI7S0FDM0I7SUFDRCxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ1QsUUFBUSxFQUFFLE1BQU07UUFDaEIsYUFBYSxFQUFFLE1BQU07UUFDckIsV0FBVyxFQUFFLEtBQUs7S0FDbEI7Q0FDRCxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7SUFDM0MsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNYLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLElBQUksRUFBRSxhQUFhO1FBQ25CLE1BQU0sRUFBRSxTQUFT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