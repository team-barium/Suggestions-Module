import React from 'react';
import StarRatings from 'react-star-ratings'
import styles from '../styles/item.css';

class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filledHeart: 'https://s3-us-west-1.amazonaws.com/abibas-shoes/icons/heart-grey-filled.png',
			outlinedHeart: 'https://s3-us-west-1.amazonaws.com/abibas-shoes/icons/heart-grey-outline.png',
			currHeart: 'https://s3-us-west-1.amazonaws.com/abibas-shoes/icons/heart-grey-outline.png',
			saleTag: 'https://s3-us-west-1.amazonaws.com/abibas-shoes/icons/sale-tag.png',
			exclusiveTag: 'https://s3-us-west-1.amazonaws.com/abibas-shoes/icons/exclusive-tag.png',
			specialTag: ''
		}
		this.fillHeart = this.fillHeart.bind(this);
		this.specialTag = this.specialTag.bind(this);
	}
	componentDidMount() {
		this.specialTag()
	}

	fillHeart() {
		console.log('heart clicked')
		let {currHeart} = this.state;
		if (currHeart === this.state.outlinedHeart) {
			this.setState({currHeart: this.state.filledHeart})
		} else {
			this.setState({currHeart: this.state.outlinedHeart})
		}
	}

	specialTag() {
		let {specialTag} = this.props.obj
		if (specialTag === 'Sale') {
			this.setState({specialTag: <img className={styles.tag} src={this.state.saleTag}/>})
		} else if (specialTag === 'Exclusive') {
			this.setState({specialTag: <img className={styles.tag} src={this.state.exclusiveTag}/>})
		}
	}

	render() {
		let price = `$${this.props.obj.price}`;
		if (this.props.obj.salePrice) {
			price = <div><span className={styles.red}>${this.props.obj.salePrice}</span> <span className={styles.strikethrough}> ${this.props.obj.price}</span></div>
		}

		let reviews = <div><StarRatings numberOfStars={5} starDimension="12px" rating={this.props.obj.reviewStars} starRatedColor='#767677' starEmptyColor="#eceeef" starSpacing="1px" /><span className={styles.ratingPad}>{this.props.obj.reviewsTotal}</span></div>;
		if (!this.props.obj.reviewStars) {
			reviews = null;
		}

		return (
			<div className={styles.wrapper} style={{ order: this.props.order }}>
				<div className={styles.item}>
					<div id='picture' >
						<img className={styles.picture} src={this.props.obj.productPicture}></img>
						{this.state.specialTag}
						<div className={styles.heartWrapper}>
							<img className={styles.heart} onClick={this.fillHeart} src={this.state.currHeart}></img>
						</div>
					</div>
					<div id='info' className={styles.text}>
						<div className={styles.kind}>{this.props.obj.kind}</div>
						<div className={styles.details}>
							<div className={styles.title}>{this.props.obj.title}</div>
							<div className={styles.price}>{price}</div>
						</div>
						<div className={styles.ratings}>{reviews}</div>
					</div>
				</div>
			</div>
		)
	}


}

export default Item;