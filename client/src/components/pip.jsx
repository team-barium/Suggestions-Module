import React from 'react';
import styles from '../styles/pip.css';

const Pip = (props) => {

    const pipStyle = {
        height: `${props.isCurrent ? '100%' : '25%'}`
    }

    return (
        <li className={styles.li} onClick={() => props.changePosition(props.index)}>
            <span className={styles.dot} style={pipStyle}></span>
        </li>
    )
}

export default Pip;