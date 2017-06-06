import { Zoomer } from './zoomer';

describe('The zoomer functionality of the Manipulation API', () => {
    it('Should compute the correct zoom value for equal aspect ratio', () => {
        const zoomer = new Zoomer(null, null, null);

        const containerDims = {
            width: 500,
            height: 500
        };

        const entityDims = {
            width: 50,
            height: 50,
        };

        const zoomerVal = zoomer.computeZoom(containerDims, entityDims);
        expect(zoomerVal).toBe(10);
    });

    it('Should use a scaling factor', () => {
        const zoomer = new Zoomer(null, null, null);

        const containerDims = {
            width: 500,
            height: 500
        };

        const entityDims = {
            width: 50,
            height: 50,
        };

        expect(zoomer.computeZoom(containerDims, entityDims, 0.9)).toBe(9);
        expect(zoomer.computeZoom(containerDims, entityDims, 5)).toBe(50);
    });

    it('Should compute the zoom value for a wide entity', () => {
        const zoomer = new Zoomer(null, null, null);
        const containerDims = {
            width: 500,
            height: 500
        };

        const entityDims = {
            width: 100,
            height: 10,
        };

        expect(zoomer.computeZoom(containerDims, entityDims)).toBe(5);
    });

    it('Should compute the zoom value for a larger entity that the container', () => {
        const zoomer = new Zoomer(null, null, null);

        const containerDims = {
            width: 10,
            height: 50
        };

        const entityDims = {
            width: 500,
            height: 100,
        };

        expect(zoomer.computeZoom(containerDims, entityDims)).toBe(10/500);
    });

    it('Should compute a zoom value of one', () => {
        const zoomer = new Zoomer(null, null, null);

        const containerDims = {
            width: 500,
            height: 500
        };

        expect(zoomer.computeZoom(containerDims, containerDims)).toBe(1);
    })
});