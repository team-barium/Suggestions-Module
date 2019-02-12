import React from 'react';
import axios from 'axios';
import styles from '../styles/carousel.css';
import Item from './item.jsx';
import Indicator from './indicator.jsx'

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			currID: Math.ceil(Math.random() * 5),
			position: 0,
			direction: 'next',
			sliding: false
		}
		this.getSuggestions = this.getSuggestions.bind(this);
		this.shuffle = this.shuffle.bind(this);
		this.getOrder = this.getOrder.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.prevSlide = this.prevSlide.bind(this);
		this.slide = this.slide.bind(this);
		this.changePosition = this.changePosition.bind(this);
	}

	componentDidMount() {
		this.getSuggestions()
	}

	getSuggestions() {
		console.log(this.state.currID, 'get id')
		let { currID } = this.state;
		axios
			.get('./suggestions', {
				params: {
					id: currID
				}
			})
			.then(({ data }) => {
				let shuffled = this.shuffle(data)
				this.setState({ data: shuffled })
			})
			.catch(err => console.log(err))
	}

	shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	//to show four at a time have to increment order by four
	getOrder(itemIndex) {
		const { position } = this.state
		const { data } = this.state
		const numItems = data.length || 1;
		if (itemIndex - position < 0) {
			return numItems - Math.abs(itemIndex - position)
		}
		return itemIndex - position
	}


	nextSlide() {
		const { position } = this.state;
		const { data } = this.state;
		const numItems = data.length || 1;

		this.slide('next', position === numItems - 1 ? 0 : position + 1)
	}

	prevSlide() {
		const { position } = this.state;
		const { data } = this.state;
		const numItems = data.length;

		this.slide('prev', position === 0 ? numItems - 1 : position - 1)
	}

	slide(direction, position) {
		this.setState({
			sliding: true,
			direction,
			position
		})
		setTimeout(() => {
			this.setState({
				sliding: false
			})
		}, 50)
	}

	changePosition(index) {
		const { position } = this.state;
		if (index > position) {
			this.slide('next', index);
		} else {
			this.slide('prev', index);
		}
		// this.setState({ position: index })
	}

	render() {
		let data = this.state.data.slice(0, 12);
		let { sliding } = this.state;
		let { direction } = this.state;

		const caroTransition = () => sliding ? 'none' : 'transform 0.3s ease';

		const caroTransform = () => {
			if (!sliding) return 'translateX(calc(-100% - 20px)'
			if (direction === 'prev') return 'translateX(calc(2*(-100% - 20px)))'
			return 'translateX(0%)'
		}

		const carouselStyling = {
			display: 'flex',
			margin: '0 0 20px 20px',
			transition: `${caroTransition()}`,
			transform: `${caroTransform()}`
		}

		if (data.length > 0) {
			return (
				<div>
					<div className={styles.wrapper}>
						<div className={styles.carousel} style={carouselStyling} >
							{data.map((obj, i) => {
								return <Item key={i} obj={obj} order={this.getOrder(i)} />
							})}
						</div><br />
						<a className={styles.prev} onClick={this.prevSlide}>&#10094;</a>
						<a className={styles.next} onClick={this.nextSlide}>&#10095;</a>
						<Indicator position={this.state.position} changePosition={this.changePosition} />
					</div>
				</div>
			)
		} else {
			return <div>No data</div>
		}
	}
}

export default Carousel;