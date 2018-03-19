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
const title = 'You can click any button in any order within this page, to check how they work together.';
if (root) {
  render(
    <Provider store={store}>
      <div>
        <h3>{title}</h3>
        <div className={css.container}>
          <Global />
          <Local />
          <Both />
          <LocalWithContainer />
          <LocalWithoutIndicator />
          <LocalProgress />
          <LocalCustomTheme />
        </div>
      </div>
    </Provider>,
    root,
  );
} else {
  console.error('DOM root is missing');
}
