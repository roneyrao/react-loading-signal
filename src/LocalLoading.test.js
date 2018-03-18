import React from 'react';
import { mount } from 'enzyme';

import LocalLoading from './LocalLoading';
import styles from './styles';
import * as Themes from './themes';

function getCtnr(wrapper) {
  return wrapper.getDOMNode().parentNode.querySelector(`.${styles.loading}`);
}
describe('initial props', () => {
  test('render properly with default props', () => {
    const ctnr = document.createElement('div');
    ctnr.style.position = 'static'; // no default value as in browser;
    const wrapper = mount(<LocalLoading active={false} />, { attachTo: ctnr });
    const loadingBox = getCtnr(wrapper);

    expect(ctnr.style.position).toBe('relative');
    expect(loadingBox).not.toBeNull();
    expect(loadingBox.style.visibility).toBe('hidden');
    expect(ctnr.outerHTML).toMatchSnapshot();
  });
  test('shown, no error', () => {
    const wrapper = mount(<LocalLoading active />);
    expect(getCtnr(wrapper).style.visibility).toBe('visible');
  });
  test('shown, Id is flagged', () => {
    const id = {};
    const wrapper = mount(<LocalLoading active={id} />);
    expect(getCtnr(wrapper).style.visibility).toBe('visible');
    expect(id._canceled).toBe(true);
  });
  test('masked', () => {
    const wrapper = mount(<LocalLoading active={false} masked />);
    expect(getCtnr(wrapper).classList.contains(styles.masked)).toBe(true);
  });
  test('supply message and theme', () => {
    // Blobs won't show message;
    const msg = 'this is a message';
    const wrapper = mount(<LocalLoading active={false} message={msg} theme={Themes.Spinning} />);
    expect(getCtnr(wrapper).querySelector(`.${styles.spinning}`).innerHTML).toBe(msg);
  });
  test('specify button', () => {
    const ctnr = document.createElement('div');
    const box = document.createElement('div');
    const btn = document.createElement('button');
    ctnr.appendChild(btn);
    ctnr.appendChild(box);
    mount(<LocalLoading button={btn} active />, { attachTo: box });
    expect(btn.classList.contains('disabled')).toBe(true);
    expect(btn.getAttribute('disabled')).toBeDefined();
  });
  test('specify container', () => {
    const ctnr = document.createElement('div');
    mount(<LocalLoading active={false} container={ctnr} />);
    expect(ctnr.querySelector(`.${styles.loading}`)).not.toBeNull();
  });
  test("don't show loading by setting container to false", () => {
    const id = {};
    const btn = document.createElement('button');
    const wrapper = mount(<LocalLoading button={btn} active={id} container={false} />);

    expect(getCtnr(wrapper)).toBeNull();
    expect(btn.classList.contains('disabled')).toBe(true);
    expect(id.canceled).toBeUndefined();
  });
});

