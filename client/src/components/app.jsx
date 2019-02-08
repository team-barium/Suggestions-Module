import React from 'react';
import styles from '../styles/app.css';
import Carousel from './carousel.jsx';

const App = () => {

        return (
            <div>
                <div className={styles.heading}>You may also like</div>
                <Carousel />
            </div>
        )
}

export default App;