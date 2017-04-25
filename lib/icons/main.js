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
export default icons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDcEUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDM0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDN0MsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUM1RCxNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3RFLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTNDLGdCQUFnQjtBQUNoQixvREFBb0Q7QUFFcEQsK0dBQStHO0FBQy9HLElBQUksS0FBSyxHQUFHO0lBQ1gsR0FBRyxFQUFFO1FBQ0osRUFBRSxFQUFFLEtBQUs7UUFDVCxHQUFHLEVBQUUsR0FBRztLQUNSO0lBQ0QsS0FBSyxFQUFFO1FBQ04sRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsS0FBSztLQUNWO0lBQ0QsdUJBQXVCLEVBQUU7UUFDeEIsRUFBRSxFQUFFLHVCQUF1QjtRQUMzQixHQUFHLEVBQUUsb0JBQW9CO0tBQ3pCO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsRUFBRSxFQUFFLFNBQVM7UUFDYixHQUFHLEVBQUUsT0FBTztLQUNaO0lBQ0QsaUJBQWlCLEVBQUU7UUFDbEIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixHQUFHLEVBQUUsY0FBYztLQUNuQjtJQUNELGNBQWMsRUFBRTtRQUNmLEVBQUUsRUFBRSxpQkFBaUI7UUFDckIsR0FBRyxFQUFFLGNBQWM7S0FDbkI7SUFDRCxZQUFZLEVBQUU7UUFDYixFQUFFLEVBQUUsY0FBYztRQUNsQixHQUFHLEVBQUUsWUFBWTtLQUNqQjtJQUNELElBQUksRUFBRTtRQUNMLEVBQUUsRUFBRSxNQUFNO1FBQ1YsR0FBRyxFQUFFLElBQUk7S0FDVDtJQUNELE9BQU8sRUFBRTtRQUNSLEVBQUUsRUFBRSxTQUFTO1FBQ2IsR0FBRyxFQUFFLE9BQU87S0FDWjtJQUNELE9BQU8sRUFBRTtRQUNSLEVBQUUsRUFBRSxTQUFTO1FBQ2IsR0FBRyxFQUFFLE9BQU87S0FDWjtJQUNELFFBQVEsRUFBRTtRQUNULEVBQUUsRUFBRSxVQUFVO1FBQ2QsR0FBRyxFQUFFLFFBQVE7S0FDYjtJQUNELFNBQVMsRUFBRTtRQUNWLEVBQUUsRUFBRSxXQUFXO1FBQ2YsR0FBRyxFQUFFLFNBQVM7S0FRZDtJQUNELGdCQUFnQixFQUFFO1FBQ2pCLEVBQUUsRUFBRSxtQkFBbUI7UUFDdkIsR0FBRyxFQUFFLGdCQUFnQjtLQUNyQjtJQUNELHdCQUF3QixFQUFFO1FBQ3pCLEVBQUUsRUFBRSx3QkFBd0I7UUFDNUIsR0FBRyxFQUFFLHFCQUFxQjtLQUMxQjtJQUNELFFBQVEsRUFBRTtRQUNULEVBQUUsRUFBRSxVQUFVO1FBQ2QsR0FBRyxFQUFFLFFBQVE7S0FDYjtDQUNNLENBQUM7QUFFVCxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUMxQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDOUIsNERBQTREO0FBQzVELEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUU3QixlQUFlLEtBQUssQ0FBQyJ9