describe('change props', () => {
  describe('active', () => {
    test('undefined/hidden -> visible', () => {
      const wrapper = mount(<LocalLoading active={false} />);
      const loadingBox = getCtnr(wrapper);
      expect(loadingBox.style.visibility).toBe('hidden');
      wrapper.setProps({ active: true });
      expect(loadingBox.style.visibility).toBe('visible');
    });
    test('visible -> hidden', () => {
      const btn = document.createElement('button');
      const wrapper = mount(<LocalLoading active button={btn} />);
      const loadingBox = getCtnr(wrapper);
      expect(loadingBox.style.visibility).toBe('visible');
      wrapper.setProps({ active: false });
      expect(loadingBox.style.visibility).toBe('hidden');
    });
  });
  describe('masked', () => {
    test('undefined/unmasked -> masked', () => {
      const wrapper = mount(<LocalLoading active={false} />);
      const loadingBox = getCtnr(wrapper);
      expect(loadingBox.classList.contains(styles.masked)).toBe(false);
      wrapper.setProps({ masked: true });
      expect(loadingBox.classList.contains(styles.masked)).toBe(true);
    });
    test('masked -> unmasked', () => {
      const wrapper = mount(<LocalLoading active={false} masked />);
      const loadingBox = getCtnr(wrapper);
      expect(loadingBox.classList.contains(styles.masked)).toBe(true);
      wrapper.setProps({ masked: false });
      expect(loadingBox.classList.contains(styles.masked)).toBe(false);
    });
  });
  describe('message', () => {
    function getHtml(box) {
      return box.querySelector(`.${styles.spinning}`).innerHTML;
    }
    test('undefined/empty -> new message', () => {
      const msg = 'this is a message';
      const wrapper = mount(<LocalLoading theme={Themes.Spinning} active={false} />);
      const box = getCtnr(wrapper);
      expect(getHtml(box)).toBe('loading...');
      wrapper.setProps({ message: msg });
      expect(getHtml(box)).toBe(msg);
    });
    test('with message -> empty', () => {
      const msg = 'this is a message';
      const wrapper = mount(<LocalLoading theme={Themes.Spinning} active={false} message={msg} />);
      const box = getCtnr(wrapper);
      expect(getHtml(box)).toBe(msg);
      wrapper.setProps({ message: '' });
      expect(getHtml(box)).toBe('');
    });
    test('with message -> another message', () => {
      const msg1 = 'this is a message';
      const msg2 = 'this is another message';
      const wrapper = mount(<LocalLoading theme={Themes.Spinning} active={false} message={msg1} />);
      const box = getCtnr(wrapper);
      expect(getHtml(box)).toBe(msg1);
      wrapper.setProps({ message: msg2 });
      expect(getHtml(box)).toBe(msg2);
    });
  });
  describe('button', () => {
    test('undefined/no button -> button', () => {
      const ctnr = document.createElement('div');
      const box = document.createElement('div');
      const btn = document.createElement('button');
      ctnr.appendChild(btn);
      ctnr.appendChild(box);
      const wrapper = mount(<LocalLoading active />, { attachTo: box });
      expect(btn.classList.contains('disabled')).toBe(false);
      wrapper.setProps({ button: btn });
      expect(btn.classList.contains('disabled')).toBe(true);
    });
    test('button -> no button', () => {
      const ctnr = document.createElement('div');
      const box = document.createElement('div');
      const btn = document.createElement('button');
      ctnr.appendChild(btn);
      ctnr.appendChild(box);
      const wrapper = mount(<LocalLoading button={btn} active />, { attachTo: box });
      expect(btn.classList.contains('disabled')).toBe(true);
      wrapper.setProps({ button: null });
      expect(btn.classList.contains('disabled')).toBe(false);
    });
    test('button -> another button', () => {
      const ctnr = document.createElement('div');
      const box = document.createElement('div');
      const btn = document.createElement('button');
      const btn2 = document.createElement('button');
      ctnr.appendChild(btn);
      ctnr.appendChild(btn2);
      ctnr.appendChild(box);
      const wrapper = mount(<LocalLoading button={btn} active />, { attachTo: box });
      expect(btn.classList.contains('disabled')).toBe(true);
      expect(btn2.classList.contains('disabled')).toBe(false);
      wrapper.setProps({ button: btn2 });
      expect(btn.classList.contains('disabled')).toBe(false);
      expect(btn2.classList.contains('disabled')).toBe(true);
    });
  });
  describe('container', () => {
    test('undefined/parentNode -> DOM', () => {
      const ctnr = document.createElement('div');
      const wrapper = mount(<LocalLoading active={false} />);
      expect(getCtnr(wrapper)).not.toBeNull();
      wrapper.setProps({ container: ctnr });
      expect(getCtnr(wrapper)).toBeNull();
      expect(ctnr.querySelector(`.${styles.loading}`)).not.toBeNull();
      expect(ctnr.querySelector(`.${styles.blobs}`)).not.toBeNull();
    });
    test('undefined/parentNode -> false/no container', () => {
      const wrapper = mount(<LocalLoading active={false} />);
      expect(getCtnr(wrapper)).not.toBeNull();
      wrapper.setProps({ container: false });
      expect(getCtnr(wrapper)).toBeNull();
    });
    test('DOM -> undefined/parentNode', () => {
      const ctnr = document.createElement('div');
      const wrapper = mount(<LocalLoading active={false} container={ctnr} />);
      expect(ctnr.querySelector(`.${styles.loading}`)).not.toBeNull();
      wrapper.setProps({ container: undefined });
      expect(ctnr.querySelector(`.${styles.loading}`)).toBeNull();
      expect(getCtnr(wrapper)).not.toBeNull();
    });
    test('DOM -> false/no container', () => {
      const ctnr = document.createElement('div');
      const wrapper = mount(<LocalLoading active={false} container={ctnr} />);
      expect(ctnr.querySelector(`.${styles.loading}`)).not.toBeNull();
      wrapper.setProps({ container: false });
      expect(ctnr.querySelector(`.${styles.loading}`)).toBeNull();
      expect(getCtnr(wrapper)).toBeNull();
    });
    test('false/no container -> DOM', () => {
      const ctnr = document.createElement('div');
      const wrapper = mount(<LocalLoading active={false} container={false} />);
      expect(getCtnr(wrapper)).toBeNull();
      wrapper.setProps({ container: ctnr });
      expect(ctnr.querySelector(`.${styles.loading}`)).not.toBeNull();
    });
    test('false/no container -> undefined/parentNode', () => {
      const wrapper = mount(<LocalLoading active={false} container={false} />);
      expect(getCtnr(wrapper)).toBeNull();
      wrapper.setProps({ container: undefined });
      expect(getCtnr(wrapper)).not.toBeNull();
    });
  });

  describe('theme', () => {
    test('undefined/default theme -> theme', () => {
      const wrapper = mount(<LocalLoading active={false} />);
      const box = getCtnr(wrapper);
      expect(box.querySelector(`.${styles.blobs}`)).not.toBeNull();
      wrapper.setProps({ theme: Themes.Spinning });
      expect(box.querySelector(`.${styles.blobs}`)).toBeNull();
      expect(box.querySelector(`.${styles.spinning}`)).not.toBeNull();
    });
    test('theme -> undefined/default theme', () => {
      const wrapper = mount(<LocalLoading active={false} theme={Themes.Spinning} />);
      const box = getCtnr(wrapper);
      expect(box.querySelector(`.${styles.blobs}`)).toBeNull();
      wrapper.setProps({ theme: null });
      expect(box.querySelector(`.${styles.blobs}`)).not.toBeNull();
      expect(box.querySelector(`.${styles.spinning}`)).toBeNull();
    });
    test('theme -> another theme', () => {
      const wrapper = mount(<LocalLoading active={false} theme={Themes.Spinning} />);
      const box = getCtnr(wrapper);
      expect(box.querySelector(`.${styles.spinning}`)).not.toBeNull();
      wrapper.setProps({ theme: Themes.Circling });
      expect(box.querySelector(`.${styles.spinning}`)).toBeNull();
      expect(box.querySelector(`.${styles.circling}`)).not.toBeNull();
    });
  });
});

test('destroy', () => {
  const wrapper = mount(<LocalLoading />);
  const inst = wrapper.instance();
  const ctnr = getCtnr(wrapper);
  expect(ctnr).not.toBeNull();
  wrapper.unmount();
  expect(inst.box).toBeNull();
  expect(ctnr.querySelector(`.${styles.loading}`)).toBeNull();
});
