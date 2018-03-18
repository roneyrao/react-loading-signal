// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import css from './main.css';
import reducer from './reducers';
import {
  Global,
  Local,
  Both,
  LocalWithContainer,
  LocalWithoutIndicator,
  LocalProgress,
  LocalCustomTheme,
} from './containers';

const store = createStore(reducer, applyMiddleware(thunk));

const root = document.getElementById('root');
if (root) {
  render(
    <Provider store={store}>
      <div className={css.container}>
        <h3>You can click any button in any order within this page.</h3>
        <Global />
        <Local />
        <Both />
        <LocalWithContainer />
        <LocalWithoutIndicator />
        <LocalProgress />
        <LocalCustomTheme />
      </div>
    </Provider>,
    root,
  );
} else {
  console.error('DOM root is missing');
}
