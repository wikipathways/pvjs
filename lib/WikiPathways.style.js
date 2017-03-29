"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typestyle_1 = require("typestyle");
var kaavioBackgroundColor = 'white';
var kaavioColor = 'black';
exports.containerClass = typestyle_1.style({
    color: kaavioColor,
    backgroundColor: kaavioBackgroundColor,
});
exports.diagramClass = typestyle_1.style({
    backgroundColor: kaavioBackgroundColor,
});
exports.viewportClass = typestyle_1.style((_a = {},
    _a[".kaavio-viewport-background"] = {
        fill: kaavioBackgroundColor,
    },
    _a["text"] = {
        fontSize: '12px',
        pointerEvents: 'none',
        strokeWidth: '0px',
    },
    _a));
exports.CellularComponentClass = typestyle_1.style((_b = {},
    _b[" .Icon"] = {
        clipPath: 'none',
        fill: 'transparent',
        stroke: '#808080',
        strokeWidth: 3,
    },
    _b));
exports.DataNodeClass = typestyle_1.style((_c = {},
    _c[" .Icon"] = {
        clipPath: 'url(#rounded-rectangle-clip-path)',
        fill: '#2BDA82',
        strokeWidth: '0px',
    },
    _c[" .textlabel"] = {
        fill: '#fff',
    },
    _c[" .Highlighted"] = {
        opacity: 0.6,
        clipPath: 'url(#rounded-rectangle-clip-path)',
        strokeWidth: '0px'
    },
    _c["&.Rna"] = (_d = {},
        _d["& .Icon"] = {
            fill: '#9453A7',
        },
        _d),
    _c["&.Metabolite"] = (_e = {},
        _e["& .Icon"] = {
            clipPath: 'none',
            fill: '#0099FF',
        },
        _e["& .Highlighted"] = {
            clipPath: 'none'
        },
        _e),
    _c["&.Pathway"] = (_f = {},
        _f["& .Icon"] = {
            clipPath: 'none',
            fill: kaavioBackgroundColor,
            // NOTE: Uncomment the line below to see an example
            // of adding a dropshadow to Pathway DataNodes:
            /*filter: 'drop-shadow( 2px 2px 2px #000 )', */
            strokeWidth: '0px',
        },
        _f["& .textlabel"] = {
            fill: '#75C95C',
        },
        _f["& .Highlighted"] = {
            clipPath: 'none'
        },
        _f),
    _c));
exports.LabelClass = typestyle_1.style((_g = {},
    _g[" .Icon"] = {
        clipPath: 'url(#rounded-rectangle-clip-path)',
        stroke: 'transparent',
        strokeWidth: '0px',
        fill: 'transparent',
    },
    _g[" .textlabel"] = {
        fill: '#444',
    },
    _g));
exports.StateClass = typestyle_1.style({
    fill: '#009999',
    stroke: '#fff',
    strokeWidth: 1,
});
exports.GroupGroupClass = typestyle_1.style({
    fill: 'transparent',
    strokeWidth: '0px',
});
exports.GroupComplexClass = typestyle_1.style((_h = {},
    _h["& > .Icon"] = {
        fill: '#B4B464',
        fillOpacity: 0.1,
        stroke: '#808080',
    },
    _h));
exports.GroupNoneClass = typestyle_1.style((_j = {},
    _j["& > .Icon"] = {
        fill: '#B4B464',
        fillOpacity: 0.1,
        stroke: '#808080',
    },
    _j));
exports.GroupPathwayClass = typestyle_1.style((_k = {},
    _k["& > .Icon"] = {
        fill: '#008000',
        fillOpacity: 0.05,
        stroke: '#808080',
    },
    _k));
exports.InteractionClass = typestyle_1.style({
    stroke: '#000000',
});
exports.InhibitionClass = typestyle_1.style({
    stroke: 'red',
    strokeWidth: 1.3,
});
exports.CitationClass = typestyle_1.style((_l = {},
    _l[" .Icon"] = {
        fill: 'none',
        strokeWidth: '0px',
    },
    _l[" .textlabel"] = {
        fill: 'gray',
        fontSize: '10px',
    },
    _l));
exports.InfoBoxClass = typestyle_1.style((_m = {
        fill: '#444'
    },
    _m["" + exports.CitationClass] = {
        fontSize: '0px',
    },
    _m));
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lraVBhdGh3YXlzLnN0eWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1dpa2lQYXRod2F5cy5zdHlsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBa0M7QUFFbEMsSUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUM7QUFDdEMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBRWYsUUFBQSxjQUFjLEdBQUcsaUJBQUssQ0FBQztJQUNuQyxLQUFLLEVBQUUsV0FBVztJQUNsQixlQUFlLEVBQUUscUJBQXFCO0NBQ3RDLENBQUMsQ0FBQztBQUVVLFFBQUEsWUFBWSxHQUFHLGlCQUFLLENBQUM7SUFDakMsZUFBZSxFQUFFLHFCQUFxQjtDQUN0QyxDQUFDLENBQUM7QUFFVSxRQUFBLGFBQWEsR0FBRyxpQkFBSztJQUNqQyxHQUFDLDZCQUE2QixJQUFHO1FBQ2hDLElBQUksRUFBRSxxQkFBcUI7S0FDM0I7SUFDRCxHQUFDLE1BQU0sSUFBRztRQUNULFFBQVEsRUFBRSxNQUFNO1FBQ2hCLGFBQWEsRUFBRSxNQUFNO1FBQ3JCLFdBQVcsRUFBRSxLQUFLO0tBQ2xCO1FBQ0EsQ0FBQztBQUVVLFFBQUEsc0JBQXNCLEdBQUcsaUJBQUs7SUFDMUMsR0FBQyxRQUFRLElBQUc7UUFDWCxRQUFRLEVBQUUsTUFBTTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixXQUFXLEVBQUUsQ0FBQztLQUNkO1FBQ0EsQ0FBQztBQUVVLFFBQUEsYUFBYSxHQUFHLGlCQUFLO0lBQ2pDLEdBQUMsUUFBUSxJQUFHO1FBQ1gsUUFBUSxFQUFFLG1DQUFtQztRQUM3QyxJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSxLQUFLO0tBQ2xCO0lBQ0QsR0FBQyxhQUFhLElBQUc7UUFDaEIsSUFBSSxFQUFFLE1BQU07S0FDWjtJQUNELEdBQUMsZUFBZSxJQUFHO1FBQ2xCLE9BQU8sRUFBRSxHQUFHO1FBQ1osUUFB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