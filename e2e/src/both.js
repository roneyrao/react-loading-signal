import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { load, stop } from '../../demo/actions';
import reducer from '../../demo/reducers';
import { LocalLoading, type Active } from 'FlexLoading'; // eslint-disable-line

const store = createStore(reducer, applyMiddleware(thunk));

const path = 'file1';
export default class Local extends React.Component<{}, { button: ?HTMLElement, active: Active }> {
  state = { button: null, active: false };
  btn: ?HTMLElement;

  componentWillMount() {
    store.subscribe(() => {
      const state = store.getState();
      if (Object.prototype.hasOwnProperty.call(state, path)) {
        this.setState({ button: this.btn, active: state[path] });
      }
    });
  }
  render() {
    return (
      <div id='box'>
        <button id='load' ref={(btn) => { this.btn = btn; }} onClick={() => store.dispatch(load(path, undefined, undefined, true))} />
        <button id='stop' onClick={() => store.dispatch(stop(path))} />
        <LocalLoading {...this.state} />
      </div>
    );
  }
}

const root = document.getElementById('root');
if (root) {
  render(
    <Local />,
    root,
  );
} else {
  console.error('DOM root is missing');
}
