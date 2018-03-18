import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { load, stop } from '../../demo/actions';
import reducer from '../../demo/reducers';
import { LocalLoading } from 'FlexLoading'; // eslint-disable-line

const store = createStore(reducer, applyMiddleware(thunk));

const path1 = 'file1';
const path2 = 'file2';
const path3 = 'file3';
export default class Local extends React.Component<{}, { active: bool }> {
  state = { active: false };
  componentWillMount() {
    store.subscribe(() => {
      const state = store.getState();
      if (Object.prototype.hasOwnProperty.call(state, path2)) {
        this.setState({ active: state[path2] });
      }
    });
  }
  static load() {
    store.dispatch(load(path1));
    store.dispatch(load(path2));
    store.dispatch(load(path3, undefined, 'loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading'));
  }
  render() {
    return (
      <div>
        <button id='load' onClick={this.constructor.load} />
        <button id='stop1' onClick={() => store.dispatch(stop(path1))} />
        <button id='stop2' onClick={() => store.dispatch(stop(path2))} />
        <button id='stop3' onClick={() => store.dispatch(stop(path3))} />
        <LocalLoading {...this.state} />
      </div>
    );
  }
}

render(
  <Local />,
  document.getElementById('root'),
);
