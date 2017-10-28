import React from 'react';
import {shallow} from 'enzyme';
import Spinning from './spinning';

test('default message', ()=>{
	const wrapper=shallow(<Spinning />);
	expect(wrapper.text()).toBe('loading...');
	expect(wrapper).toMatchSnapshot();
})
test('supplied messages', ()=>{
	const msgs=(<ul>
		<li>msg1</li>
		<li>msg2</li>
	</ul>);
	const wrapper=shallow(<Spinning message={msgs} />);
	expect(wrapper.find('ul').text()).toBe('msg1msg2');
	expect(wrapper).toMatchSnapshot();
})
