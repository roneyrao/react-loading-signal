import { shallow } from 'enzyme';
import React from 'react';
import Blobs from './blobs';

test('renders properly', () => {
  expect(shallow(<Blobs />)).toMatchSnapshot();
});
