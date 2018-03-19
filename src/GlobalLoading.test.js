import React from 'react';
import { shallow, mount } from 'enzyme';

import GlobalLoading, { GlobalLoadingComp } from './GlobalLoading';
import styles from './styles';
import * as Theme from './themes';

describe('GlobalLoading Component', () => {
  test('render properly with default props', () => {
    const wrapper = shallow(<GlobalLoadingComp />);
    expect(wrapper.prop('style').visibility).toBe('hidden');
    expect(wrapper.childAt(0).equals(<Theme.Spinning message='' />)).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('masked', () => {
    const wrapper = shallow(<GlobalLoadingComp masked />);
    expect(wrapper.hasClass(styles.globalMasked)).toBe(true);
  });
  test('closable', () => {
    const wrapper = shallow(<GlobalLoadingComp masked closable />);
    const inst = wrapper.instance();

    expect(wrapper.hasClass(styles.globalMasked)).toBe(true);
    expect(wrapper.prop('style').visibility).toBe('hidden');

    inst.addLoading('aaa');
    wrapper.update();
    expect(inst.loadingCount).toBe(1);
    expect(wrapper.prop('style').visibility).toBe('visible');

    wrapper.simulate('click');
    expect(inst.loadingCount).toBe(1);
    expect(Object.keys(inst.state.messages).length).toBe(1);
    expect(wrapper.prop('style').visibility).toBe('hidden');
  });
  test('custom theme', () => {
    const wrapper = shallow(<GlobalLoadingComp theme={Theme.Blobs} />);
    expect(wrapper.childAt(0).equals(<Theme.Blobs message='' />)).toBe(true);
  });
  describe('handle message processing', () => {
    const wrapper = mount(<GlobalLoadingComp />);
    const inst = wrapper.instance();
    const msg1 = 'this is a message';
    const msg2 = 'this is another message';

    let id1;
    let id2;

    test('addLoading', () => {
      id1 = inst.addLoading(msg1);
      wrapper.update();

      expect(inst.loadingCount).toBe(1);
      expect(inst.state.shown).toBe(true);
      expect(Object.keys(inst.state.messages).length).toBe(1);
      expect(wrapper.getDOMNode().style.visibility).toBe('visible');
      const ul = wrapper.find('ul');
      expect(ul.exists()).toBe(true);
      expect(ul.children().length).toBe(1);
      expect(ul.childAt(0).text()).toBe(msg1);

      id2 = inst.addLoading(msg2);
      wrapper.update();
      expect(wrapper
        .find('ul')
        .childAt(1)
        .text()).toBe(msg2);
    });

    test('removeLoading', () => {
      inst.removeLoading(id1);
      wrapper.update();
      expect(wrapper
        .find('ul')
        .childAt(0)
        .text()).toBe(msg2);

      inst.removeLoading(id2);
      wrapper.update();
      expect(wrapper.find('ul').exists()).toBe(false);
      expect(wrapper.getDOMNode().style.visibility).toBe('hidden');
      expect(inst.loadingCount).toBe(0);

      inst.removeLoading(id2);
      expect(inst.loadingCount).toBe(0);
    });
  });
});

describe('GlobalLoading Class', () => {
  let inst;
  const id = 'msg_id';
  let addLoading;
  let removeLoading;
  beforeAll(() => {
    inst = new GlobalLoading(undefined, true);
    inst.Comp.addLoading = jest.fn(() => id);
    ({ addLoading } = inst.Comp);
    inst.Comp.removeLoading = jest.fn();
    ({ removeLoading } = inst.Comp);
  });

  test('component is rendered into body', () => {
    expect(document.body.querySelector(`.${styles.loading}`)).not.toBeNull();
  });
  test('component is singleton', () => {
    const first = inst.constructor.singleInst;
    const inst2 = new GlobalLoading(null, true);
    expect(first).toBe(inst2);
  });
  test('get singleton', () => {
    expect(GlobalLoading.getInstance()).toBe(inst);
  });
  test('add and remove message', (done) => {
    const msg = 'loading message';
    const prom = inst.open(msg);
    setTimeout(() => {
      try {
        expect(addLoading).toBeCalledWith(msg);

        inst.close(prom);
        prom
          .then(
            () => {
              expect(removeLoading).toBeCalledWith(id);
              done();
            },
            (err) => {
              done.fail(err);
            },
          )
          .catch(err => done.fail(err));
      } catch (err) {
        done.fail(err);
      }
    }, 100);
  });
  test('bypass a message', (done) => {
    addLoading.mockReset();
    removeLoading.mockReset();

    const msg = 'loading message';
    const prom = inst.open(msg);
    prom._canceled = true;

    setTimeout(() => {
      try {
        expect(addLoading).not.toBeCalled();

        inst.close(prom);
        prom
          .then(
            () => {
              done.faile('never call this');
            },
            () => {
              expect(removeLoading).not.toBeCalled();
              done();
            },
          )
          .catch(err => done.fail(err));
      } catch (err) {
        done.fail(err);
      }
    }, 100);
  });
});
