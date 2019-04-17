import React from 'react';
import styles from '../styles/indicator.css';
import Pip from './pip.jsx';

const Indicator = (props) => {
	const { position, showing } = props;
	// let move = showing === 4 ? 100 : 88;

	const prevArrow = () => position !== 0 ? (<a className={styles.prev} onClick={props.prevSlide}><div className={styles.prevText}>&#10094;</div></a>) : null;

	const nextArrow = () => position < 12 ? (<a className={styles.next} onClick={props.nextSlide}><div className={styles.nextText}>&#10095;</div></a>) : null;

	let length = 4;

	if (showing === 2) {
		length = 8;
	}

	return (
		<div>
			<div>{prevArrow()}</div>
			<div>{nextArrow()}</div>
			<ul className={styles.nav}>
				{Array.from({ length }, (pip, i) =>
					<Pip key={i} isCurrent={i === (position / showing)} index={i} changePosition={props.changePosition} showing={showing} />
				)}
			</ul>
		</div>
	);
};

export default Indicator;