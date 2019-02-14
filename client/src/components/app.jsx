import React from 'react';
import styles from '../styles/app.css';
import Carousel from './carousel.jsx';

const App = (props) => {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>You may also like</div>
			<Carousel id={props.match.params.id} />
		</div>
	);
};

export default App;