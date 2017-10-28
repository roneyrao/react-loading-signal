import React from 'react';
import {mount} from 'enzyme';

import LocalLoading from './LocalLoading';
import styles from './styles';
import * as Theme from './themes';
import {
	LoadingEvent,
	EVENT_LOCAL_HADNDLED
} from './LoadingEvent';


function getBox(wrapper){
	return wrapper.getDOMNode().parentNode.querySelector('.'+styles.loading);
}
describe('initial props', function(){
	test('render properly with default props', ()=>{
		const ctnr=document.createElement('div');
		ctnr.style.position='static';//no default value as in browser;
		const wrapper=mount(<LocalLoading />, {attachTo:ctnr});
		const loadingBox=getBox(wrapper);

		expect(ctnr.style.position).toBe('relative');
		expect(loadingBox).not.toBeNull();
		expect(loadingBox.style.visibility).toBe('hidden');
		expect(ctnr.outerHTML).toMatchSnapshot();
	})
	test('shown', ()=>{
		const spy=jest.spyOn(LoadingEvent, 'emit');
		const wrapper=mount(<LocalLoading active={true}/>);
		expect(getBox(wrapper).style.visibility).toBe('visible');
		expect(spy).toBeCalledWith(EVENT_LOCAL_HADNDLED);
		spy.mockRestore();
	})
	test('masked', ()=>{
		const wrapper=mount(<LocalLoading masked={true}/>);
		expect(getBox(wrapper).classList.contains(styles.masked)).toBe(true);
	})
	test('supply message and theme', ()=>{//Blobs won't show message;
		const msg='this is a message';
		const wrapper=mount(<LocalLoading message={msg} theme={Theme.Spinning}/>);
		expect(getBox(wrapper).querySelector('.'+styles.messageList).innerHTML).toBe(msg);
	})
	test('specify button', ()=>{
		const ctnr=document.createElement('div');
		const box=document.createElement('div');
		const btn=document.createElement('button');
		ctnr.appendChild(btn);
		ctnr.appendChild(box);
		mount(<LocalLoading button={btn} active={true}/>, {attachTo:box});
		expect(btn.classList.contains('disabled')).toBe(true);
		expect(btn.getAttribute('disabled')).toBeDefined();
	})
	test('specify container', ()=>{
		const ctnr=document.createElement('div');
		mount(<LocalLoading container={ctnr} />);
		expect(ctnr.querySelector('.'+styles.loading)).not.toBeNull();
	})
	test("don't show loading by setting container to false", ()=>{
		const spy=jest.spyOn(LoadingEvent, 'emit');
		const btn=document.createElement('button');
		const wrapper=mount(<LocalLoading button={btn} active={true} container={false}/>);

		expect(getBox(wrapper)).toBeNull();
		expect(btn.classList.contains('disabled')).toBe(true);
		expect(spy).not.toBeCalled();
	})
})

