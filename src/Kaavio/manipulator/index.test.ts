import { getManipulator } from './index';

describe('Manipulation API', () => {
    it('Should provide a factory function', () => {
        const manipulator = getManipulator(null, null, null);
        expect(manipulator).toBeDefined();
    });

    it('Should have the correct public API methods', () => {
        const man = getManipulator(null, null, null);
        expect(man.highlightOn).toBeDefined();
        expect(man.highlightOff).toBeDefined();
        expect(man.toggleHighlight).toBeDefined();
        expect(man.resetHighlighted).toBeDefined();
        expect(man.hide).toBeDefined();
        expect(man.show).toBeDefined();
        expect(man.resetHidden).toBeDefined();
        expect(man.zoom).toBeDefined();
        expect(man.zoomIn).toBeDefined();
        expect(man.zoomOut).toBeDefined();
        expect(man.zoomOn).toBeDefined();
        expect(man.resetZoom).toBeDefined();
        expect(man.pan).toBeDefined();
        expect(man.panTo).toBeDefined();
        expect(man.resetPan).toBeDefined();
        expect(man.reset).toBeDefined();
        expect(man.getEntities).toBeDefined();
    });
});
