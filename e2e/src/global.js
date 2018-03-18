import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { load, stop, changeGlobalTheme } from '../../demo/actions';
import reducer from '../../demo/reducers';

const store = createStore(reducer, applyMiddleware(thunk));

const path = 'file1';

render(
  <div>
    <button id='load' onClick={() => store.dispatch(load(path))} />
    <button id='change' onClick={() => changeGlobalTheme(path)} />
    <button id='stop' onClick={() => store.dispatch(stop(path))} />
  </div>,
  document.getElementById('root'),
);
