import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import catan from './reducers';

import {setup} from './actions';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = [];
const store = createStore(catan, undefined, composeEnhancers(...enhancers));

store.dispatch(setup());

ReactDOM.render(
	<Provider store={store}>
	  	<App />
	</Provider>,
  document.getElementById('root')
);
