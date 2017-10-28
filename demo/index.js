import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import reducer from './reducers';
import {Panel1} from './components';
import Panel from './containers';

const store=createStore(reducer, applyMiddleware(thunk));

render(
	<Provider store={store}>
		<div>
			<Panel ix='1'>{Panel1}</Panel>
		</div>
	</Provider>
	,document.getElementById('root')
);

