import React from 'react';
import styles from '../styles/indicator.css';
import Pip from './pip.jsx';

const Indicator = (props) => {
	const {position} = props;
	return (
		<div className={styles.nav}>
			{Array.from({length: 4}, (pip, i) =>
				<Pip key={i} isCurrent={(i*4)===position} index={i} changePosition={props.changePosition} />
			)}
		</div>
	);
};

export default Indicator;