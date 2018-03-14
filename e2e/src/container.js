import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { load } from '../../demo/actions';
import reducer from '../../demo/reducers';
import { LocalLoading } from 'FlexLoading'; // eslint-disable-line

const store = createStore(reducer, applyMiddleware(thunk));

const path = 'file1';
type State = { button: ?HTMLElement, container: ?HTMLElement, active: bool };
export default class Local extends React.Component<{}, State> {
  state = { button: null, container: null, active: false };
  componentWillMount() {
    store.subscribe(() => {
      const state = store.getState();
      if (Object.prototype.hasOwnProperty.call(state, path)) {
        this.setState({ button: this.btn, container: this.box, active: state[path] });
      }
    });
  }
  removeContainer = () => {
    this.setState({ container: false });
  }
  restoreContainer = () => {
    this.setState({ container: undefined });
  }
  render() {
    return (
      <div>
        <div id='box' ref={(box) => { this.box = box; }} />
        <button id='load' ref={(btn) => { this.btn = btn; }} onClick={() => store.dispatch(load(path))} />
        <button id='removeContainer' onClick={this.removeContainer} />
        <button id='restoreContainer' onClick={this.restoreContainer} />
        <LocalLoading {...this.state} />
      </div>
    );
  }
}

render(
  <Local />,
  document.getElementById('root'),
);
