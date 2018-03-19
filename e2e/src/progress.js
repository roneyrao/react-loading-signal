import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { loadProgress } from '../../demo/actions';
import reducer from '../../demo/reducers';
import { LocalLoading, Themes } from 'FlexLoading'; // eslint-disable-line

const store = createStore(reducer, applyMiddleware(thunk));

const path = 'file1';
export default class Local extends React.Component<{}, { active: boolean, message: number }> {
  state = { active: false, message: 0 };
  componentWillMount() {
    store.subscribe(() => {
      const state = store.getState();
      if (Object.prototype.hasOwnProperty.call(state, path)) {
        if (state[path]) {
          this.setState({ active: state[path].loading, message: state[path].progress });
        } else {
          this.setState({ active: false, message: 0 });
        }
      }
    });
  }
  render() {
    return (
      <div>
        <button id='load' onClick={() => store.dispatch(loadProgress(path))} />
        <div id='box'>
          <LocalLoading
            {...this.state}
            theme={Themes.Progress}
            message={this.state.message}
          />
        </div>
      </div>
    );
  }
}

render(<Local />, document.getElementById('root'));
