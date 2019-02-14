import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

const routing = (
	<Router>
		<div>
			<Route path="/abibas/:id" component={App} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('app'));