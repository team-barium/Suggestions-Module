import React from 'react';
import styles from '../styles/pip.css';

const Pip = (props) => {

	const pipStyle ={
		border: `${props.isCurrent ? '2px solid black' : '0px solid black'}`,
		borderBottom: `${props.isCurrent ? '2px solid black' : '1px solid black'}`
	};

	return (
		<span className={styles.li} style={pipStyle} onClick={() => props.changePosition(props.index)}></span>
	);
};

export default Pip;