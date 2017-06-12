import { Manipulator } from './index';

const testManipulationFunc = (funcName: string, param1?, param2?) => {
    const mockRenderFunc = jest.fn();
    const manipulator = new Manipulator(mockRenderFunc, {});
    expect(manipulator[funcName]).toBeDefined();
    manipulator[funcName].bind(this, param1, param2)();
    expect(mockRenderFunc).toHaveBeenCalled();
};

it('should have highlightOn', () => {
    testManipulationFunc('highlightOn', '1234', 'red')
});

it('should have highlightOff', () => {
   testManipulationFunc('highlightOff', '1234');
});

it('should have toggleHighlight', () => {
    testManipulationFunc('toggleHighlight', '1234', 'red');
});

it('should have resetHighlighted', () => {
    testManipulationFunc('resetHighlighted', ['1234']);
});

it('should have hide', () => {
    testManipulationFunc('hide', '1234');
});

it('should have show', () => {
    testManipulationFunc('show', '1234');
});

it('should have resetHidden', () => {
    testManipulationFunc('resetHidden', ['1234']);
});

it('should have zoomOn with one entity', () => {
    testManipulationFunc('zoomOn', '1234')
});

it('should have zoomOn with an array of entities', () => {
    testManipulationFunc('zoomOn', ['1234', '5678']);
});

it('should have panTo with one entity', () => {
    testManipulationFunc('panTo', '1234');
});

it('should have panTo with an array of entitites', () => {
    testManipulationFunc('panTo', ['1234', '5678'])
});

it('should have resetZoom', () => {
    testManipulationFunc('resetZoom');
});

it('should have resetPan', () => {
    testManipulationFunc('resetPan');
});

it('should have reset that resets pan, zoom, highlighted & hidden', () => {
    testManipulationFunc('reset');
});

it('should have getEntities', () => {
    testManipulationFunc('getEntities')
});