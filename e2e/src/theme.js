import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { load, stop } from '../../demo/actions';
import reducer from '../../demo/reducers';
import { LocalLoading } from 'FlexLoading'; // eslint-disable-line
import TxtTheme from '../../demo/components/customTheme.cp';

const store = createStore(reducer, applyMiddleware(thunk));

const path = 'file1';
export default class Local extends React.PureComponent<{}, { active: bool }> {
  state = { active: false };
  componentWillMount() {
    store.subscribe(() => {
      const state = store.getState();
      if (Object.prototype.hasOwnProperty.call(state, path)) {
        this.setState({ active: state[path] });
      }
    });
  }
  render() {
    return (
      <div>
        <button id='load' onClick={() => store.dispatch(load(path))} />
        <button id='stop' onClick={() => store.dispatch(stop(path))} />
        <LocalLoading {...this.state} theme={TxtTheme} />
      </div>
    );
  }
}

render(
  <Local />,
  document.getElementById('root'),
);
