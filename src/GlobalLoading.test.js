import React from 'react';
import {shallow, mount} from 'enzyme';

import GlobalLoading, {GlobalLoadingComp} from './GlobalLoading';
import styles from './styles';
import * as Theme from './themes';
import {
	LoadingEvent,
	EVENT_LOCAL_HADNDLED
} from './LoadingEvent';


describe('GlobalLoading Component', ()=>{
	test('render properly with default props', ()=>{
		const wrapper=shallow(<GlobalLoadingComp />);
		expect(wrapper.prop('style').visibility).toBe('hidden');
		expect(wrapper).toMatchSnapshot();
	})
	test('masked', ()=>{
		const wrapper=shallow(<GlobalLoadingComp masked={true}/>);
		expect(wrapper.hasClass(styles.globalMasked)).toBe(true);
	})
	test('custom theme', ()=>{
		const wrapper=shallow(<GlobalLoadingComp theme={Theme.Spinning}/>);
		expect(wrapper.childAt(0).equals(<Theme.Spinning message=''/>)).toBe(true);
	})
	test('handle message processing', ()=>{
		const wrapper=mount(<GlobalLoadingComp />), inst=wrapper.instance();
		const msg1='this is a message', msg2='this is another message';

		const id1=inst.addLoading(msg1);
		expect(inst.loadingCount).toBe(1);
		expect(Object.keys(inst.state.messages).length).toBe(1);
		expect(wrapper.getDOMNode().style.visibility).toBe('visible');

		wrapper.update();
		let ul=wrapper.find('ul');
		expect(ul.exists()).toBe(true);
		expect(ul.children().length).toBe(1);
		expect(ul.childAt(0).text()).toBe(msg1);

		const id2=inst.addLoading(msg2);
		wrapper.update();
		expect(wrapper.find('ul').childAt(1).text()).toBe(msg2);

		inst.removeLoading(id1);
		wrapper.update();
		expect(wrapper.find('ul').childAt(0).text()).toBe(msg2);


		inst.removeLoading(id2);
		wrapper.update();
		expect(wrapper.find('ul').exists()).toBe(false);
		expect(wrapper.getDOMNode().style.visibility).toBe('hidden');
	})
})



describe('GlobalLoading Class', ()=>{
	const inst=new GlobalLoading(undefined, true);
	const id='msg_id'
		,addLoading=inst.constructor.singleComp.addLoading=jest.fn(()=>id)
		,removeLoading=inst.constructor.singleComp.removeLoading=jest.fn()

	test('component is rendered into body', ()=>{
		expect(document.body.querySelector('.'+styles.loading)).not.toBeNull();
	})
	test('component is singleton', ()=>{
		const first=inst.constructor.singleComp;
		const inst2=new GlobalLoading(null, true);
		expect(first).toBe(inst2.constructor.singleComp);
	})
	test('add and remove message', (done)=>{
		const msg='loading message';
		const prom=inst.open(msg);
		setTimeout(()=>{
			try{
				expect(addLoading).toBeCalledWith(msg);

				inst.close(prom);
				prom.then(()=>{
					expect(removeLoading).toBeCalledWith(id);
					done();
				}, (msg)=>{
					done.fail(msg);
				}).catch((err)=>done.fail(err));
			}catch(err){
				done.fail(err);
			}
		}, 100);
	})
	test('bypass a message', (done)=>{
		addLoading.mockReset();
		removeLoading.mockReset();

		const msg='loading message';
		const prom=inst.open(msg);
		LoadingEvent.emit(EVENT_LOCAL_HADNDLED);
		expect(inst.localHandled).toBe(true);

		setTimeout(()=>{
			try{
				expect(addLoading).not.toBeCalled();

				inst.close(prom);
				prom.then(()=>{
					done.faile('never call this');
				}, ()=>{
					expect(removeLoading).not.toBeCalled();
					done();
				}).catch((err)=>done.fail(err));
			}catch(err){
				done.fail(err);
			}
		}, 100);
	})
});
