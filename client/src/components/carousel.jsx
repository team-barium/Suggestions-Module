import React from 'react';
import styles from '../styles/carousel.css';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id='carousel'>
                <div>box</div>
                <div>box</div>
                <div>box</div>
                <div>box</div>
            </div>
        )
    }
}

export default Carousel;