describe('change props', function(){
	describe('active', function(){
		test('undefined/hidden -> visible', ()=>{
			const wrapper=mount(<LocalLoading />);
			const loadingBox=getBox(wrapper);
			expect(loadingBox.style.visibility).toBe('hidden');
			wrapper.setProps({active:true});
			expect(loadingBox.style.visibility).toBe('visible');
		})
		test('visible -> hidden', ()=>{
			const wrapper=mount(<LocalLoading active={true}/>);
			const loadingBox=getBox(wrapper);
			expect(loadingBox.style.visibility).toBe('visible');
			wrapper.setProps({active:false});
			expect(loadingBox.style.visibility).toBe('hidden');
		})
	})
	describe('masked', function(){
		test('undefined/unmasked -> masked', ()=>{
			const wrapper=mount(<LocalLoading />);
			const loadingBox=getBox(wrapper);
			expect(loadingBox.classList.contains(styles.masked)).toBe(false);
			wrapper.setProps({masked:true});
			expect(loadingBox.classList.contains(styles.masked)).toBe(true);
		})
		test('masked -> unmasked', ()=>{
			const wrapper=mount(<LocalLoading masked={true}/>);
			const loadingBox=getBox(wrapper);
			expect(loadingBox.classList.contains(styles.masked)).toBe(true);
			wrapper.setProps({masked:false});
			expect(loadingBox.classList.contains(styles.masked)).toBe(false);
		})
	})
	describe('message', function(){
		test('undefined/empty -> new message', ()=>{
			const msg='this is a message';
			const wrapper=mount(<LocalLoading theme={Theme.Spinning}/>);
			expect(getBox(wrapper).querySelector('.'+styles.messageList)).toBeNull();
			wrapper.setProps({message:msg});
			expect(getBox(wrapper).querySelector('.'+styles.messageList).innerHTML).toBe(msg);
		})
		test('with message -> empty', ()=>{
			const msg='this is a message';
			const wrapper=mount(<LocalLoading theme={Theme.Spinning} message={msg}/>);
			expect(getBox(wrapper).querySelector('.'+styles.messageList).innerHTML).toBe(msg);
			wrapper.setProps({message:''});
			expect(getBox(wrapper).querySelector('.'+styles.messageList)).toBeNull();
		})
		test('with message -> another message', ()=>{
			const msg1='this is a message', msg2='this is another message';
			const wrapper=mount(<LocalLoading theme={Theme.Spinning} message={msg1}/>);
			expect(getBox(wrapper).querySelector('.'+styles.messageList).innerHTML).toBe(msg1);
			wrapper.setProps({message:msg2});
			expect(getBox(wrapper).querySelector('.'+styles.messageList).innerHTML).toBe(msg2);
		})
	})
	describe('button', function(){
		test('undefined/no button -> button', ()=>{
			const ctnr=document.createElement('div');
			const box=document.createElement('div');
			const btn=document.createElement('button');
			ctnr.appendChild(btn);
			ctnr.appendChild(box);
			const wrapper=mount(<LocalLoading active={true}/>, {attachTo:box});
			expect(btn.classList.contains('disabled')).toBe(false);
			wrapper.setProps({button:btn});
			expect(btn.classList.contains('disabled')).toBe(true);
		})
		test('button -> no button', ()=>{
			const ctnr=document.createElement('div');
			const box=document.createElement('div');
			const btn=document.createElement('button');
			ctnr.appendChild(btn);
			ctnr.appendChild(box);
			const wrapper=mount(<LocalLoading button={btn} active={true}/>, {attachTo:box});
			expect(btn.classList.contains('disabled')).toBe(true);
			wrapper.setProps({button:null});
			expect(btn.classList.contains('disabled')).toBe(false);
		})
		test('button -> another button', ()=>{
			const ctnr=document.createElement('div');
			const box=document.createElement('div');
			const btn=document.createElement('button');
			const btn2=document.createElement('button');
			ctnr.appendChild(btn);
			ctnr.appendChild(btn2);
			ctnr.appendChild(box);
			const wrapper=mount(<LocalLoading button={btn} active={true}/>, {attachTo:box});
			expect(btn.classList.contains('disabled')).toBe(true);
			expect(btn2.classList.contains('disabled')).toBe(false);
			wrapper.setProps({button:btn2});
			expect(btn.classList.contains('disabled')).toBe(false);
			expect(btn2.classList.contains('disabled')).toBe(true);
		})
	})
	describe('container', function(){
		test('undefined/parentNode -> DOM', ()=>{
			const ctnr=document.createElement('div');
			const wrapper=mount(<LocalLoading/>);
			expect(getBox(wrapper)).not.toBeNull();
			wrapper.setProps({container:ctnr});
			expect(getBox(wrapper)).toBeNull();
			expect(ctnr.querySelector('.'+styles.loading)).not.toBeNull();
		})
		test('undefined/parentNode -> false/no container', ()=>{
			const wrapper=mount(<LocalLoading/>);
			expect(getBox(wrapper)).not.toBeNull();
			wrapper.setProps({container:false});
			expect(getBox(wrapper)).toBeNull();
		})
		test('DOM -> undefined/parentNode', ()=>{
			const ctnr=document.createElement('div');
			const wrapper=mount(<LocalLoading container={ctnr} />);
			expect(ctnr.querySelector('.'+styles.loading)).not.toBeNull();
			wrapper.setProps({container:undefined});
			expect(ctnr.querySelector('.'+styles.loading)).toBeNull();
			expect(getBox(wrapper)).not.toBeNull();
		})
		test('DOM -> false/no container', ()=>{
			const ctnr=document.createElement('div');
			const wrapper=mount(<LocalLoading container={ctnr} />);
			expect(ctnr.querySelector('.'+styles.loading)).not.toBeNull();
			wrapper.setProps({container:false});
			expect(ctnr.querySelector('.'+styles.loading)).toBeNull();
			expect(getBox(wrapper)).toBeNull();
		})
		test('false/no container -> DOM', ()=>{
			const ctnr=document.createElement('div');
			const wrapper=mount(<LocalLoading container={false} />);
			expect(getBox(wrapper)).toBeNull();
			wrapper.setProps({container:ctnr});
			expect(ctnr.querySelector('.'+styles.loading)).not.toBeNull();
		})
		test('false/no container -> undefined/parentNode', ()=>{
			const wrapper=mount(<LocalLoading container={false} />);
			expect(getBox(wrapper)).toBeNull();
			wrapper.setProps({container:undefined});
			expect(getBox(wrapper)).not.toBeNull();
		})
	})

	describe('theme', function(){
		test('undefined/no theme -> theme', ()=>{
		})
		test('theme -> no theme', ()=>{
		})
		test('theme -> another theme', ()=>{
		})
	})
});

test('destroy', ()=>{
	const wrapper=mount(<LocalLoading />);
	const inst=wrapper.instance();
	expect(getBox(wrapper)).not.toBeNull();
	wrapper.unmount();
	expect(inst.box.querySelector('.'+styles.loading)).toBeNull();
	expect(inst.box.parentNode).toBeNull();
})
