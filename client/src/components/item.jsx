import React from 'react';
import StarRatings from 'react-star-ratings'
import styles from '../styles/item.css';

const Item = (props) => {
	let price = `$${props.obj.price}`;
	if (props.obj.salePrice) {
		price = <div><span className={styles.red}>${props.obj.salePrice}</span> <span className={styles.strikethrough}> ${props.obj.price}</span></div>
	}
	let reviews = <div><StarRatings numberOfStars={5} starDimension="12px" rating={props.obj.reviewStars} starRatedColor='#767677' starEmptyColor="#eceeef" starSpacing="1px"  /><span className={styles.ratingPad}>{props.obj.reviewsTotal}</span></div>;
	if (!props.obj.reviewStars) {
		reviews = null;
	}
	return (
		<div className={styles.item}>
			<div id='picture'>
				<img className={styles.picture} src={props.obj.productPicture}></img>
			</div>
			<div id='info' className={styles.text}>
				<div className={styles.kind}>{props.obj.kind}</div>
				<div className={styles.details}>
					<div className={styles.title}>{props.obj.title}</div>
					<div className={styles.price}>{price}</div>
				</div>
				<div className={styles.ratings}>{reviews}</div>
			</div>
		</div>
	)
}

export default Item;