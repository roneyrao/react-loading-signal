import React from 'react';
import { shallow } from 'enzyme';
import Circling from './circling';

test('default message', () => {
  const wrapper = shallow(<Circling />);
  expect(wrapper.text()).toBe('loading...');
  expect(wrapper).toMatchSnapshot();
});
test('supplied messages', () => {
  const msgs = (
    <ul>
      <li>msg1</li>
      <li>msg2</li>
    </ul>
  );
  const wrapper = shallow(<Circling message={msgs} />);
  expect(wrapper.find('ul').text()).toBe('msg1msg2');
  expect(wrapper).toMatchSnapshot();
});
