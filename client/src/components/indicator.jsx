import React from 'react';
import styles from '../styles/indicator.css';
import Pip from './pip.jsx'

const Indicator = (props) => {
	const { position } = props;

	const prevArrow = () => position !== 0 ? (<a className={styles.prev} onClick={props.prevSlide}><div className={styles.prevText}>&#8735;</div></a>) : null;

	const nextArrow = () => position < 12 ? (<a className={styles.next} onClick={props.nextSlide}><div className={styles.nextText}>&#8735;</div></a>) : null;

	return (
		<div>
			<div>{prevArrow()}</div>
			<div>{nextArrow()}</div>
			<div className={styles.nav}>
				{Array.from({ length: 4 }, (pip, i) =>
					<Pip key={i} isCurrent={(i * 4) === position} index={i} changePosition={props.changePosition} />
				)}
			</div>
		</div>
	)
}

export default Indicator;