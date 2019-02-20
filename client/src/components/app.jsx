import React from 'react';
import styles from '../styles/app.css';
import Carousel from './carousel.jsx';

const App = (props) => {
	return (
		<div className={styles.container}>
			<Carousel id={props.match.params.id}/>
		</div>
	);
};

export default App;