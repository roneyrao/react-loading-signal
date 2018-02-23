import React from 'react';
import Blobs from './blobs';
import { shallow } from 'enzyme';

test('renders properly', () => {
  expect(shallow(<Blobs />)).toMatchSnapshot();
});
