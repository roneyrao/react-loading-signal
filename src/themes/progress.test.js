import React from 'react';
import { shallow } from 'enzyme';
import Progress from './progress';
import styles from '../styles';

test('no caption', () => {
  const msg = {
    progress: 0.5,
  };
  const wrapper = shallow(<Progress message={msg} />);
  expect(wrapper.find(`.${styles.progress}`).text()).toBe('progress: 50.00%');
  expect(wrapper.find(`.${styles.progressBar}`).childAt(0).prop('style').width).toBe('50%');
  expect(wrapper).toMatchSnapshot();
});
test('custom caption', () => {
  const captionStr = 'adfasfaf';
  const msg = {
    progress: 0.5,
    caption: jest.fn(() => captionStr),
  };
  const wrapper = shallow(<Progress message={msg} />);
  expect(wrapper.find(`.${styles.progress}`).text()).toBe(captionStr);
  expect(msg.caption).toBeCalledWith(msg.progress);
  expect(wrapper.find(`.${styles.progressBar}`).childAt(0).prop('style').width).toBe('50%');
});
