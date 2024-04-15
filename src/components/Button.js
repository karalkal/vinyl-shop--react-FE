import React from 'react';
import styles from './Button.module.css';


export const Button = ({ children, style, onClick }) => {
    return (
        <button className={styles.btnGeneric} onClick={onClick} style={style}>
            {children}
        </button>
    );
};


