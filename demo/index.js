import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import css from './main.css';
import reducer from './reducers';
import {
  Global,
  LocalWithContainer,
  //   LocalCustomTheme,
  //   LocalWithoutIndicator,
  //   LocalProgress,
} from './containers';

const store = createStore(reducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <div className={css.container}>
      <Global />
      <LocalWithContainer />
    </div>
  </Provider>,
  document.getElementById('root'),
);
