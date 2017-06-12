import * as React from 'react';
import { shallow, render } from 'enzyme';
import { Kaavio } from './Kaavio';
import toJson from 'enzyme-to-json';

describe('Kaavio', () => {
    it('should render correctly', () => {
        const comp = shallow(<Kaavio customStyle={{}} entities={[]} />);
        expect(toJson(comp)).toMatchSnapshot();
    });

    it('Should render with an entity list', () => {
        const entities = [
            {
                height: 12,
                id: 'my-node',
                kaavioType: 'node',
                textContent: 'My node',
                color: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                width: 1.5,
                x: 0,
                y: 0
            }
        ];
        const comp = shallow(<Kaavio customStyle={{}} entities={entities} />);
        expect(toJson(comp)).toMatchSnapshot();
    });

    it('Should allow highlighted entities', () => {
        const entities = [
            {
                height: 12,
                id: 'my-node',
                kaavioType: 'node',
                textContent: 'My node',
                color: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                width: 1.5,
                x: 0,
                y: 0
            }
        ];
        const comp = shallow(<Kaavio customStyle={{}} entities={entities}
                                     highlightedEntities={[{entityId: 'my-node', color: 'red'}]} />);
        expect(toJson(comp)).toMatchSnapshot();
    });

    it('Should allow hiding entities', () => {
        const entities = [
            {
                height: 12,
                id: 'my-node',
                kaavioType: 'node',
                textContent: 'My node',
                color: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                width: 1.5,
                x: 0,
                y: 0
            }
        ];
        const comp = shallow(<Kaavio customStyle={{}} entities={entities}
                                     hiddenEntities={['my-node']} />);
        expect(toJson(comp)).toMatchSnapshot();
    });

    it('Should allow zoomed and panned entities', () => {
        const entities = [
            {
                height: 12,
                id: 'my-node',
                kaavioType: 'node',
                textContent: 'My node',
                color: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                width: 1.5,
                x: 0,
                y: 0
            }
        ];
        const comp = shallow(<Kaavio customStyle={{}} entities={entities}
                                     zoomedEntities={['my-node']} pannedEntities={['my-node']} />);
        expect(toJson(comp)).toMatchSnapshot();
    });
});