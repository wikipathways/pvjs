import * as React from 'react';
import { shallow } from 'enzyme';
import { Kaavio } from './Kaavio';

describe('Kaavio', () => {
    it('should render without failing', () => {
        shallow(<Kaavio customStyle={{}} entities={[]} />);
    });
});