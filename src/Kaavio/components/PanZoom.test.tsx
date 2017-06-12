import { mount } from 'enzyme';
import { PanZoom } from './PanZoom';
import * as React from 'react';

describe('The Pan Zoom component', () => {

   it('should render without failing', () => {
       mount(<PanZoom showPanZoomControls={false} />);
   });
});