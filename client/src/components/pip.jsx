import React from 'react';
import styles from '../styles/pip.css';

const Pip = (props) => {
	return (
		<li className={styles.li} onClick={() => props.changePosition(props.index)}>
			<span className={styles.dot} style={{height: `${props.isCurrent ? '100%' : '25%'}`}}></span>
		</li>
	);
};

export default Pip;