import React from 'react';
import axios from 'axios';
import styles from '../styles/carousel.css';
import Item from './item.jsx';
import Indicator from './indicator.jsx';


class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			currId: Math.ceil(Math.random() * 19),
			position: 0,
			translate: 0,
			originalTrans: 0,
			showing: 4,
			dragging: false
		};
		this.getSuggestions = this.getSuggestions.bind(this);
		this.shuffle = this.shuffle.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.prevSlide = this.prevSlide.bind(this);
		this.changePosition = this.changePosition.bind(this);
		this.updateWindowWidth = this.updateWindowWidth.bind(this);
		this.dragStart = this.dragStart.bind(this);
		this.drag = this.drag.bind(this);
		this.dragRelease = this.dragRelease.bind(this);
	}

	componentDidMount() {
		this.updateWindowWidth();
		this.getSuggestions();
		window.addEventListener('resize', this.updateWindowWidth);
	}

	getSuggestions() {
		let { currId } = this.state;
		axios
			.get('/suggestions', {
				params: {
					id: currId
				}
			})
			.then(({ data }) => {
				let shuffled = this.shuffle(data);
				this.setState({ data: shuffled.slice(0, 16) });
			})
			.catch(err => console.log('axios get error', err));
	}

	updateWindowWidth() {
		let { position, translate } = this.state;
		this.setState({ width: window.innerWidth }, () => {
			if (this.state.width <= 960) {
				this.setState({ showing: 2, moveBy: 88 })
				if (translate % 100 === 0) {
					let newTrans = (position / 2) * 88;
					this.setState({ translate: newTrans })
				}
			} else {
				if (position % 4 !== 0) {
					this.setState({ position: this.state.position - 2 }, () => {
						if (translate % 88 === 0) {
							let newTrans = (this.state.position / 4) * 100;
							this.setState({ translate: newTrans })
						}
					})
				} else {
					if (translate % 88 === 0) {
						let newTrans = (this.state.position / 4) * 100;
						this.setState({ translate: newTrans })
					}
				}
				this.setState({ showing: 4, moveBy: 100 })
			}
		});
	}

	shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	nextSlide() {
		let { position, showing, moveBy } = this.state;
		let newTrans = ((position + showing) / showing) * moveBy;
		this.setState({
			translate: newTrans,
			position: position + showing
		})
	}

	prevSlide() {
		let { position, showing, moveBy } = this.state;
		let newTrans = (position / showing - 1) * moveBy;
		this.setState({
			translate: newTrans,
			position: position - showing
		})
	}

	changePosition(index) {
		let { showing, moveBy } = this.state;
		this.setState({ position: index * showing }, () => {
			let { position } = this.state;
			let newTrans = (position / showing) * moveBy;
			this.setState({ translate: newTrans })
		})
	}

	dragStart(e) {
		this.setState({
			initMousePos: e.clientX,
			dragging: true,
			originalTrans: this.state.translate
		})
	}

	drag(e) {
		let { initMousePos, originalTrans, dragging } = this.state;
		let caroWidth = document.getElementById('carousel').offsetWidth;
		if (!dragging) return;
		if (dragging) {
			this.setState({ currMousePos: e.clientX }, () => {
				let mouseChange = this.state.currMousePos - initMousePos;
				let percentToMove = (mouseChange / caroWidth) * 100;
				let newTrans = Math.abs(percentToMove) + originalTrans;
				console.log(newTrans)
				this.setState({ translate: newTrans })
			})
		}
	}

	dragRelease() {
		let { initMousePos, currMousePos } = this.state;
		this.setState({ dragging: false }, () => {
			if (currMousePos > initMousePos) {
				this.prevSlide();
			} else if (currMousePos < initMousePos) {
				this.nextSlide();
			}
		})
	}

	render() {
		let { position, translate, showing, data, dragging } = this.state;

		const caroStyle = {
			transition: 'transform 0.3s ease',
			transform: `translate(-${translate}%)`,
			cursor: `${dragging ? 'grab' : 'auto'}`
		}

		if (data.length > 0) {
			return (
				<div className={styles.gutter}>
					<div className={styles.wrapper} >
						<div className={styles.headingWrapper}>
							<div className={styles.heading}>You may also like</div>
						</div>
						<div className={styles.carousel} style={caroStyle} id='carousel' onMouseDown={(e) => this.dragStart(e)} onMouseMove={(e) => this.drag(e)} onMouseUp={this.dragRelease}>
							{data.map((obj, i) => {
								return <Item key={i} obj={obj} />;
							})}
						</div>
						<Indicator nextSlide={this.nextSlide} prevSlide={this.prevSlide} showing={showing} position={position} changePosition={this.changePosition} />
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}

export default Carousel;