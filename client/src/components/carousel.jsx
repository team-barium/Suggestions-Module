import React from 'react';
import axios from 'axios';
import styles from '../styles/carousel.css';
import Item from './item.jsx'

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			currID: Math.ceil(Math.random() * 5),
			currentIndex: 0,
			translateValue: 0
			// currSlides: []
		}
		this.getSuggestions = this.getSuggestions.bind(this);
		this.changeSlides = this.changeSlides.bind(this);
		this.currentSlide = this.currentSlide.bind(this);
		this.showItems = this.showItems.bind(this);
		this.shuffle = this.shuffle.bind(this);
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
				this.showItems(0)
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

	goPrevSlides() {
		if(this.state.currentIndex === 0) {
			return;
		}
		this.setState(prevState => ({
			currentIndex: prevState.currentIndex - 1,
			translateValue: prevState.translateValue + this.slideWidth()
		}))
	}

	goToNextSlide() {

    // if(this.state.currentIndex === this.state.data.length - 1) {
    //   return this.setState({
    //     currentIndex: 0,
    //     translateValue: 0
    //   })
    // }
    
    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  }

	showItems(num) {
		let { data } = this.state;
		if (data.length > 0) {
			let current = this.state.currSlides.concat(data[num]);
			this.setState({ currSlides: current })
		}
		// this.setState({slideIndex: num})
	}

	changeSlides(num) {
		// let {slideIndex} = this.state;
		// this.showItems(num)
	}

	currentSlide(num) {
		// let {slideIndex} = this.state;
		// this.setState({slideIndex: num})
		// this.showItems(num)
	}

	render() {
		let data = this.state.data.slice(0, 4);
		if (data.length > 0) {
			return (
				<div >
					<div className={styles.carousel} id='carousel'>
						{data.map((obj, i) => {
							return <Item key={i} obj={obj} />
						})}
						<a className={styles.prev} onClick={this.changeSlides(-1)}>&#10094;</a>
						<a className={styles.next} onClick={this.changeSlides(1)}>&#10095;</a>
					</div><br/>
					<div className={styles.nav}>
						<span className={`${styles.li} ${styles.active}`} onClick={this.currentSlide(1)}></span>
						<span className={styles.li} onClick={this.currentSlide(2)}></span>
						<span className={styles.li} onClick={this.currentSlide(3)}></span>
						<span className={styles.li} onClick={this.currentSlide(4)}></span>
					</div>
				</div>
			)
		} else {
			return <div>No data</div>
		}
	}
}

export default Carousel;