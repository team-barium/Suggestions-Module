import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/sugApp.jsx';
// import {
// 	BrowserRouter as Router,
// 	Route
// } from 'react-router-dom';

// const routing = (
// 	<Router>
// 		<div>
// 			<Route path="/abibas/:id" component={App} />
// 		</div>
// 	</Router>
// );

ReactDOM.render(<App />, document.getElementById('suggestions'));