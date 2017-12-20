import css from './main.css';
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import reducer from './reducers';
import {Global, GlobalSynthesized, LocalWithContainer, LocalCustomTheme, LocalWithoutIndicator, LocalProgress} from './containers';

const store=createStore(reducer, applyMiddleware(thunk));

render(
	<Provider store={store}>
		<div className={css.container}>
			<Global />
			<GlobalSynthesized />
			<LocalWithContainer />
			<LocalCustomTheme/>
			<LocalProgress />
			<LocalWithoutIndicator />
		</div>
	</Provider>
	,document.getElementById('root')
);

