"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arc = require('./arc.svg');
var brace = require('./brace.svg');
var ellipse = require('./ellipse.svg');
var endoplasmicReticulum = require('./endoplasmic-reticulum.svg');
var hexagon = require('./hexagon.svg');
var golgiApparatus = require('./golgi-apparatus.svg');
var mimDegradation = require('./mim-degradation.svg');
var mitochondria = require('./mitochondria.svg');
var none = require('./none.svg');
var octagon = require('./octagon.svg');
var pentagon = require('./pentagon.svg');
var rectangle = require('./rectangle.svg');
var roundedRectangle = require('./rounded-rectangle.svg');
var sarcoplasmicReticulum = require('./sarcoplasmic-reticulum.svg');
var triangle = require('./triangle.svg');
// for more, see
// https://commons.wikimedia.org/wiki/Category:Icons
// https://github.com/wikipathways/pvjs/tree/609615339cfd2c3b862f4ccbff12ca4b56b35940/src/shape-library/symbols
var icons = {
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
};
icons.Circle = icons.Oval = icons.Ellipse;
icons.Complex = icons.Octagon;
// if we allow for true none, it's hard to do custom styling
icons.None = icons.Rectangle;
exports.default = icons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNyQyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUNwRSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDeEQsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDeEQsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ25DLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMzQyxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM3QyxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzVELElBQU0scUJBQXFCLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDdEUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFM0MsZ0JBQWdCO0FBQ2hCLG9EQUFvRDtBQUVwRCwrR0FBK0c7QUFDL0csSUFBSSxLQUFLLEdBQUc7SUFDWCxHQUFHLEVBQUU7UUFDSixFQUFFLEVBQUUsS0FBSztRQUNULEdBQUcsRUFBRSxHQUFHO0tBQ1I7SUFDRCxLQUFLLEVBQUU7UUFDTixFQUFFLEVBQUUsT0FBTztRQUNYLEdBQUcsRUFBRSxLQUFLO0tBQ1Y7SUFDRCx1QkFBdUIsRUFBRTtRQUN4QixFQUFFLEVBQUUsdUJBQXVCO1FBQzNCLEdBQUcsRUFBRSxvQkFBb0I7S0FDekI7SUFDRCxPQUFPLEVBQUU7UUFDUixFQUFFLEVBQUUsU0FBUztRQUNiLEdBQUcsRUFBRSxPQUFPO0tBQ1o7SUFDRCxpQkFBaUIsRUFBRTtRQUNsQixFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLEdBQUcsRUFBRSxjQUFjO0tBQ25CO0lBQ0QsY0FBYyxFQUFFO1FBQ2YsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixHQUFHLEVBQUUsY0FBYztLQUNuQjtJQUNELFlBQVksRUFBRTtRQUNiLEVBQUUsRUFBRSxjQUFjO1FBQ2xCLEdBQUcsRUFBRSxZQUFZO0tBQ2pCO0lBQ0QsSUFBSSxFQUFFO1FBQ0wsRUFBRSxFQUFFLE1BQU07UUFDVixHQUFHLEVBQUUsSUFBSTtLQUNUO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsRUFBRSxFQUFFLFNBQVM7UUFDYixHQUFHLEVBQUUsT0FBTztLQUNaO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsRUFBRSxFQUFFLFNBQVM7UUFDYixHQUFHLEVBQUUsT0FBTztLQUNaO0lBQ0QsUUFBUSxFQUFFO1FBQ1QsRUFBRSxFQUFFLFVBQVU7UUFDZCxHQUFHLEVBQUUsUUFBUTtLQUNiO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsRUFBRSxFQUFFLFdBQVc7UUFDZixHQUFHLEVBQUUsU0FBUztLQVFkO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDakIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixHQUFHLEVBQUUsZ0JBQWdCO0tBQ3JCO0lBQ0Qsd0JBQXdCLEVBQUU7UUFDekIsRUFBRSxFQUFFLHdCQUF3QjtRQUM1QixHQUFHLEVBQUUscUJBQXFCO0tBQzFCO0lBQ0QsUUFBUSxFQUFFO1FBQ1QsRUFBRSxFQUFFLFVBQVU7UUFDZCxHQUFHLEVBQUUsUUFBUTtLQUNiO0NBQ00sQ0FBQztBQUVULEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUM5Qiw0REFBNEQ7QUFDNUQsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBRTdCLGtCQUFlLEtBQUssQ0FBQyJ9