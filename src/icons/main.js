"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = icons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckMsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLElBQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDcEUsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3hELElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3hELElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ25ELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDM0MsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDN0MsSUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUM1RCxJQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3RFLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTNDLGdCQUFnQjtBQUNoQixvREFBb0Q7QUFFcEQsK0dBQStHO0FBQy9HLElBQUksS0FBSyxHQUFHO0lBQ1gsR0FBRyxFQUFFO1FBQ0osRUFBRSxFQUFFLEtBQUs7UUFDVCxHQUFHLEVBQUUsR0FBRztLQUNSO0lBQ0QsS0FBSyxFQUFFO1FBQ04sRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsS0FBSztLQUNWO0lBQ0QsdUJBQXVCLEVBQUU7UUFDeEIsRUFBRSxFQUFFLHVCQUF1QjtRQUMzQixHQUFHLEVBQUUsb0JBQW9CO0tBQ3pCO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsRUFBRSxFQUFFLFNBQVM7UUFDYixHQUFHLEVBQUUsT0FBTztLQUNaO0lBQ0QsaUJBQWlCLEVBQUU7UUFDbEIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixHQUFHLEVBQUUsY0FBYztLQUNuQjtJQUNELGNBQWMsRUFBRTtRQUNmLEVBQUUsRUFBRSxpQkFBaUI7UUFDckIsR0FBRyxFQUFFLGNBQWM7S0FDbkI7SUFDRCxZQUFZLEVBQUU7UUFDYixFQUFFLEVBQUUsY0FBYztRQUNsQixHQUFHLEVBQUUsWUFBWTtLQUNqQjtJQUNELElBQUksRUFBRTtRQUNMLEVBQUUsRUFBRSxNQUFNO1FBQ1YsR0FBRyxFQUFFLElBQUk7S0FDVDtJQUNELE9BQU8sRUFBRTtRQUNSLEVBQUUsRUFBRSxTQUFTO1FBQ2IsR0FBRyxFQUFFLE9BQU87S0FDWjtJQUNELE9BQU8sRUFBRTtRQUNSLEVBQUUsRUFBRSxTQUFTO1FBQ2IsR0FBRyxFQUFFLE9BQU87S0FDWjtJQUNELFFBQVEsRUFBRTtRQUNULEVBQUUsRUFBRSxVQUFVO1FBQ2QsR0FBRyxFQUFFLFFBQVE7S0FDYjtJQUNELFNBQVMsRUFBRTtRQUNWLEVBQUUsRUFBRSxXQUFXO1FBQ2YsR0FBRyxFQUFFLFNBQVM7S0FRZDtJQUNELGdCQUFnQixFQUFFO1FBQ2pCLEVBQUUsRUFBRSxtQkFBbUI7UUFDdkIsR0FBRyxFQUFFLGdCQUFnQjtLQUNyQjtJQUNELHdCQUF3QixFQUFFO1FBQ3pCLEVBQUUsRUFBRSx3QkFBd0I7UUFDNUIsR0FBRyxFQUFFLHFCQUFxQjtLQUMxQjtJQUNELFFBQVEsRUFBRTtRQUNULEVBQUUsRUFBRSxVQUFVO1FBQ2QsR0FBRyxFQUFFLFFBQVE7S0FDYjtDQUNNLENBQUM7QUFFVCxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUMxQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDOUIsNERBQTREO0FBQzVELEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7QUFFN0Isa0JBQWUsS0FBSyxDQUFDIn0=