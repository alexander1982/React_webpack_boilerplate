import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';
import reducers from './reducers';
import App from './components/App';

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxPromise,logger)));


let $ = require('jquery');
window.jQuery = $;
window.$ = window.jQuery;

require('style-loader!css-loader!sass-loader!ApplicationStyles');

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/" component={App}/>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
document.getElementById('app')
);

